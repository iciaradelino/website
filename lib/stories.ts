export type Story = {
  id: string;
  title: string;
  description: string;
  summary: string;
  accent: string;
};

export const stories: Story[] = [
  {
    id: "1",
    title: "El último faro",
    summary: "Una noche en la costa gallega cambia el rumbo de dos hermanos.",
    description:
      "Cuando la niebla cubre el acantilado, Mateo vuelve al faro abandonado donde su hermana desapareció. Entre cartas viejas y el rumor del mar, descubre que algunas despedidas nunca terminan del todo.",
    accent: "var(--accent)",
  },
  {
    id: "2",
    title: "Semillas de invierno",
    summary: "En un pueblo de montaña, la cosecha guarda un secreto familiar.",
    description:
      "Cada invierno, Elena planta semillas que nadie más quiere. Sus vecinos la creen loca hasta que la tierra responde con flores imposibles y una verdad enterrada bajo la nieve de hace veinte años.",
    accent: "var(--accent-mid)",
  },
  {
    id: "3",
    title: "Mapas que arden",
    summary: "Un cartógrafo pierde el norte y encuentra otro camino.",
    description:
      "Andrés dibuja rutas para quienes ya no saben volver a casa. Un encargo lo lleva al desierto, donde el mapa se quema en sus manos y solo queda caminar sin brújula, guiado por voces que no debería oír.",
    accent: "var(--accent-deep)",
  },
  {
    id: "4",
    title: "La mesa vacía",
    summary: "Una cena de domingo revela lo que nadie se atrevía a decir.",
    description:
      "La familia se reúne como cada domingo, pero esta vez hay un plato de más. Nadie pregunta por qué. Entre risas forzadas y vino tinto, la ausencia se hace tan presente que al final alguien tiene que nombrarla.",
    accent: "var(--accent)",
  },
  {
    id: "5",
    title: "Tren de medianoche",
    summary: "Un viaje nocturno une a dos desconocidos con el mismo destino.",
    description:
      "En el vagón casi vacío, Lucía comparte asiento con un hombre que dice conocer el final de su historia. El tren avanza hacia Madrid mientras el pasado se asoma por la ventanilla a cada estación.",
    accent: "var(--accent-mid)",
  },
  {
    id: "6",
    title: "Bosque sin nombre",
    summary: "Quien entra en el claro olvidado no sale siendo el mismo.",
    description:
      "Hay un sendero detrás de la aldea que no aparece en ningún mapa. Los niños juran haber oído su propio nombre entre los árboles. Gonzalo decide seguirlo una mañana de octubre y el bosque le responde.",
    accent: "var(--accent-deep)",
  },
];
