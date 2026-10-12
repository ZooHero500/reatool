import {createHash} from 'node:crypto';
export const locales = [
  {id:'en',lang:'en',name:'English',og:'en_US'},
  {id:'zh-cn',lang:'zh-Hans',name:'简体中文',og:'zh_CN'},
  {id:'zh-tw',lang:'zh-Hant',name:'繁體中文',og:'zh_TW'},
  {id:'ja',lang:'ja',name:'日本語',og:'ja_JP'},
  {id:'ko',lang:'ko',name:'한국어',og:'ko_KR'},
  {id:'ru',lang:'ru',name:'Русский',og:'ru_RU'},
  {id:'es',lang:'es',name:'Español',og:'es_ES'},
  {id:'fr',lang:'fr',name:'Français',og:'fr_FR'},
];
export const key = text => createHash('sha256').update(text).digest('hex').slice(0,12);
export const normalized = text => text.replace(/\s+/g,' ').trim();
export const attr = (node,name) => node.attrs?.find(a=>a.name===name)?.value;
export function setAttr(node,name,value){const item=node.attrs.find(a=>a.name===name);if(item)item.value=value;else node.attrs.push({name,value});}
export function walk(node,fn,ancestors=[]){fn(node,ancestors);for(const child of node.childNodes??[])walk(child,fn,[...ancestors,node]);}
export function isText(node,ancestors){
  if(node.nodeName!=='#text'||!/[a-zA-Z]/.test(node.value))return false;
  const prompt=ancestors.some(n=>attr(n,'class')?.split(' ').includes('prompt-block'));
  return !ancestors.some(n=>['script','style'].includes(n.tagName)||(!prompt&&['pre','code'].includes(n.tagName))||attr(n,'translate')==='no');
}
export const languagePath = (id,path) => id==='en'?path:`/${id}${path}`;
export const runtimeTexts = [
  'Language','Copy','Copied','Select text','Copied to clipboard.','Copy unavailable. Select and copy the command manually.',
  'Open navigation','Close navigation','Pause visual animation','Play visual animation','Pause motion','Play motion',
  '{count} guide','{count} guides',
  'floor({seconds} ÷ 30) = {counter}. The same counter produces the same code.',
  'This demo needs WebCrypto on HTTPS or localhost.',
  '(empty)','Enter a title to generate a URL slug.','Punctuation is removed. Compare the options with the walkthrough.','Try “Remove punctuation” and compare the generated URL.',
  'Paused. Press Play to continue.','Play','Pause','Hit the obstacle. Press Restart to try again.','Collision. Try jumping a little earlier.',
  'Running. Jump, or focus the game and press Space.','Ready. Press Play for another run.','Ready when you are.',
  'Fixed speed {speed}. Automatic acceleration is off.','Automatic mode starts again at 6.000.','Fixed speed {speed}.',
  'Paused while the game is offscreen. Press Play to continue.',
  '{count} bullets. First angle: {angle} / 256. {detail}',
  'Player at origin: aim set to zero for this illustration.','Change to 12 bullets to see integer rounding.',
  'Ring shown at its end position. Reduced motion is enabled.',
  'Audio preview is clamped to left/right. The integer above keeps its full value.',
  'Press Play to hear this position. Headphones work best.','Tone finished. Move the brick and compare.','Playing a short stereo tone…',
  'Audio is unavailable in this browser. The position and calculation still work.',
  'Enter two numbers between −1 billion and 1 billion.','Waiting for two numbers','Complete both fields to continue.',
  'Undefined','01 / ENTER','02 / PERCENT','03 / EQUALS',
  'Press % to see what happens to the second number.','{input} becomes {operand}. Now press =.',
  'Division by zero has no finite result.','For + and −, the percentage is relative to {base}.','For × and ÷, the second number is divided by 100.',
];
