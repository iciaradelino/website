export const locales = ["es", "en"] as const;
export type Lang = (typeof locales)[number];

export const defaultLocale: Lang = "es";

/** Cookie en la que se guarda el idioma elegido con el botón del menú. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Un texto en cada idioma. */
export type Localized = Record<Lang, string>;

export function isLang(value: unknown): value is Lang {
  return locales.includes(value as Lang);
}

/** Antepone el idioma a una ruta: ("en", "/fotos") → "/en/fotos"; ("en", "/#about") → "/en#about". */
export function localePath(lang: Lang, path = "/") {
  if (path === "/" || path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

const es = {
  meta: {
    siteTitle: "Historias de Gonzalo",
    siteDescription: "Relatos entre el bosque y la memoria",
    storiesTitle: "Historias",
    storiesDescription: "Mis mejores relatos y poemas",
    photosTitle: "Fotos",
    photosDescription: "Lugares y momentos que acompañan a las historias",
    cortosTitle: "Cortos",
    cortosDescription: "Próximamente...",
    storyFallback: "Historia",
  },
  nav: {
    stories: "historias",
    photos: "fotos",
    cortos: "cortos",
    about: "sobre mí",
    contact: "contacto",
    main: "principal",
    sections: "secciones",
    language: "Idioma",
  },
  hero: {
    subtitle: "Historias, fotografías y cortos",
  },
  home: {
    room: (n: string) => `Sala ${n}`,
    featuredStories: "Historias destacadas",
    recentPhotos: "Fotos recientes",
    cortos: "Cortos",
    seeAllF: "ver todas",
    seeAllM: "ver todos",
  },
  stories: {
    pageTitle: "Historias de una vida sin contar",
    pageSubtitle: "Mis mejores relatos y poemas",
    story: "Historia",
    minRead: (n: number) => `${n} min de lectura`,
    read: "leer →",
    inLanguage: { es: "en español", en: "en inglés" } as Localized,
    authorNote: "Nota del autor",
    others: "Otras historias",
  },
  photos: {
    pageTitle: "Fotos",
    lede: "Lugares y momentos que acompañan a las historias.",
    photograph: "Fotografía",
    untitled: "Sin título",
    enlarge: (alt: string) => `Ampliar foto: ${alt}`,
    enlarged: "Foto ampliada",
    close: "Cerrar",
    previous: "Foto anterior",
    next: "Foto siguiente",
  },
  cortos: {
    corto: "Corto",
    soon: "próximamente",
    soonTitle: "Próximamente",
    soonLabel: "Corto próximamente",
  },
  about: {
    kicker: "Sobre mí",
    hello: "Hola, soy Gonzalo",
    leadStart: "Escritor y caminante. Nací entre montañas y aprendí a contar",
    leadEm: "historias que huelen a tierra húmeda",
    body: "Busco lo cotidiano que se vuelve misterio —una cena, un tren, un bosque sin nombre— y lo cuento con palabras, fotos y vídeo.",
    photoAlt: "Gonzalo con una cámara entre hierbas altas al atardecer",
  },
  footer: {
    contact: "Contacto",
    navLabel: "pie de página",
    navigation: "Navegación",
    home: "Inicio",
    stories: "Historias",
    photos: "Fotos",
    cortos: "Cortos",
    about: "Sobre mí",
    credits: "Créditos",
    rights: "Todos los derechos reservados ©2026",
    madeBy: "Hecho por",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    siteTitle: "Gonzalo's Stories",
    siteDescription: "Tales between the forest and memory",
    storiesTitle: "Stories",
    storiesDescription: "My best stories and poems",
    photosTitle: "Photos",
    photosDescription: "Places and moments that accompany the stories",
    cortosTitle: "Short films",
    cortosDescription: "Coming soon...",
    storyFallback: "Story",
  },
  nav: {
    stories: "stories",
    photos: "photos",
    cortos: "short films",
    about: "about me",
    contact: "contact",
    main: "main",
    sections: "sections",
    language: "Language",
  },
  hero: {
    subtitle: "Stories, photographs and short films",
  },
  home: {
    room: (n: string) => `Room ${n}`,
    featuredStories: "Featured stories",
    recentPhotos: "Recent photos",
    cortos: "Short films",
    seeAllF: "see all",
    seeAllM: "see all",
  },
  stories: {
    pageTitle: "Stories of an untold life",
    pageSubtitle: "My best stories and poems",
    story: "Story",
    minRead: (n: number) => `${n} min read`,
    read: "read →",
    inLanguage: { es: "in Spanish", en: "in English" },
    authorNote: "Author's note",
    others: "More stories",
  },
  photos: {
    pageTitle: "Photos",
    lede: "Places and moments that accompany the stories.",
    photograph: "Photograph",
    untitled: "Untitled",
    enlarge: (alt: string) => `Enlarge photo: ${alt}`,
    enlarged: "Enlarged photo",
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
  },
  cortos: {
    corto: "Short film",
    soon: "coming soon",
    soonTitle: "Coming soon",
    soonLabel: "Short film coming soon",
  },
  about: {
    kicker: "About me",
    hello: "Hi, I'm Gonzalo",
    leadStart: "Writer and wanderer. I was born among mountains and learned to tell",
    leadEm: "stories that smell of damp earth",
    body: "I look for the everyday that turns into mystery —a dinner, a train, a nameless forest— and I tell it with words, photos and video.",
    photoAlt: "Gonzalo holding a camera among tall grass at sunset",
  },
  footer: {
    contact: "Contact",
    navLabel: "footer",
    navigation: "Navigation",
    home: "Home",
    stories: "Stories",
    photos: "Photos",
    cortos: "Short films",
    about: "About me",
    credits: "Credits",
    rights: "All rights reserved ©2026",
    madeBy: "Made by",
  },
};

const dictionaries: Record<Lang, Dictionary> = { es, en };

export function getDictionary(lang: Lang) {
  return dictionaries[lang];
}

/** Formato de fecha largo en el idioma de la página. */
export function formatDate(lang: Lang, iso: string) {
  return new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
