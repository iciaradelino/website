"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import styles from "./Header.module.css";

type SectionId = "home" | "stories" | "about" | "contact";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<SectionId>(isHome ? "home" : "stories");
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40 || !isHome);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!isHome) {
      setActive("stories");
      return () => window.removeEventListener("scroll", onScroll);
    }

    const ids: SectionId[] = ["home", "stories", "about", "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id as SectionId);
        }
      },
      { threshold: [0.2, 0.4, 0.55], rootMargin: "-18% 0px -40% 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  const scrollToFooter = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    event.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "#contact");
    setActive("contact");
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : styles.top}`}
    >
      <Link href={isHome ? "#home" : "/"} className={styles.logo}>
        GG
      </Link>
      <nav className={styles.nav} aria-label="principal">
        <Link
          href={isHome ? "#stories" : "/#stories"}
          className={`${styles.link} ${active === "stories" ? styles.active : ""}`}
        >
          historias
        </Link>
        <Link
          href={isHome ? "#about" : "/#about"}
          className={`${styles.link} ${active === "about" ? styles.active : ""}`}
        >
          sobre mí
        </Link>
        <Link
          href={isHome ? "#contact" : "/#contact"}
          onClick={scrollToFooter}
          className={`${styles.link} ${active === "contact" ? styles.active : ""}`}
        >
          contacto
        </Link>
      </nav>
    </header>
  );
}
