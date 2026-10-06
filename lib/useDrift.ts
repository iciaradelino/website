"use client";

import { useEffect, useRef, type MouseEvent } from "react";

/**
 * Hace que una fila se desplace sola hacia la izquierda sin fin, se detenga al
 * pasar el ratón y se pueda arrastrar (con algo de inercia al soltarla).
 *
 * El contenido tiene que estar dos veces seguido dentro de `trackRef`; `setRef`
 * es la primera copia y su ancho marca cuándo volver a empezar.
 */
export function useDrift({ ready = true, speed = 32 }: { ready?: boolean; speed?: number } = {}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  // Si el último gesto fue arrastrar, el clic que lo cierra no abre nada.
  const dragged = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const set = setRef.current;
    if (!ready || !viewport || !track || !set) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = set.offsetWidth;
    let offset = 0;
    let velocity = reduced ? 0 : -speed;
    let hovering = false;
    let drag: { id: number; x: number; t: number; startX: number; moved: boolean } | null = null;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!drag) {
        const target = reduced || hovering ? 0 : -speed;
        velocity += (target - velocity) * Math.min(1, dt * 2.5);
        offset += velocity * dt;
      }
      if (width > 0) offset = ((offset % width) - width) % width;
      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      drag = { id: event.pointerId, x: event.clientX, t: event.timeStamp, startX: event.clientX, moved: false };
      dragged.current = false;
    };

    const onMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      if (!drag.moved && Math.abs(event.clientX - drag.startX) > 6) {
        drag.moved = true;
        dragged.current = true;
        viewport.setPointerCapture(event.pointerId);
      }
      if (!drag.moved) return;
      const dx = event.clientX - drag.x;
      const dt = Math.max((event.timeStamp - drag.t) / 1000, 0.001);
      offset += dx;
      velocity = velocity * 0.6 + (dx / dt) * 0.4;
      drag.x = event.clientX;
      drag.t = event.timeStamp;
    };

    const onUp = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      drag = null;
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    const resize = new ResizeObserver(() => {
      width = set.offsetWidth;
    });
    resize.observe(set);

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
    };
  }, [ready, speed]);

  /** Va en `onClickCapture` del contenedor: anula el clic que termina un arrastre. */
  const onClickCapture = (event: MouseEvent) => {
    if (!dragged.current) return;
    event.preventDefault();
    event.stopPropagation();
    dragged.current = false;
  };

  return { viewportRef, trackRef, setRef, onClickCapture };
}
