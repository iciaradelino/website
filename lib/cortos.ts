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

export const cortos: Corto[] = [
  {
    id: "1",
    slug: "corto-1",
    title: "Sin título I",
    year: 2026,
    duration: "6 min",
    src: "/cortos/corto-1.mp4",
    featured: true,
  },
  {
    id: "2",
    slug: "corto-2",
    title: "Sin título II",
    year: 2026,
    duration: "8 min",
    src: "/cortos/corto-2.mp4",
  },
];

export const featuredCorto = cortos.find((c) => c.featured) ?? cortos[0];
