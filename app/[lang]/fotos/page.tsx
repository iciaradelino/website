import type { Metadata } from "next";
import { ForestFooter } from "@/components/ForestFooter";
import { Header } from "@/components/Header";
import { PhotoGrid } from "@/components/PhotoGrid";
import { getDictionary, type Lang } from "@/lib/i18n";
import { getPhotos } from "@/lib/photos";
import ui from "@/components/ui.module.css";

type FotosPageProps = {
  params: Promise<{ lang: Lang }>;
};

export async function generateMetadata({ params }: FotosPageProps): Promise<Metadata> {
  const { meta } = getDictionary((await params).lang);
  return {
    title: `${meta.photosTitle} · ${meta.siteTitle}`,
    description: meta.photosDescription,
  };
}

export default async function FotosPage({ params }: FotosPageProps) {
  const { lang } = await params;
  const t = getDictionary(lang);

  return (
    <>
      <Header />
      <main className={ui.pageMain}>
        <section className={ui.section}>
          <div className={ui.inner}>
            <header className={ui.pageHeader}>
              <h1 className={ui.pageHeading}>{t.photos.pageTitle}</h1>
            </header>
            <PhotoGrid photos={getPhotos(lang)} />
          </div>
        </section>
        <ForestFooter lang={lang} />
      </main>
    </>
  );
}
