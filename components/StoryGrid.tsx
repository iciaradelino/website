import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { readingMinutes, storyExcerpt, storyPath, type Story } from "@/lib/stories";
import styles from "./StoryGrid.module.css";

type StoryGridProps = {
  stories: Story[];
};

/**
 * Tonos para las láminas. Son seis para que, en dos columnas, ninguna historia
 * comparta color con la de al lado ni con la de arriba.
 */
const TONES = ["#a9c7b1", "#d8b46a", "#d99a9a", "#9fb4d6", "#c7a6d9", "#d7926b"];

/** Rejilla de dos columnas: cada historia es una lámina con su propio color. */
export function StoryGrid({ stories }: StoryGridProps) {
  return (
    <ol className={styles.grid}>
      {stories.map((story, index) => (
        <Reveal
          key={story.id}
          as="li"
          className={styles.cell}
          delayMs={(index % 2) * 100 + Math.min(index, 6) * 40}
        >
          <Link
            href={storyPath(story.slug)}
            className={styles.card}
            style={{ "--tone": TONES[index % TONES.length] } as CSSProperties}
          >
            <span className={styles.number} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.excerpt} lang={story.lang}>
              {storyExcerpt(story, 160)}
            </span>
            <span className={styles.label}>
              <span className={styles.name} lang={story.lang}>
                {story.title}
              </span>
              <span className={styles.kind}>
                {readingMinutes(story)} min de lectura
                {story.lang === "en" ? " · en inglés" : ""}
                <span className={styles.read} aria-hidden>
                  leer →
                </span>
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
