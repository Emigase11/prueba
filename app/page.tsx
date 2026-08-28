import { content } from "@/lib/content";
import { Hero } from "@/components/sections/hero";
import { Steps } from "@/components/sections/steps";

/**
 * Esqueleto de la página: una caja por sección, en el orden final.
 * Cada placeholder se reemplaza por su componente real en
 * components/sections/ a medida que avanzamos sección por sección.
 */
const sections: { id: string; label: string }[] = [
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
      <Hero />
      <Steps />
      <div className="container py-section">
        <div className="space-y-4">
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
