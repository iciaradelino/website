import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { getDictionary, type Lang } from "@/lib/i18n";
import ui from "@/components/ui.module.css";
import styles from "./page.module.css";

type CortosPageProps = {
  params: Promise<{ lang: Lang }>;
};

export async function generateMetadata({ params }: CortosPageProps): Promise<Metadata> {
  const { meta } = getDictionary((await params).lang);
  return {
    title: `${meta.cortosTitle} · ${meta.siteTitle}`,
    description: meta.cortosDescription,
  };
}

export default async function CortosPage({ params }: CortosPageProps) {
  const { lang } = await params;
  const t = getDictionary(lang);

  return (
    <>
      <Header />
      <main className={ui.pageMain}>
        <section className={styles.soon}>
          <Reveal as="h1" className={ui.pageTitle}>
            {t.cortos.soonTitle}
          </Reveal>
        </section>
        <Reveal>
          <Footer lang={lang} />
        </Reveal>
      </main>
    </>
  );
}
