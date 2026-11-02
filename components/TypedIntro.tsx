"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import styles from "./TypedIntro.module.css";

const IntroContext = createContext<(() => void) | null>(null);

/** Para el TypedTitle de dentro: avisa de que ha terminado de escribirse. */
export function useIntroDone() {
  return useContext(IntroContext);
}

/**
 * Entrada de página: mientras se escribe el título (el TypedTitle de dentro),
 * solo se ve él. Al terminar aparece el resto y las franjas de historias suben
 * una tras otra.
 */
export function TypedIntro({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const markDone = useCallback(() => setReady(true), []);

  return (
    <IntroContext.Provider value={markDone}>
      <div className={`${styles.stage} ${ready ? styles.ready : ""}`}>{children}</div>
    </IntroContext.Provider>
  );
}
