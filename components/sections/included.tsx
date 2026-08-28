import Image from "next/image";
import { content } from "@/lib/content";

/**
 * Kit completo. La imagen es la foto oficial de Cmax con fondo transparente,
 * asi que va sobre el tinte de marca en vez de flotar sobre blanco.
 * El copy no enumera las piezas a proposito: las muestra la foto.
 */
export function Included() {
  const { included } = content;

  return (
    <section
      id="included"
      className="bg-muted/40 py-section md:py-section-lg"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-title">{included.heading}</h2>
          <p className="mt-3 text-body text-muted-foreground">
            {included.subheading}
          </p>
        </div>

        <div className="mt-10 flex justify-center rounded-lg bg-background px-6 py-10 md:mt-14 md:py-14">
          <Image
            src={included.image.src}
            alt={included.image.alt}
            width={1300}
            height={2000}
            quality={90}
            sizes="(min-width: 768px) 520px, 90vw"
            className="h-auto w-full max-w-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
