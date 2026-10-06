"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { Lightbox } from "@/components/Lightbox";
import { cortos, type Corto } from "@/lib/cortos";
import { photos, type Photo } from "@/lib/photos";
import { stories, storyExcerpt, storyPath, type Story } from "@/lib/stories";
import { useDrift } from "@/lib/useDrift";
import styles from "./GalleryWall.module.css";

type Work =
  | { kind: "story"; story: Story }
  | { kind: "photo"; photo: Photo }
  | { kind: "corto"; corto: Corto };

/** Cuántas obras de cada tipo se cuelgan en la pared. */
const COUNTS = { story: 6, photo: 12, corto: 2 };

/** Velocidad del paseo, en px por segundo. */
const SPEED = 56;

/** Proporción de las láminas de las historias (ancho / alto). */
const STORY_RATIO = 3 / 4;

function shuffle<T>(list: T[]) {
  const pool = [...list];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

/**
 * Elige las obras al azar y las intercala para que no queden dos del mismo
 * tipo seguidas: cada vez se toma el tipo que más obras tiene pendientes.
 */
function pickWorks(): Work[] {
  const pools: Record<Work["kind"], Work[]> = {
    story: shuffle(stories)
      .slice(0, COUNTS.story)
      .map((story) => ({ kind: "story", story })),
    photo: shuffle(photos.filter((p) => p.src))
      .slice(0, COUNTS.photo)
      .map((photo) => ({ kind: "photo", photo })),
    corto: shuffle(cortos.filter((c) => c.src))
      .slice(0, COUNTS.corto)
      .map((corto) => ({ kind: "corto", corto })),
  };
  const works: Work[] = [];
  let previous: Work["kind"] | null = null;
  for (;;) {
    const kinds = shuffle(Object.keys(pools) as Work["kind"][])
      .filter((k) => pools[k].length)
      .sort((a, b) => pools[b].length - pools[a].length);
    if (!kinds.length) return works;
    const kind = kinds.find((k) => k !== previous) ?? kinds[0];
    works.push(pools[kind].pop()!);
    previous = kind;
  }
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
  const size = excerpt.length < 45 ? 10 : excerpt.length < 110 ? 8 : 6.4;
  return (
    <span className={styles.plate} lang={story.lang}>
      <span className={styles.excerpt} style={{ fontSize: `${size}cqi` }}>
        {excerpt}
      </span>
    </span>
  );
}

export function GalleryWall() {
  // Se eligen en el navegador para que cambien en cada visita (la página es estática).
  const [works, setWorks] = useState<Work[] | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  // Proporción real de cada vídeo, leída al cargar sus metadatos.
  const [videoRatios, setVideoRatios] = useState<Record<string, number>>({});
  // La pared se desplaza sola, se detiene al pasar el ratón y se puede arrastrar.
  // Las obras están colgadas dos veces seguidas para que el paseo no tenga fin.
  const { viewportRef: wallRef, trackRef, setRef, onClickCapture } = useDrift({
    ready: works !== null,
    speed: SPEED,
  });

  useEffect(() => {
    setWorks(pickWorks());
  }, []);

  const wallPhotos = (works ?? []).flatMap((w) => (w.kind === "photo" ? [w.photo] : []));

  // Los vídeos solo se reproducen mientras están a la vista.
  useEffect(() => {
    const wall = wallRef.current;
    if (!works || !wall) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      }
    });
    wall.querySelectorAll("video").forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [works]);

  const onVideoMetadata = (slug: string) => (event: SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = event.currentTarget;
    if (videoWidth && videoHeight) {
      setVideoRatios((ratios) => ({ ...ratios, [slug]: videoWidth / videoHeight }));
    }
  };

  const ratioOf = (work: Work) => {
    switch (work.kind) {
      case "story":
        return STORY_RATIO;
      case "photo":
        return work.photo.width / work.photo.height;
      case "corto":
        return videoRatios[work.corto.slug] ?? 16 / 9;
    }
  };

  const renderWork = (work: Work) => {
    switch (work.kind) {
      case "story": {
        const { story } = work;
        return (
          <Link href={storyPath(story.slug)} className={styles.link} draggable={false}>
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
            onClick={() => setOpen(wallPhotos.indexOf(photo))}
            aria-label={`Ampliar foto: ${photo.alt}`}
          >
            <span className={styles.frame}>
              <Image
                className={styles.media}
                src={photo.src!}
                alt=""
                fill
                sizes="(max-width: 720px) 70vw, 40vw"
                draggable={false}
              />
            </span>
            <Label kind={["Fotografía"]} name={photo.caption ?? "Sin título"} />
          </button>
        );
      }
      case "corto": {
        const { corto } = work;
        return (
          <Link href="/cortos" className={styles.link} draggable={false}>
            <span className={styles.frame}>
              <video
                className={styles.media}
                src={corto.src}
                muted
                loop
                playsInline
                preload="metadata"
                onLoadedMetadata={onVideoMetadata(corto.slug)}
                aria-hidden
              />
            </span>
            <Label kind={["Corto", corto.year, corto.duration]} name={corto.title} />
          </Link>
        );
      }
    }
  };

  const renderSet = (copy: boolean) => (
    <ul
      ref={copy ? undefined : setRef}
      className={styles.set}
      aria-hidden={copy || undefined}
      inert={copy}
    >
      {works!.map((work, i) => (
        <li
          key={i}
          className={styles.work}
          style={{ "--ratio": ratioOf(work) } as CSSProperties}
        >
          {renderWork(work)}
        </li>
      ))}
    </ul>
  );

  return (
    <section id="home" className={styles.hero}>
      <header className={styles.intro}>
        <h1 className={styles.title}>Yukan</h1>
        <p className={styles.subtitle}>Historias, fotografías y cortos</p>
      </header>

      <div
        ref={wallRef}
        className={styles.wall}
        onClickCapture={onClickCapture}
      >
        {works ? (
          <div ref={trackRef} className={styles.track}>
            {renderSet(false)}
            {renderSet(true)}
          </div>
        ) : (
          <div className={styles.pending} aria-hidden />
        )}
      </div>

      <Lightbox photos={wallPhotos} index={open} onChange={setOpen} />
    </section>
  );
}
