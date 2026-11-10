import Image from "next/image";
import wyomingWarmth from "@/assets/images/wyoming-warmth.webp";
import { ClosingCta } from "@/components/sections/closing-cta";
import { PageHeading } from "@/components/sections/page-heading";
import { Bird } from "@/components/ui/icons";
import { TextLink } from "@/components/ui/links";
import { pageMetadata } from "@/lib/metadata";

const photoAlt = "Illustrative Wyoming ranch home in winter";

export const metadata = pageMetadata({
  title: "Meet Meadowlark",
  path: "/about",
  image: { src: wyomingWarmth, alt: photoAlt },
});

export default function AboutPage() {
  return (
    <main id="main">
      <PageHeading
        eyebrow="MEET MEADOWLARK HEATING & AIR"
        title="From here."
        emphasis="Here for your comfort."
      >
        <p>
          Based in Big Piney, Wyoming.
          <br />
          Built around the homes and businesses that make it a community.
        </p>
        <Bird />
      </PageHeading>
      <section className="about-photo">
        {/* Largest image on the page: load immediately at high priority. */}
        <Image src={wyomingWarmth} alt={photoAlt} loading="eager" fetchPriority="high" />
      </section>
      <section className="about-story wrap">
        <div>
          <p className="eyebrow">A LOCAL POINT OF CONTACT</p>
          <h2>
            Say hello to Jay.
            <br />
            Start with your space.
          </h2>
        </div>
        <div>
          <p>
            Meadowlark Heating & Air is an HVAC service business based in Big Piney. Jay is your
            point of contact for conversations about heating, ventilation, and air conditioning.
          </p>
          <p>
            From residential comfort to the needs of a local workplace, the starting point is
            simple: understand what’s happening and talk about what comes next.
          </p>
          <TextLink href="/contact">{"Prepare your first enquiry "}</TextLink>
        </div>
      </section>
      <section className="local-section wrap">
        <div className="local-badge">
          <Bird />
          <span>
            BIG PINEY
            <br />
            <strong>WYOMING</strong>
            <small>HOME BASE</small>
          </span>
        </div>
        <div>
          <p className="eyebrow">CLOSER TO HOME</p>
          <h2>
            Local roots.
            <br />
            Room to help.
          </h2>
          <p>
            Have a home or business in Big Piney or a nearby community? Include your town and ZIP
            code in your enquiry. Jay can confirm service coverage and discuss your needs.
          </p>
        </div>
      </section>
      <ClosingCta />
    </main>
  );
}
