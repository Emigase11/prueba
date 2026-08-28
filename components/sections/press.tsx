import Image from "next/image";
import { content } from "@/lib/content";

/**
 * Barra de prensa. Marquee infinito en CSS puro: dos copias idénticas de la
 * lista y translateX(-50%); cada copia lleva su propio padding derecho para
 * que el bucle empalme exacto. La segunda copia va aria-hidden (los lectores
 * de pantalla leen los logos una sola vez) y el hover pausa el scroll.
 *
 * Con prefers-reduced-motion el marquee se oculta y se muestra la grilla
 * estática original.
 */
function LogoRow({ hidden }: { hidden?: boolean }) {
  const { press } = content;
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14"
    >
      {press.logos.map((logo) => (
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

export function Press() {
  const { press } = content;

  return (
    <section id="press" className="border-y py-12 md:py-16">
      <div className="container">
        <h2 className="text-center text-body-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {press.heading}
        </h2>
      </div>

      <div className="marquee mt-8 overflow-hidden motion-reduce:hidden">
        <div className="marquee-track flex">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>

      {/* Fallback estático para reduced-motion */}
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
