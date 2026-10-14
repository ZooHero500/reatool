export interface PracticeSource { label: string; url: string }
export interface PracticeLink { href: string; label: string }
export type PracticeKind = 'rea' | 'other' | 'unconfirmed' | 'official';

export interface PracticeNote {
  id: string;
  kind: PracticeKind;
  featured?: boolean;
  likes?: string;
  title: string;
  line: string;
  preview: string;
  image?: string;
  imageAlt?: string;
  mark: string;
  sources: PracticeSource[];
  lab?: PracticeLink;
  also?: PracticeLink;
}

const post = 'Cover from the original post';
const article = 'Cover from the original article';
const project = 'Cover from the project page';

export const fieldNotes: PracticeNote[] = [
  {
    id: 'ac-status',
    kind: 'other',
    featured: true,
    likes: '22,475',
    title: "Control an air conditioner from the Mac menu bar",
    line: "Analyze the phone app’s network calls with Codex, then build a Mac control.",
    preview: "Ilter Canberk used Codex to inspect an air conditioner app’s network calls in an Android emulator and built a Mac menu-bar control. He later used Codex and Lens Studio to bring the same controls to AR glasses.",
    image: 'https://pbs.twimg.com/tweet_video_thumb/HUTIprwacAAZ9k1.jpg',
    imageAlt: post,
    mark: 'AC',
    sources: [
      { label: 'Original post', url: 'https://x.com/icanberk/status/2109031477484937571' },
      { label: 'Author’s reply', url: 'https://x.com/icanberk/status/2109053667039236113' },
      { label: 'Follow-up post', url: 'https://x.com/icanberk/status/2109122304429236559' }
    ]
  },
  {
    id: 'universal-modder',
    kind: 'other',
    featured: true,
    likes: '14,340',
    title: 'Universal Modder: mods across existing games',
    line: 'Claude is shown adding a civilization to Age of Empires II and Minecraft pieces to GTA V.',
    preview: "Rehan Sheikh demonstrates an agent analyzing game files, generating mods, and testing them in the running game. Examples include a new civilization in Age of Empires II and Minecraft characters in GTA V.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2105160555308965888/img/CIK84d0tC8ElyDdM.jpg',
    imageAlt: post,
    mark: 'MOD',
    sources: [{ label: 'Original post', url: 'https://x.com/rehan_shei/status/2105161487509852622' }]
  },
  {
    id: 'steam-unity',
    kind: 'rea',
    featured: true,
    likes: '9,800',
    title: 'A purchased Steam game, opened in Unity',
    line: "The author reports recovering C# from a purchased Steam game with REA.",
    preview: "A.I.Warper says a first session with REA decompiled a Steam game he had already bought and opened it in Unity in under 30 minutes, using Opus 5.5. The post names neither the game nor a repository, and there is no clip.",
    mark: 'C#',
    sources: [{ label: 'Original post', url: 'https://x.com/AIWarper/status/2109060856466264566' }]
  },
  {
    id: 'firefighter',
    kind: 'other',
    featured: true,
    likes: '7,833',
    title: 'Firefighter: an old DOS game, rewritten in Rust',
    line: 'The author reports recovering Pascal-shaped logic from the binary, then rewriting it.',
    preview: "Eric S. Raymond wanted the DOS game Firefighter in a maintainable form for an old-game collection.",
    mark: 'DOS',
    sources: [{ label: 'Original post', url: 'https://x.com/esrtweet/status/2106983467141509385' }]
  },
  {
    id: 'lg-plex',
    kind: 'other',
    featured: true,
    likes: '7,268',
    title: 'A faster Plex client for one LG TV',
    line: "Ghidra and Claude Code led to a Rust client.",
    preview: "Ghidra and Claude Code were used to study that TV’s media stack, then a Rust and OpenGL client called PlxNative was built. The author says the menu on that set dropped from about 30 seconds to about 3, with 4K playback.",
    image: 'https://pbs.twimg.com/media/HUF86pVaUAAV_dA.jpg?name=medium',
    imageAlt: post,
    mark: 'PLEX',
    sources: [
      { label: 'Original post', url: 'https://x.com/VaibhavSisinty/status/2108103450995417177' },
      { label: 'Developer write-up', url: 'https://www.reddit.com/r/ClaudeCode/comments/1x043yp/i_used_claude_code_to_reverseengineer_an_lg_tv/' }
    ]
  },
  {
    id: 'mw2',
    kind: 'other',
    featured: true,
    likes: '6,385',
    title: 'Modern Warfare 2, checked against the original bytes',
    line: 'A three-month, multi-agent decompilation. The author says the code stays private.',
    preview: "Maurice Heumann describes about three months of work on Call of Duty: Modern Warfare 2, with many agents plus IDA. His recap says the game runs and that 83% of functions match the original bytes. He also says the source will not be published.",
    mark: 'MW2',
    sources: [
      { label: 'Original post', url: 'https://x.com/momo5502/status/2105360274777624902' },
      { label: 'Follow-up post', url: 'https://x.com/momo5502/status/2108886652391141721' }
    ]
  },
  {
    id: 'siri-remote',
    kind: 'unconfirmed',
    featured: true,
    likes: '5,419',
    title: 'An Apple TV remote, driving Linux',
    line: "A published bridge for touch, buttons and the microphone.",
    preview: "Alex Funk wanted a first-generation Siri Remote to talk to a Linux machine instead of only an Apple TV. He published open-appleremote and a clip of touch, buttons, gestures and the microphone.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2108495234539876352/img/NjMwtgUQOmuXj7Fh.jpg',
    imageAlt: post,
    mark: 'TV',
    sources: [
      { label: 'Original post', url: 'https://x.com/alexzfunk/status/2108585025205592408' },
      { label: 'Project page', url: 'https://github.com/a-funk/open-appleremote' }
    ]
  },
  {
    id: 'blue-star',
    kind: 'other',
    featured: true,
    likes: '4,937',
    title: 'Blue Star, controlled from the menu bar',
    line: "An MCP server for one air conditioner, then a menu-bar app.",
    preview: "MC reverse engineered the Blue Star air conditioner app, built an MCP server, and connected it to a Mac menu-bar app. His earlier post shows how the server lets Claude or ChatGPT set the temperature.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2109598461444374528/img/oojHRgnGRVxjoC6f.jpg',
    imageAlt: post,
    mark: 'BAR',
    sources: [
      { label: 'Original post', url: 'https://x.com/the_mcnaveen/status/2109599383717335207' },
      { label: 'Earlier post', url: 'https://x.com/the_mcnaveen/status/2109566142809555449' }
    ]
  },
  {
    id: 'claude-chrome',
    kind: 'unconfirmed',
    featured: true,
    likes: '2,263',
    title: 'Claude’s Chrome control, pointed at a remote browser',
    line: "A public plugin forwards browser actions to a cloud browser.",
    preview: "Paul Klein wanted Claude Code to drive a browser that was not on the same machine. The thread shows the local Chrome connection being translated into commands for a Browserbase cloud browser, with a demo and a public plugin.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2005693423399964673/img/QLQQjxJj7CNfd9qk.jpg',
    imageAlt: post,
    mark: 'CDP',
    sources: [
      { label: 'Original post', url: 'https://x.com/pk_iv/status/2005694082627297735' },
      { label: 'Project page', url: 'https://github.com/browserbase/claude-code-plugin' }
    ]
  },
  {
    id: 'tuya-lights',
    kind: 'other',
    featured: true,
    likes: '2,285',
    title: 'Tuya lights, controlled from a Mac',
    line: 'Claude read phone Bluetooth traffic. A script then changed the bulbs.',
    preview: "Lucho did not want the Tuya phone app to be the only way to run RGB bulbs he owned. He reports that Claude read the Bluetooth traffic from the phone, and a Mac script then sent the commands. The post includes the lights actually changing.",
    image: 'https://pbs.twimg.com/media/HUHVYSUXEAAlrP-.jpg?name=medium',
    imageAlt: post,
    mark: 'RGB',
    sources: [{ label: 'Original post', url: 'https://x.com/luchoalfonso_/status/2108200739495362718' }]
  },
  {
    id: 'claude-slides',
    kind: 'rea',
    featured: true,
    likes: '686',
    title: 'Claude Slides: an editor rebuilt from the page bundle',
    line: "Analyze the front-end bundle with Codex and REA, then build an editor in BaoCut.",
    preview: "Baoyu downloaded the scripts and styles behind Claude’s slide editor, used Codex with REA to analyze the obfuscated code, and had Claude Code organize the project. He shared an editor demo and a code commit in JimLiu/baocut.",
    image: 'https://pbs.twimg.com/media/HUUyueaWEAI3toM.jpg?name=medium',
    imageAlt: post,
    mark: 'SLIDES',
    sources: [
      { label: 'Original post', url: 'https://x.com/dotey/status/2109151666020794711' },
      { label: 'Code commit', url: 'https://github.com/JimLiu/baocut/commit/b8585e0c8d7a82bdee9f0ed019cf6edb075e41c1' }
    ]
  },
  {
    id: 'claude-code-bundle',
    kind: 'rea',
        likes: '576',
    title: 'Claude Code: reading a 47 MB compressed package',
    line: "Muse installed REA and inspected the bundle.",
    preview: "The recording shows Muse installing REA and working through a compressed Claude Code package described as about 47 MB. A later post says the same kind of inspection was used on the language setting.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2108846294366334976/img/z1Tv5xm54aCKJa2D.jpg',
    imageAlt: post,
    mark: '47MB',
    sources: [
      { label: 'Original post', url: 'https://x.com/servasyy_ai/status/2108846931183378537' },
      { label: 'Follow-up post', url: 'https://x.com/i/status/2110027278570635457' }
    ]
  },
  {
    id: 'smart-toilet',
    kind: 'rea',
        title: 'A menu-bar control for a smart-toilet lid',
    line: "REA and Codex read a mini program’s Bluetooth traffic.",
    preview: "The author wanted the lid controlled from a computer instead of a WeChat mini program. The posts say REA plus Codex read the Bluetooth traffic and produced a Mac menu-bar control. A follow-up says the same menu bar later covered other devices already in that home.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2109308582424719360/img/W7AQqHvdmITjvUwi.jpg',
    imageAlt: post,
    mark: 'LID',
    sources: [
      { label: 'Original post', url: 'https://x.com/thinkszyg/status/2109309251533570509' },
      { label: 'Follow-up post', url: 'https://x.com/thinkszyg/status/2109526361971073103' }
    ]
  },
  {
    id: 'preview-comparison',
    kind: 'rea',
    featured: true,
    title: 'macOS Preview: once with REA, once without',
    line: 'The author says Claude alone finished faster. The REA pass came closer on the features that matter.',
    preview: "The same Preview rebuild was run twice: Claude with REA, and Claude alone. The author says the REA version came closer on zoom, sharing, rotation, annotation and saving, and felt faster at drawing, while the plain Claude pass was faster to finish.",
    image: 'https://pbs.twimg.com/media/HUU3-n8bgAAXh2n.jpg?name=medium',
    imageAlt: post,
    mark: 'PDF',
    sources: [{ label: 'Original post', url: 'https://x.com/maheshboda006/status/2109154423712977359' }]
  },
  {
    id: 'codex-annotations',
    kind: 'rea',
        likes: '252',
    title: "Open Codex annotations from a web page",
    line: 'A test page can open the annotation box and fill it. The comment never reaches the composer.',
    preview: "Baoyu wanted a page inside the Codex desktop browser to hand a comment to the conversation. Codex with REA read the Electron code while he clicked through the app. The reported call opens the comment box and pre-fills it. It does not place the comment into the composer or send the message. The call named in the post is document.oai.annotation.request().",
    image: 'https://pbs.twimg.com/media/HUYmEKZXIAAcnjW.jpg?name=medium',
    imageAlt: post,
    mark: 'NOTE',
    sources: [{ label: 'Original post', url: 'https://x.com/dotey/status/2109417222724600172' }]
  },
  {
    id: 'apple-notes',
    kind: 'other',
    likes: '978',
    title: 'Apple Notes, imported into another notes app',
    line: 'Claude Code is shown moving folders, notes and images into Grape.',
    preview: "Ozgur Ozer wanted a path from Apple Notes into his notes app, Grape. The clip shows folders, notes and images coming across after Claude Code inspected Notes.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2035124066806349824/img/NSIXkQfsuIIQ-56o.jpg',
    imageAlt: post,
    mark: 'NOTES',
    sources: [{ label: 'Original post', url: 'https://x.com/ozgrozer/status/2035124755854979272' }]
  },
  {
    id: 'boba-fett',
    kind: 'other',
    likes: '678',
    title: 'Boba Fett, dropped into Red Dead Redemption 2',
    line: "A character mod with a jetpack, built from another game’s model.",
    preview: "Chris shows Boba Fett moving inside Red Dead Redemption 2. The post says Claude helped read the asset format, export a Battlefront II model, and fit it to Arthur’s rig, with a jetpack, weapons and voice.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2106925622240890880/img/lmBMUvS2X8cW_edf.jpg',
    imageAlt: post,
    mark: 'MOD',
    sources: [{ label: 'Original post', url: 'https://x.com/ChrisGPT/status/2106925689190354989' }]
  },
  {
    id: 'urban-terror',
    kind: 'other',
    likes: '479',
    title: 'Urban Terror, running in the browser',
    line: 'A Quake-family port started working after a data-layout mismatch was fixed.',
    preview: "levelsio had been trying to put Urban Terror in the browser through ioquake3 and WebAssembly. The new post says the blocker was a layout mismatch between engine structures and the game bytecode. After that fix, the author reports the game joining a multiplayer server.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2106150488139763712/img/kEoZu8UI1iSYnflJ.jpg',
    imageAlt: post,
    mark: 'Q3',
    sources: [{ label: 'Original post', url: 'https://x.com/levelsio/status/2106150888289009666' }]
  },
  {
    id: 'garageband',
    kind: 'other',
    likes: '272',
    title: 'GarageBand’s project format, used to score a video',
    line: 'Claude is said to have read the format so local instruments could be composed by an agent.',
    preview: "Anshu was making a music video and wanted the instruments already on the Mac. He says Claude read the GarageBand project format as one step in a larger pipeline that also used Blender and local voice models.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2106128431612096512/img/lZOQTXb3GdKupnkx.jpg',
    imageAlt: post,
    mark: 'AUDIO',
    sources: [{ label: 'Original post', url: 'https://x.com/anshuc/status/2106131543752122774' }]
  },
  {
    id: 'claude-design',
    kind: 'unconfirmed',
    likes: '254',
    title: 'Claude Design, wired into BaoCut',
    line: "Add a design skill to BaoCut for editing, revisions and annotations.",
    preview: "Baoyu added a Claude Design skill to BaoCut, his video agent, and published the commit. He says a standalone skill could not edit, revise and mark, so the integration lives inside the product.",
    image: 'https://pbs.twimg.com/media/HUZiCzxWAAAcPIb.jpg?name=medium',
    imageAlt: post,
    mark: 'DESIGN',
    sources: [
      { label: 'Original post', url: 'https://x.com/dotey/status/2109482425722057154' },
      { label: 'Code commit', url: 'https://github.com/JimLiu/baocut/commit/7aa049e8' }
    ]
  },
  {
    id: 'unnamed-library',
    kind: 'rea',
    likes: '355',
    title: 'An unnamed binary library',
    line: 'REA, then a private reimplementation. The library and the scores stay private.',
    preview: "Leo Xiang reports using REA on an encrypted binary library, then asking Claude Code to reimplement it. He says private evaluation numbers landed close to the original. The library, source and test method are not public.",
    mark: 'BIN',
    sources: [{ label: 'Original post', url: 'https://x.com/leeoxiang/status/2109159806183538768' }]
  },
  {
    id: 'virtual-desktop',
    kind: 'rea',
    title: "Port Virtual Desktop Streamer to Linux",
    line: "Reuse the protocol libraries and replace the audio, video and input layer.",
    preview: "The project keeps the vendor’s macOS protocol libraries and replaces the platform layer with Linux audio, video and input calls. The README says Claude Code and REA built that port from one prompt, plus a later prompt for fixes. It also says the repository does not contain Virtual Desktop code: the build extracts libraries from an installer the user downloads. SteamVR and OpenXR games stay with the Windows streamer.",
    image: 'https://opengraph.githubassets.com/1/cudanexus/vd-streamer-linux',
    imageAlt: project,
    mark: 'VD',
    sources: [
      { label: 'Project page', url: 'https://github.com/cudanexus/vd-streamer-linux' },
      { label: 'Original post', url: 'https://x.com/i/status/2109767636452265990' }
    ]
  },
  {
    id: 'obsidian-asar',
    kind: 'rea',
    title: "Fix analysis of Obsidian’s large application archive",
    line: 'REA 4.1.0 failed on a 24 MB archive. Later runs on the same file completed.',
    preview: "GitHub issue 746 says rea analyze-javascript-application sat quiet, then failed, on obsidian.asar from Obsidian 1.12.7. After the fix, maintainers and the reporter posted completed runs, from 86 to 186 seconds depending on the machine.",
    mark: 'ASAR',
    sources: [{ label: 'Issue', url: 'https://github.com/morluto/rea/issues/746' }]
  },
  {
    id: 'marktext-export',
    kind: 'rea',
    title: "Trace MarkText’s HTML export",
    line: 'The author says 17 tests passed. One Windows check is described as unfinished.',
    preview: "The author says agents used REA to follow HTML export inside a built MarkText app, and that 17 tests passed. One Windows check is described as still open.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2109839244323921920/img/ma9riOELexcHGaW7.jpg',
    imageAlt: post,
    mark: 'HTML',
    sources: [{ label: 'Original post', url: 'https://x.com/i/status/2109839329933824026' }]
  },
  {
    id: 'zee-rp',
    kind: 'rea',
    title: 'Axure .rp files, opened for an agent',
    line: 'zee-rp says REA helped read the prototype format. The engine is public.',
    preview: "LilZee’s zee-rp project says REA helped read the Axure .rp format. The repository publishes a JavaScript engine and MCP tools so an agent can edit a prototype.",
    image: 'https://opengraph.githubassets.com/1/LilZeeCN/zee-rp',
    imageAlt: project,
    mark: 'RP',
    sources: [
      { label: 'Project page', url: 'https://github.com/LilZeeCN/zee-rp' },
      { label: 'Original post', url: 'https://x.com/i/status/2109660213850800621' }
    ]
  },
  {
    id: 'capcut-live',
    kind: 'rea',
    likes: '678',
    title: 'CapCut, edited from the chat',
    line: "Edit an open CapCut project from chat while keeping preview, undo and save working.",
    preview: "gkxspace says Claude and Codex, with REA, can change an open CapCut project from the chat: the player refreshes, and CapCut’s own undo and save still work. There is no public repository.",
    image: 'https://pbs.twimg.com/media/HUbyxM4bIAAWDJq.jpg?name=medium',
    imageAlt: post,
    mark: 'LIVE',
    sources: [{ label: 'Original post', url: 'https://x.com/gkxspace/status/2109644222978744682' }]
  },
  {
    id: 'capcut',
    kind: 'rea',
    title: 'A video editor sketched from CapCut',
    line: "The author shows captions, transitions, animation and text.",
    preview: "Mehal Kumar reports using REA with Claude Code to study CapCut, then generating an editor with captions, transitions, animation and text. He says the first pass took about 30 minutes and that more features are still missing.",
    image: 'https://pbs.twimg.com/amplify_video_thumb/2109665091537043456/img/vVKk_Y2EPxaPZOyb.jpg',
    imageAlt: post,
    mark: 'CUT',
    sources: [{ label: 'Original post', url: 'https://x.com/i/status/2109665456735076494' }]
  },
  {
    id: 'cameo',
    kind: 'rea',
    title: 'Cameo: a desktop character, rebuilt from the app',
    line: "Use REA to extract pseudocode, then reimplement the behavior with Claude Code.",
    preview: "Cameo is a macOS menu-bar app that puts a small animated character on the desktop. The author describes installing REA, taking pseudocode from the compiled app, and asking Claude Code to rebuild the behavior.",
    mark: 'CAT',
    sources: [
      { label: 'Original post', url: 'https://x.com/wquguru/status/2109522225472970833' },
      { label: 'Project page', url: 'https://github.com/wquguru/cameo' }
    ]
  },
  {
    id: 'kingy-notes',
    kind: 'rea',
    title: "Recreate a notes app’s CSV export",
    line: "Trace an Electron export and test a separate CSV formatter.",
    preview: "Curtis Pyke’s Kingy AI test followed an export from the renderer to the main-process handler and wrote a separate CSV formatter. The article says all 14 declared tests matched, including a title that contains quotation marks. The boundary is explicit: source analysis and a controlled Node run only.",
    image: 'https://kingy.ai/wp-content/uploads/2026/10/rea-featured-image.webp',
    imageAlt: article,
    mark: 'CSV',
    sources: [{ label: 'Original article', url: 'https://kingy.ai/blog/reverse-engineer-anything-ai-rea-guide/' }]
  },
  {
    id: 'genztech-notes',
    kind: 'rea',
    title: 'A 20-line Electron notes app on Windows',
    line: 'REA 4.1.0 returned a 27-node graph and both IPC channel names.',
    preview: 'Kore D wrote the sample before pointing REA at anything larger: a main process, a preload script, and a store that writes JSON. The article says analyze-javascript-application returned 27 nodes, named notes:search and notes:save, and gave line ranges in the preload file. It parsed three JavaScript files and did not run them.',
    image: 'https://genztech.blog/og/rea-reverse-engineering-mcp-setup.png',
    imageAlt: article,
    mark: 'IPC',
    sources: [{ label: 'Original article', url: 'https://genztech.blog/p/rea-reverse-engineering-mcp-setup/' }]
  },
  {
    id: 'gittested',
    kind: 'rea',
    title: 'Small binaries, where REA added little',
    line: 'On four stripped binaries, ordinary shell tools scored 74 of 75. REA scored 73.',
    preview: "GitTested reviewed rea-agents 6.2.0 with Claude Code. On the native checklist, REA used more tokens and did not win the score. Electron sessions tied, because the agent searched the unpacked app. A full analysis of one 22 MB archive wrote a document too large for one MCP call.",
    image: 'https://gittested.com/og/morluto-rea.png',
    imageAlt: article,
    mark: '74/75',
    lab: { href: '/compare/', label: 'Comparison page' },
    sources: [{ label: 'Original article', url: 'https://gittested.com/reviews/morluto-rea/' }]
  },
  {
    id: 'stretchly',
    kind: 'rea',
    title: 'Stretchly: eight windows, counted in 14 seconds',
    line: 'The public introduction says the counts matched a hand check.',
    preview: "A Medium review uses Stretchly, an open-source Electron break app, as a readable target. The visible introduction says a 10 October run finished in 14 seconds: 8 windows, 30 main-process handlers, 31 messages and 9 page-side listeners, all matching a hand check. The full article is member-only.",
    mark: '8',
    sources: [{ label: 'Original article', url: 'https://medium.com/data-science-collective/rea-mcp-review-can-an-ai-agent-reverse-engineer-any-app-f25f7ebfc7c6' }]
  },
  {
    id: 'aegis',
    kind: 'official',
    title: 'Aegis: the 30-second login code',
    line: 'The REA project traces one TOTP path and reports 133 agreeing inputs.',
    preview: "The official showcase follows the login-code path in an Aegis APK and reports 133 agreeing inputs across three implementations. Our page is a teaching demo with public test vectors.",
    mark: '30s',
    lab: { href: '/cases/aegis/', label: 'Aegis lab' },
    sources: [
      { label: 'Official showcase', url: 'https://rea.tools/showcase/aegis/' },
      { label: 'Evidence note', url: 'https://github.com/morluto/rea/blob/main/website/evidence/aegis-login-code.md' }
    ]
  },
  {
    id: 'dx-ball',
    kind: 'official',
    title: 'DX-Ball: one stereo-pan function',
    line: "Recompile a stereo-pan function and match all 63 original bytes.",
    preview: "The upstream case recovers one sound-pan function, reports 3,205 original x86 checks, and says the recompiled function matches all 63 bytes. Our tone demo illustrates direction.",
    mark: '63B',
    lab: { href: '/cases/dx-ball/', label: 'DX-Ball lab' },
    sources: [
      { label: 'Official showcase', url: 'https://rea.tools/showcase/dx-ball/' },
      { label: 'Evidence note', url: 'https://github.com/morluto/rea/blob/main/website/evidence/dx-ball-sound-pan.md' }
    ]
  },
  {
    id: 'th04',
    kind: 'official',
    title: 'TH04: how a ring of bullets is aimed',
    line: "Angle spacing for one pattern.",
    preview: "The REA project explains angle spacing, aim and rotation for one bullet ring in Touhou’s Lotus Land Story. The instruction checks cite an existing reconstruction project. Our diagram approximates pointer aiming.",
    mark: 'RING',
    lab: { href: '/cases/th04/', label: 'TH04 lab' },
    sources: [
      { label: 'Official showcase', url: 'https://rea.tools/showcase/th04/' },
      { label: 'Evidence note', url: 'https://github.com/morluto/rea/blob/main/website/evidence/th04-bullet-ring.md' }
    ]
  },
  {
    id: 'notion',
    kind: 'official',
    title: 'Notion: three clipboard paths',
    line: "Copy, copy text, copy image.",
    preview: "The official investigation follows copy actions from the renderer through preload and IPC. A later pass names copy, copyText and copyImage as static candidates. Our guide teaches that path.",
    mark: 'COPY',
    lab: { href: '/tutorials/electron-clipboard/', label: 'Clipboard guide' },
    sources: [
      { label: 'Official showcase', url: 'https://rea.tools/showcase/notion/' },
      { label: 'Pull request', url: 'https://github.com/morluto/rea/pull/961' }
    ]
  },
  {
    id: 'dino-calculator',
    kind: 'official',
    title: 'Dinosaur speed, and the calculator percent key',
    line: "Explore two familiar rules through analysis and interactive demos.",
    preview: "One investigation checks how a Chromium-derived dinosaur page accelerates. Another reads Windows Calculator’s model library and separates the percent rule for addition from the rule for multiplication. Our labs cover those two rules.",
    mark: 'DINO',
    lab: { href: '/cases/dino/', label: 'Dinosaur lab' },
    also: { href: '/cases/calculator/', label: 'Calculator lab' },
    sources: [
      { label: 'Evidence note', url: 'https://github.com/morluto/rea/blob/main/website/evidence/calculator-and-dino.md' },
      { label: 'Official showcase', url: 'https://rea.tools/' }
    ]
  },
  {
    id: 'flutter-aot',
    kind: 'rea',
    title: "Identify a Flutter APK’s runtime and build",
    line: 'A pull request reports the snapshot hash and per-ABI digests.',
    preview: "Pull request 1582 parses an APK and reports the Dart snapshot hash plus per-ABI library digests. That identifies which runtime is present. It does not recover a Dart project.",
    mark: 'AOT',
    sources: [{ label: 'Pull request', url: 'https://github.com/morluto/rea/pull/1582' }]
  },
  {
    id: 'android-apidemos',
    kind: 'rea',
    title: 'ApiDemos: from an APK to one Java method',
    line: 'Classes, one overload, and callers. The APK was not executed.',
    preview: "Pull request 738 uses the real ApiDemos APK to list classes, choose an overload and trace callers through JADX. The write-up says the APK was not executed.",
    mark: 'APK',
    sources: [{ label: 'Pull request', url: 'https://github.com/morluto/rea/pull/738' }]
  },
  {
    id: 'harmony-hap',
    kind: 'rea',
    title: 'A HarmonyOS package inventory',
    line: 'Components and hashes from a published HAP. Ark bytecode stayed unread.',
    preview: "Pull request 1447 checks a published HAP and compares CLI and MCP inventories of components, hashes and runtime clues. The case notes say Ark bytecode was not decoded.",
    mark: 'HAP',
    sources: [{ label: 'Pull request', url: 'https://github.com/morluto/rea/pull/1447' }]
  },
  {
    id: 'psp-allegrex',
    kind: 'rea',
    title: 'PSP programs: teach Ghidra the processor',
    line: 'Allegrex support, checked on a program the contributor compiled.',
    preview: "Issue 1330 asks for Allegrex support. Pull request 1599 connects a Ghidra extension and checks known functions on a PSP program the contributor compiled.",
    mark: 'PSP',
    sources: [
      { label: 'Issue', url: 'https://github.com/morluto/rea/issues/1330' },
      { label: 'Pull request', url: 'https://github.com/morluto/rea/pull/1599' }
    ]
  },
  {
    id: 'mips-firmware',
    kind: 'rea',
    title: "Fix architecture detection for MIPS32 firmware",
    line: 'Four real MIPS32 firmware images needed the 32-bit setting.',
    preview: "Issue 1620 says automatic analysis chose a 64-bit processor for MIPS32 firmware and missed functions. Pull request 1898 sets the 32-bit language and compares four real firmware ELFs with a separate Ghidra export.",
    mark: 'MIPS',
    sources: [
      { label: 'Issue', url: 'https://github.com/morluto/rea/issues/1620' },
      { label: 'Pull request', url: 'https://github.com/morluto/rea/pull/1898' }
    ]
  },
  {
    id: 'firmware-fixtures',
    kind: 'rea',
    title: "Extract firmware files and pass them to Ghidra",
    line: "gzip, USTAR and ext4 fixtures.",
    preview: "Pull request 741 walks gzip, USTAR and ext4 images the contributor generated, checks extracted hashes, and hands one ELF to Ghidra.",
    mark: 'ELF',
    sources: [{ label: 'Pull request', url: 'https://github.com/morluto/rea/pull/741' }]
  },
  {
    id: 'masked-squares',
    kind: 'rea',
    title: "CTF: recover a program’s input validation rules",
    line: 'The recovered input was accepted. One changed character was rejected.',
    preview: "REA’s evidence file for a DownUnderCTF challenge says a recovered input was accepted by the original program and rejected after one character changed.",
    mark: 'CTF',
    sources: [{ label: 'Evidence note', url: 'https://github.com/morluto/rea/blob/main/website/evidence/ctf-masked-squares.md' }]
  },
  {
    id: 'touhou-method',
    kind: 'rea',
    title: 'Touhou rebuilds: a method, plus separate projects',
    line: 'REA’s note describes the check. Playable builds belong to other repositories.',
    preview: "REA’s method note describes recovering old Touhou executables into C++ and checking compiled output. Playable Linux, browser or Windows builds belong to the linked reconstruction projects. Our TH04 page is only the bullet-ring diagram.",
    mark: 'TH',
    lab: { href: '/cases/th04/', label: 'TH04 lab' },
    sources: [
      { label: 'Evidence note', url: 'https://github.com/morluto/rea/blob/main/website/evidence/touhou-reconstruction-method.md' },
      { label: 'Project page', url: 'https://github.com/N0zoM1z0/th04' }
    ]
  }
];

export const featuredNotes = fieldNotes.filter(note => note.featured);
