"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";
import { pickRandomPhotos, type Photo } from "@/lib/photos";
import { useDictionary } from "@/lib/useLang";
import styles from "./PhotoWall.module.css";

type PhotoWallProps = {
  photos: Photo[];
};

/** Huecos de la pared, de izquierda a derecha. Cada uno pide una orientación. */
const SLOTS = ["portraitLeft", "big", "stackTop", "stackBottom", "portraitRight"] as const;
type Slot = (typeof SLOTS)[number];

const PORTRAIT_SLOTS: Slot[] = ["portraitLeft", "portraitRight"];

/** Orden en el que se cuelgan, para que la pared se llene desde el centro. */
const HANG_ORDER: Slot[] = ["big", "portraitLeft", "stackTop", "portraitRight", "stackBottom"];

/**
 * Elige fotos al azar según la forma de cada hueco: dos verticales y tres
 * horizontales, para que la composición funcione en cada visita.
 */
function hang(photos: Photo[]) {
  const shuffled = pickRandomPhotos(photos, photos.length);
  const portraits = shuffled.filter((p) => p.height > p.width);
  const landscapes = shuffled.filter((p) => p.height <= p.width);
  const hung: Partial<Record<Slot, Photo>> = {};
  for (const slot of SLOTS) {
    hung[slot] = PORTRAIT_SLOTS.includes(slot)
      ? (portraits.shift() ?? landscapes.shift())
      : (landscapes.shift() ?? portraits.shift());
  }
  return hung;
}

/**
 * Pared colgada a mano: fotos de distintos tamaños, alineadas arriba y abajo,
 * que se cuelgan una a una al llegar a la sala.
 */
export function PhotoWall({ photos }: PhotoWallProps) {
  // Se eligen en el navegador para que cambien en cada visita (la página es estática).
  const [hung, setHung] = useState<Partial<Record<Slot, Photo>> | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const t = useDictionary().photos;

  useEffect(() => {
    setHung(hang(photos));
  }, [photos]);

  if (!hung) return <div className={styles.pending} aria-hidden />;

  // El visor recorre las fotos en el orden de la pared.
  const shown = SLOTS.flatMap((slot) => (hung[slot] ? [hung[slot]] : []));

  const renderSlot = (slot: Slot) => {
    const photo = hung[slot];
    if (!photo) return null;
    const index = shown.indexOf(photo);
    return (
      <Reveal
        className={`${styles.item} ${styles[slot]}`}
        delayMs={HANG_ORDER.indexOf(slot) * 140}
        style={{ "--ratio": photo.width / photo.height } as CSSProperties}
      >
        <button
          type="button"
          className={styles.frame}
          onClick={() => setOpen(index)}
          aria-label={t.enlarge(photo.alt)}
        >
          <Image
            className={styles.photo}
            src={photo.src!}
            alt=""
            fill
            sizes={slot === "big" ? "(max-width: 720px) 100vw, 45vw" : "(max-width: 720px) 50vw, 22vw"}
          />
        </button>
      </Reveal>
    );
  };

  return (
    <>
      <div className={styles.room}>
        <div className={styles.wall}>
          <div className={`${styles.col} ${styles.colPortraitLeft}`}>{renderSlot("portraitLeft")}</div>
          <div className={`${styles.col} ${styles.colBig}`}>{renderSlot("big")}</div>
          <div className={`${styles.col} ${styles.colStack}`}>
            {renderSlot("stackTop")}
            {renderSlot("stackBottom")}
          </div>
          <div className={`${styles.col} ${styles.colPortraitRight}`}>{renderSlot("portraitRight")}</div>
        </div>
      </div>
      <Lightbox photos={shown} index={open} onChange={setOpen} />
    </>
  );
}
