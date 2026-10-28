const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+require('fs').readFileSync('page.html','utf8')+'</body></html>');
await pg.waitForTimeout(900);
for(const p of ['cubo18:1,kick15:1,mt130:1','e15:1']){
await pg.click('[data-preset="'+p+'"]');await pg.waitForTimeout(900);
console.log('==',p);
console.log(await pg.evaluate(()=>[...document.querySelectorAll('[data-hints]')].map((e,i)=>'#'+i+'\n'+[...e.querySelectorAll('.hint')].map(h=>' ['+h.className.replace('hint ','')+'] '+h.innerText.replace(/\n/g,' ')).join('\n')).join('\n')));
console.log(await pg.evaluate(()=>[...document.querySelectorAll('#ghints .hint')].map(h=>' ['+h.className.replace('hint ','')+'] '+h.innerText.replace(/\n/g,' ')).join('\n')));}
await pg.locator('#src0').scrollIntoViewIfNeeded();await pg.locator('#src0').screenshot({path:'adv.png'});
// apply test
const g0=await pg.evaluate(()=>SRC[0].gain);await pg.click('#src0 [data-adv]');await pg.waitForTimeout(500);console.log('appliqué',g0,'->',await pg.evaluate(()=>[SRC[0].gain,SRC[0].delay,SRC[0].hp.f,SRC[0].lp.f]));
console.log(errs);await b.close();})();
