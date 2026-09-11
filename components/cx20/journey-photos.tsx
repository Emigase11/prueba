"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

type Photo = { src: string; alt: string; label: string };

const INTERVAL_MS = 5200;

/**
 * Las fotos de una parada de la ruta. Con una sola foto es una imagen y nada
 * mas; con varias, las va pasando.
 *
 * Tres cosas que un rotador tiene que hacer y casi ninguno hace:
 *
 * 1. Boton de pausa de verdad. Cualquier cosa que se mueva sola por mas de
 *    cinco segundos tiene que poder frenarse (WCAG 2.2.2). Los puntos no
 *    alcanzan: son para saltar, no para parar.
 * 2. Frenar con el mouse encima y con el foco adentro, para que no se cambie la
 *    foto justo cuando alguien la esta mirando o tabulando por los controles.
 * 3. Con prefers-reduced-motion no arranca solo. Los puntos siguen ahi, asi que
 *    se ven todas igual, pero decide la persona.
 *
 * Las fotos que no se ven van con aria-hidden: quien usa lector de pantalla
 * escucha la descripcion de la que esta a la vista y llega al resto por los
 * puntos, en vez de escuchar las cinco de corrido.
 *
 * Los puntos miden 24px aunque se vean de 8: es el minimo de area tactil.
 */
export function JourneyPhotos({
  photos,
  sizes = "(min-width: 640px) 20rem, 82vw",
  className,
}: {
  photos: Photo[];
  /** El ancho real de la tarjeta en el riel, no el del viewport. */
  sizes?: string;
  className?: string;
}) {
  const { ui } = content;
  const single = photos.length === 1;

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (single || reduce || !playing || held) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % photos.length),
      INTERVAL_MS
    );
    return () => window.clearInterval(id);
  }, [single, reduce, playing, held, photos.length]);

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-lg shadow-2xl shadow-black/50 ring-1 ring-white/10",
        className
      )}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="relative aspect-[1100/564]">
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            quality={85}
            sizes={sizes}
            aria-hidden={i !== index}
            className={cn(
              "object-cover transition-opacity duration-700 motion-reduce:transition-none",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      <figcaption
        className={cn(
          "absolute inset-x-0 bottom-0 flex items-center gap-3 bg-[linear-gradient(to_top,rgba(12,13,16,0.9),transparent)] px-3 pb-2 pt-10 text-body-sm",
          single && "pointer-events-none"
        )}
      >
        <span className="min-w-0 flex-1 truncate text-white/90">
          {photos[index].label}
        </span>

        {!single && (
          <span className="flex shrink-0 items-center gap-0.5">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setPlaying(false);
                }}
                aria-label={ui.photoShow(photo.label)}
                aria-current={i === index}
                className="grid size-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    i === index ? "bg-white" : "bg-white/45"
                  )}
                />
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? ui.photoPause : ui.photoPlay}
              className="ml-1 grid size-7 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {playing ? (
                <Pause aria-hidden className="size-3.5" />
              ) : (
                <Play aria-hidden className="size-3.5" />
              )}
            </button>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
