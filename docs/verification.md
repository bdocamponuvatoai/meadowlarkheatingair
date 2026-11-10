# Migration verification

**Date:** 10 November 2026
**What was compared:** the original ChatGPT Sites build (Vinext on a local Cloudflare Workers runtime, `wrangler dev`, production build) against this Next.js 16.4.6 static export (`out/`, served by a small Node static server with directory index files and `404.html`).
**Browser:** Google Chrome 156.0.8078.80 (headless), driven by `playwright-core` 1.65. Desktop emulation, device scale factor 1, `prefers-reduced-motion: reduce`, 900 px viewport height.
**Before every capture:** all images switched to eager loading and awaited with `img.decode()`, `document.fonts.ready` awaited, network idle, two animation frames.

## Summary

| Check                                                               | Result                                                                                        |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `npm run build` / `npm run check` (typecheck, lint, Prettier)       | Pass / pass                                                                                   |
| Full-page pixel diff, 11 URLs × 6 widths (66 captures)              | **66 / 66 identical** (0 mismatched pixels, identical page heights)                           |
| Interactive-state screenshots (7 states)                            | **7 / 7 identical**                                                                           |
| Behaviour parity (20 scripted scenarios, JSON outcomes)             | **19 / 20 identical**; 1 intended difference (below)                                          |
| DOM structure and text nodes after hydration (header, main, footer) | **11 / 11 routes identical**, 2,314 element and text nodes; documented attribute changes only |
| Client-side navigation journey (26 assertions)                      | **All pass**                                                                                  |
| HTTP 4xx during navigation and prefetching (139 requests)           | **0** (apart from the deliberately requested missing page)                                    |
| Console errors or hydration warnings                                | **0**                                                                                         |

## 1. Pixel parity

URLs: `/`, `/services`, `/services/heating`, `/services/cooling`, `/services/ventilation`, `/about`, `/comfort-guide`, `/contact`, `/contact?service=cooling&property=business`, `/privacy`, and an unknown URL (404 page).
Widths: 1600, 1280, 1024, 768, 390 and 320 px, full page. Compared with `pixelmatch` (threshold 0.1).

All 66 captures are pixel-identical, so no anti-aliasing exceptions were needed.

### Problem found and fixed during verification

The first run gave 64 / 66. `/services` and `/comfort-guide` differed at 768 px (35 px and 10 px of extra or missing padding). Cropping both screenshots showed the services grid starting higher on the new site.

**Cause:** splitting the single stylesheet into partials changed the cascade. In the original file every `@media` block came after all base rules, so `@media (max-width: 900px) { .services-section { padding-block: 70px } }` beat the base rule `.services-full { padding-top: 35px }` (equal specificity, so the later rule wins). After the split, `pages/services.css` loaded after the services partial's media block, so `.services-full` won instead. `.standalone-guide` against `.guide-section` had the same problem.

**Fix:** the variant classes (`.services-full`, `.standalone-guide`) now live in the partial of the section they modify, so the original order is restored.

**Guard:** the CSS split script now lists every pair of rules whose relative order changed, that can apply at the same time and that share a specificity and a property (5,619 candidates). A browser pass then checks every page and state (including the open mobile menu and the review step) for any element that matches both selectors. Result: **0 overlapping pairs**. Re-running the same check on the old, faulty split reports exactly the two real problems, so the check is not vacuous.

## 2. Interactive states (pixel-compared)

| State                                          | Size      | Result    |
| ---------------------------------------------- | --------- | --------- |
| Mobile menu open (390 px)                      | 390×900   | identical |
| Comfort guide, "It's not cool enough" selected | 1280×738  | identical |
| Home / work toggle on "At work"                | 1168×751  | identical |
| Two FAQ answers open (mouse and keyboard)      | 1168×753  | identical |
| Enquiry review step                            | 1168×902  | identical |
| Form after "Edit details" (values retained)    | 1168×1167 | identical |
| Skip link focused                              | 1280×900  | identical |

## 3. Behaviour parity

The same scripted interactions ran on both sites, and the JSON outcomes were compared:

- **Mobile menu:** open (`aria-expanded`, label, link list), Escape (closes, focus returns to the toggle). Identical.
- **Comfort guide:** each of the four options clicked (`aria-pressed`, tag, title, text, hint, icon, preset link), and keyboard (Tab + Enter, Tab + Space). Identical.
- **Home / work toggle:** content, list, link text and preset link. Identical.
- **FAQ:** native `<details>` by click and Enter. Identical.
- **Enquiry form:**
  - Empty submit is blocked by native validation, focus goes to Name ("Please fill out this field.").
  - An invalid email is blocked, focus goes to Email.
  - A valid submit shows the review, with focus on "Ready for a closer look."
  - The review rows are identical, including the omitted Phone row and the "To discuss with Jay." fallback.
  - Download produces `meadowlark-service-enquiry.txt` with **byte-identical content** on both sites (two different enquiries tested).
  - The status message changes after download.
  - "Edit details" restores every value and focuses Name.
- **Query-string presets:** 7 combinations, including unknown values falling back to the defaults. Identical.
- **Presets carried across pages:** comfort guide → contact, "At work" → contact, heating "Talk about heating" → contact, footer "Commercial enquiries" → contact. Identical.

**Intended difference (1):** opening the mobile menu and then widening the window to desktop. The legacy site left the menu logically open (`aria-expanded="true"`) but invisible. The new site closes it when the desktop breakpoint is reached. The visible result is the same, and assistive technology no longer reports a hidden menu as expanded.

## 4. Navigation (new site)

- Header, card, breadcrumb, footer and in-page links navigate client-side. A JavaScript marker set on the home page survived the whole journey, including browser Back.
- Titles match the legacy titles on every page, and `aria-current="page"` follows the route (`/services/*` marks "Our services").
- `#welcome` scrolls to the same position as the legacy site (200 px from the top at 1280 px; the CSS combines `scroll-padding-top` and `scroll-margin-top`). "Back to top" returns to 0.
- An unknown URL returns HTTP 404 with the styled not-found page, and its button returns home.
- The mobile menu closes after navigating, including when the link is to the page already shown.
- **0** responses ≥ 400 across 139 requests (documents, scripts, images and link prefetches). Without the post-build segment-file fix (Windows), the prefetch files are written to the wrong paths. The fix moved 9 files on this build.

## 5. DOM and text nodes

For every route, the hydrated header, main and footer were serialised (tags, classes, ids, ARIA, form attributes, normalised hrefs, and **every text node separately**). The structure and all text nodes are identical apart from these deliberate changes:

- `id="menu-toggle"` was removed (only the old JavaScript used it; focus now uses a ref).
- Form inputs no longer render `value=""` (they are uncontrolled and read with `FormData`).
- The review step stays mounted with `hidden` while the form is shown, so values survive "Edit details".
- The about-page photo (the largest image on that page) gained `fetchpriority="high"`.
- Internal links carry trailing slashes (`/about/`), matching the exported folders.
- Images come from `next/image` (hashed `/_next/static/media/…` URLs, `decoding="async"`).

## 6. `<head>` comparison

| Tag                  | Legacy                           | New                                                                                                                                                        |
| -------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<title>`            | per page                         | **identical on every page**; the 404 page is now "Page not found \| Meadowlark Heating & Air" (the legacy code intended this but showed the default title) |
| description          | shared                           | identical                                                                                                                                                  |
| viewport, `lang`     | present                          | identical                                                                                                                                                  |
| robots               | none (404: `noindex`)            | `noindex, nofollow` until `SITE_INDEXABLE=true`                                                                                                            |
| canonical            | none                             | absolute, per page, from `SITE_URL`                                                                                                                        |
| Open Graph / Twitter | none                             | title, description, URL, site name, image (page hero, 1536×1024)                                                                                           |
| theme-color          | none                             | `#f8f7f2` (header background)                                                                                                                              |
| icon                 | `/favicon.svg` (icon + shortcut) | `/icon.svg` (`image/svg+xml`, `sizes="any"`), same artwork                                                                                                 |
| JSON-LD              | none                             | `HVACBusiness` on the home page: name, description, URL, Big Piney, WY, US, and service types only                                                         |

## 7. After cleanup (re-run on 11 November 2026)

**Removed at Nuvato's request:**

- the five on-photo labels: home hero "ILLUSTRATIVE WYOMING HOME", home "ILLUSTRATIVE SERVICE PHOTOGRAPHY", the home and services feature's "ILLUSTRATIVE HOME CONCEPT", the service pages' "ILLUSTRATIVE CONCEPT PHOTOGRAPHY", and the about page's "ILLUSTRATIVE WYOMING HOME";
- the footer note "Private design concept by Nuvato. Proposed branding and AI-generated illustrative photography. …".

The CSS that only styled them (`.photo-label`, `.hero-credit`, `.preview-note`) and the unused `--green` token were deleted too. The contact-page note, the form's preview notice, FAQ 5 and the Privacy & preview details page were kept, because they describe what the form actually does.

**Spacing:** the labels were absolutely positioned and took no space. The footer note's own 20 px margin (23 px under 650 px) went with it, so the footer now ends 22 px below the bottom bar. That is the footer's original `padding-bottom`, the same gap that used to follow the note. No other element relied on the note's height, so no spacing was moved.

**How it was re-verified:** your project folder was copied to a clean directory, then `npm ci`, `npm run check` and `npm run build` were run. Every suite then ran against that build, with the legacy baseline adjusted only by hiding or removing exactly the deleted elements. Any other change would still have failed.

| Check                          | Result                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| Pixel diff, 11 URLs × 6 widths | **66 / 66 identical**                                                                    |
| Interactive-state screenshots  | **7 / 7 identical**                                                                      |
| Behaviour parity               | **19 / 20**; the same single intended difference (menu closes at the desktop breakpoint) |
| DOM structure and text nodes   | **11 / 11 routes identical** (2,276 element and text nodes)                              |
| Navigation journey             | all assertions pass; **0** 4xx in 139 requests; **0** console errors                     |
| `<head>`                       | unchanged from section 6                                                                 |

## Dependency audit

- `npm audit --omit=dev`: **0 vulnerabilities** in production dependencies (`next`, `react`, `react-dom`, `server-only`).
- `npm audit` including dev dependencies: 7 moderate findings, all from one advisory, [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). It is a denial of service via crafted glob patterns in `minimatch` 10.2.6, reached only through `eslint-config-next` → `typescript-eslint` 8.72.2 (the latest release). It runs only during linting, on glob patterns from our own config, and nothing from it ships in `out/`. It was not force-fixed, because that would mean overriding a transitive dependency of the lint toolchain. Dependabot will pick up the upstream fix.

## Not covered

- Only Chrome (Chromium) was tested. Safari, Firefox and real iOS/Android devices were not. The mobile widths are desktop Chrome at narrow viewports, not device emulation.
- The legacy baseline was the local production build, not the hosted ChatGPT preview.
- Fonts are system fonts (Arial, Georgia). The pages can render differently on systems without them, exactly as the original did.
