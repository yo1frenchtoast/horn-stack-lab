const {chromium}=require('playwright');const fs=require('fs');const crypto=require('crypto');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+fs.readFileSync('page.html','utf8')+'</body></html>');await pg.waitForTimeout(900);
const h=async()=>crypto.createHash('md5').update(await pg.locator('#map').screenshot()).digest('hex').slice(0,8);
for(const v of ['top','side','3d']){await pg.click(`#mapview [data-v="${v}"]`);await pg.waitForTimeout(500);
 const a=await h();
 await pg.fill('[data-i="0"][data-p="spl"]','15');await pg.waitForTimeout(700);const s=await h();
 await pg.fill('[data-i="0"][data-p="spl"]','0');await pg.fill('[data-i="0"][data-p="az"]','15');await pg.waitForTimeout(700);const z=await h();
 await pg.fill('[data-i="0"][data-p="az"]','0');await pg.waitForTimeout(500);
 console.log(v,'base',a,'spl',s,'az',z);}
console.log(errs);await b.close()})();
