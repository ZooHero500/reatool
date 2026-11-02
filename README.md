# REA tutorials (unofficial)

REA (Reverse Engineer Anything) is an MCP server and command-line tool from [morluto/rea](https://github.com/morluto/rea). It lets a coding agent inspect a program on your computer — native binaries through Hopper, Ghidra, or IDA, and JavaScript, Electron, .NET, Android, and websites with REA’s own tools — and return findings with evidence. Install a supported Node.js release (22.23.4+ in 22.x, 24.22.1+ in 24.x, or 26.12.1+), then run `npx rea-agents@latest setup`, approve the plan, and restart the agent. Node.js 23, 25, earlier 26.x releases, and prereleases are unsupported, and the installer does not upgrade Node.js. Official setup: [rea.tools/get-started](https://rea.tools/get-started) and [morluto.github.io/rea](https://morluto.github.io/rea/). **This repository is an unofficial tutorial collection for [reatool.dev](https://reatool.dev/). It is not affiliated with morluto or the REA maintainers.**

The current npm release checked for these pages is [rea-agents 6.8.0](https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0), published 2026-10-25. Last verified: November 2, 2026. On that date, `npm view rea-agents dist-tags.latest` was still 6.8.0, the GitHub release list had no newer tag, and the [changelog on main](https://github.com/morluto/rea/blob/8250bf2320ea57aab4e664db4b4d44b8abd2004e/CHANGELOG.md) still began at 6.8.0. [`package.json` on that main commit](https://github.com/morluto/rea/blob/8250bf2320ea57aab4e664db4b4d44b8abd2004e/package.json) also still says 6.8.0, so `npx rea-agents@latest` still installs 6.8.0. Sources for the published release: the [6.8.0 changelog](https://github.com/morluto/rea/blob/rea-agents-6.8.0/CHANGELOG.md), the [6.8.0 installation reference](https://github.com/morluto/rea/blob/rea-agents-6.8.0/docs/installation.md), the [6.8.0 Kuna guide](https://github.com/morluto/rea/blob/rea-agents-6.8.0/docs/kuna-provider.md), and that package’s npm `engines` field and CLI help. Local fixture checks recorded on October 12, 2026 used REA 6.4.0 and were not repeated.

Since the 6.4.0 pages:

- **6.5.0** (changelog 2026-10-13, npm 2026-10-14) can limit static JavaScript analysis to exact files with repeated `--source-path`. Imports are not pulled in. Unselected files stay inventoried with unknown relationships.
- **6.6.0** was tagged on 2026-10-18 and was not published to npm. **6.7.0**, published the same day, includes it. Setup edits the last repeated JSON or JSONC member, and refuses a removal that would reactivate a shadowed duplicate. The 6.6.0 changelog, included by 6.7.0 and 6.8.0, adds a caller-supplied Kuna provider. It says recorded coverage uses Kuna 1.833 on Linux, and that Windows, PE, and universal Mach-O are unsupported. The 6.8.0 Kuna guide says REA verified Kuna 1.833, reports other releases as unverified, does not install Kuna, and accepts ELF and thin Mach-O for x86-64, AArch64, and ARM.
- **6.8.0** makes the MCP tool `analyze_function` default to a retained summary. Pass `detail: "complete"` for the previous inline dossier. The CLI command `function` still defaults to complete output and requires `--evidence_output` for a summary. `decompile` is a different command and still returns pseudocode. `--source-paths-json` accepts a long source selection as JSON. The changelog and the published CLI help also include `environment-build`, `environment-export`, `environment-serve`, and `environment-compare`. The changelog says this release adds opt-in Streamable HTTP and FreeBuff setup registration, and that installed native FreeBuff loading and skill discovery remain unverified.

The README and guides on [main at 8250bf2](https://github.com/morluto/rea/commit/8250bf2320ea57aab4e664db4b4d44b8abd2004e) (2026-11-02) describe behavior that is not in the 6.8.0 tag:

- The [Kuna guide on main](https://github.com/morluto/rea/blob/8250bf2320ea57aab4e664db4b4d44b8abd2004e/docs/kuna-provider.md) recommends Kuna 1.988 for a new installation and says the 1.988 checks ran on macOS arm64. Linux and other hosts are unverified for that release.
- The [MCP contracts guide on main](https://github.com/morluto/rea/blob/8250bf2320ea57aab4e664db4b4d44b8abd2004e/docs/mcp-contracts.md) adds `REA_MCP_OUTPUT_SCHEMA_PROFILE=compact`, which bounds each advertised output schema to 4,096 bytes. The [6.8.0 copy](https://github.com/morluto/rea/blob/rea-agents-6.8.0/docs/mcp-contracts.md) documents `full` and `off` only. The same main guide says `close_binary` keeps investigation records and `reset_investigation` clears them. The 6.8.0 copy says `close_binary` clears those records. There is no changelog entry for that change.
- The [installation reference on main](https://github.com/morluto/rea/blob/8250bf2320ea57aab4e664db4b4d44b8abd2004e/docs/installation.md) says doctor validates Ghidra 12.x at 12.1 or newer. The 6.8.0 copy says Ghidra 12.1.x. The live [get-started page](https://rea.tools/get-started) still says to download Ghidra 12.1.4.

Those main-branch sentences are not what `npx rea-agents@latest` installs.

## FAQ

### What is REA?

REA (Reverse Engineer Anything) is the morluto/rea project: one local MCP server and CLI for reverse engineering. Your agent calls it; REA does not replace the agent. The official project site is [rea.tools](https://rea.tools/). This repo only publishes independent tutorials.

### How do I install it?

With Node.js and npm installed, run:

```bash
npx rea-agents@latest setup
```

Review the plan, approve the changes you want, and restart Claude Code, Codex, Cursor, or another supported client. Copying a prompt in a browser does not install REA. A global CLI is optional: `npm install --global rea-agents`. Details: [installation reference](https://github.com/morluto/rea/blob/main/docs/installation.md) and the [install tutorial](https://reatool.dev/install/).

### Is REA free?

REA’s own code is [MIT-licensed](https://github.com/morluto/rea/blob/main/LICENSE). The official docs describe the `rea-agents` npm package, not a paid REA subscription. Deep native analysis still uses your own Hopper, Ghidra, or IDA installation. REA does not grant a license for commercial tools such as IDA Pro, Hopper, or JEB. Hopper’s free demo has vendor-defined limits.

### Does it work with Claude Code, Codex, and Cursor?

Yes. The [get-started page](https://rea.tools/get-started) names all three. The [6.8.0 installation reference](https://github.com/morluto/rea/blob/rea-agents-6.8.0/docs/installation.md) uses the client ids `claude_code`, `codex`, and `cursor`, and lists further ids. It says `droid`, `dsh`, `kimi`, `qoder`, `trae`, `workbuddy`, and `zcode` require rea-agents 6.5.0 or later, and `freebuff` requires 6.8.0 or later. That get-started page still introduces its client table as the npm 6.4.0 release and says some of those clients are only on repository main. Where the two pages disagree, this page follows the 6.8.0 installation reference. Restart the agent after setup so it loads the MCP server. On November 2, 2026, npm latest was still 6.8.0.

### Do I need Ghidra or IDA?

Not for static JavaScript, Electron, or .NET inspection. Those paths read the files you supply. Deep native analysis uses Hopper, Ghidra, IDA, or a Kuna executable you supply. The 6.8.0 Kuna guide says REA verified Kuna 1.833 and does not support Windows, PE, or universal Mach-O. The Kuna guide on main recommends 1.988 and says those checks ran on macOS arm64; that recommendation is not in the published 6.8.0 tag. The get-started page still documents Ghidra 12.1.x with JDK 21. GhidraMCP, GhydraMCP, ida-pro-mcp, and radare2-mcp are separate single-tool bridges; see the comparison below.

### Is npm’s latest REA newer than 6.8.0?

No. On November 2, 2026, npm dist-tag `latest` and the latest GitHub release were both rea-agents 6.8.0, published 2026-10-25. The changelog on main has no section after 6.8.0. Guides on that commit describe later behavior. Those guides are not the published package.

### How does REA compare with GhidraMCP, ida-pro-mcp, and radare2-mcp?

REA covers more than one backend, including JavaScript and Electron without a decompiler. The others connect an agent to Ghidra, IDA Pro, or radare2. For a small Electron question, extracting the asar with `@electron/asar` and searching with `rg` can be enough. The sourced table lives at [reatool.dev/compare](https://reatool.dev/compare/).

### When do I not need REA?

When the unpacked files or a disassembly listing already answer the question, or when you only want the decompiler you already run. [GitTested’s review of rea-agents 6.2.0](https://gittested.com/reviews/morluto-rea/) (tested October 9, 2026, not by this site) found no accuracy gain on four small stripped binaries: 74 of 75 with ordinary shell tools and 73 of 75 with REA. Do not use REA on software you are not allowed to examine.

### Does REA use more tokens?

This repository has not measured token use. In that same GitTested review of version 6.2.0, median tokens on the native sessions were 94,663 with shell tools and 233,951 with REA (about 2.5 times). The review says most extra tokens were cached reads, so computed cost was about 1.5 times. Those numbers are not a measurement of 6.8.0 and not a result from reatool.dev.

## Short comparison

Competitor rows below are from each project’s public README, checked October 12, 2026, and were not re-read for this update. The REA row follows rea-agents 6.8.0, checked November 2, 2026. The full table, limits, and source links are on the [comparison page](https://reatool.dev/compare/).

| Tool | Backend | Documented agents | Best for |
| --- | --- | --- | --- |
| [REA](https://github.com/morluto/rea) | Hopper, Ghidra, or IDA, or a caller-supplied Kuna, plus built-in JavaScript, Electron, and .NET analysis | Claude Code, Codex, Cursor, and the other client ids in the 6.8.0 installation reference | One setup when the question may cross an app and a native binary |
| [GhidraMCP](https://github.com/LaurieWired/GhidraMCP) | Ghidra 12.1.4 | Any MCP client, in theory; examples for VS Code and Claude Code | Binaries you already open in that Ghidra version |
| [GhydraMCP](https://github.com/starsong-consulting/GhydraMCP) | Ghidra 11.x or 12.x, multiple windows | Claude Desktop, Claude Code, and Cline; MCP bridge marked for deprecation | Scripted or multi-window Ghidra work |
| [ida-pro-mcp](https://github.com/mrexodia/ida-pro-mcp) | IDA Pro 8.3+ (IDA Free is not supported) | Claude Code, Codex, Cursor, and others; README recommends the official Hex-Rays server | An existing IDA Pro database |
| [radare2-mcp](https://github.com/radareorg/radare2-mcp) | radare2 (README badge: 6.2.2) | Generic MCP config, Claude Desktop, VS Code, Zed, Codex plugin; Cursor is not named | Agents that should drive radare2 |
| [@electron/asar](https://github.com/electron/asar) + rg | No decompiler; extract an asar and search the text | No MCP server | A small Electron question you can answer by reading the files |

## Tutorials on reatool.dev

These pages are independent walkthroughs. A passing check on one function is not a rebuilt application.

- [Install REA](https://reatool.dev/install/) — Claude Code, Codex, and Cursor setup, doctor checks, and what to do if the agent cannot see the tools
- [Compare REA](https://reatool.dev/compare/) — sourced comparison, when to skip REA, published tests, and a placeholder for this site’s own measurement
- [First investigation](https://reatool.dev/first-analysis/) — follow an Electron export button in the official Notes sample
- [All tutorials](https://reatool.dev/tutorials/) — browser, Electron, Android, native, and JavaScript guides
- [slugify](https://reatool.dev/cases/slugify/) — locally checked JavaScript package example
- [Aegis TOTP](https://reatool.dev/cases/aegis/) — attributed upstream APK report plus a tested demo
- [Electron clipboard](https://reatool.dev/tutorials/electron-clipboard/) — Notion’s reported copy path
- [About and editorial method](https://reatool.dev/about/) — what this site checked and what it did not

## Unofficial

To build, verify and deploy this site to Cloudflare Pages, run `npm run deploy` with Wrangler installed and authenticated. See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

Independent community resource. Not affiliated with morluto or the REA maintainers. Report REA software bugs in the [official issue tracker](https://github.com/morluto/rea/issues). Site build, animation, and Cloudflare Pages notes are in [DEPLOYMENT.md](DEPLOYMENT.md). Translation workflow is in [MULTILINGUAL.md](MULTILINGUAL.md).
