export type Story = {
  id: string;
  slug: string;
  title: string;
  description: string;
  summary: string;
  accent: string;
  date: string;
  content: string[];
  note: string;
};

export const stories: Story[] = [
  {
    id: "1",
    slug: "el-ultimo-faro",
    title: "El último faro",
    summary: "Una noche en la costa gallega cambia el rumbo de dos hermanos.",
    description:
      "Cuando la niebla cubre el acantilado, Mateo vuelve al faro abandonado donde su hermana desapareció. Entre cartas viejas y el rumor del mar, descubre que algunas despedidas nunca terminan del todo.",
    accent: "var(--accent)",
    date: "2025-03-12",
    content: [
      "La niebla llegó antes que la marea. Mateo lo supo por el olor: salitre, hierro húmedo y esa dulzura rara que deja el musgo cuando el viento gira hacia tierra. El camino hasta el faro ya no existía en los mapas, pero sus pies lo recordaban como se recuerda una cicatriz.",
      "Habían pasado once años desde la última vez que subió esas escaleras. Once años desde que Inés dejó la taza a medio beber y el abrigo en el gancho, como si fuera a volver antes del anochecer. Nadie la vio bajar. Nadie la vio entrar al agua. Solo el faro, apagado ya entonces, y el rumor de las olas contra la peña.",
      "Dentro, el polvo había tomado posesión de todo. En la mesa de la linterna encontró un fajo de cartas atadas con hilo de pescar. La letra era de Inés, pequeña y terca. No estaban dirigidas a él. Estaban dirigidas al mar.",
      "«Si me oyes», decía una, «no me devuelvas. Guárdame donde la luz ya no alcanza y avisa a Mateo cuando el faro vuelva a encenderse. Entonces sabrá que no me perdí: me quedé.»",
      "Esa noche el acantilado rugió como si alguien respirara debajo. Mateo encendió el quinqué, subió a la linterna y esperó. No esperaba un milagro. Esperaba una señal que le permitiera irse de una vez. A las tres, un destello breve recorrió el cristal roto, tan débil que pudo haber sido un barco, o un relámpago, o el pulso de su propia sangre.",
      "Bajó las escaleras con las cartas en el pecho. El faro siguió a oscuras. Pero él, por primera vez, no se volvió a mirarlo. Algunas despedidas no terminan: se aprenden a llevar.",
    ],
    note: "Escribí este relato después de una noche en la costa, cuando el faro de verdad ya no encendía. No es la historia de un hermano concreto: es la de quienes vuelven a un sitio para poder irse.",
  },
  {
    id: "2",
    slug: "semillas-de-invierno",
    title: "Semillas de invierno",
    summary: "En un pueblo de montaña, la cosecha guarda un secreto familiar.",
    description:
      "Cada invierno, Elena planta semillas que nadie más quiere. Sus vecinos la creen loca hasta que la tierra responde con flores imposibles y una verdad enterrada bajo la nieve de hace veinte años.",
    accent: "var(--accent-mid)",
    date: "2025-01-28",
    content: [
      "En Valverde nadie planta en enero. La tierra está dura, el ganado se encierra y las ventanas se cierran con trapos. Elena, sin embargo, salía al huerto con un delantal lleno de semillas oscuras, pequeñas como uñas, y las hundía una a una mientras el aliento se le helaba en los labios.",
      "Los vecinos decían que estaba igual que su madre. Lo decían en voz baja, que es como se dice lo que uno teme que sea cierto. Su madre había muerto un invierno, junto al mismo muro, con las manos sucias de tierra y una sonrisa que nadie supo explicar.",
      "Aquel año la nieve tardó. En febrero, cuando aún no había brotado ni el romero, el huerto de Elena se llenó de flores blancas, demasiado grandes para la estación, con un olor a humo y a leche caliente. La gente se asomó a la cerca. Nadie cruzó.",
      "Elena desenterró entonces lo que su madre le había dejado bajo la tercera piedra: un cuaderno, un mechón de pelo infantil y una nota. «No son flores. Son memoria. Plántalas cuando quieras recordar quiénes fuimos antes de que el pueblo nos pusiera otro nombre.»",
      "Leyó el cuaderno junto al fuego. Había listas de deudas, de silencios, de niños que el valle había fingido no ver. Al amanecer, Elena cortó un ramo y lo dejó en la plaza, sin nota. Las flores duraron tres días. El secreto, mucho más.",
    ],
    note: "Las semillas son de mi abuela, que plantaba en enero contra el consejo de todo el valle. El pueblo es varios pueblos a la vez. El cuaderno, desgraciadamente, también.",
  },
  {
    id: "3",
    slug: "mapas-que-arden",
    title: "Mapas que arden",
    summary: "Un cartógrafo pierde el norte y encuentra otro camino.",
    description:
      "Andrés dibuja rutas para quienes ya no saben volver a casa. Un encargo lo lleva al desierto, donde el mapa se quema en sus manos y solo queda caminar sin brújula, guiado por voces que no debería oír.",
    accent: "var(--accent-deep)",
    date: "2024-11-04",
    content: [
      "Andrés cobraba por devolver a la gente a un lugar que ya no existía igual. Viudos, emigrados, hijos de pueblos anegados: le traían recuerdos y él les devolvía un trazado. No prometía verdad. Prometía un camino que el cuerpo pudiera reconocer.",
      "El encargo llegó en un sobre sin remitente. Un punto en el desierto de Almería, una X hecha con lápiz graso y una frase: «Aquí se acaba el norte». Pagaban bien. Andrés guardó la brújula, enrolló el papel y partió al amanecer.",
      "Al tercer día el sol le quitó el color a todas las cosas. El mapa, apoyado sobre el capó, empezó a oscurecerse por los bordes como si alguien lo tostara desde abajo. Cuando quiso recogerlo, el papel se le deshizo entre los dedos en una llama breve, casi educada.",
      "Sin mapa, sin sombra fiable, Andrés caminó. No hacia la X —ya no sabía dónde estaba— sino hacia un rumor que parecía pronunciar su nombre con la voz de su padre, muerto hacía años en otra carretera. El desierto, descubrió, no está vacío: está lleno de quienes se quedaron sin camino.",
      "Al anochecer halló un cauce seco y se sentó. No recuperó el norte. Aprendió a no pedirlo. Al día siguiente siguió, más lento, dibujando en la arena rutas que el viento se llevaba al instante, que es quizá la única cartografía honesta.",
    ],
    note: "Pasé dos días perdido entre Almería y nada. El mapa no se quemó; se me volvió inútil. A veces escribir es eso: seguir cuando el trazado ya no sirve.",
  },
  {
    id: "4",
    slug: "la-mesa-vacia",
    title: "La mesa vacía",
    summary: "Una cena de domingo revela lo que nadie se atrevía a decir.",
    description:
      "La familia se reúne como cada domingo, pero esta vez hay un plato de más. Nadie pregunta por qué. Entre risas forzadas y vino tinto, la ausencia se hace tan presente que al final alguien tiene que nombrarla.",
    accent: "var(--accent)",
    date: "2025-04-20",
    content: [
      "El mantel era el de siempre, el de las manchas que ya no se van. La madre sirvió la sopa en siete platos aunque en la casa solo había seis personas. El séptimo quedó frente a la ventana, con la cuchara alineada y el pan a la izquierda, como si alguien fuera a sentarse después del brindis.",
      "Nadie preguntó. Preguntar habría sido admitir que todos estaban contando. El padre habló del tiempo. La tía, de un vecino. Los primos rieron demasiado fuerte. El vino tinto manchó el mantel cerca del plato vacío, una gota redonda, y nadie la limpió.",
      "Hacía ocho meses que Javier no venía. Se fue un martes, con una maleta pequeña y una frase que sonó a broma: «Dejadme el sitio, por si acaso». La madre lo dejó. Todas las semanas lo dejó. El sitio se fue volviendo más real que las sillas ocupadas.",
      "Al postre, la más pequeña —que aún no había aprendido el pacto— señaló el plato y dijo su nombre. El silencio que siguió no fue ofendido: fue aliviado. La madre apartó la sopa fría, puso las manos sobre el mantel y contestó, por fin, que sí, que era para él, y que mañana lo recogería.",
      "Comieron el resto de la tarta sin teatro. Alguien abrió la ventana. El sitio siguió ahí, pero ya no pesaba igual: tenía nombre, y un nombre se puede echar de menos sin convertirlo en un fantasma sentado a la mesa.",
    ],
    note: "Esta cena ocurrió más de una vez, en más de una casa. El plato de más no siempre es de alguien que se fue: a veces es de alguien a quien aún no nos atrevemos a extrañar en voz alta.",
  },
  {
    id: "5",
    slug: "tren-de-medianoche",
    title: "Tren de medianoche",
    summary: "Un viaje nocturno une a dos desconocidos con el mismo destino.",
    description:
      "En el vagón casi vacío, Lucía comparte asiento con un hombre que dice conocer el final de su historia. El tren avanza hacia Madrid mientras el pasado se asoma por la ventanilla a cada estación.",
    accent: "var(--accent-mid)",
    date: "2024-09-16",
    content: [
      "El tren de las 00:12 salía casi vacío. Lucía eligió el vagón cinco porque el cuatro olía a café frío. Frente a ella, un hombre de abrigo oscuro leía un libro sin título en el lomo. Cuando el convoy arrancó, él cerró el libro y dijo, sin mirarla: «Usted se baja en Atocha, pero no debería».",
      "Lucía pensó en cambiarse de asiento. No lo hizo. En el cristal vio desfilar pueblos que ya no eran los suyos: andenes con una sola farola, alguien fumando, un perro. El hombre hablaba como quien recita un itinerario aprendido de memoria.",
      "«En Guadalajara va a recordar el piso de la calle Mayor. En Alcalá, la carta que no mandó. En Atocha le esperará alguien con flores que no son para usted.» Lucía no le había contado nada. Tampoco le preguntó cómo lo sabía. Tenía miedo de que la respuesta fuera sencilla: que ella misma lo había dicho en voz alta, años atrás, en otro tren.",
      "A las dos de la madrugada el hombre se durmió. El libro se le resbaló. Lucía lo recogió. En la primera página, con su propia letra —la de cuando aún firmaba con el apellido de soltera— había una nota: «Si lees esto, no bajes. El final que te contaron no es el único».",
      "En Atocha el andén estaba lleno. Hubo flores, sí, y un nombre equivocado en el cartel. Lucía dejó el libro sobre el asiento, esperó a que las puertas volvieran a cerrarse y se quedó dentro. El tren siguió. El hombre, al despertar, sonrió como quien reconoce una estación que por fin coincide con el mapa.",
    ],
    note: "Lo escribí en un tren de verdad, hacia medianoche, con el cuaderno apoyado en la bandeja. El hombre del abrigo no existió. El miedo a bajarse en la estación equivocada, sí.",
  },
  {
    id: "6",
    slug: "bosque-sin-nombre",
    title: "Bosque sin nombre",
    summary: "Quien entra en el claro olvidado no sale siendo el mismo.",
    description:
      "Hay un sendero detrás de la aldea que no aparece en ningún mapa. Los niños juran haber oído su propio nombre entre los árboles. Gonzalo decide seguirlo una mañana de octubre y el bosque le responde.",
    accent: "var(--accent-deep)",
    date: "2025-10-02",
    content: [
      "Detrás de la aldea el sendero empieza donde termina el último huerto. No está en el catastro. Los mayores dicen que es un atajo a nada. Los niños, que si caminas en silencio el bosque dice tu nombre, y no siempre con tu voz.",
      "Gonzalo salió un martes de octubre, con el termómetro bajo cero y el cuaderno en el bolsillo. Quería una historia, no una aparición. El hayedo olía a hoja mojada y a hierro. A los veinte minutos el camino dejó de parecer camino: las raíces se cruzaban como letra ilegible.",
      "Entonces lo oyó. No un grito. Su nombre, dicho con la calma de quien lo ha repetido mucho. Venía de un claro donde la luz no coincidía con la hora. En el centro había una piedra lisa, como una mesa, y sobre ella un anillo de musgo todavía caliente.",
      "Gonzalo no preguntó quién hablaba. Se sentó. El bosque, si es que era el bosque, le contó cosas que él había olvidado a propósito: una deuda con un hermano, una casa vendida demasiado rápido, el miedo de escribir en serio. Nada de eso era magia. Era memoria con ramas.",
      "Volvió a la aldea al atardecer. Le preguntaron si había encontrado el atajo. Dijo que sí, y que no había atajo: había un sitio donde uno deja de ser turista de su propia vida. Esa noche escribió hasta que se le acabó la tinta. El sendero sigue sin aparecer en los mapas. Él ya no lo necesita.",
    ],
    note: "El bosque está detrás de donde crecí. Nunca tuvo nombre en los mapas porque nadie quiso dárselo. Gonzalo, aquí, soy yo y no soy yo: es quien entra cuando el que escribe aún duda.",
  },
];

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getOtherStories(slug: string, limit = 3) {
  return stories.filter((story) => story.slug !== slug).slice(0, limit);
}

export function formatStoryDate(iso: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

export function storyPath(slug: string) {
  return `/historias/${slug}`;
}
