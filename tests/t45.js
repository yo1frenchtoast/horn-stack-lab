const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:1300,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.setContent(fs.readFileSync('page.html','utf8'));await p.waitForTimeout(800);
const vis=await p.evaluate(()=>{const r=document.getElementById('multirow');return !r.hidden&&r.offsetParent!==null});
for(const v of ['top','side']){
 await p.evaluate(v=>{document.querySelector('#mapview [data-v="'+v+'"]').click()},v);
 await p.evaluate(()=>{const c=document.getElementById('multifollow');c.checked=true;c.dispatchEvent(new Event('change'))});
 await p.evaluate(()=>{document.getElementById('asrc').value='kickbass';document.getElementById('asrc').dispatchEvent(new Event('change'));document.getElementById('aplay').click()}).catch(e=>console.log('play',e.message));
 await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>({ready:MB.ready,live:mbLive(),w:[...MB.w].map(x=>+x.toFixed(2)),playing:AUD.playing}));
 console.log(v,JSON.stringify(r));
 await (await p.$('#map')).screenshot({path:'/tmp/mb_'+v+'.png'});
 await p.evaluate(()=>document.getElementById('aplay').click());
}
console.log('visible',vis,errs);await b.close()})();
