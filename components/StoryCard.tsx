"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { storyPath, type Story } from "@/lib/stories";
import styles from "./StoryCard.module.css";

type StoriesGridProps = {
  stories: Story[];
};

type StoryCardProps = {
  story: Story;
  delayMs?: number;
};

export function StoriesGrid({ stories }: StoriesGridProps) {
  return (
    <ul className={styles.grid}>
      {stories.map((story, index) => (
        <StoryCard key={story.id} story={story} delayMs={index * 80} />
      ))}
    </ul>
  );
}

export function StoryCard({ story, delayMs = 0 }: StoryCardProps) {
  return (
    <Reveal as="li" className={styles.card} delayMs={delayMs}>
      <Link href={storyPath(story.slug)} className={styles.link}>
        <h3
          className={styles.cardTitle}
          style={{ color: story.accent }}
          lang={story.lang}
        >
          {story.title}
        </h3>
        <div className={styles.thumb} aria-hidden />
        <p className={styles.cardDesc}>{story.summary}</p>
      </Link>
    </Reveal>
  );
}
