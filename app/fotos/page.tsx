import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PhotoGrid } from "@/components/PhotoGrid";
import { Reveal } from "@/components/Reveal";
import { photos } from "@/lib/photos";
import ui from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: "Fotos · Historias de Gonzalo",
  description: "Lugares y momentos que acompañan a las historias",
};

export default function FotosPage() {
  return (
    <>
      <Header />
      <main className={ui.pageMain}>
        <section className={ui.section}>
          <div className={ui.inner}>
            <div className={ui.headingRow}>
              <div>
                <Reveal as="h1" className={ui.pageTitle}>
                  Fotos
                </Reveal>
                <Reveal as="p" className={ui.lede} delayMs={80}>
                  Lugares y momentos que acompañan a las historias.
                </Reveal>
              </div>
            </div>
            <PhotoGrid photos={photos} />
          </div>
        </section>
        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
