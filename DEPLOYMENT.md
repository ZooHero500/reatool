# Cloudflare Pages deployment

Deployed on 2026-10-12 using the existing authenticated Wrangler account.

- Project: `reatool`
- Environment: Production
- Production branch: `main`
- Public URL: https://reatool.pages.dev/
- Deployment URL: https://9fb95f9c.reatool.pages.dev/
- Deployment ID: `9fb95f9c-282d-4209-b15a-e029d5af7ee7`
- Method: Direct Upload of `dist` using Wrangler. No Git auto-deployment was configured.
- Custom domain: not attached by this task; the owner will bind `reatool.dev`.
- Canonical and sitemap URLs remain `https://reatool.dev` as intended for the custom domain.

## Verification

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
