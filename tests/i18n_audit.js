// Translation audit: exercises the UI in each language (and fr -> en round trips) and reports text that is in the wrong language.
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:1700,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(800);
const wav=(()=>{const sr=8000,n=sr,buf=Buffer.alloc(44+n*2);buf.write('RIFF',0);buf.writeUInt32LE(36+n*2,4);buf.write('WAVEfmt ',8);buf.writeUInt32LE(16,16);buf.writeUInt16LE(1,20);buf.writeUInt16LE(1,22);buf.writeUInt32LE(sr,24);buf.writeUInt32LE(sr*2,28);buf.writeUInt16LE(2,32);buf.writeUInt16LE(16,34);buf.write('data',36);buf.writeUInt32LE(n*2,40);for(let i=0;i<n;i++)buf.writeInt16LE(Math.round(8000*Math.sin(i/8)),44+i*2);return buf})();
const lang=async l=>{await p.evaluate(l=>{const s=document.getElementById('langsel');s.value=l;s.dispatchEvent(new Event('change'))},l);await p.waitForTimeout(400)};
const exercise=async()=>{
 await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
 for(const t of ['spl','phase','gd','xcur','imp'])await p.evaluate(t=>document.querySelector(`[data-tab="${t}"]`).click(),t);
 await p.evaluate(()=>{document.querySelector('[data-tab="spl"]').click();for(const v of ['top','3d','side'])document.querySelector(`[data-v="${v}"]`).click()});
 await p.setInputFiles('#afilein',{name:'my-test.wav',mimeType:'audio/wav',buffer:wav});await p.waitForTimeout(600);
 for(const v of ['mixer','sweep','tone','pink','file'])await p.selectOption('#asrc',v);
 await p.selectOption('#asrc','mixer');await p.check('#astereo');await p.click('#aplay');await p.waitForTimeout(800);
 for(const id of ['advall','advundo','aeq','spfind','advreset'])await p.evaluate(id=>document.getElementById(id)&&document.getElementById(id).click(),id);
 await p.waitForTimeout(3500);
 await p.evaluate(()=>{const c=document.getElementById('speccv');c.dispatchEvent(new PointerEvent('pointerdown',{clientX:c.getBoundingClientRect().left+300,clientY:200,bubbles:true,pointerId:1}));});
 await p.click('#aplay');await p.waitForTimeout(300)};
const dump=()=>p.evaluate(()=>{const o=new Set();const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.data.trim();if(t&&!/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))o.add(t)}
 document.querySelectorAll('[title],[aria-label],[placeholder],optgroup').forEach(e=>{for(const a of['title','aria-label','placeholder','label'])if(e.hasAttribute(a))o.add(e.getAttribute(a))});
 for(const id of ['spmsg','advmsg','aeqmsg','astatus','maplegend','mapcoord','specrd','cfgmsg'])o.add((document.getElementById(id)||{}).textContent||'');return [...o].filter(Boolean)});
const FRW=/[éèêàùçôîâû]|\b(le|la|les|des|du|un|une|et|ou|pour|avec|sans|sur|dans|vers|est|pas|ce|cette|au|aux|fichier|ordre|écoute|réglage|conseil|étage|appliquer|annuler)\b/i;
const ENW=/\b(the|and|of|to|for|with|is|are|that|this|from|your|per|at|in|on|or|by|when|if|add|reset|apply|move|show|hide|all|only|current|delete|save|load|file|order|stage|advice|listening)\b/i;
const OKFR=/^(Français|Ω|Le \(mH\)|GK|Or paste)/;
let bad=0;
await exercise();
for(const [label,l,rx] of [['EN (fresh)','en',FRW]]){const d=(await dump()).filter(t=>rx.test(t)&&!OKFR.test(t));console.log(label,d.length);d.forEach(t=>console.log('  ',t.slice(0,160)));bad+=d.length}
await lang('fr');await exercise();
{const d=(await dump()).filter(t=>ENW.test(t)&&!/[éèêàùçôî]/.test(t));console.log('FR after exercise',d.length);d.forEach(t=>console.log('  ',t.slice(0,160)));bad+=d.length}
await lang('en');await exercise();
{const d=(await dump()).filter(t=>FRW.test(t)&&!OKFR.test(t));console.log('EN after fr->en',d.length);d.forEach(t=>console.log('  ',t.slice(0,160)));bad+=d.length}
console.log('ERR',errs);await b.close();process.exit(bad?1:0)})();
