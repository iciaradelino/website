"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/photos";
import { useDictionary } from "@/lib/useLang";
import styles from "./WaveViewer.module.css";

/** Cuánto sale hacia la derecha la foto elegida en la tira, y lo ancha que es la onda. */
const WAVE_PEAK = 56;
const WAVE_WIDTH = 230;
/** Separación vertical entre las fotos de la tira. */
const GAP = 16;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

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

type WaveViewerProps = {
  photos: Photo[];
  /** La foto con la que se abre; `null` lo mantiene cerrado. */
  index: number | null;
  /** Dónde estaba la foto en la página, para que la grande crezca desde ahí. */
  origin?: DOMRect | null;
  onClose: () => void;
};

/**
 * Vista ampliada de la página de experimento: la foto elegida ocupa la derecha y
 * el resto se coloca en una tira vertical a la izquierda que ondula al desplazarse.
 */
export function WaveViewer({ index, ...props }: WaveViewerProps) {
  if (index === null) return null;
  return <Viewer key={index} start={index} {...props} />;
}

function Viewer({
  photos,
  start,
  origin,
  onClose,
}: Omit<WaveViewerProps, "index"> & { start: number }) {
  const t = useDictionary().photos;
  const n = photos.length;
  const ratios = photos.map((photo) => photo.height / photo.width);

  const [active, setActive] = useState(start);
  const [, setViewport] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lo que cambia en cada fotograma vive en refs para no re-renderizar React.
  const layout = useRef({ thumb: 0, slots: [] as number[] });
  const anim = useRef({ active: start, scroll: 0, scrollShown: 0, wave: 0, lastWheel: 0 });

  const measure = () => {
    const thumb = clamp(window.innerWidth * 0.07, 54, 110);
    let y = 0;
    const slots = ratios.map((ratio) => {
      const center = y + (thumb * ratio) / 2;
      y += thumb * ratio + GAP;
      return center;
    });
    layout.current = { thumb, slots };
  };
  if (!layout.current.slots.length) {
    measure();
    anim.current.scroll = anim.current.scrollShown = layout.current.slots[start];
  }

  /** Dónde va la foto grande: el hueco a la derecha de la tira, sin recortarla. */
  const bigRect = (i: number) => {
    const { thumb } = layout.current;
    const vw = window.innerWidth;
    const left = 28 + thumb + WAVE_PEAK + 48;
    const right = vw - clamp(vw * 0.05, 20, 64);
    const top = 40;
    const bottom = window.innerHeight - 84;
    const width = Math.min(right - left, (bottom - top) / ratios[i]);
    const height = width * ratios[i];
    return { left: (left + right - width) / 2, top: (top + bottom - height) / 2, width, height };
  };

  /** Al abrir, la foto grande crece desde donde estaba en la página. */
  const grown = useRef(false);
  const bigRef = (el: HTMLDivElement | null) => {
    if (!el || !origin || grown.current) return;
    grown.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const to = el.getBoundingClientRect();
    el.animate(
      [
        {
          transform: `translate(${origin.left - to.left}px, ${origin.top - to.top}px) scale(${origin.width / to.width}, ${origin.height / to.height})`,
        },
        { transform: "none" },
      ],
      { duration: 800, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
    );
  };

  // La tira: el desplazamiento se suaviza y su velocidad hace la onda.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const a = anim.current;
    const onResize = () => {
      measure();
      a.scroll = a.scrollShown = layout.current.slots[a.active];
      setViewport(window.innerWidth * 10000 + window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    const tick = (nowMs: number) => {
      const now = nowMs / 1000;
      const { thumb, slots } = layout.current;
      const nearestTo = (value: number) =>
        slots.reduce((best, slot, i) => (Math.abs(slot - value) < Math.abs(slots[best] - value) ? i : best), 0);

      const prev = a.scrollShown;
      a.scrollShown += (a.scroll - a.scrollShown) * (reduced ? 1 : 0.14);
      const speed = Math.abs(a.scrollShown - prev);
      a.wave += (Math.min(speed * 2.5, 46) - a.wave) * 0.08;
      // Al soltar, la tira se encaja en la foto más cercana.
      if (now - a.lastWheel > 0.18) a.scroll = slots[nearestTo(a.scroll)];
      // La foto grande cambia al instante, sin animación.
      const nearest = nearestTo(a.scrollShown);
      if (nearest !== a.active) {
        a.active = nearest;
        setActive(nearest);
      }

      const stripX = 28 + thumb / 2;
      const midY = window.innerHeight / 2;
      thumbRefs.current.forEach((el, i) => {
        if (!el) return;
        const y = midY + slots[i] - a.scrollShown;
        const rel = y - midY;
        // Onda: la foto del centro (la elegida) es la cresta; al desplazarse, además, ondula.
        const x =
          stripX +
          WAVE_PEAK * Math.exp(-((rel / WAVE_WIDTH) ** 2)) +
          a.wave * Math.sin(rel * 0.012 + now * 2);
        el.style.transform = `translate(${x - thumb / 2}px, ${y - (thumb * ratios[i]) / 2}px)`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
    // La lista de fotos no cambia mientras la vista está abierta.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // La página no se desplaza; la rueda, el dedo y las flechas mueven la tira.
  useEffect(() => {
    const a = anim.current;
    const html = document.documentElement;
    const returnFocus = document.activeElement as HTMLElement | null;
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const move = (delta: number) => {
      const { slots } = layout.current;
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
      if (event.key === "Escape") onClose();
      const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (event.key in keys) {
        event.preventDefault();
        step(keys[event.key]);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      returnFocus?.focus({ preventScroll: true });
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** La tira se mueve hasta la foto anterior o siguiente. */
  const step = (delta: number) => {
    const a = anim.current;
    a.scroll = layout.current.slots[clamp(a.active + delta, 0, n - 1)];
  };

  const { thumb } = layout.current;
  const photo = photos[active];

  return (
    <div className={styles.viewer} role="dialog" aria-modal="true" aria-label={photo.alt}>
      <div className={styles.backdrop} onClick={onClose} />
      {photos.map((item, i) => (
        <button
          key={item.id}
          type="button"
          ref={(el) => {
            thumbRefs.current[i] = el;
          }}
          className={styles.thumb}
          style={{ width: thumb, height: thumb * ratios[i] }}
          onClick={() => {
            anim.current.scroll = layout.current.slots[i];
          }}
          aria-label={item.alt}
          tabIndex={-1}
        >
          <Image src={item.src!} alt="" fill sizes="220px" draggable={false} className={styles.photo} />
        </button>
      ))}
      <div ref={bigRef} className={styles.big} style={bigRect(active)}>
        {/* Mientras carga la grande se ve la de la tira, que ya está cargada. */}
        <Image key={`${photo.id}-thumb`} src={photo.src!} alt="" fill sizes="220px" className={styles.photo} />
        <Image
          key={photo.id}
          src={photo.src!}
          alt={photo.alt}
          fill
          sizes="80vw"
          quality={90}
          priority
          onLoad={(event) => event.currentTarget.classList.add(styles.loaded)}
          className={`${styles.photo} ${styles.sharp}`}
        />
      </div>
      <button
        ref={closeRef}
        type="button"
        className={`${styles.iconButton} ${styles.close}`}
        onClick={onClose}
        aria-label={t.close}
      >
        <Icon name="close" />
      </button>
      <div className={styles.bar}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => step(-1)}
          disabled={active === 0}
          aria-label={t.previous}
        >
          <Icon name="prev" />
        </button>
        <span aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => step(1)}
          disabled={active === n - 1}
          aria-label={t.next}
        >
          <Icon name="next" />
        </button>
      </div>
    </div>
  );
}
