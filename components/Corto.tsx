import { Reveal } from "@/components/Reveal";
import type { Corto } from "@/lib/cortos";
import styles from "./Corto.module.css";

function CortoVideo({ corto }: { corto: Corto }) {
  if (!corto.src) {
    return (
      <div className={styles.placeholder} role="img" aria-label="Corto próximamente">
        <span className={styles.soon}>próximamente</span>
      </div>
    );
  }

  return (
    <video
      className={styles.video}
      src={corto.src}
      controls
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
        <CortoVideo corto={corto} />
      </Reveal>
      <Reveal className={styles.featureText} delayMs={120}>
        <p className={styles.label}>Corto destacado</p>
        <h3 className={styles.featureTitle}>{corto.title}</h3>
        <CortoMeta corto={corto} />
        <p className={styles.synopsis}>{corto.synopsis}</p>
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
            <p className={styles.synopsis}>{corto.synopsis}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
