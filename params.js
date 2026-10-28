const {mk,E}=require('./gen.js');
// MHB-46: folded 18" horn; mouth ~ 36x60, path ~150 cm
mk('mhb46','MHB-46 (estimated) / 18LW1400','d18',[[1100,1500,45],[1500,2300,70],[2300,3200,60]],{Vtc:12000,Atc:1100,Vrc:30});
// MHB-30: 12"
mk('mhb30','MHB-30 (estimated) / 12" equiv. PD12SB30','d12',[[420,650,45],[650,1000,65],[1000,1700,55]],{Vtc:6000,Atc:420,Vrc:15});
// Kick planar BR (12", 534x360x589)
mk('kickpl','Kick Planar BR (estimated) / 12"','d12',[[450,500,15],[500,900,25],[900,1500,25]],{Vtc:2500,Atc:450,Vrc:12});
// HBR212 2x12" hybrid (900x400x600)
mk('hbr212','HBR212 (estimated) / 2x12"','d12',[[900,1100,35],[1100,2000,55],[2000,3200,50]],{Vtc:6000,Atc:900,Vrc:30});
// HD15
mk('hd15','HD15 Horn (estimated) / 15"','d15',[[600,700,25],[700,1000,35],[1000,1300,40]],{Vtc:3000,Atc:600,Vrc:25});
// SAKB28: SM-108
mk('sakb28','SAKB28 (estimated) / 2x SM-108','sm108',[[110,180,12],[180,320,16],[320,600,16]],{Vtc:400,Atc:110,Vrc:3});
// Invader bin 18"
mk('invader','Invader Bin (estimated) / 18"','d18',[[1100,1200,30],[1200,2000,50],[2000,3300,50]],{Vtc:6000,Atc:1100,Vrc:80});
// BPH118 15" hybrid bandpass: front Vtc, rear port
mk('bph118','BPH118 (estimated) / 15"','d15',[[400,700,20],[700,1100,20]],{Vtc:22000,Atc:400,Vrc:65,Ap:127,Lp:12,PortOut:1});
// HR118
mk('hr118','HR118 (estimated) / 18"','d18',[[900,1100,30],[1100,1500,40],[1500,1300,30]],{Vtc:25000,Atc:900,Vrc:90});
// S218 NTLW 2x18 bandpass
mk('s218','S218 NTLW (estimated) / 2x 18NTLW5000','ntlw',[[460,460,35]],{Vtc:160000,Atc:460,Vrc:100});
// Audiophony E15: 2-way 15" bass-reflex (1.6 kHz HF way not modelled); volume and port estimated
mk('e15','Audiophony E15 (estimated) / 15" bass-reflex','d15',[],{Vrc:70,Ap:80,Lp:11.3,PortOut:1});
// Audiophony CB118: no datasheet; face estimated from a photo, volume, port and driver assumed
mk('cb118','Audiophony CB118 (estimated) / Audiophony CUW18-500 (estimated)','cuw18',[],{Vrc:140,Ap:150,Lp:25,PortOut:1});
// Cubo 12 (cubo15.nl plans): tapped/rear-loaded hybrid; rebuilt by scaling down the Cubo 18 (areas x0.52, lengths x0.72)
mk('cubo12','Cubo 12 (estimated) / 12" bass','d12b',[[668.1,680.9,18.6],[680.9,236.1,13.5],[236.1,745.4,69.1],[745.4,1050.7,17.9]],{Vtc:952,Atc:727});
// Audiophony E15 - HF way: 1" compression driver (EDR100) on a rotating horn; everything assumed (no measurement found)
mk('e15hf','Audiophony E15 HF (estimated) / EDR100 1" + pavillon','cd1',[[5.1,60,5],[60,520,12]],{Vtc:3,Atc:5.1,Vrc:0.02});
module.exports={E};
mk('altec4sub','Sub 4" bass-reflex 6.6 L / Altec Lansing H04-003A-08-D (measured)','altec4',[],{Vrc:6.6,Ap:20,Lp:38,PortOut:1});
mk('mhb46','MHB-46 (Hornplans) / RCF LF18N401','lf18n401',[[799.2,800,33.7,1],[800,1443,17.2,1],[1443,3141,59.3,1]],{Vrc:139.2,Ap:326.2,Lp:32,PortOut:1,Vtc:8400,Atc:1400});
mk('thebox112','the box Achat 112 Sub A (estimated) / 12" bass-reflex 4 Ω','sub12',[],{Vrc:45,Ap:60,Lp:13.5,PortOut:1});
mk('gkmb112','GK MB112 bass-reflex 37 L / GK 12" neodymium 51953-34 (measured; Le and Xmax estimated)','gk12',[],{Vrc:37,Ap:153,Lp:25.9,PortOut:1});
