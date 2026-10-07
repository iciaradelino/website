"use client";

import { useEffect, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { About } from "@/components/About";
import { ScreeningRoom } from "@/components/Corto";
import { Footer } from "@/components/Footer";
import { GalleryWall } from "@/components/GalleryWall";
import { Header } from "@/components/Header";
import { PhotoWall } from "@/components/PhotoWall";
import { Reveal } from "@/components/Reveal";
import { StoryRoom } from "@/components/StoryRoom";
import { getFeaturedCorto } from "@/lib/cortos";
import { localePath } from "@/lib/i18n";
import { getPhotos } from "@/lib/photos";
import { getStories } from "@/lib/stories";
import { useDictionary, useLang } from "@/lib/useLang";
import ui from "@/components/ui.module.css";
import styles from "./page.module.css";

/** Cuántas historias se muestran en la sala de la portada. */
const STORY_COUNT = 5;

function RoomTitles({ room, title }: { room: string; title: ReactNode }) {
  return (
    <div className={ui.roomTitles}>
      <Reveal as="p" className={ui.kicker}>
        {room}
      </Reveal>
      <Reveal as="h2" className={ui.sectionTitle} delayMs={60}>
        {title}
      </Reveal>
    </div>
  );
}

function RoomLink({ href, label }: { href: string; label: string }) {
  return (
    <Reveal className={ui.roomLinkWrap} delayMs={120}>
      <Link href={href} className={ui.roomLink}>
        {label}
        <span className={ui.roomLinkArrow} aria-hidden>
          →
        </span>
      </Link>
    </Reveal>
  );
}

function RoomHeading({
  room,
  title,
  link,
  centered = false,
}: {
  room: string;
  title: ReactNode;
  link?: { href: string; label: string };
  centered?: boolean;
}) {
  return (
    <div className={`${ui.inner} ${ui.roomHeading} ${centered ? ui.centered : ""}`}>
      <RoomTitles room={room} title={title} />
      {link ? <RoomLink {...link} /> : null}
    </div>
  );
}

export default function HomePage() {
  const lang = useLang();
  const t = useDictionary();
  // Misma lista entre renders, para que la pared de fotos no se vuelva a colgar.
  const photos = useMemo(() => getPhotos(lang), [lang]);

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
          <div className={ui.inner}>
            <StoryRoom
              stories={getStories(lang).slice(0, STORY_COUNT)}
              heading={<RoomTitles room={t.home.room("I")} title={t.home.featuredStories} />}
              link={<RoomLink href={localePath(lang, "/historias")} label={t.home.seeAllF} />}
            />
          </div>
        </section>

        <section id="photos" className={`${ui.section} ${styles.photosSection}`}>
          <RoomHeading
            room={t.home.room("II")}
            title={t.home.recentPhotos}
            link={{ href: localePath(lang, "/fotos"), label: t.home.seeAllF }}
          />
          <div className={ui.inner}>
            <PhotoWall photos={photos} />
          </div>
        </section>

        <ScreeningRoom
          corto={getFeaturedCorto(lang)}
          className={`${ui.section} ${styles.cortosSection}`}
          heading={
            <RoomHeading
              room={t.home.room("III")}
              title={t.home.cortos}
              link={{ href: localePath(lang, "/cortos"), label: t.home.seeAllM }}
              centered
            />
          }
        />

        <About lang={lang} />

        <Reveal>
          <Footer lang={lang} />
        </Reveal>
      </main>
    </>
  );
}
