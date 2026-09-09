import Image from "next/image";
import { content } from "@/lib/content";

type PressContent = typeof content.press;

/**
 * Barra de prensa. Compartida entre productos: cada uno pasa su lista de
 * logos (la home muestra mas medios que la landing del Air X2).
 *
 * Marquee infinito en CSS puro: dos copias identicas de la lista y
 * translateX(-50%); cada copia lleva su propio padding derecho para que el
 * bucle empalme exacto. La segunda copia va aria-hidden (los lectores de
 * pantalla leen los logos una sola vez).
 *
 * El movimiento se pausa al pasar el mouse. Con prefers-reduced-motion el
 * marquee se oculta entero y se muestra la grilla estatica de abajo.
 */
function LogoRow({
  logos,
  hidden,
}: {
  logos: PressContent["logos"];
  hidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14"
    >
      {logos.map((logo) => (
        <li key={logo.alt} className="shrink-0">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.alt}
            width={270}
            height={100}
            quality={90}
            sizes="130px"
            className="h-8 w-auto opacity-60 md:h-9"
          />
        </li>
      ))}
    </ul>
  );
}

export function Press({ press = content.press }: { press?: PressContent }) {
  return (
    <section id="press" className="border-y py-12 md:py-16">
      <div className="container">
        <h2 className="text-center text-body-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {press.heading}
        </h2>
      </div>

      <div className="marquee mt-8 overflow-hidden motion-reduce:hidden">
        <div className="marquee-track flex">
          <LogoRow logos={press.logos} />
          <LogoRow logos={press.logos} hidden />
        </div>
      </div>

      {/* Fallback estatico para reduced-motion */}
      <div className="container hidden motion-reduce:block">
        <ul className="mt-8 grid grid-cols-3 items-center gap-x-6 gap-y-8 md:grid-cols-6">
          {press.logos.map((logo) => (
            <li key={logo.alt} className="flex justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={270}
                height={100}
                quality={90}
                sizes="(min-width: 768px) 130px, 100px"
                className="h-8 w-auto opacity-60 md:h-9"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
