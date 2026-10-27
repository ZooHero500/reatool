# Cloudflare Pages deployment

Latest feature deployment verified on 2026-10-27 via Cloudflare Pages Git integration.

- Project: `reatool`
- Environment: Production
- Production branch: `main`
- Public URL: https://reatool.pages.dev/
- Deployment URL: https://17003367.reatool.pages.dev/
- Deployment ID: `17003367-c1f8-438f-a17d-5bccece94791`
- Feature source commit: `2300dda` (`feat(onboarding): 优化首次使用入口并同步八语言引导`)
- Method: Git integration with `ZooHero500/reatool`; pushing `main` triggers production deployment. Wrangler Direct Upload remains a manual fallback.
- Custom domain: `https://reatool.dev/` is attached and serves the deployed site. No domain or DNS settings were changed by this task.
- Canonical and sitemap URLs remain `https://reatool.dev` as intended for the custom domain.

## Verification

The 2026-10-27 update sends the homepage's secondary hero button directly to the localized first-analysis guide. The guide now opens with separate installation/ready-to-practice paths and a five-step investigation overview. All eight languages are synchronized; existing URLs, page titles, H1s, descriptions, canonical URLs and hreflang sets remain unchanged. The five required checks passed: 152 pages, 144 indexable routes and 6,224 internal links/assets. Browser checks covered eight languages at 1280px and 320px, real clipboard equality and localized success feedback, keyboard navigation, and same-page language switching. See `ONBOARDING-VERIFICATION.md`.

GitHub's Cloudflare Pages check reports `completed / success` for `2300dda`; Wrangler confirms Production / main with deployment `17003367-c1f8-438f-a17d-5bccece94791`. All 24 custom-domain homepage/install/first-analysis pages match the local build for metadata, new sections, hero copy, all links and every code/prompt block. Seven build assets match byte-for-byte, and the practice ZIP is unchanged. A real browser on the production deployment's Pages URL verified the Japanese homepage → tutorial → installation journey, analysis-prompt anchor and actual clipboard contents with localized feedback. Browser interactions used the Pages URL, where the existing hostname allowlist prevents QA analytics events; the custom domain was verified by HTTP. The following documentation commit records these checks without changing built pages.

### Previous feature verification — 2026-10-19

The 2026-10-19 update links setup copying and the connection check to the localized first exercise, adds three exercise shortcuts and records the entry point with `practice_start`. All eight language catalogs are complete. `check`, `build`, `verify:site`, `verify:seo` and `verify:i18n` passed: 152 pages, 144 indexable routes and 6,216 internal links/assets. Browser checks covered all eight languages at desktop and mobile widths, with additional real-clipboard, three-client/two-shell, download and language-switch tests in English and Spanish. See `ONBOARDING-VERIFICATION.md`.

GitHub's Cloudflare Pages check reports `completed / success` for `afc0e59`; the production deployment is `5e7f44b3-e326-4dae-bf3e-d8775e787300`. All 24 live homepage/install/first-analysis routes have the expected metadata, alternates and new navigation. Their seven build assets return 200, and the practice ZIP is byte-identical to the local archive. A fresh browser context verified the English and Spanish production journey: copy the Windows/Codex command, follow the first-exercise CTA, download the ZIP and copy the localized analysis prompt. Analytics requests were blocked during this production QA; new event payloads were validated with a local tracker spy, not dashboard receipt.

Raw HTML comparison also exposed Cloudflare email obfuscation rewriting `rea-agents@6.4.0` inside code blocks. CodeBlock now uses Cloudflare's documented `email_off` comments so commands remain readable without its decoding script. This is a local HTML exception; no Cloudflare zone or DNS setting was changed. Reference: https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/#prevent-cloudflare-from-obfuscating-email

The follow-up fix `4df5a8b` passed all five required checks and Cloudflare's `completed / success` deployment check (`458f9171-7cdf-46fe-aead-c8c34d9b7133`). All 24 live pages match the local HTML after normalizing Cloudflare's injected analytics script and consumed `email_off` comments; seven build assets and the ZIP pass again. With JavaScript disabled, all eight live first-analysis pages display the full pinned Windows command and contain no obfuscated email element. The following documentation commit records this final verification without changing built pages.

### Previous feature verification — 2026-10-14

The feature deployment adds key-action tracking, Windows PowerShell/client-specific setup commands, and a downloadable first-practice kit with eight-language instructions. `check`, `build`, `verify:site`, `verify:seo` and `verify:i18n` passed: 152 localized pages, 144 indexable URLs and 6,176 internal links/assets. Browser checks cover all eight languages, three client choices, clipboard success/failure, tracker failure, narrow screens and same-page language switching. See `ONBOARDING-VERIFICATION.md` and `ANALYTICS.md`. Windows Actions run [38519249150](https://github.com/ZooHero500/reatool/actions/runs/38519249150) also passed the packaged exercise, REA static analysis and three client setup previews.

All 16 live installation/first-analysis pages match local metadata, contain the new controls/download and nine alternate-language links. All three referenced build assets return 200; the live ZIP is byte-identical to the checked local archive. A real production browser copied the correct Windows/Codex setup command; `os_select`, `client_select` and `copy_success` requests each returned HTTP 200 from Umami. This one QA visit used `?qa=onboarding`. Dashboard receipt could not be checked: the existing Umami login expired and refreshing redirected to login. This does not establish report-level receipt.

Cloudflare confirms Production / main for feature commit `386d49d`, deployment `ce058e0e-7599-4f2e-92c0-1f7f57ba32c0`. The following documentation commit records live verification without changing built pages.

### Previous feature verification

The 2026-10-13 analytics deployment added the deferred script from `https://analysis.zoohero.me/script.js` with website ID `8bfccc0f-352c-431f-85b9-166b4eefe796`. At that time, all 136 built HTML pages contained exactly one matching script, the script endpoint returned HTTP 200, and dashboard event receipt was not verified.

Latest update: the hero points to an AI-first quick-install section on every homepage. Visitors copy a localized setup prompt, send it to their coding agent, approve setup, then restart and verify. All eight live homepages contain the new section and matching copy payload. Browser checks cover the CTA anchor, successful clipboard copy, label restoration and mobile layout. Screenshot: `../reatool-quick-install-live.png`.

Cloudflare's deployment list confirms Production / main. All 145 multilingual production HTTP checks passed: 128 content routes return 200 with their localized titles, language, canonical and nine hreflang entries; eight unknown language routes return localized noindex 404 pages. Robots, sitemap, reproduction download, multilingual stylesheet and homepage assets also passed.

The prior English deployment's WebGPU and interactive labs were verified. The multilingual update preserves them, adds eight-way same-page language switching and localized UI messages. See `MULTILINGUAL-VERIFICATION.md` for browser and translation checks. Live multilingual screenshot: `../reatool-multilingual-live.png`.

## Deploy subsequent changes

Run the required source, build, site, SEO and localization checks, then commit the scoped changes and push `main` to GitHub. Cloudflare Pages automatically builds and deploys the commit. Confirm the matching production deployment and verify the live pages before reporting success.

For a manual fallback, with Wrangler already authenticated:

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

Every page has a title, description, canonical URL, Open Graph tags and JSON-LD. The install and comparison pages add FAQPage entities for the questions visible on those pages. The build includes robots.txt, sitemap.xml, llms.txt, llms-full.txt, a 1200×630 social image and Cloudflare security/cache headers. Umami records pageviews and key actions on reatool.dev; see ANALYTICS.md for event definitions. No cookie banner is installed. After deployment, verify the domain in Google Search Console and submit `https://reatool.dev/sitemap.xml`.

`src/data/seo.ts` owns page titles, descriptions, guide headings, breadcrumb labels and related-guide links. Keep each page focused on one REA search intent. The shared layout emits linked publisher, website and page entities; articles use TechArticle, the catalog uses CollectionPage/ItemList, and visible breadcrumbs match BreadcrumbList. `verify:seo` checks the built metadata, graph relationships, catalog entries, FAQ visibility, crawler robots rules, llms files and sitemap coverage. See `SEO-IMPLEMENTATION.md` for the earlier verification notes. Historical notes do not replace a new check.

## Attribution and the cover visual

Independent community resource; not affiliated with morluto or the REA maintainers. Official project: https://github.com/morluto/rea and https://rea.tools/.

The site uses FireCode-inspired dark composition with an original red module-disassembly visual. Three.js WebGPURenderer is dynamically imported on the homepage only; it uses WebGPU when available and its WebGL fallback otherwise. A CSS illustration remains if renderer initialization fails. The scene pauses when hidden or offscreen, respects reduced motion and offers a pause control. No FireCode flame shader or other FireCode code is included. Three.js is MIT-licensed; its license is in the dependency package.

The GPU chunk is approximately 770 KB minified before compression and produces Vite's size advisory. It is isolated from tutorial pages. Keep this tradeoff visible when optimizing the landing page; a fast static tutorial path remains available while the visual loads.

`src/scripts/motion.ts` and `src/styles/motion.css` coordinate line-by-line hero entrances, scroll-linked cover depth, ordered viewport reveals, contextual card hovers, directional homepage navigation and article progress/current-section feedback. The GPU scene interpolates pointer movement and expands its modules as the cover scrolls out. Native scrolling is preserved; no additional animation dependency was added.

The menu, tutorial filter and OTP result use short Web Animations transitions with cancellation for repeated input. OTP animation occurs only when its code changes. Reduced-motion preferences remove CSS motion and bypass the interactive transitions; content remains visible without JavaScript. FireCode's local reference source informed timing and choreography; this implementation does not incorporate its flame shader or scroll engine.

slugify is MIT-licensed by simov and contributors; the license accompanies its inspected source. Mona Sans and IBM Plex Mono are distributed through Fontsource with their respective font licenses in the installed packages.
