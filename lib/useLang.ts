"use client";

import { useParams } from "next/navigation";
import { defaultLocale, getDictionary, isLang } from "@/lib/i18n";

/**
 * Idioma de la página actual, leído de la URL (/es/... o /en/...). Solo para
 * componentes de cliente; los de servidor reciben `lang` como prop.
 */
export function useLang() {
  const { lang } = useParams<{ lang: string }>();
  return isLang(lang) ? lang : defaultLocale;
}

export function useDictionary() {
  return getDictionary(useLang());
}
