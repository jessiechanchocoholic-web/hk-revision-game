// node tools/validate.js — checks questions.js schema
const fs=require('fs'),path=require('path');global.window={};eval(fs.readFileSync(path.join(__dirname,'..','questions.js'),'utf8'));
const B=window.QUESTION_BANK;let err=0;const e=m=>{err++;console.error('ERR',m)};const ids=new Set();const count={};
const G=['P1','P2','P4','P5'],S=['chi','eng','math','hum','sci'];
for(const l of B.levels){if(ids.has(l.id))e('dup id '+l.id);ids.add(l.id);if(!G.includes(l.grade)||!S.includes(l.subject))e('bad grade/subj '+l.id);
 if(l.questions.length<5)e(l.id+' has <5 questions');const k=l.grade+' '+l.subject;count[k]=count[k]||{levels:0,q:0};count[k].levels++;count[k].q+=l.questions.length;
 l.questions.forEach((q,i)=>{const w=l.id+'#'+i;for(const f of ['id','grade','subject','lesson','type','level','question','answer','source','verified'])if(q[f]===undefined)e(w+' missing '+f);if(ids.has(q.id))e('dup qid '+q.id);ids.add(q.id);if(!['記憶','理解','應用','分析'].includes(q.level))e(w+' bad level');if(q.grade==='P2'&&q.readAloud!==true)e(w+' P2 needs readAloud');if(!q.q||!q.explain)e(w+' missing q/explain');
  if(q.type==='mc'){if(!q.options.includes(q.answer))e(w+' answer not in options');if(new Set(q.options).size!==q.options.length)e(w+' dup options');if(q.options.length<2)e(w+' <2 options')}
  else if(q.type==='tf'){if(typeof q.answer!=='boolean')e(w+' tf answer')}
  else if(q.type==='fill'){if(!Array.isArray(q.answer)||!q.answer.length)e(w+' fill answer');if(q.numeric&&!q.answer.every(a=>/^-?\d+(\.\d+)?$/.test(a)))e(w+' numeric non-number '+q.answer)}
  else if(q.type==='order'){if(!(q.items&&q.items.length>=2))e(w+' order items')}else e(w+' bad type '+q.type)})}
// math spot checks: recompute "a ＋ b ＝" / "a － b" / "a ÷ b" fill answers
for(const l of B.levels.filter(l=>l.subject==='math'))for(const q of l.questions){let m;
 if(q.type==='fill'&&(m=q.q.match(/^(\d+) ([＋－÷]) (\d+) ＝/))){const a=+m[1],b=+m[3];const v=m[2]==='＋'?a+b:m[2]==='－'?a-b:a/b;if(String(v)!==q.answer[0])e('math wrong '+q.q)}
 if(q.fraction){const parts=q.q.match(/(\d+)\/(\d+)/g).map(x=>x.split('/').map(Number));const ops=q.q.match(/[＋－]/g);let n=parts[0][0],d=parts[0][1];
  if(!/絲帶/.test(q.q)){ops.forEach((o,i)=>{const [a,b]=parts[i+1];n=o==='＋'?n*b+a*d:n*b-a*d;d=d*b})}if(!/絲帶/.test(q.q)){const g=(x,y)=>y?g(y,x%y):x;const gg=g(Math.abs(n),d);const exp=d/gg===1?String(n/gg):(n/gg)+"/"+(d/gg);if(exp!==q.answer[0])e("frac wrong "+q.q+" "+q.answer[0]+" vs "+exp)}
 }}
// JSON files parse & match bank
const qd=path.join(__dirname,'..','..','questions');let nf=0;for(const s of fs.readdirSync(qd))for(const g of fs.readdirSync(path.join(qd,s)))for(const f of fs.readdirSync(path.join(qd,s,g))){nf++;try{const j=JSON.parse(fs.readFileSync(path.join(qd,s,g,f),'utf8'));if(!B.levels.find(l=>l.id===j.levelId&&l.questions.length===j.questions.length))e('json mismatch '+f)}catch(x){e('json parse '+s+'/'+g+'/'+f)}}console.log('json files',nf);
console.table(count);console.log(err?err+' errors':'ALL OK',B.levels.length,'levels',B.levels.reduce((s,l)=>s+l.questions.length,0),'questions');process.exit(err?1:0);
