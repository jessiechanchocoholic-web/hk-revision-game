// Builds ../questions.js from content.txt + math generators. Run: node tools/build.js
const fs=require('fs'),path=require('path');
let seed=20261021;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};
const ri=(a,b)=>a+Math.floor(rnd()*(b-a+1));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=ri(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const gcd=(a,b)=>b?gcd(b,a%b):a;
const frac=(n,d)=>{const g=gcd(Math.abs(n),d);n/=g;d/=g;return d===1?String(n):n+'/'+d};
// 關卡級來源覆寫：老師工作紙改寫題（B4-DEV-01），一律 verified:false（唔加入 VERIFIED）
const SRC_LEVEL={
  p1c3:'老師工作紙',p1c4:'老師工作紙',
  p1e5:'英文補充教材',p1e6:'英文補充教材',
  p2e4:'英文補充教材',p2e5:'英文補充教材',p2e6:'英文補充教材',p2e7:'英文補充教材',p2e8:'英文補充教材',p2e9:'英文補充教材',p2e10:'英文補充教材',p2e11:'英文補充教材',
  p3e5:'英文補充教材',p3e6:'英文補充教材',p3e7:'英文補充教材',p3e8:'英文補充教材',p3e9:'英文補充教材',
  p4e4:'英文補充教材',p4e5:'英文補充教材',
  p5e4:'英文補充教材',p5e5:'英文補充教材',
  p6e1:'英文補充教材',p6e2:'英文補充教材',p6e3:'英文補充教材',p6e4:'英文補充教材',p6e5:'英文補充教材',p6e6:'英文補充教材',
  p1m1:'課程補充題庫',p1m2:'課程補充題庫',p1m3:'課程補充題庫',
  p1h1:'課程補充題庫',p1h2:'課程補充題庫',
  p1s8:'課程補充題庫',p1s9:'課程補充題庫',
  p3c1:'課程補充題庫',p3c2:'課程補充題庫',p3c3:'課程補充題庫',p3c4:'課程補充題庫',p3c5:'課程補充題庫',
  p3m1:'課程補充題庫',p3m2:'課程補充題庫',p3m3:'課程補充題庫',p3m4:'課程補充題庫',p3m5:'課程補充題庫',
  p3h1:'課程補充題庫',p3h2:'課程補充題庫',p3h3:'課程補充題庫',
  p3s1:'課程補充題庫',p3s2:'課程補充題庫',p3s3:'課程補充題庫',
  p6c1:'課程補充題庫',p6c2:'課程補充題庫',p6c3:'課程補充題庫',p6c4:'課程補充題庫',p6c5:'課程補充題庫',
  p6m1:'課程補充題庫',p6m2:'課程補充題庫',p6m3:'課程補充題庫',p6m4:'課程補充題庫',p6m5:'課程補充題庫',
  p6h1:'課程補充題庫',p6h2:'課程補充題庫',p6h3:'課程補充題庫',
  p6s1:'課程補充題庫',p6s2:'課程補充題庫',p6s3:'課程補充題庫'
};
// 新關卡用獨立 seed 洗牌，避免改動其他關卡選項次序
let seed2=20261022;const shuffle2=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){seed2=(seed2*1103515245+12345)%2147483648;const j=Math.floor(seed2/2147483648*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const levels=[];let cur,psg=null;
for(const line of fs.readFileSync(path.join(__dirname,'content.txt'),'utf8').split('\n')){
  if(!line.trim()||line.startsWith('# '))continue;
  if(line.startsWith('## ')){const [g,s,id,t]=line.slice(3).split('|');cur={id,grade:g,subject:s,title:t,questions:[]};levels.push(cur);psg=null;continue}
  if(line.startsWith('P:')){const t=line.slice(2).trim();psg=(t&&t!=='-')?t.replace(/\\n/g,'\n'):null;continue}
  const nq=cur.questions.length;
  const k=line[0],b=line.slice(2).split('|');
  if(k==='M')cur.questions.push({type:'mc',q:b[0],answer:b[1],options:(SRC_LEVEL[cur.id]?shuffle2:shuffle)(b.slice(1,5)),explain:b[5]});
  else if(k==='T'||k==='F')cur.questions.push({type:'tf',q:b[0],answer:k==='T',explain:b[1]});
  else if(k==='S')cur.questions.push({type:'fill',q:b[0],answer:/^\d+\/\d+$/.test(b[1])?[b[1]]:b[1].split(/(?<!\\)\//).map(x=>x.replace(/\\\//g,'/')),explain:b[2]});
  else if(k==='O')cur.questions.push({type:'order',q:b[1],items:b[0].split('>'),explain:b[2]});
  if(psg&&cur.questions.length>nq)cur.questions[nq].passage=psg;
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
 ...rep(3,()=>{const h=ri(1,12),m=ri(0,11)*5;const wrong=[hhmm(h,(m+15)%60),hhmm(h%12+1,m),hhmm(h,(m+30)%60)];return mcN(`時針${m===0?'指着'+h:'在'+h+'和'+(h%12+1)+'之間'}，分針指着${m/5===0?12:m/5}。現在是幾時幾分？`,hhmm(h,m),wrong,`分針指${m/5===0?12:m/5}表示${m}分。`)}),
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
L('P4','p4m1','L1 乘法(一)',[
 ...rep(4,()=>{const a=ri(102,489),b=ri(12,39);return fillN(`${a} × ${b} ＝ ？`,a*b,`${a}×${b}＝${a*b}`)}),
 (()=>{const a=ri(11,99);return fillN(`${a} × 10 ＝ ？`,a*10,`乘10，在後面加一個0：${a*10}`)})(),
 (()=>{const a=ri(11,99);return fillN(`${a} × 100 ＝ ？`,a*100,`乘100，在後面加兩個0：${a*100}`)})()]);
L('P4','p4m2','L2 乘法(二)',[
 ...[ri(2,19),ri(21,40)].map(a=>{return fillN(`25 × ${a} × 4 ＝ ？（巧算：先算 25×4）`,100*a,`25×4＝100，100×${a}＝${100*a}`)}),
 (()=>{const a=ri(2,9);return fillN(`125 × 8 × ${a} ＝ ？`,1000*a,`125×8＝1000，1000×${a}＝${1000*a}`)})(),
 (()=>{const a=ri(12,48);return fillN(`${a} × 99 ＝ ？（巧算：${a}×100－${a}）`,a*99,`${a*100}－${a}＝${a*99}`)})(),
 (()=>{const a=ri(12,60);return fillN(`${a} × 101 ＝ ？（巧算：${a}×100＋${a}）`,a*101,`${a*100}＋${a}＝${a*101}`)})(),
 (()=>{const a=ri(12,40),b=ri(12,40);return fillN(`${a} × 36 ＋ ${a} × 64 ＝ ？`,a*100,`${a}×(36＋64)＝${a}×100＝${a*100}`)})()]);
L('P4','p4m3','L3 乘法(三)',[
 ...rep(3,()=>{const a=ri(15,95),b=ri(12,48);return fillN(`每箱有${a}個橙，${b}箱共有多少個？`,a*b,`${a}×${b}＝${a*b}`)}),
 (()=>{const p=ri(25,95),n=ri(12,30);return fillN(`每張門票${p}元，買${n}張共要多少元？`,p*n,`${p}×${n}＝${p*n}`)})(),
 (()=>{const r=ri(12,25),c=ri(20,40);return fillN(`禮堂有${r}行椅子，每行${c}張，共有多少張？`,r*c,`${r}×${c}＝${r*c}`)})(),
 (()=>{const d=10,w=ri(12,52);return fillN(`小明每天儲${d}元，${w}天共儲多少元？`,d*w,`${d}×${w}＝${d*w}`)})()]);
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
 mcN('沿一條對角線剪開一個梯形，可以得到：','兩個三角形',['兩個圓形','一個圓形和正方形','兩個梯形'],'對角線把梯形分成兩個三角形。')]);
L('P4','p4m19','L19 圖形拼砌',[
 mcN('兩個相同的直角三角形可以拼成：','長方形',['圓形','五邊形','圓柱'],'兩個直角三角形可拼成長方形。'),
 fillN('用多少個相同的小正方形可拼成一個邊長2格的正方形？',4,'2×2＝4。'),
 mcN('兩個相同的正方形拼在一起成為：','長方形',['三角形','圓形','梯形'],'兩個正方形並排成長方形。'),
 {type:'tf',q:'兩個相同的梯形可以拼成一個平行四邊形。',answer:true,explain:'把其中一個梯形倒轉拼合。'},
 fillN('用多少個相同的小正方形可拼成一個邊長3格的正方形？',9,'3×3＝9。')]);
// P5
const fmt=n=>n.toLocaleString('en-US');
L('P5','p5m1','L1 多位數',[
 ...rep(2,()=>{const n=ri(10000,99999999);const s=String(n),k=ri(0,s.length-1),names=['個','十','百','千','萬','十萬','百萬','千萬'];const pos=s.length-1-k;return mcN(`在 ${fmt(n)} 中，數字 ${s[k]} 在哪個數位？（由左數起第${k+1}個數字）`,names[pos]+'位',names.filter((_,i)=>i!==pos).slice(0,3).map(x=>x+'位'),`由右數起第${pos+1}位是${names[pos]}位。`)}),
 fillN('一百萬寫成數字是多少？（不用逗號）',1000000,'一百萬＝1000000。'),
 fillN('3個百萬、5個萬合起來是多少？（不用逗號）',3050000,'3000000＋50000＝3050000。'),
 (()=>{let a=ri(1000000,9999999),b=a+ri(-50000,50000);if(a===b)b++;return mcN(`${fmt(a)} 和 ${fmt(b)}，哪個較大？`,fmt(Math.max(a,b)),[fmt(Math.min(a,b))],'由最高位起逐位比較。')})(),
 fillN('一千萬有多少個百萬？',10,'10×1000000＝10000000。')]);
const roundTo=(n,u)=>Math.round(n/u)*u;
L('P5','p5m2','L2 近似值和大數量的估計',[
 ...[[1000,'千位'],[10000,'萬位'],[100000,'十萬位'],[1000,'千位']].map(([u,nm])=>{let n=ri(100000,9999999);if(n%u===u/2)n++;const r=roundTo(n,u);return fillN(`把 ${n} 四捨五入至${nm}（不用逗號）。`,r,`看${nm}右邊一位，${r}。`)}),
 mcN('一包米約有20000粒，5包大約有多少粒？','100000',['25000','10000','1000000'],'20000×5＝100000。'),
 {type:'tf',q:'把 45 四捨五入至十位，得 50。',answer:true,explain:'個位是5，要進位。'}]);
const fr=()=>{let d,n;do{d=ri(3,12);n=ri(1,d-1)}while(gcd(n,d)!==1);return[n,d]};
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

// --- B2-DEV-03 進階應用題：答案由程式計，附算式及逐步運算（calc 俾 validate.js 獨立覆核）
const pad=(x,w)=>String(x).padStart(w);
const longMul=(a,b)=>{const bs=String(b).split('').reverse().map(Number);const parts=bs.map((d,i)=>[a*d*10**i,d*10**i]).filter(x=>x[0]>0);const r=a*b;const w=String(r).length+2;
 return [pad(a,w),'×'+pad(b,w-1),'-'.repeat(w),...parts.map(([p,m])=>pad(p,w)+`  (${a}×${m})`),'-'.repeat(w),pad(r,w)]};
const wp=(q,ans,eq,steps,working,extra)=>Object.assign({type:'fill',q,answer:[String(ans)],numeric:!/\//.test(String(ans)),explain:'做得好！睇吓下面嘅算式同步驟。',equation:eq,working,calc:steps},extra||{});
L('P2','p2m96','進階：兩步加減應用題',[
 ...rep(3,()=>{const a=ri(300,700),b=ri(60,250),c=ri(20,150);const r1=a-b,r=r1+c;return wp(`書架上有${a}本書，借出了${b}本，後來還回${c}本。書架上現在有多少本書？`,r,`${a}－${b}＋${c}＝${r}`,[{op:'-',a,b,r:r1},{op:'+',a:'prev',b:c,r}],[`第一步：借出後 ${a}－${b}＝${r1}（本）`,`第二步：還回後 ${r1}＋${c}＝${r}（本）`,`答：書架上現在有${r}本書。`])}),
 ...rep(3,()=>{const a=ri(120,400),b=ri(100,450),c=ri(50,300);const r1=a+b,r=r1-c;return wp(`學校收集了${a}個膠樽和${b}個鋁罐，送了${c}個去回收站。還剩下多少個？`,r,`${a}＋${b}－${c}＝${r}`,[{op:'+',a,b,r:r1},{op:'-',a:'prev',b:c,r}],[`第一步：合共 ${a}＋${b}＝${r1}（個）`,`第二步：送走後 ${r1}－${c}＝${r}（個）`,`答：還剩下${r}個。`])})]);
L('P4','p4m96','進階：乘除應用題（直式）',[
 ...rep(3,()=>{let a;do{a=ri(120,480)}while(a===233);const b=ri(12,48);const r=a*b;return wp(`一部書有${a}頁，圖書館買了${b}部。這些書共有多少頁？`,r,`${a}×${b}＝${r}`,[{op:'*',a,b,r}],['直式乘法：',...longMul(a,b),`答：共有${r}頁。`],{longMul:true})}),
 (()=>{const a=233,b=36,r=a*b;return wp(`每盒有${a}粒珠子，${b}盒共有多少粒？`,r,`${a}×${b}＝${r}`,[{op:'*',a,b,r}],['直式乘法：',...longMul(a,b),`答：共有${r}粒。`],{longMul:true})})(),
 ...rep(2,()=>{const k=ri(3,8),n=ri(12,30);let per;do{per=ri(24,60)}while((per*n)%k);const tot=per*n;const r=tot/k;return wp(`每箱有${per}個橙，${n}箱橙平均分給${k}間學校，每間學校得多少個？`,r,`${per}×${n}÷${k}＝${r}`,[{op:'*',a:per,b:n,r:tot},{op:'/',a:'prev',b:k,r}],[`第一步：總數 ${per}×${n}＝${tot}（個）`,...longMul(per,n),`第二步：平均分 ${tot}÷${k}＝${r}（個）`,`答：每間學校得${r}個。`],{longMul:true})}).filter(Boolean),
 ...rep(2,()=>{const k=ri(4,9),q=ri(25,99),rem=ri(1,k-1),n=k*q+rem;return wp(`有${n}個學生坐車，每架車坐${k}人，最少要多少架車？`,q+1,`${n}÷${k}＝${q}…${rem}，${q}＋1＝${q+1}`,[{op:'/r',a:n,b:k,r:q,rem},{op:'+',a:'prev',b:1,r:q+1}],[`第一步：${n}÷${k}＝${q}……${rem}`,`第二步：剩下${rem}人都要坐車，所以多要1架：${q}＋1＝${q+1}（架）`,`答：最少要${q+1}架車。`])})]);
L('P5','p5m96','進階：分數應用題',[
 ...rep(5,()=>{let a,b,c,n,d;do{a=fr();b=fr();c=fr();d=a[1]*b[1]*c[1];n=d-a[0]*b[1]*c[1]-b[0]*a[1]*c[1]}while(n<=0||a[1]===b[1]||d>720);const used=frac(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);const r=frac(n,d);
  return wp(`一個蛋糕，哥哥吃了 ${a[0]}/${a[1]} 個，妹妹吃了 ${b[0]}/${b[1]} 個。還剩下幾分之幾個？（最簡分數）`,r,`1 － ${a[0]}/${a[1]} － ${b[0]}/${b[1]} ＝ ${r}`,[{op:'f+',a:a[0]+'/'+a[1],b:b[0]+'/'+b[1],r:used},{op:'f-',a:'1',b:'prev',r}],[`第一步：兩人共吃 ${a[0]}/${a[1]} ＋ ${b[0]}/${b[1]} ＝ ${used}（個）`,`第二步：剩下 1 － ${used} ＝ ${r}（個）`,`答：還剩下 ${r} 個。`],{fraction:false})})]);
// --- SSOT metadata (CONVENTIONS.md §4–6): id/lesson/level/source/verified/readAloud
const SUBJ_CODE={chi:'CHI',eng:'ENG',math:'MATH',hum:'HUM',sci:'SCI'};
const SRC={chi:'research.md §1 中文《我愛學語文》（第二版）',eng:'research.md §2 Primary Longman Elect (2nd ed)',math:'research.md §3 數學《小學數學新思維》（第二版）',hum:'research.md §4 人文《今日人文》',sci:'research.md §5 科學《科學新領域》'};
// 只有「課題＋學習重點」都已 ✅ 的關卡先標 verified:true；其餘（只核實課名／題型推斷）一律 false
const VERIFIED=new Set([ // 進階應用題 p2m96/p4m96/p5m96 屬推斷內容，唔加入
 'p2m1','p2m3','p2m4','p2m5','p2m6','p5m1','p5m2','p5m3','p5m4','p5m5','p5m6',
 'p1e0','p1e1','p1e2','p1e3','p1e4','p2e1','p2e2','p2e3','p4e1','p4e2','p4e3','p5e1','p5e3','p4s1','p2s1']);
// 逐題覆寫：關卡已核實但該題內容（詞彙／句式）喺 research.md 冇明確出處 → verified:false
const UNVERIFIED_Q=new Set([]); // Jessie 決定（經專案經理 Bot，2026-10-21）： P1/P2 英文全部 verified:true
const lessonNo=l=>{const m=l.id.match(/(\d+)$/);return 'L'+String(+m[1]).padStart(2,'0')};
// 能力層次：可喺題目加 level 覆寫；否則按內容推定
const RECALL=/叫做|叫：|公式|寫成數字|是多少個|有多少個月|有多少日|一年有|＝（ ）|1小時|1米|相反方向是|數位|位是多少|有多少個主要方向/;
const ANALYSE=/為甚麼|原因|推斷|如果|最可能|最適合|哪個最|判斷/;
const levelOf=(l,q)=>{if(q.level)return q.level;const t=q.q||'';
 if(/應用題/.test(l.title))return '應用';
 if(ANALYSE.test(t))return '分析';
 if(l.subject==='math'){if(RECALL.test(t))return '記憶';return q.type==='fill'||/[＋－×÷]|面積|周界|餘數|分給|共有|剩下/.test(t)?'應用':'理解'}
 if(l.subject==='eng')return q.type==='tf'?'理解':'應用';
 if(q.type==='order')return '理解';
 return q.type==='fill'?'理解':'記憶'};
for(const l of levels){l.lesson=lessonNo(l);l.verified=VERIFIED.has(l.id);
 l.questions.forEach((q,i)=>{if(q.type==='order'&&q.answer===undefined)q.answer=q.items.slice();Object.assign(q,{id:`${SUBJ_CODE[l.subject]}-${l.grade}-${l.lesson}-${String(i+1).padStart(3,'0')}`,grade:l.grade,subject:l.subject,lesson:l.lesson,level:levelOf(l,q),question:q.q,source:(SRC_LEVEL[l.id]||SRC[l.subject])+'｜'+l.title,verified:l.verified});if(UNVERIFIED_Q.has(q.id))q.verified=false;if(l.grade==='P2')q.readAloud=true;});
 const dir=path.join(__dirname,'..','..','questions',l.subject,l.grade);fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,l.lesson+'.json'),JSON.stringify({levelId:l.id,grade:l.grade,subject:l.subject,lesson:l.lesson,title:l.title,verified:l.verified,questions:l.questions},null,1)+'\n');}
// Boss: generated at runtime from world levels. Output
const subj={chi:'中文城',eng:'English Island',math:'數學山',hum:'人文村',sci:'科學實驗室'};
fs.writeFileSync(path.join(__dirname,'..','questions.js'),'// AUTO-GENERATED by tools/build.js — edit tools/content.txt or build.js, then run: node tools/build.js\nwindow.QUESTION_BANK = '+JSON.stringify({version:'2026-10-21',levels},null,1)+';\n');
const crypto=require('crypto');
const h8=f=>crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'..',f))).digest('hex').slice(0,8);
for(const hf of ['index.html','開始遊戲.html']){
 const hp=path.join(__dirname,'..',hf);if(!fs.existsSync(hp))continue;
 let ht=fs.readFileSync(hp,'utf8');
 for(const af of ['style.css','questions.js','game.js']){
  const re=new RegExp(af.replace('.','\\.')+'(\\?v=[0-9a-f]+)?','g');
  ht=ht.replace(re,af+'?v='+h8(af));
 }
 fs.writeFileSync(hp,ht);
}
console.log('levels',levels.length,'questions',levels.reduce((s,l)=>s+l.questions.length,0));
