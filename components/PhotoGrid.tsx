"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";
import type { Photo } from "@/lib/photos";
import styles from "./PhotoGrid.module.css";

const COLUMNS = 3;

type PhotoGridProps = {
  photos: Photo[];
  /**
   * "columns": 3 columnas del mismo ancho; cada foto ocupa el ancho de su columna.
   * "row": una sola fila en la que todas las fotos tienen la misma altura.
   */
  layout?: "columns" | "row";
};

/**
 * Reparte las fotos en 3 columnas del mismo ancho, colocando cada una en la
 * columna más corta para que las alturas queden equilibradas sin recortar.
 */
function distribute(photos: Photo[]) {
  const columns = Array.from({ length: COLUMNS }, () => ({
    height: 0,
    items: [] as { photo: Photo; index: number }[],
  }));

  photos.forEach((photo, index) => {
    const shortest = columns.reduce((min, col) =>
      col.height < min.height ? col : min,
    );
    shortest.items.push({ photo, index });
    shortest.height += photo.height / photo.width;
  });

  return columns.map((col) => col.items);
}

export function PhotoGrid({ photos, layout = "columns" }: PhotoGridProps) {
  // Solo las fotos con imagen se pueden ampliar.
  const viewable = photos.filter((photo) => photo.src);
  const [open, setOpen] = useState<number | null>(null);

  const renderFigure = (photo: Photo, sizes: string) => (
    <figure className={styles.figure}>
      {photo.src ? (
        <button
          type="button"
          className={styles.zoom}
          onClick={() => setOpen(viewable.indexOf(photo))}
          aria-label={`Ampliar foto: ${photo.alt}`}
        >
          <Image
            className={styles.photo}
            src={photo.src}
            alt=""
            width={photo.width}
            height={photo.height}
            sizes={sizes}
          />
        </button>
      ) : (
        <div
          className={styles.placeholder}
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          role="img"
          aria-label={photo.alt}
        />
      )}
      {photo.caption ? (
        <figcaption className={styles.caption}>{photo.caption}</figcaption>
      ) : null}
    </figure>
  );

  return (
    <>
      {layout === "row" ? (
        <ul className={styles.row}>
          {photos.map((photo, index) => (
            <Reveal
              key={photo.id}
              as="li"
              className={styles.item}
              delayMs={index * 90}
              // El ancho de cada foto es proporcional a su relación de aspecto,
              // así todas acaban con la misma altura.
              style={{ flex: `${photo.width / photo.height} 1 0` }}
            >
              {renderFigure(photo, "(min-width: 720px) 50vw, 100vw")}
            </Reveal>
          ))}
        </ul>
      ) : (
        <div className={styles.grid}>
          {distribute(photos).map((column, colIndex) => (
            <ul key={colIndex} className={styles.column}>
              {column.map(({ photo, index }) => (
                <Reveal
                  key={photo.id}
                  as="li"
                  className={styles.item}
                  delayMs={colIndex * 90}
                  style={{ order: index }}
                >
                  {renderFigure(photo, "(min-width: 720px) 33vw, 100vw")}
                </Reveal>
              ))}
            </ul>
          ))}
        </div>
      )}
      <Lightbox photos={viewable} index={open} onChange={setOpen} />
    </>
  );
}
