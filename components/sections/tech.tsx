import Image from "next/image";
import { content } from "@/lib/content";

/**
 * Sección técnica en oscuro: corta el ritmo claro de la página y hace que
 * el render de corte resalte. La foto va sobre una placa blanca porque su
 * fondo de estudio es claro y sobre el oscuro quedaría un recuadro sucio.
 */
export function Tech() {
  const { tech } = content;

  return (
    <section
      id="tech"
      className="bg-tech-grid relative overflow-hidden bg-foreground py-section text-background md:py-section-lg"
    >
      {/* Orbes de luz decorativos */}
      <div
        aria-hidden
        className="glow-orb absolute -left-24 top-10 size-72 bg-brand/60"
      />
      <div
        aria-hidden
        className="glow-orb absolute -right-24 bottom-10 size-72 bg-brand/40"
      />

      <div className="container relative grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h2 className="text-title">{tech.heading}</h2>
          <p className="mt-3 text-body text-background/70">{tech.subheading}</p>
          <div className="mt-6 space-y-4">
            {tech.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body text-background/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Borde degradado de 1px alrededor de la placa blanca */}
        <div className="rounded-lg bg-gradient-to-br from-brand/60 via-white/15 to-transparent p-px shadow-2xl shadow-brand/10">
          <div className="rounded-[calc(var(--radius)-1px)] bg-white p-4 md:p-6">
            <Image
              src={tech.image.src}
              alt={tech.image.alt}
              width={1292}
              height={1218}
              quality={90}
              sizes="(min-width: 768px) 45vw, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
