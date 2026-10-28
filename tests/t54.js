// Stereo listening (two ears): interaural time/level differences when the listening spot moves along x
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:1400,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(800);
// 1) impulse responses of the two ears (no audio needed)
const lag=await p.evaluate(()=>{const sr=48000,out={};for(const lx of [0,2,-2]){ui.lx=lx;const h=0.085,L=spectrumToIR(systemSpectrum(sr,-1,h),1),R=spectrumToIR(systemSpectrum(sr,-1,-h),1);
 // lag of the cross-correlation peak (in samples) over +-40
 let best=0,bl=0;for(let d=-40;d<=40;d++){let s=0;for(let n=100;n<3000;n++)s+=L[n]*R[n-d];if(Math.abs(s)>Math.abs(best)){best=s;bl=d}}
 let eL=0,eR=0;for(let n=0;n<AUD.N;n++){eL+=L[n]*L[n];eR+=R[n]*R[n]}out[lx]={lagSamples:bl,lagMs:+(bl/sr*1000).toFixed(3),Rminus_L_dB:+(10*Math.log10(eR/eL)).toFixed(2)}}ui.lx=0;return out});
console.log('IR ear lag (R vs L; + = right ear earlier, i.e. closer to the stack):',JSON.stringify(lag));
// 2) real output is 2 channels with the checkbox on
await p.selectOption('#asrc','pink');await p.click('#aplay');await p.waitForTimeout(500);
await p.check('#astereo');await p.waitForTimeout(800);
console.log('convolver channels',await p.evaluate(()=>AUD.curConv[0].buffer.numberOfChannels),'ear input enabled',await p.evaluate(()=>!document.getElementById('aear').disabled));
const dif=await p.evaluate(async()=>{const c=AUD.ctx,sp=c.createChannelSplitter(2),aL=c.createAnalyser(),aR=c.createAnalyser();AUD.sysGain.connect(sp);sp.connect(aL,0);sp.connect(aR,1);ui.lx=2;buildIR();await new Promise(r=>setTimeout(r,800));
 const L=new Float32Array(aL.fftSize),R=new Float32Array(aR.fftSize);aL.getFloatTimeDomainData(L);aR.getFloatTimeDomainData(R);let best=0,bl=0;for(let d=-40;d<=40;d++){let s=0;for(let n=100;n<2000;n++)s+=L[n]*R[n-d];if(s>best){best=s;bl=d}}
 let eL=0,eR=0;for(let n=0;n<L.length;n++){eL+=L[n]*L[n];eR+=R[n]*R[n]}return {lag:bl,eLdB:+(10*Math.log10(eL)).toFixed(1),eRdB:+(10*Math.log10(eR)).toFixed(1),identical:L.every((v,i)=>v===R[i])}});
console.log('live output at x=2',dif);
console.log('ERR',errs);await b.close()})();
