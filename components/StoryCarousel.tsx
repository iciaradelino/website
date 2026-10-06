"use client";

import Link from "next/link";
import { readingMinutes, storyExcerpt, storyPath, type Story } from "@/lib/stories";
import { useDrift } from "@/lib/useDrift";
import styles from "./StoryCarousel.module.css";

/** Las frases largas se acortan para que todas las columnas tengan una altura parecida. */
const EXCERPT_LENGTH = 120;

type StoryCarouselProps = {
  stories: Story[];
};

/**
 * Índice de primeras líneas en horizontal: las historias pasan despacio de
 * derecha a izquierda, como las obras de la portada.
 */
export function StoryCarousel({ stories }: StoryCarouselProps) {
  const { viewportRef, trackRef, setRef, onClickCapture } = useDrift({ speed: 28 });

  const renderSet = (copy: boolean) => (
    <ul
      ref={copy ? undefined : setRef}
      className={styles.set}
      aria-hidden={copy || undefined}
      inert={copy}
    >
      {stories.map((story, index) => (
        <li key={story.id} className={styles.item}>
          <Link href={storyPath(story.slug)} className={styles.link} draggable={false}>
            <span className={styles.top} aria-hidden>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.read}>leer →</span>
            </span>
            <span className={styles.excerpt} lang={story.lang}>
              {storyExcerpt(story, EXCERPT_LENGTH)}
            </span>
            <span className={styles.label}>
              <span className={styles.kind}>
                Historia · {readingMinutes(story)} min de lectura
              </span>
              <span className={styles.name} lang={story.lang}>
                {story.title}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={viewportRef} className={styles.viewport} onClickCapture={onClickCapture}>
      <div ref={trackRef} className={styles.track}>
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </div>
  );
}
