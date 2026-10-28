const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+fs.readFileSync('page.html','utf8')+'</body></html>');await pg.waitForTimeout(900);
console.log(await pg.evaluate(()=>SRC.map((s,i)=>s.count+':'+document.querySelector(`[data-i="${i}"][data-p="spl"]`).disabled).join(' ')));
await pg.fill('[data-r="2"][data-f="count"]','3');await pg.waitForTimeout(400);
console.log(await pg.evaluate(()=>SRC.map((s,i)=>s.count+':'+document.querySelector(`[data-i="${i}"][data-p="spl"]`).disabled).join(' ')));console.log(errs);await b.close()})();
