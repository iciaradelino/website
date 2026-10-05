import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { StoriesSection } from "@/components/StoriesSection";
import { stories } from "@/lib/stories";
import ui from "@/components/ui.module.css";

export const metadata: Metadata = {
  title: "Historias · Historias de Gonzalo",
  description: "Historias de una vida sin contar",
};

export default function HistoriasPage() {
  return (
    <>
      <Header />
      <main className={ui.pageMain}>
        <StoriesSection title="Historias de una vida sin contar" stories={stories} />
        <Reveal>
          <Footer />
        </Reveal>
      </main>
    </>
  );
}
