# Meadowlark Heating & Air

Marketing site for Meadowlark Heating & Air, an HVAC business in Big Piney, Wyoming. It is built with Next.js 16 (App Router) and React 19, and exported as a fully static site.

> **Status:** private preview. The site is `noindex` and its enquiry form sends nothing (visitors can only download a summary). See [Before launch](#before-launch).

## Getting started

Requires Node.js 20.9 or later (`.nvmrc` pins 24, the current LTS).

```sh
npm ci
npm run dev        # http://localhost:3000
```

Production build and local preview:

```sh
npm run build      # static export to out/
npm run preview    # serves out/ at http://localhost:3000
```

## Scripts

| Script                 | What it does                                                                      |
| ---------------------- | --------------------------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload.                                               |
| `npm run build`        | Static export to `out/`, then `postbuild` runs `scripts/fix-export-segments.mjs`. |
| `npm run preview`      | Serves `out/` with `serve@14` through `npx` (not a project dependency).           |
| `npm run lint`         | ESLint (`eslint-config-next`, Core Web Vitals and TypeScript rules).              |
| `npm run typecheck`    | Generates route types (`next typegen`), then runs `tsc --noEmit`.                 |
| `npm run format`       | Formats everything with Prettier.                                                 |
| `npm run format:check` | Checks formatting without writing.                                                |
| `npm run check`        | `typecheck` + `lint` + `format:check`. CI runs this.                              |

`scripts/fix-export-segments.mjs` works around a Next.js static-export bug on Windows: link-prefetch files are written into nested folders (`__next.about/__PAGE__.txt`) instead of dotted names (`__next.about.__PAGE__.txt`), so prefetches return 404. On other platforms the script finds nothing to move and does nothing.

## Project structure

```
src/
  app/                     routes (App Router)
    layout.tsx             root layout: <html>, header, footer, site-wide metadata
    page.tsx               /
    services/page.tsx      /services
    services/[slug]/       /services/heating | cooling | ventilation (generateStaticParams, dynamicParams = false)
    about/ comfort-guide/ contact/ privacy/
    not-found.tsx          styled 404
    icon.svg               favicon
    robots.ts sitemap.ts   generated from config and content
  components/
    layout/                header (client: mobile menu), footer
    sections/              sections shared by several pages (services grid, FAQ, closing CTA, comfort guide, …)
    home/ services/ comfort-guide/ contact/   page-specific sections
    ui/                    icons, SmartLink, ButtonLink / TextLink, Brand, LineList
    seo/                   JSON-LD
  config/
    site.ts                business details and navigation (safe for client code)
    deployment.ts          SITE_URL / SITE_INDEXABLE (server-only)
  content/                 typed copy: services, FAQs, comfort guide, enquiry options
  lib/                     framework-free helpers: page metadata, enquiry parsing and text export
  styles/                  globals.css imports ordered partials (base, components, layout, sections, pages)
  assets/images/           photographs (static imports via next/image)
scripts/                   fix-export-segments.mjs
docs/                      verification.md (migration parity results), content-provenance.md
```

## Conventions

- **Server Components by default.** Client components are only used for real interactivity: the header menu, the comfort guide, the home/work toggle and the enquiry form.
- **Links:** use `SmartLink` (or `ButtonLink` / `TextLink`). Paths starting with `/` use `next/link`; `#`, `tel:`, `mailto:` and external URLs render a plain `<a>`.
- **Copy lives in `src/content/`** and business facts in `src/config/site.ts`. Only add facts the business has confirmed (see `docs/content-provenance.md`).
- **Text and arrows:** pass link text as one string with its trailing space, e.g. `<TextLink href="/about">{"Meet Meadowlark "}</TextLink>`. Separate text nodes can shape slightly differently in the browser.
- **CSS:** plain global CSS, split into partials. **The import order in `src/styles/globals.css` matters**, because it reproduces the original cascade. Put a rule in the partial that owns its selector, and keep variant classes (for example `.services-full`) in the same partial as the section they modify. `base/reset.css` (the vendored Tailwind preflight) must stay inside `@layer base`.
- **Fonts:** system stacks via `--font-sans` and `--font-serif` in `base/tokens.css`. There are no web fonts.
- **Images:** `next/image` with static imports. The page's largest image gets `loading="eager"` and `fetchPriority="high"`.
- **Metadata:** every page exports `pageMetadata({ title, path, image? })`, which sets the absolute title, canonical URL and Open Graph image.

## Routes

| Route                                                                | Page                                                       |
| -------------------------------------------------------------------- | ---------------------------------------------------------- |
| `/`                                                                  | Home                                                       |
| `/services/`                                                         | Services overview                                          |
| `/services/heating/`, `/services/cooling/`, `/services/ventilation/` | Service pages                                              |
| `/about/`                                                            | Meet Meadowlark                                            |
| `/comfort-guide/`                                                    | Interactive concern selector                               |
| `/contact/`                                                          | Enquiry form; accepts `?service=` and `?property=business` |
| `/privacy/`                                                          | Privacy & preview details                                  |
| `/robots.txt`, `/sitemap.xml`                                        | Generated at build time                                    |
| anything else                                                        | 404 page (`404.html`)                                      |

`?service=` accepts `heating`, `cooling`, `ventilation`, `system-options` or `not-sure`. Unknown values fall back to "Not sure yet".

## Configuration

Set these in the hosting provider's environment settings (or `.env.local` for local builds; see `.env.example`). They are read at **build** time.

| Variable         | Default                                                                | Effect                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Origin used for canonical URLs, Open Graph, JSON-LD, `robots.txt` and `sitemap.xml`. A trailing slash is stripped.                            |
| `SITE_INDEXABLE` | `false`                                                                | `true` allows search engines (robots meta, `robots.txt`, sitemap reference). The build **fails** if this is `true` while `SITE_URL` is unset. |

While `SITE_INDEXABLE` is not `true`, every page has `<meta name="robots" content="noindex, nofollow">` and `robots.txt` disallows everything.

## Before launch

Only the business owner can confirm these:

- [ ] Owner approves the site, the copy and the branding (the logo and identity are proposals).
- [ ] Verified phone and email, and a real delivery channel for enquiries. The form currently only downloads a text file. Then update the contact page, the form notice, FAQ 5 and the privacy page.
- [ ] Service area, availability, equipment scope and any credentials confirmed. Add only what is confirmed.
- [ ] A business-approved privacy policy replaces the "Privacy & preview details" page.
- [ ] Photography approved, or replaced with real photos. The current images are AI-generated and disclosed on the privacy page.
- [ ] Custom domain connected, `SITE_URL` set to it, then `SITE_INDEXABLE=true` and a redeploy.
- [ ] Lighthouse run on the live domain, and `sitemap.xml` submitted in Google Search Console.

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main` and on every pull request. It uses Node from `.nvmrc` and runs `npm ci`, `npm run check` and `npm run build`, then uploads `out/` as an artifact. Dependabot (`.github/dependabot.yml`) opens weekly npm updates (Next, React and their types grouped together) and monthly GitHub Actions updates.

## Hosting

The build is plain static files in `out/`, so any static host works. On Vercel, import the repository with the **Next.js** framework preset. The static export is detected automatically and served from `out/`.

`vercel.json` adds security headers to every response: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy` (camera, microphone, geolocation and topics off) and `Strict-Transport-Security`. A Content-Security-Policy is intentionally not set, because Next.js uses inline scripts and a CSP would need to be tested against them first.

### Deployment

- **Preview:** _not deployed yet_. Set `SITE_INDEXABLE=false`.
- **Production:** set `SITE_URL` to the real domain. Turn indexing on only after the owner approves.
