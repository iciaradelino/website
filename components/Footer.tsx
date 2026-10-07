import Link from "next/link";
import { getDictionary, localePath, type Lang } from "@/lib/i18n";
import styles from "./Footer.module.css";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).footer;

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.col}>
        <p className={styles.brand}>Yukan</p>
      </div>
      <div className={`${styles.col} ${styles.contact}`}>
        <p className={styles.label}>{t.contact}</p>
        <a href="mailto:gonzalogallego@gmail.com">gonzalogallego@gmail.com</a>
        <p>+34 676 67 67 67</p>
        <a
          href="https://www.linkedin.com/in/gonzalo-gallego-hernandez-574a1638a/"
          target="_blank"
          rel="noreferrer"
        >
          linkedin/gonzalogallego
        </a>
      </div>
      <nav className={`${styles.col} ${styles.links}`} aria-label={t.navLabel}>
        <p className={styles.label}>{t.navigation}</p>
        <Link href={localePath(lang)}>{t.home}</Link>
        <Link href={localePath(lang, "/historias")}>{t.stories}</Link>
        <Link href={localePath(lang, "/fotos")}>{t.photos}</Link>
        <Link href={localePath(lang, "/cortos")}>{t.cortos}</Link>
        <Link href={localePath(lang, "/#about")}>{t.about}</Link>
      </nav>
      <div className={`${styles.col} ${styles.legal}`}>
        <p className={styles.label}>{t.credits}</p>
        <p>{t.rights}</p>
        <p>
          {t.madeBy}{" "}
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
    </footer>
  );
}
