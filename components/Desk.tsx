"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Lightbox } from "@/components/Lightbox";
import { featuredCorto } from "@/lib/cortos";
import { photos, pickRandomPhotos, type Photo } from "@/lib/photos";
import { stories, storyPath, type Story } from "@/lib/stories";
import styles from "./Desk.module.css";

/**
 * Hueco de la mesa donde cae un papel. Las posiciones (x, y) son el centro del
 * papel en % de la mesa; w es el ancho en % del ancho de la mesa. d es la
 * altura sobre la mesa: cuanto más alto, más arriba queda y más se mueve con el
 * cursor. "mobile" es la versión para móvil; sin ella, el papel se oculta.
 */
type Slot = {
  x: number;
  y: number;
  w: number;
  r: number;
  d: number;
  mobile?: { x: number; y: number; w: number };
};

const TITLE_SLOT: Slot = { x: 50, y: 50, w: 26, r: -1.5, d: 1, mobile: { x: 50, y: 47, w: 84 } };
const CORTO_SLOT: Slot = { x: 73, y: 29, w: 18, r: 2.5, d: 0.75, mobile: { x: 62, y: 84, w: 62 } };

const STORY_SLOTS: Slot[] = [
  { x: 11, y: 24, w: 11, r: -7, d: 0.5, mobile: { x: 24, y: 14, w: 40 } },
  { x: 27, y: 44, w: 10.5, r: 5, d: 0.55 },
  { x: 14, y: 78, w: 11, r: 3, d: 0.45, mobile: { x: 22, y: 82, w: 38 } },
  { x: 41, y: 21, w: 10.5, r: -3, d: 0.4, mobile: { x: 62, y: 27, w: 36 } },
  { x: 90, y: 23, w: 10.5, r: 8, d: 0.45 },
  { x: 77, y: 63, w: 11, r: -4, d: 0.4 },
  { x: 48, y: 83, w: 11, r: -8, d: 0.35 },
  { x: 90, y: 80, w: 10.5, r: 5, d: 0.6 },
];

const PHOTO_SLOTS: Slot[] = [
  { x: 25, y: 16, w: 13, r: 4, d: 0.35, mobile: { x: 76, y: 11, w: 46 } },
  { x: 8, y: 52, w: 9, r: -4, d: 0.5, mobile: { x: 17, y: 69, w: 32 } },
  { x: 30, y: 82, w: 13, r: -6, d: 0.6 },
  { x: 57, y: 14, w: 12, r: 6, d: 0.3 },
  { x: 89, y: 51, w: 9, r: -5, d: 0.8, mobile: { x: 84, y: 69, w: 30 } },
  { x: 64, y: 83, w: 13, r: 3, d: 0.55 },
  { x: 36, y: 61, w: 10, r: -9, d: 0.25 },
  { x: 66, y: 57, w: 10, r: 7, d: 0.2 },
];

/** Los papeles son algo más grandes que su hueco para que se monten unos sobre otros. */
const SPREAD = 1.15;

/** Las fotos verticales se estrechan para que ocupen lo mismo que las horizontales. */
const PORTRAIT = 0.72;

/** Desplazamiento máximo (px) de un papel a altura 1. */
const PARALLAX = 28;

function slotStyle(slot: Slot, index: number): CSSProperties {
  return {
    "--x": slot.x,
    "--y": slot.y,
    "--w": slot.w * SPREAD,
    "--r": `${slot.r}deg`,
    "--d": slot.d,
    "--z": Math.round(slot.d * 100),
    "--mx": slot.mobile?.x ?? slot.x,
    "--my": slot.mobile?.y ?? slot.y,
    "--mw": slot.mobile?.w ?? slot.w,
    "--delay": `${200 + index * 45}ms`,
  } as CSSProperties;
}

function slotClass(slot: Slot, ...extra: string[]) {
  return [styles.paper, slot.mobile ? "" : styles.desktopOnly, ...extra].join(" ");
}

function pickRandom<T>(list: T[], count: number) {
  const pool = [...list];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function Desk() {
  const deskRef = useRef<HTMLElement>(null);
  // Se eligen en el navegador para que la mesa cambie en cada visita.
  const [items, setItems] = useState<{ stories: Story[]; photos: Photo[] } | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    setItems({
      stories: pickRandom(stories, STORY_SLOTS.length),
      photos: pickRandomPhotos(photos, PHOTO_SLOTS.length),
    });
  }, []);

  // Parallax y lámpara: el cursor mueve la luz y los papeles se desplazan según
  // su altura. En pantallas táctiles todo deriva despacio por sí solo.
  useEffect(() => {
    const desk = deskRef.current;
    if (!desk) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const touch = window.matchMedia("(hover: none)").matches;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let visible = true;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = desk.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const tick = (time: number) => {
      if (touch) {
        target.x = Math.sin(time / 4200) * 0.55;
        target.y = Math.cos(time / 5300) * 0.45;
      }
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      desk.style.setProperty("--px", (-current.x * PARALLAX).toFixed(2));
      desk.style.setProperty("--py", (-current.y * PARALLAX).toFixed(2));
      desk.style.setProperty("--lx", `${((current.x + 1) * 50).toFixed(2)}%`);
      desk.style.setProperty("--ly", `${((current.y + 1) * 50).toFixed(2)}%`);
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    // Solo se anima mientras la mesa está a la vista.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    observer.observe(desk);
    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section id="home" ref={deskRef} className={styles.desk}>
      <div className={styles.table}>

        <div className={slotClass(TITLE_SLOT, styles.titlePaper)} style={slotStyle(TITLE_SLOT, 0)}>
          <div className={styles.sheet}>
            <h1 className={styles.title}>
              <span>Historias de</span>
              <span>Gonzalo</span>
            </h1>
            <p className={styles.quote}>
              <span>
                “Words are never &apos;only words&apos;; they matter because they define
                the contours of what we can do.”
              </span>
              <span className={styles.quoteAuthor}>― Slavoj Žižek (el puto amo)</span>
            </p>
          </div>
        </div>

        {featuredCorto.src ? (
          <Link
            href="/cortos"
            className={slotClass(CORTO_SLOT, styles.cortoPaper)}
            style={slotStyle(CORTO_SLOT, 1)}
            aria-label={`Ver corto: ${featuredCorto.title}`}
          >
            <div className={styles.sheet}>
              <video
                className={styles.cortoVideo}
                src={featuredCorto.src}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden
              />
              <span className={styles.caption}>
                <strong>{featuredCorto.title}</strong>
                <span>corto · {featuredCorto.duration}</span>
              </span>
            </div>
          </Link>
        ) : null}

        {items?.stories.map((story, i) => {
          const slot = STORY_SLOTS[i];
          return (
            <Link
              key={story.id}
              href={storyPath(story.slug)}
              className={slotClass(slot, styles.storyPaper)}
              style={slotStyle(slot, i + 2)}
              aria-label={`Leer historia: ${story.title}`}
            >
              <div className={styles.sheet}>
                <span className={styles.label}>Historia</span>
                <span className={styles.storyTitle}>{story.title}</span>
                <span className={styles.summary}>{story.summary}</span>
                <span className={styles.read}>leer →</span>
              </div>
            </Link>
          );
        })}

        {items?.photos.map((photo, i) => {
          const base = PHOTO_SLOTS[i];
          const scale = photo.height > photo.width ? PORTRAIT : 1;
          const slot: Slot = {
            ...base,
            w: base.w * scale,
            mobile: base.mobile && { ...base.mobile, w: base.mobile.w * scale },
          };
          return (
            <button
              key={photo.id}
              type="button"
              className={slotClass(slot, styles.photoPaper)}
              style={slotStyle(slot, i + 2 + STORY_SLOTS.length)}
              onClick={() => setOpen(i)}
              aria-label={`Ampliar foto: ${photo.alt}`}
            >
              <div className={styles.sheet}>
                {photo.src ? (
                  <Image
                    className={styles.photo}
                    src={photo.src}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 720px) 50vw, 20vw"
                  />
                ) : null}
              </div>
            </button>
          );
        })}

      </div>

      <div className={styles.lamp} aria-hidden />

      {items ? <Lightbox photos={items.photos} index={open} onChange={setOpen} /> : null}
    </section>
  );
}
