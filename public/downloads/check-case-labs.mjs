import assert from 'node:assert/strict';
import {advanceSpeed,replaySpeed,ringAngles,screenPan,percentCalculation} from './case-lab-rules.mjs';

export function runChecks() {
  const checkpoints=[[0,'6.000'],[1000,'7.000'],[4000,'10.000'],[7000,'13.000'],[10000,'13.001']];
  for(const [n,expected] of checkpoints)assert.equal(replaySpeed(n).toFixed(3),expected);
  assert.equal(advanceSpeed(13),13);assert.equal(advanceSpeed(18),18);
  assert.throws(()=>replaySpeed(-1),RangeError);
  assert.deepEqual(ringAngles(16),[0,16,32,48,64,80,96,112,128,144,160,176,192,208,224,240]);
  assert.deepEqual(ringAngles(12),[0,21,42,64,85,106,128,149,170,192,213,234]);
  assert.deepEqual(ringAngles(4,0,-1),[255,63,127,191]);
  assert.deepEqual(ringAngles(4,250),[250,58,122,186]);
  assert.throws(()=>ringAngles(0),RangeError);
  let ringCases=0;
  for(const count of [8,12,16,32])for(let aim=0;aim<256;aim++)for(const rotation of [-1,0,255]){
    const angles=ringAngles(count,aim,rotation);
    assert.equal(new Set(angles).size,count);
    for(let i=0;i<count;i++){
      // Integer reference avoids reusing the UI's floating-point expression.
      const quotient=Number(BigInt(i)*256n/BigInt(count));
      assert.equal(angles[i],(quotient+aim+rotation+512)&255);
    }
    ringCases++;
  }
  let panCases=0;
  for(const [num,den] of [[0,1],[1,2],[1,1],[20,1],[-1,1]])for(let x=0;x<=640;x++){
    // 1.5625 = 25/16; BigInt division truncates toward zero.
    const rational=Number(((BigInt(x)*25n-8000n)*BigInt(num))/(16n*BigInt(den)));
    assert.equal(screenPan(x,num/den),rational);panCases++;
  }
  const percentages=[[200,10,'+',20,220],[200,10,'-',20,180],[200,10,'*',.1,20],[200,10,'/',.1,2000],[50,20,'+',10,60],[6,6,'*',.06,.36],[-200,10,'+',-20,-220],[0,10,'+',0,0],[200,0,'/',0,null],[.5,10,'+',.05,.55]];
  for(const [a,b,operator,operand,result] of percentages){const actual=percentCalculation(a,b,operator);assert.equal(actual.operand,operand);assert.equal(actual.result,result);}
  assert.throws(()=>percentCalculation(NaN,10,'+'),RangeError);
  assert.throws(()=>percentCalculation(200,10,'?'),RangeError);
  return {status:'passed',dino:{checkpoints:checkpoints.length,scope:'This implementation versus upstream recorded displays'},ring:{cases:ringCases,scope:'Ring arithmetic only; no original iatan2 or DOS execution'},pan:{cases:panCases,scope:'JavaScript versus independent rational arithmetic; no original x86 execution'},calculator:{cases:percentages.length,scope:'Two-operand numeric rules; no Windows GUI execution'}};
}
console.log(JSON.stringify(runChecks(),null,2));
