import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ForestFooter } from "@/components/ForestFooter";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { StoryIndex } from "@/components/StoryIndex";
import { formatDate, getDictionary, locales, type Lang } from "@/lib/i18n";
import { getOtherStories, getStory, isSectionBreak, storySlugs } from "@/lib/stories";
import styles from "./page.module.css";

type StoryPageProps = {
  params: Promise<{ lang: Lang; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((lang) => storySlugs.map((slug) => ({ lang, slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const { meta } = getDictionary(lang);
  const story = getStory(lang, slug);
  if (!story) return { title: meta.storyFallback };

  return {
    title: `${story.title} · ${meta.siteTitle}`,
    description: story.summary,
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { lang, slug } = await params;
  const t = getDictionary(lang);
  const story = getStory(lang, slug);
  if (!story) notFound();

  const others = getOtherStories(lang, slug);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <article className={styles.article} lang={story.lang}>
          <div className={styles.inner}>
            <h1 className={styles.title} style={{ color: story.accent }}>
              {story.title}
            </h1>
            {story.epigraph ? (
              <p className={styles.epigraph}>{story.epigraph}</p>
            ) : null}
            {story.date ? (
              <p className={styles.date}>
                <time dateTime={story.date}>{formatDate(lang, story.date)}</time>
              </p>
            ) : null}
            <div className={styles.body}>
              {story.content.map((paragraph, index) =>
                isSectionBreak(paragraph) ? (
                  <div key={index} className={styles.break}>
                    <span aria-hidden>{paragraph}</span>
                  </div>
                ) : (
                  <p key={index}>{paragraph}</p>
                ),
              )}
            </div>
            {story.note ? (
              <aside className={styles.note} aria-label={t.stories.authorNote}>
                <hr className={styles.noteRule} />
                <div>
                  <p className={styles.noteLabel}>{t.stories.authorNote}</p>
                  <p className={styles.noteText}>{story.note}</p>
                </div>
              </aside>
            ) : null}
          </div>
        </article>

        <section className={styles.others} aria-label={t.stories.others}>
          <div className={styles.inner}>
            <Reveal as="h2" className={styles.sectionTitle}>
              {t.stories.others}
            </Reveal>
            <StoryIndex stories={others} />
          </div>
        </section>

        <ForestFooter lang={lang} />
      </main>
    </>
  );
}
