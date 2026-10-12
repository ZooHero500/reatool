// Native scrolling stays in charge; motion is a progressive enhancement.
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const header=document.querySelector<HTMLElement>('.site-header');
const cover=document.querySelector<HTMLElement>('.cover');
const article=document.querySelector<HTMLElement>('.guide-article');
const progress=document.querySelector<HTMLElement>('.reading-progress');
let frame=0,lastY=scrollY,directionY=scrollY;
const reveals=new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');reveals.unobserve(entry.target);}
},{threshold:.1,rootMargin:'0px 0px -25px 0px'});
document.querySelectorAll<HTMLElement>('.investigations .section-top,.feature-card,.example-copy,.example-section>.otp-demo,.more-guides .section-top,.more-guides .editorial-list>a,.learning-path .section-top,.lesson-link,.start-banner').forEach(element=>{
  if(reduce.matches)return;
  // Do not hide content already onscreen or focused when the enhancement loads.
  if(element.getBoundingClientRect().top<innerHeight){element.classList.add('is-visible');return;}
  element.classList.add('motion-reveal');
  const order=Array.from(element.parentElement!.children).indexOf(element);
  element.style.setProperty('--reveal-delay',`${element.matches('.feature-card,.lesson-link')?order*70:0}ms`);
  reveals.observe(element);
});
const headings=Array.from(document.querySelectorAll<HTMLElement>('.prose h2[id]'));
const toc=Array.from(document.querySelectorAll<HTMLAnchorElement>('.guide-sidebar nav a'));
function update(){
  frame=0;
  const y=scrollY;
  header?.toggleAttribute('data-scrolled',y>20);
  if(Math.abs(y-lastY)>2){
    if((y>lastY)!==(lastY>directionY))directionY=lastY;
    if(Math.abs(y-directionY)>28)header?.toggleAttribute('data-away',!!cover&&!reduce.matches&&y>lastY&&y>innerHeight*.8);
    lastY=y;
  }
  if(y<100||reduce.matches)header?.removeAttribute('data-away');
  if(cover){
    const p=reduce.matches?0:Math.min(1,Math.max(0,y/(cover.offsetHeight*.85)));
    cover.style.setProperty('--cover-drift',`${p*75}px`);
    cover.style.setProperty('--cover-scale',String(1-p*.1));
    cover.style.setProperty('--cover-opacity',String(1-p*.65));
  }
  if(article){
    const rect=article.getBoundingClientRect();
    const p=Math.min(1,Math.max(0,(innerHeight-rect.top)/(article.offsetHeight)));
    progress?.style.setProperty('--read-progress',String(p));
    const current=headings.filter(h=>h.getBoundingClientRect().top<=160).at(-1)||headings[0];
    for(const link of toc){if(link.hash===`#${current?.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}
  }
}
const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
reduce.addEventListener('change',()=>{
  if(reduce.matches){reveals.disconnect();document.querySelectorAll('.motion-reveal').forEach(el=>el.classList.add('is-visible'));document.getAnimations().forEach(a=>a.cancel());}
  schedule();
});
// One-shot contextual illustrations run on hover/focus, rather than endlessly.
document.querySelectorAll<HTMLElement>('.feature-card').forEach(card=>{
  let animations:Animation[]=[];
  const play=()=>{
    if(reduce.matches)return;
    animations.forEach(a=>a.cancel());animations=[];
    const targets=card.querySelectorAll<HTMLElement>('.next-digits,.copy-sheet,.native-art strong');
    for(const target of targets)animations.push(target.animate([{translate:'0 8px',opacity:.45},{translate:'0 0',opacity:1}],{duration:440,easing:'cubic-bezier(.16,1,.3,1)'}));
  };
  card.addEventListener('pointerenter',play);card.addEventListener('focus',play);
});
update();
