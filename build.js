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
// index.html : page autonome pour GitHub Pages (l'artefact reçoit ce squelette à la publication)
const skel = '<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>:root{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>\n';
const m = t.match(/<title>[\s\S]*?<\/title>/);
fs.writeFileSync('index.html', skel + t + '\n</body>\n</html>\n');
// syntax check of inline scripts + headless run
const scripts=[...t.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
new Function(scripts.join('\n'));
console.log('ok',t.length);
