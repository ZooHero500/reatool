# Interactive case expansion — 2026-10-12

Four new English case guides: dinosaur acceleration, TH04 ring angles, DX-Ball stereo pan and calculator percentage behavior. The homepage now links to all four experiments; the library has 13 entries. Cloudflare Pages remains a static build.

## Sources and boundaries

REA's public evidence reports were read alongside their local reference copies. The lessons attribute upstream binary and compiler results. We did not execute the original DX-Ball/TH04/Windows binaries or redo the original dinosaur capture. The diagrams and game graphics are independently authored. TH04 mouse aiming approximates the original iatan2, and DX-Ball audio is a normalized Web Audio illustration. The calculator models a single two-operand percent sequence.

## Numeric checks

`npm run verify:labs` passed:

- Five recorded dinosaur update-count checkpoints and threshold/no-clamp behavior.
- 3,072 ring count/aim/rotation combinations checked against integer division; explicit uneven-count and wraparound vectors.
- 3,205 pan cases checked against a separate BigInt rational calculation, including negative truncation and scale inversion.
- Ten calculator operand/result scenarios, plus invalid input and operator handling.

Both the rules and executable checks can be downloaded from each case page. Test results are saved in `public/evidence/case-lab-checks.json`.

## Browser checks

Tested the built site through the in-app browser on localhost:

- Dinosaur: Play, actual SVG jump displacement and increasing speed; collision feedback; Restart; slider switches off automatic mode; enabling automatic restores 6.000.
- Calculator: 200 + 10 % = 220, intermediate 20; multiplication gives 20; division by zero displays Undefined; empty input disables execution. Also exercised addition at 390px.
- TH04: count selection updates the rendered bullet count; rotation 255; player position slider; pointer drag changes player coordinates and aim; single-ring animation.
- DX-Ball: left gives −500; inverted scale gives +500; sound button transitions to playing then completes and re-enables. Audio hardware output and subjective stereo perception were not independently measured.
- Catalog: all 13 entries; Native filter returns its four matching entries.
- At 320px, dino/TH04/DX-Ball had no document horizontal overflow; calculator checked at 390px. Desktop lab screenshots inspected.

Astro diagnostics: 30 files, 0 errors, 0 warnings, 0 hints. Static build: 16 pages. Internal link/asset/anchor/metadata verification passed. The existing homepage GPU chunk size advisory remains; this expansion adds no GPU dependency to the tutorials.

Deployment packages are refreshed after verification. No remote deployment was performed.
