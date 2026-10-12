import assert from 'node:assert/strict';
import { writeFileSync, mkdirSync } from 'node:fs';
import slugify from 'slugify';
const cases = [
  {input:'Déjà Vu!',options:{},expected:'Deja-Vu!'},
  {input:'Déjà Vu!',options:{lower:true},expected:'deja-vu!'},
  {input:'Déjà Vu!',options:{lower:true,strict:true},expected:'deja-vu'},
  {input:'  hello   world  ',options:{},expected:'hello-world'},
  {input:'Rock & Roll',options:{},expected:'Rock-and-Roll'},
  {input:'Äpfel',options:{locale:'de',lower:true},expected:'aepfel'},
  {input:'',options:{},expected:''},
];
const results=cases.map(test=>{const actual=slugify(test.input,test.options);assert.equal(actual,test.expected);return {...test,actual,passed:true};});
assert.throws(()=>slugify(42),/slugify: string argument expected/);
results.push({input:42,options:{},expectedError:'slugify: string argument expected',passed:true});
const report={package:'slugify',version:'1.6.6',verifiedDate:'2026-10-12',runtime:process.version,platform:process.platform,architecture:process.arch,total:results.length,passed:results.length,results};
mkdirSync('public/evidence',{recursive:true});
writeFileSync('public/evidence/slugify-checks.json',JSON.stringify(report,null,2)+'\n');
console.log(`${results.length}/${results.length} checks passed against slugify 1.6.6.`);
