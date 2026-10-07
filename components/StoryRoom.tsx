"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { readingMinutes, storyExcerpt, storyPath, type Story } from "@/lib/stories";
import styles from "./StoryRoom.module.css";

type StoryRoomProps = {
  stories: Story[];
  /** Rótulo de la sala, arriba a la izquierda. */
  heading: ReactNode;
  /** Enlace a todas las historias, arriba a la derecha, sobre la lámina. */
  link: ReactNode;
};

/** Cuanto más larga la frase, más pequeña la letra, para que quepa en la lámina. */
function plateSize(excerpt: string) {
  return excerpt.length < 45 ? 10 : excerpt.length < 110 ? 8 : 6.4;
}

/**
 * Sala de lectura en dos columnas: a la izquierda, el rótulo y la guía con los
 * títulos; a la derecha, el enlace y una sola lámina bajo la luz con la primera
 * frase del título que se señala. Las dos columnas miden lo mismo.
 */
export function StoryRoom({ stories, heading, link }: StoryRoomProps) {
  const [active, setActive] = useState(0);

  // Cada visita empieza con una historia distinta bajo la luz.
  useEffect(() => {
    setActive(Math.floor(Math.random() * stories.length));
  }, [stories.length]);

  const story = stories[active];
  const excerpt = storyExcerpt(story);

  return (
    <div className={styles.room}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.link}>{link}</div>

      <Reveal as="ol" className={styles.guide} delayMs={120}>
        {stories.map((s, index) => (
          <li key={s.id}>
            <Link
              href={storyPath(s.slug)}
              className={`${styles.entry} ${index === active ? styles.current : ""}`}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className={styles.number} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.entryText}>
                <span className={styles.title} lang={s.lang}>
                  {s.title}
                </span>
                {/* En pantallas estrechas no hay lámina: la frase va debajo del título. */}
                <span className={styles.inlineExcerpt} lang={s.lang}>
                  {storyExcerpt(s, 110)}
                </span>
              </span>
              <span className={styles.minutes}>{readingMinutes(s)} min</span>
            </Link>
          </li>
        ))}
      </Reveal>

      <Reveal className={styles.stage} delayMs={180}>
        <Link
          href={storyPath(story.slug)}
          className={styles.stageLink}
          tabIndex={-1}
          aria-hidden
        >
          {/* La lámina ocupa el alto que queda y su ancho sale de la proporción 3:4. */}
          <span className={styles.plateArea}>
            <span className={styles.plateLink}>
              <span className={styles.plate} lang={story.lang}>
                <span
                  key={story.id}
                  className={styles.excerpt}
                  style={{ fontSize: `${plateSize(excerpt)}cqi` }}
                >
                  {excerpt}
                </span>
              </span>
            </span>
          </span>
          <span className={styles.label}>
            <span className={styles.kind}>
              Historia · {readingMinutes(story)} min de lectura
            </span>
            <span key={story.id} className={styles.name}>
              {story.title}
            </span>
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
