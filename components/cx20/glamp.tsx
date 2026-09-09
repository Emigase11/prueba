import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cx20 } from "@/lib/content/cx20";

/**
 * Programa Cmax Glamp: alojar en tu terreno. Copy del sitio actual; el CTA es
 * el mail de contacto porque hoy no hay otra via de alta.
 *
 * La imagen es un PNG transparente con las tres variantes de color del
 * CX20, asi que va contenida sobre el tinte, no recortada.
 */
export function Glamp() {
  const { glamp } = cx20;

  return (
    <section id="glamp" className="bg-brand-tint/60 py-section md:py-section-lg">
      <div className="container grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
        <div className="max-w-xl">
          <h2 className="text-title">{glamp.heading}</h2>
          <p className="mt-4 text-body text-muted-foreground">{glamp.body}</p>
          <Button asChild size="lg" className="mt-8 text-body font-semibold">
            <a href={glamp.cta.href}>{glamp.cta.label}</a>
          </Button>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src={glamp.image.src}
            alt={glamp.image.alt}
            width={458}
            height={583}
            quality={90}
            sizes="(min-width: 768px) 360px, 70vw"
            className="h-auto w-full max-w-[360px]"
          />
        </div>
      </div>
    </section>
  );
}
