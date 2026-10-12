# Multilingual verification — 2026-10-12

## Coverage and review

- English plus Simplified Chinese, Traditional Chinese, Japanese, Korean, Russian, Spanish and French.
- Each translated catalog contains all 1,076 source entries, including the new quick-install section. No English prose fallback is used.
- 128 indexable content pages, including 104 article pages; eight additional noindex 404 documents.
- Language agents translated and reviewed their catalogs. The integrating agent reviewed all localized page titles, representative body text, installation steps, numerical claims and terminology. This is AI-assisted editorial review, not certification by professional human translators.
- Traditional Chinese terminology was polished separately. Japanese paragraphs with inline code were reordered where needed; Russian and Korean inline fragment joins were corrected. Numeric grouping was adjusted for French, Russian and Spanish without changing numerical values.
- REA remains the main keyword. Supporting vocabulary is localized by page intent; see `MULTILINGUAL.md`. No search-volume or ranking result is claimed.

## Automated checks

- Astro check: 40 files, zero errors, warnings or hints.
- Site check: 136 HTML pages and 4,672 internal links/assets.
- SEO check: unique REA titles/descriptions, self-canonicals, matching breadcrumbs, 104 article entities, localized catalogs and complete sitemap.
- Localization check: complete catalogs, unchanged executable and inline code, matching displayed/copied prompts, language-preserving internal links and all eight reciprocal hreflang variants plus English x-default.
- Existing executable examples: 8/8 slugify checks; 12 RFC TOTP checks plus 121 per-second comparisons and boundary/invalid-input checks.

## Browser checks

- All eight homepages at a 320 px viewport: no document-level horizontal overflow and eight language options.
- French installation page at 390 px; Russian and Korean installation pages at 320 px: text and controls fit the viewport.
- Switching languages on an installation page retains that subpage.
- Simplified Chinese and French investigation prompts: clipboard matches displayed localized text.
- Chinese Codex selection: executable command remains `npx rea-agents@latest setup --client codex`.
- Spanish catalog: filtering JavaScript changes the count to `1 guía`.
- Japanese TOTP: switching 59 → 60 seconds changes `287082` → `359152`, with Japanese status text.
- Korean calculator: `%` converts 10 to 20; `=` produces 220; step labels and status text are localized.
- Browser warning/error log check during the final interaction audit: no entries.

The existing WebGPU bundle-size build warning remains. These checks are not a Core Web Vitals benchmark or a test on every physical device/browser.

## Published verification

Production deployment `9fb95f9c-282d-4209-b15a-e029d5af7ee7` is active on https://reatool.pages.dev/. All eight homepages include the localized quick-install section and matching prompt payload. Browser checks also confirmed the setup CTA, clipboard operation, restored button label and no horizontal overflow at a 390 px viewport in all eight languages. Mobile layouts put the prompt before the step list. The custom domain was not changed.
