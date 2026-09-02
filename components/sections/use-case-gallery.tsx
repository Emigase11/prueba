"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { content } from "@/lib/content";

/**
 * Lightbox de la galería de casos de uso.
 *
 * Las cinco imágenes son renders oficiales a 1536x1024: en la grilla se ven
 * a un tercio de ancho y se pierde el detalle. Acá se ven completas, y se
 * pasa de una a otra con flechas, teclado o swipe sin volver a la grilla.
 *
 * El diálogo desmonta su contenido al cerrarse, así que el carrusel se monta
 * de nuevo en cada apertura — por eso `startIndex` alcanza para abrir en la
 * tarjeta que se clickeó, sin sincronizar estado hacia adentro.
 */
export function UseCaseGallery({
  startIndex,
  open,
  onOpenChange,
}: {
  startIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { useCases, ui } = content;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    if (!api) return;
    const sync = () => setCurrent(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    return () => {
      api.off("select", sync);
    };
  }, [api]);

  const item = useCases.items[current];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[min(94vw,72rem)] overflow-hidden border-none bg-foreground p-0 text-background">
        <DialogTitle className="sr-only">{ui.galleryLabel}</DialogTitle>

        <Carousel
          setApi={setApi}
          opts={{ startIndex, loop: true }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {useCases.items.map((useCase) => (
              <CarouselItem key={useCase.title} className="pl-0">
                <Image
                  src={useCase.image.src}
                  alt={useCase.image.alt}
                  width={1536}
                  height={1024}
                  quality={95}
                  sizes="(min-width: 1024px) 72rem, 94vw"
                  className="aspect-[3/2] w-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label={ui.galleryPrev}
            className="left-3 size-10 border-none bg-black/55 text-white hover:bg-black/75 hover:text-white"
          />
          <CarouselNext
            aria-label={ui.galleryNext}
            className="right-3 size-10 border-none bg-black/55 text-white hover:bg-black/75 hover:text-white"
          />
        </Carousel>

        {/* Pie: título del caso + contador. `aria-live` para que el lector de
            pantalla anuncie el cambio al pasar de imagen. */}
        <div className="flex items-start justify-between gap-6 px-5 pb-6 pt-1 md:px-8 md:pb-8">
          <div aria-live="polite">
            <h3 className="text-subtitle">{item?.title}</h3>
            <p className="mt-1 text-body-sm text-background/70">
              {item?.description}
            </p>
          </div>
          <p className="shrink-0 pt-1 text-body-sm tabular-nums text-background/60">
            {ui.galleryCounter(current + 1, useCases.items.length)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
