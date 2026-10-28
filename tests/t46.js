const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.setContent(fs.readFileSync('page.html','utf8'));await p.waitForTimeout(800);
await p.click('[data-tab="gd"]');await p.waitForTimeout(300);
const r=await p.evaluate(()=>{const f=[30,50,80,100,150,300,1000].map(x=>FG.findIndex(g=>g>=x));return f.map(j=>FG[j].toFixed(0)+':'+[...CURVES.gd.map(g=>g[j].toFixed(1)),CURVES.sGd[j].toFixed(1)].join('/'))});
console.log(r.join(' | '));
await (await p.$('#chart')).screenshot({path:'/tmp/gd.png'});
await p.selectOption('#langsel','en');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>[document.querySelector('[data-tab=gd]').textContent,document.querySelector('[data-tab=gd]').title.slice(0,40)]),errs);await b.close()})();
