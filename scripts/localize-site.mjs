import {readFileSync,writeFileSync,readdirSync,mkdirSync} from 'node:fs';
import {dirname,join,relative} from 'node:path';
import {parse,parseFragment,serialize} from 'parse5';
import {locales as allLocales,key,normalized,attr,setAttr,walk,isText,languagePath,runtimeTexts} from './i18n-core.mjs';

// Optional subset is for local translation review only; the production build uses all languages.
const requested=process.argv.find(arg=>arg.startsWith('--locales='))?.slice(10).split(',');
if(requested?.some(id=>!allLocales.some(l=>l.id===id)))throw new Error('Unknown preview locale');
const locales=requested?allLocales.filter(l=>l.id==='en'||requested.includes(l.id)):allLocales;

const root='dist';
const origin='https://reatool.dev';
const source=JSON.parse(readFileSync('src/i18n/source.json','utf8'));
const paragraphOverrides=JSON.parse(readFileSync('src/i18n/paragraphs.json','utf8'));
const nodeText=node=>node.nodeName==='#text'?node.value:(node.childNodes??[]).map(nodeText).join('');
const translations=Object.fromEntries(locales.filter(l=>l.id!=='en').map(locale=>{
  const dictionary=JSON.parse(readFileSync(`src/i18n/locales/${locale.id}.json`,'utf8'));
  for(const [id,entry] of Object.entries(source)){
    if(typeof dictionary[id]!=='string')throw new Error(`${locale.id}: missing translation ${id}: ${entry.text}`);
    const placeholders=text=>[...text.matchAll(/\{\w+\}/g)].map(m=>m[0]).sort();
    if(JSON.stringify(placeholders(entry.text))!==JSON.stringify(placeholders(dictionary[id])))throw new Error(`${locale.id}: altered placeholders in ${id}`);
  }
  return [locale.id,dictionary];
}));
const files=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);
const english=files(root).filter(p=>p.endsWith('.html')&&!allLocales.slice(1).some(l=>p.startsWith(`dist/${l.id}/`))).map(file=>({
  path:'/'+relative(root,file).replace(/index\.html$/,''),html:readFileSync(file,'utf8'),file
}));
const routes=new Set(english.map(p=>p.path));
function translate(value,locale){
  if(locale.id==='en')return value;
  const text=normalized(value);if(!/[A-Za-z]/.test(text))return value;
  const translated=translations[locale.id][key(text)];
  if(translated===undefined)throw new Error(`Untranslated new text (${locale.id}): ${text}`);
  return value.slice(0,value.indexOf(value.trimStart()))+translated+(value.match(/\s*$/)?.[0]??'');
}
function localUrl(value,locale){
  if(!value.startsWith('/')&&!value.startsWith(origin+'/'))return value;
  const url=new URL(value,origin);if(url.origin!==origin||!routes.has(url.pathname))return value;
  const path=languagePath(locale.id,url.pathname)+url.search+url.hash;
  return value.startsWith(origin)?origin+path:path;
}
function appendHTML(node,html){const fragment=parseFragment(html);for(const child of fragment.childNodes){child.parentNode=node;node.childNodes.push(child);}}
const escape=value=>value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const urls=[];
for(const page of english)for(const locale of locales){
  const doc=parse(page.html);let head,header;
  const noindex=page.path==='/404.html';
  const canonical=origin+languagePath(locale.id,page.path);
  const paragraphs=[];
  walk(doc,node=>{
    if(node.tagName==='p'){
      const override=paragraphOverrides[locale.id]?.find(entry=>entry.source===normalized(nodeText(node)));
      if(override)paragraphs.push({node,override});
    }
  });
  walk(doc,(node,ancestors)=>{
    if(node.tagName==='html'){setAttr(node,'lang',locale.lang);setAttr(node,'data-locale',locale.id);}
    if(node.tagName==='head')head=node;
    if(node.tagName==='header'&&attr(node,'class')==='site-header')header=node;
    if(isText(node,ancestors)){
      node.value=translate(node.value,locale);
      if(['zh-cn','zh-tw','ja'].includes(locale.id))node.value=node.value.replace(/^\s+([。，、：；！？])/,'$1');
    }else if(node.nodeName==='#text'&&['zh-cn','zh-tw','ja'].includes(locale.id)&&ancestors.some(n=>n.tagName==='p')&&!ancestors.some(n=>['pre','code','script','style','svg','a'].includes(n.tagName))){
      const punctuation={'.':'。',',':'、',':':'：',';':'；'};
      if(punctuation[node.value.trim()])node.value=punctuation[node.value.trim()];
    }
    // Pure numeric table cells are outside the prose catalog. A comma is a
    // decimal separator in these languages, so remove ambiguous English grouping.
    if(node.nodeName==='#text'&&['es','fr','ru'].includes(locale.id)&&/^\s*\d{1,3}(?:,\d{3})+(?:\.\d+)?\s*$/.test(node.value)&&!ancestors.some(n=>['pre','code','script','style'].includes(n.tagName))){
      node.value=node.value.replace(/,/g,locale.id==='es'?'':locale.id==='fr'?'\u202f':'\u00a0');
    }
    for(const a of node.attrs??[]){
      if(['aria-label','title','alt','placeholder'].includes(a.name))a.value=translate(a.value,locale);
      if(a.name==='href')a.value=localUrl(a.value,locale);
      if(a.name==='data-copy'&&ancestors.some(n=>attr(n,'class')?.split(' ').includes('prompt-block')))a.value=translate(a.value,locale);
      if(node.tagName==='meta'&&a.name==='content'){
        const field=attr(node,'name')??attr(node,'property');
        if(['description','og:title','og:description'].includes(field))a.value=translate(a.value,locale);
        if(field==='og:url')a.value=canonical;
      }
    }
    if(node.tagName==='script'&&attr(node,'type')==='application/ld+json'){
      const data=JSON.parse(node.childNodes[0].value);
      function localSchema(value){
        if(Array.isArray(value))return value.map(localSchema);
        if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,
          k==='inLanguage'?locale.lang:
          typeof v==='string'&&(['name','headline','description'].includes(k)||(k==='text'&&value['@type']==='Answer'))?translate(v,locale):
          typeof v==='string'&&['url','@id','item','mainEntityOfPage'].includes(k)?localUrl(v,locale):localSchema(v)]));
        return value;
      }
      node.childNodes[0].value=JSON.stringify(localSchema(data)).replace(/</g,'\\u003c');
    }
  });
  for(const {node,override} of paragraphs){node.childNodes=[];appendHTML(node,override.html);}
  appendHTML(head,'<link rel="stylesheet" href="/i18n.css">');
  appendHTML(head,`<meta property="og:locale" content="${locale.og}">`);
  for(const other of locales.filter(l=>l.id!==locale.id))appendHTML(head,`<meta property="og:locale:alternate" content="${other.og}">`);
  if(!noindex){
    urls.push(canonical);
    for(const other of locales)appendHTML(head,`<link rel="alternate" hreflang="${other.lang}" href="${origin+languagePath(other.id,page.path)}">`);
    appendHTML(head,`<link rel="alternate" hreflang="x-default" href="${origin+page.path}">`);
  }
  const runtime=Object.fromEntries(runtimeTexts.map(value=>[value,translate(value,locale)]));
  appendHTML(head,`<script type="application/json" id="locale-messages">${JSON.stringify(runtime).replace(/</g,'\\u003c')}</script>`);
  const selector=parseFragment(`<details class="language-switch"><summary aria-label="${escape(translate('Language',locale))}">${locale.name}</summary><nav aria-label="${escape(translate('Language',locale))}">${locales.map(other=>`<a href="${languagePath(other.id,noindex?'/':page.path)}" lang="${other.lang}" hreflang="${other.lang}"${other.id===locale.id?' aria-current="true"':''}>${other.name}</a>`).join('')}</nav></details>`).childNodes[0];
  selector.parentNode=header;
  const menuIndex=header.childNodes.findIndex(n=>attr(n,'class')==='menu-button');
  header.childNodes.splice(menuIndex,0,selector);
  const destination=locale.id==='en'?page.file:join(root,locale.id,relative(root,page.file));
  mkdirSync(dirname(destination),{recursive:true});writeFileSync(destination,serialize(doc));
}
writeFileSync(join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(url=>`  <url><loc>${url}</loc><lastmod>2026-10-12</lastmod></url>`).join('\n')+'\n</urlset>\n');
const decode=value=>value.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
const meta=html=>decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1]??'');
const textOf=html=>decode(html.replace(/<br\s*\/?>/gi,' ').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim());
const heading=html=>textOf(html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]??'');
const sections=html=>[...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)].map(match=>textOf(match[1])).filter(Boolean);
const preferred=['/','/practice/','/compare/','/install/','/first-analysis/','/tutorials/','/about/'];
const listed=english.filter(page=>page.path!=='/404.html').sort((a,b)=>{
  const ai=preferred.indexOf(a.path),bi=preferred.indexOf(b.path);
  return (ai<0?preferred.length:ai)-(bi<0?preferred.length:bi)||a.path.localeCompare(b.path);
});
const linkLines=listed.map(page=>`- [${heading(page.html)}](${origin}${page.path}): ${meta(page.html)}`);
const llms=['# REA Tool','','> Independent, unofficial tutorials for REA (Reverse Engineer Anything), an MCP server and CLI from morluto/rea. This site is not affiliated with the REA maintainers.','','Official project: https://github.com/morluto/rea','Official setup: https://rea.tools/get-started','Official docs mirror: https://morluto.github.io/rea/','','The same pages are also published under /zh-cn/, /zh-tw/, /ja/, /ko/, /ru/, /es/, and /fr/.','','## Pages','',...linkLines,''].join('\n');
const full=['# REA Tool','','> Longer outline of the independent REA tutorial site. Not affiliated with morluto or the REA maintainers. Facts about REA itself should be checked against the official docs linked above each page’s sources.','','## Pages','',...listed.flatMap(page=>{
  const outline=sections(page.html).map(item=>`  - ${item}`);
  return [`### ${heading(page.html)}`,`URL: ${origin}${page.path}`,meta(page.html),...outline,''];
})].join('\n');
writeFileSync(join(root,'llms.txt'),llms);
writeFileSync(join(root,'llms-full.txt'),full);
console.log(`Localized ${english.length} pages in ${locales.length} languages; ${urls.length} indexable URLs.`);
