"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { TiltCard } from "@/components/fx/tilt-card";
import { UseCaseGallery } from "@/components/sections/use-case-gallery";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Galería de 5 casos de uso.
 *
 * Desktop: grilla de 6 columnas para que las 5 tarjetas llenen el ancho sin
 * huecos:
 *   md  → 3+3 / 6 / 3+3
 *   lg  → 2+2+2 / 3+3
 * Mobile: el mismo <ul> pasa a carrusel horizontal con scroll-snap (CSS
 * puro, sin JS y sin duplicar el DOM ni volver a bajar las imágenes). Antes
 * eran cinco fotos apiladas que había que scrollear una por una.
 *
 * Cada tarjeta abre el lightbox a tamaño completo en su propia imagen.
 * El texto va sobre la foto con degradado oscuro (las imágenes son
 * cinemáticas y recortarles espacio para texto debajo las desperdiciaría).
 * Cada tarjeta tiene tilt 3D con glare que sigue al mouse (solo desktop).
 */
const SPANS = [
  "md:col-span-3 lg:col-span-2",
  "md:col-span-3 lg:col-span-2",
  "md:col-span-6 lg:col-span-2",
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-3",
];

export function UseCases() {
  const { useCases, ui } = content;
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <section id="use-cases" className="bg-dots py-section md:py-section-lg">
      <div className="container">
        <h2 className="text-title">{useCases.heading}</h2>
        <p className="mt-3 max-w-xl text-body text-muted-foreground">
          {useCases.subheading}
        </p>

        <ul
          className={cn(
            // Mobile: riel horizontal. El padding lateral negativo + el
            // scroll-padding hacen que la primera tarjeta arranque alineada
            // con el container y la última pueda centrarse igual.
            "-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            // Desktop: la grilla de siempre.
            "md:mx-0 md:mt-14 md:grid md:grid-cols-6 md:overflow-visible md:px-0 md:pb-0",
          )}
        >
          {useCases.items.map((item, i) => (
            <li
              key={item.title}
              className={cn(
                // El active vive aca y no en TiltCard: .tilt-card ya define
                // su propio transform (el tilt 3D) y ambos pelearian por la
                // misma propiedad. En elementos separados se componen.
                "group w-[82%] shrink-0 snap-center transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 md:w-auto md:shrink",
                SPANS[i],
              )}
            >
              <TiltCard className="relative overflow-hidden rounded-lg">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={1536}
                  height={1024}
                  quality={90}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 82vw"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
                />

                {/* Indicador de "ampliar". Decorativo: la acción la da el
                    botón que cubre la tarjeta. */}
                <span
                  aria-hidden
                  className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  <Expand className="size-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-subtitle text-white">{item.title}</h3>
                  <p className="mt-1 text-body-sm text-white/85">
                    {item.description}
                  </p>
                </div>

                {/* Botón estirado sobre toda la tarjeta: un solo objetivo
                    clickeable y un solo nodo focusable por tarjeta. */}
                <button
                  type="button"
                  onClick={() => setOpenAt(i)}
                  className="absolute inset-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span className="sr-only">
                    {ui.galleryOpenHint} — {item.title}
                  </span>
                </button>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>

      <UseCaseGallery
        // key: fuerza un carrusel nuevo por tarjeta, así `startIndex` se
        // aplica siempre y no queda pegado en la apertura anterior.
        key={openAt ?? "closed"}
        startIndex={openAt ?? 0}
        open={openAt !== null}
        onOpenChange={(open) => !open && setOpenAt(null)}
      />
    </section>
  );
}
