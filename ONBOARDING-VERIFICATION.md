# Installation and first-practice checks — 2026-10-14

- Source checks, full build, site, SEO and localization checks passed: 152 pages, 144 indexable routes, 6,176 internal links/assets. Astro reports three informational CommonJS hints in the unchanged official fixture, no errors or warnings.
- Browser acceptance tested all eight languages at 1280px and 390px: Windows/unix selection; Codex, Claude Code and Cursor setup and doctor commands; displayed/copied content equality; translated analysis prompts; no page overflow.
- Browser tracker spy tested only successful clipboard writes counted; failed clipboard writes did not count; thrown tracker errors did not affect copying; case preview/filter/source were counted once; sample download intent counted; localhost actions emitted no events. Production hostnames were intercepted to serve the local build and a fake tracker, so these QA events did not reach the analytics server.
- The ZIP was extracted into a path containing spaces and `node check.cjs` passed all three assertions on macOS arm64 / Node 22.23.1. Empty data, embedded comma/quotes and a multiline title are covered.
- REA 6.4.0 static analysis of the fixture succeeded: 7 relevant files including the added check script, 5 parsed JavaScript files, 29 findings, 0 parse failures. Original six upstream files remain unchanged. This is static analysis and a formatter check, not an Electron UI/export-permissions test.
- `.github/workflows/windows-practice.yml` validates the actual downloadable ZIP on a Windows runner and previews three client setup plans without changing registrations. Full interactive installation and a restarted coding agent's live MCP connection require a real configured client; a dry-run does not prove them.

## Windows runner result

[GitHub Actions run 38519249150](https://github.com/ZooHero500/reatool/actions/runs/38519249150) passed on 2026-10-14 for `386d49d`. The Windows job extracted the actual published ZIP into a path containing spaces, ran all three CSV checks, ran REA 6.4.0 static analysis and parsed its JSON, then successfully previewed Codex, Claude Code and Cursor setup plans. This verifies Windows CLI/fixture execution, not a real client's interactive installation or live MCP connection.

## Production

Feature commit `386d49d` deployed through Cloudflare Git integration (`ce058e0e-7599-4f2e-92c0-1f7f57ba32c0`). Sixteen localized install/first-analysis pages, their three build assets and the byte-identical ZIP passed HTTP checks. Real browser clipboard copying returned the Windows/Codex command; the Umami endpoint accepted the three corresponding events with HTTP 200. The dashboard session expired, so report-level receipt remains unverified. QA traffic used `?qa=onboarding`.

## Rebuilding the kit

Run `python3 scripts/build-notes-kit.py` after updating the fixture or its reviewed translations. The deterministic ZIP includes all eight instructions, expected CSV, upstream MIT license, attribution and file hashes. Its guide copy comes from the same translation catalogs as the page. No npm install is needed to run the formatter check.
