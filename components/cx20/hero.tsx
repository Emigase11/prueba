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
      <div className="relative flex min-h-[36rem] flex-col overflow-hidden md:min-h-[44rem]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          quality={86}
          sizes="100vw"
          className="object-cover object-[38%_38%] md:object-center"
        />

        {/* Velo de abajo hacia arriba. El texto va al pie, asi que oscurece
            justo donde se lee y deja el refugio y el atardecer intactos arriba;
            de paso empalma con la banda oscura sin un segundo degradado.

            El valor esta medido, no elegido a ojo: la foto tiene luminancia
            media 0,288 y el minimo para que el texto blanco llegue a 4,5:1 es
            21% de velo. En la franja del texto hay 55% o mas, sobra. Arriba no
            hay nada y no debe haberlo: ahi esta la foto, que es lo unico que
            esta seccion tiene para dar. NO subir el velo de la mitad superior.

            El degradado usa el MISMO color que el fondo de la banda de abajo y
            se mantiene opaco en el ultimo 7%, no solo en la ultima linea. Sin
            ese tramo el pie del hero quedaba en rgb(30,25,27), tibio, contra el
            rgb(28,29,35) frio de la banda: ocho puntos de azul de diferencia a
            lo ancho de toda la pagina, que el ojo lee como una costura. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(26,29,35)_0%,rgb(26,29,35)_7%,rgba(26,29,35,0.78)_21%,rgba(26,29,35,0.5)_43%,rgba(26,29,35,0.2)_67%,rgba(26,29,35,0.03)_88%,transparent_100%)]"
        />

        <header className="relative z-10">
          <div className={`${WRAP} flex h-16 items-center md:h-20`}>
            <Link href="/" aria-label={`${brand.name} — home`}>
              <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto md:h-9" sizes="170px" />
            </Link>
          </div>
        </header>

        <div className={`${WRAP} relative z-10 flex flex-1 items-end pb-10 pt-16 md:pb-14 md:pt-24`}>
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

      {/* --- Air X2 ---
       *
       * Antes era una fila fina —miniatura, texto, precio— flotando en un
       * bloque oscuro vacio, con un corte seco arriba. El vacio a la derecha
       * del texto era la mitad del ancho.
       *
       * Ahora es un panel con la foto adentro, que ocupa ese vacio y le da al
       * segundo producto la presencia que le faltaba. La jerarquia la sostiene
       * el tamaño: el panel mide poco menos de la mitad del alto de la portada,
       * asi que se ve pero no compite con el CX20.
       *
       * Lo que llama la atencion es el precio de lanzamiento, que es un dato
       * real y no un adorno: es el unico numero de la pagina que viene con su
       * precio anterior tachado al lado.
       *
       * Todo el panel es el enlace, asi en mobile el objetivo es del ancho
       * completo y no un texto chico.
       */}
      <div className="bg-tech-grid relative overflow-hidden pb-section md:pb-section-lg">
        <div
          aria-hidden
          className="glow-orb absolute -left-32 top-0 size-80 bg-brand/30"
        />
        <div className={`${WRAP} relative pt-8 md:pt-12`}>
          <Link
            href={airX2Teaser.cta.href}
            className="group block overflow-hidden rounded-lg ring-1 ring-background/15 transition-colors duration-300 hover:ring-brand-light/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-foreground"
          >
            {/* min-h en la grilla, no en la columna de la foto: la foto usa
                fill y necesita que la fila ya tenga alto. */}
            <div className="grid md:min-h-[19rem] md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image
                  src={airX2Teaser.image.src}
                  alt={airX2Teaser.image.alt}
                  fill
                  quality={88}
                  sizes="(min-width: 768px) 56vw, 100vw"
                  className="object-cover object-[58%_42%] transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                {/* Empalme entre la foto y el texto, en el eje que corresponde
                    a cada layout: abajo cuando estan apilados, al costado
                    cuando estan lado a lado. */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgb(26,29,35),transparent)] md:hidden"
                />
                <div
                  aria-hidden
                  className="absolute inset-y-0 right-0 hidden w-28 bg-[linear-gradient(to_right,transparent,rgb(26,29,35))] md:block"
                />
              </div>

              <div className="flex flex-col justify-center gap-5 px-5 pb-8 pt-1 md:px-10 md:py-10">
                <div>
                  <p className="text-subtitle text-white">
                    {airX2Teaser.name}{" "}
                    <span className="font-normal text-background/60">
                      {airX2Teaser.eyebrow}
                    </span>
                  </p>
                  <p className="mt-1.5 text-pretty text-body-sm text-background/70">
                    {airX2Teaser.tagline}
                  </p>
                </div>

                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 tabular-nums">
                  <span className="sr-only">{airX2Teaser.priceLabel}: </span>
                  <span className="text-title text-white">
                    {formatUsd(airX2Teaser.launchPrice)}
                  </span>
                  <span className="text-body-sm text-background/50">
                    <s>{formatUsd(airX2Teaser.msrp)}</s>
                  </span>
                </p>

                <span className="flex items-center gap-1.5 text-body-sm font-semibold text-brand-light underline-offset-4 group-hover:underline">
                  {airX2Teaser.cta.label}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
