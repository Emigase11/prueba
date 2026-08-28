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

        <div className="mt-8 overflow-x-auto md:mt-12">
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
