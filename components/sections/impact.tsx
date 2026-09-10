import { StatValue } from "@/components/fx/stat-value";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

type ImpactContent = typeof content.impact;

/**
 * Programa de impacto: 1 donada cada 10 vendidas. Compartido entre productos.
 * El ratio se muestra como dato grande porque es la idea entera de la
 * seccion; el resto es una sola frase de contexto.
 *
 * `tone` existe porque las dos paginas la usan y no la quieren igual: la home
 * la pide oscura, con la grilla tecnica del resto de sus secciones, y la del
 * Air X2 se queda como estaba. Por eso el claro es el valor por defecto: quien
 * no pide nada no cambia.
 */
export function Impact({
  impact = content.impact,
  tone = "light",
}: {
  impact?: ImpactContent;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <section
      id="impact"
      className={cn(
        "py-section md:py-section-lg",
        dark
          ? "bg-tech-grid relative overflow-hidden bg-foreground text-background"
          : "bg-muted/40"
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="glow-orb absolute -right-28 top-1/3 size-72 bg-brand/35"
        />
      )}

      <div className={cn("container", dark && "relative")}>
        {/* Texto oscuro sobre el naranja, no blanco: blanco sobre #F26522 da
            3,19:1 y el minimo para texto de cuerpo es 4,5:1; el oscuro da
            5,03:1. Sobre el fondo negro el panel naranja es ademas lo mas
            fuerte de la pagina, que es lo que corresponde: es la mision. */}
        <div className="grid items-center gap-8 rounded-lg bg-brand px-6 py-10 text-foreground md:grid-cols-[auto_1fr] md:gap-12 md:px-12 md:py-14">
          <p className="text-display leading-none">
            <StatValue text={impact.ratioLabel} />
          </p>
          <div>
            <h2 className="text-title">{impact.heading}</h2>
            <p className="mt-3 max-w-xl text-body">{impact.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
