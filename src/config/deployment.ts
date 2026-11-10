import "server-only";

/**
 * Deployment settings, read from the environment at build time.
 * Server-only: never import this from a client component.
 *
 * SITE_URL        Public origin, e.g. https://www.example.com (no trailing slash needed).
 * SITE_INDEXABLE  "true" to allow search engines. Anything else keeps the site noindex.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && new URL(siteUrl).hostname === "localhost") {
  throw new Error(
    "SITE_INDEXABLE is true but SITE_URL is not set. Set SITE_URL to the public domain before enabling indexing.",
  );
}
