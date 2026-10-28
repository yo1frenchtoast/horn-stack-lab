const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(800);
const snap=()=>p.evaluate(()=>{const o=[];const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(!/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))o.push(n.data)}
document.querySelectorAll('[title],[aria-label],[placeholder],optgroup').forEach(e=>['title','aria-label','placeholder','label'].forEach(a=>e.hasAttribute(a)&&o.push(a+':'+e.getAttribute(a))));return o});
const sel=async v=>{await p.evaluate(v=>{const s=document.getElementById('langsel');s.value=v;s.dispatchEvent(new Event('change'))},v);await p.waitForTimeout(500)};
await sel('en');const a=await snap();await sel('fr');const f=await snap();await sel('en');const c=await snap();
console.log('lang0',await p.evaluate(()=>LANG));
const d=a.filter((x,i)=>x!==c[i]);console.log(a.length,c.length,'diff',d.slice(0,10));
const l=f.filter(x=>/estim|ét/.test(x));console.log(errs);await b.close()})();
