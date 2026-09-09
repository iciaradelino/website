import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { StoriesGrid } from "@/components/StoryCard";
import {
  formatStoryDate,
  getOtherStories,
  getStory,
  stories,
} from "@/lib/stories";
import styles from "./page.module.css";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Historia" };

  return {
    title: `${story.title} · Historias de Gonzalo`,
    description: story.summary,
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const others = getOtherStories(slug);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.inner}>
            <Reveal>
              <h1 className={styles.title} style={{ color: story.accent }}>
                {story.title}
              </h1>
            </Reveal>
            <Reveal as="p" className={styles.date} delayMs={80}>
              <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
            </Reveal>
            <div className={styles.body}>
              {story.content.map((paragraph, index) => (
                <Reveal as="p" key={index} delayMs={120 + index * 50}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
            <aside className={styles.note} aria-label="Nota del autor">
              <hr className={styles.noteRule} />
              <Reveal delayMs={80}>
                <p className={styles.noteLabel}>Nota del autor</p>
                <p className={styles.noteText}>{story.note}</p>
              </Reveal>
            </aside>
          </div>
        </article>

        <section className={styles.others} aria-label="Otras historias">
          <div className={styles.inner}>
            <Reveal as="h2" className={styles.sectionTitle}>
              Otras historias
            </Reveal>
            <StoriesGrid stories={others} />
          </div>
        </section>

        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
