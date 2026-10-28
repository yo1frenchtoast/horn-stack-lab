const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+require('fs').readFileSync('page.html','utf8')+'</body></html>');
await pg.waitForTimeout(900);
const st=()=>pg.evaluate(()=>SRC.map(s=>[s.par.comment.split('/')[0].trim().slice(0,12),s.gain,s.delay,s.pol?'-':'+',Math.round(s.hp.f)+s.hp.type,Math.round(s.lp.f)+s.lp.type].join(' ')).join(' | '));
const flat=()=>pg.evaluate(()=>{computeCurves();const a=CURVES.sSpl,idx=FG.map((f,j)=>f>=60&&f<=1000?j:-1).filter(j=>j>=0);const m=idx.reduce((s,j)=>s+a[j],0)/idx.length;return Math.sqrt(idx.reduce((s,j)=>s+(a[j]-m)**2,0)/idx.length).toFixed(2)});
for(const p of ['cubo18:1,kick15:1,mt130:1','e15:1']){
await pg.click('[data-preset="'+p+'"]');await pg.waitForTimeout(700);
console.log('avant',await st(),'rms',await flat());
await pg.click('#advall');await pg.waitForTimeout(900);
console.log('après',await st(),'rms',await flat());console.log(await pg.textContent('#advmsg'));
console.log('drive',await pg.evaluate(()=>ui.drive));
await pg.click('#advundo');await pg.waitForTimeout(400);console.log('undo',await st());}
console.log(errs);await b.close();})();
