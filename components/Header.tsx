"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const links = [
  { href: "/historias", label: "historias" },
  { href: "/fotos", label: "fotos" },
  { href: "/cortos", label: "cortos" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);

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
      <Link href={isHome ? "#home" : "/"} className={styles.logo}>
        GG
      </Link>
      <nav className={styles.nav} aria-label="principal">
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
    </header>
  );
}
