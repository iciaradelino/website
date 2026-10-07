import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import ui from "./ui.module.css";
import styles from "./About.module.css";

/** Presentación al final de la exposición: el retrato en grande y, al lado, el saludo. */
export function About() {
  return (
    <section id="about" className={`${ui.section} ${styles.about}`}>
      <div className={`${ui.inner} ${styles.grid}`}>
        <Reveal className={styles.figure}>
          <Image
            className={styles.photo}
            src="/sobre-mi.jpg"
            alt="Gonzalo con una cámara entre hierbas altas al atardecer"
            width={1858}
            height={1224}
            sizes="(min-width: 960px) 55vw, 100vw"
          />
        </Reveal>

        <div className={styles.text}>
          <Reveal as="p" className={ui.kicker}>
            Sobre mí
          </Reveal>
          <Reveal as="h2" className={styles.hello} delayMs={60}>
            Hola, soy Gonzalo
          </Reveal>
          <Reveal as="p" className={styles.lead} delayMs={120}>
            Escritor y caminante. Nací entre montañas y aprendí a contar{" "}
            <em>historias que huelen a tierra húmeda</em>.
          </Reveal>
          <Reveal as="p" className={styles.body} delayMs={180}>
            Busco lo cotidiano que se vuelve misterio —una cena, un tren, un
            bosque sin nombre— y lo cuento con palabras, fotos y vídeo.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
