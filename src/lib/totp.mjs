// Independently authored RFC 6238 teaching implementation. Public test key only.
const keyBytes=new TextEncoder().encode('12345678901234567890');
/** @param {number} seconds @param {number} digits */
export async function testCode(seconds,digits=6){
  if(!Number.isSafeInteger(seconds)||seconds<0||![6,8].includes(digits))throw new RangeError('Invalid test input');
  const counter=new Uint8Array(8);new DataView(counter.buffer).setBigUint64(0,BigInt(Math.floor(seconds/30)),false);
  const key=await crypto.subtle.importKey('raw',keyBytes,{name:'HMAC',hash:'SHA-1'},false,['sign']);
  const hash=new Uint8Array(await crypto.subtle.sign('HMAC',key,counter));
  const offset=hash[hash.length-1]&15;
  const number=new DataView(hash.buffer).getUint32(offset,false)&0x7fffffff;
  return String(number%10**digits).padStart(digits,'0');
}
