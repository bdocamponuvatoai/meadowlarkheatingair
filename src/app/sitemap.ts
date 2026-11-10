import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/deployment";
import { services } from "@/content/services";

export const dynamic = "force-static";

const pages = ["/", "/services/", "/about/", "/comfort-guide/", "/contact/", "/privacy/"];

/** Every exported page, built from the same content data as the routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = services.map((s) => `/services/${s.slug}/`);
  return [...pages, ...servicePages].map((path) => ({ url: `${siteUrl}${path}` }));
}
