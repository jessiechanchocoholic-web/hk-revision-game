// Builds ../questions.js from content.txt + math generators. Run: node tools/build.js
const fs=require('fs'),path=require('path');
let seed=20261021;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};
const ri=(a,b)=>a+Math.floor(rnd()*(b-a+1));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=ri(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const gcd=(a,b)=>b?gcd(b,a%b):a;
const frac=(n,d)=>{const g=gcd(Math.abs(n),d);n/=g;d/=g;return d===1?String(n):n+'/'+d};
const levels=[];let cur;
for(const line of fs.readFileSync(path.join(__dirname,'content.txt'),'utf8').split('\n')){
  if(!line.trim()||line.startsWith('# '))continue;
  if(line.startsWith('## ')){const [g,s,id,t]=line.slice(3).split('|');cur={id,grade:g,subject:s,title:t,questions:[]};levels.push(cur);continue}
  const k=line[0],b=line.slice(2).split('|');
  if(k==='M')cur.questions.push({type:'mc',q:b[0],answer:b[1],options:shuffle(b.slice(1,5)),explain:b[5]});
  else if(k==='T'||k==='F')cur.questions.push({type:'tf',q:b[0],answer:k==='T',explain:b[1]});
  else if(k==='S')cur.questions.push({type:'fill',q:b[0],answer:b[1].split('/'),explain:b[2]});
  else if(k==='O')cur.questions.push({type:'order',q:b[1],items:b[0].split('>'),explain:b[2]});
}
// --- math helpers
const mcN=(q,ans,wrongs,ex)=>{const w=[...new Set(wrongs.map(String))].filter(x=>x!==String(ans)).slice(0,3);return{type:'mc',q,answer:String(ans),options:shuffle([String(ans),...w]),explain:ex}};
const fillN=(q,ans,ex)=>({type:'fill',q,answer:[String(ans)],explain:ex,numeric:true});
const L=(g,id,t,qs)=>levels.push({id,grade:g,subject:'math',title:t,questions:qs});
const rep=(n,f)=>Array.from({length:n},(_,i)=>f(i));
// P2
L('P2','p2m1','L1 三位數',[
 ...rep(2,()=>{const h=ri(1,9),t=ri(0,9),o=ri(0,9),n=h*100+t*10+o;return fillN(`${h}個百、${t}個十和${o}個一合起來是多少？`,n,`${h}×100＋${t}×10＋${o}＝${n}`)}),
 ...rep(2,()=>{let a=ri(100,999),b=ri(100,999);if(a===b)b++;const big=Math.max(a,b);return mcN(`${a} 和 ${b}，哪個較大？`,big,[Math.min(a,b)],`先比百位，再比十位、個位，${big}較大。`)}),
 (()=>{const n=ri(101,989);return mcN(`${n} 的百位數字是多少？`,Math.floor(n/100),[n%10,Math.floor(n/10)%10,Math.floor(n/100)+1],`${n} 的百位是 ${Math.floor(n/100)}。`)})(),
 fillN('一千是多少個百？',10,'10個百＝1000。')]);
L('P2','p2m2','L2 數數活動',[
 fillN('25、50、75、（ ），括號應填？',100,'每次加25。'),
 fillN('100、200、300、（ ），括號應填？',400,'每次加100。'),
 fillN('20、40、60、80、（ ），括號應填？',100,'每次加20。'),
 fillN('50、100、150、（ ），括號應填？',200,'每次加50。'),
 mcN('有6組，每組20粒糖，大約數數共有多少粒？',120,[100,26,140],'20、40、60、80、100、120。'),
 fillN('300、275、250、（ ），括號應填？',225,'每次減25。')]);
const add=(lo,hi)=>()=>{const a=ri(lo,hi),b=ri(lo,Math.min(hi,999-a));return fillN(`${a} ＋ ${b} ＝ ？`,a+b,`${a}＋${b}＝${a+b}`)};
const sub=(lo,hi)=>()=>{let a=ri(lo,hi),b=ri(10,a-1);return fillN(`${a} － ${b} ＝ ？`,a-b,`${a}－${b}＝${a-b}`)};
L('P2','p2m3','L3 加法(一)',rep(6,add(10,99)).map((q,i)=>i<5?q:mcN('99＋45 用巧算：先算 100＋45 再…',144,[146,145,154],'100＋45＝145，再減1＝144。')));
L('P2','p2m4','L4 加法(二)',rep(6,add(100,500)));
L('P2','p2m5','L5 減法',rep(6,sub(200,999)));
L('P2','p2m6','L6 加減應用題',[
 ...rep(3,()=>{const a=ri(120,400),b=ri(50,300);return fillN(`圖書館有故事書${a}本，又買了${b}本，現在共有多少本？`,a+b,`${a}＋${b}＝${a+b}`)}),
 ...rep(3,()=>{const a=ri(300,800),b=ri(50,299);return fillN(`學校有${a}個學生，其中${b}個去旅行，留在學校的有多少個？`,a-b,`${a}－${b}＝${a-b}`)})]);
L('P2','p2m7','L7 角和直角',[
 mcN('時鐘3時正，兩支針形成甚麼角？','直角',['銳角','鈍角','沒有角'],'3時正兩針成直角。'),
 {type:'tf',q:'一個角有一個頂點和兩條邊。',answer:true,explain:'角由頂點和兩條邊組成。'},
 mcN('一張長方形紙有多少個直角？',4,[2,3,0],'長方形4個角都是直角。'),
 {type:'tf',q:'角的大小和邊的長短有關。',answer:false,explain:'角的大小只看兩條邊張開的程度。'},
 mcN('正方形有多少個直角？',4,[1,2,3],'正方形4個角都是直角。'),
 mcN('三角尺上最大的角通常是：','直角',['銳角','鈍角','平角'],'三角尺有一個直角。')]);
L('P2','p2m8','L8 垂直線',[
 mcN('兩條直線相交成直角，叫做：','互相垂直',['互相平行','重疊','彎曲'],'相交成直角就是垂直。'),
 {type:'tf',q:'長方形相鄰的兩條邊互相垂直。',answer:true,explain:'相鄰兩邊成直角。'},
 {type:'tf',q:'互相垂直的兩條線一定不相交。',answer:false,explain:'垂直線相交成直角。'},
 mcN('哪個英文字母有互相垂直的線？','T',['O','S','C'],'T 的一橫一豎互相垂直。'),
 mcN('檢查兩條線是否垂直，可以用：','三角尺的直角',['溫度計','秤','時鐘'],'用三角尺的直角比一比。')]);
L('P2','p2m9','L9 銳角和鈍角',[
 mcN('比直角小的角叫：','銳角',['鈍角','平角','直角'],'小於直角是銳角。'),
 mcN('比直角大（但小於一直線）的角叫：','鈍角',['銳角','直角','圓角'],'大於直角是鈍角。'),
 mcN('時鐘1時正，兩支針形成甚麼角？','銳角',['鈍角','直角','沒有角'],'1時兩針張開很小，是銳角。'),
 mcN('時鐘5時正，兩支針形成甚麼角？','鈍角',['銳角','直角','沒有角'],'5時兩針張開比直角大。'),
 {type:'tf',q:'銳角比鈍角小。',answer:true,explain:'銳角＜直角＜鈍角。'},
 mcN('正方形的角是：','直角',['銳角','鈍角','都不是'],'正方形4個直角。')]);
L('P2','p2m10','L10 米的認識(一)',[
 mcN('量度課室的長度，用甚麼單位最適合？','米(m)',['厘米(cm)','公斤(kg)','升(L)'],'較長的距離用米。'),
 fillN('1米＝（ ）厘米',100,'1m＝100cm。'),
 {type:'tf',q:'1米比1厘米長。',answer:true,explain:'1米＝100厘米。'},
 mcN('一扇門大約高多少？','2米',['2厘米','20米','200米'],'門大約2米高。'),
 mcN('量度一條長跑道，用：','米',['厘米','克','毫升'],'長距離用米。')]);
L('P2','p2m11','L11 米的認識(二)',[
 ...rep(3,()=>{const m=ri(1,5),c=ri(5,95);return fillN(`${m}米${c}厘米＝（ ）厘米`,m*100+c,`${m}米＝${m*100}厘米，再加${c}厘米。`)}),
 (()=>{const a=ri(2,6),b=ri(1,a-1);return fillN(`繩子長${a}米，剪去${b}米，剩下多少米？`,a-b,`${a}－${b}＝${a-b}`)})(),
 fillN('300厘米＝（ ）米',3,'100厘米＝1米。'),
 mcN('哪個最長？','2米',['150厘米','99厘米','1米'],'2米＝200厘米，最長。')]);
const hhmm=(h,m)=>`${h}時${m===0?'正':m+'分'}`;
L('P2','p2m18','L18 報時',[
 ...rep(3,()=>{const h=ri(1,12),m=ri(0,11)*5;const wrong=[hhmm(h,(m+15)%60),hhmm(h%12+1,m),hhmm(h,(m+30)%60)];return mcN(`時針指着${h}和${h%12+1}之間（或剛好${h}），分針指着${m/5===0?12:m/5}。現在是幾時幾分？`,hhmm(h,m),wrong,`分針指${m/5===0?12:m/5}表示${m}分。`)}),
 fillN('分針由12走到6，經過了多少分鐘？',30,'每個數字代表5分鐘，6×5＝30。'),
 fillN('1小時＝（ ）分鐘',60,'1小時有60分鐘。'),
 mcN('「3時半」即是：','3時30分',['3時15分','3時45分','6時3分'],'半小時＝30分。')]);
L('P2','p2m19','L19 活動時間',[
 ...rep(4,()=>{const h=ri(8,15),m=ri(0,6)*5,d=ri(2,9)*5;const e=h*60+m+d;return fillN(`活動由${hhmm(h,m)}開始，${hhmm(Math.floor(e/60),e%60)}結束，共用了多少分鐘？`,d,`由開始到結束共${d}分鐘。`)}),
 mcN('早上上學，大約是：','上午8時',['下午8時','晚上11時','凌晨3時'],'上學在上午。'),
 {type:'tf',q:'下午3時比上午10時遲。',answer:true,explain:'下午在上午之後。'}]);
L('P2','p2m20','L20 年和月',[
 fillN('一年有多少個月？',12,'一年12個月。'),
 mcN('哪個月有31日？','1月',['4月','6月','9月'],'1、3、5、7、8、10、12月有31日。'),
 mcN('哪個月只有30日？','11月',['10月','12月','8月'],'4、6、9、11月有30日。'),
 fillN('平年的2月有多少日？',28,'平年2月28日，閏年29日。'),
 mcN('3月的下一個月是：','4月',['2月','5月','12月'],'3月之後是4月。'),
 fillN('平年一年有多少日？',365,'平年365日。')]);
// P4
L('P4','p4m4','L4 菱形',[
 mcN('菱形的四條邊：','都一樣長',['都不一樣長','只有兩條一樣長','一定有直角'],'菱形四邊相等。'),
 {type:'tf',q:'正方形是一種特別的菱形。',answer:true,explain:'正方形四邊相等，也是菱形。'},
 {type:'tf',q:'菱形的四個角一定是直角。',answer:false,explain:'菱形的角不一定是直角。'},
 (()=>{const s=ri(3,12);return fillN(`菱形一條邊長${s}cm，周界是多少cm？`,4*s,`4×${s}＝${4*s}`)})(),
 mcN('菱形的對邊：','互相平行',['互相垂直','長短不同','不相交也不平行'],'菱形兩組對邊互相平行。')]);
L('P4','p4m5','L5 四邊形之間的關係',[
 {type:'tf',q:'所有正方形都是長方形。',answer:true,explain:'正方形有4個直角，也是長方形。'},
 {type:'tf',q:'所有長方形都是正方形。',answer:false,explain:'長方形四邊不一定相等。'},
 {type:'tf',q:'長方形是平行四邊形。',answer:true,explain:'長方形兩組對邊平行。'},
 mcN('只有一組對邊平行的四邊形是：','梯形',['菱形','長方形','正方形'],'梯形只有一組對邊平行。'),
 mcN('四邊相等並有4個直角的是：','正方形',['梯形','平行四邊形','菱形（非正方形）'],'正方形。')]);
const div=(q)=>()=>{const d=ri(2,9),r=ri(11,q);return fillN(`${d*r} ÷ ${d} ＝ ？`,r,`${d}×${r}＝${d*r}`)};
L('P4','p4m6','L6 除法(一)',rep(6,div(99)));
L('P4','p4m7','L7 除法(二)',[...rep(3,div(300)),...rep(3,()=>{const d=ri(3,9),qq=ri(12,99),r=ri(1,d-1),n=d*qq+r;return fillN(`${n} ÷ ${d} 的餘數是多少？`,r,`${d}×${qq}＝${d*qq}，${n}－${d*qq}＝${r}`)})]);
L('P4','p4m8','L8 乘除應用題',[
 ...rep(3,()=>{const a=ri(12,48),b=ri(3,9);return fillN(`每盒有${a}枝筆，${b}盒共有多少枝？`,a*b,`${a}×${b}＝${a*b}`)}),
 ...rep(3,()=>{const b=ri(3,9),r=ri(12,60);return fillN(`${b*r}個蘋果平均分給${b}個班，每班得多少個？`,r,`${b*r}÷${b}＝${r}`)})]);
const divisible=(n,k)=>n%k===0;
L('P4','p4m9','L9 整除性',[
 ...[2,3,5,4,9,10].map(k=>{let n;do{n=ri(100,999)}while(!divisible(n,k));const ws=[];while(ws.length<3){const m=ri(100,999);if(!divisible(m,k)&&!ws.includes(m))ws.push(m)}return mcN(`哪個數可以被${k}整除？`,n,ws,`${n}÷${k}＝${n/k}，沒有餘數。`)})]);
L('P4','p4m11','L11 方向(一)',[
 mcN('面向北，向後轉，面向：','南',['東','西','北'],'北的相反是南。'),
 mcN('面向北，右手指向：','東',['西','南','北'],'面北時右手是東。'),
 mcN('面向東，左手指向：','北',['南','西','東'],'面東時左手是北。'),
 mcN('太陽在早上從哪方升起？','東',['西','南','北'],'日出東方。'),
 mcN('東的相反方向是：','西',['南','北','東'],'東與西相反。')]);
L('P4','p4m12','L12 方向(二)',[
 mcN('東和北之間的方向是：','東北',['西北','東南','西南'],'東、北之間是東北。'),
 mcN('西北的相反方向是：','東南',['東北','西南','南'],'西北對東南。'),
 mcN('西和南之間的方向是：','西南',['東南','西北','東北'],'西南。'),
 mcN('東北的相反方向是：','西南',['西北','東南','南'],'東北對西南。'),
 mcN('面向北，向右轉半個直角，面向：','東北',['西北','東','北'],'北和東之間是東北。'),
 mcN('一共有多少個主要方向（包括東南西北和四個斜方向）？','8',['4','6','10'],'東、南、西、北及東北、東南、西北、西南。')]);
const multsOf=(k)=>()=>{const ws=[];let n=k*ri(3,12);while(ws.length<3){const m=ri(10,99);if(m%k&&!ws.includes(m))ws.push(m)}return mcN(`哪個是${k}的倍數？`,n,ws,`${n}＝${k}×${n/k}。`)};
L('P4','p4m13','L13 倍數',[...[3,4,6,7,8].map(k=>multsOf(k)()),fillN('6的第4個倍數是多少？',24,'6、12、18、24。')]);
const factors=n=>{const f=[];for(let i=1;i<=n;i++)if(n%i===0)f.push(i);return f};
L('P4','p4m14','L14 因數',[...[12,18,20,24,30].map(n=>{const f=factors(n);const ws=[];while(ws.length<3){const m=ri(2,n-1);if(n%m&&!ws.includes(m))ws.push(m)}const a=f[ri(1,f.length-2)];return mcN(`哪個是${n}的因數？`,a,ws,`${n}÷${a}＝${n/a}，${n}的因數：${f.join('、')}`)}),fillN('12有多少個因數？',6,'1、2、3、4、6、12，共6個。')]);
L('P4','p4m18','L18 圖形分割',[
 mcN('一個正方形沿對角線剪開，得到兩個：','三角形',['正方形','圓形','梯形'],'對角線把正方形分成兩個三角形。'),
 mcN('一個長方形沿中間直線剪成兩半，可能得到兩個：','長方形',['三角形（一定）','圓形','五邊形'],'沿中線剪成兩個長方形。'),
 {type:'tf',q:'把一個圖形分割，各部分面積加起來等於原來的面積。',answer:true,explain:'分割不改變總面積。'},
 fillN('一個正方形畫兩條對角線，可分成多少個三角形？',4,'兩條對角線分成4個三角形。'),
 mcN('一個梯形可以分割成：','一個長方形和三角形',['兩個圓形','一個圓形和正方形','只能是梯形'],'梯形可分成長方形和三角形。')]);
L('P4','p4m19','L19 圖形拼砌',[
 mcN('兩個相同的直角三角形可以拼成：','長方形',['圓形','五邊形','圓柱'],'兩個直角三角形可拼成長方形。'),
 fillN('用多少個相同的小正方形可拼成一個邊長2格的正方形？',4,'2×2＝4。'),
 mcN('兩個相同的正方形拼在一起成為：','長方形',['三角形','圓形','梯形'],'兩個正方形並排成長方形。'),
 {type:'tf',q:'兩個相同的梯形可以拼成一個平行四邊形。',answer:true,explain:'把其中一個梯形倒轉拼合。'},
 fillN('用多少個相同的小正方形可拼成一個邊長3格的正方形？',9,'3×3＝9。')]);
// P5
const fmt=n=>n.toLocaleString('en-US');
L('P5','p5m1','L1 多位數',[
 ...rep(2,()=>{const n=ri(10000,99999999);const s=String(n),k=ri(0,s.length-1),names=['個','十','百','千','萬','十萬','百萬','千萬'];const pos=s.length-1-k;return mcN(`在 ${fmt(n)} 中，數字 ${s[k]} 在哪個數位？（看第${k+1}個數字）`,names[pos]+'位',names.filter((_,i)=>i!==pos).slice(0,3).map(x=>x+'位'),`由右數起第${pos+1}位是${names[pos]}位。`)}),
 fillN('一百萬寫成數字是多少？（不用逗號）',1000000,'一百萬＝1000000。'),
 fillN('3個百萬、5個萬合起來是多少？（不用逗號）',3050000,'3000000＋50000＝3050000。'),
 (()=>{let a=ri(1000000,9999999),b=a+ri(-50000,50000);if(a===b)b++;return mcN(`${fmt(a)} 和 ${fmt(b)}，哪個較大？`,fmt(Math.max(a,b)),[fmt(Math.min(a,b))],'由最高位起逐位比較。')})(),
 fillN('一千萬有多少個百萬？',10,'10×1000000＝10000000。')]);
const roundTo=(n,u)=>Math.round(n/u)*u;
L('P5','p5m2','L2 近似值和大數量的估計',[
 ...[[1000,'千位'],[10000,'萬位'],[100000,'十萬位'],[1000,'千位']].map(([u,nm])=>{let n=ri(100000,9999999);if(n%u===u/2)n++;const r=roundTo(n,u);return fillN(`把 ${n} 四捨五入至${nm}（不用逗號）。`,r,`看${nm}右邊一位，${r}。`)}),
 mcN('一包米約有20000粒，5包大約有多少粒？','100000',['25000','10000','1000000'],'20000×5＝100000。'),
 {type:'tf',q:'把 45 四捨五入至十位，得 50。',answer:true,explain:'個位是5，要進位。'}]);
const fr=()=>{const d=ri(3,12),n=ri(1,d-1);return[n,d]};
L('P5','p5m3','L3 分數的比較',[
 ...rep(5,()=>{let a,b;do{a=fr();b=fr()}while(a[0]*b[1]===b[0]*a[1]||a[1]===b[1]);const big=a[0]*b[1]>b[0]*a[1]?a:b,sm=big===a?b:a;return mcN(`${a[0]}/${a[1]} 和 ${b[0]}/${b[1]}，哪個較大？`,`${big[0]}/${big[1]}`,[`${sm[0]}/${sm[1]}`,'一樣大'],`通分後比較：${a[0]*b[1]}/${a[1]*b[1]} 與 ${b[0]*a[1]}/${a[1]*b[1]}。`)}),
 {type:'tf',q:'1/3 比 1/4 大。',answer:true,explain:'分子相同，分母越小分數越大。'}]);
const fqs=(op,n)=>rep(n,()=>{let a,b,r;do{a=fr();b=fr();r=op==='+'?a[0]*b[1]+b[0]*a[1]:a[0]*b[1]-b[0]*a[1]}while(a[1]===b[1]||r<=0);const d=a[1]*b[1];const ans=frac(r,d);return{type:'fill',q:`${a[0]}/${a[1]} ${op==='+'?'＋':'－'} ${b[0]}/${b[1]} ＝ ？（用最簡分數，例如 5/6 或 1 1/2 寫成 3/2）`,answer:[ans],explain:`通分：${a[0]*b[1]}/${d} ${op==='+'?'＋':'－'} ${b[0]*a[1]}/${d} ＝ ${r}/${d} ＝ ${ans}`,fraction:true}});
L('P5','p5m4','L4 異分母分數加法',[...fqs('+',5),{type:'mc',q:'1/2 ＋ 1/3 ＝ ？',answer:'5/6',options:shuffle(['5/6','2/5','2/6','1/6']),explain:'3/6＋2/6＝5/6。不可以分子加分子、分母加分母。'}]);
L('P5','p5m5','L5 異分母分數減法',[...fqs('-',5),{type:'mc',q:'3/4 － 1/2 ＝ ？',answer:'1/4',options:shuffle(['1/4','2/2','1/2','2/4']),explain:'3/4－2/4＝1/4。'}]);
L('P5','p5m6','L6 異分母分數加減混合運算',[
 ...rep(4,()=>{let a,b,c,r,d;do{a=fr();b=fr();c=fr();d=a[1]*b[1]*c[1];r=a[0]*b[1]*c[1]+b[0]*a[1]*c[1]-c[0]*a[1]*b[1]}while(r<=0||new Set([a[1],b[1],c[1]]).size<2||a[1]*b[1]*c[1]>500);const ans=frac(r,d);return{type:'fill',q:`${a[0]}/${a[1]} ＋ ${b[0]}/${b[1]} － ${c[0]}/${c[1]} ＝ ？（最簡分數）`,answer:[ans],explain:`通分計算，答案是 ${ans}`,fraction:true}}),
 (()=>{return{type:'fill',q:'一條絲帶長 3/4 米，用去 1/3 米，再用去 1/6 米，剩下多少米？（最簡分數）',answer:[frac(9-4-2,12)],explain:'9/12－4/12－2/12＝3/12＝1/4',fraction:true}})()]);
L('P5','p5m7','L7 平行四邊形',[...rep(4,()=>{const b=ri(3,15),h=ri(2,12);return fillN(`平行四邊形底${b}cm，高${h}cm，面積是多少cm²？`,b*h,`底×高＝${b}×${h}＝${b*h}`)}),{type:'tf',q:'平行四邊形的面積＝底×高。',answer:true,explain:'公式：底×高。'},(()=>{const b=ri(4,12),h=ri(2,9);return fillN(`平行四邊形面積${b*h}cm²，底${b}cm，高是多少cm？`,h,`${b*h}÷${b}＝${h}`)})()]);
L('P5','p5m8','L8 三角形',[...rep(4,()=>{const b=ri(2,10)*2,h=ri(3,12);return fillN(`三角形底${b}cm，高${h}cm，面積是多少cm²？`,b*h/2,`底×高÷2＝${b}×${h}÷2＝${b*h/2}`)}),mcN('三角形面積公式是：','底×高÷2',['底×高','底＋高','(底＋高)×2'],'三角形是同底同高平行四邊形的一半。'),(()=>{const b=8,h=ri(3,9);return fillN(`三角形面積${b*h/2}cm²，底${b}cm，高是多少cm？`,h,`${b*h/2}×2÷${b}＝${h}`)})()]);
L('P5','p5m9','L9 梯形',[...rep(4,()=>{const a=ri(2,10),b=ri(a+1,16),h=ri(1,6)*2;return fillN(`梯形上底${a}cm，下底${b}cm，高${h}cm，面積是多少cm²？`,(a+b)*h/2,`(${a}＋${b})×${h}÷2＝${(a+b)*h/2}`)}),mcN('梯形面積公式是：','(上底＋下底)×高÷2',['上底×下底','底×高','(上底＋下底)×2'],'梯形面積＝(上底＋下底)×高÷2。'),{type:'tf',q:'梯形的高是上底和下底之間的垂直距離。',answer:true,explain:'高要與底垂直。'}]);
L('P5','p5m10','L10 多邊形的面積',[...rep(4,()=>{const w=ri(4,10),h=ri(3,8),tb=w,th=ri(2,6);return fillN(`一個多邊形由長方形（長${w}cm，闊${h}cm）和三角形（底${tb}cm，高${th}cm）組成，總面積是多少cm²？`,w*h+tb*th/2,`${w}×${h}＋${tb}×${th}÷2＝${w*h+tb*th/2}`)}),mcN('計算多邊形面積，常用方法是：','分割成已知圖形再相加',['量周界','數頂點','只看最長的邊'],'先分割成長方形、三角形等，再相加或相減。'),(()=>{const W=ri(8,12),H=ri(6,9),c=ri(2,4);return fillN(`長方形${W}cm×${H}cm，切去一個邊長${c}cm的正方形角，剩下面積是多少cm²？`,W*H-c*c,`${W*H}－${c*c}＝${W*H-c*c}`)})()]);
L('P5','p5m14','L14 代數符號(一)',[...rep(3,()=>{const x=ri(2,20);return fillN(`若 y ＝ ${x}，y ＋ 7 ＝ ？`,x+7,`${x}＋7＝${x+7}`)}),mcN('「a 的 3 倍」用代數表示是：','3a',['a＋3','a－3','a÷3'],'3×a 寫作 3a。'),mcN('「比 n 少 5」用代數表示是：','n－5',['5－n','5n','n＋5'],'比 n 少 5 即 n－5。'),(()=>{const x=ri(2,9);return fillN(`若 x ＝ ${x}，4x ＝ ？`,4*x,`4×${x}＝${4*x}`)})()]);
L('P5','p5m15','L15 代數符號(二)',[...rep(3,()=>{const x=ri(2,12),y=ri(1,9);return fillN(`若 a ＝ ${x}、b ＝ ${y}，2a ＋ b ＝ ？`,2*x+y,`2×${x}＋${y}＝${2*x+y}`)}),mcN('每枝筆 p 元，買 6 枝要付：','6p 元',['p＋6 元','p－6 元','p÷6 元'],'6×p＝6p。'),mcN('小明有 m 張貼紙，送出 4 張，剩下：','m－4 張',['4－m 張','4m 張','m＋4 張'],'m－4。'),(()=>{const k=ri(3,9),x=ri(2,9);return fillN(`若 n ＝ ${x}，${k}n － ${x} ＝ ？`,k*x-x,`${k}×${x}－${x}＝${k*x-x}`)})()]);
// Boss: generated at runtime from world levels. Output
const subj={chi:'中文城',eng:'English Island',math:'數學山',hum:'人文村',sci:'科學實驗室'};
fs.writeFileSync(path.join(__dirname,'..','questions.js'),'// AUTO-GENERATED by tools/build.js — edit tools/content.txt or build.js, then run: node tools/build.js\nwindow.QUESTION_BANK = '+JSON.stringify({version:'2026-10-21',levels},null,1)+';\n');
console.log('levels',levels.length,'questions',levels.reduce((s,l)=>s+l.questions.length,0));
