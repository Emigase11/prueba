import { Quote } from "lucide-react";
import { JourneyPhotos } from "@/components/cx20/journey-photos";
import { cx20 } from "@/lib/content/cx20";
import { cn } from "@/lib/utils";

/**
 * La ruta: de Nicolas Garcia Mayor a Firas Kayal, una parada por hito.
 *
 * Va a lo ancho y no a lo largo. Apilada verticalmente ocupaba casi tres
 * pantallas de scroll, que es demasiado peso para una seccion que es respaldo y
 * no producto. En riel horizontal entra en menos de una, y de paso el recorrido
 * se lee como recorrido: la vista avanza en la misma direccion que el camino.
 *
 * El riel es el mismo patron que usa la seccion de casos de uso en mobile.
 * Lleva tabIndex y role para que se pueda recorrer con el teclado, que es lo
 * que suele faltarle a un carrusel horizontal.
 *
 * El argumento de la seccion es "mira cuanto camino hubo antes", no "mira quien
 * lo felicito". Por eso los tres testimonios son las ultimas paradas y sus
 * nodos van rellenos de naranja: se ve de un vistazo donde termina el camino.
 *
 * No hay fechas: los lugares salen de los nombres de archivo de Cmax y los
 * premios de la bio, pero los años no los tenemos y no se inventan.
 */
export function Founder() {
  const { founder } = cx20;
  const last = founder.stops.length - 1;

  return (
    <section
      id="founder"
      className="bg-tech-grid relative overflow-hidden bg-foreground py-section text-background md:py-section-lg"
    >
      <div
        aria-hidden
        className="glow-orb absolute -left-28 top-1/4 size-72 bg-brand/35"
      />

      <div className="container relative">
        <div className="max-w-2xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-brand-light">
            {founder.eyebrow}
          </p>
          <h2 className="mt-3 text-title text-white">{founder.name}</h2>
          <p className="mt-1 text-body text-background/70">{founder.role}</p>
          <p className="mt-4 text-pretty text-body-sm text-background/70">
            {founder.bio}
          </p>
        </div>

        <div className="mt-12 max-w-2xl md:mt-16">
          <h3 className="text-balance text-title text-white">
            {founder.journeyHeading}
          </h3>
          <p className="mt-3 text-pretty text-body text-background/70">
            {founder.journeyBody}
          </p>
        </div>

        {/* El riel sangra hasta el borde del viewport para que la ultima
            tarjeta no parezca cortada por el container, y vuelve a entrar con
            el padding. */}
        <ol
          tabIndex={0}
          role="region"
          aria-label={founder.journeyHeading}
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-3 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-foreground sm:-mx-6 sm:px-6 md:mt-12 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {founder.stops.map((stop, i) => (
            <li
              key={stop.title}
              className="flex w-[82%] shrink-0 snap-start flex-col sm:w-80"
            >
              {/* La via. El tramo llega hasta el nodo siguiente: se estira un
                  gap de mas (-right-5) y queda tapado por el nodo, que va
                  despues en el DOM y tiene fondo solido.

                  Va en naranja y no en blanco al 25%: a un pixel sobre el fondo
                  oscuro el blanco no se veia, y esta linea es lo unico que
                  convierte siete tarjetas sueltas en un recorrido. */}
              <div className="relative mb-5 h-[26px]">
                {i < last && (
                  <span
                    aria-hidden
                    className="absolute -right-5 left-3 top-[13px] h-px bg-brand/60"
                  />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-0 size-[26px] rounded-full border-2 border-brand",
                    stop.quote ? "bg-brand" : "bg-foreground"
                  )}
                />
              </div>

              <JourneyPhotos photos={stop.photos} />

              <p className="mt-4 text-body-sm font-semibold uppercase tracking-widest text-brand-light">
                {stop.place}
              </p>
              <h4 className="mt-1.5 text-balance text-subtitle text-white">
                {stop.title}
              </h4>

              {stop.body && (
                <p className="mt-2 text-pretty text-body-sm text-background/70">
                  {stop.body}
                </p>
              )}

              {stop.quote && (
                <blockquote className="mt-3 flex flex-1 flex-col">
                  <Quote aria-hidden className="size-5 text-brand-light" />
                  <p className="mt-2 text-pretty text-body-sm text-background/85">
                    {stop.quote.text}
                  </p>
                  <footer className="mt-3 text-body-sm">
                    <span className="font-semibold text-white">
                      {stop.quote.name}
                    </span>
                    {stop.quote.role && (
                      <span className="text-background/60"> {stop.quote.role}</span>
                    )}
                  </footer>
                </blockquote>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
