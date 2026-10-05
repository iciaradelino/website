import type { Metadata } from "next";
import { CortoFeature, CortosList } from "@/components/Corto";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { SectionRule } from "@/components/SectionRule";
import { cortos, featuredCorto } from "@/lib/cortos";
import ui from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: "Cortos · Historias de Gonzalo",
  description: "Pequeñas historias contadas con imágenes",
};

export default function CortosPage() {
  const rest = cortos.filter((c) => c.id !== featuredCorto.id);

  return (
    <>
      <Header />
      <main className={ui.pageMain}>
        <section className={ui.section}>
          <div className={ui.inner}>
            <div className={ui.headingRow}>
              <div>
                <Reveal as="h1" className={ui.pageTitle}>
                  Cortos
                </Reveal>
                <Reveal as="p" className={ui.lede} delayMs={80}>
                  Pequeñas historias contadas con imágenes.
                </Reveal>
              </div>
            </div>
            <CortoFeature corto={featuredCorto} />
          </div>
        </section>

        {rest.length > 0 ? (
          <>
            <SectionRule />
            <section className={ui.section} aria-label="Todos los cortos">
              <div className={ui.inner}>
                <div className={ui.headingRow}>
                  <Reveal as="h2" className={ui.sectionTitle}>
                    Más cortos
                  </Reveal>
                </div>
                <CortosList cortos={rest} />
              </div>
            </section>
          </>
        ) : null}

        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
