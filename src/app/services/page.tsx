import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHeading } from "@/components/sections/page-heading";
import { ServicesSection } from "@/components/sections/services-section";
import { SpaceFeature } from "@/components/sections/space-feature";
import { ButtonLink } from "@/components/ui/links";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Heating, Cooling & Ventilation",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHeading
        eyebrow="HEATING / COOLING / VENTILATION"
        title="Good care."
        emphasis="In every season."
      >
        <p>
          HVAC services for the way you live and work.
          <br />
          Start with your space. We’ll take it from there.
        </p>
        <ButtonLink href="/contact">{"Let’s talk comfort "}</ButtonLink>
      </PageHeading>
      <ServicesSection all />
      <SpaceFeature />
      <FaqSection />
      <ClosingCta />
    </main>
  );
}
