import Image from "next/image";
import { Quote } from "lucide-react";
import { cx20 } from "@/lib/content/cx20";
import { cn } from "@/lib/utils";

/**
 * Fundador y testimonios. Es la seccion de confianza de la home: quien esta
 * detras y quien lo respalda.
 *
 * Los testimonios van en filas alternadas, foto de un lado y cita del otro.
 * El motivo es la foto: las tres tienen proporciones muy distintas (1:1 el
 * Papa, 1,38:1 ACNUR, 1,95:1 Haya) y son documentos, no retratos de archivo,
 * asi que se muestran enteras. En una grilla de tres columnas eso obliga a
 * recortarlas todas a la misma caja; en filas, cada una ocupa el alto que le
 * corresponde y no se le toca ni un pixel.
 *
 * Por eso tambien van con width y height reales desde el contenido: next/image
 * les reserva el lugar exacto y la pagina no salta al cargarlas.
 *
 * La alternancia se hace con order, que solo cambia el orden visual: en el DOM
 * la foto sigue primero y el figcaption ultimo, como pide figure.
 *
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

        <h3 className="mt-20 text-subtitle md:mt-28">
          {founder.testimonialsHeading}
        </h3>
        <ul className="mt-8 divide-y md:mt-10">
          {founder.testimonials.map((item, i) => {
            const photoRight = i % 2 === 1;
            return (
              <li key={item.name} className="py-10 first:pt-0 last:pb-0 md:py-14">
                <figure className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    quality={88}
                    sizes="(min-width: 768px) 46vw, 92vw"
                    className={cn(
                      "h-auto w-full rounded-lg shadow-xl shadow-black/10 ring-1 ring-black/5",
                      photoRight && "md:order-2"
                    )}
                  />

                  <figcaption className={cn(photoRight && "md:order-1")}>
                    <Quote aria-hidden className="size-7 text-brand" />
                    <blockquote className="mt-4 text-body">
                      <p className="text-pretty">{item.quote}</p>
                    </blockquote>
                    <p className="mt-6 text-subtitle">{item.name}</p>
                    {item.role && (
                      <p className="mt-0.5 text-body-sm text-muted-foreground">
                        {item.role}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
