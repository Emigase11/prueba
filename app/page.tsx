import { content } from "@/lib/content";

/**
 * Esqueleto de la página: una caja por sección, en el orden final.
 * Cada placeholder se reemplaza por su componente real en
 * components/sections/ a medida que avanzamos sección por sección.
 */
const sections: { id: string; label: string }[] = [
  { id: "hero", label: `1. Hero — ${content.hero.headline}` },
  { id: "how-it-works", label: `2. ${content.steps.heading}` },
  { id: "pricing", label: `3. ${content.pricing.heading}` },
  { id: "use-cases", label: `4. ${content.useCases.heading}` },
  { id: "tech", label: `5. ${content.tech.heading}` },
  { id: "specs", label: `6. ${content.specs.heading}` },
  { id: "email", label: `7. ${content.emailCapture.heading}` },
  { id: "press", label: `8. ${content.press.heading}` },
  { id: "impact", label: `9. ${content.impact.heading}` },
  { id: "faq", label: `10. ${content.faq.heading}` },
];

export default function Home() {
  return (
    <main>
      <div className="container py-section">
        <p className="text-body-sm font-semibold uppercase tracking-widest text-brand">
          {content.brand.name} — demo scaffold
        </p>
        <h1 className="mt-2 text-display">{content.brand.productName}</h1>
        <div className="mt-10 space-y-4">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-lg border border-dashed bg-muted/40 p-6"
            >
              <h2 className="text-subtitle text-muted-foreground">
                {section.label}
              </h2>
            </section>
          ))}
        </div>
      </div>
      {/* Barra fija inferior mobile (precio + CTA) se agrega con la sección de pricing */}
    </main>
  );
}
