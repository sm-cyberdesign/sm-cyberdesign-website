/* SM Cyber Design motion illustrations — dependency-free */
(()=>{'use strict';
const common='class="sm-motion-art" viewBox="0 0 620 220" role="img"';
const frame='<rect class="sm-frame" x="90" y="26" width="440" height="170" rx="16"/>';
const process='<svg '+common+' aria-label="Review, Build and Verify connected by a flowing security signal"><path class="sm-line sm-flow" d="M125 90H495"/>'+[125,310,495].map((x,i)=>'<g class="sm-breathe" style="animation-delay:'+i*1.2+'s"><circle class="sm-frame" cx="'+x+'" cy="90" r="43"/>'+(i===0?'<circle class="sm-line" cx="'+(x-4)+'" cy="84" r="15"/><path class="sm-line" d="m'+(x+7)+' 95 14 14"/>':i===1?'<path class="sm-line" d="m'+(x-22)+' 89 22-17 22 17v21h-44z"/>':'<path class="sm-line" d="m'+(x-20)+' 90 13 13 27-29"/>')+'</g><text class="sm-label" text-anchor="middle" x="'+x+'" y="165">'+['01 Review','02 Build','03 Verify'][i]+'</text>').join('')+'</svg>';
const shield='<svg '+common+' aria-label="Animated security shield forming over a browser window">'+frame+'<path class="sm-line" opacity=".45" d="M90 62H530M118 100H280M118 127H258M118 154H236"/><circle fill="#ec91c1" cx="113" cy="44" r="5"/><circle fill="#79d7aa" cx="131" cy="44" r="5"/><path class="sm-line sm-draw" d="M390 75 438 94V132Q433 166 390 185Q347 166 342 132V94Z"/><g class="sm-reveal"><rect x="374" y="122" width="32" height="28" rx="5" fill="#79d7aa"/><path class="sm-line" d="M380 122v-9a10 10 0 0 1 20 0v9"/></g></svg>';
const data='<svg '+common+' aria-label="Calm green and pink data signals flowing into a protected shield"><path class="sm-line sm-flow" opacity=".6" d="M65 65C210 65 230 108 420 108M65 108H420M65 151C210 151 230 108 420 108"/><circle class="sm-dot" fill="#79d7aa" cx="110" cy="65" r="7"/><circle class="sm-dot" fill="#ec91c1" cx="130" cy="108" r="7"/><circle class="sm-dot" fill="#79d7aa" cx="100" cy="151" r="7"/><circle class="sm-halo" cx="490" cy="108" r="86" fill="#79d7aa" opacity=".18"/><path class="sm-line" d="M490 51 536 72V115Q530 151 490 172Q450 151 444 115V72Z"/><path class="sm-line" d="m474 109 13 13 23-26"/></svg>';
const form='<svg '+common+' aria-label="Accessible form with focus highlight and a gently appearing validation checkmark"><rect class="sm-frame" x="155" y="18" width="310" height="185" rx="16"/><rect x="185" y="58" width="250" height="40" rx="8" fill="none" stroke="#79d7aa" stroke-width="2" class="sm-breathe"/><path class="sm-line" opacity=".4" d="M188 40H280M188 121H275"/><rect x="185" y="136" width="250" height="35" rx="8" fill="none" stroke="#ec91c1" stroke-opacity=".5"/><g class="sm-reveal"><circle cx="417" cy="78" r="12" fill="#79d7aa"/><path d="m410 78 5 5 10-11" fill="none" stroke="#14251e" stroke-width="3" stroke-linecap="round"/></g></svg>';
const human='<svg '+common+' aria-label="Person with laptop surrounded by a calm protective glow"><circle class="sm-halo" cx="310" cy="108" r="98" fill="none" stroke="#79d7aa" stroke-width="13"/><circle class="sm-halo" cx="310" cy="108" r="110" fill="none" stroke="#ec91c1" stroke-width="2"/><circle class="sm-frame" cx="310" cy="65" r="27"/><path class="sm-line sm-pink" d="M282 63Q282 34 310 34Q338 34 338 63"/><path class="sm-line" d="M257 159v-20q0-38 39-38h28q39 0 39 38v20"/><rect class="sm-frame" x="235" y="143" width="150" height="61" rx="7"/><path class="sm-line" d="m297 174 10 10 18-22M218 206H402"/></svg>';
const placements=[['#process',process],['#services',shield],['#lab',data],['#contact',form],['#about',human]];
const motionReduced=matchMedia('(prefers-reduced-motion: reduce)');
function init(){
 const arts=[];
 placements.forEach(([selector,markup])=>{
  const section=document.querySelector(selector);if(!section||section.querySelector('.sm-motion-art'))return;
  const heading=section.querySelector('h2');if(!heading)return;
  const holder=document.createElement('div');holder.innerHTML=markup;
  const svg=holder.firstElementChild;heading.insertAdjacentElement('afterend',svg);arts.push(svg);
 });
 const sync=()=>arts.forEach(a=>a.classList.toggle('sm-motion-playing',!motionReduced.matches));
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('sm-motion-playing',e.isIntersecting&&!motionReduced.matches)),{threshold:.1});
  arts.forEach(a=>observer.observe(a));
  const change=()=>arts.forEach(a=>a.classList.toggle('sm-motion-playing',!motionReduced.matches&&a.getBoundingClientRect().bottom>0&&a.getBoundingClientRect().top<innerHeight));
  motionReduced.addEventListener?.('change',change);
 }else{sync();motionReduced.addEventListener?.('change',sync)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
