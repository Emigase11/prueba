"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { content } from "@/lib/content";

/**
 * Marca un dato pendiente de confirmación y explica por qué está pendiente.
 *
 * Sin esto, un "To be confirmed" en la tabla de specs se lee como un hueco
 * en la ficha del producto. Con la nota queda claro que es un dato que
 * todavía no cerró el fabricante, no algo que se omitió.
 *
 * El tooltip va controlado a propósito: el de Radix abre con hover y con
 * foco de teclado, pero NO con tap — en mobile quedaría muerto. El onClick
 * lo alterna, así que el mismo control sirve en las tres formas de entrada.
 *
 * El TooltipProvider va acá adentro y no en el layout: el layout es un
 * Server Component y el contexto de un provider cliente puesto ahí no llega
 * a los componentes cliente que renderizan sus hijos server. El provider
 * solo coordina delays entre tooltips hermanos, así que tenerlo por
 * instancia no cambia el comportamiento.
 */
export function PendingHint() {
  const { ui } = content;
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="ml-1.5 inline-flex translate-y-px align-middle text-muted-foreground transition-colors hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Info aria-hidden className="size-3.5" />
            <span className="sr-only">{ui.pendingSpecNote}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-body-sm">
          {ui.pendingSpecNote}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
