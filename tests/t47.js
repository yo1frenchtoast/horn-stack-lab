const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext();const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/hornsim/page.html');await p.waitForTimeout(700);
await p.click('[data-preset="cubosub:2,kick15:2,mt130:1"]');
await p.evaluate(()=>{SRC[0].gain=-2.5;SRC[1].az=7;ui.ly=6;$('ly').value=6;EQ.bands[2]={type:'peak',f:100,g:-3,q:1.2};eqUpdate();});
await p.fill('#cfgname','Test A');await p.click('#cfgsave');
await p.click('#cfglist [data-cd="0"]');
console.log(await p.evaluate(()=>[document.getElementById('cfgmsg').textContent,document.getElementById('cfglist').textContent]));
await p.reload();await p.waitForTimeout(900);
console.log(await p.evaluate(()=>[SRC.map(s=>s.id+':'+s.count).join(','),SRC[0].gain,SRC[1].az,ui.ly,document.getElementById('ly').value,EQ.bands[2].g,document.getElementById('cfgmsg').textContent]));
// charger une autre preset puis recharger la sauvegarde
await p.click('[data-preset="gkmb112:2"]');console.log(await p.evaluate(()=>SRC.map(s=>s.id).join(',')));
await p.click('#cfglist [data-cl="0"]');console.log(await p.evaluate(()=>SRC.map(s=>s.id).join(',')+' '+SRC[0].gain));
await p.click('#cfglist [data-cd="0"]');await p.click('#cfglist [data-cx="0"]');
console.log(await p.evaluate(()=>[document.getElementById('cfglist').children.length,document.getElementById('cfgmsg').textContent]),errs);
await b.close()})();
