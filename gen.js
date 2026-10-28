// Generates the ESTIMATED Hornresp scripts (from the plans) for the enclosures
const fs=require('fs');
const D={ // driver proxies
 d18:{Sd:1225,Bl:24.41,Cms:'1.39E-04',Rms:5.13,Mmd:164.97,Le:2.30,Re:5.00,Pmax:1400,Xmax:9.0},
 d15:{Sd:873,Bl:14.70,Cms:'2.22E-04',Rms:2.92,Mmd:60.19,Le:1.37,Re:6.11,Pmax:800,Xmax:4.8},
 cuw18:{Sd:1210,Bl:25.17,Cms:'1.23E-04',Rms:6.16,Mmd:120.5,Le:2.0,Re:6.0,Pmax:500,Xmax:6.0},
 gk12:{Sd:531,Bl:10.5,Cms:'3.50E-04',Rms:2.4,Mmd:33,Le:2.0,Re:4.3,Pmax:150,Xmax:5.0},
 altec4:{Sd:40.7,Bl:5.68,Cms:'6.02E-04',Rms:0.638,Mmd:8.1,Le:0.5,Re:6.2,Pmax:20,Xmax:4.0},
 lf18n401:{Sd:1220,Bl:27.8,Cms:'1.23E-04',Rms:6.22,Mmd:153,Le:2.5,Re:5.1,Pmax:2400,Xmax:8.8},
 sub12:{Sd:530,Bl:15.5,Cms:'2.0E-04',Rms:2.6,Mmd:62,Le:1.0,Re:3.2,Pmax:350,Xmax:8.0},
 d12:{Sd:530,Bl:21.66,Cms:'1.60E-04',Rms:3.09,Mmd:40,Le:2.30,Re:6.30,Pmax:450,Xmax:2.0},
 sm108:{Sd:220,Bl:14.0,Cms:'2.05E-04',Rms:1.2,Mmd:22,Le:0.6,Re:5.5,Pmax:150,Xmax:1.5},
 d12b:{Sd:530,Bl:18.9,Cms:'1.98E-04',Rms:3.35,Mmd:80,Le:1.2,Re:5.3,Pmax:800,Xmax:6.0},
 cd1:{Sd:12.5,Bl:9.0,Cms:'3.0E-05',Rms:0.9,Mmd:2.4,Le:0.05,Re:5.8,Pmax:60,Xmax:0.5},
 ntlw:{Sd:1156,Bl:31.3,Cms:'8.39E-05',Rms:6.96,Mmd:295,Le:1.85,Re:5.5,Pmax:1800,Xmax:17.5,Nd:2},
};
const E={};
function mk(id,c,drv,segs,o){ // segs: [[S1,S2,L],...]
 let t=`Ang=2.0 x Pi\nEg=2.83\nRg=0.10\n`;
 segs.forEach((s,i)=>{t+=`S${i+1}=${s[0]}\nS${i+2}=${s[1]}\nCon=${s[2]}\nF${i+1}${i+2}=${s[3]||0}\n`});
 const d=D[drv];
 t+=`Sd=${d.Sd}\nBl=${d.Bl}\nCms=${d.Cms}\nRms=${d.Rms}\nMmd=${d.Mmd}\nLe=${d.Le}\nRe=${d.Re}\nNd=${d.Nd||1}\n`;
 t+=`Vrc=${o.Vrc||0}\nAp1=${o.Ap||0}\nLp=${o.Lp||0}\nPortOut=${o.PortOut||0}\nVtc=${o.Vtc||0}\nAtc=${o.Atc||0}\nPmax=${d.Pmax*(d.Nd||1)}\nXmax=${d.Xmax}\nComment=${c}\n`;
 E[id]=t;
}
module.exports={mk,E,D};
if(require.main===module){
 const P=require('./params.js'); for(const k in P.E) fs.writeFileSync('est/'+k+'.txt',P.E[k]);
}
