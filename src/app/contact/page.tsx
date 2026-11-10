import { Suspense } from "react";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { PresetEnquiryForm } from "@/components/contact/preset-enquiry-form";
import { Bird } from "@/components/ui/icons";
import { TextLink } from "@/components/ui/links";
import { defaultPreset } from "@/content/enquiry";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Let’s Talk Comfort",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main">
      <section className="contact-layout wrap">
        <aside className="contact-aside">
          <p className="eyebrow">LET’S TALK COMFORT</p>
          <h1>
            A good place
            <br />
            <em>to start.</em>
          </h1>
          <p>Tell us a little about your space and what’s on your mind.</p>
          <div className="contact-person">
            <Bird />
            <div>
              <strong>Jay at Meadowlark</strong>
              <span>Heating & Air · Big Piney, Wyoming</span>
            </div>
          </div>
          <div className="contact-preview">
            <h2>A note before you begin</h2>
            <p>
              Direct phone and email details are being confirmed. For now, you can prepare a service
              enquiry and keep a copy for your conversation with Jay.
            </p>
            <p>
              Availability, pricing, and service coverage are confirmed directly. This preview is
              not monitored for urgent requests.
            </p>
          </div>
          <TextLink href="/comfort-guide">{"Not sure where to start? "}</TextLink>
        </aside>
        <Suspense fallback={<EnquiryForm preset={defaultPreset} />}>
          <PresetEnquiryForm />
        </Suspense>
      </section>
    </main>
  );
}
