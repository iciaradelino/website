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

  const sectionLinks = [
    { href: localePath(lang, "/#about"), label: t.nav.about },
    { href: localePath(lang, "/#contact"), label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40 || !isHome);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : styles.top}`}
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
        <nav className={styles.sections} aria-label={t.nav.sections}>
          {sectionLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
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
