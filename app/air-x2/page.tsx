import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Steps } from "@/components/sections/steps";
import { VideoShowcase } from "@/components/sections/video-showcase";
import { Pricing } from "@/components/sections/pricing";
import { Timeline } from "@/components/sections/timeline";
import { UseCases } from "@/components/sections/use-cases";
import { Tech } from "@/components/sections/tech";
import { Included } from "@/components/sections/included";
import { Specs } from "@/components/sections/specs";
import { EmailCapture } from "@/components/sections/email-capture";
import { Press } from "@/components/sections/press";
import { Impact } from "@/components/sections/impact";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { StickyBuyBar } from "@/components/sections/sticky-buy-bar";
import { BackToTop } from "@/components/fx/back-to-top";
import { content } from "@/lib/content";

const title = `${content.brand.productName} — Inflatable AeroCabin`;

export const metadata: Metadata = {
  title,
  description: content.hero.subheadline,
  openGraph: {
    title: `${title} | ${content.brand.name}`,
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
    title: `${title} | ${content.brand.name}`,
    description: content.hero.subheadline,
    images: [content.hero.image.src],
  },
};

/** Landing del Cmax Air X2. Las secciones compartidas usan su contenido por defecto. */
export default function AirX2Page() {
  return (
    <>
      <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 z-[60] h-1 bg-brand" />
      <SiteHeader />
      {/* pb-24 en mobile: deja aire para que StickyBuyBar no tape el final. */}
      <main className="pb-24 md:pb-0">
        <Hero />
        <Steps />
        <VideoShowcase />
        <Pricing />
        <Timeline />
        <UseCases />
        <Tech />
        <Included />
        <Specs />
        <EmailCapture />
        <Press />
        <Impact />
        <Faq />
      </main>
      <Footer />
      <StickyBuyBar />
      <BackToTop />
    </>
  );
}
