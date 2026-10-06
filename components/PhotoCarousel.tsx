"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Lightbox } from "@/components/Lightbox";
import { pickRandomPhotos, type Photo } from "@/lib/photos";
import { useDrift } from "@/lib/useDrift";
import styles from "./PhotoCarousel.module.css";

type PhotoCarouselProps = {
  photos: Photo[];
  /** Cuántas fotos se cuelgan, elegidas al azar en cada visita. */
  count?: number;
};

/**
 * Fila de fotos a la misma altura, cada una con su proporción, que pasa
 * despacio como la pared de la portada. Al pulsar una, se amplía.
 */
export function PhotoCarousel({ photos, count = 12 }: PhotoCarouselProps) {
  // Se eligen en el navegador para que cambien en cada visita (la página es estática).
  const [shown, setShown] = useState<Photo[] | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const { viewportRef, trackRef, setRef, onClickCapture } = useDrift({
    ready: shown !== null,
    speed: 24,
  });

  useEffect(() => {
    setShown(pickRandomPhotos(photos, count));
  }, [photos, count]);

  if (!shown) return <div className={styles.pending} aria-hidden />;

  const renderSet = (copy: boolean) => (
    <ul
      ref={copy ? undefined : setRef}
      className={styles.set}
      aria-hidden={copy || undefined}
      inert={copy}
    >
      {shown.map((photo, index) => (
        <li
          key={photo.id}
          className={styles.item}
          style={{ "--ratio": photo.width / photo.height } as CSSProperties}
        >
          <button
            type="button"
            className={styles.frame}
            onClick={() => setOpen(index)}
            aria-label={`Ampliar foto: ${photo.alt}`}
          >
            <Image
              className={styles.photo}
              src={photo.src!}
              alt=""
              fill
              sizes="(max-width: 720px) 70vw, 30vw"
              draggable={false}
            />
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div ref={viewportRef} className={styles.viewport} onClickCapture={onClickCapture}>
        <div ref={trackRef} className={styles.track}>
          {renderSet(false)}
          {renderSet(true)}
        </div>
      </div>
      <Lightbox photos={shown} index={open} onChange={setOpen} />
    </>
  );
}
