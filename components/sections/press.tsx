"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Barra de prensa. Marquee infinito en CSS puro: dos copias identicas de la
 * lista y translateX(-50%); cada copia lleva su propio padding derecho para
 * que el bucle empalme exacto. La segunda copia va aria-hidden (los lectores
 * de pantalla leen los logos una sola vez).
 *
 * El boton de pausa no es decorativo: WCAG 2.2.2 (Pause, Stop, Hide) pide un
 * mecanismo para detener el movimiento que arranca solo y dura mas de cinco
 * segundos. El hover pausa tambien, pero no le sirve a quien navega con
 * teclado ni a quien esta en touch.
 *
 * Con prefers-reduced-motion el marquee se oculta entero y se muestra la
 * grilla estatica, asi que ahi el boton tampoco hace falta.
 */
function LogoRow({ hidden }: { hidden?: boolean }) {
  const { press } = content;
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14"
    >
      {press.logos.map((logo) => (
        <li key={logo.alt} className="shrink-0">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.alt}
            width={270}
            height={100}
            quality={90}
            sizes="130px"
            className="h-8 w-auto opacity-60 md:h-9"
          />
        </li>
      ))}
    </ul>
  );
}

export function Press() {
  const { press, ui } = content;
  const [paused, setPaused] = useState(false);

  return (
    <section id="press" className="border-y py-12 md:py-16">
      <div className="container">
        <h2 className="text-center text-body-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {press.heading}
        </h2>
      </div>

      <div className="motion-reduce:hidden">
        <div className={cn("marquee mt-8 overflow-hidden", paused && "marquee-paused")}>
          <div className="marquee-track flex">
            <LogoRow />
            <LogoRow hidden />
          </div>
        </div>

        <div className="container mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-body-sm text-muted-foreground transition-colors hover:text-foreground active:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            {paused ? (
              <Play aria-hidden className="size-3.5" />
            ) : (
              <Pause aria-hidden className="size-3.5" />
            )}
            {paused ? ui.marqueePlay : ui.marqueePause}
          </button>
        </div>
      </div>

      {/* Fallback estatico para reduced-motion */}
      <div className="container hidden motion-reduce:block">
        <ul className="mt-8 grid grid-cols-3 items-center gap-x-6 gap-y-8 md:grid-cols-6">
          {press.logos.map((logo) => (
            <li key={logo.alt} className="flex justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={270}
                height={100}
                quality={90}
                sizes="(min-width: 768px) 130px, 100px"
                className="h-8 w-auto opacity-60 md:h-9"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
