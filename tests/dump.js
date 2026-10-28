const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.setContent(fs.readFileSync('/home/claude/hornsim/page.html','utf8'));await p.waitForTimeout(800);
await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
const t=await p.evaluate(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>/^(SCRIPT|STYLE)$/.test(n.parentNode.tagName)?2:1});const o=new Set();let n;while(n=w.nextNode()){const s=n.textContent.trim();if(s&&!/^[\d\s.,+\-–—/%:()×°]*$/.test(s))o.add(s)}
document.querySelectorAll('[title],[placeholder],[aria-label]').forEach(e=>['title','placeholder','aria-label'].forEach(a=>{const v=e.getAttribute(a);if(v)o.add('@'+a+': '+v)}));return [...o]});
fs.writeFileSync('/tmp/strings.txt',t.join('\n'));console.log(t.length);await b.close()})();
