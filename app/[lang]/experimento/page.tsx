import type { Metadata } from "next";
import { ForestFooter } from "@/components/ForestFooter";
import { Header } from "@/components/Header";
import { PhotoPile } from "@/components/PhotoPile";
import { StoryRows } from "@/components/StoryRows";
import { getDictionary, type Lang } from "@/lib/i18n";
import { getPhotos } from "@/lib/photos";
import { getStories } from "@/lib/stories";
import ui from "@/components/ui.module.css";

type ExperimentoPageProps = {
  params: Promise<{ lang: Lang }>;
};

// Página de pruebas: no aparece en el menú ni en los buscadores.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const labels = {
  es: { close: "Cerrar", prev: "Foto anterior", next: "Foto siguiente" },
  en: { close: "Close", prev: "Previous photo", next: "Next photo" },
} satisfies Record<Lang, { close: string; prev: string; next: string }>;

export default async function ExperimentoPage({ params }: ExperimentoPageProps) {
  const { lang } = await params;

  return (
    <>
      <Header />
      <main className={ui.pageMain} style={{ overflowX: "clip" }}>
        <PhotoPile photos={getPhotos(lang)} labels={labels[lang]} />
        <StoryRows stories={getStories(lang)} title={getDictionary(lang).meta.storiesTitle} />
        <ForestFooter lang={lang} />
      </main>
    </>
  );
}
