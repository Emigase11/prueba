import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScaleDrawing } from "@/components/cx20/scale-drawing";
import { content, formatUsd } from "@/lib/content";
import { cx20 } from "@/lib/content/cx20";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Hero de la home. La foto va a sangre, detras de todo, y el texto encima:
 * antes eran dos cajas al lado, texto de un lado y una foto cuadrada del otro,
 * que se leia como lamina de presentacion y no como portada.
 *
 * El velo NO es de abajo hacia arriba como el del Air X2, y no por variar: en
 * esta foto el sol esta a la derecha y la penumbra a la izquierda, asi que el
 * degradado corre de izquierda a derecha. Oscurece donde va el texto y deja el
 * atardecer y el destello del sol intactos, que es lo que hace la foto.
 *
 * Si se cambia la foto por una con el sol del otro lado, hay que dar vuelta el
 * degradado o el texto queda ilegible.
 *
 * La altura la fija el contenido con un minimo, no el viewport: un hero de
 * 100vh empuja el resto de la pagina fuera del primer vistazo.
 *
 * Debajo, sobre el fondo oscuro con grilla, la banda del Air X2.
 *
 * Ojo con las capas: la foto y los velos se apoyan en el orden del DOM y el
 * contenido se sube con z-10. Nada de z-index negativos: con la foto en -z-20
 * quedaba detras del fondo de la seccion y no se veia.
 */
const WRAP = "mx-auto w-full max-w-[84rem] px-4 sm:px-6 lg:px-8";

export function Cx20Hero() {
  const { brand } = content;
  const { hero, airX2Teaser } = cx20;

  return (
    <section id="hero" className="relative bg-foreground text-background">
      {/* --- Portada --- */}
      <div className="relative flex min-h-[34rem] flex-col overflow-hidden md:min-h-[42rem]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          quality={86}
          sizes="100vw"
          className="object-cover object-[36%_center] md:object-[62%_center]"
        />

        {/* Velo lateral para el texto + un cierre abajo que empalma con la
            banda oscura, asi la foto no corta en seco.
            
            La foto ya tiene luminancia media 0,211: es oscura de punta a punta.
            Con 0,3 de velo el texto blanco da 6,7:1, de sobra para el minimo de
            4,5:1. Subirlo mas no agrega legibilidad y tapa el atardecer, que es
            lo unico que esta foto tiene para dar. NO subirlo. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,13,16,0.62)_0%,rgba(12,13,16,0.5)_55%,rgba(12,13,16,0.28)_100%)] md:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(12,13,16,0.5)_0%,rgba(12,13,16,0.3)_32%,rgba(12,13,16,0.1)_60%,rgba(12,13,16,0)_85%)] md:block"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,rgb(26,29,35))]"
        />

        <header className="relative z-10">
          <div className={`${WRAP} flex h-16 items-center md:h-20`}>
            <Link href="/" aria-label={`${brand.name} — home`}>
              <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto md:h-9" sizes="170px" />
            </Link>
          </div>
        </header>

        <div className={`${WRAP} relative z-10 flex flex-1 items-center py-10 md:py-16`}>
          <div className="max-w-2xl">
            <h1 className="rise text-balance text-display text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
              {hero.headline}
              {hero.headlineAccent && (
                <span className="block text-brand-light">{hero.headlineAccent}</span>
              )}
            </h1>
            <p className="rise rise-2 mt-4 max-w-xl text-pretty text-body text-background/80">
              {hero.subheadline}
            </p>

            <ScaleDrawing className="rise rise-3 mt-8 grid max-w-sm gap-4" />

            <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="text-body font-semibold">
                <Link href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 bg-transparent text-body font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white active:bg-white/20"
              >
                <Link href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Banda del Air X2: toda es el enlace, asi en mobile el objetivo es
          del ancho completo y no un texto chico. --- */}
      <div className="bg-tech-grid relative overflow-hidden pb-section md:pb-section-lg">
        <div
          aria-hidden
          className="glow-orb absolute -left-32 top-0 size-80 bg-brand/30"
        />
        <div className={`${WRAP} relative pt-10 md:pt-14`}>
          <Link
            href={airX2Teaser.cta.href}
            className="group grid gap-5 border-t border-background/15 pt-6 transition-colors hover:border-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-foreground sm:grid-cols-[13rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 md:grid-cols-[17rem_minmax(0,1fr)_auto]"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md">
              <Image
                src={airX2Teaser.image.src}
                alt={airX2Teaser.image.alt}
                fill
                quality={90}
                sizes="(min-width: 768px) 272px, (min-width: 640px) 208px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>

            <div className="min-w-0">
              <p className="text-subtitle text-white">
                {airX2Teaser.name}{" "}
                <span className="font-normal text-background/60">
                  {airX2Teaser.eyebrow}
                </span>
              </p>
              <p className="mt-1 text-body-sm text-background/70">
                {airX2Teaser.tagline}
              </p>
            </div>

            <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:justify-center sm:gap-2">
              <p className="flex items-baseline gap-2 tabular-nums">
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
      </div>
    </section>
  );
}
