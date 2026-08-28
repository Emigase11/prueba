import { Hero } from "@/components/sections/hero";
import { Steps } from "@/components/sections/steps";
import { Pricing } from "@/components/sections/pricing";
import { UseCases } from "@/components/sections/use-cases";
import { Tech } from "@/components/sections/tech";
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
      {/* pb-24 en mobile: deja aire para que StickyBuyBar no tape el final. */}
      <main className="pb-24 md:pb-0">
        <Hero />
        <Steps />
        <Pricing />
        <UseCases />
        <Tech />
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
