export type Photo = {
  id: string;
  /** Ruta en /public. Si falta, se muestra un marcador gris. */
  src?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export const photos: Photo[] = [
  {
    id: "1",
    src: "/fotos/calle-de-noche.jpg",
    alt: "Calle de noche con escaparates iluminados, cables eléctricos y un cielo azul intenso entre nubes oscuras",
    width: 1600,
    height: 900,
  },
  {
    id: "2",
    src: "/fotos/escaleras.jpg",
    alt: "Escaleras mecánicas en blanco y negro bajo una estructura metálica; una mujer sube y un hombre con gorra baja",
    width: 1200,
    height: 1600,
  },
  {
    id: "3",
    src: "/fotos/desierto.jpg",
    alt: "Hombre con sombrero de paja y túnica junto a un camello en un paisaje desértico, en blanco y negro",
    width: 1600,
    height: 901,
  },
  {
    id: "4",
    src: "/fotos/llanura-tormenta.jpg",
    alt: "Llanura verde bajo un cielo de tormenta, con montañas al fondo",
    width: 1600,
    height: 901,
  },
  {
    id: "5",
    src: "/fotos/llanura-dorada.jpg",
    alt: "Llanura dorada al pie de montañas con nubes bajas",
    width: 1600,
    height: 900,
  },
  {
    id: "6",
    src: "/fotos/eclipse-horizonte-vertical.jpg",
    alt: "Eclipse total de sol sobre un horizonte anaranjado",
    width: 1200,
    height: 1600,
  },
  {
    id: "7",
    src: "/fotos/eclipse-horizonte.jpg",
    alt: "Eclipse total de sol sobre una franja de luz naranja en el horizonte",
    width: 1600,
    height: 900,
  },
  {
    id: "8",
    src: "/fotos/eclipse.jpg",
    alt: "Eclipse total de sol en un cielo negro",
    width: 1200,
    height: 1600,
  },
  {
    id: "9",
    src: "/fotos/arcoiris-lago.jpg",
    alt: "Arcoíris sobre un lago al atardecer, con dos aves en la orilla",
    width: 1200,
    height: 1600,
  },
  {
    id: "10",
    src: "/fotos/doble-arcoiris.jpg",
    alt: "Doble arcoíris sobre un lago al anochecer",
    width: 1200,
    height: 1600,
  },
  {
    id: "11",
    src: "/fotos/valle-niebla.jpg",
    alt: "Valle de pastizales con niebla entre mesetas",
    width: 1600,
    height: 901,
  },
  {
    id: "12",
    src: "/fotos/casas-valle.jpg",
    alt: "Casas y una pequeña iglesia en un valle verde bajo las montañas",
    width: 1600,
    height: 901,
  },
  {
    id: "13",
    src: "/fotos/tienda-sombreros.jpg",
    alt: "Interior de una tienda con sombreros colgados en la pared y un sofá cubierto de pieles",
    width: 1600,
    height: 901,
  },
  {
    id: "14",
    src: "/fotos/carretera-atardecer.jpg",
    alt: "Carretera recta que atraviesa una llanura al atardecer",
    width: 1600,
    height: 900,
  },
  {
    id: "15",
    src: "/fotos/carretera-montana.jpg",
    alt: "Furgoneta en una carretera que serpentea entre montañas",
    width: 1600,
    height: 900,
  },
  {
    id: "16",
    src: "/fotos/roca.jpg",
    alt: "Pared de roca estriada en blanco y negro",
    width: 1600,
    height: 901,
  },
  {
    id: "17",
    src: "/fotos/banderas.jpg",
    alt: "Banderas junto a un camino de tierra bajo un cielo azul de tormenta",
    width: 1600,
    height: 900,
  },
  {
    id: "18",
    src: "/fotos/local-de-noche.jpg",
    alt: "Edificio iluminado de noche bajo el último resplandor azul del cielo",
    width: 1600,
    height: 901,
  },
  {
    id: "19",
    src: "/fotos/camara.jpg",
    alt: "Persona con camisa de cuadros sujetando una cámara frente a la cara",
    width: 1066,
    height: 1600,
  },
  {
    id: "20",
    src: "/fotos/espejo-mercado.jpg",
    alt: "Puestos de un mercado reflejados en un espejo redondo, en blanco y negro",
    width: 1600,
    height: 901,
  },
  {
    id: "21",
    src: "/fotos/carretilla.jpg",
    alt: "Hombre empujando un carro a contraluz, en blanco y negro",
    width: 1600,
    height: 900,
  },
  {
    id: "22",
    src: "/fotos/playa.jpg",
    alt: "Familia caminando por la playa hacia el mar",
    width: 1600,
    height: 901,
  },
  {
    id: "23",
    src: "/fotos/tunel.jpg",
    alt: "Persona con mochila caminando por un túnel oscuro",
    width: 1600,
    height: 901,
  },
  {
    id: "24",
    src: "/fotos/hierba.jpg",
    alt: "Espigas y flores silvestres en la penumbra",
    width: 1600,
    height: 901,
  },
  {
    id: "25",
    src: "/fotos/sendero.jpg",
    alt: "Sendero iluminado por el sol entre árboles, junto a una valla",
    width: 1600,
    height: 900,
  },
  {
    id: "26",
    src: "/fotos/barca-fuego.jpg",
    alt: "Barca con un fuego encendido en un río entre montañas boscosas, al anochecer",
    width: 1600,
    height: 901,
  },
  {
    id: "27",
    src: "/fotos/palmeras-reflejo.jpg",
    alt: "Palmeras reflejadas en el agua",
    width: 1600,
    height: 901,
  },
  {
    id: "28",
    src: "/fotos/mural-noche.jpg",
    alt: "Terraza de noche junto a un mural de colores",
    width: 1600,
    height: 900,
  },
];

/** Devuelve `count` fotos con imagen, elegidas al azar y sin repetir. */
export function pickRandomPhotos(list: Photo[], count: number) {
  const pool = list.filter((photo) => photo.src);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
