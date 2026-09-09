import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { content } from "@/lib/content";
import { cx20 } from "@/lib/content/cx20";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Hero de la home (CX20): partido, texto a un lado y producto al otro.
 *
 * No es a sangre como el del Air X2, y es a proposito. Esa foto es un plano
 * de estudio 4:3; llenando un viewport panoramico con object-cover se comia
 * medio producto. Aca va en su propia caja con la MISMA proporcion 4:3 que
 * el archivo, asi que no se recorta nada: se ve la unidad entera.
 *
 * Al no haber texto encima de la foto tampoco hace falta velo, que era el
 * otro problema: la imagen se ve tal cual es.
 *
 * La del Air X2 sigue a sangre porque es una foto de paisaje al atardecer,
 * que es lo que ese formato pide.
 */
export function Cx20Hero() {
  const { brand } = content;
  const { hero } = cx20;

  return (
    <section
      id="hero"
      className="bg-gradient-to-b from-brand-tint/50 to-background pb-section md:pb-section-lg"
    >
      <header>
        <div className="container flex h-16 items-center md:h-20">
          <Link href="/" aria-label={`${brand.name} — home`}>
            <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto md:h-9" sizes="170px" />
          </Link>
        </div>
      </header>

      <div className="container grid items-center gap-10 pt-6 md:grid-cols-2 md:gap-14 md:pt-10">
        <div>
          <p className="rise text-body-sm font-semibold uppercase tracking-widest text-brand-ink">
            {hero.eyebrow}
          </p>
          <h1 className="rise rise-2 mt-3 text-balance text-display">
            {hero.headline}
            {hero.headlineAccent && (
              <span className="block text-brand-ink">{hero.headlineAccent}</span>
            )}
          </h1>
          <p className="rise rise-3 mt-4 max-w-xl text-body text-muted-foreground">
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
              className="text-body font-semibold"
            >
              <Link href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Link>
            </Button>
          </div>
        </div>

        {/* aspect-[4/3] = la proporcion nativa del archivo: recorte cero. */}
        <div className="rise rise-2 relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-xl">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            quality={90}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container mt-10 hidden justify-center md:flex">
        <Link
          href="#how-it-works"
          aria-label={hero.scrollCueLabel}
          className="scroll-cue-plain text-muted-foreground transition-colors hover:text-brand-ink"
        >
          <ChevronDown aria-hidden className="size-7" />
        </Link>
      </div>
    </section>
  );
}
