import { TextLink } from "@/components/ui/links";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy & Preview Details",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main" className="wrap legal-page">
      <p className="eyebrow">A LITTLE TRANSPARENCY</p>
      <h1>
        Privacy &
        <br />
        preview details.
      </h1>
      <p className="legal-intro">
        This is a private design concept for Meadowlark Heating & Air, prepared by Nuvato.
      </p>
      <h2>Your enquiry details</h2>
      <p>
        The enquiry form keeps entries in the current page’s memory. There is no form database,
        message delivery, appointment scheduling, or business notification connected to this
        preview. Refreshing or leaving the page clears entries. If you choose to download your
        enquiry, a text file containing your entries is saved on your device.
      </p>
      <h2>Hosting</h2>
      <p>
        The website host may process standard technical data to serve and secure this preview,
        including access and authentication information. No additional advertising or analytics
        scripts have been added to this project.
      </p>
      <h2>Company information</h2>
      <p>
        The business name, location, service categories, and Jay’s name were supplied for this
        design. Direct contact details, service boundaries, availability, specific equipment
        capabilities, pricing, and any business credentials must be confirmed with Meadowlark before
        a public launch.
      </p>
      <h2>Branding and photography</h2>
      <p>
        The logo and visual identity are proposed design concepts. Photography is AI-generated and
        illustrative; it does not depict Jay, actual staff, completed Meadowlark projects, or
        specific customer properties.
      </p>
      <h2>Before public launch</h2>
      <p>
        A business-approved privacy policy and verified contact details should replace these preview
        notes when live enquiry handling is connected.
      </p>
      <TextLink href="/">{"Return home "}</TextLink>
    </main>
  );
}
