import { NextSteps } from "@/components/comfort-guide/next-steps";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqSection } from "@/components/sections/faq-section";
import { GuideBand } from "@/components/sections/guide-band";
import { PageHeading } from "@/components/sections/page-heading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Your Comfort Guide",
  path: "/comfort-guide",
});

export default function ComfortGuidePage() {
  return (
    <main id="main">
      <PageHeading
        eyebrow="A GOOD PLACE TO BEGIN"
        title="You know your space."
        emphasis="Start with what you feel."
      >
        <p>
          No technical vocabulary needed. Choose the concern
          <br />
          that sounds closest to yours.
        </p>
      </PageHeading>
      <GuideBand
        standalone
        footnote="This guide helps organize your enquiry. It does not diagnose equipment or confirm service availability."
      />
      <NextSteps />
      <FaqSection />
      <ClosingCta />
    </main>
  );
}
