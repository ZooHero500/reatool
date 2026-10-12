import {t} from '../lib/i18n';
import {advanceSpeed, ringAngles, screenPan, percentCalculation} from '../../public/downloads/case-lab-rules.mjs';

export function initCaseLab() {
  const root = document.querySelector<HTMLElement>('[data-lab]');
  if (!root) return;
  const el = <T extends Element = HTMLElement>(id:string) => root.querySelector<T>(`#${id}`)!;
  const text = (id:string, value:string) => { el(id).textContent=t(value); };
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if (root.dataset.lab==='dino') {
    const play=el<HTMLButtonElement>('dino-play'), jump=el<HTMLButtonElement>('dino-jump');
    const slider=el<HTMLInputElement>('dino-slider'), auto=el<HTMLInputElement>('dino-auto');
    let running=false, crashed=false, speed=6, x=530, height=0, velocity=0, cleared=0, frame=0, last=0, accumulator=0;
    function draw() {
      el('dino-player').setAttribute('transform',`translate(0 ${-height})`);
      el('dino-obstacle').setAttribute('transform',`translate(${x} 0)`);
      text('dino-speed',speed.toFixed(3)); text('dino-score',String(cleared));
    }
    function pause(message='Paused. Press Play to continue.') {
      running=false; cancelAnimationFrame(frame); play.textContent=t('Play'); jump.disabled=true;
      text('dino-status',message);
    }
    function tick(now:number) {
      if (!running) return;
      accumulator+=Math.min(now-last,100);last=now;
      while(accumulator>=1000/60 && running){
        accumulator-=1000/60;x-=speed;
        if(height>0||velocity>0){height=Math.max(0,height+velocity);velocity-=.65;}
        if(x<96 && x+26>63 && height<49){crashed=true;pause('Hit the obstacle. Press Restart to try again.');text('dino-overlay','Collision. Try jumping a little earlier.');break;}
        if(auto.checked)speed=advanceSpeed(speed);
        if(x < -28){x=640;cleared++;}
      }
      draw(); if(running)frame=requestAnimationFrame(tick);
    }
    function start(){if(crashed)return;running=true;last=performance.now();accumulator=0;play.textContent=t('Pause');jump.disabled=false;text('dino-overlay','');text('dino-status','Running. Jump, or focus the game and press Space.');frame=requestAnimationFrame(tick);}
    function reset(){pause('Ready. Press Play for another run.');crashed=false;speed=auto.checked?6:Number(slider.value);height=velocity=cleared=0;x=530;text('dino-overlay','Ready when you are.');draw();}
    function hop(){if(running&&height===0)velocity=11.5;}
    play.addEventListener('click',()=>{if(crashed){reset();start();}else if(running)pause();else start();});
    jump.addEventListener('click',hop);el('dino-reset').addEventListener('click',reset);
    slider.addEventListener('input',()=>{auto.checked=false;speed=Number(slider.value);draw();text('dino-status',t('Fixed speed {speed}. Automatic acceleration is off.',{speed:speed.toFixed(1)}));});
    auto.addEventListener('change',()=>{if(auto.checked){speed=6;text('dino-status','Automatic mode starts again at 6.000.');}else{speed=Number(slider.value);text('dino-status',t('Fixed speed {speed}.',{speed:speed.toFixed(1)}));}draw();});
    root.querySelector('.dino-stage')!.addEventListener('keydown',event=>{const e=event as KeyboardEvent;if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();hop();}});
    const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&running)pause('Paused while the game is offscreen. Press Play to continue.');});observer.observe(root);
    document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)pause();});
    window.addEventListener('pagehide',()=>{pause();observer.disconnect();},{once:true});
    draw();
  }
  if(root.dataset.lab==='th04') {
    const stage=el<SVGSVGElement>('ring-stage'), x=el<HTMLInputElement>('ring-x'), y=el<HTMLInputElement>('ring-y'), count=el<HTMLSelectElement>('ring-count'), rotation=el<HTMLInputElement>('ring-rotation');
    const ns='http://www.w3.org/2000/svg';let angles:number[]=[], frame=0, dragging=false;
    function svg(name:string, attrs:Record<string,string>){const node=document.createElementNS(ns,name);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,value);return node;}
    function bullets(radius:number){const group=el('ring-bullets');group.replaceChildren(...angles.map((a,i)=>{const r=a/256*Math.PI*2;return svg('circle',{cx:String(320+Math.cos(r)*radius),cy:String(170+Math.sin(r)*radius),r:i===0?'5':'3.5',fill:i===0?'#ffe0e8':'#f54c70'});}));}
    function update(){
      cancelAnimationFrame(frame);const dx=Number(x.value)-320,dy=Number(y.value)-170;
      const aim=dx===0&&dy===0?0:((Math.round(Math.atan2(dy,dx)/(2*Math.PI)*256)%256)+256)%256;
      angles=ringAngles(Number(count.value),aim,Number(rotation.value));
      el('ring-player').setAttribute('transform',`translate(${x.value} ${y.value})`);
      el('ring-rays').replaceChildren(...angles.map((a,i)=>{const r=a/256*Math.PI*2;return svg('line',{x1:'320',y1:'170',x2:String(320+Math.cos(r)*120),y2:String(170+Math.sin(r)*120),stroke:i===0?'#ff879f':'#69263d','stroke-width':i===0?'2':'1'});}));
      bullets(100);text('ring-aim',String(aim));text('ring-rotation-value',rotation.value);
      text('ring-status',t('{count} bullets. First angle: {angle} / 256. {detail}',{count:count.value,angle:angles[0],detail:t(dx===0&&dy===0?'Player at origin: aim set to zero for this illustration.':'Change to 12 bullets to see integer rounding.')}));
    }
    [x,y,count,rotation].forEach(input=>input.addEventListener('input',update));
    function move(e:PointerEvent){const bounds=stage.getBoundingClientRect();x.value=String(Math.round((e.clientX-bounds.left)/bounds.width*640));y.value=String(Math.round((e.clientY-bounds.top)/bounds.height*340));update();}
    stage.addEventListener('pointerdown',e=>{dragging=true;stage.setPointerCapture(e.pointerId);move(e);});
    stage.addEventListener('pointermove',e=>{if(dragging)move(e);});stage.addEventListener('pointerup',()=>{dragging=false;});stage.addEventListener('pointercancel',()=>{dragging=false;});
    el('ring-reset').addEventListener('click',()=>{x.value='440';y.value='290';count.value='16';rotation.value='0';update();});
    el('ring-fire').addEventListener('click',()=>{cancelAnimationFrame(frame);if(reduced.matches){bullets(145);text('ring-status','Ring shown at its end position. Reduced motion is enabled.');return;}const start=performance.now();function fire(now:number){const t=Math.min((now-start)/1000,1);bullets(20+t*125);if(t<1)frame=requestAnimationFrame(fire);}frame=requestAnimationFrame(fire);});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(frame);});window.addEventListener('pagehide',()=>cancelAnimationFrame(frame),{once:true});update();
  }
  if(root.dataset.lab==='dx-ball') {
    const x=el<HTMLInputElement>('pan-x'),scale=el<HTMLSelectElement>('pan-scale'),play=el<HTMLButtonElement>('pan-play');
    let context:AudioContext|undefined;let busy=false;
    function update(){const value=screenPan(Number(x.value),Number(scale.value));const normalized=Math.max(-1,Math.min(1,value/500));text('pan-position',x.value);text('pan-value',String(value));el('pan-brick').style.left=`${Number(x.value)/640*100}%`;el('pan-left').style.width=`${(1-normalized)/2*100}%`;el('pan-right').style.width=`${(1+normalized)/2*100}%`;text('pan-equation',`trunc((${x.value} × 1.5625 − 500) × ${scale.value}) = ${value}`);text('pan-status',Math.abs(value)>500?'Audio preview is clamped to left/right. The integer above keeps its full value.':'Press Play to hear this position. Headphones work best.');}
    x.addEventListener('input',update);scale.addEventListener('change',update);root.querySelectorAll<HTMLButtonElement>('[data-pan]').forEach(b=>b.addEventListener('click',()=>{x.value=b.dataset.pan!;update();}));
    play.addEventListener('click',async()=>{if(busy)return;busy=true;play.disabled=true;
      try{context??=new AudioContext();await context.resume();const oscillator=context.createOscillator(),gain=context.createGain(),pan=context.createStereoPanner();const now=context.currentTime;pan.pan.value=Math.max(-1,Math.min(1,screenPan(Number(x.value),Number(scale.value))/500));oscillator.frequency.setValueAtTime(660,now);oscillator.frequency.exponentialRampToValueAtTime(330,now+.18);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.12,now+.015);gain.gain.exponentialRampToValueAtTime(.0001,now+.3);oscillator.connect(gain).connect(pan).connect(context.destination);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();pan.disconnect();busy=false;play.disabled=false;text('pan-status','Tone finished. Move the brick and compare.');};oscillator.start();oscillator.stop(now+.32);text('pan-status','Playing a short stereo tone…');}
      catch{busy=false;play.disabled=false;text('pan-status','Audio is unavailable in this browser. The position and calculation still work.');}
    });window.addEventListener('pagehide',()=>{void context?.close();},{once:true});update();
  }
  if(root.dataset.lab==='calculator') {
    const base=el<HTMLInputElement>('calc-base'), entry=el<HTMLInputElement>('calc-entry'), percent=el<HTMLButtonElement>('calc-percent'), equals=el<HTMLButtonElement>('calc-equals');
    let operator='+', step=0;const symbols:Record<string,string>={'+':'+','-':'−','*':'×','/':'÷'};
    const format=(n:number)=>String(Number(n.toPrecision(10)));
    function update(){const a=base.valueAsNumber,b=entry.valueAsNumber;const valid=base.validity.valid&&entry.validity.valid&&Number.isFinite(a)&&Number.isFinite(b);base.setAttribute('aria-invalid',String(!Number.isFinite(a)||!base.validity.valid));entry.setAttribute('aria-invalid',String(!Number.isFinite(b)||!entry.validity.valid));percent.disabled=!valid||step>0;equals.disabled=!valid||step!==1;
      if(!valid){text('calc-result','—');text('calc-status','Enter two numbers between −1 billion and 1 billion.');text('calc-expression','Waiting for two numbers');text('calc-explanation','Complete both fields to continue.');return;}
      const {operand,result}=percentCalculation(a,b,operator);text('calc-expression',`${format(a)} ${symbols[operator]} ${format(b)}%`);text('calc-result',step===0?format(b):step===1?format(operand):result===null?'Undefined':format(result));text('calc-step',['01 / ENTER','02 / PERCENT','03 / EQUALS'][step]);
      text('calc-explanation',step===0?'Press % to see what happens to the second number.':step===1?t('{input} becomes {operand}. Now press =.',{input:format(b),operand:format(operand)}):result===null?'Division by zero has no finite result.':`${format(a)} ${symbols[operator]} ${format(operand)} = ${format(result)}`);
      text('calc-status',operator==='+'||operator==='-'?t('For + and −, the percentage is relative to {base}.',{base:format(a)}):'For × and ÷, the second number is divided by 100.');
    }
    [base,entry].forEach(input=>input.addEventListener('input',()=>{step=0;update();}));root.querySelectorAll<HTMLButtonElement>('[data-operator]').forEach(button=>button.addEventListener('click',()=>{operator=button.dataset.operator!;step=0;root.querySelectorAll('[data-operator]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));update();}));
    percent.addEventListener('click',()=>{step=1;update();});equals.addEventListener('click',()=>{step=2;update();});el('calc-reset').addEventListener('click',()=>{base.value='200';entry.value='10';operator='+';step=0;root.querySelectorAll<HTMLButtonElement>('[data-operator]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.operator==='+')));update();});update();
  }
}
