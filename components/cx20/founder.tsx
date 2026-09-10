import Image from "next/image";
import { Quote } from "lucide-react";
import { cx20 } from "@/lib/content/cx20";

/**
 * Fundador y testimonios. Es la seccion de confianza de la home: quien esta
 * detras y quien lo respalda.
 *
 * Cada testimonio lleva el retrato de quien lo dijo. Las fotos originales
 * venian con un aro celeste incrustado en el pixel sobre fondo blanco; estan
 * recortadas al circulo interior con scripts/crop-avatar.mjs, asi que lo que
 * queda de aro cae en las esquinas del cuadrado y se va con el rounded-full.
 * Las citas son textuales del sitio actual.
 */
export function Founder() {
  const { founder } = cx20;

  return (
    <section id="founder" className="bg-gradient-to-b from-background to-brand-tint/60 py-section md:py-section-lg">
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <Image
              src={founder.image.src}
              alt={founder.image.alt}
              fill
              quality={90}
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-body-sm font-semibold uppercase tracking-widest text-brand-ink">
              {founder.eyebrow}
            </p>
            <h2 className="mt-3 text-title">{founder.name}</h2>
            <p className="mt-1 text-body text-muted-foreground">{founder.role}</p>
            <p className="mt-5 max-w-xl text-body">{founder.bio}</p>
          </div>
        </div>

        <h3 className="mt-16 text-subtitle md:mt-20">{founder.testimonialsHeading}</h3>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {founder.testimonials.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col rounded-lg border bg-card p-6">
                <Quote aria-hidden className="size-6 text-brand" />
                <blockquote className="mt-4 flex-1 text-body text-muted-foreground">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t pt-5 text-body-sm">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={128}
                    height={128}
                    quality={85}
                    className="size-14 shrink-0 rounded-full object-cover ring-1 ring-border"
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold text-foreground">
                      {item.name}
                    </span>
                    {item.role && (
                      <span className="block text-muted-foreground">{item.role}</span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
