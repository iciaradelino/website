"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { CortoFeature } from "@/components/Corto";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PhotoGrid } from "@/components/PhotoGrid";
import { Reveal } from "@/components/Reveal";
import { SectionRule } from "@/components/SectionRule";
import { StoriesGrid } from "@/components/StoryCard";
import { Triptych } from "@/components/Triptych";
import { featuredCorto } from "@/lib/cortos";
import { photos, pickRandomPhotos, type Photo } from "@/lib/photos";
import { stories } from "@/lib/stories";
import ui from "@/components/ui.module.css";
import styles from "./page.module.css";

function SectionHeading({
  title,
  href,
  linkLabel,
}: {
  title: ReactNode;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className={ui.headingRow}>
      <Reveal as="h2" className={ui.sectionTitle}>
        {title}
      </Reveal>
      <Reveal delayMs={120}>
        <Link href={href} className={ui.pill}>
          <span>{linkLabel}</span>
          <svg className={ui.pillIcon} viewBox="0 0 24 24" aria-hidden>
            <path d="M5 11h10.6l-4.3-4.3 1.4-1.4L19.4 12l-6.7 6.7-1.4-1.4 4.3-4.3H5z" />
          </svg>
        </Link>
      </Reveal>
    </div>
  );
}

export default function HomePage() {
  // Se eligen en el navegador para que cambien en cada visita (la página es estática).
  const [featuredPhotos, setFeaturedPhotos] = useState<Photo[] | null>(null);

  useEffect(() => {
    setFeaturedPhotos(pickRandomPhotos(photos, 3));
  }, []);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Triptych />

        <section id="stories" className={ui.section}>
          <div className={ui.inner}>
            <SectionHeading title="Historias" href="/historias" linkLabel="ver todas" />
            <StoriesGrid stories={stories.slice(0, 3)} />
          </div>
        </section>

        <SectionRule />

        <section id="photos" className={ui.section}>
          <div className={ui.inner}>
            <SectionHeading title="Fotos" href="/fotos" linkLabel="ver todas" />
            {featuredPhotos ? (
              <PhotoGrid photos={featuredPhotos} layout="row" />
            ) : (
              <div className={styles.photosPending} aria-hidden />
            )}
          </div>
        </section>

        <SectionRule />

        <section id="cortos" className={ui.section}>
          <div className={ui.inner}>
            <SectionHeading title="Cortos" href="/cortos" linkLabel="ver todos" />
            <CortoFeature corto={featuredCorto} />
          </div>
        </section>

        <SectionRule />

        <section id="about" className={`${ui.section} ${styles.aboutSection}`}>
          <div className={`${ui.inner} ${styles.aboutGrid}`}>
            <Reveal as="h2" className={ui.sectionTitle}>
              Sobre mí
            </Reveal>
            <div className={styles.copy}>
              <Reveal as="p" delayMs={80}>
                Soy Gonzalo, escritor y caminante. Nací entre montañas y
                aprendí a contar{" "}
                <strong>historias que huelen a tierra húmeda</strong>. En estos
                relatos busco lo cotidiano que se vuelve misterio: una cena, un
                tren, un bosque sin nombre.
              </Reveal>
              <Reveal as="p" delayMs={160}>
                Trabajo desde España y publico poco a poco, con paciencia. Si
                algo de lo que lees te suena a casa —o a un sitio al que aún no
                has ido—{" "}
                <strong>entonces la historia ya es también tuya</strong>.
              </Reveal>
            </div>
          </div>
        </section>

        <SectionRule />

        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
