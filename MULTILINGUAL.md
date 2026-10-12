# Multilingual publishing

English remains at the existing URLs. Seven additional languages use stable prefixes and retain each article's slug. Each language covers the homepage, catalog, thirteen guides/cases, editorial page and a noindex 404 page.

| Language | URL prefix | HTML / hreflang | Core supporting search vocabulary |
| --- | --- | --- | --- |
| English | `/` | `en` | REA, Reverse Engineer Anything, tutorials, install, examples |
| 简体中文 | `/zh-cn/` | `zh-Hans` | REA、逆向工程、安装教程、使用教程、实战案例 |
| 繁體中文 | `/zh-tw/` | `zh-Hant` | REA、逆向工程、安裝教學、使用教學、實作案例 |
| 日本語 | `/ja/` | `ja` | REA、リバースエンジニアリング、使い方、インストール、チュートリアル |
| 한국어 | `/ko/` | `ko` | REA, 리버스 엔지니어링, 설치, 사용법, 튜토리얼 |
| Русский | `/ru/` | `ru` | REA, обратный инжиниринг, установка, руководство, примеры |
| Español | `/es/` | `es` | REA, ingeniería inversa, instalación, tutoriales, ejemplos |
| Français | `/fr/` | `fr` | REA, rétro-ingénierie, installation, tutoriels, exemples |

These are editorial keyword choices matched to page intent, not measured search-volume claims. REA stays the primary product keyword. Installation, first-use, browser, Electron, Android and native-analysis pages retain distinct intents. Product names and investigated functions distinguish case pages.

## Publishing model

Astro renders the English source. `scripts/localize-site.mjs` then generates real static translated HTML with parse5. Translation is completed during the build, not in a visitor's browser. A missing translation fails the build. There is no machine-translation service or API dependency at build or runtime.

- `src/i18n/source.json`: stable hash IDs, English text and page contexts.
- `src/i18n/locales/*.json`: complete reviewed translation catalogs.
- `src/i18n/paragraphs.json`: reviewed paragraph overrides where natural grammar requires reordering inline code and links.
- `scripts/i18n-core.mjs`: language definitions and runtime message inventory.
- `src/lib/i18n.ts`: interpolation for interaction messages; each page embeds only the small runtime dictionary.
- `public/i18n.css`: the language menu and multilingual typography/layout adjustments.

Visible prose, headings, metadata, breadcrumbs, accessibility labels, prompts and interactive status messages are translated. CLI commands, executable code, identifiers, version numbers, source URLs and supporting evidence/download files are preserved. Investigation prompts are localized while embedded commands and tool identifiers remain executable. Copy buttons return the displayed localized prompt.

The language menu links to the same page in the chosen language. Normal navigation and related articles remain in the current language. Visitors are not automatically redirected by browser language.

## Search implementation

- Each translated URL is self-canonical; translated pages do not canonicalize to English.
- Every indexable page lists all eight corresponding variants plus `x-default` pointing to the English equivalent.
- Localized JSON-LD uses the page language and localized article, breadcrumb and catalog URLs.
- Sitemap contains 128 indexable URLs. Eight localized 404 documents are noindex and excluded.
- Canonical host remains `https://reatool.dev`; the Cloudflare Pages origin can serve every language before domain binding.

Reference: [Google's localized page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).

## Editing and verification

When English content changes, regenerate the translation inventory and translate any added/changed hash IDs:

```sh
npm run build:english
node scripts/extract-i18n.mjs
# Update all seven locale catalogs; remove obsolete keys.
npm run check
npm run build
npm run verify:site
npm run verify:seo
npm run verify:i18n
npm run preview
```

`npm run dev` is the English authoring server. Use the built-site preview for multilingual review. `npm run build` always emits all languages and does not silently publish partial catalogs.

The multilingual checks cover catalog completeness, interpolation tokens, unchanged code blocks, matching prompt clipboard text, per-language navigation, self-canonicals, reciprocal language links and sitemap coverage. Browser checks remain necessary for long translated text, menu use and dynamic messages.
