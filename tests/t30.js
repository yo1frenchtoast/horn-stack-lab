const {chromium}=require('playwright');const fs=require('fs');
async function open(b,f){const pg=await b.newPage({viewport:{width:1280,height:1000}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.setContent('<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body>'+fs.readFileSync(f,'utf8')+'</body></html>');await pg.waitForTimeout(900);return {pg,errs}}
const PROBE='window.probe=()=>{computeCurves();return [63,125,250,500,1000,2000].map(f=>{const j=FG.findIndex(x=>x>=f);return CURVES.sSpl[j].toFixed(2)}).join(" ")}';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const o=await open(b,'page_old.html'),n=await open(b,'page_new.html');await o.pg.evaluate(PROBE);await n.pg.evaluate(PROBE);
console.log('old',await o.pg.evaluate(()=>probe()));console.log('new',await n.pg.evaluate(()=>probe()));
// symétrie
const sym=await n.pg.evaluate(()=>{const r=[];for(const [az,lx] of [[25,2],[-25,-2]]){SRC.forEach(s=>{s.az=az});ui.lx=lx;r.push(probe())}return r});console.log('sym',sym);
// effet : pivot de 30° écoute dans l'axe vs hors axe
const eff=await n.pg.evaluate(()=>{const out={};SRC.forEach(s=>{s.az=0;s.el=0;s.spl=0});ui.lx=0;out.a0=probe();SRC.forEach(s=>{s.az=30});out.a30_axe0=probe();ui.lx=4*Math.tan(30*Math.PI/180);out.a30_vis=probe();return out});console.log(eff);
// splay + tilt + groupes + positions
const geo=await n.pg.evaluate(()=>{SRC.forEach(s=>{s.az=0;s.el=0;s.spl=0});SRC[0].spl=8;SRC[0].el=-5;ui.stacks=2;ui.gsplay=10;const P=positions();return P.filter(p=>p.i===0).map(p=>[p.X.toFixed(2),p.Y.toFixed(2),(p.az*180/Math.PI).toFixed(1)].join('/')).join(' | ')});console.log(geo);
await n.pg.evaluate(()=>{ui.lx=0;computeCurves()});
for(const v of ['top','side','3d']){await n.pg.evaluate(v=>{ui.view=v;computeMap&&computeMap();},v).catch(e=>console.log('err',e.message));await n.pg.waitForTimeout(300);}
await n.pg.evaluate(()=>{ui.view='top';document.querySelector('[data-view="top"]')&&document.querySelector('[data-view="top"]').click()});
console.log('errs',o.errs,n.errs);await b.close()})();
