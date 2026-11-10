import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/links";
import { site } from "@/config/site";

// Next.js also adds <meta name="robots" content="noindex"> to this page.
export const metadata: Metadata = {
  title: { absolute: `Page not found | ${site.name}` },
};

export default function NotFound() {
  return (
    <main id="main" className="wrap simple-page">
      <p className="eyebrow">404 / A SMALL DETOUR</p>
      <h1>
        Let’s get you
        <br />
        back to comfort.
      </h1>
      <p>That page isn’t here. You can return home or explore our services.</p>
      <ButtonLink href="/">{"Back to Meadowlark "}</ButtonLink>
    </main>
  );
}
