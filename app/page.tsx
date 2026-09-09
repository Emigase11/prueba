import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/site-header";
import { Cx20Hero } from "@/components/cx20/hero";
import { ProductSwitch } from "@/components/cx20/product-switch";
import { Facts } from "@/components/cx20/facts";
import { Steps } from "@/components/sections/steps";
import { Interior } from "@/components/cx20/interior";
import { Uses } from "@/components/cx20/uses";
import { Founder } from "@/components/cx20/founder";
import { Impact } from "@/components/sections/impact";
import { Glamp } from "@/components/cx20/glamp";
import { PreorderForm } from "@/components/cx20/preorder-form";
import { Press } from "@/components/sections/press";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { StickyBuyBar } from "@/components/sections/sticky-buy-bar";
import { BackToTop } from "@/components/fx/back-to-top";
import { cx20 } from "@/lib/content/cx20";

export const metadata: Metadata = {
  title: { absolute: "Cmax System — Foldable housing technology" },
  description: cx20.hero.subheadline,
  openGraph: {
    title: "Cmax System — Foldable housing technology",
    description: cx20.hero.subheadline,
    type: "website",
    images: [
      { url: cx20.hero.image.src, width: 2048, height: 1536, alt: cx20.hero.image.alt },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cmax System — Foldable housing technology",
    description: cx20.hero.subheadline,
    images: [cx20.hero.image.src],
  },
};

/**
 * Home: Cmax System y la linea CX20. El hero muestra los dos productos —el
 * CX20 como principal y el Air X2 como lanzamiento— y desde ahi se accede a
 * la landing del X2 (hero, seccion de productos, menu y footer). Las
 * secciones compartidas reciben el contenido del CX20 por props.
 */
export default function HomePage() {
  return (
    <>
      <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 z-[60] h-1 bg-brand" />
      <SiteHeader nav={cx20.nav} cta={cx20.stickyCta.cta} priceLine={null} />
      <main className="pb-24 md:pb-0">
        <Cx20Hero />
        <ProductSwitch />
        <Facts />
        <Steps steps={cx20.steps} />
        <Interior />
        <Uses />
        <Founder />
        <Impact impact={cx20.impact} />
        <Glamp />
        <PreorderForm />
        <Press press={cx20.press} />
        <Faq faq={cx20.faq} />
      </main>
      <Footer />
      <StickyBuyBar
        eyebrow={cx20.stickyCta.eyebrow}
        headline={cx20.stickyCta.headline}
        cta={cx20.stickyCta.cta}
        hideWhenVisible="pre-order"
      />
      <BackToTop />
    </>
  );
}
