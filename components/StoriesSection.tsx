"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { StoriesGrid } from "@/components/StoryCard";
import { storyPath, type Story } from "@/lib/stories";
import ui from "./ui.module.css";
import styles from "./StoriesSection.module.css";

type StoriesSectionProps = {
  title: string;
  stories: Story[];
};

export function StoriesSection({ title, stories }: StoriesSectionProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section id="stories" className={ui.section}>
      <div className={ui.inner}>
        <div className={ui.headingRow}>
          <Reveal as="h1" className={ui.pageTitle}>
            {title}
          </Reveal>
          <Reveal delayMs={120}>
            <button
              type="button"
              className={ui.pill}
              onClick={() => setView((v) => (v === "grid" ? "list" : "grid"))}
              aria-pressed={view === "list"}
              aria-label={
                view === "grid"
                  ? "Cambiar a vista de lista"
                  : "Cambiar a vista de cuadrícula"
              }
            >
              <span>vista</span>
              {view === "grid" ? (
                <svg className={ui.pillIcon} viewBox="0 0 24 24" aria-hidden>
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              ) : (
                <svg className={ui.pillIcon} viewBox="0 0 24 24" aria-hidden>
                  <rect x="3" y="4" width="18" height="3" rx="1" />
                  <rect x="3" y="10.5" width="18" height="3" rx="1" />
                  <rect x="3" y="17" width="18" height="3" rx="1" />
                </svg>
              )}
            </button>
          </Reveal>
        </div>

        <div key={view} className={`${styles.viewPanel} ${styles.viewEnter}`}>
          {view === "grid" ? (
            <StoriesGrid stories={stories} />
          ) : (
            <ul className={styles.list}>
              {stories.map((story, index) => (
                <Reveal
                  key={story.id}
                  as="li"
                  className={styles.listItem}
                  delayMs={index * 70}
                >
                  {index > 0 ? <hr className={styles.divider} /> : null}
                  <Link href={storyPath(story.slug)} className={styles.listRow}>
                    <h3
                      className={styles.listTitle}
                      style={{ color: story.accent }}
                      lang={story.lang}
                    >
                      {story.title}
                    </h3>
                    <div className={styles.listThumb} aria-hidden />
                    <p className={styles.listDesc}>{story.description}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
