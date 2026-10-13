// Single source for the REA npm release this site's guides were checked against.
// Verified from https://github.com/morluto/rea/releases/tag/rea-agents-6.4.0
// (published 2026-10-11). Change `version` only after re-checking commands,
// examples, and the comparison sources. Upstream main can be newer.
export const reaRelease = {
  version: '6.4.0',
  packageName: 'rea-agents',
  tag: 'rea-agents-6.4.0',
  releaseUrl: 'https://github.com/morluto/rea/releases/tag/rea-agents-6.4.0',
  publishedOn: '2026-10-11',
  lastVerifiedLabel: 'October 12, 2026',
} as const;

export const lastVerifiedLine = `Last verified: ${reaRelease.lastVerifiedLabel} · REA version ${reaRelease.version}`;
