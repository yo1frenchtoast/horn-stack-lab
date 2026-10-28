const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+require('fs').readFileSync('page.html','utf8')+'</body></html>');
await pg.waitForTimeout(900);
console.log(await pg.evaluate(()=>{const o=[...document.querySelectorAll('select option')].filter(o=>/Altec|Sub 4/.test(o.textContent)).map(o=>o.value+'='+o.textContent);return o.join(' | ')}));
const r=await pg.evaluate(()=>{const ids=Object.keys(CAT);return ids.includes('mhb46')?'cat ok':'no cat'});console.log(r);
console.log(errs);await b.close();})();
