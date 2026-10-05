"use client";

import Image from "next/image";
import { useEffect, useRef, type MouseEvent, type TouchEvent } from "react";
import type { Photo } from "@/lib/photos";
import styles from "./Lightbox.module.css";

type LightboxProps = {
  photos: Photo[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export function Lightbox({ photos, index, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const photo = index === null ? null : photos[index];
  const many = photos.length > 1;

  // Guarda la posición actual para que pulsaciones seguidas no usen un valor antiguo.
  const current = useRef(index);
  current.current = index;

  const close = () => onChange(null);
  const step = (delta: number) => {
    if (current.current === null) return;
    current.current = (current.current + delta + photos.length) % photos.length;
    onChange(current.current);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (photo && !dialog.open) dialog.showModal();
    if (!photo && dialog.open) dialog.close();
  }, [photo]);

  useEffect(() => {
    if (!photo || !many) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onTouchStart = (event: TouchEvent) => {
    touchX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchX.current === null || !many) return;
    const dx = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  // Cerrar al pulsar fuera de la foto (en el fondo).
  const closeOnBackdrop = (event: MouseEvent) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={photo?.alt ?? "Foto ampliada"}
      onClose={close}
      onClick={closeOnBackdrop}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {photo?.src ? (
        <figure className={styles.figure} onClick={closeOnBackdrop}>
          <Image
            key={photo.id}
            className={styles.photo}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="100vw"
            quality={90}
            priority
          />
          {photo.caption ? (
            <figcaption className={styles.caption}>{photo.caption}</figcaption>
          ) : null}
        </figure>
      ) : null}

      <button
        type="button"
        className={`${styles.control} ${styles.close}`}
        onClick={close}
        aria-label="Cerrar"
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {many ? (
        <>
          <button
            type="button"
            className={`${styles.control} ${styles.prev}`}
            onClick={() => step(-1)}
            aria-label="Foto anterior"
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.control} ${styles.next}`}
            onClick={() => step(1)}
            aria-label="Foto siguiente"
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p className={styles.counter} aria-live="polite">
            {(index ?? 0) + 1} / {photos.length}
          </p>
        </>
      ) : null}
    </dialog>
  );
}
