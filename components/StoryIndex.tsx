"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { readingMinutes, storyExcerpt, storyPath, type Story } from "@/lib/stories";
import styles from "./StoryIndex.module.css";

type StoryIndexProps = {
  stories: Story[];
};

/**
 * Índice de primeras líneas: cada historia aparece por su primera frase, con
 * una cartela debajo, como en el índice de una antología de poesía.
 */
export function StoryIndex({ stories }: StoryIndexProps) {
  return (
    <ol className={styles.index}>
      {stories.map((story, index) => (
        <Reveal key={story.id} as="li" className={styles.row} delayMs={index * 80}>
          <Link href={storyPath(story.slug)} className={styles.link}>
            <span className={styles.number} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.body}>
              <span className={styles.excerpt} lang={story.lang}>
                {storyExcerpt(story)}
              </span>
              <span className={styles.label}>
                <span className={styles.kind}>
                  Historia · {readingMinutes(story)} min de lectura
                </span>
                <span className={styles.name} lang={story.lang}>
                  {story.title}
                </span>
              </span>
            </span>
            <span className={styles.read} aria-hidden>
              leer →
            </span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
