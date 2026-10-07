import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
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
            <Reveal>
              <h1 className={styles.title} style={{ color: story.accent }}>
                {story.title}
              </h1>
            </Reveal>
            {story.epigraph ? (
              <Reveal as="p" className={styles.epigraph} delayMs={80}>
                {story.epigraph}
              </Reveal>
            ) : null}
            {story.date ? (
              <Reveal as="p" className={styles.date} delayMs={80}>
                <time dateTime={story.date}>{formatDate(lang, story.date)}</time>
              </Reveal>
            ) : null}
            <div className={styles.body}>
              {story.content.map((paragraph, index) =>
                isSectionBreak(paragraph) ? (
                  <Reveal key={index} className={styles.break} delayMs={120}>
                    <span aria-hidden>{paragraph}</span>
                  </Reveal>
                ) : (
                  <Reveal as="p" key={index} delayMs={120 + Math.min(index, 8) * 50}>
                    {paragraph}
                  </Reveal>
                ),
              )}
            </div>
            {story.note ? (
              <aside className={styles.note} aria-label={t.stories.authorNote}>
                <hr className={styles.noteRule} />
                <Reveal delayMs={80}>
                  <p className={styles.noteLabel}>{t.stories.authorNote}</p>
                  <p className={styles.noteText}>{story.note}</p>
                </Reveal>
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

        <Reveal>
          <Footer lang={lang} />
        </Reveal>
      </main>
    </>
  );
}
