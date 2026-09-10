import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cx20 } from "@/lib/content/cx20";
import { cn } from "@/lib/utils";

/**
 * Puente entre las dos lineas de producto, y la via principal al Air X2
 * dentro del contenido (las otras son la barra de anuncio y el footer).
 *
 * La tarjeta destacada es la del producto NUEVO, no la de la pagina actual:
 * quien esta aca ya encontro el CX20. Por eso el Air X2 lleva el aro naranja,
 * la etiqueta de lanzamiento y la sombra, y el CX20 queda en tono neutro con
 * un "estas aca" que solo baja a la seccion de abajo.
 */
export function ProductSwitch() {
  const { productSwitch } = cx20;

  return (
    <section id="products" className="bg-dots py-section md:py-section-lg">
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
                  "group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
                  card.isNew
                    ? "border-brand shadow-xl shadow-brand/20 ring-1 ring-brand hover:shadow-2xl hover:shadow-brand/30"
                    : "border-border hover:shadow-lg",
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden",
                    card.fit === "contain" ? "bg-brand-tint" : "bg-muted",
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
                  {card.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-brand-ink px-3 py-1 text-body-sm font-semibold uppercase tracking-wide leading-none text-white shadow-lg">
                      {card.badge}
                    </span>
                  )}
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
