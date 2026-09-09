import Image from "next/image";
import { cx20 } from "@/lib/content/cx20";

/**
 * Seis usos del CX20 con foto. Mismo lenguaje que la galeria del Air X2
 * (texto sobre la foto con degradado oscuro), sin lightbox ni tilt: aca las
 * fotos son de contexto, no el producto en detalle.
 */
export function Uses() {
  const { uses } = cx20;

  return (
    <section id="uses" className="py-section md:py-section-lg">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-title">{uses.heading}</h2>
          <p className="mt-3 text-body text-muted-foreground">{uses.subheading}</p>
        </div>

        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {uses.items.map((item) => (
            <li
              key={item.title}
              className="group relative overflow-hidden rounded-lg transition-transform duration-200 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={1536}
                height={1024}
                quality={90}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-subtitle text-white">{item.title}</h3>
                <p className="mt-1 text-body-sm text-white/85">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
