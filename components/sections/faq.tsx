import { content } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ en acordeón. Radix aporta la navegación por teclado (Tab entre
 * triggers, Enter/Espacio para abrir, y el estado se anuncia con
 * aria-expanded), así que no hace falta manejo manual de foco.
 */
export function Faq() {
  const { faq } = content;

  return (
    <section id="faq" className="py-section md:py-section-lg">
      <div className="container max-w-3xl">
        <h2 className="text-title">{faq.heading}</h2>

        <Accordion type="single" collapsible className="mt-8 md:mt-12">
          {faq.items.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-subtitle hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-body text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
