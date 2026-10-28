const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+fs.readFileSync('page.html','utf8')+'</body></html>');await pg.waitForTimeout(900);
// UI : saisir des angles via les champs
await pg.fill('[data-i="0"][data-p="spl"]','10');await pg.fill('[data-i="1"][data-p="az"]','15');await pg.fill('[data-i="1"][data-p="el"]','-8');await pg.fill('#gsplay','12');
await pg.fill('#stacks','2');await pg.waitForTimeout(500);
await pg.fill('#spacing','2');await pg.waitForTimeout(300);
for(const v of ['top','side','3d']){await pg.click(`#mapview [data-v="${v}"]`);await pg.waitForTimeout(700);await pg.locator('#map').screenshot({path:`ang_${v}.png`});}
console.log(await pg.evaluate(()=>JSON.stringify(SRC.map(s=>[s.az,s.el,s.spl]))));console.log(errs);await b.close()})();
