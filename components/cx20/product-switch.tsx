import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cx20 } from "@/lib/content/cx20";
import { cn } from "@/lib/utils";

/**
 * Puente entre las dos lineas de producto. Es la navegacion principal
 * CX20 <-> Air X2 dentro del contenido, ademas del enlace del hero y del
 * footer: quien entra por la home tiene que descubrir que existe la cabina
 * inflable sin buscarla en un menu.
 *
 * La tarjeta del producto actual no es un enlace a otra pagina (no hay a
 * donde ir): baja a "como funciona".
 */
export function ProductSwitch() {
  const { productSwitch } = cx20;

  return (
    <section id="products" className="py-section md:py-section-lg">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-title">{productSwitch.heading}</h2>
          <p className="mt-3 text-body text-muted-foreground">{productSwitch.body}</p>
        </div>

        <ul className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
          {productSwitch.cards.map((card) => (
            <li key={card.name}>
              <Link
                href={card.href}
                aria-current={card.current ? "page" : undefined}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
                  card.current
                    ? "border-brand ring-1 ring-brand"
                    : "border-border",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden",
                    card.fit === "contain" ? "bg-brand-tint p-8" : "bg-muted",
                  )}
                >
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    quality={90}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={cn(
                      "transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                      card.fit === "contain" ? "object-contain p-8" : "object-cover",
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="text-subtitle">{card.name}</h3>
                  <p className="text-body-sm text-muted-foreground">{card.tagline}</p>
                  <p
                    className={cn(
                      "mt-auto flex items-center gap-1.5 pt-3 text-body-sm font-semibold",
                      card.current ? "text-muted-foreground" : "text-brand-ink",
                    )}
                  >
                    {card.ctaLabel}
                    {!card.current && (
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                      />
                    )}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
