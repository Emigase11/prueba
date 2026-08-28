"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { content } from "@/lib/content";

/**
 * Una sola tarjeta 16:9 con los dos videos:
 *  - estado inicial: loop ambiente sin audio (solo desktop; en mobile va el
 *    poster, porque el loop pesa 12 MB y el grueso del trafico es celular)
 *  - al dar play: el film completo con audio y controles nativos
 *
 * El film usa preload="none": no se descarga nada hasta que el usuario
 * decide verlo.
 */
export function VideoShowcase() {
  const { video } = content;
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="video"
      className="bg-foreground py-section text-background md:py-section-lg"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-brand-light">
            {video.eyebrow}
          </p>
          <h2 className="mt-3 text-title">{video.heading}</h2>
          <p className="mt-3 text-body text-background/70">{video.subheading}</p>
        </div>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-lg bg-black md:mt-14">
          {playing ? (
            <video
              controls
              autoPlay
              playsInline
              preload="none"
              poster={video.filmPoster.src}
              className="h-full w-full"
            >
              <source src={video.filmSrc} type="video/mp4" />
            </video>
          ) : (
            <>
              {/* Poster: siempre presente. En mobile es lo unico que carga. */}
              <Image
                src={video.loopPoster.src}
                alt={video.loopPoster.alt}
                fill
                quality={90}
                sizes="(min-width: 768px) 90vw, 100vw"
                className="object-cover"
              />
              {/* Loop ambiente: desktop, y no con reduced-motion activo. */}
              <video
                aria-hidden
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={video.loopPoster.src}
                className="absolute inset-0 hidden h-full w-full object-cover md:block motion-reduce:md:hidden"
              >
                <source src={video.loopSrc} type="video/mp4" />
              </video>

              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"
              />

              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-white transition-colors hover:bg-black/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-inset"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-brand transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:size-20">
                  <Play
                    aria-hidden
                    className="ml-1 size-7 fill-white text-white md:size-8"
                  />
                </span>
                <span className="text-subtitle">
                  {video.playLabel}
                  <span className="ml-2 font-normal text-white/70">
                    {video.filmDuration}
                  </span>
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
