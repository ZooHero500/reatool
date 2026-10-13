# Cloudflare Pages deployment

Deployed on 2026-10-13 using the existing authenticated Wrangler account.

- Project: `reatool`
- Environment: Production
- Production branch: `main`
- Public URL: https://reatool.pages.dev/
- Deployment URL: https://b2444c24.reatool.pages.dev/
- Deployment ID: `b2444c24-4864-44d2-9377-df8e54a48de8`
- Source commit: `052a389`
- Method: Direct Upload of `dist` using Wrangler. No Git auto-deployment was configured.
- Custom domain: not attached by this task; the owner will bind `reatool.dev`.
- Canonical and sitemap URLs remain `https://reatool.dev` as intended for the custom domain.

## Verification

Latest deployment adds the deferred analytics script from `https://analysis.zoohero.me/script.js` with website ID `8bfccc0f-352c-431f-85b9-166b4eefe796`. All 136 built HTML pages contain exactly one matching script. Astro, site, SEO and localization checks passed. All eight production homepages and their installation pages were fetched successfully and contain the correct script once. The analytics script endpoint returned HTTP 200. Dashboard event receipt has not been verified. Cloudflare confirms this deployment is Production / main.

### Previous feature verification

Latest update: the hero points to an AI-first quick-install section on every homepage. Visitors copy a localized setup prompt, send it to their coding agent, approve setup, then restart and verify. All eight live homepages contain the new section and matching copy payload. Browser checks cover the CTA anchor, successful clipboard copy, label restoration and mobile layout. Screenshot: `../reatool-quick-install-live.png`.

Cloudflare's deployment list confirms Production / main. All 145 multilingual production HTTP checks passed: 128 content routes return 200 with their localized titles, language, canonical and nine hreflang entries; eight unknown language routes return localized noindex 404 pages. Robots, sitemap, reproduction download, multilingual stylesheet and homepage assets also passed.

The prior English deployment's WebGPU and interactive labs were verified. The multilingual update preserves them, adds eight-way same-page language switching and localized UI messages. See `MULTILINGUAL-VERIFICATION.md` for browser and translation checks. Live multilingual screenshot: `../reatool-multilingual-live.png`.

## Deploy subsequent changes

From this source directory with Wrangler already authenticated:

```sh
npm run deploy
```

This command checks the source, builds all languages, verifies the site, SEO and localization, then publishes `dist` to the `reatool` project's production branch `main`. A failed step stops deployment. Wrangler must be installed and authenticated. Bind the domain from Workers & Pages → reatool → Custom domains. After binding, verify HTTPS and submit `https://reatool.dev/sitemap.xml` in Google Search Console.

The build also writes `dist/llms.txt` and `dist/llms-full.txt` from the English pages. `public/robots.txt` allows GPTBot, PerplexityBot, ClaudeBot, Google-Extended, and Bingbot, and points at the sitemap.

## Local development

Use Node.js 22.23.1 (pinned in `.node-version`; 22.23.3 also satisfies `package.json`) and npm.

```sh
npm ci
npm run dev
```

`npm run dev` serves the English source. The full multilingual site is `npm run build` followed by `npm run preview`.

## Build and verification

```sh
npm run check
npm run verify:case
npm run verify:totp
npm run verify:labs
npm run build
npm run verify:site
npm run verify:seo
npm run verify:i18n
npm run preview
```

The case check runs eight assertions against the pinned slugify package and updates `public/evidence/slugify-checks.json`. The site check verifies internal assets, links, anchors, metadata and structured data in the built HTML.

The lab check writes `public/evidence/case-lab-checks.json`: five recorded dinosaur checkpoints, 3,072 ring input combinations, 3,205 pan inputs checked with an independent BigInt rational reference, and ten percent scenarios plus invalid-input checks. These are tests of this site's teaching implementations, not fresh execution of the original binaries. The rules and checks are downloadable as two dependency-free `.mjs` files. Case content is in `src/data/cases.ts`; `CaseLab.astro`, `case-labs.ts` and `labs.css` supply the experiments. No new dependency was added.

### Connect a Git repository

Upload this source directory to a GitHub or GitLab repository, then create a **Pages** project in Cloudflare and connect it.

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Repository root (or this folder's path in a monorepo) |
| Node version | 22.23.1; `.node-version` is included |

Use a static Pages project. Do not add the Cloudflare SSR adapter or a Worker entrypoint.

### Direct upload

The delivered `reatool-cloudflare-pages.zip` contains the built site at its root. In Cloudflare, create a Pages Direct Upload project and upload this zip (or the entire `dist` folder). Do not upload the source zip as the built site.

Alternatively, with an authenticated Wrangler CLI:

```sh
npm run deploy
```

This command builds, verifies and publishes to the `reatool` project's production branch `main`.

### Attach the domain

In the Pages project's **Custom domains**, add `reatool.dev` and follow Cloudflare's DNS steps. Canonicals, sitemap and social metadata already use `https://reatool.dev`. If you also use `www`, redirect it to the apex hostname in Cloudflare. Do not change DNS from this repository.

Official deployment reference: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

## Content, evidence, and motion

- Guides are authored in `src/pages/` and `src/data/tutorials.ts`; shared layouts are in `src/layouts/`.
- The REA release shown as “Last verified” is `src/data/rea-release.ts`. Bump it only after re-checking commands and the comparison sources.
- Reading styles live in `src/styles/site.css`; the red cover, library and demo styles are in `src/styles/redesign.css`.
- The homepage leads with concrete feature investigations. Its diagrams are illustrations, not application screenshots. The URL demo remains on the slugify case page.
- Fonts are self-hosted through Fontsource; no third-party font request is needed.
- The TOTP demo uses an independently authored WebCrypto implementation with only RFC 6238's public SHA-1 test key. Tests cover 12 reference-vector results and 121 per-second comparisons with Node HMAC.
- Aegis and Notion findings are attributed to upstream reports. This site did not repeat those original application investigations. The general intermediate tutorials are workflows, not fabricated completed analyses.
- `public/evidence/` contains human-readable summaries of actual REA CLI runs, runtime assertion results, the inspected slugify source and its MIT license.
- REA analysis of slugify explicitly reports partial graph coverage. Source inspection and runtime checks are separate evidence steps.
- The Notes tutorial uses the official downloadable teaching fixture. We statically analyzed it and checked the CSV formatter; we did not launch its Electron UI.
- `public/downloads/slugify-reproduction.zip` contains a standalone reproduction kit.

Before changing tutorial versions, recheck commands against the npm release, rerun relevant examples, and update `src/data/rea-release.ts`. Repository `main` can document unreleased REA features.

## Search and sharing

Every page has a title, description, canonical URL, Open Graph tags and JSON-LD. The install and comparison pages add FAQPage entities for the questions visible on those pages. The build includes robots.txt, sitemap.xml, llms.txt, llms-full.txt, a 1200×630 social image and Cloudflare security/cache headers. No analytics or cookie banner is installed. After deployment, verify the domain in Google Search Console and submit `https://reatool.dev/sitemap.xml`.

`src/data/seo.ts` owns page titles, descriptions, guide headings, breadcrumb labels and related-guide links. Keep each page focused on one REA search intent. The shared layout emits linked publisher, website and page entities; articles use TechArticle, the catalog uses CollectionPage/ItemList, and visible breadcrumbs match BreadcrumbList. `verify:seo` checks the built metadata, graph relationships, catalog entries, FAQ visibility, crawler robots rules, llms files and sitemap coverage. See `SEO-IMPLEMENTATION.md` for the earlier verification notes. Historical notes do not replace a new check.

## Attribution and the cover visual

Independent community resource; not affiliated with morluto or the REA maintainers. Official project: https://github.com/morluto/rea and https://rea.tools/.

The site uses FireCode-inspired dark composition with an original red module-disassembly visual. Three.js WebGPURenderer is dynamically imported on the homepage only; it uses WebGPU when available and its WebGL fallback otherwise. A CSS illustration remains if renderer initialization fails. The scene pauses when hidden or offscreen, respects reduced motion and offers a pause control. No FireCode flame shader or other FireCode code is included. Three.js is MIT-licensed; its license is in the dependency package.

The GPU chunk is approximately 770 KB minified before compression and produces Vite's size advisory. It is isolated from tutorial pages. Keep this tradeoff visible when optimizing the landing page; a fast static tutorial path remains available while the visual loads.

`src/scripts/motion.ts` and `src/styles/motion.css` coordinate line-by-line hero entrances, scroll-linked cover depth, ordered viewport reveals, contextual card hovers, directional homepage navigation and article progress/current-section feedback. The GPU scene interpolates pointer movement and expands its modules as the cover scrolls out. Native scrolling is preserved; no additional animation dependency was added.

The menu, tutorial filter and OTP result use short Web Animations transitions with cancellation for repeated input. OTP animation occurs only when its code changes. Reduced-motion preferences remove CSS motion and bypass the interactive transitions; content remains visible without JavaScript. FireCode's local reference source informed timing and choreography; this implementation does not incorporate its flame shader or scroll engine.

slugify is MIT-licensed by simov and contributors; the license accompanies its inspected source. Mona Sans and IBM Plex Mono are distributed through Fontsource with their respective font licenses in the installed packages.
