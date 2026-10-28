// Chart view: SPL range and frequency window selectors
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(1000);
console.log('compute ms',await p.evaluate(()=>{const t=performance.now();computeCurves();return Math.round(performance.now()-t)}));
const sel=async(id,v)=>{await p.selectOption('#'+id,v);await p.waitForTimeout(200)};
await p.evaluate(()=>document.getElementById('chart').scrollIntoView());
for(const [d,f] of [['60','20-5000'],['0','20-5000'],['100','10-20000'],['40','20-300']]){await sel('dbrange',d);await sel('frange',f);await p.screenshot({path:`/tmp/cv/c_${d}_${f}.png`,clip:{x:0,y:0,width:1400,height:520}});console.log(d,f,await p.evaluate(()=>[ui.dbr,ui.f0,ui.f1]))}
await p.reload();await p.waitForTimeout(800);console.log('persisted',await p.evaluate(()=>[ui.dbr,ui.f0,ui.f1,document.getElementById('frange').value]));
const c=await p.evaluate(()=>{const g=document.getElementById('chart');const r=g.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}});await p.mouse.move(c.x,c.y);await p.waitForTimeout(200);console.log(await p.evaluate(()=>document.getElementById('readout').textContent.slice(0,60)));
console.log('ERR',errs);await b.close()})();
