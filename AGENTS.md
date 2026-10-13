# REA Tool 项目协作指南

本文件适用于整个仓库。开始修改前，先检查 `git status`，阅读与任务相关的源码和说明，保留已有的无关改动。

## 产品与表达

- 本站是 REA（Reverse Engineer Anything）的独立教程网站，不是官方站点。保留独立社区站点说明。
- 一级关键词是 **REA**。安装、使用方法、逆向工程和具体案例作为各语言的辅助关键词，自然融入标题、描述和正文。
- 内容要直接、具体、可操作：说明用户能做什么、如何开始、预期结果和实际验证范围。避免夸大能力或堆砌术语。
- 保留黑底、红色主色、WebGPU 拆解视觉和已有交互。不使用火焰元素，不擅自改成白色主题。
- 首页保留 AI 快捷安装入口：复制提示词 → 交给 Claude Code / Codex / Cursor → 安装、重启并验证。不要将复制提示词描述为浏览器已经完成安装。
- 案例必须区分上游报告、本站教学实现和本站实际执行的验证。单个函数通过测试不代表整个应用已重建。

## 技术结构

- Astro 静态站点，TypeScript、原生浏览器交互和 Three.js；构建结果在 `dist/`。
- 使用 npm 和已提交的 `package-lock.json`；Node.js 版本参见 `.node-version` 与 `package.json`。首次安装使用 `npm ci`。
- 页面：`src/pages/`；通用布局：`src/layouts/`；组件：`src/components/`。
- 教程、案例与 SEO 数据：`src/data/`；交互：`src/scripts/`；封面视觉：`src/visual/`。
- 公共资源、可下载示例、证据和许可证：`public/`。保留来源链接及许可证。
- 不直接修改 `dist/`，不提交 `node_modules/`、`.astro/`、`.wrangler/` 或环境变量、凭据。

## 多语言修改流程

英文保留根路径；其他语言为 `/zh-cn/`、`/zh-tw/`、`/ja/`、`/ko/`、`/ru/`、`/es/`、`/fr/`。所有首页、教程、案例和辅助页面都要同步。

这是构建时生成静态 HTML 的方案，不是浏览器翻译插件：

- `scripts/localize-site.mjs`：本地化页面、链接、搜索标签和结构化数据。
- `src/i18n/source.json`：根据英文文本提取的哈希键与上下文。
- `src/i18n/locales/*.json`：七种语言的完整翻译。
- `src/i18n/paragraphs.json`：需要重排内联代码、链接语序时的整段译文。
- `scripts/i18n-core.mjs` 与 `src/lib/i18n.ts`：动态交互文案清单和插值；新增动态消息时同步维护。

修改英文文案后，按以下顺序更新，避免从已经本地化的产物重复提取：

```sh
npm run build:english
node scripts/extract-i18n.mjs
# 补齐所有语言的新键，移除过期键，再执行完整构建。
npm run build
```

- 翻译完整正文、元数据、按钮、无障碍标签、提示词和动态反馈。不要发布缺译或用英文正文兜底的版本。
- CLI 命令、工具标识符、代码、版本、URL 和数值含义保持准确。提示词可以翻译，但其中的可执行命令不能改写。
- 复核内联代码或链接前后的语序、空格和标点；繁中使用相应用语，不仅做字形转换。
- 复制结果必须与页面展示的提示词一致。切换语言保留当前子页面，站内导航保留当前语言。
- 每个译文页面使用自身 canonical，并提供对应页面的 hreflang 和英文 x-default。结构化数据和 sitemap 一并维护。
- 默认 canonical 主机为 `https://reatool.dev`，不要因为预览运行在 `pages.dev` 就改掉。

## 验证

涉及页面、文案、翻译或交互的修改，运行：

```sh
npm run check
npm run build
npm run verify:site
npm run verify:seo
npm run verify:i18n
```

算法或案例逻辑有变更时，再运行对应的 `npm run verify:case`、`npm run verify:totp` 或 `npm run verify:labs`。最后一个命令会重新生成案例验证结果文件，提交前检查变化。

`npm run dev` 用于英文源码开发；完整多语言界面使用 `npm run build` 后的 `npm run preview` 检查。UI 变更要在浏览器验证桌面与窄屏、长译文、语言切换和复制反馈。保留键盘操作与减少动态效果的支持。仅文档修改无需重复构建整站。

## Git 与发布

- GitHub 私库：`ZooHero500/reatool`，默认分支 `main`。提交本次任务相关文件，推送后确认远端提交与本地一致。
- Cloudflare Pages 项目：`reatool`。当前使用 Wrangler Direct Upload；GitHub 推送不等于网站自动部署。
- 发布网站更新时，先完成相关验证，再执行：

```sh
npm run deploy
```

- `deploy` 会依次执行源码检查、完整构建、站点/SEO/多语言验证，全部通过后再上传到生产环境。
- 发布后验证线上页面、资源和关键交互，并更新 `DEPLOYMENT.md` 中的部署信息。
- 用户自行绑定自定义域名，不擅自修改域名或 DNS。
- 详细说明见 `README.md`、`MULTILINGUAL.md`、`DEPLOYMENT.md` 及各项 `*VERIFICATION.md`。历史验收记录不能代替新改动的验证。
