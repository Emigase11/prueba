import { StatValue } from "@/components/fx/stat-value";
import { PendingHint } from "@/components/fx/pending-hint";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

/**
 * Specs en tabla de dos columnas. Las filas marcadas `pending` son datos que
 * el cliente todavía no confirmó: se muestran atenuadas en vez de inventar
 * un valor, con un tooltip que explica por qué faltan.
 *
 * Sección oscura. Ojo con dos cosas al tocar estilos acá:
 *  - Los tokens son los de fondo oscuro (text-background/*, brand-light),
 *    no los de fondo claro (text-muted-foreground, brand-ink).
 *  - TableRow de shadcn trae `border-b` y `hover:bg-muted/50`, ambos grises
 *    para fondo claro: hay que pisarlos o los bordes desaparecen y el hover
 *    prende un bloque gris claro sobre el negro.
 */
export function Specs() {
  const { specs } = content;

  return (
    <section
      id="specs"
      className="bg-tech-grid relative overflow-hidden bg-foreground py-section text-background md:py-section-lg"
    >
      <div
        aria-hidden
        className="glow-orb absolute -left-28 top-1/4 size-72 bg-brand/40"
      />

      <div className="container relative">
        <h2 className="text-title">{specs.heading}</h2>
        <p className="mt-3 max-w-xl text-body text-background/70">
          {specs.subheading}
        </p>

        {/* Los cuatro numeros que la gente busca primero, antes de la tabla. */}
        <dl className="mt-8 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4">
          {specs.highlights.map((item) => (
            // col-reverse: en el DOM va dt (etiqueta) y despues dd (valor),
            // que es el orden que anuncia un lector de pantalla; visualmente
            // el numero queda arriba. Sin dt oculto, asi no se repite.
            <div
              key={item.label}
              className="flex flex-col-reverse rounded-lg border border-background/10 bg-background/5 px-5 py-6"
            >
              <dt className="mt-1 text-body-sm text-background/60">
                {item.label}
              </dt>
              <dd className="text-title text-brand-light">
                <StatValue text={item.value} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 overflow-x-auto">
          <Table className="max-w-2xl">
            <TableBody>
              {specs.rows.map((row) => (
                <TableRow
                  key={row.label}
                  className="border-background/15 hover:bg-background/5"
                >
                  <TableCell className="w-1/2 py-4 text-body-sm text-background/60">
                    {row.label}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "py-4 text-body-sm font-semibold",
                      row.pending && "font-normal italic text-background/50",
                    )}
                  >
                    {row.value}
                    {row.pending && <PendingHint />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
