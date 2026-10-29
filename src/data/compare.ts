export interface FaqItem { question: string; answer: string }
export interface CompareRow {
  tool: string;
  href: string;
  backend: string;
  agents: string;
  install: string;
  strengths: string;
  limits: string;
  bestFor: string;
}

export const compareRows: CompareRow[] = [
  {
    tool: 'REA',
    href: 'https://github.com/morluto/rea',
    backend: 'Hopper, Ghidra, or IDA for native binaries. Built-in static analysis for JavaScript, Electron, and .NET. Separate official guides cover Android, browsers, and other targets.',
    agents: 'Setup documents Claude Code, Codex, and Cursor, plus other MCP clients in the installation reference.',
    install: 'Node.js 22.23.4+ (22.x), 24.22.1+ (24.x), or 26.12.1+, then npx rea-agents@latest setup. Restart the agent after approving the plan. The installer does not upgrade Node.js.',
    strengths: 'One MCP server and CLI for packaged apps and native binaries. Static JavaScript needs no native engine. Results include evidence and stated limits. Analysis runs locally.',
    limits: 'Hopper, IDA, and JEB keep their own licenses. A native engine is still required for deep native work. This site has not measured token cost; see the published tests below.',
    bestFor: 'An agent investigation that may cross JavaScript or Electron and a native binary, with one setup command.',
  },
  {
    tool: 'GhidraMCP',
    href: 'https://github.com/LaurieWired/GhidraMCP',
    backend: 'A Ghidra 12.1.4 plugin plus a Python MCP server. Headless mode can import a binary with PyGhidra and no Ghidra window.',
    agents: 'The README says any MCP client should work. It shows VS Code and Claude Code configurations.',
    install: 'Install the release extension in Ghidra, enable the plugin, then launch the MCP server against the plugin HTTP port (localhost:8080 by default).',
    strengths: 'Decompilation, renames, and listings of methods, classes, imports, and exports from Ghidra. Apache-2.0 badge on the README.',
    limits: 'The README pins Ghidra 12.1.4. It documents Ghidra binary analysis and does not describe a JavaScript or Electron workflow.',
    bestFor: 'Native binaries you already open in Ghidra 12.1.4.',
  },
  {
    tool: 'GhydraMCP',
    href: 'https://github.com/starsong-consulting/GhydraMCP',
    backend: 'Ghidra 11.x or 12.x. The extension build must match that Ghidra version. Several Ghidra windows can listen on ports 8192–8447.',
    agents: 'The README says it has been tested with Claude Desktop, Claude Code, and Cline over stdio.',
    install: 'Install the matching Ghidra extension. The ghydra CLI is installed from a checkout. The Python MCP bridge is still documented.',
    strengths: 'Fork of GhidraMCP with multi-instance Ghidra, a HATEOAS HTTP API, and a CLI that can print JSON. Apache-2.0 badge on the README.',
    limits: 'The README says the MCP bridge is being deprecated in favor of the ghydra CLI. It does not describe Electron application graphs.',
    bestFor: 'Scripted or multi-window Ghidra work, including clients that can call a CLI.',
  },
  {
    tool: 'ida-pro-mcp',
    href: 'https://github.com/mrexodia/ida-pro-mcp',
    backend: 'IDA Pro 8.3 or newer (9 recommended) through idalib. The README states that IDA Free is not supported.',
    agents: 'The README lists many clients, including Claude Code, Codex, and Cursor, and shows install commands for Claude Code, Codex, and Kimi Code.',
    install: 'Python 3.11+, uv, and idalib activated globally, then the client’s plugin command. The GUI plugin path is still documented.',
    strengths: 'MCP access to an IDA database, including decompiler output, for the clients the README lists. MIT license.',
    limits: 'The README recommends the official Hex-Rays IDA MCP server instead, and says the GUI plugin will eventually be deprecated.',
    bestFor: 'People who already run IDA Pro and want the MCP bridge the README describes.',
  },
  {
    tool: 'radare2-mcp',
    href: 'https://github.com/radareorg/radare2-mcp',
    backend: 'radare2. The README badge names radare2 6.2.2. It can attach to a local or remote r2 session through r2pipe.',
    agents: 'The README shows a generic MCP config plus Claude Desktop, VS Code, Zed, and a Codex plugin command. It does not name Cursor.',
    install: 'r2pm -Uci r2mcp, then point the client at r2pm -r r2mcp. Docker and a source build are also documented.',
    strengths: 'C implementation using radare2 APIs, with read-only mode, a sandbox lock, and HTTP serving. MIT license.',
    limits: 'radare2 has to be installed. The README does not describe a JavaScript or Electron application workflow.',
    bestFor: 'Agents that should drive radare2, including an already-open r2 session.',
  },
  {
    tool: '@electron/asar + rg',
    href: 'https://github.com/electron/asar',
    backend: 'No decompiler. @electron/asar reads and extracts asar archives. ripgrep (rg) searches the extracted text.',
    agents: 'No MCP server. You run the tools, or the agent uses its shell.',
    install: 'Node.js 22.12+ for @electron/asar, plus a ripgrep install. The asar CLI can list or extract an archive.',
    strengths: 'No Ghidra, Hopper, or IDA install. Enough when the feature is JavaScript inside the archive. MIT license.',
    limits: 'Text search does not build REA’s module, IPC, or evidence report, and it does not decompile native code.',
    bestFor: 'A small Electron question you can answer by reading the unpacked files.',
  },
];

export const compareFaqs: FaqItem[] = [
  {
    question: 'What is REA?',
    answer: 'REA (Reverse Engineer Anything) is an MCP server and command-line tool from the morluto/rea project. A coding agent calls it to inspect a program on your computer and receive findings with evidence. Official setup docs are at rea.tools/get-started and morluto.github.io/rea. This website is an unofficial tutorial collection. It is not affiliated with morluto or the REA maintainers.',
  },
  {
    question: 'How do I install REA?',
    answer: 'Install Node.js 22.23.4 or newer in the 22.x line, 24.22.1 or newer in the 24.x line, or Node.js 26.12.1 or newer. Node.js 23, 25, earlier 26.x releases, and prereleases are unsupported. Upgrade Node.js yourself; the REA installer does not upgrade it. In a terminal, run npx rea-agents@latest setup, review the plan, approve the changes you want, and restart the coding agent. Copying a prompt in the browser does not install REA. The same package is on npm as rea-agents.',
  },
  {
    question: 'Is REA free?',
    answer: 'REA’s own code is under the MIT license, and the official install docs describe the npm package rather than a paid REA subscription. You still need a supported Node.js release. Deep native analysis uses your own Hopper, Ghidra, or IDA installation. REA’s README says it does not grant a license for commercial tools such as IDA Pro, Hopper, or JEB. Hopper’s free demo has vendor-defined limits.',
  },
  {
    question: 'Does REA work with Claude Code, Codex, and Cursor?',
    answer: 'Yes. The official get-started page names Claude Code, Codex, and Cursor among the clients setup can connect. The installation reference uses the client ids claude_code, codex, and cursor. Run npx rea-agents@latest setup, approve the plan, and restart that agent so it loads the MCP server.',
  },
  {
    question: 'Do I need Ghidra or IDA to use REA?',
    answer: 'Not for static JavaScript, Electron, or .NET inspection. The REA README says those paths read the files you supply and do not need a native engine. Deep native analysis uses Hopper, Ghidra, or IDA. The get-started page documents Ghidra 12.1.x with JDK 21, an optional Hopper install after approval, and IDA through an existing MCP registration whose verified setups are on Windows.',
  },
  {
    question: 'How does REA compare with GhidraMCP, GhydraMCP, ida-pro-mcp, and radare2-mcp?',
    answer: 'Those four projects are bridges to one reverse-engineering tool: Ghidra, Ghidra again, IDA Pro, or radare2. REA’s setup registers one MCP server that can also analyze JavaScript and Electron apps without those engines. GhidraMCP’s README pins Ghidra 12.1.4. GhydraMCP says its MCP bridge is being deprecated in favor of its CLI. ida-pro-mcp requires IDA Pro 8.3 or newer, states that IDA Free is not supported, and recommends the official Hex-Rays server. radare2-mcp is installed with r2pm. None of those READMEs describe REA’s Electron application graph.',
  },
  {
    question: 'When do I not need REA?',
    answer: 'Skip it when you already have the files and a text search answers the question, or when you only want the decompiler you already run. GitTested’s 9 October 2026 review of rea-agents 6.2.0 found that, on four small stripped binaries, Claude Code scored 74 of 75 with ordinary shell tools and 73 of 75 with REA. Static JavaScript in an asar archive can also be extracted with @electron/asar and searched with rg. You also should not use REA on software you are not allowed to examine; the project’s README limits use to software you own or are authorized to analyze.',
  },
  {
    question: 'Does REA use more tokens?',
    answer: 'This site has not measured token use. In the GitTested review of rea-agents 6.2.0, median tokens on the native sessions were 94,663 with shell tools and 233,951 with REA, about 2.5 times as many. That review says most of the extra tokens were cached reads, so computed cost rose by about 1.5 times. It also says a full analysis of one 22 MB Electron archive wrote a 692 MB document that could not be returned in a single MCP call. Those figures are that review’s measurements of version 6.2.0, not a measurement of the current 6.8.0 release and not a result from this site.',
  },
];

export const installFaqs: FaqItem[] = [
  {
    question: 'Which Node.js versions does REA support?',
    answer: 'REA 6.8.0 supports Node.js 22.23.4 or newer within 22.x, 24.22.1 or newer within 24.x, or 26.12.1 or newer. Node.js 23, 25, earlier 26.x releases, and prereleases are unsupported. Upgrade Node.js before installing or updating REA; the installer does not upgrade it.',
  },
  {
    question: 'How do I connect Claude Code, Codex, or Cursor?',
    answer: 'Run npx rea-agents@latest setup, choose the client, review the proposed configuration, and approve it. Then restart the agent. Copying the prompt on this site only gives the agent those instructions. It does not install REA inside the browser.',
  },
  {
    question: 'What if my coding agent cannot see REA?',
    answer: 'Restart the client first. If the tools are still missing, run npx -y rea-agents@latest doctor with that client’s id. Doctor checks registration. A successful tool call after the restart is the end-to-end check.',
  },
];
