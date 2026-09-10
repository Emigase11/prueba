import Image from "next/image";
import Link from "next/link";
import { content } from "@/lib/content";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Pantalla de una sola pieza para 404 y para errores. Comparten diseño porque
 * comparten trabajo: decirle a alguien que lo que buscaba no esta y devolverlo
 * a la pagina en un clic.
 *
 * Va oscura con la grilla tecnica, como las secciones oscuras del sitio: la
 * pagina se rompio, pero sigue siendo Cmax y no la pantalla gris de Next.
 *
 * `actions` lo pone quien la usa, porque no son las mismas: en el 404 alcanza
 * con volver, en un error primero conviene reintentar.
 */
export function MessagePage({
  eyebrow,
  heading,
  body,
  actions,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  actions: React.ReactNode;
}) {
  const { brand, contact, errorPages } = content;

  return (
    <main className="bg-tech-grid relative flex min-h-screen flex-col overflow-hidden bg-foreground text-background">
      <div
        aria-hidden
        className="glow-orb absolute -left-32 top-0 size-80 bg-brand/40"
      />

      <header className="relative">
        <div className="container flex h-16 items-center md:h-20">
          <Link href="/" aria-label={`${brand.name} — home`}>
            <Image
              src={logo}
              alt={brand.logo.alt}
              className="h-8 w-auto md:h-9"
              sizes="170px"
              priority
            />
          </Link>
        </div>
      </header>

      <div className="container relative flex flex-1 items-center py-section">
        <div className="max-w-xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-brand-light">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-balance text-display text-white">{heading}</h1>
          <p className="mt-4 text-body text-background/70">{body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>

          <p className="mt-10 text-body-sm text-background/60">
            {errorPages.contactPrefix}{" "}
            <a
              href={`mailto:${contact.email}`}
              className="font-semibold text-brand-light underline-offset-4 hover:underline"
            >
              {contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
