import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import ui from "./ui.module.css";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={`${ui.section} ${styles.about}`}>
      <div className={`${ui.inner} ${styles.grid}`}>
        <Reveal className={styles.figure}>
          <Image
            className={styles.photo}
            src="/sobre-mi.jpg"
            alt="Gonzalo con una cámara entre hierbas altas al atardecer"
            fill
            sizes="(min-width: 960px) 30vw, 100vw"
          />
        </Reveal>

        <div className={styles.text}>
          <Reveal as="h2" className={ui.sectionTitle}>
            Sobre mí
          </Reveal>
          <Reveal as="p" className={styles.lead} delayMs={80}>
            Soy Gonzalo, escritor y caminante. Nací entre montañas y aprendí a
            contar <em>historias que huelen a tierra húmeda</em>.
          </Reveal>
          <Reveal as="p" className={styles.body} delayMs={140}>
            Busco lo cotidiano que se vuelve misterio —una cena, un tren, un
            bosque sin nombre— y lo cuento con palabras, fotos y vídeo.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
