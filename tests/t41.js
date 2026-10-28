const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+fs.readFileSync('page.html','utf8')+'</body></html>');await pg.waitForTimeout(1000);
const p=process.argv[2];
const dump=()=>pg.evaluate(()=>SRC.map(s=>s.id+':'+s.count+' hp '+(s.hp.type==='off'?'off':s.hp.type+s.hp.n+'@'+s.hp.f)+' lp '+(s.lp.type==='off'?'off':s.lp.type+s.lp.n+'@'+s.lp.f)+' g'+s.gain+' d'+s.delay).join(' | '));
await pg.evaluate(p=>{const b=document.createElement('button');b.dataset.preset=p;document.getElementById('presets').appendChild(b);b.click()},p);
await pg.waitForTimeout(800);console.log('init ',await dump());
for(let n=0;n<14;n++){
 const r=await pg.evaluate(()=>{computeCurves();updateAdvice();const btns=[...document.querySelectorAll('[data-adv]')].filter(b=>!b.disabled);
  // appliquer en priorité hp/lp
  const b=btns.find(b=>b.dataset.adv==='hp'||b.dataset.adv==='lp')||btns[0];if(!b)return 'NOBTN '+document.querySelectorAll('[data-adv]').length+' '+ADV.out.length;const t=b.closest('.hint').textContent.slice(0,120);b.click();return t});
 if(!r||r.startsWith('NOBTN')){console.log('plus de bouton',r);break}
 await pg.waitForTimeout(250);console.log(n,r.slice(0,80),'=>',await dump());
 const bad=await pg.evaluate(()=>SRC.some(s=>s.hp.type!=='off'&&s.lp.type!=='off'&&s.hp.f>=s.lp.f/1.5));if(bad){console.log('!!! bande dégénérée');break}
}
console.log(errs);await b.close()})();
