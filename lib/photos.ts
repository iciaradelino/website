import type { Lang, Localized } from "@/lib/i18n";

export type Photo = {
  id: string;
  /** Ruta en /public. Si falta, se muestra un marcador gris. */
  src?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

/** Una foto tal y como se guarda, con sus textos en cada idioma. */
type PhotoEntry = Omit<Photo, "alt" | "caption"> & {
  alt: Localized;
  caption?: Localized;
};

const entries: PhotoEntry[] = [
  {
    id: "1",
    src: "/fotos/calle-de-noche.jpg",
    alt: {
      es: "Calle de noche con escaparates iluminados, cables eléctricos y un cielo azul intenso entre nubes oscuras",
      en: "Street at night with lit shop windows, power lines and an intense blue sky between dark clouds",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "2",
    src: "/fotos/escaleras.jpg",
    alt: {
      es: "Escaleras mecánicas en blanco y negro bajo una estructura metálica; una mujer sube y un hombre con gorra baja",
      en: "Black-and-white escalators under a metal structure; a woman goes up and a man in a cap goes down",
    },
    width: 1200,
    height: 1600,
  },
  {
    id: "3",
    src: "/fotos/desierto.jpg",
    alt: {
      es: "Hombre con sombrero de paja y túnica junto a un camello en un paisaje desértico, en blanco y negro",
      en: "Man in a straw hat and tunic beside a camel in a desert landscape, in black and white",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "4",
    src: "/fotos/llanura-tormenta.jpg",
    alt: {
      es: "Llanura verde bajo un cielo de tormenta, con montañas al fondo",
      en: "Green plain under a stormy sky, with mountains in the background",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "5",
    src: "/fotos/llanura-dorada.jpg",
    alt: {
      es: "Llanura dorada al pie de montañas con nubes bajas",
      en: "Golden plain at the foot of mountains with low clouds",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "6",
    src: "/fotos/eclipse-horizonte-vertical.jpg",
    alt: {
      es: "Eclipse total de sol sobre un horizonte anaranjado",
      en: "Total solar eclipse over an orange horizon",
    },
    width: 1200,
    height: 1600,
  },
  {
    id: "7",
    src: "/fotos/eclipse-horizonte.jpg",
    alt: {
      es: "Eclipse total de sol sobre una franja de luz naranja en el horizonte",
      en: "Total solar eclipse over a strip of orange light on the horizon",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "8",
    src: "/fotos/eclipse.jpg",
    alt: {
      es: "Eclipse total de sol en un cielo negro",
      en: "Total solar eclipse in a black sky",
    },
    width: 1200,
    height: 1600,
  },
  {
    id: "9",
    src: "/fotos/arcoiris-lago.jpg",
    alt: {
      es: "Arcoíris sobre un lago al atardecer, con dos aves en la orilla",
      en: "Rainbow over a lake at sunset, with two birds on the shore",
    },
    width: 1200,
    height: 1600,
  },
  {
    id: "10",
    src: "/fotos/doble-arcoiris.jpg",
    alt: {
      es: "Doble arcoíris sobre un lago al anochecer",
      en: "Double rainbow over a lake at dusk",
    },
    width: 1200,
    height: 1600,
  },
  {
    id: "11",
    src: "/fotos/valle-niebla.jpg",
    alt: {
      es: "Valle de pastizales con niebla entre mesetas",
      en: "Grassland valley with mist between mesas",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "12",
    src: "/fotos/casas-valle.jpg",
    alt: {
      es: "Casas y una pequeña iglesia en un valle verde bajo las montañas",
      en: "Houses and a small church in a green valley beneath the mountains",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "13",
    src: "/fotos/tienda-sombreros.jpg",
    alt: {
      es: "Interior de una tienda con sombreros colgados en la pared y un sofá cubierto de pieles",
      en: "Inside a shop with hats hanging on the wall and a sofa covered in furs",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "14",
    src: "/fotos/carretera-atardecer.jpg",
    alt: {
      es: "Carretera recta que atraviesa una llanura al atardecer",
      en: "Straight road crossing a plain at sunset",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "15",
    src: "/fotos/carretera-montana.jpg",
    alt: {
      es: "Furgoneta en una carretera que serpentea entre montañas",
      en: "Van on a road winding between mountains",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "16",
    src: "/fotos/roca.jpg",
    alt: {
      es: "Pared de roca estriada en blanco y negro",
      en: "Striated rock wall in black and white",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "17",
    src: "/fotos/banderas.jpg",
    alt: {
      es: "Banderas junto a un camino de tierra bajo un cielo azul de tormenta",
      en: "Flags beside a dirt road under a stormy blue sky",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "18",
    src: "/fotos/local-de-noche.jpg",
    alt: {
      es: "Edificio iluminado de noche bajo el último resplandor azul del cielo",
      en: "Building lit up at night under the last blue glow of the sky",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "19",
    src: "/fotos/camara.jpg",
    alt: {
      es: "Persona con camisa de cuadros sujetando una cámara frente a la cara",
      en: "Person in a plaid shirt holding a camera in front of their face",
    },
    width: 1066,
    height: 1600,
  },
  {
    id: "20",
    src: "/fotos/espejo-mercado.jpg",
    alt: {
      es: "Puestos de un mercado reflejados en un espejo redondo, en blanco y negro",
      en: "Market stalls reflected in a round mirror, in black and white",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "21",
    src: "/fotos/carretilla.jpg",
    alt: {
      es: "Hombre empujando un carro a contraluz, en blanco y negro",
      en: "Man pushing a cart against the light, in black and white",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "22",
    src: "/fotos/playa.jpg",
    alt: {
      es: "Familia caminando por la playa hacia el mar",
      en: "Family walking along the beach towards the sea",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "23",
    src: "/fotos/tunel.jpg",
    alt: {
      es: "Persona con mochila caminando por un túnel oscuro",
      en: "Person with a backpack walking through a dark tunnel",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "24",
    src: "/fotos/hierba.jpg",
    alt: {
      es: "Espigas y flores silvestres en la penumbra",
      en: "Ears of grass and wildflowers in the half-light",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "25",
    src: "/fotos/sendero.jpg",
    alt: {
      es: "Sendero iluminado por el sol entre árboles, junto a una valla",
      en: "Sunlit path between trees, beside a fence",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "26",
    src: "/fotos/barca-fuego.jpg",
    alt: {
      es: "Barca con un fuego encendido en un río entre montañas boscosas, al anochecer",
      en: "Boat with a fire burning on a river between wooded mountains, at dusk",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "27",
    src: "/fotos/palmeras-reflejo.jpg",
    alt: {
      es: "Palmeras reflejadas en el agua",
      en: "Palm trees reflected in the water",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "28",
    src: "/fotos/mural-noche.jpg",
    alt: {
      es: "Terraza de noche junto a un mural de colores",
      en: "Terrace at night beside a colorful mural",
    },
    width: 1600,
    height: 900,
  },
];

/** Las fotos con sus textos en el idioma de la página. */
export function getPhotos(lang: Lang): Photo[] {
  return entries.map(({ alt, caption, ...photo }) => ({
    ...photo,
    alt: alt[lang],
    caption: caption?.[lang],
  }));
}

/** Devuelve `count` fotos con imagen, elegidas al azar y sin repetir. */
export function pickRandomPhotos(list: Photo[], count: number) {
  const pool = list.filter((photo) => photo.src);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
