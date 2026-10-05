export type Corto = {
  id: string;
  slug: string;
  title: string;
  year: number;
  duration: string;
  synopsis: string;
  /** Ruta del vídeo en /public. Si falta, se muestra un marcador. */
  src?: string;
  featured?: boolean;
};

export const cortos: Corto[] = [
  {
    id: "1",
    slug: "raices",
    title: "Raíces",
    year: 2025,
    duration: "4 min",
    synopsis:
      "Un paseo lento por el bosque donde crecí. Sin palabras: solo el ruido de las hojas y lo que queda bajo la tierra cuando nadie mira.",
    src: "/video.mp4",
    featured: true,
  },
  {
    id: "2",
    slug: "quietud",
    title: "Quietud",
    year: 2025,
    duration: "3 min",
    synopsis:
      "Un único plano, una tarde que no termina. Un ejercicio sobre esperar sin saber qué se espera.",
    src: "/video-still.mp4",
  },
  {
    id: "3",
    slug: "tren-de-medianoche",
    title: "Tren de medianoche",
    year: 2024,
    duration: "6 min",
    synopsis:
      "Adaptación de la historia del mismo nombre. Un vagón, dos desconocidos y una estación que no aparece en ningún horario.",
  },
];

export const featuredCorto = cortos.find((c) => c.featured) ?? cortos[0];
