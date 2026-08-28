import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { content } from "@/lib/content";

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

const title = `${content.brand.productName} — Inflatable AeroCabin | ${content.brand.name}`;

/**
 * Base absoluta para las imágenes de OpenGraph. Sin esto Next las resuelve
 * contra localhost y la preview del link sale rota al compartirlo.
 * En Vercel, VERCEL_URL trae el dominio del deploy automáticamente.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: content.hero.subheadline,
  // OpenGraph: al compartir el link en WhatsApp/Slack tiene que mostrar la
  // foto del producto, no una tarjeta vacía.
  openGraph: {
    title,
    description: content.hero.subheadline,
    type: "website",
    images: [
      {
        url: content.hero.image.src,
        width: 1536,
        height: 1024,
        alt: content.hero.image.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: content.hero.subheadline,
    images: [content.hero.image.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
