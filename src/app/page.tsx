import { Craft } from "@/components/home/craft";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqSection } from "@/components/sections/faq-section";
import { GuideBand } from "@/components/sections/guide-band";
import { ServicesSection } from "@/components/sections/services-section";
import { SpaceFeature } from "@/components/sections/space-feature";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <Intro />
        <ServicesSection />
        <SpaceFeature />
        <Craft />
        <GuideBand
          heading={
            <div className="section-heading">
              <div>
                <p className="eyebrow">NOT SURE WHERE TO START?</p>
                <h2>Tell us what feels off.</h2>
              </div>
              <p>
                You don’t need to speak HVAC.
                <br />
                Start with what you’re noticing.
              </p>
            </div>
          }
          footnote="A guide to your first conversation, not a diagnosis or an appointment booking."
        />
        <FaqSection />
        <ClosingCta />
      </main>
      <LocalBusinessJsonLd />
    </>
  );
}
