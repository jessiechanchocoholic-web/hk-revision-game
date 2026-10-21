// node tools/bundle.js [out] [extraScript] — inline CSS, questions.js and game.js into one offline HTML file
const fs=require('fs'),path=require('path');const d=path.join(__dirname,'..');
const out=process.argv[2]||path.join(d,'..','溫習闖關遊戲.html');const extra=process.argv[3]?fs.readFileSync(process.argv[3],'utf8'):'';
const esc=s=>s.replace(/<\/script/gi,'<\\/script');
let html=fs.readFileSync(path.join(d,'index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>\n'+fs.readFileSync(path.join(d,'style.css'),'utf8')+'</style>')
 .replace('<script src="questions.js"></script>',()=>'<script>\n'+esc(fs.readFileSync(path.join(d,'questions.js'),'utf8'))+'</script>')
 .replace('<script src="game.js"></script>',()=>'<script>\n'+esc(fs.readFileSync(path.join(d,'game.js'),'utf8').replace(/var UNLOCK_ALL=\w+;/,'var UNLOCK_ALL=true;'))+'</script>'+(extra?'<script>'+esc(extra)+'</script>':''));
if(/src=|href=/.test(html))throw new Error('external reference left');
fs.writeFileSync(out,html);console.log('wrote',out,html.length,'bytes');
