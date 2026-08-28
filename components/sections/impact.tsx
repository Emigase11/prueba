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
        <div className="grid items-center gap-8 rounded-lg bg-brand px-6 py-10 text-white md:grid-cols-[auto_1fr] md:gap-12 md:px-12 md:py-14">
          <p className="text-display leading-none">{impact.ratioLabel}</p>
          <div>
            <h2 className="text-title">{impact.heading}</h2>
            <p className="mt-3 max-w-xl text-body text-white/90">{impact.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
