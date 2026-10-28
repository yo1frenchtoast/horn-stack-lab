const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--autoplay-policy=no-user-gesture-required']});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+require('fs').readFileSync('page.html','utf8')+'</body></html>');
await pg.waitForTimeout(600);
await pg.click('[data-v="3d"]');console.log('case visible',await pg.isVisible('#multirow'));
await pg.selectOption('#asrc','beat');await pg.click('#aplay');await pg.waitForTimeout(800);
const t0=Date.now();await pg.check('#multifollow');await pg.waitForTimeout(300);console.log('activation',Date.now()-t0,'ms');
for(let i=0;i<3;i++){await pg.waitForTimeout(700);console.log(await pg.evaluate(()=>[mbLive(),Array.from(MB.w).map(x=>x.toFixed(2)).join(',')].join(' ')));}
await pg.locator('#map').scrollIntoViewIfNeeded();await pg.locator('#map').screenshot({path:'mb.png'});
await pg.click('[data-m="spl"]');await pg.waitForTimeout(600);await pg.locator('#map').screenshot({path:'mb2.png'});
console.log(errs);await b.close();})();
