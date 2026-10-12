# REA tutorials (unofficial)

REA (Reverse Engineer Anything) is an MCP server and command-line tool from [morluto/rea](https://github.com/morluto/rea). It lets a coding agent inspect a program on your computer — native binaries through Hopper, Ghidra, or IDA, and JavaScript, Electron, .NET, Android, and websites with REA’s own tools — and return findings with evidence. Install a supported Node.js release (22.19+ in 22.x, 24.11+ in 24.x, or 26+), then run `npx rea-agents@latest setup`, approve the plan, and restart the agent. Official setup: [rea.tools/get-started](https://rea.tools/get-started) and [morluto.github.io/rea](https://morluto.github.io/rea/). **This repository is an unofficial tutorial collection for [reatool.dev](https://reatool.dev/). It is not affiliated with morluto or the REA maintainers.**

The current npm release checked for these pages is [rea-agents 6.4.0](https://github.com/morluto/rea/releases/tag/rea-agents-6.4.0), published 2026-10-11. Last verified: October 12, 2026.

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

Yes. The [get-started page](https://rea.tools/get-started) names all three, and the installation reference uses the client ids `claude_code`, `codex`, and `cursor`. Restart the agent after setup so it loads the MCP server.

### Do I need Ghidra or IDA?

Not for static JavaScript, Electron, or .NET inspection. Those paths read the files you supply. Native work needs Hopper, Ghidra, or IDA. GhidraMCP, GhydraMCP, ida-pro-mcp, and radare2-mcp are separate single-tool bridges; see the comparison below.

### How does REA compare with GhidraMCP, ida-pro-mcp, and radare2-mcp?

REA covers more than one backend, including JavaScript and Electron without a decompiler. The others connect an agent to Ghidra, IDA Pro, or radare2. For a small Electron question, extracting the asar with `@electron/asar` and searching with `rg` can be enough. The sourced table lives at [reatool.dev/compare](https://reatool.dev/compare/).

### When do I not need REA?

When the unpacked files or a disassembly listing already answer the question, or when you only want the decompiler you already run. [GitTested’s review of rea-agents 6.2.0](https://gittested.com/reviews/morluto-rea/) (tested October 9, 2026, not by this site) found no accuracy gain on four small stripped binaries: 74 of 75 with ordinary shell tools and 73 of 75 with REA. Do not use REA on software you are not allowed to examine.

### Does REA use more tokens?

This repository has not measured token use. In that same GitTested review of version 6.2.0, median tokens on the native sessions were 94,663 with shell tools and 233,951 with REA (about 2.5 times). The review says most extra tokens were cached reads, so computed cost was about 1.5 times. Those numbers are not a measurement of 6.4.0 and not a result from reatool.dev.

## Short comparison

Facts below are from each project’s public README, checked October 12, 2026. The full table, limits, and source links are on the [comparison page](https://reatool.dev/compare/).

| Tool | Backend | Documented agents | Best for |
| --- | --- | --- | --- |
| [REA](https://github.com/morluto/rea) | Hopper, Ghidra, or IDA, plus built-in JavaScript, Electron, and .NET analysis | Claude Code, Codex, Cursor, and other clients in the install docs | One setup when the question may cross an app and a native binary |
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

Independent community resource. Not affiliated with morluto or the REA maintainers. Report REA software bugs in the [official issue tracker](https://github.com/morluto/rea/issues). Site build, animation, and Cloudflare Pages notes are in [DEPLOYMENT.md](DEPLOYMENT.md). Translation workflow is in [MULTILINGUAL.md](MULTILINGUAL.md).
