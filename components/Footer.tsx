import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.col}>
        <p className={styles.brand}>Yukan</p>
      </div>
      <div className={`${styles.col} ${styles.contact}`}>
        <p className={styles.label}>Contacto</p>
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
      <nav className={`${styles.col} ${styles.links}`} aria-label="pie de página">
        <p className={styles.label}>Navegación</p>
        <Link href="/">Inicio</Link>
        <Link href="/historias">Historias</Link>
        <Link href="/fotos">Fotos</Link>
        <Link href="/cortos">Cortos</Link>
        <Link href="/#about">Sobre mí</Link>
      </nav>
      <div className={`${styles.col} ${styles.legal}`}>
        <p className={styles.label}>Créditos</p>
        <p>Todos los derechos reservados ©2026</p>
        <p>
          Hecho por{" "}
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
