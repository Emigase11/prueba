import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScaleDrawing } from "@/components/cx20/scale-drawing";
import { content } from "@/lib/content";
import { cx20 } from "@/lib/content/cx20";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Portada de la home. La foto va a sangre, detras de todo, y el texto encima.
 *
 * El velo va de abajo hacia arriba porque el texto esta al pie: oscurece justo
 * donde se lee y deja el refugio y el atardecer intactos arriba.
 *
 * El valor esta medido, no elegido a ojo: la foto tiene luminancia media 0,288
 * y el minimo para que el texto blanco llegue a 4,5:1 es 21% de velo. En la
 * franja del texto hay 55% o mas. Arriba no hay nada y no debe haberlo: ahi
 * esta la foto, que es lo unico que esta seccion tiene para dar. NO subir el
 * velo de la mitad superior.
 *
 * Si se cambia la foto hay que revisar dos cosas: el object-position (en mobile
 * apunta al 38% horizontal para que el refugio entre en un encuadre vertical,
 * donde el recorte lateral es brutal) y la luminancia, antes de tocar el velo.
 *
 * La altura la fija el contenido con un minimo, no el viewport: un hero de
 * 100vh empuja el resto de la pagina fuera del primer vistazo.
 *
 * Ojo con las capas: la foto y el velo se apoyan en el orden del DOM y el
 * contenido se sube con z-10. Nada de z-index negativos: con la foto en -z-20
 * quedaba detras del fondo de la seccion y no se veia.
 *
 * Aca vivia una franja que enlazaba al Air X2. Se saco porque la seccion
 * siguiente (#products) ya presenta los dos productos y deja elegir: era la
 * misma informacion dos veces seguidas. El acceso rapido a los dos quedo en el
 * menu del header.
 */
const WRAP = "mx-auto w-full max-w-[84rem] px-4 sm:px-6 lg:px-8";

export function Cx20Hero() {
  const { brand } = content;
  const { hero } = cx20;

  return (
    <section
      id="hero"
      className="relative flex min-h-[36rem] flex-col overflow-hidden bg-foreground text-background md:min-h-[44rem]"
    >
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        quality={86}
        sizes="100vw"
        className="object-cover object-[38%_38%] md:object-center"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(26,29,35)_0%,rgb(26,29,35)_5%,rgba(26,29,35,0.78)_20%,rgba(26,29,35,0.5)_43%,rgba(26,29,35,0.2)_67%,rgba(26,29,35,0.03)_88%,transparent_100%)]"
      />

      <header className="relative z-10">
        <div className={`${WRAP} flex h-16 items-center md:h-20`}>
          <Link href="/" aria-label={`${brand.name} — home`}>
            <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto md:h-9" sizes="170px" />
          </Link>
        </div>
      </header>

      <div className={`${WRAP} relative z-10 flex flex-1 items-end pb-12 pt-16 md:pb-16 md:pt-24`}>
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
    </section>
  );
}
