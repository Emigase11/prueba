"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renderiza un valor de spec animando sus números de 0 al valor final la
 * primera vez que entra al viewport ("2 + 2" anima los dos doses).
 *
 * SSR pinta el valor final (sin JS la página muestra el dato completo), y
 * con prefers-reduced-motion nunca se anima. tabular-nums evita que el
 * ancho salte mientras cuenta.
 */
export function StatValue({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(1); // 1 = valor final

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setProgress(1 - Math.pow(1 - p, 3)); // easeOutCubic
          if (p < 1) requestAnimationFrame(tick);
        };
        setProgress(0);
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const parts = text.split(/(\d+)/);
  return (
    <span ref={ref} className="tabular-nums">
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <span key={i}>{Math.round(Number(part) * progress)}</span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}
