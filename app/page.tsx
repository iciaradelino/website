"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { About } from "@/components/About";
import { ScreeningRoom } from "@/components/Corto";
import { Footer } from "@/components/Footer";
import { GalleryWall } from "@/components/GalleryWall";
import { Header } from "@/components/Header";
import { PhotoWall } from "@/components/PhotoWall";
import { Reveal } from "@/components/Reveal";
import { StoryRoom } from "@/components/StoryRoom";
import { featuredCorto } from "@/lib/cortos";
import { photos } from "@/lib/photos";
import { stories } from "@/lib/stories";
import ui from "@/components/ui.module.css";
import styles from "./page.module.css";

/** Cuántas historias se muestran en la sala de la portada. */
const STORY_COUNT = 5;

function RoomHeading({
  room,
  title,
  link,
  centered = false,
  tight = false,
}: {
  room: string;
  title: ReactNode;
  link?: { href: string; label: string };
  centered?: boolean;
  tight?: boolean;
}) {
  return (
    <div
      className={`${ui.inner} ${ui.roomHeading} ${centered ? ui.centered : ""} ${tight ? ui.tight : ""}`}
    >
      <div className={ui.roomTitles}>
        <Reveal as="p" className={ui.kicker}>
          {room}
        </Reveal>
        <Reveal as="h2" className={ui.sectionTitle} delayMs={60}>
          {title}
        </Reveal>
      </div>
      {link ? (
        <Reveal className={ui.roomLinkWrap} delayMs={120}>
          <Link href={link.href} className={ui.roomLink}>
            {link.label}
            <span className={ui.roomLinkArrow} aria-hidden>
              →
            </span>
          </Link>
        </Reveal>
      ) : null}
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

        <section id="stories" className={`${ui.section} ${styles.storiesSection}`}>
          <RoomHeading
            room="Sala I"
            title="Historias destacadas"
            link={{ href: "/historias", label: "ver todas" }}
            tight
          />
          <Reveal className={ui.inner} delayMs={120}>
            <StoryRoom stories={stories.slice(0, STORY_COUNT)} />
          </Reveal>
        </section>

        <section id="photos" className={`${ui.section} ${styles.photosSection}`}>
          <RoomHeading
            room="Sala II"
            title="Fotos recientes"
            link={{ href: "/fotos", label: "ver todas" }}
          />
          <div className={ui.inner}>
            <PhotoWall photos={photos} />
          </div>
        </section>

        <ScreeningRoom
          corto={featuredCorto}
          className={`${ui.section} ${styles.cortosSection}`}
          heading={
            <RoomHeading
              room="Sala III"
              title="Cortos"
              link={{ href: "/cortos", label: "ver todos" }}
              centered
            />
          }
        />

        <About />

        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
