"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import type { Corto } from "@/lib/cortos";
import styles from "./Corto.module.css";

function CortoVideo({ corto, autoPlay = false }: { corto: Corto; autoPlay?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Se reproduce sin sonido mientras está a la vista (los navegadores solo dejan
  // empezar solos a los vídeos silenciados); los controles permiten activar el sonido.
  useEffect(() => {
    const video = videoRef.current;
    if (!autoPlay || !video) return;
    video.muted = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay]);

  if (!corto.src) {
    return (
      <div className={styles.placeholder} role="img" aria-label="Corto próximamente">
        <span className={styles.soon}>próximamente</span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={styles.video}
      src={corto.src}
      controls
      muted={autoPlay}
      loop={autoPlay}
      preload="metadata"
      playsInline
      aria-label={corto.title}
    />
  );
}

function CortoMeta({ corto }: { corto: Corto }) {
  return (
    <p className={styles.meta}>
      {corto.year} · {corto.duration}
    </p>
  );
}

/**
 * Sala de proyección: al entrar, las luces bajan y el corto se proyecta en el
 * centro, bajo el haz del proyector.
 */
export function ScreeningRoom({
  corto,
  className = "",
  heading,
}: {
  corto: Corto;
  className?: string;
  heading: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightsOff, setLightsOff] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setLightsOff(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cortos"
      className={`${className} ${styles.screening} ${lightsOff ? styles.lightsOff : ""}`}
    >
      {heading}

      <Reveal className={styles.screen}>
        <CortoVideo corto={corto} autoPlay />
      </Reveal>

      <Reveal className={styles.caption} delayMs={120}>
        <p className={styles.kind}>
          Corto · {corto.year} · {corto.duration}
        </p>
        <h3 className={styles.screenTitle}>{corto.title}</h3>
        {corto.synopsis ? <p className={styles.synopsis}>{corto.synopsis}</p> : null}
      </Reveal>

    </section>
  );
}

export function CortosList({ cortos }: { cortos: Corto[] }) {
  return (
    <ul className={styles.list}>
      {cortos.map((corto, index) => (
        <Reveal key={corto.id} as="li" className={styles.item} delayMs={index * 80}>
          <CortoVideo corto={corto} />
          <div className={styles.itemText}>
            <h3 className={styles.itemTitle}>{corto.title}</h3>
            <CortoMeta corto={corto} />
            {corto.synopsis ? <p className={styles.synopsis}>{corto.synopsis}</p> : null}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
