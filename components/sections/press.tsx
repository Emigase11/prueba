import Image from "next/image";
import { content } from "@/lib/content";

/**
 * Barra de prensa. Los seis logos son PNG transparentes de 270x100, así que
 * comparten caja y se normalizan por altura. Van atenuados: son señal de
 * confianza, no protagonistas.
 */
export function Press() {
  const { press } = content;

  return (
    <section id="press" className="border-y py-12 md:py-16">
      <div className="container">
        <h2 className="text-center text-body-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {press.heading}
        </h2>

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
