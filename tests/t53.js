// Instrument mixer: per-instrument fader / mute / solo in the simulated listening
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:1400,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(800);
await p.selectOption('#asrc','mixer');await p.click('#aplay');await p.waitForTimeout(500);
console.log('mixer visible',await p.evaluate(()=>!document.getElementById('mixer').hidden),'bpm enabled',await p.evaluate(()=>!document.getElementById('abpm').disabled));
// peak energy per band over ~3 s (analyser smoothing is high, so we track max of band power)
const meas=async()=>p.evaluate(async()=>{const a=AUD.anSrc,n=a.frequencyBinCount,buf=new Float32Array(n),bh=AUD.ctx.sampleRate/2/n;let lo=-200,hi=-200;const t0=performance.now();
 while(performance.now()-t0<3000){a.getFloatFrequencyData(buf);let l=-200,h=-200;for(let k=Math.ceil(30/bh);k<90/bh;k++)l=Math.max(l,buf[k]);for(let k=Math.ceil(2000/bh);k<8000/bh;k++)h=Math.max(h,buf[k]);lo=Math.max(lo,l);hi=Math.max(hi,h);await new Promise(r=>setTimeout(r,50))}return {low:Math.round(lo),high:Math.round(hi)}});
console.log('default muted',await p.evaluate(()=>INS.filter(k=>k.m).map(k=>k.id).join(',')));
const dflt=await meas();
for(const k of ['snare','hat','chord'])await p.click(`[data-k="${k}"] [data-ms="m"]`);await p.waitForTimeout(400);
const all=await meas();console.log('default (kick+bass)',dflt);
await p.click('[data-k="kick"] [data-ms="s"]');await p.waitForTimeout(400);const solo=await meas();
await p.click('[data-k="kick"] [data-ms="s"]');await p.click('[data-k="kick"] [data-ms="m"]');await p.click('[data-k="bass"] [data-ms="m"]');await p.waitForTimeout(400);const nolow=await meas();
console.log('all',all,'kick solo',solo,'kick+bass muted',nolow);
await p.fill('#abpm','90');await p.dispatchEvent('#abpm','change');await p.waitForTimeout(500);console.log('bpm 90 ok',await p.evaluate(()=>AUD.playing&&AUD.bpm));
console.log('ERR',errs);await b.close()})();
