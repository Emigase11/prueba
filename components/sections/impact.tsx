import { content } from "@/lib/content";

/**
 * Programa de impacto: 1 donada cada 10 vendidas.
 * El ratio se muestra como dato grande porque es la idea entera de la
 * sección; el resto es una sola frase de contexto.
 */
export function Impact() {
  const { impact } = content;

  return (
    <section id="impact" className="py-section md:py-section-lg">
      <div className="container">
        {/* Texto oscuro sobre el naranja, no blanco: blanco sobre #F26522 da
            2.9:1 y no pasa AA para texto de cuerpo; el oscuro da 5.0:1. */}
        <div className="grid items-center gap-8 rounded-lg bg-brand px-6 py-10 text-foreground md:grid-cols-[auto_1fr] md:gap-12 md:px-12 md:py-14">
          <p className="text-display leading-none">{impact.ratioLabel}</p>
          <div>
            <h2 className="text-title">{impact.heading}</h2>
            <p className="mt-3 max-w-xl text-body">{impact.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
