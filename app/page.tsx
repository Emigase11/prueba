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

export default function Home() {
  return (
    <>
      {/* Barra de progreso de lectura: CSS puro con animation-timeline.
          Sin soporte del navegador queda en scaleX(0), invisible. */}
      <div
        aria-hidden
        className="scroll-progress fixed inset-x-0 top-0 z-[60] h-1 bg-brand"
      />
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
    </>
  );
}
