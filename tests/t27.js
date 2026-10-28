const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+require('fs').readFileSync('page.html','utf8')+'</body></html>');
await pg.waitForTimeout(900);
console.log(await pg.evaluate(()=>{const t=performance.now();applyAllAdvice();const a=performance.now()-t;const t2=performance.now();updateAdvice();const u=performance.now()-t2;const t3=performance.now();computeCurves();const c=performance.now()-t3;const t4=performance.now();refresh();return {total:a.toFixed(0),advice:u.toFixed(0),curves:c.toFixed(0),refresh:(performance.now()-t4).toFixed(0)}}));
await b.close();})();
