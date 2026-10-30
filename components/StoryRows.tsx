"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { storyExcerpt, storyPath, type Story } from "@/lib/stories";
import { useDictionary, useLang } from "@/lib/useLang";
import styles from "./StoryRows.module.css";

/**
 * Foto de Gonzalo que acompaña a cada historia, elegida por lo que cuenta, y
 * el punto de la foto que debe quedar a la vista al recortarla en una franja.
 */
const backgrounds: Record<string, { src: string; position?: string }> = {
  // Un prado de verano y una flor blanca.
  "aquel-prado-en-el-que-vivimos": { src: "/fotos/hierba.jpg" },
  // Una orilla que se oscurece.
  "arenas-sin-playa": { src: "/fotos/playa.jpg", position: "center 70%" },
  // El mar que no devuelve.
  algas: { src: "/fotos/palmeras-reflejo.jpg" },
  // Trazos de lápiz: la roca estriada en blanco y negro.
  "el-limite-de-un-poeta": { src: "/fotos/roca.jpg" },
  // Un espejismo en el desierto.
  "la-incertidumbre-del-calor": { src: "/fotos/desierto.jpg", position: "center 60%" },
  // La Muerte bajo un sol negro.
  "el-frio-del-filo": { src: "/fotos/eclipse.jpg", position: "center 45%" },
  // El túnel.
  "la-luz-esta-al-principio-del-tunel": { src: "/fotos/tunel.jpg" },
  // Unos segundos de amanecer.
  "en-el-pasillo-de-mi-casa": { src: "/fotos/eclipse-horizonte.jpg", position: "center 65%" },
  // Un fuego en escena, al anochecer.
  "el-teatro": { src: "/fotos/barca-fuego.jpg" },
  // Un niño toca para la Luna.
  goldie: { src: "/fotos/eclipse-horizonte-vertical.jpg", position: "center 55%" },
  // Un prado inundado por las tormentas.
  "dont-ever-change": { src: "/fotos/llanura-tormenta.jpg" },
  // Dos almas junto al agua: dos aves en la orilla.
  "two-beautiful-bodies": { src: "/fotos/arcoiris-lago.jpg", position: "center 80%" },
};

/** La burbuja de «leer» va abajo a la derecha del cursor, sin taparlo. */
const BUBBLE_OFFSET = 14;

/** Cuanto más larga la frase, más pequeña la letra. */
function excerptSize(excerpt: string) {
  return excerpt.length < 60 ? styles.large : excerpt.length < 130 ? styles.medium : styles.small;
}

type StoryRowsProps = {
  stories: Story[];
  title: string;
};

/**
 * Experimento: cada historia ocupa una franja entera, con una foto de paisaje
 * de fondo y su primera frase en grande encima.
 */
export function StoryRows({ stories, title }: StoryRowsProps) {
  const lang = useLang();
  const t = useDictionary().stories;
  const listRef = useRef<HTMLOListElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  // Posición de la burbuja (x, y) y la del cursor al que persigue (tx, ty).
  const bubble = useRef({ x: 0, y: 0, tx: 0, ty: 0, on: false, offAt: 0, frame: 0 });

  /** Cada fotograma la burbuja recorre parte del camino hasta el cursor, siguiendo su trazo. */
  const follow = () => {
    const b = bubble.current;
    cancelAnimationFrame(b.frame);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = () => {
      b.x += (b.tx - b.x) * (reduced ? 1 : 0.16);
      b.y += (b.ty - b.y) * (reduced ? 1 : 0.16);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${b.x}px, ${b.y}px)`;
      }
      // Sigue mientras se vea y mientras se encoge al salir; luego se detiene.
      if (!b.on && performance.now() - b.offAt > 500) return;
      b.frame = requestAnimationFrame(step);
    };
    step();
  };

  useEffect(() => () => cancelAnimationFrame(bubble.current.frame), []);

  // Paralaje suave: el fondo de cada franja se mueve un poco más despacio que la página.
  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = [...list.querySelectorAll<HTMLElement>("[data-row]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const row of rows) {
        const rect = row.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) continue;
        // -1 cuando la franja entra por abajo, 1 cuando sale por arriba.
        const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
        row.style.setProperty("--shift", progress.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="story-rows-title">
      <header className={styles.heading}>
        <h2 id="story-rows-title" className={styles.title}>
          {title}
        </h2>
        <span className={styles.count}>{String(stories.length).padStart(2, "0")}</span>
      </header>
      <ol
        ref={listRef}
        className={styles.list}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse") return;
          const b = bubble.current;
          b.tx = event.clientX + BUBBLE_OFFSET;
          b.ty = event.clientY + BUBBLE_OFFSET;
          if (!b.on) {
            // Aparece justo en el cursor, no viene volando desde donde se quedó.
            b.x = b.tx;
            b.y = b.ty;
            b.on = true;
            cursorRef.current?.classList.add(styles.cursorOn);
            follow();
          }
        }}
        onPointerLeave={() => {
          bubble.current.on = false;
          bubble.current.offAt = performance.now();
          cursorRef.current?.classList.remove(styles.cursorOn);
        }}
      >
        {stories.map((story, index) => {
          const background = backgrounds[story.slug];
          const excerpt = storyExcerpt(story);
          return (
            <li key={story.id} data-row className={`${styles.row} ${index % 2 ? styles.right : ""}`}>
              <Link href={storyPath(lang, story.slug)} className={styles.link}>
                {background ? (
                  <span className={styles.backdrop} aria-hidden>
                    <Image
                      src={background.src}
                      alt=""
                      fill
                      sizes="100vw"
                      className={styles.photo}
                      style={{ objectPosition: background.position ?? "center" }}
                    />
                  </span>
                ) : null}
                <span className={styles.content}>
                  <Reveal as="p" className={`${styles.excerpt} ${excerptSize(excerpt)}`}>
                    <span lang={story.lang}>«{excerpt}»</span>
                  </Reveal>
                  <Reveal as="p" className={styles.name} delayMs={120}>
                    <span lang={story.lang}>{story.title}</span>
                  </Reveal>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div ref={cursorRef} className={styles.cursor} aria-hidden>
        {t.read.replace(/\s*→$/, "")}
      </div>
    </section>
  );
}
