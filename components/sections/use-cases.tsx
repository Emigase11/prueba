import Image from "next/image";
import { TiltCard } from "@/components/fx/tilt-card";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Galería de 5 casos de uso.
 * Grilla de 6 columnas para que las 5 tarjetas llenen el ancho sin huecos:
 *   md  → 3+3 / 6 / 3+3
 *   lg  → 2+2+2 / 3+3
 * El texto va sobre la foto con degradado oscuro (las imágenes son
 * cinemáticas y recortarles espacio para texto debajo las desperdiciaría).
 * Cada tarjeta tiene tilt 3D con glare que sigue al mouse (solo desktop).
 */
const SPANS = [
  "md:col-span-3 lg:col-span-2",
  "md:col-span-3 lg:col-span-2",
  "md:col-span-6 lg:col-span-2",
  "md:col-span-3 lg:col-span-3",
  "md:col-span-3 lg:col-span-3",
];

export function UseCases() {
  const { useCases } = content;

  return (
    <section id="use-cases" className="py-section md:py-section-lg">
      <div className="container">
        <h2 className="text-title">{useCases.heading}</h2>
        <p className="mt-3 max-w-xl text-body text-muted-foreground">
          {useCases.subheading}
        </p>

        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-6">
          {useCases.items.map((item, i) => (
            <li key={item.title} className={cn("group", SPANS[i])}>
              <TiltCard className="relative overflow-hidden rounded-lg">
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
                  <p className="mt-1 text-body-sm text-white/85">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
