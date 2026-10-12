# reatool.dev

An English-first, independent REA tutorial site. Built with Astro 7, TypeScript and CSS; pre-rendered static HTML for Cloudflare Pages. No server adapter, database, API key or runtime environment variables are required.

The complete site is also available in Simplified Chinese, Traditional Chinese, Japanese, Korean, Russian, Spanish and French. See `MULTILINGUAL.md` for URL prefixes, keyword targeting, translation files and review instructions.

## Pages

- `/` — red WebGPU disassembly cover, featured investigations and a live TOTP experiment
- `/tutorials/` — filterable library of thirteen guides and cases
- `/about/` — independent publisher, editorial method, evidence and scope
- `/cases/dino/` — playable speed-rule experiment with pause, jump, restart and fixed/automatic speed
- `/cases/th04/` — draggable aimed-ring diagram, bullet counts, rotation and a single-burst animation
- `/cases/dx-ball/` — screen-position/pan calculation with a user-triggered stereo tone illustration
- `/cases/calculator/` — percent-to-operand-to-result experiment with input validation
- `/install/` — REA setup with client-specific commands, verification and troubleshooting
- `/first-analysis/` — trace the official Notes sample's Electron CSV export
- `/cases/slugify/` — locally verified analysis of the published slugify 1.6.6 package
- `/cases/aegis/` — attributed upstream APK investigation plus an independently tested TOTP demo
- `/tutorials/electron-clipboard/` — follow Notion's reported clipboard path and apply the method
- `/tutorials/android-api/` — find request-building code in an APK
- `/tutorials/native-error/` — trace an error string to its guard condition
- `/tutorials/browser-export/` — observe an export action and distinguish local generation from network requests
- `/tutorials/compare-releases/` — compare two Electron artifacts and test a suspected regression
- `/404.html` — actual static 404 page, including on Cloudflare Pages

## Local development

Use Node.js 22.23.1 (pinned in `.node-version`) and npm.

```sh
npm ci
npm run dev
```

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

The new lab check writes `public/evidence/case-lab-checks.json`: five recorded dinosaur checkpoints, 3,072 ring input combinations, 3,205 pan inputs checked with an independent BigInt rational reference, and ten percent scenarios plus invalid-input checks. These are tests of this site's teaching implementations, not fresh execution of the original binaries. The rules and checks are downloadable as two dependency-free `.mjs` files. Case content is in `src/data/cases.ts`; `CaseLab.astro`, `case-labs.ts` and `labs.css` supply the experiments. No new dependency was added.

## Deploy to Cloudflare Pages

Current production deployment: **https://reatool.pages.dev/**, project `reatool`, using Direct Upload. See `DEPLOYMENT.md` for the deployment ID, live verification and repeat-deploy command. Custom-domain binding is left to the owner.

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

Alternatively, with an authenticated Wrangler CLI and your Pages project:

```sh
wrangler pages deploy dist --project-name=reatool
```

This command publishes the build. The project name must match your actual Cloudflare project.

### Attach the domain

In the Pages project's **Custom domains**, add `reatool.dev` and follow Cloudflare's DNS steps. Canonicals, sitemap and social metadata already use `https://reatool.dev`. If you also use `www`, redirect it to the apex hostname in Cloudflare.

Official deployment reference: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

## Content and evidence

- Guides are authored in `src/pages/` and `src/data/tutorials.ts`; shared layouts are in `src/layouts/`.
- Reading styles live in `src/styles/site.css`; the red cover, library and new demo styles are in `src/styles/redesign.css`.
- The homepage leads with concrete feature investigations. Its diagrams are illustrations, not application screenshots. The URL demo remains on the slugify case page.
- Fonts are self-hosted through Fontsource; no third-party font request is needed.
- The TOTP demo uses an independently authored WebCrypto implementation with only RFC 6238's public SHA-1 test key. Tests cover 12 reference-vector results and 121 per-second comparisons with Node HMAC.
- Aegis and Notion findings are attributed to upstream reports. This site did not repeat those original application investigations. The general intermediate tutorials are workflows, not fabricated completed analyses.
- `public/evidence/` contains human-readable summaries of actual REA CLI runs, runtime assertion results, the inspected slugify source and its MIT license.
- REA analysis of slugify explicitly reports partial graph coverage. Source inspection and runtime checks are separate evidence steps.
- The Notes tutorial uses the official downloadable teaching fixture. We statically analyzed it and checked the CSV formatter; we did not launch its Electron UI.
- `public/downloads/slugify-reproduction.zip` contains a standalone reproduction kit.

Before changing tutorial versions, recheck commands against the npm release, rerun relevant examples, and update review dates. Repository `main` can document unreleased REA features.

## Search and sharing

Every page has a title, description, canonical URL, Open Graph tags and JSON-LD. The build includes robots.txt, sitemap.xml, a 1200×630 social image and Cloudflare security/cache headers. No analytics or cookie banner is installed. After deployment, verify your domain in Google Search Console and submit `https://reatool.dev/sitemap.xml`.

`src/data/seo.ts` owns page titles, descriptions, guide headings, breadcrumb labels and related-guide links. Keep each page focused on one REA search intent. The shared layout emits linked publisher, website and page entities; articles use TechArticle, the catalog uses CollectionPage/ItemList, and visible breadcrumbs match BreadcrumbList. `verify:seo` checks the built metadata, graph relationships, catalog entries and sitemap coverage. See `SEO-IMPLEMENTATION.md` for verification and remaining production checks.

## Attribution

Independent community resource; not affiliated with morluto or the REA maintainers. Official project: https://github.com/morluto/rea and https://rea.tools/.

The site uses FireCode-inspired dark composition with an original red module-disassembly visual. Three.js WebGPURenderer is dynamically imported on the homepage only; it uses WebGPU when available and its WebGL fallback otherwise. A CSS illustration remains if renderer initialization fails. The scene pauses when hidden or offscreen, respects reduced motion and offers a pause control. No FireCode flame shader or other FireCode code is included. Three.js is MIT-licensed; its license is in the dependency package.

The GPU chunk is approximately 770 KB minified before compression and produces Vite's size advisory. It is isolated from tutorial pages. Keep this tradeoff visible when optimizing the landing page; a fast static tutorial path remains available while the visual loads.

## Motion system

`src/scripts/motion.ts` and `src/styles/motion.css` coordinate line-by-line hero entrances, scroll-linked cover depth, ordered viewport reveals, contextual card hovers, directional homepage navigation and article progress/current-section feedback. The GPU scene interpolates pointer movement and expands its modules as the cover scrolls out. Native scrolling is preserved; no additional animation dependency was added.

The menu, tutorial filter and OTP result use short Web Animations transitions with cancellation for repeated input. OTP animation occurs only when its code changes. Reduced-motion preferences remove CSS motion and bypass the interactive transitions; content remains visible without JavaScript. FireCode's local reference source informed timing and choreography; this implementation does not incorporate its flame shader or scroll engine.

slugify is MIT-licensed by simov and contributors; the license accompanies its inspected source. Mona Sans and IBM Plex Mono are distributed through Fontsource with their respective font licenses in the installed packages.
