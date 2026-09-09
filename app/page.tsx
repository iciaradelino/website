"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { StoriesGrid } from "@/components/StoryCard";
import { stories, storyPath } from "@/lib/stories";
import styles from "./page.module.css";

export default function HomePage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section id="home" className={styles.hero}>
          <div className={styles.media} aria-hidden>
            <video
              className={styles.image}
              src="/video.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className={styles.veil} />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine}>HISTORIAS DE</span>
              <span className={styles.heroLine}>GONZALO</span>
            </h1>
            <p className={styles.heroSubtitle}>
              <span className={styles.quote}>
                “Words are never &apos;only words&apos;; they matter because they
                define the contours of what we can do.”
              </span>
              <span className={styles.quoteAuthor}>― Slavoj Žižek (el puto amo)</span>
            </p>
          </div>
        </section>

        <section id="stories" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.headingRow}>
              <Reveal as="h2" className={styles.sectionTitle}>
                Historias de Gonzalo
              </Reveal>
              <Reveal delayMs={120}>
                <button
                  type="button"
                  className={styles.viewBtn}
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
                    <svg
                      className={styles.viewIcon}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      className={styles.viewIcon}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <rect x="3" y="4" width="18" height="3" rx="1" />
                      <rect x="3" y="10.5" width="18" height="3" rx="1" />
                      <rect x="3" y="17" width="18" height="3" rx="1" />
                    </svg>
                  )}
                </button>
              </Reveal>
            </div>

            <div
              key={view}
              className={`${styles.viewPanel} ${styles.viewEnter}`}
            >
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

        <div className={styles.sectionRuleWrap} aria-hidden>
          <hr className={styles.sectionRule} />
        </div>

        <section id="about" className={`${styles.section} ${styles.aboutSection}`}>
          <div className={`${styles.inner} ${styles.aboutGrid}`}>
            <Reveal as="h2" className={styles.sectionTitle}>
              Sobre mí
            </Reveal>
            <div className={styles.copy}>
              <Reveal as="p" delayMs={80}>
                Soy Gonzalo, escritor y caminante. Nací entre montañas y
                aprendí a contar{" "}
                <strong>historias que huelen a tierra húmeda</strong>. En estos
                relatos busco lo cotidiano que se vuelve misterio: una cena, un
                tren, un bosque sin nombre.
              </Reveal>
              <Reveal as="p" delayMs={160}>
                Trabajo desde España y publico poco a poco, con paciencia. Si
                algo de lo que lees te suena a casa —o a un sitio al que aún no
                has ido—{" "}
                <strong>entonces la historia ya es también tuya</strong>.
              </Reveal>
            </div>
          </div>
        </section>

        <div className={styles.sectionRuleWrap} aria-hidden>
          <hr className={styles.sectionRule} />
        </div>

        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
