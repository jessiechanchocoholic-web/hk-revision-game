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

// --- 獨立覆核進階應用題（唔用 build.js 嘅函數）：逐位直式乘法、長除法、分數運算
const digMul=(a,b)=>{const x=String(a).split('').reverse().map(Number),y=String(b).split('').reverse().map(Number),r=Array(x.length+y.length).fill(0);for(let i=0;i<x.length;i++)for(let j=0;j<y.length;j++)r[i+j]+=x[i]*y[j];for(let k=0;k<r.length-1;k++){r[k+1]+=Math.floor(r[k]/10);r[k]%=10}return Number(r.reverse().join(''))};
const longDiv=(n,d)=>{let q='',rem=0;for(const ch of String(n)){rem=rem*10+Number(ch);q+=Math.floor(rem/d);rem%=d}return [Number(q),rem]};
const F=x=>{x=String(x);const m=x.split('/');return m.length===2?[BigInt(m[0]),BigInt(m[1])]:[BigInt(x),1n]};
const gcdB=(a,b)=>{a=a<0n?-a:a;while(b){[a,b]=[b,a%b]}return a};const FS=([n,d])=>{const g=gcdB(n,d);n/=g;d/=g;return d===1n?String(n):n+'/'+d};
let nCalc=0;
for(const l of B.levels)for(const q of l.questions){if(!q.calc)continue;nCalc++;const w=q.id||l.id;let prev;
 if(!q.working||!q.equation)e(w+' missing working/equation');
 q.calc.forEach((st,i)=>{const a=st.a==='prev'?prev:st.a,b=st.b==='prev'?prev:st.b;let got;
  if(st.op==='+')got=Number(a)+Number(b);else if(st.op==='-')got=Number(a)-Number(b);else if(st.op==='*')got=digMul(a,b);
  else if(st.op==='/'){const [qq,rr]=longDiv(a,b);if(rr)e(w+' step'+i+' not exact');got=qq}
  else if(st.op==='/r'){const [qq,rr]=longDiv(a,b);if(rr!==st.rem)e(w+' remainder');got=qq}
  else if(st.op==='f+'||st.op==='f-'){const [an,ad]=F(a),[bn,bd]=F(b);got=FS([st.op==='f+'?an*bd+bn*ad:an*bd-bn*ad,ad*bd])}
  else e(w+' bad op '+st.op);
  if(String(got)!==String(st.r))e(w+' step'+i+' '+a+st.op+b+' got '+got+' vs '+st.r);
  if(i===0&&st.a!=='prev'&&!/^1$/.test(String(st.a))&&!q.q.includes(String(st.a)))e(w+' operand not in question '+st.a);prev=got});
 if(String(prev)!==q.answer[0])e(w+' final '+prev+' vs '+q.answer[0]);
 if(q.longMul){for(const st of q.calc.filter(s=>s.op==='*')){const bs=String(st.b).split('').reverse();bs.forEach((dg,k)=>{const pp=digMul(st.a,Number(dg)*10**k);if(pp>0&&!q.working.some(x=>x.trim().startsWith(String(pp))))e(w+' partial product missing '+pp)})}}
 if(!q.working.some(x=>x.includes(String(q.answer[0]))))e(w+' working lacks answer')}
console.log('calc-checked',nCalc);
console.table(count);console.log(err?err+' errors':'ALL OK',B.levels.length,'levels',B.levels.reduce((s,l)=>s+l.questions.length,0),'questions');process.exit(err?1:0);
