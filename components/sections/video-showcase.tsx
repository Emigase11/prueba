"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { content } from "@/lib/content";

/**
 * Los dos videos, visibles a la vez:
 *  - Film (30 s, con audio): click-to-play con controles nativos y
 *    preload="none" - no descarga un byte hasta que el usuario le da play.
 *  - Loop (11 s, sin audio): autoreproduce en bucle, tambien en mobile.
 * Con prefers-reduced-motion el loop se oculta y queda su poster.
 */
export function VideoShowcase() {
  const { video } = content;
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="video"
      className="bg-tech-grid bg-foreground py-section text-background md:py-section-lg"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-brand-light">
            {video.eyebrow}
          </p>
          <h2 className="mt-3 text-title">{video.heading}</h2>
          <p className="mt-3 text-body text-background/70">{video.subheading}</p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-5">
          {/* Film: 30 s con audio, click-to-play */}
          <figure className="flex flex-col md:col-span-3">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-black shadow-2xl shadow-brand/20 md:aspect-auto md:flex-1">
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
                  <Image
                    src={video.filmPoster.src}
                    alt={video.filmPoster.alt}
                    fill
                    quality={90}
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"
                  />
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-white transition-colors hover:bg-black/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-inset"
                  >
                    <span className="relative">
                      {/* Anillo de pulso detras del boton */}
                      <span
                        aria-hidden
                        className="absolute inset-0 animate-ping rounded-full bg-brand opacity-40 motion-reduce:hidden"
                      />
                      <span className="relative flex size-16 items-center justify-center rounded-full bg-brand transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:size-20">
                        <Play
                          aria-hidden
                          className="ml-1 size-7 fill-white text-white md:size-8"
                        />
                      </span>
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
            <figcaption className="mt-3 text-body-sm text-background/60">
              {video.filmCaption}
            </figcaption>
          </figure>

          {/* Loop: 11 s sin audio, siempre reproduciendo */}
          <figure className="flex flex-col md:col-span-2">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-black md:aspect-auto md:flex-1">
              {/* Poster debajo: es lo que se ve con reduced-motion */}
              <Image
                src={video.loopPoster.src}
                alt={video.loopPoster.alt}
                fill
                quality={90}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              <video
                aria-hidden
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={video.loopPoster.src}
                className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              >
                <source src={video.loopSrc} type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-3 text-body-sm text-background/60">
              {video.loopCaption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
