import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { StoryGrid } from "@/components/StoryGrid";
import { stories } from "@/lib/stories";
import ui from "@/components/ui.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Historias · Historias de Gonzalo",
  description: "Mis mejores relatos y poemas",
};

export default function HistoriasPage() {
  return (
    <>
      <Header />
      <main className={ui.pageMain}>
        <section id="stories" className={ui.section}>
          <div className={ui.inner}>
            <header className={styles.intro}>
              <Reveal as="h1" className={styles.title}>
                Historias de una vida sin contar
              </Reveal>
              <Reveal as="p" className={styles.subtitle} delayMs={100}>
                Mis mejores relatos y poemas
              </Reveal>
            </header>
            <StoryGrid stories={stories} />
          </div>
        </section>
        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
