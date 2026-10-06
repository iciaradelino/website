"use client";

import { useEffect, useRef } from "react";
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

export function CortoFeature({ corto }: { corto: Corto }) {
  return (
    <div className={styles.feature}>
      <Reveal className={styles.featureMedia}>
        <CortoVideo corto={corto} autoPlay />
      </Reveal>
      <Reveal className={styles.featureText} delayMs={120}>
        <p className={styles.label}>Corto destacado</p>
        <h3 className={styles.featureTitle}>{corto.title}</h3>
        <CortoMeta corto={corto} />
        {corto.synopsis ? <p className={styles.synopsis}>{corto.synopsis}</p> : null}
      </Reveal>
    </div>
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
