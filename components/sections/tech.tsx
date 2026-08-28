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
      className="bg-foreground py-section text-background md:py-section-lg"
    >
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-14">
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

        <div className="rounded-lg bg-white p-4 md:p-6">
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
    </section>
  );
}
