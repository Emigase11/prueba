import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { content } from "@/lib/content";
import { cx20 } from "@/lib/content/cx20";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Hero de la home (CX20). Misma anatomia que el del Air X2 — foto a pantalla,
 * velo de contraste, entrada escalonada, acento con brillo — para que las
 * dos landings se lean como el mismo sitio.
 *
 * Contraste en dos capas, porque la foto de fabrica es casi blanca:
 *  1. velo base denso (0.95 abajo -> 0.6 arriba), fijado a mano;
 *  2. degradado local en el bloque de texto, que crece con el texto: en
 *     pantallas angostas el titular ocupa varias lineas y el eyebrow sube
 *     hasta donde el velo base solo ya no alcanza (medido: 1.1:1 sin esto).
 * Con ambas, el naranja del eyebrow (brand-light) supera 5:1 en el peor caso.
 */
export function Cx20Hero() {
  const { brand } = content;
  const { hero } = cx20;

  return (
    <section id="hero" className="relative flex min-h-[88svh] flex-col overflow-hidden">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hero-zoom object-cover object-[60%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.9)_50%,rgba(0,0,0,0.82)_75%,rgba(0,0,0,0.6)_100%)]"
      />

      <header className="relative">
        <div className="container flex h-16 items-center justify-between md:h-20">
          <Link href="/" aria-label={`${brand.name} — home`}>
            <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto md:h-9" />
          </Link>
          <Link
            href={hero.ctaSecondary.href}
            className="text-body-sm font-semibold text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {hero.ctaSecondary.label} &rarr;
          </Link>
        </div>
      </header>

      <div className="relative mt-auto bg-gradient-to-t from-black/65 via-black/50 to-black/15">
        <div className="container pb-10 pt-24 md:pb-16">
          <p className="rise text-body-sm font-semibold uppercase tracking-widest text-brand-light">
            {hero.eyebrow}
          </p>
          <h1 className="rise rise-2 mt-3 max-w-2xl text-balance text-display text-white">
            {hero.headline}
            {hero.headlineAccent && (
              <span className="text-shimmer block">{hero.headlineAccent}</span>
            )}
          </h1>
          <p className="rise rise-3 mt-4 max-w-xl text-body text-white/85">
            {hero.subheadline}
          </p>

          <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="text-body font-semibold">
              <Link href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-transparent text-body font-semibold text-white hover:bg-white/10 hover:text-white active:bg-white/20"
            >
              <Link href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Link>
            </Button>
          </div>
        </div>
      </div>

      <Link
        href="#how-it-works"
        aria-label={hero.scrollCueLabel}
        className="scroll-cue absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-white/80 hover:text-white md:block"
      >
        <ChevronDown aria-hidden className="size-7" />
      </Link>
    </section>
  );
}
