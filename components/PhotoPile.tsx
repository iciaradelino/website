"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/photos";
import styles from "./PhotoPile.module.css";

type Vec = [number, number, number];
type Mode = "stack" | "grid" | "detail";

/** Postura de una foto: centro, ejes de la foto (derecha y abajo), escala y opacidad. */
type Pose = { p: Vec; r: Vec; u: Vec; s: number; o: number };

/** Ancho real de cada foto en el DOM; todas las posturas la escalan desde aquí. */
const BASE = 800;
const HEADER = 64;
/** Cuántas fotos forman la fila inicial (el resto aparece ya en la cuadrícula). */
const PILE_COUNT = 10;
/** Lo que tarda la fila en entrar en la pantalla desde la izquierda, en segundos. */
const ROW_ENTRY = 1.4;
/** A cuántas fotos por segundo avanza la onda por la fila, de derecha a izquierda. */
const ROW_WAVE_SPEED = 7;
/** Cuántas fotos se salen de la fila a la vez, como mucho. */
const ROW_WAVE_SPAN = 4;
/** Duración del paso de una vista a otra, en segundos. */
const DURATION = 1.1;
/** Cuánto sale hacia la derecha la foto elegida en la tira, y lo ancha que es la onda. */
const WAVE_PEAK = 56;
const WAVE_WIDTH = 230;

const cross = (a: Vec, b: Vec): Vec => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const scale = (a: Vec, s: number): Vec => [a[0] * s, a[1] * s, a[2] * s];
const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const lerp = (a: Vec, b: Vec, t: number): Vec => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const normalize = (a: Vec): Vec => scale(a, 1 / (Math.hypot(...a) || 1));
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Una foto plana, de frente, girada `angle` radianes sobre sí misma. */
const flat = (x: number, y: number, width: number, angle = 0, z = 0, o = 1): Pose => ({
  p: [x, y, z],
  r: [Math.cos(angle), Math.sin(angle), 0],
  u: [-Math.sin(angle), Math.cos(angle), 0],
  s: width / BASE,
  o,
});

/** Mezcla dos posturas; los ejes se re-ortogonalizan para que la foto no se deforme. */
function blend(a: Pose, b: Pose, t: number, bump: number): Pose {
  const p = lerp(a.p, b.p, t);
  // Un pequeño salto hacia el espectador a mitad de camino.
  p[2] += Math.sin(t * Math.PI) * bump;
  const r = normalize(lerp(a.r, b.r, t));
  const u = normalize(sub(lerp(a.u, b.u, t), scale(r, dot(lerp(a.u, b.u, t), r))));
  return { p, r, u, s: mix(a.s, b.s, t), o: mix(a.o, b.o, t) };
}

/**
 * La misma cuadrícula que la página de fotos: 3 columnas del mismo ancho (1 en
 * pantallas estrechas), cada foto en la columna más corta y sin recortar.
 */
function masonry(ratios: number[], w: number) {
  const cols = w >= 720 ? 3 : 1;
  const pad = clamp(w * 0.08, 32, 120);
  const gap = clamp(w * 0.03, 24, 36);
  const top = 96;
  const colW = (w - pad * 2 - gap * (cols - 1)) / cols;
  const heights = Array(cols).fill(0);
  const cells = ratios.map((ratio) => {
    const col = cols === 1 ? 0 : heights.indexOf(Math.min(...heights));
    const h = colW * ratio;
    const cell = { x: pad + col * (colW + gap) + colW / 2, y: top + heights[col] + h / 2, w: colW };
    heights[col] += h + gap;
    return cell;
  });
  return { cells, height: top + Math.max(...heights) + 64 };
}

type PhotoPileProps = {
  photos: Photo[];
  labels: { close: string; prev: string; next: string };
};

const icons = {
  close: "M6 6l12 12M18 6L6 18",
  prev: "M15 5l-7 7 7 7",
  next: "M9 5l7 7-7 7",
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path d={icons[name]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Experimento: al cargar, las primeras fotos entran en fila, una tras otra, y
 * una onda la recorre; luego se ordenan en la cuadrícula, donde aparecen las demás. Un clic
 * en una foto la amplía y el resto se coloca en una tira vertical que ondula al
 * desplazarse.
 */
export function PhotoPile({ photos, labels }: PhotoPileProps) {
  const list = photos.filter((photo) => photo.src);
  const n = list.length;
  const ratios = list.map((photo) => photo.height / photo.width);

  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [mode, setMode] = useState<Mode>("stack");
  const [active, setActive] = useState(0);

  // Todo lo que cambia en cada fotograma vive en refs para no re-renderizar React.
  const anim = useRef({
    mode: "stack" as Mode,
    active: 0,
    current: [] as Pose[],
    from: [] as Pose[],
    start: [] as number[],
    duration: [] as number[],
    bump: [] as number[],
    // Desplazamiento de la tira (objetivo y valor suavizado) y su velocidad.
    scroll: 0,
    scrollShown: 0,
    wave: 0,
    lastWheel: 0,
  });
  const layout = useRef({
    w: 0,
    h: 0,
    slots: [] as number[],
    thumb: 0,
    row: [] as { x: number; width: number }[],
  });
  // Fotos de la fila ya cargadas; la fila empieza cuando están todas.
  const loaded = useRef(new Set<number>());
  const pileCount = Math.min(PILE_COUNT, n);
  const onAllLoaded = useRef<() => void>(() => {});
  const onPhotoLoad = (index: number, img: HTMLImageElement) => {
    if (index >= pileCount) return;
    // Descodificada de antemano, para que no asome un hueco gris al aparecer.
    img
      .decode()
      .catch(() => {})
      .finally(() => {
        loaded.current.add(index);
        if (loaded.current.size >= pileCount) onAllLoaded.current();
      });
  };

  /** Pasa a otra vista: cada foto sale de donde está, con un pequeño retraso propio. */
  const go = (next: Mode, focus = anim.current.active) => {
    const a = anim.current;
    const now = performance.now() / 1000;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fromStack = a.mode === "stack";
    const cells = masonry(ratios, layout.current.w).cells;
    a.from = a.current.map((pose, i) => {
      // Las que no estaban en la fila aparecen ya en su hueco de la cuadrícula.
      if (fromStack && i >= pileCount) {
        const cell = cells[i];
        return flat(cell.x, cell.y + 24, cell.w, 0, 0, 0);
      }
      return { ...pose };
    });
    a.start = list.map((_, i) => {
      if (reduced) return now - DURATION;
      if (next === "detail") return now + Math.abs(i - focus) * 0.025;
      if (fromStack) {
        // De la fila salen de izquierda a derecha; luego van apareciendo las demás.
        if (i < pileCount) return now + (i / pileCount) * 0.4;
        return now + 0.6 + (i - pileCount) * 0.04;
      }
      return now + (((i * 37) % n) / n) * 0.4;
    });
    a.duration = list.map((_, i) => (fromStack && i >= pileCount ? 0.7 : DURATION));
    a.bump = list.map((_, i) => (next === "detail" || (fromStack && i >= pileCount) ? 0 : 120));
    a.mode = next;
    if (next === "detail") {
      const card = cardRefs.current[focus];
      if (!reduced && card) {
        growFrom.current = card.getBoundingClientRect();
        // Su copia en la tira sale desde la foto grande, no desde la cuadrícula.
        a.from[focus] = { ...a.current[focus], o: 0 };
      }
      a.active = focus;
      a.scroll = a.scrollShown = layout.current.slots[focus] ?? 0;
      setActive(focus);
    }
    setMode(next);
  };

  /** Dónde va la foto grande: el hueco a la derecha de la tira, sin recortarla. */
  const bigRect = (index: number) => {
    const { thumb } = layout.current;
    const vw = window.innerWidth;
    const left = 28 + thumb + WAVE_PEAK + 48;
    const right = vw - clamp(vw * 0.05, 20, 64);
    const top = 40;
    const bottom = window.innerHeight - 84;
    const width = Math.min(right - left, (bottom - top) / ratios[index]);
    const height = width * ratios[index];
    return {
      left: (left + right - width) / 2,
      top: (top + bottom - height) / 2,
      width,
      height,
    };
  };

  /** Al abrir la vista ampliada, la foto grande crece desde donde estaba en la cuadrícula. */
  const growFrom = useRef<DOMRect | null>(null);
  const bigRef = (el: HTMLDivElement | null) => {
    const from = growFrom.current;
    if (!el || !from) return;
    growFrom.current = null;
    const to = el.getBoundingClientRect();
    el.animate(
      [
        {
          transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`,
        },
        { transform: "none" },
      ],
      { duration: 800, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
    );
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const a = anim.current;

    const measure = () => {
      const w = stage.clientWidth;
      const h = window.innerHeight - HEADER;
      const thumb = clamp(w * 0.07, 54, 110);
      let y = 0;
      const slots = ratios.map((ratio) => {
        const center = y + (thumb * ratio) / 2;
        y += thumb * ratio + 16;
        return center;
      });
      // Fila inicial: todas a la misma altura, centradas y, si caben, a lo ancho de la pantalla.
      const gap = clamp(w * 0.012, 8, 16);
      const widths = ratios.slice(0, pileCount).map((ratio) => 1 / ratio);
      const sum = widths.reduce((total, width) => total + width, 0);
      const rowH = clamp((w * 0.84 - gap * (pileCount - 1)) / sum, 56, h * 0.34);
      let x = w / 2 - (rowH * sum + gap * (pileCount - 1)) / 2;
      const row = widths.map((width) => {
        const cell = { x: x + (rowH * width) / 2, width: rowH * width };
        x += rowH * width + gap;
        return cell;
      });
      layout.current = { w, h, slots, thumb, row };
    };
    measure();
    window.addEventListener("resize", measure);

    // Fila inicial: entra entera desde la izquierda y luego una onda la recorre
    // desde la foto de la derecha; solo unas pocas fotos se salen de la fila a la vez.
    let waveStart = Infinity;
    const waveTime = (pileCount + ROW_WAVE_SPAN) / ROW_WAVE_SPEED;
    const pile = (i: number, now = 0) => {
      const { w, h, row } = layout.current;
      const cell = row[i];
      if (!cell) return flat(w / 2, h / 2, 1, 0, 0, 0);
      // La cresta empieza justo a la derecha de la última foto y avanza hacia la izquierda.
      const t = Number.isFinite(waveStart) && !reduced ? now - waveStart : -1;
      const crest = pileCount - 1 + ROW_WAVE_SPAN / 2 - t * ROW_WAVE_SPEED;
      const d = (i - crest) / (ROW_WAVE_SPAN / 2);
      const lift = t >= 0 && Math.abs(d) < 1 ? Math.cos((d * Math.PI) / 2) ** 2 : 0;
      // Al subir se inclina hacia la izquierda y al bajar hacia la derecha, siguiendo la onda.
      const slope = t >= 0 && Math.abs(d) < 1 ? -Math.sin(d * Math.PI) : 0;
      const amp = h * 0.12;
      return flat(cell.x, h / 2 - amp * lift, cell.width, slope * 0.12, lift * 60);
    };
    a.current = list.map((_, i) => ({ ...pile(i), o: 0 }));
    a.start = list.map(() => Infinity);
    a.duration = list.map(() => (reduced ? 0.001 : ROW_ENTRY));
    a.bump = list.map(() => 0);

    // La fila empieza cuando han cargado sus fotos (o, como mucho, a los 4 s).
    let toGrid = 0;
    const begin = () => {
      if (toGrid) return;
      const now = performance.now() / 1000;
      // Toda la fila sale de fuera de la pantalla, por la izquierda, y entra a la vez.
      const { row } = layout.current;
      const last = row[pileCount - 1];
      const offscreen = last ? last.x + last.width / 2 + 40 : 0;
      a.from = list.map((_, i) => {
        const pose = pile(i);
        return { ...pose, p: [pose.p[0] - offscreen, pose.p[1], pose.p[2]] as Vec };
      });
      a.start = list.map((_, i) => (i < pileCount ? now + (reduced ? -1 : 0) : Infinity));
      waveStart = now + ROW_ENTRY + 0.15;
      toGrid = window.setTimeout(
        () => go("grid"),
        reduced ? 0 : (ROW_ENTRY + 0.15 + waveTime + 0.2) * 1000,
      );
    };
    onAllLoaded.current = begin;
    if (loaded.current.size >= pileCount) begin();
    const fallback = window.setTimeout(begin, 4000);

    let frame = 0;
    let stageHeight = 0;

    const tick = (nowMs: number) => {
      const now = nowMs / 1000;
      const { w, h, slots, thumb } = layout.current;
      const grid = masonry(ratios, w);

      // La cuadrícula (y la vista ampliada que sale de ella) alargan el escenario.
      const wantHeight = a.mode === "stack" ? h : Math.max(grid.height, h);
      if (wantHeight !== stageHeight) {
        stageHeight = wantHeight;
        stage.style.height = `${wantHeight}px`;
        stage.style.perspectiveOrigin = `${w / 2}px ${h / 2}px`;
      }

      // Tira de la vista ampliada: el desplazamiento se suaviza y su velocidad hace la onda.
      const prev = a.scrollShown;
      a.scrollShown += (a.scroll - a.scrollShown) * (reduced ? 1 : 0.14);
      const speed = Math.abs(a.scrollShown - prev);
      a.wave += (Math.min(speed * 2.5, 46) - a.wave) * 0.08;
      if (a.mode === "detail") {
        const nearestTo = (value: number) =>
          slots.reduce((best, slot, i) => (Math.abs(slot - value) < Math.abs(slots[best] - value) ? i : best), 0);
        // Al soltar, la tira se encaja en la foto más cercana.
        if (now - a.lastWheel > 0.18) a.scroll = slots[nearestTo(a.scroll)];
        // La foto grande cambia al instante, sin animación.
        const nearest = nearestTo(a.scrollShown);
        if (nearest !== a.active) {
          a.active = nearest;
          setActive(nearest);
        }
      }
      // La vista ampliada se coloca respecto a la ventana, no al escenario.
      const viewTop = stage.getBoundingClientRect().top;
      const stripX = 28 + thumb / 2;
      const midY = window.innerHeight / 2;

      const target = (i: number): Pose => {
        switch (a.mode) {
          case "stack":
            return pile(i, now);
          case "grid": {
            const cell = grid.cells[i];
            return flat(cell.x, cell.y, cell.w);
          }
          case "detail": {
            const y = midY + slots[i] - a.scrollShown;
            const rel = y - midY;
            // Onda: la foto del centro (la elegida) es la cresta; al desplazarse, además, ondula.
            const x =
              stripX +
              WAVE_PEAK * Math.exp(-((rel / WAVE_WIDTH) ** 2)) +
              a.wave * Math.sin(rel * 0.012 + now * 2);
            return flat(x, y - viewTop, thumb);
          }
        }
      };

      list.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        // En la fila, cada foto está oculta hasta que le toca entrar.
        if (now < a.start[i] && a.mode === "stack") {
          el.style.opacity = "0";
          return;
        }
        const t = easeInOut(clamp((now - a.start[i]) / a.duration[i], 0, 1));
        const pose = blend(a.from[i], target(i), t, a.bump[i]);
        a.current[i] = pose;
        const { p, r, u, s } = pose;
        const nz = cross(r, u);
        el.style.transform = `matrix3d(${r[0] * s},${r[1] * s},${r[2] * s},0,${u[0] * s},${u[1] * s},${u[2] * s},0,${nz[0]},${nz[1]},${nz[2]},0,${p[0]},${p[1]},${p[2]},1)`;
        el.style.zIndex = String(Math.round(p[2]) + 10000);
        el.style.opacity = String(pose.o);
      });

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(toGrid);
      window.clearTimeout(fallback);
      window.removeEventListener("resize", measure);
    };
    // La lista de fotos no cambia mientras la página está abierta.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Vista ampliada: la página no se desplaza; la rueda, el dedo y las flechas mueven la tira.
  useEffect(() => {
    if (mode !== "detail") return;
    const a = anim.current;
    const { slots } = layout.current;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const move = (delta: number) => {
      a.scroll = clamp(a.scroll + delta, slots[0], slots[slots.length - 1]);
      a.lastWheel = performance.now() / 1000;
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      move(event.deltaY);
    };
    let touchY = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0].clientY;
    };
    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      move((touchY - event.touches[0].clientY) * 1.4);
      touchY = event.touches[0].clientY;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") go("grid");
      const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (event.key in keys) {
        event.preventDefault();
        a.scroll = slots[clamp(a.active + keys[event.key], 0, slots.length - 1)];
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  /** Flechas de la vista ampliada: la tira se mueve hasta la foto anterior o siguiente. */
  const step = (delta: number) => {
    const a = anim.current;
    const { slots } = layout.current;
    a.scroll = slots[clamp(a.active + delta, 0, slots.length - 1)];
  };

  const onStageClick = (event: React.MouseEvent) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>("[data-index]");
    const index = card ? Number(card.dataset.index) : -1;
    if (mode === "stack") go("grid");
    else if (mode === "grid" && index >= 0) go("detail", index);
    else if (mode === "detail" && index >= 0) {
      anim.current.scroll = layout.current.slots[index];
    }
  };

  return (
    <>
      <div ref={stageRef} className={`${styles.stage} ${styles[mode]}`} onClick={onStageClick}>
        {list.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            data-index={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={styles.card}
            style={{
              width: BASE,
              height: BASE * ratios[i],
              left: -BASE / 2,
              top: (-BASE * ratios[i]) / 2,
              opacity: 0,
            }}
            aria-label={photo.alt}
            tabIndex={mode === "stack" ? -1 : 0}
          >
            <Image
              src={photo.src!}
              alt=""
              fill
              sizes="1200px"
              // Todas se ven desde el primer momento, en la fila.
              loading="eager"
              onLoad={(event) => onPhotoLoad(i, event.currentTarget)}
              draggable={false}
              className={styles.photo}
            />
          </button>
        ))}
      </div>
      {mode === "detail" ? (
        <>
          <div className={styles.backdrop} />
          <div ref={bigRef} className={styles.big} style={bigRect(active)}>
            <Image
              src={list[active].src!}
              alt={list[active].alt}
              fill
              // El mismo tamaño que las fotos de la tira: ya están cargadas y el cambio es inmediato.
              sizes="1200px"
              loading="eager"
              className={styles.photo}
            />
          </div>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.close}`}
            onClick={() => go("grid")}
            aria-label={labels.close}
          >
            <Icon name="close" />
          </button>
          <div className={styles.detailBar}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => step(-1)}
              disabled={active === 0}
              aria-label={labels.prev}
            >
              <Icon name="prev" />
            </button>
            <span>
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => step(1)}
              disabled={active === n - 1}
              aria-label={labels.next}
            >
              <Icon name="next" />
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
