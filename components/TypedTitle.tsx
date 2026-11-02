"use client";

import { useEffect, useState } from "react";
import { useIntroDone } from "@/components/TypedIntro";
import styles from "./TypedTitle.module.css";

type TypedTitleProps = {
  text: string;
  className?: string;
  /** Milisegundos entre letra y letra. */
  speedMs?: number;
  delayMs?: number;
};

/* Un título que se escribe letra a letra al cargar la página, con un cursor parpadeante. */
export function TypedTitle({
  text,
  className = "",
  speedMs = 60,
  delayMs = 250,
}: TypedTitleProps) {
  const [count, setCount] = useState(0);
  const onDone = useIntroDone();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }

    setCount(0);
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((n) => {
          if (n + 1 >= text.length) window.clearInterval(interval);
          return Math.min(n + 1, text.length);
        });
      }, speedMs);
    }, delayMs);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [text, speedMs, delayMs]);

  const done = count >= text.length;

  useEffect(() => {
    // Dentro de un TypedIntro, el resto de la página espera a que termine.
    if (done) onDone?.();
  }, [done, onDone]);

  return (
    <h1 className={className} data-intro-title>
      {/* Los lectores de pantalla leen el título entero de una vez. */}
      <span className={styles.srOnly}>{text}</span>
      {/* Una copia invisible reserva el ancho del título entero, así se escribe en su sitio aunque vaya centrado. */}
      <span className={styles.box} aria-hidden>
        <span className={styles.ghost}>{text}</span>
        <span className={styles.typed}>
          {text.slice(0, count)}
          <span className={`${styles.caret} ${done ? styles.caretDone : ""}`} />
        </span>
      </span>
    </h1>
  );
}
