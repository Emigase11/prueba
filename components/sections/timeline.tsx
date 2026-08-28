import { Check } from "lucide-react";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Roadmap del producto, con los mismos hitos que la timeline del sitio
 * actual pero en una sola columna en vez de zigzag: el zigzag obliga al ojo
 * a saltar de lado a lado y en mobile termina colapsando igual a una columna.
 *
 * Grilla: [fecha | riel | contenido] en desktop, [riel | contenido] en mobile.
 * El riel es un borde en cada item, no una línea absoluta, así crece solo
 * con el alto del contenido.
 *
 * La fecha del último hito sale de content.deliveryDate — la misma que la
 * línea bajo los planes.
 */
export function Timeline() {
  const { timeline, deliveryDateFallback } = content;

  return (
    <section id="timeline" className="bg-brand-tint/30 py-section md:py-section-lg">
      <div className="container">
        <h2 className="text-title">{timeline.heading}</h2>
        <p className="mt-3 max-w-xl text-body text-muted-foreground">
          {timeline.subheading}
        </p>

        <ol className="mt-10 md:mt-14">
          {timeline.items.map((item, i) => {
            const isLast = i === timeline.items.length - 1;
            const isNow = item.status === "now";
            const isDone = item.status === "done";
            // El marcador "estás acá" no lleva fecha; un hito sin fecha
            // (deliveryDate en null) cae al texto neutro.
            const dateLabel = isNow ? "" : (item.date ?? deliveryDateFallback);

            return (
              <li
                key={item.title}
                className="grid grid-cols-[auto_1fr] gap-x-4 md:grid-cols-[9rem_auto_1fr] md:gap-x-6"
              >
                {/* Fecha — columna propia solo en desktop */}
                <p
                  className={cn(
                    "hidden pt-0.5 text-right text-body-sm font-semibold md:block",
                    isNow ? "text-brand-ink" : "text-muted-foreground",
                  )}
                >
                  {dateLabel}
                </p>

                {/* Riel + punto */}
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                      isDone && "border-brand bg-brand text-white",
                      isNow && "border-brand bg-background ring-4 ring-brand/25",
                      item.status === "upcoming" &&
                        "border-border bg-background",
                    )}
                  >
                    {isDone && <Check className="size-3" strokeWidth={4} />}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden
                      className={cn(
                        "w-0.5 flex-1",
                        isDone ? "bg-brand/40" : "bg-border",
                      )}
                    />
                  )}
                </div>

                {/* Contenido */}
                <div className={cn("pb-10", isLast && "pb-0")}>
                  {/* Fecha inline en mobile, donde no hay columna aparte */}
                  <p
                    className={cn(
                      "text-body-sm font-semibold md:hidden",
                      isNow ? "text-brand-ink" : "text-muted-foreground",
                    )}
                  >
                    {dateLabel}
                  </p>

                  <h3
                    className={cn(
                      "mt-0.5 text-subtitle md:mt-0",
                      isNow && "text-brand-ink",
                    )}
                  >
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-2 max-w-xl text-body text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
