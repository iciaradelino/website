"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Lightbox } from "@/components/Lightbox";
import { cortos, type Corto } from "@/lib/cortos";
import { photos, type Photo } from "@/lib/photos";
import { stories, storyExcerpt, storyPath, type Story } from "@/lib/stories";
import styles from "./Triptych.module.css";

type Work =
  | { kind: "story"; story: Story }
  | { kind: "photo"; photo: Photo }
  | { kind: "corto"; corto: Corto };

const FRAMES = 3;

function shuffle<T>(list: T[]) {
  const pool = [...list];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

/**
 * Cada marco elige primero un tipo al azar (historia, foto o corto) y luego una
 * obra de ese tipo, para que los cortos —que son pocos— salgan tan a menudo
 * como el resto. Si un tipo se agota, se elige entre los que quedan.
 */
function pickWorks(count: number): Work[] {
  const pools = {
    story: shuffle(stories).map((story): Work => ({ kind: "story", story })),
    photo: shuffle(photos.filter((p) => p.src)).map((photo): Work => ({ kind: "photo", photo })),
    corto: shuffle(cortos.filter((c) => c.src)).map((corto): Work => ({ kind: "corto", corto })),
  };
  const works: Work[] = [];
  while (works.length < count) {
    const kinds = (Object.keys(pools) as (keyof typeof pools)[]).filter((k) => pools[k].length);
    if (!kinds.length) break;
    works.push(pools[kinds[Math.floor(Math.random() * kinds.length)]].pop()!);
  }
  return works;
}

function yearOf(date?: string) {
  return date ? new Date(date).getFullYear() : null;
}

function Label({ kind, name }: { kind: (string | number | null)[]; name: ReactNode }) {
  return (
    <span className={styles.label}>
      <span className={styles.kind}>{kind.filter(Boolean).join(" · ")}</span>
      <span className={styles.name}>{name}</span>
    </span>
  );
}

function StoryPlate({ story }: { story: Story }) {
  const excerpt = storyExcerpt(story);
  // Cuanto más larga la frase, más pequeña la letra, para que quepa en la lámina.
  const size = excerpt.length < 45 ? 9 : excerpt.length < 110 ? 7.4 : 6;
  return (
    <span className={styles.plate} lang={story.lang}>
      <span className={styles.excerpt} style={{ fontSize: `${size}cqi` }}>
        {excerpt}
      </span>
    </span>
  );
}

export function Triptych() {
  // Se eligen en el navegador para que cambien en cada visita (la página es estática).
  const [works, setWorks] = useState<Work[] | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    setWorks(pickWorks(FRAMES));
  }, []);

  const shownPhotos = (works ?? []).flatMap((w) => (w.kind === "photo" ? [w.photo] : []));

  const renderWork = (work: Work) => {
    switch (work.kind) {
      case "story": {
        const { story } = work;
        return (
          <Link href={storyPath(story.slug)} className={styles.link}>
            <span className={styles.frame}>
              <StoryPlate story={story} />
            </span>
            <Label kind={["Historia", yearOf(story.date)]} name={story.title} />
          </Link>
        );
      }
      case "photo": {
        const { photo } = work;
        return (
          <button
            type="button"
            className={styles.link}
            onClick={() => setOpen(shownPhotos.indexOf(photo))}
            aria-label={`Ampliar foto: ${photo.alt}`}
          >
            <span className={styles.frame}>
              <Image
                className={styles.media}
                src={photo.src!}
                alt=""
                fill
                sizes="(max-width: 720px) 80vw, 33vw"
              />
            </span>
            <Label kind={["Fotografía"]} name={photo.caption ?? "Sin título"} />
          </button>
        );
      }
      case "corto": {
        const { corto } = work;
        return (
          <Link href="/cortos" className={styles.link}>
            <span className={styles.frame}>
              <video
                className={styles.media}
                src={corto.src}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden
              />
            </span>
            <Label kind={["Corto", corto.year, corto.duration]} name={corto.title} />
          </Link>
        );
      }
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <header className={styles.intro}>
        <h1 className={styles.title}>Historias de Gonzalo</h1>
        <p className={styles.quote}>
          <span>
            “Words are never &apos;only words&apos;; they matter because they define the
            contours of what we can do.”
          </span>
          <span className={styles.quoteAuthor}>― Slavoj Žižek (el puto amo)</span>
        </p>
      </header>

      <ul className={styles.triptych}>
        {works
          ? works.map((work, i) => (
              <li key={i} className={styles.work} style={{ "--i": i } as CSSProperties}>
                {renderWork(work)}
              </li>
            ))
          : Array.from({ length: FRAMES }, (_, i) => (
              <li key={i} className={styles.work} aria-hidden>
                <span className={`${styles.frame} ${styles.pending}`} />
              </li>
            ))}
      </ul>

      <Lightbox photos={shownPhotos} index={open} onChange={setOpen} />
    </section>
  );
}
