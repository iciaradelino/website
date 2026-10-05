import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import type { Photo } from "@/lib/photos";
import styles from "./PhotoGrid.module.css";

const COLUMNS = 3;

type PhotoGridProps = {
  photos: Photo[];
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

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
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
              <figure className={styles.figure}>
                {photo.src ? (
                  <Image
                    className={styles.photo}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 720px) 33vw, 100vw"
                  />
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
            </Reveal>
          ))}
        </ul>
      ))}
    </div>
  );
}
