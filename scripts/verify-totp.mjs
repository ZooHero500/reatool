import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {testCode} from '../src/lib/totp.mjs';
const vectors=[[59,'94287082'],[1111111109,'07081804'],[1111111111,'14050471'],[1234567890,'89005924'],[2000000000,'69279037'],[20000000000,'65353130']];
for(const [time,code] of vectors){assert.equal(await testCode(time,8),code);assert.equal(await testCode(time,6),code.slice(-6));}
for(let t=0;t<=120;t++){const b=Buffer.alloc(8);b.writeBigUInt64BE(BigInt(Math.floor(t/30)));const h=createHmac('sha1','12345678901234567890').update(b).digest();const n=h.readUInt32BE(h[19]&15)&0x7fffffff;assert.equal(await testCode(t),String(n%1000000).padStart(6,'0'));}
assert.equal(await testCode(59),'287082');assert.equal(await testCode(60),'359152');
await assert.rejects(()=>testCode(-1),RangeError);
console.log('TOTP: 12 RFC vector checks + 121 per-second comparisons + boundary and invalid-input checks passed.');
