"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

const MAX_DEG = 7;

/**
 * Inclinación 3D que sigue al puntero + glare especular (variables CSS que
 * consume .tilt-card/.tilt-glare en globals.css).
 *
 * Solo actúa con mouse: en touch el evento trae pointerType "touch" y no
 * hace nada, y con prefers-reduced-motion tampoco. En esos casos es un div
 * común.
 */
export function TiltCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const reset = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--ry", `${((x - 0.5) * MAX_DEG * 2).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * MAX_DEG * 2).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn("tilt-card", className)}
    >
      {children}
      <div aria-hidden className="tilt-glare pointer-events-none absolute inset-0" />
    </div>
  );
}
