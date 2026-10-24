(function(){
'use strict';
var UNLOCK_ALL=true; // true = 所有關卡及 Boss 一開始已解鎖；false = 要攞星先解鎖
var BANK=window.QUESTION_BANK||{levels:[]};
// 只顯示已核實題目開關：改 VERIFIED_ONLY_DEFAULT 為 true 即全面只顯示 verified:true；或用網址 ?verifiedOnly=1（=0 強制顯示全部）
var VERIFIED_ONLY_DEFAULT=false;
var VO=(function(){var m=location.search.match(/[?&]verifiedOnly=([01])/);return m?m[1]==='1':VERIFIED_ONLY_DEFAULT})();
if(VO)BANK={version:BANK.version,levels:BANK.levels.map(function(l){var o={};for(var k in l)o[k]=l[k];o.questions=l.questions.filter(function(q){return q.verified===true});return o}).filter(function(l){return l.questions.length>0})};
window.__verifiedOnly=VO;
var GRADES=[{id:'P1',name:'一年級',note:'練習關'},{id:'P2',name:'二年級'},{id:'P3',name:'三年級'},{id:'P4',name:'四年級'},{id:'P5',name:'五年級'},{id:'P6',name:'六年級'}];
var SUBJ={chi:{name:'中文城',icon:'📜'},eng:{name:'English Island',icon:'🏝️'},math:{name:'數學山',icon:'⛰️'},hum:{name:'人文村',icon:'🏘️'},sci:{name:'科學實驗室',icon:'🔬'}};
var KEY='hk-revision-quest-v1';var st;try{st=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){st={}}
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
function refreshSpeak(){Array.prototype.forEach.call(document.querySelectorAll('button.speak'),function(b){b.style.display=canSpeak(b.getAttribute('data-lang'))?'':'none'})}
if('speechSynthesis' in window){loadV();try{speechSynthesis.addEventListener?speechSynthesis.addEventListener('voiceschanged',function(){loadV();refreshSpeak()}):(speechSynthesis.onvoiceschanged=function(){loadV();refreshSpeak()})}catch(e){}}
function voiceFor(lang){var L=function(x){return (x.lang||'').toLowerCase().replace('_','-')};var pick=function(f){return voices.filter(f)[0]};
 if(lang==='zh-HK')return pick(function(x){return L(x)==='zh-hk'})||pick(function(x){return L(x).indexOf('yue')===0||/cantonese|粵|廣東/i.test(x.name)});
 return pick(function(x){return L(x)===lang.toLowerCase()})||pick(function(x){return L(x).indexOf('en')===0})}
function speak(text,lang){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(text);u.lang=lang;var v=voiceFor(lang);if(v)u.voice=v;u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
function canSpeak(lang){return ('speechSynthesis' in window)&&!!voiceFor(lang)}

// 隨機抽關（B5-DEV-01）：先喺「有關卡」嘅（年級,科目）組合入面平均抽一個，再喺嗰個組合嘅普通關卡（唔包 Boss）平均抽一關。已套用 verifiedOnly 過濾。唔寫入進度。
function randCombos(gid){var c=[];GRADES.forEach(function(G){if(gid&&G.id!==gid)return;Object.keys(SUBJ).forEach(function(s){if(levelsOf(G.id,s).length)c.push({g:G.id,s:s})})});return c}
function comboLabel(c){var G=GRADES.filter(function(x){return x.id===c.g})[0];return G.name+' · '+SUBJ[c.s].icon+' '+SUBJ[c.s].name}
function reducedMotion(){try{return window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}}
var randTimer=null;
function randomPick(gid){stopRand();var combos=randCombos(gid);var box=document.getElementById('randBox'),out=document.getElementById('randResult'),reel=document.getElementById('randReel');
 if(!combos.length){out.textContent='呢個年級暫時冇關卡';return}
 var pick=combos[Math.floor(Math.random()*combos.length)];var ls=levelsOf(pick.g,pick.s);var L=ls[Math.floor(Math.random()*ls.length)];
 Array.prototype.forEach.call(box.querySelectorAll('button,select'),function(b){b.disabled=true});
 var go=function(){reel.className='rand-reel done';reel.style.background=(THEME[pick.s]||THEME.math).body;reel.textContent=comboLabel(pick);
  out.textContent='🎉 抽中：'+comboLabel(pick)+'：'+L.title+'，準備開始！';
  randTimer=setTimeout(function(){randTimer=null;play(L.questions,{id:L.id,title:L.title,grade:pick.g,subject:pick.s})},reducedMotion()?900:1600)};
 if(reducedMotion()){go();return}
 out.textContent='轉緊…';var n=0,total=18+Math.floor(Math.random()*6),delay=60;reel.className='rand-reel spin';
 (function step(){if(n>=total){go();return}var c=combos[n%combos.length===0?Math.floor(Math.random()*combos.length):(n*7)%combos.length];reel.style.background=(THEME[c.s]||THEME.math).body;reel.textContent=comboLabel(c);n++;delay*=1.08;randTimer=setTimeout(step,delay)})()}
function randomCard(){var sel=h('select',{id:'randGrade','aria-label':'固定年級'});GRADES.forEach(function(G){sel.appendChild(h('option',{value:G.id},[G.name]))});
 var panel=h('div',{id:'randBox',class:'rand-panel',hidden:'hidden'},[
  h('div',{id:'randReel',class:'rand-reel','aria-hidden':'true'},['🎲 ？？？']),
  h('div',{class:'rand-modes'},[h('button',{class:'primary',onclick:function(){randomPick(null)}},['🎲 全部隨機']),
   h('span',{class:'rand-fixed'},[sel,h('button',{class:'primary',onclick:function(){randomPick(sel.value)}},['🎯 固定年級、隨機科目'])])]),
  h('p',{id:'randResult',class:'rand-result',role:'status','aria-live':'polite'},[''])]);
 var btn=h('button',{class:'big rand-btn','aria-expanded':'false','aria-controls':'randBox',onclick:function(){var open=panel.hasAttribute('hidden');if(!open){stopRand();var rr=document.getElementById('randReel');if(rr){rr.className='rand-reel';rr.textContent='🎲 ？？？';rr.style.background=''}var ro=document.getElementById('randResult');if(ro)ro.textContent='';Array.prototype.forEach.call(panel.querySelectorAll('button,select'),function(b){b.disabled=false})}if(open)panel.removeAttribute('hidden');else panel.setAttribute('hidden','hidden');btn.setAttribute('aria-expanded',String(open))}},['🎲 隨機']);
 return h('div',{class:'card rand-card'},[btn,h('span',{class:'note'},[' 唔知揀邊科？等波波幫你抽！']),panel])}
function stopRand(){if(randTimer){clearTimeout(randTimer);randTimer=null}}
function fresh(){stopRand();window.__homeOk=true;var jf=document.getElementById('jsfail');if(jf)jf.setAttribute('hidden','hidden');var a=document.activeElement;if(a&&a.blur&&a!==document.body)a.blur();app.innerHTML='';try{window.scrollTo(0,0)}catch(e){}}
var coarse=!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches);
function home(){upd();fresh();document.getElementById('title').textContent='溫習闖關大冒險';
 app.appendChild(h('div',{class:'card'},[h('div',{class:'big'},['揀你嘅年級 👇']),h('p',{class:'note'},['小學上學期第一次考試範圍溫習'])]));
 var g=h('div',{class:'grid'});GRADES.forEach(function(G){g.appendChild(h('button',{class:'big',onclick:function(){grade(G.id)}},[G.name+(G.note?' ('+G.note+')':'')]))});app.appendChild(g);app.appendChild(randomCard())}
function grade(gid){upd();fresh();var G=GRADES.filter(function(x){return x.id===gid})[0];document.getElementById('title').textContent=G.name+(G.note?' · '+G.note:'');
 app.appendChild(h('div',{class:'card'},[h('div',{class:'big'},['揀科目世界']),h('button',{onclick:home},['⬅ 返回'])]));
 var g=h('div',{class:'grid'});Object.keys(SUBJ).forEach(function(s){var ls=levelsOf(gid,s);if(!ls.length)return;var got=ls.reduce(function(a,l){return a+(st.stars[l.id]||0)},0);
  g.appendChild(h('button',{onclick:function(){world(gid,s)}},[h('div',{class:'big'},[SUBJ[s].icon+' '+SUBJ[s].name]),h('small',{},[ls.length+' 關 · ⭐'+got+'/'+ls.length*3])]))});
 app.appendChild(g)}
function world(gid,s){upd();fresh();var ls=levelsOf(gid,s);var practice=gid==='P1';
 document.getElementById('title').textContent=SUBJ[s].icon+' '+SUBJ[s].name+' · '+gid;
 app.appendChild(h('div',{class:'card'},[h('button',{onclick:function(){grade(gid)}},['⬅ '+T(s,'返回','Back')]),h('span',{class:'note'},[UNLOCK_ALL?T(s,'所有關卡已解鎖，揀任何一關開始！','All levels unlocked – pick any level!'):T(s,'過一關（至少1星）就解鎖下一關','Get at least 1 star to unlock the next level')])]));
 var g=h('div',{class:'grid'});var allDone=true;
 ls.forEach(function(l,i){var unlocked=UNLOCK_ALL||i===0||(st.stars[ls[i-1].id]||0)>0;var s3=st.stars[l.id]||0;if(!s3)allDone=false;
  g.appendChild(h('button',{class:'lvl'+(unlocked?'':' locked'),onclick:function(){if(unlocked)play(l.questions,{id:l.id,title:l.title,grade:gid,subject:s});}},[(unlocked?'':'🔒 ')+(practice?'練習關 ':T(s,'第'+(i+1)+'關 ','Level '+(i+1)+' ')),h('small',{},[l.title]),h('small',{},[h('span',{class:'gold'},['★★★'.slice(0,s3)]),'☆☆☆'.slice(0,3-s3)])]))});
 var bossOk=UNLOCK_ALL||allDone||ls.length<2;var bid='boss-'+gid+'-'+s;
 if(!practice)g.appendChild(h('button',{class:'lvl boss'+(bossOk?'':' locked'),onclick:function(){if(!bossOk){alert(T(s,'完成所有關卡先可以挑戰 Boss！','Finish all levels to unlock the Boss!'));return}
  var pool=[];ls.forEach(function(l){pool=pool.concat(shuffle(l.questions).slice(0,2).map(function(q){return Object.assign({},q,{_from:l.title})}))});play(shuffle(pool).slice(0,12),{id:bid,title:T(s,'Boss 模擬考','Boss Mock Exam'),grade:gid,subject:s,boss:true})}},
  [(bossOk?'':'🔒 ')+'👾 Boss',h('small',{},[T(s,'模擬考：混合全部課題','Mock exam: all chapters')]),h('small',{class:'gold'},['★★★'.slice(0,st.stars[bid]||0)])]));
 var wk=gid+'-'+s;var wl=st.wrong[wk]||[];
 g.appendChild(h('button',{class:'lvl review',onclick:function(){if(!wl.length){alert(T(s,'錯題簿係空嘅，好叻！','No mistakes saved. Well done!'));return}play(wl.map(function(x){return x.q}),{id:'review-'+wk,title:T(s,'錯題簿複習','Mistake review'),grade:gid,subject:s,review:true})}},
  ['📒 '+T(s,'錯題簿','Mistake Book'),h('small',{},[wl.length+T(s,' 題待溫',' to review')])]));
 app.appendChild(g)}
function norm(x){return String(x).replace(/[\s　]/g,'').replace(/／/g,'/').replace(/[０-９]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-65248)}).replace(/[.。]$/,'').toLowerCase()}
function addWrong(meta,q){var k=meta.grade+'-'+meta.subject;var l=st.wrong[k]=st.wrong[k]||[];var key=JSON.stringify(q.q)+JSON.stringify(q.answer||q.items);
 var e=l.filter(function(x){return x.key===key})[0];if(e)e.need=2;else l.push({key:key,q:q,need:2});save()}
function rightInReview(meta,q){var k=meta.grade+'-'+meta.subject;var l=st.wrong[k]||[];var key=JSON.stringify(q.q)+JSON.stringify(q.answer||q.items);
 l.forEach(function(x){if(x.key===key)x.need--});st.wrong[k]=l.filter(function(x){return x.need>0});save()}

// 卡通角色「波波」：純 inline SVG＋CSS 動畫，冇外部圖片
// 角色主題表（科目 × 年級）：顏色、道具、名、每個狀態嘅動作；年級再改配件、眼、幅度、速度 → 每個組合都唔同
var THEME={
 chi:{name:'墨墨',body:'#f56565',edge:'#9b2c2c',belly:'#fff5f5',arm:'#fc8181',conf:['#e53e3e','#2d3748','#ecc94b'],
  prop:'<g transform="rotate(30 12 12)"><rect x="9" y="0" width="6" height="20" rx="2" fill="#8b5a2b"/><path d="M8 20 Q12 32 16 20 Z" fill="#1a202c"/></g>',mv:{ok:'chi-ok',wrong:'chi-wrong',clear:'chi-clear',boss:'chi-boss'}},
 eng:{name:'Abby',body:'#9f7aea',edge:'#553c9a',belly:'#faf5ff',arm:'#b794f4',conf:['#805ad5','#f687b3','#63b3ed'],
  prop:'<rect x="0" y="4" width="24" height="17" rx="2" fill="#fff" stroke="#553c9a" stroke-width="2"/><text x="2" y="17" font-size="10" font-weight="bold" fill="#553c9a">ABC</text>',mv:{ok:'eng-ok',wrong:'eng-wrong',clear:'eng-clear',boss:'eng-boss'}},
 math:{name:'算算',body:'#48bb78',edge:'#276749',belly:'#f0fff4',arm:'#68d391',conf:['#38a169','#ecc94b','#3182ce'],
  prop:'<rect x="2" y="0" width="20" height="26" rx="3" fill="#2d3748"/><rect x="5" y="3" width="14" height="6" fill="#9ae6b4"/><text x="5" y="22" font-size="10" fill="#fff">+−</text>',mv:{ok:'math-ok',wrong:'math-wrong',clear:'math-clear',boss:'math-boss'}},
 hum:{name:'遊遊',body:'#ed8936',edge:'#9c4221',belly:'#fffaf0',arm:'#f6ad55',conf:['#dd6b20','#38a169','#3182ce'],
  prop:'<circle cx="12" cy="12" r="11" fill="#63b3ed" stroke="#2b6cb0" stroke-width="2"/><path d="M6 8 Q12 3 17 9 Q14 15 8 14 Z M14 16 Q19 17 18 21 Q14 21 14 16Z" fill="#48bb78"/>',mv:{ok:'hum-ok',wrong:'hum-wrong',clear:'hum-clear',boss:'hum-boss'}},
 sci:{name:'實實',body:'#38b2ac',edge:'#234e52',belly:'#e6fffa',arm:'#4fd1c5',conf:['#319795','#9f7aea','#f6e05e'],
  prop:'<path d="M8 2 H16 V10 L22 26 H2 L8 10 Z" fill="#e6fffa" stroke="#234e52" stroke-width="2"/><path d="M5 20 H19 L22 26 H2 Z" fill="#9f7aea"/>',mv:{ok:'sci-ok',wrong:'sci-wrong',clear:'sci-clear',boss:'sci-boss'}}};
var GTHEME={
 P1:{acc:'<path d="M36 22 Q50 30 64 22 Q50 14 36 22Z" fill="#f687b3"/><circle cx="50" cy="22" r="4" fill="#d53f8c"/>',eye:11,amp:1.35,dur:1.25,iter:2,label:'小一'},
 P2:{acc:'<path d="M26 30 Q50 6 74 30 Z" fill="#4299e1"/><rect x="60" y="27" width="22" height="5" rx="2" fill="#2b6cb0"/>',eye:10,amp:1.15,dur:1.05,iter:3,label:'小二'},
 P3:{acc:'<path d="M24 28 C20 12 58 6 76 22 C66 30 34 32 24 28Z" fill="#ed64a6" stroke="#97266d" stroke-width="2"/><path d="M48 12 Q52 4 56 8" stroke="#97266d" stroke-width="2.5" fill="none" stroke-linecap="round"/><polygon points="62,21 64,16 69,16 65,19 66,24 62,21 58,24 59,19 55,16 60,16" fill="#ecc94b"/>',eye:9.5,amp:1.05,dur:.95,iter:3,label:'小三'},
 P4:{acc:'<g fill="none" stroke="#1a202c" stroke-width="2.5"><circle cx="38" cy="50" r="11"/><circle cx="62" cy="50" r="11"/><path d="M49 50 H51"/></g>',eye:9,amp:.95,dur:.85,iter:3,label:'小四'},
 P5:{acc:'<path d="M26 24 L50 14 L74 24 L50 34 Z" fill="#1a202c"/><rect x="42" y="26" width="16" height="8" fill="#1a202c"/><path d="M72 24 V36" stroke="#ecc94b" stroke-width="2"/><circle cx="72" cy="37" r="2.5" fill="#ecc94b"/>',eye:8.5,amp:.8,dur:.7,iter:3,label:'小五'},
 P6:{acc:'<path d="M20 74 Q50 92 80 74 L74 62 Q50 74 26 62 Z" fill="#553c9a" stroke="#ecc94b" stroke-width="2"/><circle cx="50" cy="74" r="5" fill="#ecc94b" stroke="#b7791f" stroke-width="1.5"/><g transform="translate(8 14)"><path d="M4 4 H16 V11 Q16 17 10 17 Q4 17 4 11 Z" fill="#ecc94b" stroke="#b7791f" stroke-width="1.5"/><path d="M4 6 H1 Q1 12 4 12 M16 6 H19 Q19 12 16 12" fill="none" stroke="#b7791f" stroke-width="1.5"/><rect x="8" y="17" width="4" height="4" fill="#b7791f"/><rect x="5" y="21" width="10" height="3" rx="1" fill="#ecc94b" stroke="#b7791f" stroke-width="1"/></g>',eye:8,amp:.75,dur:.65,iter:4,label:'小六'}};
function mascot(mood,grade,subj){var t=THEME[subj]||THEME.math,g=GTHEME[grade]||GTHEME.P4;var sad=mood==='wrong';
 var mouth=sad?'<path d="M41 72 Q50 64 59 72" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>':'<path d="M38 66 Q50 80 62 66" stroke="#333" stroke-width="3" fill="#f66" stroke-linecap="round"/>';
 var extra=mood==='boss'?'<path d="M30 14 L36 0 L44 10 L50 -4 L56 10 L64 0 L70 14 Z" fill="#f6c344" stroke="#b7791f" stroke-width="2"/>':mood==='clear'?'<text x="2" y="20" font-size="16" fill="#f6c344">★</text><text x="80" y="20" font-size="16" fill="#f6c344">★</text>':'';
 var arms=sad?'<path d="M14 66 Q6 74 12 82" stroke="'+t.arm+'" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M86 66 Q94 74 88 82" stroke="'+t.arm+'" stroke-width="7" fill="none" stroke-linecap="round"/>':'<path d="M14 62 Q4 46 10 36" stroke="'+t.arm+'" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M86 62 Q96 46 90 36" stroke="'+t.arm+'" stroke-width="7" fill="none" stroke-linecap="round"/>';
 var ey=sad?53:50,e=g.eye;
 var svg='<svg viewBox="0 -6 100 106" width="100%" height="100%" aria-hidden="true">'+arms+'<ellipse cx="50" cy="60" rx="36" ry="34" fill="'+t.body+'" stroke="'+t.edge+'" stroke-width="3"/><ellipse cx="50" cy="72" rx="20" ry="15" fill="'+t.belly+'"/><circle cx="38" cy="50" r="'+e+'" fill="#fff"/><circle cx="62" cy="50" r="'+e+'" fill="#fff"/><circle cx="'+(sad?37:39)+'" cy="'+ey+'" r="'+(e/2)+'" fill="#223"/><circle cx="'+(sad?61:63)+'" cy="'+ey+'" r="'+(e/2)+'" fill="#223"/><circle cx="27" cy="64" r="5" fill="#f9a8d4" opacity=".7"/><circle cx="73" cy="64" r="5" fill="#f9a8d4" opacity=".7"/>'+mouth+g.acc+'<g transform="translate(80 62) scale(.75)">'+t.prop+'</g>'+extra+'</svg>';
 var iter=(mood==='ok'||mood==='wrong')?1:g.iter;var dur=(mood==='ok'||mood==='wrong')?g.dur*.6:g.dur;
 var m=h('div',{class:'mascot m-'+mood+' t-'+subj+' g-'+grade,'data-theme':subj+'-'+grade+'-'+mood,style:'--amp:'+g.amp+';animation:'+t.mv[mood]+' '+dur.toFixed(2)+'s ease-in-out '+iter+' both',role:'img','aria-label':t.name+'（'+g.label+'）：'+(sad?'唔緊要，再試吓！':'好嘢！'),html:svg});
 if(mood==='clear'||mood==='boss'){var cf=h('div',{class:'confetti c-'+subj,'aria-hidden':'true'});var n=mood==='boss'?20:12;for(var i=0;i<n;i++){var d=h('i',{style:'left:'+(i*(100/n)+2)+'%;animation-delay:'+(i%5)*.12+'s;background:'+t.conf[i%t.conf.length]+(subj==='math'?';border-radius:0':subj==='sci'?';border-radius:50%':'')});cf.appendChild(d)}var w=h('div',{class:'mascot-wrap'});w.appendChild(cf);w.appendChild(m);return w}
 return m}
function play(qs,meta){var s=meta.subject;var list=meta.review||meta.boss?qs:shuffle(qs).slice(0,8);var i=0,score=0,firstTry=true;
 var lang=s==='eng'?'en-GB':'zh-HK';var readAloud=meta.grade==='P2'&&(s==='chi'||s==='eng'||true);
 function show(){fresh();firstTry=true;var q=list[i];
  var c=h('div',{class:'card'});c.appendChild(h('div',{},[h('button',{onclick:function(){world(meta.grade,s)}},['⬅ '+T(s,'離開','Quit')]),h('b',{},[meta.title]),h('span',{class:'tag'},[(i+1)+' / '+list.length])]));
  var pr=h('div',{class:'prog'},[h('div',{style:'width:'+(i/list.length*100)+'%'})]);c.appendChild(pr);
  var qtext=q.type==='order'?q.q:q.q;c.appendChild(h('div',{class:'q'},[qtext]));
  var shown=q.items?shuffle(q.items):null;
  if(readAloud){var say=qtext.replace(/[。：:]$/,'')+(q.options?'。'+q.options.join('，'):'')+(shown?'。'+shown.join('，'):'');
   if('speechSynthesis' in window){var sb=h('button',{class:'speak','data-lang':lang,'aria-label':'read aloud',onclick:function(){loadV();speak(say,lang)}},['🔊 '+T(s,'讀題','Read aloud')]);if(!canSpeak(lang))sb.style.display='none';c.appendChild(sb)}}
  if(q._from)c.appendChild(h('div',{class:'note'},[q._from]));
  var area=h('div',{class:'opts'});c.appendChild(area);var fb=h('div');c.appendChild(fb);app.appendChild(c);
  function result(ok,btn){if(ok){if(firstTry)score++;if(meta.review)rightInReview(meta,q);fb.className='fb ok';fb.innerHTML='';fb.appendChild(mascot('ok',meta.grade,s));fb.appendChild(document.createTextNode('✅ '+T(s,'答對了！','Correct! ')+(q.explain||'')));if(q.working){fb.appendChild(h('div',{class:'eq'},[T(s,'算式：','Equation: ')+q.equation]));fb.appendChild(h('pre',{class:'working'},[q.working.join('\n')]))}
    fb.appendChild(h('div',{},[h('button',{class:'primary',onclick:function(){i++;i<list.length?show():finish()}},[T(s,'下一題 ➜','Next ➜')])]));Array.prototype.forEach.call(area.querySelectorAll('button,input'),function(b){b.disabled=true})}
   else{if(firstTry&&!meta.review)addWrong(meta,q);if(firstTry&&meta.review)addWrong(meta,q);firstTry=false;fb.className='fb no';fb.innerHTML='';fb.appendChild(mascot('wrong',meta.grade,s));fb.appendChild(document.createTextNode('❌ '+T(s,'再試一次！再讀一次題目，諗吓重點。','Try again! Read the question once more.')+(q.hint?' '+q.hint:'')));if(btn){btn.classList.add('wrong');btn.disabled=true}}}
  if(q.type==='mc'){q.options.forEach(function(o){var b=h('button',{onclick:function(){var ok=o===q.answer;if(ok)b.classList.add('correct');result(ok,b)}},[o]);area.appendChild(b)})}
  else if(q.type==='tf'){[[true,T(s,'✔ 對','✔ True')],[false,T(s,'✘ 錯','✘ False')]].forEach(function(p){var b=h('button',{onclick:function(){var ok=p[0]===q.answer;if(ok)b.classList.add('correct');result(ok,b)}},[p[1]]);area.appendChild(b)})}
  else if(q.type==='fill'){var inp=h('input',{type:'text',inputmode:q.numeric?'numeric':'text',placeholder:T(s,'輸入答案','Type your answer'),autocomplete:'off'});
   var go=function(){var v=norm(inp.value);if(!v)return;if(coarse)inp.blur();var ok=q.answer.some(function(a){return norm(a)===v});if(ok)inp.classList.add('correct');else{inp.classList.add('wrong');setTimeout(function(){inp.classList.remove('wrong')},600)}result(ok)};
   inp.onkeydown=function(e){if(e.key==='Enter')go()};area.appendChild(inp);area.appendChild(h('button',{class:'primary',onclick:go},[T(s,'確定','Check')]));if(!coarse)setTimeout(function(){inp.focus()},50)}
  else if(q.type==='order'){var picked=[];var box=h('div',{class:'order-picked'});area.appendChild(h('div',{class:'note'},[T(s,'依次序按下：','Tap in order:')]));area.appendChild(box);
   var pool=h('div');shown.forEach(function(it){var b=h('button',{onclick:function(){picked.push(it);b.disabled=true;box.appendChild(h('span',{class:'tag'},[it]));if(picked.length===q.items.length){var ok=picked.join('|')===q.items.join('|');result(ok);if(!ok){picked=[];box.innerHTML='';Array.prototype.forEach.call(pool.children,function(x){x.disabled=false})}}}},[it]);pool.appendChild(b)});area.appendChild(pool)}
 }
 function finish(){var r=score/list.length;var stars=r>=.9?3:r>=.7?2:r>=.5?1:0;if(!meta.review)st.stars[meta.id]=Math.max(st.stars[meta.id]||0,stars);
  if(meta.boss&&stars>=2)st.badges[meta.id]=1;var all=levelsOf(meta.grade,s);if(all.length&&all.every(function(l){return st.stars[l.id]===3}))st.badges['perfect-'+meta.grade+'-'+s]=1;save();upd();
  fresh();var c=h('div',{class:'card',style:'text-align:center'},[mascot(meta.boss&&stars>=2?'boss':stars?'clear':'wrong',meta.grade,s),h('div',{class:'big'},[meta.boss&&stars>=2?T(s,'打敗 Boss！','Boss defeated!'):stars?T(s,'過關！','Level clear!'):T(s,'再努力！','Keep trying!')]),h('div',{style:'font-size:3rem'},[h('span',{class:'gold'},['★★★'.slice(0,stars)]),h('span',{class:'dim'},['☆☆☆'.slice(0,3-stars)])]),
   h('p',{},[T(s,'第一次就答對：','First-try correct: ')+score+' / '+list.length]),meta.boss&&stars>=2?h('p',{},['🏅 '+T(s,'獲得 Boss 徽章！','Boss badge earned!')]):h('span'),
   h('button',{onclick:function(){play(qs,meta)}},['🔁 '+T(s,'再玩','Play again')]),h('button',{class:'primary',onclick:function(){world(meta.grade,s)}},[T(s,'返回地圖','Back to map')])]);app.appendChild(c)}
 show()}
document.getElementById('homeBtn').onclick=home;window.__mascot=mascot;window.__game={randomPick:randomPick,randCombos:randCombos,home:home,grade:grade,world:world,play:play};try{var wm=location.hash.match(/^#world=(P\d)-(\w+)$/);if(wm){world(wm[1],wm[2]);return}var m=location.hash.match(/^#level=(.+)$/);var L=m&&BANK.levels.filter(function(l){return l.id===m[1]})[0];if(L)play(L.questions,{id:L.id,title:L.title,grade:L.grade,subject:L.subject});else home();}catch(e){try{home()}catch(e2){if(window.__jsfail)window.__jsfail()}}
})();
