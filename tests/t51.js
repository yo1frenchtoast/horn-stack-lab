// Isolator: drag on the spectrum -> steep band-pass on the listening
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:1400,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(800);
await p.click('#aplay');await p.waitForTimeout(2500);
const box=await p.evaluate(()=>{const c=document.getElementById('speccv');c.scrollIntoView();const r=c.getBoundingClientRect();const g=c._g;return {l:r.left,t:r.top,w:r.width,h:r.height,pl:g.pad.l/g.dpr,pw:g.pw/g.dpr}});
const xf=f=>box.l+box.pl+box.pw*Math.log(f/20)/Math.log(1000);const y=box.t+box.h/2;
const level=async(lo,hi)=>p.evaluate(([lo,hi])=>{const a=AUD.anOut,n=a.frequencyBinCount,buf=new Float32Array(n);a.getFloatFrequencyData(buf);const bh=AUD.ctx.sampleRate/2/n;let s=-200;for(let k=Math.ceil(lo/bh);k<hi/bh;k++)s=Math.max(s,buf[k]);return s},[lo,hi]);
const before=[await level(1000,1500),await level(100,150)];
await p.evaluate(()=>{AUD.anHeard=AUD.ctx.createAnalyser();AUD.anHeard.fftSize=16384;AUD.mix.connect(AUD.anHeard)});
await p.mouse.move(xf(100),y);await p.mouse.down();await p.mouse.move(xf(200),y,{steps:8});await p.mouse.up();await p.waitForTimeout(2500);
const heard=await p.evaluate(()=>{const a=AUD.anHeard,n=a.frequencyBinCount,b=new Float32Array(n);a.getFloatFrequencyData(b);const bh=AUD.ctx.sampleRate/2/n,m=(lo,hi)=>{let v=-200;for(let k=Math.ceil(lo/bh);k<hi/bh;k++)v=Math.max(v,b[k]);return Math.round(v)};return {band:m(100,150),out:m(1000,1500)}});console.log('heard (after isolator):',heard);
const st=await p.evaluate(()=>({on:ISO.on,lo:Math.round(ISO.lo),hi:Math.round(ISO.hi),dis:document.getElementById('isoclear').disabled}));
const after=[await level(1000,1500),await level(100,150)];
console.log('graph must stay intact (both ~unchanged):');console.log('before dB (1-1.5k, 100-150)',before.map(v=>v.toFixed(0)),'after',after.map(v=>v.toFixed(0)),st);
await p.click('#isoclear');await p.waitForTimeout(2500);console.log('cleared',await p.evaluate(()=>ISO.on),(await level(1000,1500)).toFixed(0));
console.log('source analyser alive',await p.evaluate(()=>{const a=AUD.anSrc,b=new Float32Array(a.frequencyBinCount);a.getFloatFrequencyData(b);return Math.max(...b)>-100}));console.log('ERR',errs);await b.close()})();
