import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { StoryGrid } from "@/components/StoryGrid";
import { getDictionary, type Lang } from "@/lib/i18n";
import { getStories } from "@/lib/stories";
import ui from "@/components/ui.module.css";
import styles from "./page.module.css";

type HistoriasPageProps = {
  params: Promise<{ lang: Lang }>;
};

export async function generateMetadata({ params }: HistoriasPageProps): Promise<Metadata> {
  const { meta } = getDictionary((await params).lang);
  return {
    title: `${meta.storiesTitle} · ${meta.siteTitle}`,
    description: meta.storiesDescription,
  };
}

export default async function HistoriasPage({ params }: HistoriasPageProps) {
  const { lang } = await params;
  const t = getDictionary(lang);

  return (
    <>
      <Header />
      <main className={ui.pageMain}>
        <section id="stories" className={ui.section}>
          <div className={ui.inner}>
            <header className={styles.intro}>
              <Reveal as="h1" className={styles.title}>
                {t.stories.pageTitle}
              </Reveal>
              <Reveal as="p" className={styles.subtitle} delayMs={100}>
                {t.stories.pageSubtitle}
              </Reveal>
            </header>
            <StoryGrid lang={lang} stories={getStories(lang)} />
          </div>
        </section>
        <Reveal>
          <Footer lang={lang} />
        </Reveal>
      </main>
    </>
  );
}
