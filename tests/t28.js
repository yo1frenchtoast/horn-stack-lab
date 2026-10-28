const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+require('fs').readFileSync('page.html','utf8')+'</body></html>');
await pg.waitForTimeout(900);
const lvl=()=>pg.evaluate(()=>{computeCurves();const a=CURVES.spl[1];return [63,100,160,250,400].map(f=>{const j=FG.findIndex(x=>x>=f);return f+':'+a[j].toFixed(0)}).join(' ')+' xc'+Math.max(...CURVES.xc[1]).toFixed(0)});
console.log('options',await pg.evaluate(()=>[...document.querySelectorAll('[data-i="1"][data-p="drv"] option')].map(o=>o.textContent).join(' | ')));
console.log('orig',await lvl());
await pg.selectOption('[data-i="1"][data-p="drv"]','kappa15');await pg.waitForTimeout(400);console.log('kappa',await lvl());
console.log(await pg.textContent('[data-drvinfo="1"]'));
await pg.selectOption('[data-i="1"][data-p="drv"]','g12');await pg.waitForTimeout(300);console.log('g12',await lvl(),'|',await pg.textContent('[data-drvinfo="1"]'));
// ajout perso
await pg.evaluate(()=>{document.querySelector('#drvpanel details').open=true});
await pg.fill('#drvname','HP test 4 pouces');
for(const [k,v] of Object.entries({Fs:65,Qes:0.9,Qms:4,Vas:3,Re:8,Sd:55,Xmax:3,Le:0.3,Pmax:10}))await pg.fill('#dts_'+k,String(v));
console.log(await pg.textContent('#drvinfo'));await pg.click('#drvadd');await pg.waitForTimeout(300);
console.log(await pg.textContent('#drvmsg'));
await pg.selectOption('[data-i="1"][data-p="drv"]','c_hp_test_4_pouces');await pg.waitForTimeout(300);console.log('perso',await lvl(),'|',await pg.textContent('[data-drvinfo="1"]'));
await pg.click('[data-load="0"]').catch(()=>{});
await pg.locator('#drvpanel').scrollIntoViewIfNeeded();await pg.locator('#drvpanel').screenshot({path:'drv1.png'});
await pg.locator('#src1').scrollIntoViewIfNeeded();await pg.locator('#src1').screenshot({path:'drv2.png'});
// bloc hornresp
await pg.evaluate(()=>{document.querySelectorAll('#drvpanel details').forEach(d=>d.open=true)});await pg.fill('#drvhr','Sd = 856.3\nBl = 16.4\nCms = 1.65E-04\nRms = 2.57\nMmd = 41\nLe = 1.01\nRe = 5.23\nXmax=3.2\nPmax=300\nComment=X / Kappa test');await pg.click('#drvhrbtn');console.log(await pg.textContent('#drvmsg'),await pg.inputValue('#dts_Fs'),await pg.inputValue('#dts_Qes'));
console.log(errs);await b.close();})();
