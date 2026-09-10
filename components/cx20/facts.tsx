import { Check } from "lucide-react";
import { StatValue } from "@/components/fx/stat-value";
import { cx20 } from "@/lib/content/cx20";

/**
 * Los numeros que definen al CX20 (37" plegado, 14 ft abierto, duerme 8,
 * 11 min) y sus seis rasgos. Todos salen del sitio actual.
 *
 * Los destacados usan dt/dd con col-reverse: en el DOM va la etiqueta y
 * despues el valor (orden que anuncia un lector de pantalla); visualmente
 * el numero queda arriba.
 */
export function Facts() {
  const { facts } = cx20;

  return (
    <section id="facts" className="bg-dots py-section md:py-section-lg">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-title">{facts.heading}</h2>
          <p className="mt-3 text-body text-muted-foreground">{facts.subheading}</p>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4">
          {facts.stats.map((item) => (
            <div
              key={item.label}
              className="flex flex-col-reverse rounded-lg bg-brand-tint px-5 py-6"
            >
              <dt className="mt-1 text-body-sm text-muted-foreground">{item.label}</dt>
              <dd className="text-title text-brand-ink">
                <StatValue text={item.value} />
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-10 grid gap-x-8 gap-y-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {facts.features.map((feature) => (
            <li key={feature.title} className="flex gap-3">
              <span
                aria-hidden
                className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-ink text-white"
              >
                <Check className="size-3" strokeWidth={4} />
              </span>
              <div>
                <h3 className="text-subtitle">{feature.title}</h3>
                <p className="mt-1 text-body-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
