"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { About } from "@/components/About";
import { CortoFeature } from "@/components/Corto";
import { Footer } from "@/components/Footer";
import { GalleryWall } from "@/components/GalleryWall";
import { Header } from "@/components/Header";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { Reveal } from "@/components/Reveal";
import { StoryCarousel } from "@/components/StoryCarousel";
import { featuredCorto } from "@/lib/cortos";
import { photos } from "@/lib/photos";
import { stories } from "@/lib/stories";
import ui from "@/components/ui.module.css";

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
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <Header />
      <main className={ui.landing}>
        <GalleryWall />

        <section id="stories" className={ui.section}>
          <div className={ui.inner}>
            <SectionHeading title="Historias" href="/historias" linkLabel="ver todas" />
          </div>
          <Reveal delayMs={120}>
            <StoryCarousel stories={stories} />
          </Reveal>
        </section>

        <section id="photos" className={ui.section}>
          <div className={ui.inner}>
            <SectionHeading title="Fotos" href="/fotos" linkLabel="ver todas" />
          </div>
          <Reveal delayMs={120}>
            <PhotoCarousel photos={photos} />
          </Reveal>
        </section>

        <section id="cortos" className={ui.section}>
          <div className={ui.inner}>
            <SectionHeading title="Cortos" href="/cortos" linkLabel="ver todos" />
            <CortoFeature corto={featuredCorto} />
          </div>
        </section>

        <About />

        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
