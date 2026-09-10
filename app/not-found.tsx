import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessagePage } from "@/components/sections/message-page";
import { content } from "@/lib/content";

/**
 * 404. Sin este archivo Next sirve su pagina por defecto, en blanco y sin
 * marca, que es justo el momento en que menos conviene parecer roto.
 *
 * Los enlaces salen de siteNav, asi que si mañana se suma un producto aparece
 * aca solo.
 */
// Next ya le pone <meta name="robots" content="noindex"> a la pagina 404, asi
// que declararlo aca de nuevo solo duplica la etiqueta.
export const metadata: Metadata = {
  title: content.errorPages.notFound.heading,
};

export default function NotFound() {
  const { notFound, homeLabel } = content.errorPages;

  return (
    <MessagePage
      eyebrow={notFound.code}
      heading={notFound.heading}
      body={notFound.body}
      actions={
        <>
          <Button asChild size="lg" className="text-body font-semibold">
            <Link href="/">{homeLabel}</Link>
          </Button>
          {/* Solo las otras paginas: se descarta la home, que ya es el boton
              principal, y las anclas dentro de ella. */}
          {content.siteNav
            .filter((item) => item.href !== "/" && !item.href.startsWith("/#"))
            .map((item) => (
              <Button
                key={item.href}
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 bg-transparent text-body font-semibold text-white hover:bg-white/10 hover:text-white active:bg-white/20"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
        </>
      }
    />
  );
}
