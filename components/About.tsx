import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import ui from "./ui.module.css";
import styles from "./About.module.css";

const EMAIL = "gonzalogallego@gmail.com";

export function About() {
  return (
    <section id="about" className={`${ui.section} ${styles.about}`}>
      <div className={`${ui.inner} ${styles.grid}`}>
        <Reveal className={styles.portrait}>
          <figure className={styles.figure}>
            <Image
              className={styles.photo}
              src="/sobre-mi.jpg"
              alt="Gonzalo con una cámara entre hierbas altas al atardecer"
              fill
              sizes="(min-width: 960px) 38vw, 100vw"
            />
          </figure>
          <p className={styles.caption}>Gonzalo, entre la hierba alta</p>
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
            En estos relatos busco lo cotidiano que se vuelve misterio: una
            cena, un tren, un bosque sin nombre. Trabajo desde España y publico
            poco a poco, con paciencia. Si algo de lo que lees te suena a casa
            —o a un sitio al que aún no has ido— entonces la historia ya es
            también tuya.
          </Reveal>

          <Reveal delayMs={200}>
            <blockquote className={styles.quote}>
              <p>
                “Words are never &apos;only words&apos;; they matter because they
                define the contours of what we can do.”
              </p>
              <cite>Slavoj Žižek</cite>
            </blockquote>
          </Reveal>

          <Reveal delayMs={260}>
            <dl className={styles.facts}>
              <div>
                <dt>Desde</dt>
                <dd>España</dd>
              </div>
              <div>
                <dt>Trabaja con</dt>
                <dd>Palabras, fotografía y vídeo</dd>
              </div>
              <div>
                <dt>Escríbeme</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
