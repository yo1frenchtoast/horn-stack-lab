const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.setContent(fs.readFileSync('page.html','utf8'));await p.waitForTimeout(800);
const r=await p.evaluate(()=>{SRC.forEach(s=>{});const s=SRC.find(x=>x.count>0);s.hp={type:'lr',n:4,f:130};s.lp={type:'lr',n:4,f:130};refresh();
updateAdvice();const w=ADV.out[SRC.indexOf(s)].some(h=>h.k==='Filtres');
document.querySelector('#advreset').click();const ok=s.hp.f<s.lp.f/1.4||s.lp.type==='off'||s.hp.type==='off';
document.querySelector('#advundo').click();return {w,ok,back:s.hp.f+'/'+s.lp.f}});
console.log(JSON.stringify(r));await b.close()})();
