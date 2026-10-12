import {t} from '../lib/i18n';
import {WebGPURenderer,Scene,PerspectiveCamera,Group,Mesh,BoxGeometry,MeshStandardMaterial,EdgesGeometry,LineSegments,LineBasicMaterial,AmbientLight,DirectionalLight,PointLight,Vector2} from 'three/webgpu';

export async function mount(host:HTMLElement){
  const canvas=host.querySelector('canvas')!;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let renderer:WebGPURenderer;
  try{renderer=new WebGPURenderer({canvas,alpha:true,antialias:true});await renderer.init();}
  catch{host.dataset.renderer='static';return;}
  host.dataset.renderer=(renderer.backend as unknown as {isWebGPUBackend?:boolean}).isWebGPUBackend?'webgpu':'webgl';
  const scene=new Scene();
  const camera=new PerspectiveCamera(34,1,.1,100);camera.position.set(0,0,13);
  const assembly=new Group();assembly.rotation.set(.42,-.62,-.12);scene.add(assembly);
  scene.add(new AmbientLight(0xffb3b3,2));
  const key=new DirectionalLight(0xffffff,4);key.position.set(4,6,8);scene.add(key);
  const red=new PointLight(0xff172f,100,30);red.position.set(-4,1,4);scene.add(red);
  const geometry=new BoxGeometry(.81,.81,.81);
  const edges=new EdgesGeometry(geometry);
  const shell=new MeshStandardMaterial({color:0x250b10,metalness:.72,roughness:.3});
  const core=new MeshStandardMaterial({color:0xff263f,emissive:0xe3132e,emissiveIntensity:1.1,metalness:.3,roughness:.28});
  const wire=new LineBasicMaterial({color:0xff4052,transparent:true,opacity:.6});
  const blocks:{mesh:Group;x:number;y:number;z:number}[]=[];
  for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)for(let z=-1;z<=1;z++){
    const g=new Group();const inner=x===0&&z===0;
    g.add(new Mesh(geometry,inner?core:shell),new LineSegments(edges,wire));
    assembly.add(g);blocks.push({mesh:g,x,y,z});
  }
  const cage=new LineSegments(new EdgesGeometry(new BoxGeometry(4.6,4.6,4.6)),new LineBasicMaterial({color:0xff4d59,transparent:true,opacity:.12}));assembly.add(cage);
  const pointer=new Vector2(),pointerTarget=new Vector2();let active=true,paused=reduced.matches,elapsed=0,last=performance.now(),frame=0,disposed=false,scrollPhase=0,scrollTarget=0;
  const button=host.querySelector<HTMLButtonElement>('button')!;button.hidden=false;
  function syncButton(){button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',t(paused?'Play visual animation':'Pause visual animation'));button.replaceChildren(document.createTextNode(t(paused?'Play motion':'Pause motion')+' '));const icon=document.createElement('span');icon.setAttribute('aria-hidden','true');icon.textContent=paused?'▷':'Ⅱ';button.append(icon);}
  syncButton();button.addEventListener('click',()=>{paused=!paused;syncButton();draw(performance.now());});
  function resize(){const {width,height}=host.getBoundingClientRect();renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();draw(performance.now());}
  function draw(now:number){
    if(disposed)return;cancelAnimationFrame(frame);
    if(!paused&&active&&!document.hidden)elapsed+=Math.min((now-last)/1000,.05);last=now;
    if(!paused){pointer.lerp(pointerTarget,.07);scrollPhase+=(scrollTarget-scrollPhase)*.075;}
    const spread=1.1+(Math.sin(elapsed*.6)*.5+.5)*.47+scrollPhase*.9;
    for(const b of blocks)b.mesh.position.set(b.x*spread,b.y*spread,b.z*spread);
    assembly.rotation.y=-.62+Math.sin(elapsed*.22)*.3+pointer.x*.24+scrollPhase*.42;
    assembly.rotation.x=.42+pointer.y*.08;assembly.position.y=Math.sin(elapsed*.65)*.08;
    renderer.render(scene,camera);
    if(active&&!paused&&!document.hidden)frame=requestAnimationFrame(draw);
  }
  const onPointer=(e:PointerEvent)=>{if(reduced.matches||paused)return;const r=host.getBoundingClientRect();pointerTarget.set((e.clientX-r.left)/r.width-.5,(e.clientY-r.top)/r.height-.5);};
  host.addEventListener('pointermove',onPointer);
  host.addEventListener('pointerleave',()=>pointerTarget.set(0,0));
  const onScroll=()=>{scrollTarget=reduced.matches?0:Math.min(1,scrollY/Math.max(innerHeight*.55,300));};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  const observer=new IntersectionObserver(entries=>{active=entries[0].isIntersecting;if(active)draw(performance.now());else cancelAnimationFrame(frame);});observer.observe(host);
  const resizer=new ResizeObserver(resize);resizer.observe(host);
  const visibility=()=>{if(document.hidden)cancelAnimationFrame(frame);else draw(performance.now());};document.addEventListener('visibilitychange',visibility);
  const preference=()=>{paused=reduced.matches;if(paused){scrollPhase=0;pointer.set(0,0);}onScroll();syncButton();draw(performance.now());};reduced.addEventListener('change',preference);
  resize();
  window.addEventListener('pageshow',event=>{if(event.persisted)draw(performance.now());});
  window.addEventListener('pagehide',event=>{cancelAnimationFrame(frame);if(event.persisted)return;disposed=true;observer.disconnect();resizer.disconnect();window.removeEventListener('scroll',onScroll);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',preference);geometry.dispose();edges.dispose();shell.dispose();core.dispose();wire.dispose();cage.geometry.dispose();(cage.material as LineBasicMaterial).dispose();renderer.dispose();});
}
