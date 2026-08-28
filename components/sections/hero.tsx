import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { content, formatUsd } from "@/lib/content";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

export function Hero() {
  const { brand, hero } = content;

  return (
    <section id="hero" className="relative flex min-h-[88svh] flex-col overflow-hidden">
      {/* overflow-hidden en la sección contiene el zoom de la foto */}
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hero-zoom object-cover"
      />
      {/* Velo de contraste. La foto es un atardecer muy claro, así que el
          bloque de texto necesita una base consistentemente oscura: los stops
          están fijados a mano para que la zona del texto quede >=0.75 de
          negro y el naranja del eyebrow llegue a 5.4:1. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_35%,rgba(0,0,0,0.3)_62%,rgba(0,0,0,0.15)_100%)]"
      />

      <header className="relative">
        <div className="container flex h-16 items-center md:h-20">
          <Link href="#hero" aria-label={`${brand.name} — home`}>
            <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto md:h-9" />
          </Link>
        </div>
      </header>

      <div className="relative mt-auto">
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

          <div className="rise rise-4 mt-6 flex items-baseline gap-3">
            <p className="text-title text-white">
              <span className="sr-only">{hero.priceLabel}: </span>
              {formatUsd(hero.launchPrice)}
            </p>
            <p className="text-body text-white/70">
              <span className="sr-only">Regular price: </span>
              <s>{formatUsd(hero.msrp)}</s> MSRP
            </p>
          </div>

          <div className="rise rise-5 mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="text-body font-semibold">
              <Link href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-transparent text-body font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Indicador de scroll — solo desktop; con reduced-motion se oculta */}
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
