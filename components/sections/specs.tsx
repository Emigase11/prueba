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
 * un valor.
 */
export function Specs() {
  const { specs } = content;

  return (
    <section id="specs" className="py-section md:py-section-lg">
      <div className="container">
        <h2 className="text-title">{specs.heading}</h2>
        <p className="mt-3 max-w-xl text-body text-muted-foreground">
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
              className="flex flex-col-reverse rounded-lg bg-brand-tint px-5 py-6"
            >
              <dt className="mt-1 text-body-sm text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-title text-brand-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 overflow-x-auto">
          <Table className="max-w-2xl">
            <TableBody>
              {specs.rows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="w-1/2 py-4 text-body-sm text-muted-foreground">
                    {row.label}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "py-4 text-body-sm font-semibold",
                      row.pending && "font-normal italic text-muted-foreground",
                    )}
                  >
                    {row.value}
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
