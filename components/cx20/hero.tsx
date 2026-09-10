import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { content, formatUsd } from "@/lib/content";
import { cx20 } from "@/lib/content/cx20";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Hero de la home: oscuro con la grilla tecnica. Arriba el CX20 —texto de un
 * lado, producto del otro— y debajo la franja del Air X2, que es el
 * lanzamiento pero no el producto principal de esta pagina.
 *
 * La foto del CX20 NO se recorta ni se deforma: su caja usa aspect-[4/3], la
 * misma proporcion que el archivo (2048x1536), asi que object-cover no tiene
 * nada que cortar. Para que pese en la pagina se le da la columna mas ancha
 * (7 de 12) dentro de un contenedor mas amplio que el del resto del sitio.
 *
 * Si se cambia la foto por una de otra proporcion hay que cambiar tambien el
 * aspect de la caja; si no, vuelve el recorte.
 *
 * La franja del Air X2 va sobre una superficie translucida con borde para
 * despegarse del fondo oscuro, que ahora comparte con el hero.
 */
const WRAP = "mx-auto w-full max-w-[84rem] px-4 sm:px-6 lg:px-8";

export function Cx20Hero() {
  const { brand } = content;
  const { hero, airX2Teaser } = cx20;

  return (
    <section
      id="hero"
      className="bg-tech-grid relative overflow-hidden bg-foreground pb-section text-background md:pb-section-lg"
    >
      <div
        aria-hidden
        className="glow-orb absolute -left-32 top-10 size-80 bg-brand/40"
      />

      <header className="relative">
        <div className={`${WRAP} flex h-16 items-center md:h-20`}>
          <Link href="/" aria-label={`${brand.name} — home`}>
            <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto md:h-9" sizes="170px" />
          </Link>
        </div>
      </header>

      <div
        className={`${WRAP} relative grid items-center gap-10 pt-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 md:pt-10`}
      >
        <div>
          <p className="rise text-body-sm font-semibold uppercase tracking-widest text-brand-light">
            {hero.eyebrow}
          </p>
          <h1 className="rise rise-2 mt-3 text-balance text-display text-white">
            {hero.headline}
            {hero.headlineAccent && (
              <span className="text-shimmer block">{hero.headlineAccent}</span>
            )}
          </h1>
          <p className="rise rise-3 mt-4 max-w-xl text-body text-background/70">
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

        {/* aspect-[4/3] = la proporcion nativa del archivo: recorte cero. */}
        <div className="rise rise-2 relative aspect-[4/3] overflow-hidden rounded-lg bg-black/40 shadow-2xl shadow-black/50 ring-1 ring-white/10">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            quality={90}
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Franja del Air X2: toda es el enlace, asi en mobile el objetivo es
          del ancho completo y no un texto chico. */}
      <div className={`${WRAP} relative mt-12 md:mt-16`}>
        <Link
          href={airX2Teaser.cta.href}
          className="group flex flex-col gap-5 overflow-hidden rounded-lg border border-background/10 bg-background/5 p-4 transition-colors hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:flex-row sm:items-center sm:gap-6 sm:p-5"
        >
          <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-md sm:w-44 md:w-56">
            <Image
              src={airX2Teaser.image.src}
              alt={airX2Teaser.image.alt}
              fill
              quality={90}
              sizes="(min-width: 768px) 224px, (min-width: 640px) 176px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="rounded-full bg-brand-ink px-2.5 py-0.5 text-body-sm font-semibold uppercase tracking-wide leading-none text-white">
                {airX2Teaser.badge}
              </span>
              <span className="text-body-sm font-semibold uppercase tracking-widest text-brand-light">
                {airX2Teaser.eyebrow}
              </span>
            </p>
            <p className="mt-2 text-subtitle text-white">{airX2Teaser.name}</p>
            <p className="mt-1 text-body-sm text-background/70">
              {airX2Teaser.tagline}
            </p>
          </div>

          <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-center sm:gap-3">
            <p className="flex items-baseline gap-2">
              <span className="sr-only">{airX2Teaser.priceLabel}: </span>
              <span className="text-subtitle text-white">
                {formatUsd(airX2Teaser.launchPrice)}
              </span>
              <span className="text-body-sm text-background/50">
                <s>{formatUsd(airX2Teaser.msrp)}</s>
              </span>
            </p>
            <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-body-sm font-semibold text-brand-light underline-offset-4 group-hover:underline">
              {airX2Teaser.cta.label}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </span>
          </div>
        </Link>
      </div>

      <div className={`${WRAP} relative mt-10 hidden justify-center md:flex`}>
        <Link
          href="#how-it-works"
          aria-label={hero.scrollCueLabel}
          className="scroll-cue-plain text-background/60 transition-colors hover:text-brand-light"
        >
          <ChevronDown aria-hidden className="size-7" />
        </Link>
      </div>
    </section>
  );
}
