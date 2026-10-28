// File routing: mono (same signal on every group) or stereo (left / right groups)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:1700,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(800);
// 1) maths: left groups + right groups = all groups (even count); an odd count gives the middle group to both at -3 dB; left groups are at +x
const m=await p.evaluate(()=>{const out={};const sr=48000;
 for(const N of [2,3,4]){ui.stacks=N;ui.lx=0;const all=systemSpectrum(sr,-1,0,null),L=systemSpectrum(sr,-1,0,groupW('L')),R=systemSpectrum(sr,-1,0,groupW('R'));
  let err=0,den=0,eL=0,eR=0;for(let k=1;k<AUD.N/2;k++){const re=L.re[k]+R.re[k]-all.re[k],im=L.im[k]+R.im[k]-all.im[k];err+=re*re+im*im;den+=all.re[k]**2+all.im[k]**2;eL+=L.re[k]**2+L.im[k]**2;eR+=R.re[k]**2+R.im[k]**2}
  out[N]={sumVsAll_dB:N%2?'n/a (middle at -3 dB)':+(10*Math.log10(err/den+1e-30)).toFixed(1),L_vs_R_dB_at_x0:+(10*Math.log10(eL/eR)).toFixed(2)}}
 ui.stacks=2;ui.lx=3;const L=systemSpectrum(sr,-1,0,groupW('L')),R=systemSpectrum(sr,-1,0,groupW('R'));let eL=0,eR=0;for(let k=1;k<AUD.N/2;k++){eL+=L.re[k]**2+L.im[k]**2;eR+=R.re[k]**2+R.im[k]**2}out.at_x_plus3={L_minus_R_dB:+(10*Math.log10(eL/eR)).toFixed(1)};ui.lx=0;ui.stacks=1;return out});
console.log(JSON.stringify(m));
// 2) live: stereo wav -> routing select appears, 2 convolvers in stereo, 1 in mono; a mono wav disables stereo
const wav=(ch)=>{const sr=8000,n=sr*2,buf=Buffer.alloc(44+n*2*ch);buf.write('RIFF',0);buf.writeUInt32LE(36+n*2*ch,4);buf.write('WAVEfmt ',8);buf.writeUInt32LE(16,16);buf.writeUInt16LE(1,20);buf.writeUInt16LE(ch,22);buf.writeUInt32LE(sr,24);buf.writeUInt32LE(sr*2*ch,28);buf.writeUInt16LE(2*ch,32);buf.writeUInt16LE(16,34);buf.write('data',36);buf.writeUInt32LE(n*2*ch,40);for(let i=0;i<n;i++)for(let c=0;c<ch;c++)buf.writeInt16LE(Math.round(8000*Math.sin(i/(c?4:8))),44+(i*ch+c)*2);return buf};
await p.evaluate(()=>{});await p.fill('input[data-p="count"]','1').catch(()=>{});
await p.evaluate(()=>{const s=document.getElementById('stacks');if(s){s.value=2;s.dispatchEvent(new Event('change'));s.dispatchEvent(new Event('input'))}});
console.log('groups',await p.evaluate(()=>ui.stacks));
await p.setInputFiles('#afilein',{name:'st.wav',mimeType:'audio/wav',buffer:wav(2)});await p.waitForTimeout(800);
console.log('routing select enabled',await p.evaluate(()=>!document.getElementById('arouting').disabled),'stereo enabled',await p.evaluate(()=>!document.querySelector('#arouting [value=stereo]').disabled));
await p.click('#aplay');await p.waitForTimeout(600);
console.log('mono routing convolvers',await p.evaluate(()=>AUD.curConv.length));
await p.selectOption('#arouting','stereo');await p.waitForTimeout(900);console.log('stereo routing convolvers',await p.evaluate(()=>AUD.curConv.length),'stereoRouting()',await p.evaluate(()=>stereoRouting()));
await p.check('#astereo');await p.waitForTimeout(900);console.log('stereo + two ears: IR channels',await p.evaluate(()=>AUD.curConv.map(c=>c.buffer.numberOfChannels)));
await p.setInputFiles('#afilein',{name:'mono.wav',mimeType:'audio/wav',buffer:wav(1)});await p.waitForTimeout(900);
console.log('mono file: stereo option disabled',await p.evaluate(()=>document.querySelector('#arouting [value=stereo]').disabled),'routing',await p.evaluate(()=>AUD.routing));
console.log('ERR',errs);await b.close()})();
