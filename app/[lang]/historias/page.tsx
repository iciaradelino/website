import type { Metadata } from "next";
import { ForestFooter } from "@/components/ForestFooter";
import { Header } from "@/components/Header";
import { StoryRows } from "@/components/StoryRows";
import { getDictionary, type Lang } from "@/lib/i18n";
import { getStories } from "@/lib/stories";
import ui from "@/components/ui.module.css";

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
      <main className={ui.pageMain} style={{ overflowX: "clip" }}>
        <section id="stories" className={ui.section}>
          <div className={ui.inner}>
            <header className={ui.pageHeader}>
              <h1 className={ui.pageHeading}>{t.stories.pageTitle}</h1>
            </header>
          </div>
          <StoryRows stories={getStories(lang)} />
        </section>
        <ForestFooter lang={lang} />
      </main>
    </>
  );
}
