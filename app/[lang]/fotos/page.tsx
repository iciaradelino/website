import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PhotoGrid } from "@/components/PhotoGrid";
import { Reveal } from "@/components/Reveal";
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
            <div className={ui.headingRow}>
              <div>
                <Reveal as="h1" className={ui.pageTitle}>
                  {t.photos.pageTitle}
                </Reveal>
                <Reveal as="p" className={ui.lede} delayMs={80}>
                  {t.photos.lede}
                </Reveal>
              </div>
            </div>
            <PhotoGrid photos={getPhotos(lang)} />
          </div>
        </section>
        <Reveal>
          <Footer lang={lang} />
        </Reveal>
      </main>
    </>
  );
}
