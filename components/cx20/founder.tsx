import { Quote } from "lucide-react";
import { JourneyPhotos } from "@/components/cx20/journey-photos";
import { cx20 } from "@/lib/content/cx20";

/**
 * La ruta: de Nicolas Garcia Mayor a Firas Kayal, una parada por hito.
 *
 * Reemplaza al bloque de fundador mas tres testimonios sueltos. El argumento de
 * esta seccion no es "mira quien lo felicito" sino "mira cuanto camino hubo
 * antes", y para eso los testimonios tienen que ser el final de algo, no una
 * grilla. Por eso son las tres ultimas paradas, y sus nodos van rellenos.
 *
 * La linea no es adorno: es el unico elemento que dice "esto llevo años". Se
 * dibuja con un pseudo-elemento por parada en vez de un borde en la lista, asi
 * corta despues del ultimo nodo en lugar de seguir hasta el pie del bloque.
 *
 * Las paradas con mas de una foto usan el rotador, que las pasa solas. El
 * detalle de pausa y reduced-motion esta en journey-photos.tsx.
 *
 * No hay fechas: los lugares salen de los nombres de archivo de Cmax y los
 * premios de la bio que ya estaba, pero los años no los tenemos. El orden es
 * narrativo y no afirma una cronologia verificada.
 */
export function Founder() {
  const { founder } = cx20;

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
        <div className="max-w-3xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-brand-light">
            {founder.eyebrow}
          </p>
          <h2 className="mt-3 text-title text-white">{founder.name}</h2>
          <p className="mt-1 text-body text-background/70">{founder.role}</p>
          <p className="mt-5 text-pretty text-body text-background/80">
            {founder.bio}
          </p>
        </div>

        <div className="mt-16 max-w-3xl md:mt-24">
          <h3 className="text-balance text-title text-white">
            {founder.journeyHeading}
          </h3>
          <p className="mt-3 text-pretty text-body text-background/70">
            {founder.journeyBody}
          </p>
        </div>

        <ol className="mt-12 md:mt-16">
          {founder.stops.map((stop, i) => (
            <li
              key={stop.title}
              className="relative pb-12 pl-8 last:pb-0 md:pb-16 md:pl-14"
            >
              {/* El tramo de linea hasta la parada siguiente. En la ultima no se
                  dibuja: la ruta termina en el nodo, no en el borde del bloque. */}
              {i < founder.stops.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[7px] top-5 h-full w-px bg-background/20 md:left-[10px]"
                />
              )}
              {/* El nodo. Las paradas con testimonio van rellenas de naranja:
                  son el final del camino y se distinguen de un vistazo. */}
              <span
                aria-hidden
                className={[
                  "absolute left-0 top-3 size-4 rounded-full border-2 border-brand md:size-[22px]",
                  stop.quote ? "bg-brand" : "bg-foreground",
                ].join(" ")}
              />

              <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-10 lg:gap-14">
                <div>
                  <p className="text-body-sm font-semibold uppercase tracking-widest text-brand-light">
                    {stop.place}
                  </p>
                  <h4 className="mt-2 text-balance text-subtitle text-white">
                    {stop.title}
                  </h4>

                  {stop.body && (
                    <p className="mt-3 text-pretty text-body-sm text-background/70">
                      {stop.body}
                    </p>
                  )}

                  {stop.quote && (
                    <blockquote className="mt-4">
                      <Quote aria-hidden className="size-6 text-brand-light" />
                      <p className="mt-3 text-pretty text-body text-background/90">
                        {stop.quote.text}
                      </p>
                      <footer className="mt-4 text-body-sm">
                        <span className="font-semibold text-white">
                          {stop.quote.name}
                        </span>
                        {stop.quote.role && (
                          <span className="text-background/60">
                            {" "}
                            {stop.quote.role}
                          </span>
                        )}
                      </footer>
                    </blockquote>
                  )}
                </div>

                <JourneyPhotos photos={stop.photos} priority={i === 0} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
