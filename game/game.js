(function(){
'use strict';
var BANK=window.QUESTION_BANK||{levels:[]};
// 只顯示已核實題目開關：改 VERIFIED_ONLY_DEFAULT 為 true 即全面只顯示 verified:true；或用網址 ?verifiedOnly=1（=0 強制顯示全部）
var VERIFIED_ONLY_DEFAULT=true;
var VO=(function(){var m=location.search.match(/[?&]verifiedOnly=([01])/);return m?m[1]==='1':VERIFIED_ONLY_DEFAULT})();
if(VO)BANK={version:BANK.version,levels:BANK.levels.map(function(l){var o={};for(var k in l)o[k]=l[k];o.questions=l.questions.filter(function(q){return q.verified===true});return o}).filter(function(l){return l.questions.length>0})};
window.__verifiedOnly=VO;
var GRADES=[{id:'P1',name:'一年級',note:'練習關'},{id:'P2',name:'二年級'},{id:'P4',name:'四年級'},{id:'P5',name:'五年級'}];
var SUBJ={chi:{name:'中文城',icon:'📜'},eng:{name:'English Island',icon:'🏝️'},math:{name:'數學山',icon:'⛰️'},hum:{name:'人文村',icon:'🏘️'},sci:{name:'科學實驗室',icon:'🔬'}};
var KEY='abgps-quest-v1';var st;try{st=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){st={}}
st.stars=st.stars||{};st.wrong=st.wrong||{};st.badges=st.badges||{};
function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
var app=document.getElementById('app');
function h(tag,attrs,kids){var e=document.createElement(tag);for(var k in attrs||{}){if(k==='onclick')e.onclick=attrs[k];else if(k==='html')e.innerHTML=attrs[k];else e.setAttribute(k,attrs[k])}(kids||[]).forEach(function(c){e.appendChild(typeof c==='string'?document.createTextNode(c):c)});return e}
function totalStars(){var s=0;for(var k in st.stars)s+=st.stars[k];return s}
function upd(){document.getElementById('stars').textContent='⭐ '+totalStars()+(Object.keys(st.badges).length?' 🏅'+Object.keys(st.badges).length:'')}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function levelsOf(g,s){return BANK.levels.filter(function(l){return l.grade===g&&l.subject===s})}
var isEng=function(s){return s==='eng'};
var T=function(s,zh,en){return isEng(s)?en:zh};
// speech
var voices=[];function loadV(){try{voices=speechSynthesis.getVoices()||[]}catch(e){voices=[]}}
if('speechSynthesis' in window){loadV();speechSynthesis.onvoiceschanged=loadV}
function voiceFor(lang){var L=function(x){return (x.lang||'').toLowerCase().replace('_','-')};var pick=function(f){return voices.filter(f)[0]};
 if(lang==='zh-HK')return pick(function(x){return L(x)==='zh-hk'})||pick(function(x){return L(x).indexOf('yue')===0||/cantonese|粵|廣東/i.test(x.name)})||pick(function(x){return L(x).indexOf('zh')===0});
 return pick(function(x){return L(x)===lang.toLowerCase()})||pick(function(x){return L(x).indexOf('en')===0})}
function speak(text,lang){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(text);u.lang=lang;var v=voiceFor(lang);if(v)u.voice=v;u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
function canSpeak(lang){return ('speechSynthesis' in window)&&!!voiceFor(lang)}

function home(){upd();app.innerHTML='';document.getElementById('title').textContent='溫習闖關大冒險';
 app.appendChild(h('div',{class:'card'},[h('div',{class:'big'},['揀你嘅年級 👇']),h('p',{class:'note'},['愛秩序灣官立小學 · 上學期第一次考試範圍溫習'])]));
 var g=h('div',{class:'grid'});GRADES.forEach(function(G){g.appendChild(h('button',{class:'big',onclick:function(){grade(G.id)}},[G.name+(G.note?' ('+G.note+')':'')]))});app.appendChild(g)}
function grade(gid){upd();app.innerHTML='';var G=GRADES.filter(function(x){return x.id===gid})[0];document.getElementById('title').textContent=G.name+(G.note?' · '+G.note:'');
 app.appendChild(h('div',{class:'card'},[h('div',{class:'big'},['揀科目世界']),h('button',{onclick:home},['⬅ 返回'])]));
 var g=h('div',{class:'grid'});Object.keys(SUBJ).forEach(function(s){var ls=levelsOf(gid,s);if(!ls.length)return;var got=ls.reduce(function(a,l){return a+(st.stars[l.id]||0)},0);
  g.appendChild(h('button',{onclick:function(){world(gid,s)}},[h('div',{class:'big'},[SUBJ[s].icon+' '+SUBJ[s].name]),h('small',{},[ls.length+' 關 · ⭐'+got+'/'+ls.length*3])]))});
 app.appendChild(g)}
function world(gid,s){upd();app.innerHTML='';var ls=levelsOf(gid,s);var practice=gid==='P1';
 document.getElementById('title').textContent=SUBJ[s].icon+' '+SUBJ[s].name+' · '+gid;
 app.appendChild(h('div',{class:'card'},[h('button',{onclick:function(){grade(gid)}},['⬅ '+T(s,'返回','Back')]),h('span',{class:'note'},[T(s,'過一關（至少1星）就解鎖下一關','Get at least 1 star to unlock the next level')])]));
 var g=h('div',{class:'grid'});var allDone=true;
 ls.forEach(function(l,i){var unlocked=i===0||(st.stars[ls[i-1].id]||0)>0;var s3=st.stars[l.id]||0;if(!s3)allDone=false;
  g.appendChild(h('button',{class:'lvl'+(unlocked?'':' locked'),onclick:function(){if(unlocked)play(l.questions,{id:l.id,title:l.title,grade:gid,subject:s});}},[(unlocked?'':'🔒 ')+(practice?'練習關 ':T(s,'第'+(i+1)+'關 ','Level '+(i+1)+' ')),h('small',{},[l.title]),h('small',{},['★★★'.slice(0,s3)+'☆☆☆'.slice(0,3-s3)])]))});
 var bossOk=allDone||ls.length<2;var bid='boss-'+gid+'-'+s;
 g.appendChild(h('button',{class:'lvl boss'+(bossOk?'':' locked'),onclick:function(){if(!bossOk){alert(T(s,'完成所有關卡先可以挑戰 Boss！','Finish all levels to unlock the Boss!'));return}
  var pool=[];ls.forEach(function(l){pool=pool.concat(shuffle(l.questions).slice(0,2).map(function(q){return Object.assign({},q,{_from:l.title})}))});play(shuffle(pool).slice(0,12),{id:bid,title:T(s,'Boss 模擬考','Boss Mock Exam'),grade:gid,subject:s,boss:true})}},
  [(bossOk?'':'🔒 ')+'👾 Boss',h('small',{},[T(s,'模擬考：混合全部課題','Mock exam: all chapters')]),h('small',{},['★★★'.slice(0,st.stars[bid]||0)])]));
 var wk=gid+'-'+s;var wl=st.wrong[wk]||[];
 g.appendChild(h('button',{class:'lvl review',onclick:function(){if(!wl.length){alert(T(s,'錯題簿係空嘅，好叻！','No mistakes saved. Well done!'));return}play(wl.map(function(x){return x.q}),{id:'review-'+wk,title:T(s,'錯題簿複習','Mistake review'),grade:gid,subject:s,review:true})}},
  ['📒 '+T(s,'錯題簿','Mistake Book'),h('small',{},[wl.length+T(s,' 題待溫',' to review')])]));
 app.appendChild(g)}
function norm(x){return String(x).replace(/[\s　]/g,'').replace(/／/g,'/').replace(/[０-９]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-65248)}).replace(/[.。]$/,'').toLowerCase()}
function addWrong(meta,q){var k=meta.grade+'-'+meta.subject;var l=st.wrong[k]=st.wrong[k]||[];var key=JSON.stringify(q.q)+JSON.stringify(q.answer||q.items);
 var e=l.filter(function(x){return x.key===key})[0];if(e)e.need=2;else l.push({key:key,q:q,need:2});save()}
function rightInReview(meta,q){var k=meta.grade+'-'+meta.subject;var l=st.wrong[k]||[];var key=JSON.stringify(q.q)+JSON.stringify(q.answer||q.items);
 l.forEach(function(x){if(x.key===key)x.need--});st.wrong[k]=l.filter(function(x){return x.need>0});save()}
function play(qs,meta){var s=meta.subject;var list=meta.review||meta.boss?qs:shuffle(qs).slice(0,8);var i=0,score=0,firstTry=true;
 var lang=s==='eng'?'en-GB':'zh-HK';var readAloud=meta.grade==='P2'&&(s==='chi'||s==='eng'||true);
 function show(){app.innerHTML='';firstTry=true;var q=list[i];
  var c=h('div',{class:'card'});c.appendChild(h('div',{},[h('button',{onclick:function(){world(meta.grade,s)}},['⬅ '+T(s,'離開','Quit')]),h('b',{},[meta.title]),h('span',{class:'tag'},[(i+1)+' / '+list.length])]));
  var pr=h('div',{class:'prog'},[h('div',{style:'width:'+(i/list.length*100)+'%'})]);c.appendChild(pr);
  var qtext=q.type==='order'?q.q:q.q;c.appendChild(h('div',{class:'q'},[qtext]));
  var shown=q.items?shuffle(q.items):null;
  if(readAloud){var say=qtext.replace(/[。：:]$/,'')+(q.options?'。'+q.options.join('，'):'')+(shown?'。'+shown.join('，'):'');
   if('speechSynthesis' in window){c.appendChild(h('button',{class:'speak','aria-label':'read aloud',onclick:function(){loadV();speak(say,lang)}},['🔊 '+T(s,'讀題','Read aloud')]))}
   else c.appendChild(h('small',{class:'note'},[T(s,'此瀏覽器不支援讀題','Read-aloud not supported in this browser')]))}
  if(q._from)c.appendChild(h('div',{class:'note'},[q._from]));
  var area=h('div',{class:'opts'});c.appendChild(area);var fb=h('div');c.appendChild(fb);app.appendChild(c);
  function result(ok,btn){if(ok){if(firstTry)score++;if(meta.review)rightInReview(meta,q);fb.className='fb ok';fb.innerHTML='';fb.appendChild(document.createTextNode('✅ '+T(s,'答對了！','Correct! ')+(q.explain||'')));
    fb.appendChild(h('div',{},[h('button',{class:'primary',onclick:function(){i++;i<list.length?show():finish()}},[T(s,'下一題 ➜','Next ➜')])]));Array.prototype.forEach.call(area.querySelectorAll('button,input'),function(b){b.disabled=true})}
   else{if(firstTry&&!meta.review)addWrong(meta,q);if(firstTry&&meta.review)addWrong(meta,q);firstTry=false;fb.className='fb no';fb.textContent='❌ '+T(s,'再試一次！提示：','Try again! Hint: ')+(q.explain||'');if(btn){btn.classList.add('wrong');btn.disabled=true}}}
  if(q.type==='mc'){q.options.forEach(function(o){var b=h('button',{onclick:function(){var ok=o===q.answer;if(ok)b.classList.add('correct');result(ok,b)}},[o]);area.appendChild(b)})}
  else if(q.type==='tf'){[[true,T(s,'✔ 對','✔ True')],[false,T(s,'✘ 錯','✘ False')]].forEach(function(p){var b=h('button',{onclick:function(){var ok=p[0]===q.answer;if(ok)b.classList.add('correct');result(ok,b)}},[p[1]]);area.appendChild(b)})}
  else if(q.type==='fill'){var inp=h('input',{type:'text',inputmode:q.numeric?'numeric':'text',placeholder:T(s,'輸入答案','Type your answer'),autocomplete:'off'});
   var go=function(){var v=norm(inp.value);if(!v)return;var ok=q.answer.some(function(a){return norm(a)===v});if(ok)inp.classList.add('correct');else{inp.classList.add('wrong');setTimeout(function(){inp.classList.remove('wrong')},600)}result(ok)};
   inp.onkeydown=function(e){if(e.key==='Enter')go()};area.appendChild(inp);area.appendChild(h('button',{class:'primary',onclick:go},[T(s,'確定','Check')]));setTimeout(function(){inp.focus()},50)}
  else if(q.type==='order'){var picked=[];var box=h('div',{class:'order-picked'});area.appendChild(h('div',{class:'note'},[T(s,'依次序按下：','Tap in order:')]));area.appendChild(box);
   var pool=h('div');shown.forEach(function(it){var b=h('button',{onclick:function(){picked.push(it);b.disabled=true;box.appendChild(h('span',{class:'tag'},[it]));if(picked.length===q.items.length){var ok=picked.join('|')===q.items.join('|');result(ok);if(!ok){picked=[];box.innerHTML='';Array.prototype.forEach.call(pool.children,function(x){x.disabled=false})}}}},[it]);pool.appendChild(b)});area.appendChild(pool)}
 }
 function finish(){var r=score/list.length;var stars=r>=.9?3:r>=.7?2:r>=.5?1:0;if(!meta.review)st.stars[meta.id]=Math.max(st.stars[meta.id]||0,stars);
  if(meta.boss&&stars>=2)st.badges[meta.id]=1;var all=levelsOf(meta.grade,s);if(all.length&&all.every(function(l){return st.stars[l.id]===3}))st.badges['perfect-'+meta.grade+'-'+s]=1;save();upd();
  app.innerHTML='';var c=h('div',{class:'card',style:'text-align:center'},[h('div',{class:'big'},[stars?T(s,'過關！','Level clear!'):T(s,'再努力！','Keep trying!')]),h('div',{style:'font-size:3rem'},['★★★'.slice(0,stars)+'☆☆☆'.slice(0,3-stars)]),
   h('p',{},[T(s,'第一次就答對：','First-try correct: ')+score+' / '+list.length]),meta.boss&&stars>=2?h('p',{},['🏅 '+T(s,'獲得 Boss 徽章！','Boss badge earned!')]):h('span'),
   h('button',{onclick:function(){play(qs,meta)}},['🔁 '+T(s,'再玩','Play again')]),h('button',{class:'primary',onclick:function(){world(meta.grade,s)}},[T(s,'返回地圖','Back to map')])]);app.appendChild(c)}
 show()}
document.getElementById('homeBtn').onclick=home;window.__game={home:home,grade:grade,world:world,play:play};var m=location.hash.match(/^#level=(.+)$/);var L=m&&BANK.levels.filter(function(l){return l.id===m[1]})[0];if(L)play(L.questions,{id:L.id,title:L.title,grade:L.grade,subject:L.subject});else home();
})();
