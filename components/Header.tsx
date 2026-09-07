"use client";

import { useEffect, useState, type MouseEvent } from "react";
import styles from "./Header.module.css";

type SectionId = "home" | "stories" | "about" | "contact";

export function Header() {
  const [active, setActive] = useState<SectionId>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToFooter = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "#contact");
    setActive("contact");
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : styles.top}`}
    >
      <a href="#home" className={styles.logo}>
        GG
      </a>
      <nav className={styles.nav} aria-label="principal">
        <a
          href="#stories"
          className={`${styles.link} ${active === "stories" ? styles.active : ""}`}
        >
          historias
        </a>
        <a
          href="#about"
          className={`${styles.link} ${active === "about" ? styles.active : ""}`}
        >
          sobre mí
        </a>
        <a
          href="#contact"
          onClick={scrollToFooter}
          className={`${styles.link} ${active === "contact" ? styles.active : ""}`}
        >
          contacto
        </a>
      </nav>
    </header>
  );
}
