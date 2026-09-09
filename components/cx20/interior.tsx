import Image from "next/image";
import { cx20 } from "@/lib/content/cx20";

/**
 * Interior y techos altos. Seccion oscura con la grilla tecnica: corta el
 * ritmo claro y hace que la foto blanca del interior resalte.
 *
 * La foto es vertical (1707x2560): va con proporcion 3:4 y object-cover para
 * no dejar una columna larguisima en desktop.
 */
export function Interior() {
  const { interior } = cx20;

  return (
    <section
      id="interior"
      className="bg-tech-grid relative overflow-hidden bg-foreground py-section text-background md:py-section-lg"
    >
      <div
        aria-hidden
        className="glow-orb absolute -right-24 top-1/3 size-72 bg-brand/40"
      />

      <div className="container relative grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg md:order-2">
          <Image
            src={interior.image.src}
            alt={interior.image.alt}
            fill
            quality={90}
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="md:order-1">
          <h2 className="text-title">{interior.heading}</h2>
          <p className="mt-3 text-body text-background/70">{interior.subheading}</p>
          <div className="mt-6 space-y-4">
            {interior.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body text-background/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
