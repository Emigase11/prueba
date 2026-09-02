import Image from "next/image";
import { Check } from "lucide-react";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Kit completo: foto oficial a un lado, lista al otro.
 *
 * La lista sale de content.included.items, confirmada por el cliente. Antes
 * la seccion mostraba solo la foto porque las piezas no estaban confirmadas
 * y enumerarlas habria sido inventar.
 *
 * El primer item es la cabina misma; va destacado para que se lea como la
 * unidad principal y el resto como accesorios que la acompanan.
 */
export function Included() {
  const { included } = content;

  return (
    <section
      id="included"
      className="bg-gradient-to-b from-brand-tint/60 to-background py-section md:py-section-lg"
    >
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Foto: fondo blanco porque el PNG es un recorte transparente */}
          <div className="flex justify-center rounded-lg bg-background px-6 py-10 md:py-14">
            <Image
              src={included.image.src}
              alt={included.image.alt}
              width={1300}
              height={2000}
              quality={90}
              sizes="(min-width: 768px) 420px, 80vw"
              className="h-auto w-full max-w-[420px]"
            />
          </div>

          <div>
            <h2 className="text-title">{included.heading}</h2>
            <p className="mt-3 text-body text-muted-foreground">
              {included.subheading}
            </p>

            <ul className="mt-8 space-y-3">
              {included.items.map((item, i) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white"
                  >
                    <Check className="size-3" strokeWidth={4} />
                  </span>
                  <span
                    className={cn(
                      "text-body",
                      i === 0 ? "font-semibold" : "text-muted-foreground",
                    )}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
