const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const W of [1280,400]){
const pg=await b.newPage({viewport:{width:W,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+require('fs').readFileSync('page.html','utf8')+'</body></html>');
await pg.waitForTimeout(600);
for(const pr of ['mhb46:4,hd15:2,mt130:1','s218:2,hbr212:2,mt130:1','mhb30:4,kickpl:2,sakb28:1','invader:2,bph118:1,hr118:1']){
 if(await pg.$('[data-preset="'+pr+'"]'))await pg.click('[data-preset="'+pr+'"]');else await pg.evaluate(p=>{document.querySelector('#presets .btn').dataset.preset=p;document.querySelector('#presets .btn').click()},pr);
 await pg.waitForTimeout(500);
 console.log(W,pr,await pg.evaluate(()=>SRC.map(s=>s.id+':'+s.count).join(' ')),'overflow',await pg.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1));}
console.log('errs',errs);
if(W==1280)await pg.screenshot({path:'v12.png'});
await pg.close();}
await b.close();})();
