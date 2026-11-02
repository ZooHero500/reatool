// Single source for the REA npm release these guides document.
// Checked on 2026-11-02 against:
// - https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0 (published 2026-10-25; no newer GitHub release)
// - https://github.com/morluto/rea/blob/rea-agents-6.8.0/CHANGELOG.md
// - https://github.com/morluto/rea/blob/rea-agents-6.8.0/docs/installation.md
// - https://github.com/morluto/rea/blob/rea-agents-6.8.0/docs/kuna-provider.md
// - the published npm package rea-agents@6.8.0 (dist-tag latest, engines, and CLI help)
// - main at 8250bf2320ea57aab4e664db4b4d44b8abd2004e, whose changelog still starts at 6.8.0
// Upstream main can describe behavior this npm release does not ship. Local fixture runs
// recorded on 2026-10-12 used REA 6.4.0 and are not results for 6.8.0.
export const reaRelease = {
  version: '6.8.0',
  packageName: 'rea-agents',
  tag: 'rea-agents-6.8.0',
  releaseUrl: 'https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0',
  changelogUrl: 'https://github.com/morluto/rea/blob/rea-agents-6.8.0/CHANGELOG.md',
  publishedOn: '2026-10-25',
  lastVerifiedLabel: 'November 2, 2026',
  nodeEngines: '^22.23.4 || ^24.22.1 || >=26.12.1',
  mainSha: '8250bf2320ea57aab4e664db4b4d44b8abd2004e',
  mainCommitUrl: 'https://github.com/morluto/rea/commit/8250bf2320ea57aab4e664db4b4d44b8abd2004e',
} as const;

export const lastVerifiedLine = `Last verified: ${reaRelease.lastVerifiedLabel} · REA version ${reaRelease.version}`;

export const nodeSupportProse = 'REA 6.8.0 supports Node.js 22.x at 22.23.4 or newer, 24.x at 24.22.1 or newer, and 26.12.1 or newer. Node.js 23, 25, earlier 26.x releases, and prereleases are unsupported. Upgrade Node.js before installing or updating REA; the installer does not upgrade it.';
