// Advice sidebar: open by default on wide screens, collapsible to a tab with the counter, remembered; overlay on narrow screens
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const open=async(w)=>{const ctx=await b.newContext({viewport:{width:w,height:900}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(1200);return [ctx,p]};
const st=p=>p.evaluate(()=>({open:document.body.classList.contains('advopen'),side:getComputedStyle(document.getElementById('advside')).display,tab:getComputedStyle(document.getElementById('advtab')).display,total:document.getElementById('advtotal').textContent,badge:document.getElementById('advcountall').textContent,sections:document.querySelectorAll('#advstages .advsec').length,hints:document.querySelectorAll('#advside .hint').length,padR:getComputedStyle(document.body).paddingRight,stageAdviceBlocks:document.querySelectorAll('.src details.advice').length}));
let [c,p]=await open(1900);console.log('1900 default',JSON.stringify(await st(p)));
await p.screenshot({path:'/tmp/cv/side_open.png'});
const before=await p.evaluate(()=>+document.getElementById('advtotal').textContent);
await p.click('#advall');await p.waitForTimeout(2500);console.log('apply all: total',before,'->',await p.evaluate(()=>document.getElementById('advtotal').textContent),'|',await p.evaluate(()=>document.getElementById('advmsg').textContent.slice(0,70)));
await p.click('#advclose');await p.waitForTimeout(400);console.log('collapsed',JSON.stringify(await st(p)));
await p.screenshot({path:'/tmp/cv/side_closed.png'});
await p.reload();await p.waitForTimeout(1000);console.log('after reload (remembered closed)',(await st(p)).open);
await p.click('#advtab');await p.waitForTimeout(300);console.log('reopened',(await st(p)).open);await c.close();
[c,p]=await open(1200);console.log('1200 default',JSON.stringify(await st(p)));await p.click('#advtab');await p.waitForTimeout(300);console.log('1200 opened as overlay',(await st(p)).open,(await st(p)).padR);await p.screenshot({path:'/tmp/cv/side_1200.png'});await c.close();
[c,p]=await open(390);console.log('390 default open?',(await st(p)).open);await p.click('#advtab');await p.waitForTimeout(300);await p.screenshot({path:'/tmp/cv/side_390.png'});await c.close();
console.log('ERR',errs);await b.close()})();
