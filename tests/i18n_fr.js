const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch();const p=await b.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{try{localStorage.setItem('cubo-lang','fr')}catch(e){}});
await p.goto('file:///home/claude/horn-stack-lab/index.html');await p.waitForTimeout(800);
await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=true);for(const id of ['advall','aeq','aequndo','aeq','spfind','advundo','advreset'])document.getElementById(id)&&document.getElementById(id).click()});await p.waitForTimeout(4000);
const msgs=await p.evaluate(()=>['spmsg','advmsg','aeqmsg','astatus','maplegend','cfgmsg'].map(i=>i+': '+((document.getElementById(i)||{}).textContent||'').slice(0,300)).join('\n'));console.log(msgs);
const r=await p.evaluate(()=>{const o=[];const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
while(n=w.nextNode()){const t=n.data.trim();if(t&&!/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))o.push(t)}
document.querySelectorAll('[title],[aria-label],[placeholder],optgroup').forEach(e=>{for(const a of['title','aria-label','placeholder','label'])if(e.hasAttribute(a))o.push(e.getAttribute(a))});return o});
const en=/\b(the|and|of|to|for|with|is|are|that|this|from|your|you|per|at|in|on|or|by|when|if|add|set|reset|apply|move|show|hide|all|only|current|delete|save|load|name|default)\b/i;
const left=[...new Set(r.filter(t=>en.test(t)&&!/[éèàùêç]/.test(t)))];
console.log(left.length);console.log(left.join('\n'));console.log('ERR',errs);
await b.close()})();
