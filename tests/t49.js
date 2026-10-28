const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:900}});
await p.setContent(fs.readFileSync('page.html','utf8'));await p.waitForTimeout(700);
await p.hover('#editor h2 .info');await p.waitForTimeout(200);
await p.screenshot({path:'/tmp/info.png',clip:{x:0,y:480,width:1000,height:420}});
await b.close()})();
