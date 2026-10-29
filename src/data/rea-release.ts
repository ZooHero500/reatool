// Single source for the REA npm release these guides document.
// Checked on 2026-10-29 against:
// - https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0
// - https://github.com/morluto/rea/blob/rea-agents-6.8.0/CHANGELOG.md
// - https://github.com/morluto/rea/blob/rea-agents-6.8.0/docs/installation.md
// - the published npm package rea-agents@6.8.0 (engines and CLI help)
// Upstream main can be newer than this npm release. Local fixture runs
// recorded on 2026-10-12 used REA 6.4.0 and are not results for 6.8.0.
export const reaRelease = {
  version: '6.8.0',
  packageName: 'rea-agents',
  tag: 'rea-agents-6.8.0',
  releaseUrl: 'https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0',
  changelogUrl: 'https://github.com/morluto/rea/blob/rea-agents-6.8.0/CHANGELOG.md',
  publishedOn: '2026-10-25',
  lastVerifiedLabel: 'October 29, 2026',
  nodeEngines: '^22.23.4 || ^24.22.1 || >=26.12.1',
} as const;

export const lastVerifiedLine = `Last verified: ${reaRelease.lastVerifiedLabel} · REA version ${reaRelease.version}`;

export const nodeSupportProse = 'REA 6.8.0 supports Node.js 22.x at 22.23.4 or newer, 24.x at 24.22.1 or newer, and 26.12.1 or newer. Node.js 23, 25, earlier 26.x releases, and prereleases are unsupported. Upgrade Node.js before installing or updating REA; the installer does not upgrade it.';
