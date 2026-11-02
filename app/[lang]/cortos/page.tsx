import type { Metadata } from "next";
import { ForestFooter } from "@/components/ForestFooter";
import { Header } from "@/components/Header";
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
          <h1 className={ui.pageHeading}>{t.cortos.soonTitle}</h1>
        </section>
        <ForestFooter lang={lang} />
      </main>
    </>
  );
}
