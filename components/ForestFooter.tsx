import Link from "next/link";
import { getDictionary, localePath, type Lang } from "@/lib/i18n";
import styles from "./ForestFooter.module.css";

/**
 * Experimento: pie de página con columnas separadas por líneas discontinuas y
 * un bosque dibujado a plumilla que sube desde abajo.
 */
export function ForestFooter({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const f = t.footer;

  const nav = [
    { href: localePath(lang), label: f.home },
    { href: localePath(lang, "/historias"), label: f.stories },
    { href: localePath(lang, "/fotos"), label: f.photos },
    { href: localePath(lang, "/cortos"), label: f.cortos },
    { href: localePath(lang, "/#about"), label: f.about },
  ];

  const contact = [
    { href: "mailto:gonzalogallego@gmail.com", label: "gonzalogallego@gmail.com" },
    { href: "tel:+34676676767", label: "+34 676 67 67 67" },
    {
      href: "https://www.linkedin.com/in/gonzalo-gallego-hernandez-574a1638a/",
      label: "LinkedIn",
      external: true,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <p className={styles.brand}>Yukan</p>
          <p className={styles.tagline}>{t.meta.siteDescription}</p>
          <p className={styles.small}>{f.rights}</p>
          <p className={styles.small}>
            {f.madeBy}{" "}
            <a
              className={styles.credit}
              href="https://iciaradelino.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Iciar Adeliño
            </a>
          </p>
        </div>
        <nav className={styles.col} aria-label={f.navLabel}>
          <p className={styles.heading}>{f.navigation}</p>
          <ul className={styles.links}>
            {nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.col}>
          <p className={styles.heading}>{f.contact}</p>
          <ul className={styles.links}>
            {contact.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.link}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.forest} aria-hidden />
    </footer>
  );
}
