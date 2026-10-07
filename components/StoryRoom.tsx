"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readingMinutes, storyExcerpt, storyPath, type Story } from "@/lib/stories";
import styles from "./StoryRoom.module.css";

type StoryRoomProps = {
  stories: Story[];
};

/** Cuanto más larga la frase, más pequeña la letra, para que quepa en la lámina. */
function plateSize(excerpt: string) {
  return excerpt.length < 45 ? 10 : excerpt.length < 110 ? 8 : 6.4;
}

/**
 * Sala de lectura: a la izquierda, la guía de la sala con todos los títulos;
 * a la derecha, una sola lámina bajo la luz con la primera frase del título
 * que se señala.
 */
export function StoryRoom({ stories }: StoryRoomProps) {
  const [active, setActive] = useState(0);

  // Cada visita empieza con una historia distinta bajo la luz.
  useEffect(() => {
    setActive(Math.floor(Math.random() * stories.length));
  }, [stories.length]);

  const story = stories[active];
  const excerpt = storyExcerpt(story);

  return (
    <div className={styles.room}>
      <ol className={styles.guide}>
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
      </ol>

      <div className={styles.stage} aria-hidden>
        <Link href={storyPath(story.slug)} className={styles.plateLink} tabIndex={-1}>
          <span className={styles.plate} lang={story.lang}>
            <span
              key={story.id}
              className={styles.excerpt}
              style={{ fontSize: `${plateSize(excerpt)}cqi` }}
            >
              {excerpt}
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
      </div>
    </div>
  );
}
