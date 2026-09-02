import { AlertTriangle } from "lucide-react";
import { StatValue } from "@/components/fx/stat-value";
import { PendingHint } from "@/components/fx/pending-hint";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Ficha tecnica agrupada. Reemplaza a la tabla plana de 6 filas: el cliente
 * paso la ficha completa organizada por temas (dimensiones, estructura,
 * inflado, flotabilidad, etc.) y esa agrupacion se respeta.
 *
 * El grupo con `note` renderiza la aclaracion legal destacada, no como letra
 * chica: la de flotabilidad aclara que NO es un salvavidas certificado.
 *
 * Seccion oscura: los tokens son los de fondo oscuro (text-background/*,
 * brand-light), no los de fondo claro (text-muted-foreground, brand-ink).
 */
export function Specs() {
  const { specs } = content;

  return (
    <section
      id="specs"
      className="bg-tech-grid relative overflow-hidden bg-foreground py-section text-background md:py-section-lg"
    >
      <div
        aria-hidden
        className="glow-orb absolute -left-28 top-1/4 size-72 bg-brand/40"
      />

      <div className="container relative">
        <h2 className="text-title">{specs.heading}</h2>
        <p className="mt-3 max-w-2xl text-body text-background/70">
          {specs.subheading}
        </p>

        {/* Los cuatro numeros que la gente busca primero, antes de la ficha. */}
        <dl className="mt-8 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4">
          {specs.highlights.map((item) => (
            // col-reverse: en el DOM va dt (etiqueta) y despues dd (valor),
            // que es el orden que anuncia un lector de pantalla; visualmente
            // el numero queda arriba. Sin dt oculto, asi no se repite.
            <div
              key={item.label}
              className="flex flex-col-reverse rounded-lg border border-background/10 bg-background/5 px-5 py-6"
            >
              <dt className="mt-1 text-body-sm text-background/60">
                {item.label}
              </dt>
              <dd className="text-title text-brand-light">
                <StatValue text={item.value} />
              </dd>
            </div>
          ))}
        </dl>

        <dl className="mt-10 grid gap-x-10 gap-y-8 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {specs.groups.map((group) => (
            <div
              key={group.label}
              className="border-t border-background/15 pt-5"
            >
              <dt className="text-body-sm font-semibold uppercase tracking-widest text-brand-light">
                {group.label}
                {group.pending && <PendingHint />}
              </dt>

              <dd>
                {group.layout === "chips" ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.values.map((value) => (
                      <li
                        key={value}
                        className="rounded-full border border-background/15 bg-background/5 px-3 py-1 text-body-sm text-background/80"
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-3 space-y-1.5">
                    {group.values.map((value) => (
                      <li
                        key={value}
                        className={cn(
                          "text-body-sm text-background/80",
                          group.pending && "italic text-background/50",
                        )}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                )}

                {group.note && (
                  <p className="mt-3 flex gap-2 rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-body-sm text-amber-200">
                    <AlertTriangle
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0"
                    />
                    <span>{group.note}</span>
                  </p>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
