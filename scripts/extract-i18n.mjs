import {readFileSync,writeFileSync,readdirSync,mkdirSync} from 'node:fs';
import {join,relative} from 'node:path';
import {parse} from 'parse5';
import {key,normalized,attr,walk,isText,runtimeTexts} from './i18n-core.mjs';
const entries={};
function add(value,context){const text=normalized(value);if(!/[A-Za-z]/.test(text))return;const id=key(text);entries[id]??={text,contexts:[]};if(!entries[id].contexts.includes(context))entries[id].contexts.push(context);}
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);}
for(const file of files('dist').filter(f=>f.endsWith('.html')&&!/^dist\/(zh-cn|zh-tw|ja|ko|ru|es|fr)\//.test(f))){
 const path='/'+relative('dist',file).replace(/index\.html$/,'');const doc=parse(readFileSync(file,'utf8'));
 walk(doc,(node,ancestors)=>{
  if(isText(node,ancestors))add(node.value,`${path} ${ancestors.at(-1)?.tagName}`);
  for(const a of node.attrs??[]){
   if(['aria-label','title','alt','placeholder'].includes(a.name))add(a.value,`${path} ${a.name}`);
   if(node.tagName==='meta'&&a.name==='content'&&['description','og:title','og:description'].includes(attr(node,'name')??attr(node,'property')))add(a.value,`${path} metadata`);
  }
  if(node.tagName==='script'&&attr(node,'type')==='application/ld+json'){
   function schema(value){if(Array.isArray(value))value.forEach(schema);else if(value&&typeof value==='object')for(const [k,v]of Object.entries(value)){if((['name','headline','description'].includes(k)||(k==='text'&&value['@type']==='Answer'))&&typeof v==='string')add(v,`${path} schema`);else schema(v);}}
   schema(JSON.parse(node.childNodes[0].value));
  }
 });
}
runtimeTexts.forEach(text=>add(text,'runtime'));
mkdirSync('src/i18n/locales',{recursive:true});
writeFileSync('src/i18n/source.json',JSON.stringify(entries,null,2)+'\n');
console.log(`${Object.keys(entries).length} translation units; ${Object.values(entries).reduce((n,e)=>n+e.text.split(' ').length,0)} source words`);
