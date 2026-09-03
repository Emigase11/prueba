"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Suscribe un predicado booleano a la posicion de scroll.
 *
 * Existe porque SiteHeader, StickyBuyBar y BackToTop repetian el mismo
 * listener con getBoundingClientRect(). El problema no era que se
 * desincronizaran —son independientes— sino el layout thrashing: tres
 * listeners midiendo el layout en cada evento de scroll fuerzan tres
 * reflows sincronicos por frame. Aca la medicion se agenda con rAF, asi
 * cada componente mide una sola vez por frame como maximo.
 *
 * Recibe el predicado en vez de una lista de secciones a proposito: los
 * tres consumidores tienen condiciones distintas (uno mira el hero con
 * offset, otro sin offset, otro cruza hero con pricing) y generalizarlas
 * en una sola API terminaria en un hook lleno de flags.
 *
 * El predicado se guarda en una ref, asi se puede pasar una arrow inline
 * sin que el efecto se re-suscriba en cada render.
 */
export function useScrollSignal(compute: () => boolean): boolean {
  const [value, setValue] = useState(false);
  const computeRef = useRef(compute);

  // Sin array de deps: mantiene la ref al dia en cada render.
  useEffect(() => {
    computeRef.current = compute;
  });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setValue(computeRef.current());
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure(); // estado inicial, sin esperar al primer scroll
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return value;
}

/** Helper: el elemento ya paso por completo arriba del viewport. */
export function isScrolledPast(id: string, offset = 0): boolean {
  const el = document.getElementById(id);
  return (el?.getBoundingClientRect().bottom ?? 0) <= offset;
}

/** Helper: alguna parte del elemento esta dentro del viewport. */
export function isOnScreen(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}
