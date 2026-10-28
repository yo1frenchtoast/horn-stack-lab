const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.setContent(fs.readFileSync('page.html','utf8'));await p.waitForTimeout(800);
await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=true);document.getElementById('langsel').value='en';document.getElementById('langsel').dispatchEvent(new Event('change'))});
await p.evaluate(()=>{document.querySelector('#advall').click();document.querySelector('#aeq').click();document.querySelector('#aequndo').click();document.querySelector('#aeq').click();document.querySelector('#spfind').click();document.querySelector('#advundo').click();document.querySelector('#advreset').click();
 const c=document.getElementById('chart');if(c){c.dispatchEvent(new MouseEvent('mousemove',{clientX:c.getBoundingClientRect().left+200,clientY:c.getBoundingClientRect().top+60,bubbles:true}))}});
await p.waitForTimeout(3000);
await p.waitForTimeout(1200);
const t=await p.evaluate(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>/^(SCRIPT|STYLE)$/.test(n.parentNode.tagName)?2:1});const o=new Set();let n;while(n=w.nextNode()){const s=n.textContent.trim();if(s)o.add(s)}
document.querySelectorAll('[title],[placeholder],[aria-label]').forEach(e=>['title','placeholder','aria-label'].forEach(a=>{const v=e.getAttribute(a);if(v)o.add('@'+a+': '+v)}));return [...o]});
const fr=/[éèêàùçôî]|\b(le|la|les|des|du|de|un|une|et|ou|pour|avec|sans|sur|dans|voie|vers|ton|tes|est|pas|ce|cette|au|aux|ajuster|réglage)\b/i;
console.log(await p.evaluate(()=>['spmsg','advmsg','aeqmsg','astatus','maplegend'].map(i=>i+': '+(document.getElementById(i)||{}).textContent).join('\n')));console.log(t.filter(s=>fr.test(s)).map(s=>s.slice(0,220)).join('\n'));console.log('ERR',errs);await b.close()})();
