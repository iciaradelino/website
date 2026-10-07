import type { Lang, Localized } from "@/lib/i18n";

export type Corto = {
  id: string;
  slug: string;
  title: string;
  year: number;
  duration: string;
  synopsis?: string;
  /** Ruta del vídeo en /public. Si falta, se muestra un marcador. */
  src?: string;
  featured?: boolean;
};

/** Un corto tal y como se guarda, con sus textos en cada idioma. */
type CortoEntry = Omit<Corto, "title" | "synopsis"> & {
  title: Localized;
  synopsis?: Localized;
};

const entries: CortoEntry[] = [
  {
    id: "1",
    slug: "corto-1",
    title: { es: "Sin título I", en: "Untitled I" },
    year: 2026,
    duration: "6 min",
    src: "/cortos/corto-1.mp4",
    featured: true,
  },
  {
    id: "2",
    slug: "corto-2",
    title: { es: "Sin título II", en: "Untitled II" },
    year: 2026,
    duration: "8 min",
    src: "/cortos/corto-2.mp4",
  },
];

/** Los cortos con sus textos en el idioma de la página. */
export function getCortos(lang: Lang): Corto[] {
  return entries.map(({ title, synopsis, ...corto }) => ({
    ...corto,
    title: title[lang],
    synopsis: synopsis?.[lang],
  }));
}

export function getFeaturedCorto(lang: Lang) {
  const cortos = getCortos(lang);
  return cortos.find((c) => c.featured) ?? cortos[0];
}
