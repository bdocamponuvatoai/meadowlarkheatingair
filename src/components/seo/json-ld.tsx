import { site } from "@/config/site";
import { siteUrl } from "@/config/deployment";
import { services } from "@/content/services";

/** Serialises JSON for a <script> tag; escaping `<` prevents `</script>` breakouts. */
function toScriptJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * LocalBusiness structured data. Only confirmed facts: no phone, street
 * address, hours, price range or ratings until the business supplies them.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: site.name,
    description: site.description,
    url: `${siteUrl}/`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.regionCode,
      addressCountry: site.countryCode,
    },
    areaServed: { "@type": "City", name: `${site.locality}, ${site.region}` },
    knowsAbout: services.map((s) => s.title),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toScriptJson(data) }} />
  );
}
