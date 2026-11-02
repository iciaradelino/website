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
    id: "117",
    src: "/fotos/teatro-letreros.jpg",
    alt: {
      es: "Fachada de un teatro con letreros de colores",
      en: "Theater facade with colorful signs",
    },
    width: 734,
    height: 1326,
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
    id: "50",
    src: "/fotos/rascacielos-noche.jpg",
    alt: {
      es: "Rascacielos de noche vistos desde abajo, con ventanas iluminadas de luz cálida",
      en: "Skyscrapers at night seen from below, with windows lit in warm light",
    },
    width: 1064,
    height: 1600,
  },
  {
    id: "46",
    src: "/fotos/gato.jpg",
    alt: {
      es: "Gato de pelo largo dormido sobre una alfombra de piel junto a la ventana",
      en: "Long-haired cat sleeping on a fur rug by the window",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "115",
    src: "/fotos/desierto-luz-rosada.jpg",
    alt: {
      es: "Montañas del desierto bajo una luz rosada",
      en: "Desert mountains under a pink light",
    },
    width: 1600,
    height: 787,
  },
  {
    id: "124",
    src: "/fotos/desierto-roca.jpg",
    alt: {
      es: "Roca solitaria en un desierto de arena",
      en: "A lone rock in a sandy desert",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "104",
    src: "/fotos/puerto-noche.jpg",
    alt: {
      es: "Puerto y ciudad iluminados de noche",
      en: "Harbor and city lit up at night",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "122",
    src: "/fotos/atardecer-mar.jpg",
    alt: {
      es: "Sol anaranjado poniéndose sobre el mar",
      en: "Orange sun setting over the sea",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "114",
    src: "/fotos/desierto-rojo.jpg",
    alt: {
      es: "Desierto de arena roja entre formaciones rocosas",
      en: "Red sand desert among rock formations",
    },
    width: 1230,
    height: 530,
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
    id: "76",
    src: "/fotos/arbol-iglesia.jpg",
    alt: {
      es: "Árbol de hojas secas junto a la fachada de una iglesia",
      en: "Tree with dry leaves beside a church facade",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "126",
    src: "/fotos/atardecer-lago.jpg",
    alt: {
      es: "Atardecer dorado sobre un lago con islas",
      en: "Golden sunset over a lake with islands",
    },
    width: 1600,
    height: 796,
  },
  {
    id: "52",
    src: "/fotos/terraza-desde-arriba.jpg",
    alt: {
      es: "Terraza de un café vista desde arriba, con mesas, sombrillas cerradas y sombras largas",
      en: "Café terrace seen from above, with tables, closed umbrellas and long shadows",
    },
    width: 1600,
    height: 955,
  },
  {
    id: "75",
    src: "/fotos/atardecer-vallas.jpg",
    alt: {
      es: "Siluetas de vallas publicitarias y árboles al atardecer",
      en: "Silhouettes of billboards and trees at sunset",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "59",
    src: "/fotos/coche-rojo.jpg",
    alt: {
      es: "Coche rojo antiguo aparcado de noche bajo una farola, junto a una casa iluminada",
      en: "Old red car parked at night under a streetlight, beside a lit house",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "53",
    src: "/fotos/islote-atardecer.jpg",
    alt: {
      es: "Islote cubierto de árboles en un lago en calma al atardecer, entre ramas de pino",
      en: "Tree-covered islet on a calm lake at sunset, framed by pine branches",
    },
    width: 1202,
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
    id: "77",
    src: "/fotos/caravana-campo.jpg",
    alt: {
      es: "Caravana abandonada en un campo de hierba seca",
      en: "Abandoned caravan in a field of dry grass",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "69",
    src: "/fotos/pasillo-candelabros.jpg",
    alt: {
      es: "Pasillo con un espejo antiguo entre dos candelabros encendidos",
      en: "Hallway with an antique mirror between two lit candelabras",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "112",
    src: "/fotos/jarron-espigas.jpg",
    alt: {
      es: "Jarrón de cristal con espigas secas junto a una vela",
      en: "Glass vase with dried grasses beside a candle",
    },
    width: 999,
    height: 1499,
  },
  {
    id: "49",
    src: "/fotos/skyline-atardecer.jpg",
    alt: {
      es: "Rascacielos a contraluz bajo un sol anaranjado, con andamios en primer plano",
      en: "Skyscrapers backlit by an orange sun, with scaffolding in the foreground",
    },
    width: 1600,
    height: 682,
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
    id: "123",
    src: "/fotos/atardecer-poste.jpg",
    alt: {
      es: "Poste solitario en el horizonte al atardecer",
      en: "A lone pole on the horizon at sunset",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "89",
    src: "/fotos/edificios-noche.jpg",
    alt: {
      es: "Edificios iluminados de noche",
      en: "Buildings lit up at night",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "87",
    src: "/fotos/espigas-doradas.jpg",
    alt: {
      es: "Espigas de trigo doradas a contraluz",
      en: "Golden ears of wheat against the light",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "67",
    src: "/fotos/bicicletas-camioneta.jpg",
    alt: {
      es: "Bicicletas en la caja de una camioneta bajo árboles otoñales",
      en: "Bicycles in the bed of a pickup truck under autumn trees",
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
    id: "120",
    src: "/fotos/oveja-establo.jpg",
    alt: {
      es: "Oveja en un establo de madera iluminado por la luz de la ventana",
      en: "Sheep in a wooden barn lit by window light",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "44",
    src: "/fotos/barrera-noche.jpg",
    alt: {
      es: "Barrera con señal de stop frente a una caseta iluminada de noche, rodeada de andamios",
      en: "Barrier with a stop sign in front of a lit booth at night, surrounded by scaffolding",
    },
    width: 1582,
    height: 837,
  },
  {
    id: "88",
    src: "/fotos/papa-noel.jpg",
    alt: {
      es: "Figura de Papá Noel en un trineo rojo entre árboles",
      en: "Santa Claus figure on a red sleigh among trees",
    },
    width: 1600,
    height: 737,
  },
  {
    id: "119",
    src: "/fotos/rebano-ovejas.jpg",
    alt: {
      es: "Jinete con un rebaño de ovejas en una llanura frente a una montaña nevada",
      en: "Rider with a flock of sheep on a plain before a snowy mountain",
    },
    width: 1600,
    height: 767,
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
    id: "70",
    src: "/fotos/calle-noche-faros.jpg",
    alt: {
      es: "Calle de noche con faros de coches y gente en la acera",
      en: "Street at night with car headlights and people on the sidewalk",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "107",
    src: "/fotos/gasolinera-abandonada.jpg",
    alt: {
      es: "Gasolinera abandonada junto a una carretera",
      en: "Abandoned gas station beside a road",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "63",
    src: "/fotos/cortacesped-parque.jpg",
    alt: {
      es: "Hombre en un cortacésped rojo entre palmeras en un parque",
      en: "Man on a red mower among palm trees in a park",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "61",
    src: "/fotos/palmeras-marquesina.jpg",
    alt: {
      es: "Palmeras y autobuses vistos bajo una marquesina de colores",
      en: "Palm trees and buses seen from under a colorful canopy",
    },
    width: 1600,
    height: 900,
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
  },  {
    id: "29",
    src: "/fotos/tormenta-azul.jpg",
    alt: {
      es: "Tormenta nocturna iluminada por dentro con reflejos azules y blancos, sobre las luces de un pueblo",
      en: "Night storm lit from within with blue and white glows, above the lights of a town",
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
    id: "58",
    src: "/fotos/camion-campo.jpg",
    alt: {
      es: "Camión azul en un camino de tierra entre un campo verde y otro dorado",
      en: "Blue truck on a dirt road between a green field and a golden one",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "121",
    src: "/fotos/rio-valle.jpg",
    alt: {
      es: "Río que serpentea por un valle de hierba",
      en: "River winding through a grassy valley",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "102",
    src: "/fotos/skater.jpg",
    alt: {
      es: "Skater saltando frente a un muro con grafitis",
      en: "Skater jumping in front of a graffiti wall",
    },
    width: 1600,
    height: 900,
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
    id: "100",
    src: "/fotos/aseos-portatiles.jpg",
    alt: {
      es: "Camión y aseos portátiles en un parque",
      en: "Truck and portable toilets in a park",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "43",
    src: "/fotos/plaza-desde-arriba.jpg",
    alt: {
      es: "Una persona camina por una plaza soleada vista desde arriba a través de un cristal",
      en: "A person walks across a sunny plaza seen from above through glass",
    },
    width: 1600,
    height: 706,
  },
  {
    id: "105",
    src: "/fotos/casa-palmeras.jpg",
    alt: {
      es: "Casa blanca entre palmeras y pinos",
      en: "White house among palm trees and pines",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "65",
    src: "/fotos/pescador-mar.jpg",
    alt: {
      es: "Hombre de espaldas pescando en un mar verde azulado",
      en: "Man seen from behind fishing in a blue-green sea",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "106",
    src: "/fotos/casa-vegetacion.jpg",
    alt: {
      es: "Casa entre la vegetación con el sol de frente",
      en: "House among greenery with the sun shining through",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "93",
    src: "/fotos/flores-rojas-hojas.jpg",
    alt: {
      es: "Flores rojas entre hojas tropicales",
      en: "Red flowers among tropical leaves",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "95",
    src: "/fotos/palmeras-cielo.jpg",
    alt: {
      es: "Palmeras bajo un cielo azul con nubes",
      en: "Palm trees under a blue sky with clouds",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "80",
    src: "/fotos/senal-calle-arboles.jpg",
    alt: {
      es: "Señal de calle bajo los árboles frente a edificios",
      en: "Street sign under trees in front of buildings",
    },
    width: 1600,
    height: 900,
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
    id: "62",
    src: "/fotos/rocas-agua-turquesa.jpg",
    alt: {
      es: "Rocas en agua turquesa vistas por encima de una barandilla",
      en: "Rocks in turquoise water seen over a railing",
    },
    width: 1600,
    height: 900,
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
    id: "84",
    src: "/fotos/puesto-noche.jpg",
    alt: {
      es: "Puesto callejero iluminado de noche con luz verde",
      en: "Street stall lit with green light at night",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "81",
    src: "/fotos/skyline-mar.jpg",
    alt: {
      es: "Rascacielos de una ciudad sobre el mar turquesa",
      en: "City skyscrapers above the turquoise sea",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "86",
    src: "/fotos/caseta-socorrista.jpg",
    alt: {
      es: "Caseta de socorrista en la playa frente a edificios y palmeras",
      en: "Lifeguard hut on the beach in front of buildings and palm trees",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "71",
    src: "/fotos/ciudad-bahia.jpg",
    alt: {
      es: "Vista de una ciudad junto a una bahía turquesa",
      en: "View of a city beside a turquoise bay",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "92",
    src: "/fotos/edificio-blanco.jpg",
    alt: {
      es: "Edificio blanco y hojas de palmera contra un cielo azul",
      en: "White building and palm fronds against a blue sky",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "79",
    src: "/fotos/mural-patio.jpg",
    alt: {
      es: "Mural colorido junto a una mesa de picnic en un patio",
      en: "Colorful mural beside a picnic table in a courtyard",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "91",
    src: "/fotos/torre-electrica-niebla.jpg",
    alt: {
      es: "Torre eléctrica en la niebla junto a una carretera",
      en: "Power pylon in the fog beside a road",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "74",
    src: "/fotos/llanura-nubes.jpg",
    alt: {
      es: "Llanura con árboles bajo un cielo de nubes bajas",
      en: "Plain with trees beneath a sky of low clouds",
    },
    width: 1600,
    height: 900,
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
    id: "72",
    src: "/fotos/lancha-crucero.jpg",
    alt: {
      es: "Lancha a toda velocidad junto a un crucero en el puerto",
      en: "Speedboat racing past a cruise ship in the harbor",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "101",
    src: "/fotos/senal-mar.jpg",
    alt: {
      es: "Señal solitaria en medio de un mar turquesa",
      en: "A lone sign in the middle of a turquoise sea",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "110",
    src: "/fotos/costa-calas.jpg",
    alt: {
      es: "Costa con calas y montañas sobre un mar azul",
      en: "Coastline with coves and mountains above a blue sea",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "116",
    src: "/fotos/desierto-valle.jpg",
    alt: {
      es: "Valle desértico entre montañas bajo un cielo azul",
      en: "Desert valley between mountains under a blue sky",
    },
    width: 1600,
    height: 618,
  },
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
    id: "111",
    src: "/fotos/casas-prado.jpg",
    alt: {
      es: "Casas blancas sobre un prado de flores silvestres al anochecer",
      en: "White houses above a meadow of wildflowers at dusk",
    },
    width: 1600,
    height: 985,
  },
  {
    id: "108",
    src: "/fotos/helicoptero.jpg",
    alt: {
      es: "Helicóptero cargando agua contra un cielo dorado",
      en: "Helicopter carrying water against a golden sky",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "78",
    src: "/fotos/mar-rocas.jpg",
    alt: {
      es: "Olas oscuras rompiendo contra unas rocas",
      en: "Dark waves breaking against rocks",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "94",
    src: "/fotos/antena-palmera.jpg",
    alt: {
      es: "Antena de telefonía y una palmera contra el cielo azul",
      en: "Phone mast and a palm tree against the blue sky",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "82",
    src: "/fotos/coche-deportivo.jpg",
    alt: {
      es: "Coche deportivo oscuro con luces traseras rojas entre rascacielos al anochecer",
      en: "Dark sports car with red taillights among skyscrapers at dusk",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "109",
    src: "/fotos/molino-viento.jpg",
    alt: {
      es: "Molino de viento contra un cielo claro",
      en: "Windmill against a clear sky",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "103",
    src: "/fotos/rascacielos-curvo.jpg",
    alt: {
      es: "Rascacielos de formas curvas visto desde abajo",
      en: "Curvy skyscraper seen from below",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "60",
    src: "/fotos/calle-anochecer.jpg",
    alt: {
      es: "Tres personas caminan por una calle al anochecer bajo farolas y cables eléctricos",
      en: "Three people walk down a street at dusk under streetlights and power lines",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "47",
    src: "/fotos/mar.jpg",
    alt: {
      es: "Superficie del mar azul oscuro con olas suaves",
      en: "Dark blue sea surface with gentle waves",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "45",
    src: "/fotos/orquideas.jpg",
    alt: {
      es: "Orquídeas azules y violetas con fondo desenfocado",
      en: "Blue and violet orchids against a blurred background",
    },
    width: 1021,
    height: 1532,
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
    id: "68",
    src: "/fotos/arboles-cielo-azul.jpg",
    alt: {
      es: "Siluetas de árboles y cables eléctricos contra un cielo azul intenso",
      en: "Silhouettes of trees and power lines against an intense blue sky",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "97",
    src: "/fotos/valla-anochecer.jpg",
    alt: {
      es: "Gran valla publicitaria en una ciudad al anochecer",
      en: "Large billboard in a city at dusk",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "51",
    src: "/fotos/luna-arboles.jpg",
    alt: {
      es: "Luna creciente en un cielo violeta sobre siluetas de árboles al anochecer",
      en: "Crescent moon in a violet sky above tree silhouettes at dusk",
    },
    width: 863,
    height: 1300,
  },
  {
    id: "85",
    src: "/fotos/edificio-bruma.jpg",
    alt: {
      es: "Edificio blanco en la bruma junto a una montaña",
      en: "White building in the haze beside a mountain",
    },
    width: 1600,
    height: 900,
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
    id: "64",
    src: "/fotos/pescadores-muelle.jpg",
    alt: {
      es: "Pescadores en un muelle junto al mar, en blanco y negro",
      en: "Fishermen on a pier by the sea, in black and white",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "54",
    src: "/fotos/flores-rojas-medina.jpg",
    alt: {
      es: "Calle de una medina en blanco y negro donde solo destacan en rojo las flores que carga una persona",
      en: "Black-and-white medina street where only the flowers someone is carrying stand out in red",
    },
    width: 1200,
    height: 1600,
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
    id: "55",
    src: "/fotos/anciano-palmeras.jpg",
    alt: {
      es: "Anciano con turbante y bastón sentado en un banco entre dos palmeras junto a una muralla, en blanco y negro",
      en: "Old man in a turban with a cane sitting on a bench between two palm trees by a wall, in black and white",
    },
    width: 1200,
    height: 1600,
  },
  {
    id: "125",
    src: "/fotos/duna.jpg",
    alt: {
      es: "Persona bajando por una gran duna, en blanco y negro",
      en: "Person running down a large dune, in black and white",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "66",
    src: "/fotos/barca-mar-gris.jpg",
    alt: {
      es: "Pequeña barca sola en un mar gris",
      en: "A small boat alone on a grey sea",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "48",
    src: "/fotos/caravana-camellos.jpg",
    alt: {
      es: "Un hombre guía una caravana de camellos con jinetes por el horizonte del desierto, en blanco y negro",
      en: "A man leads a camel caravan with riders along the desert horizon, in black and white",
    },
    width: 1066,
    height: 1600,
  },
  {
    id: "90",
    src: "/fotos/arboles-viento.jpg",
    alt: {
      es: "Árboles y ramas movidos por el viento, en blanco y negro",
      en: "Trees and branches blown by the wind, in black and white",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "57",
    src: "/fotos/patinador.jpg",
    alt: {
      es: "Patinador cruzando un paso de cebra junto a un cono, en blanco y negro",
      en: "Skater crossing a zebra crossing beside a cone, in black and white",
    },
    width: 1600,
    height: 1200,
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
    id: "118",
    src: "/fotos/hombre-sombrero-taller.jpg",
    alt: {
      es: "Hombre con sombrero trabajando en un taller, en blanco y negro",
      en: "Man in a hat working in a workshop, in black and white",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "32",
    src: "/fotos/tormenta-resplandor.jpg",
    alt: {
      es: "Resplandor blanco de un relámpago entre nubes estratificadas sobre las colinas",
      en: "White glow of lightning between layered clouds above the hills",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "73",
    src: "/fotos/escaleras-mecanicas-noche.jpg",
    alt: {
      es: "Escaleras mecánicas iluminadas en un pasaje oscuro",
      en: "Lit escalators in a dark passage",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "42",
    src: "/fotos/tormenta-colinas.jpg",
    alt: {
      es: "Nubes de tormenta iluminadas detrás de una línea de colinas",
      en: "Storm clouds lit up behind a line of hills",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "30",
    src: "/fotos/tormenta-violeta.jpg",
    alt: {
      es: "Nubes de tormenta teñidas de violeta por un relámpago, sobre colinas oscuras",
      en: "Storm clouds tinted violet by lightning, above dark hills",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "34",
    src: "/fotos/tormenta-cumulos.jpg",
    alt: {
      es: "Cúmulos iluminados desde dentro por los relámpagos, bajo un cielo negro",
      en: "Cumulus clouds lit from within by lightning, under a black sky",
    },
    width: 1600,
    height: 901,
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
    id: "36",
    src: "/fotos/tormenta-cabo.jpg",
    alt: {
      es: "Tormenta iluminada sobre un cabo con una torre, reflejada en el mar",
      en: "Lit storm above a headland with a tower, reflected in the sea",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "40",
    src: "/fotos/rayo-nube.jpg",
    alt: {
      es: "Un rayo dentro de una nube de tormenta azulada sobre las luces de la costa",
      en: "A bolt inside a bluish storm cloud above the lights of the coast",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "37",
    src: "/fotos/nube-violeta.jpg",
    alt: {
      es: "Torre de nubes de tormenta con reflejos violetas en la oscuridad",
      en: "Tower of storm clouds with violet glows in the dark",
    },
    width: 1600,
    height: 901,
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
    id: "39",
    src: "/fotos/tormenta-mar.jpg",
    alt: {
      es: "Tormenta sobre el mar con un rayo que cae al horizonte y su reflejo en el agua",
      en: "Storm over the sea with a bolt striking the horizon and its reflection on the water",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "31",
    src: "/fotos/tormenta-capas.jpg",
    alt: {
      es: "Capas de nubes iluminadas de blanco por un relámpago en plena noche",
      en: "Layers of cloud lit white by lightning in the middle of the night",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "83",
    src: "/fotos/cocina-contraluz.jpg",
    alt: {
      es: "Silueta de una persona en una cocina a contraluz de la ventana",
      en: "Silhouette of a person in a kitchen against the window light",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "33",
    src: "/fotos/tormenta-rayo.jpg",
    alt: {
      es: "Un pequeño rayo asoma entre nubes iluminadas sobre un pueblo dormido",
      en: "A small bolt peeks out between lit clouds above a sleeping town",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "56",
    src: "/fotos/tormenta-rayo-azul.jpg",
    alt: {
      es: "Tormenta nocturna con un rayo en zigzag sobre nubes azuladas iluminadas",
      en: "Night storm with a zigzag bolt above lit bluish clouds",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "41",
    src: "/fotos/rayo-violeta.jpg",
    alt: {
      es: "Rayo entre nubes violetas sobre un pueblo costero de noche",
      en: "Lightning between violet clouds above a coastal town at night",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "35",
    src: "/fotos/tormenta-bahia.jpg",
    alt: {
      es: "Noche oscura sobre una bahía con la tormenta iluminando una esquina del cielo",
      en: "Dark night over a bay, with the storm lighting one corner of the sky",
    },
    width: 1600,
    height: 901,
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
    id: "96",
    src: "/fotos/espejo-redondo.jpg",
    alt: {
      es: "Espejo redondo en una habitación en penumbra",
      en: "Round mirror in a dim room",
    },
    width: 1600,
    height: 841,
  },
  {
    id: "99",
    src: "/fotos/fachada-noche.jpg",
    alt: {
      es: "Fachada de un edificio con ventanas iluminadas de noche",
      en: "Building facade with lit windows at night",
    },
    width: 1600,
    height: 900,
  },
  {
    id: "98",
    src: "/fotos/ventana-oficina.jpg",
    alt: {
      es: "Ventana de oficina iluminada en la oscuridad",
      en: "Lit office window in the darkness",
    },
    width: 1600,
    height: 900,
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
    id: "38",
    src: "/fotos/tormenta-lejana.jpg",
    alt: {
      es: "Una tormenta lejana se ilumina sobre un cabo en medio de la noche",
      en: "A distant storm lights up above a headland in the middle of the night",
    },
    width: 1600,
    height: 901,
  },
  {
    id: "113",
    src: "/fotos/farola-noche.jpg",
    alt: {
      es: "Farola solitaria junto a una barandilla en la noche",
      en: "A lone streetlight beside a railing at night",
    },
    width: 1071,
    height: 1600,
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
