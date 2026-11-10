import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import heroImage from "@/assets/images/wyoming-warmth.webp";
import { site } from "@/config/site";

type PageMetadataInput = {
  /** Page title; the site name is appended. Omit for the home page. */
  title?: string;
  /** Route path, e.g. "/about". Used for the canonical URL. */
  path: string;
  description?: string;
  /** Social preview image. Defaults to the home hero photograph. */
  image?: { src: StaticImageData; alt: string };
};

const defaultImage = {
  src: heroImage,
  alt: "Warm windows light a ranch home in a snowy Wyoming-inspired landscape",
};

/** `/about` -> `/about/` to match the exported URLs (`trailingSlash: true`). */
function canonicalPath(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Per-page metadata: absolute title, description, canonical URL and Open Graph.
 * Relative URLs resolve against `metadataBase` (set in the root layout).
 */
export function pageMetadata({
  title,
  path,
  description = site.description,
  image = defaultImage,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.defaultTitle;
  const url = canonicalPath(path);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      images: [
        {
          url: image.src.src,
          width: image.src.width,
          height: image.src.height,
          alt: image.alt,
        },
      ],
    },
  };
}
