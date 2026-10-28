const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
await p.goto('file:///home/claude/horn-stack-lab/index.html');await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>[document.compatMode,document.title,document.querySelector('h1').textContent,document.characterSet,SRC.length]),errs);
await p.screenshot({path:'/tmp/idx.png'});await b.close()})();
