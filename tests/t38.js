const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+fs.readFileSync('page.html','utf8')+'</body></html>');await pg.waitForTimeout(1000);
const cnt=()=>pg.evaluate(()=>{updateAdvice();return ADV.out.reduce((n,h)=>n+h.filter(x=>x.ap).length,0)+ADV.G.filter(x=>x.ap&&x.cls==='warn').length});
for(const p of ['cubo18:1,kick15:1,mt130:1','cubo18:4,kick15:2,mt130:1','cubo18:2,cubo18:2,kick15:2,mt130:1','mhb46:4,hd15:2,mt130:1','e15:1']){
 await pg.click('[data-preset="'+p+'"]');await pg.waitForTimeout(900);
 // perturber
 await pg.evaluate(()=>{SRC.forEach((s,i)=>{s.gain=[4,-8,6,2][i%4];s.delay=[0,3,0,1][i%4]});computeCurves();refresh()});await pg.waitForTimeout(300);
 const a=await cnt();const t0=Date.now();await pg.click('#advall');await pg.waitForTimeout(400);
 const msg=await pg.textContent('#advmsg');const c=await cnt();
 const again=await pg.evaluate(()=>{const b=JSON.stringify(snapAdv());applyAllAdvice();return b===JSON.stringify(snapAdv())});
 console.log(p,'avant',a,'après',c,'ms',Date.now()-t0,'idempotent',again,'|',msg.slice(0,230));}
console.log(errs);await b.close()})();
