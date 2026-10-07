import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { getDictionary, type Lang } from "@/lib/i18n";
import ui from "./ui.module.css";
import styles from "./About.module.css";

/** Presentación al final de la exposición: el retrato en grande y, al lado, el saludo. */
export function About({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).about;

  return (
    <section id="about" className={`${ui.section} ${styles.about}`}>
      <div className={`${ui.inner} ${styles.grid}`}>
        <Reveal className={styles.figure}>
          <Image
            className={styles.photo}
            src="/sobre-mi.jpg"
            alt={t.photoAlt}
            width={1858}
            height={1224}
            sizes="(min-width: 960px) 55vw, 100vw"
          />
        </Reveal>

        <div className={styles.text}>
          <Reveal as="p" className={ui.kicker}>
            {t.kicker}
          </Reveal>
          <Reveal as="h2" className={styles.hello} delayMs={60}>
            {t.hello}
          </Reveal>
          <Reveal as="p" className={styles.lead} delayMs={120}>
            {t.leadStart} <em>{t.leadEm}</em>.
          </Reveal>
          <Reveal as="p" className={styles.body} delayMs={180}>
            {t.body}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
