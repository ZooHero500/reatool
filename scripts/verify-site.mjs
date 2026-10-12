import {readFileSync,existsSync,readdirSync,statSync} from 'node:fs';
import {join,resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
import {locales} from './i18n-core.mjs';
const root=resolve('dist');
function files(dir){return readdirSync(dir).flatMap(name=>{const path=join(dir,name);return statSync(path).isDirectory()?files(path):[path]});}
const pages=files(root).filter(path=>path.endsWith('.html'));
let checked=0;
for(const file of pages){
  const html=readFileSync(file,'utf8');
  assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`${file}: needs exactly one h1`);
  const locale=locales.find(l=>file.startsWith(join(root,l.id)+'/'))??locales[0];
  assert(html.includes(`<html lang="${locale.lang}"`),`${file}: correct language missing`);
  assert.match(html,/<meta name="description" content="[^"]+"/,`${file}: description missing`);
  assert.match(html,/<link rel="canonical" href="https:\/\/reatool.dev\//,`${file}: canonical missing`);
  assert(!html.includes('/Users/'),`${file}: local path leaked`);
  for(const match of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)){
    const raw=match[1];if(!raw.startsWith('/'))continue;
    const url=new URL(raw,'https://reatool.dev');
    let target=join(root,decodeURIComponent(url.pathname));
    if(!extname(target))target=join(target,'index.html');
    assert(existsSync(target),`${file}: missing internal target ${raw}`);checked++;
    if(url.hash && target.endsWith('.html'))assert(readFileSync(target,'utf8').includes(`id="${url.hash.slice(1)}"`),`${file}: missing anchor ${raw}`);
  }
  for(const match of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${match[1]}"`),`${file}: missing local anchor ${match[1]}`);
  for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(match[1]);
}
for(const asset of ['robots.txt','sitemap.xml','llms.txt','llms-full.txt','404.html','_headers','_redirects','og.png','downloads/slugify-reproduction.zip'])assert(existsSync(join(root,asset)),`Missing ${asset}`);
console.log(`${pages.length} pages verified; ${checked} internal links/assets checked. Metadata, structured data and anchor targets passed.`);
