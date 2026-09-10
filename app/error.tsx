"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessagePage } from "@/components/sections/message-page";
import { content } from "@/lib/content";

/**
 * Frontera de error de la app. Cuando algo revienta al renderizar, Next monta
 * esto en lugar de la pagina rota, sin tirar abajo el resto de la aplicacion.
 *
 * Tiene que ser Client Component: recibe `reset`, que vuelve a intentar el
 * render sin recargar toda la pagina.
 *
 * En desarrollo Next muestra igual su superposicion con el stack, asi que esto
 * se ve tal cual en produccion, que es donde importa.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Sin esto el error desaparece: la frontera lo atrapa y nadie se entera.
    // El digest es lo que permite cruzarlo con los logs del servidor.
    console.error("Error de renderizado", error.digest ?? "", error);
  }, [error]);

  const { failure, homeLabel } = content.errorPages;

  return (
    <MessagePage
      eyebrow={content.brand.name}
      heading={failure.heading}
      body={failure.body}
      actions={
        <>
          <Button
            size="lg"
            onClick={reset}
            className="text-body font-semibold"
          >
            {failure.retryLabel}
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/60 bg-transparent text-body font-semibold text-white hover:bg-white/10 hover:text-white active:bg-white/20"
          >
            <Link href="/">{homeLabel}</Link>
          </Button>
        </>
      }
    />
  );
}
