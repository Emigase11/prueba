import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { content } from "@/lib/content";
import { cx20 } from "@/lib/content/cx20";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

/**
 * Base absoluta para las imagenes de OpenGraph. Sin esto Next las resuelve
 * contra localhost y la preview del link sale rota al compartirlo.
 * En Vercel, VERCEL_URL trae el dominio del deploy automaticamente.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

/**
 * Metadata por defecto del sitio. Cada pagina la sobreescribe con la suya:
 * la home fija el titulo absoluto, el Air X2 y las legales usan la plantilla
 * "%s | Cmax System".
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${content.brand.name} — Foldable housing technology`,
    template: `%s | ${content.brand.name}`,
  },
  description: cx20.hero.subheadline,
  openGraph: {
    siteName: content.brand.name,
    type: "website",
    images: [{ url: cx20.hero.image.src, width: 2048, height: 1536, alt: cx20.hero.image.alt }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        {children}
        <Toaster position="bottom-center" richColors={false} />
      </body>
    </html>
  );
}
