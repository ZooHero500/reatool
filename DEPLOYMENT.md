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
npm run check
npm run build
npm run verify:site
npm run verify:seo
npm run verify:i18n
wrangler pages deploy dist --project-name reatool --branch main
```

This final command publishes to production. Bind the domain from Workers & Pages → reatool → Custom domains. After binding, verify HTTPS and submit `https://reatool.dev/sitemap.xml` in Google Search Console.
