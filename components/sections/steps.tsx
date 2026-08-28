import Image from "next/image";
import { content } from "@/lib/content";

/**
 * Las fotos de pasos son recortes PNG con fondo transparente y el número
 * naranja ya incorporado — por eso no se agrega un badge numérico (sería
 * duplicado) y van sobre un bloque tintado que las contiene.
 *
 * Nativo: 360x235. Nunca se escalan por encima de eso (max-w) para no
 * perder nitidez.
 */
export function Steps() {
  const { steps } = content;

  return (
    <section id="how-it-works" className="py-section md:py-section-lg">
      <div className="container">
        <h2 className="text-title">{steps.heading}</h2>
        <p className="mt-3 max-w-xl text-body text-muted-foreground">
          {steps.subheading}
        </p>

        <ol className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3">
          {steps.items.map((step) => (
            <li key={step.title} className="group">
              <div className="flex justify-center overflow-hidden rounded-lg bg-brand-tint px-4 py-6 transition-colors duration-300 group-hover:bg-brand-tint/70">
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  width={360}
                  height={235}
                  quality={90}
                  sizes="(min-width: 768px) 320px, 90vw"
                  className="h-auto w-full max-w-[360px] transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <h3 className="mt-5 text-subtitle">{step.title}</h3>
              <p className="mt-2 text-body text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
