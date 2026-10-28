const fs=require('fs');
let eng=fs.readFileSync('engine.js','utf8').replace(/^if \(typeof module.*$/m,'');
const data={cubo18:fs.readFileSync('data/cubo18.txt','utf8'),kick15:fs.readFileSync('data/cubo_kick_15.txt','utf8'),mt130:fs.readFileSync('data/mt130.txt','utf8'),mt121:fs.readFileSync('data/mt121.txt','utf8')};
data.kick12=fs.readFileSync('data/kick12.txt','utf8');
data.x1=fs.readFileSync('data/x1.txt','utf8');
data.cubosub=fs.readFileSync('data/cubosub.txt','utf8');
for(const f of fs.readdirSync('est'))data[f.replace('.txt','')]=fs.readFileSync('est/'+f,'utf8');
let t=fs.readFileSync('template.html','utf8');
t=t.replace('/*I18N*/',()=>fs.readFileSync('i18n.js','utf8')).replace('/*ENGINE*/',()=>eng).replace('/*DATA*/',()=>JSON.stringify(data).replace(/</g,'\\u003c'));
fs.writeFileSync('page.html',t);
// syntax check of inline scripts + headless run
const scripts=[...t.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
new Function(scripts.join('\n'));
console.log('ok',t.length);
