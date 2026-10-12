import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {parse} from 'parse5';
import assert from 'node:assert/strict';
import {locales,attr,walk,languagePath,runtimeTexts,key,normalized} from './i18n-core.mjs';
const root='dist',origin='https://reatool.dev';
const source=JSON.parse(readFileSync('src/i18n/source.json','utf8'));
const files=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);
const englishFiles=files(root).filter(p=>p.endsWith('.html')&&!locales.slice(1).some(l=>p.startsWith(`${root}/${l.id}/`)));
function nodes(doc,test){const result=[];walk(doc,(node,ancestors)=>{if(test(node,ancestors))result.push(node);});return result;}
function content(node){return node.nodeName==='#text'?node.value:(node.childNodes??[]).map(content).join('');}
function codeBlocks(doc){return nodes(doc,(n,a)=>n.tagName==='pre'&&!a.some(p=>attr(p,'class')?.includes('prompt-block'))).map(content);}
function inlineCode(doc){return nodes(doc,(n,a)=>n.tagName==='code'&&!a.some(p=>['pre','script'].includes(p.tagName))).map(content).sort();}
let verified=0;
for(const locale of locales){
 if(locale.id!=='en'){
  const dictionary=JSON.parse(readFileSync(`src/i18n/locales/${locale.id}.json`,'utf8'));
  assert.deepEqual(Object.keys(dictionary).sort(),Object.keys(source).sort(),`${locale.id}: keys differ`);
  for(const [id,e]of Object.entries(source)){
   assert.equal(typeof dictionary[id],'string');
   assert(!/^(?:(?:TODO|TRANSLATE)(?:\s*[:：]|\s*$)|未翻译)/i.test(dictionary[id]),`${locale.id}: placeholder ${id}`);
   if(!dictionary[id].trim())assert(['The','A'].includes(e.text),`${locale.id}: missing prose ${id}`);
  }
 }
 for(const file of englishFiles){
  const path='/'+file.slice(root.length+1).replace(/index\.html$/,'');
  const target=locale.id==='en'?file:join(root,locale.id,file.slice(root.length+1));
  const doc=parse(readFileSync(target,'utf8'));
  assert.equal(attr(nodes(doc,n=>n.tagName==='html')[0],'lang'),locale.lang);
  const alternates=nodes(doc,n=>n.tagName==='link'&&attr(n,'rel')==='alternate');
  if(path!=='/404.html'){
   assert.equal(alternates.length,9,`${target}: alternate count`);
   for(const other of locales)assert(alternates.some(n=>attr(n,'hreflang')===other.lang&&attr(n,'href')===origin+languagePath(other.id,path)),`${target}: missing reciprocal language`);
   assert(alternates.some(n=>attr(n,'hreflang')==='x-default'&&attr(n,'href')===origin+path));
  }
  const switchLinks=nodes(doc,(n,a)=>n.tagName==='a'&&a.some(p=>attr(p,'class')==='language-switch'));
  assert.equal(switchLinks.length,8);
  for(const other of locales)assert(switchLinks.some(n=>attr(n,'href')===languagePath(other.id,path==='/404.html'?'/':path)),`${target}: language switch loses subpage`);
  const runtime=JSON.parse(content(nodes(doc,n=>attr(n,'id')==='locale-messages')[0]));
  for(const message of runtimeTexts){assert.equal(typeof runtime[message],'string');if(locale.id!=='en')assert.equal(runtime[message],JSON.parse(readFileSync(`src/i18n/locales/${locale.id}.json`,'utf8'))[key(normalized(message))]);}
  const english=parse(readFileSync(file,'utf8'));
  assert.deepEqual(codeBlocks(doc),codeBlocks(english),`${target}: executable code was translated`);
  assert.deepEqual(inlineCode(doc),inlineCode(english),`${target}: inline code changed`);
  assert(nodes(doc,(n,a)=>n.tagName==='a'&&a.some(p=>p.tagName==='footer')).some(n=>content(n).trim()==='reatool.dev'),`${target}: brand punctuation changed`);
  for(const prompt of nodes(doc,n=>attr(n,'class')?.split(' ').includes('prompt-block'))){
   const copy=nodes(prompt,n=>attr(n,'data-copy')!==undefined)[0];
   const pre=nodes(prompt,n=>n.tagName==='pre')[0];
   assert.equal(normalized(attr(copy,'data-copy')),normalized(content(pre)),`${target}: prompt clipboard differs`);
  }
  for(const link of nodes(doc,(n,a)=>n.tagName==='a'&&!a.some(p=>attr(p,'class')==='language-switch'))){
   const href=attr(link,'href');if(!href?.startsWith('/')||locale.id==='en'||href.startsWith('/downloads/')||href.startsWith('/evidence/'))continue;
   assert(href.startsWith(`/${locale.id}/`),`${target}: leaks to other language ${href}`);
  }
  verified++;
 }
}
console.log(`${verified} localized pages verified: complete catalogs, language-preserving links, reciprocal alternates, unchanged code and matching copy prompts.`);
