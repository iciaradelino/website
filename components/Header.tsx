"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOCALE_COOKIE, localePath, locales, type Lang } from "@/lib/i18n";
import { useDictionary, useLang } from "@/lib/useLang";
import styles from "./Header.module.css";

/** Guarda el idioma elegido para que las próximas visitas a "/" lo respeten. */
function rememberLang(lang: Lang) {
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

export function Header() {
  const lang = useLang();
  const t = useDictionary();
  const pathname = usePathname();
  const home = localePath(lang);
  const isHome = pathname === home;
  const [scrolled, setScrolled] = useState(!isHome);

  // La misma página en el otro idioma: solo cambia el primer tramo de la ruta.
  const rest = pathname.slice(home.length);

  const links = [
    { href: localePath(lang, "/historias"), label: t.nav.stories },
    { href: localePath(lang, "/fotos"), label: t.nav.photos },
    { href: localePath(lang, "/cortos"), label: t.nav.cortos },
  ];

  // Se esconde al bajar y vuelve a aparecer en cuanto se sube un poco.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40 || !isHome);
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : styles.top} ${hidden ? styles.hidden : ""}`}
      // Si se navega con el teclado, la cabecera vuelve a verse.
      onFocus={() => setHidden(false)}
    >
      <Link href={isHome ? "#home" : home} className={styles.logo}>
        Yukan
      </Link>
      <nav className={styles.nav} aria-label={t.nav.main}>
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${active ? styles.active : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className={styles.secondary}>
        <div className={styles.langSwitch} role="group" aria-label={t.nav.language}>
          {locales.map((code) =>
            code === lang ? (
              <span key={code} className={styles.langCurrent} aria-current="true">
                {code}
              </span>
            ) : (
              <Link
                key={code}
                href={`/${code}${rest}`}
                hrefLang={code}
                lang={code}
                className={styles.langOption}
                onClick={() => rememberLang(code)}
                scroll={false}
              >
                {code}
              </Link>
            ),
          )}
        </div>
      </div>
    </header>
  );
}
