import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import ui from "@/components/ui.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cortos · Historias de Gonzalo",
  description: "Próximamente...",
};

export default function CortosPage() {
  return (
    <>
      <Header />
      <main className={ui.pageMain}>
        <section className={styles.soon}>
          <Reveal as="h1" className={ui.pageTitle}>
            Próximamente
          </Reveal>
        </section>
        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
