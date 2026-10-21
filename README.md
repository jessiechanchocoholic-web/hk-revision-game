# 溫習闖關大冒險（小學 2026-27 第一次考試）

純靜態網頁溫習遊戲：揀年級 → 揀科目世界（中文城、English Island、數學山、人文村、科學實驗室）→ 每課一關，所有關卡同 Boss 模擬考一開始已解鎖（v1.1），答錯嘅題目會自動入「錯題簿」。

- 對象：P1（練習關）、P2、P4、P5
- 無登入、無後端、無追蹤；進度（星星、徽章、錯題簿）只存喺瀏覽器 `localStorage`（key：`hk-revision-quest-v1`）。
- 目前題庫（v1.1）：100 關、572 題（由 `game/tools/build.js` 產生）；其中 26 關／154 題已核實，418 題未核實。

> ⚠️ 題庫仍有未核實內容，詳見 [`docs/ssot/UNVERIFIED_QUESTIONS.md`](docs/ssot/UNVERIFIED_QUESTIONS.md)。正式畀學生用之前請老師／家長核對。

## 點樣玩

### 方法一：直接開檔（最簡單）
1. 下載 repo（GitHub 綠色「Code」→「Download ZIP」）並解壓。
2. 用瀏覽器（Chrome / Edge / Safari）開 `game/開始遊戲.html`（或 `game/index.html`，兩個檔案內容一樣）。
3. 唔需要上網、唔需要安裝任何嘢。

### 方法二：本機伺服器（可選）
```bash
cd game
python3 -m http.server 8000
# 然後開 http://localhost:8000/
```

### 網上版
已上線（GitHub Pages，D-009／D-024／D-025）：https://jessiechanchocoholic-web.github.io/hk-revision-game/game/ 。任何人可玩、無登入（D-013）；v1.1 起顯示全部題目（D-025）。

### 只顯示已核實題目（`?verifiedOnly`）
- `game/game.js` 頂部 `VERIFIED_ONLY_DEFAULT = false`（v1.1，D-025）：預設顯示全部 100 關／572 題；改做 `true` 就只顯示 `verified: true`（26 關／154 題）。
- `game/game.js` 頂部 `UNLOCK_ALL = true`：所有關卡及 Boss 一開始已解鎖；改做 `false` 就要攞星先解鎖下一關、完成全部關卡先解鎖 Boss。
- 網址加 `?verifiedOnly=1` 強制只顯示已核實；`?verifiedOnly=0` 顯示全部題目（老師核對用），例：`game/index.html?verifiedOnly=0`。
- 可用 `#level=<關卡ID>` 直接開某關，例：`game/index.html#level=p5m4`。

### 遊戲功能
- **關卡**：每關隨機抽最多 8 題；第一次就答啱先計分，≥90% 三星、≥70% 兩星、≥50% 一星。
- **Boss 模擬考**（P1 練習關冇 Boss）：v1.1 一開始已解鎖（`UNLOCK_ALL=true`；如改 `false` 就要完成所有關卡），每關抽 2 題、合共最多 12 題；兩星或以上得 Boss 徽章。
- **錯題簿**：自動收集答錯題目，可重溫。
- **讀題**：P2 用瀏覽器內置語音讀題（中文用粵語 D-012，英文用英語）；如果瀏覽器冇對應語音，「🔊 讀題」掣會自動隱藏（PR #2）。

## 檔案結構

```
game/
  index.html / 開始遊戲.html   遊戲入口（內容相同）
  game.js                       遊戲邏輯
  style.css                     樣式
  questions.js                  ⚠️ 自動產生，唔好直接改
  tools/content.txt             中文、英文、科學、人文、P1 題目（人手編輯）
  tools/build.js                數學題目產生器 ＋ 把 content.txt 轉成 questions.js
docs/ssot/                      任務狀態、決策、交接、規範、待核實清單
```

## 老師：點樣加／減／改題目

> 題庫格式（D-014，PR #2 實施）：`content.txt`（文字格式）＋ `build.js`（數學）係**唯一要人手改**嘅來源；跑 `node tools/build.js` 會自動產生：
> - `game/questions.js`（遊戲讀取）
> - `questions/<科目>/<年級>/<課>.json`（例：`questions/math/P5/L04.json`，逐課 JSON，**唔好直接改**，下次 build 會覆蓋）
>
> build 時每題自動加上 `id`（如 `MATH-P5-L04-001`）、`grade`、`subject`、`lesson`、`level`、`question`、`source`、`verified`，P2 再加 `readAloud: true`。`verified` 以**關卡**為單位，由 `build.js` 入面嘅 `VERIFIED` 清單決定（關卡 ID 喺清單入面＝`true`）；`source` 由科目自動填。
> 註：以上欄位要 PR #2 合併後先喺 `main` 生效。

### 1. 中文／英文／科學／人文／P1：改 `game/tools/content.txt`

每一關以 `## ` 開頭：

```
## 年級|科目|關卡ID|關卡名稱
```

- 年級：`P1` `P2` `P4` `P5`
- 科目：`chi`（中文）`eng`（英文）`math`（數學）`hum`（人文）`sci`（科學）
- 關卡ID：唯一，例如 `p4s3`（P4 科學第 3 課）、`p2c99`（實用文）

之後每行一題，用 `|` 分隔欄位：

| 開頭 | 題型 | 格式 |
|---|---|---|
| `M:` | 選擇題 | `M:題目|正確答案|錯誤1|錯誤2|錯誤3|解說` （選項會自動打亂）|
| `T:` | 判斷題（答案「對」）| `T:題目|解說` |
| `F:` | 判斷題（答案「錯」）| `F:題目|解說` |
| `S:` | 填充題 | `S:題目|答案1/答案2|解說` （多個可接受答案用 `/` 分隔）|
| `O:` | 排序題 | `O:項目1>項目2>項目3|題目|解說` （寫正確次序）|

例子：

```
## P4|sci|p4s3|3 天氣和氣候
M:量度氣溫用：|溫度計|雨量計|風向標|尺|溫度計量度氣溫。
T:八號風球時應留在室內。|颱風時留在安全的室內。
S:量度雨量的儀器叫（ ）。|雨量計|雨量計量度雨量。
O:地殼>地幔>地核|由外到內排出地球的結構。|最外是地殼，中間是地幔，最內是地核。
```

- **加題**：喺對應關卡下面加一行。
- **刪題**：刪走該行。
- **改題**：直接改該行文字。
- **加新關卡**：加一行新嘅 `## ...` 標題，再加題目。
- 以 `# ` 開頭（井號＋空格）係註解；空行會略過。
- 題目或答案內**唔可以**有 `|`；排序題項目內唔可以有 `>`；填充答案內唔可以有 `/`。

### 2. 數學：改 `game/tools/build.js`

數學題大部分係程式隨機產生（固定 seed，每次 build 結果一樣）。每關係一個 `L('年級','關卡ID','名稱',[ ...題目 ])`。可用嘅幫手：

```js
mcN('題目', 正確答案, [錯誤答案...], '解說')   // 選擇題
fillN('題目', 答案, '解說')                    // 數字填充題
{type:'tf', q:'題目', answer:true, explain:'解說'} // 判斷題
```

例子（加一條固定題目入 P2 L20）：

```js
fillN('閏年的2月有多少日？',29,'閏年2月有29日。'),
```

### 3. 重新產生 `questions.js`（必做）

```bash
cd game
node tools/build.js
# 會印出：levels 100 questions 572（數字隨改動而變）
```

然後重新整理瀏覽器頁面測試。**唔好直接改 `questions.js`**，下次 build 會被覆蓋。

### 產生後嘅資料格式（`questions.js`）

```json
{ "version": "2026-10-21",
  "levels": [
    { "id": "p4s3", "grade": "P4", "subject": "sci", "title": "3 天氣和氣候",
      "questions": [
        { "type": "mc", "q": "量度氣溫用：", "answer": "溫度計",
          "options": ["雨量計","溫度計","尺","風向標"], "explain": "溫度計量度氣溫。" },
        { "type": "tf", "q": "...", "answer": true, "explain": "..." },
        { "type": "fill", "q": "...", "answer": ["答案1","答案2"], "explain": "...", "numeric": true },
        { "type": "order", "q": "...", "items": ["地殼","地幔","地核"], "explain": "..." }
      ] } ] }
```

### 檢查小貼士
1. 跑 `node tools/build.js` 無錯誤，並睇吓題目總數有冇按預期增減；再跑 `node tools/validate.js`（PR #2：檢查必填欄位、ID 唔重複、JSON 對得上），要見到 ALL OK。
2. 檢查語法：`node -e 'global.window={};require("./questions.js");console.log(window.QUESTION_BANK.levels.length)'`
3. 選擇題正確答案要寫喺第一個選項位置（`M:題目|正確答案|...`），錯誤選項唔可以同正確答案一樣。
4. 每題最好有解說：答**啱**之後先會顯示解說；答錯只會顯示「再試一次！再讀一次題目，諗吓重點。」，**唔會**顯示正確答案或解說（PR #2）。
5. 開遊戲玩一次該關，確認顯示正常。
6. 新題目如未對過課本，請加入 `docs/ssot/UNVERIFIED_QUESTIONS.md`，並唔好將該關卡 ID 加入 `build.js` 嘅 `VERIFIED` 清單。
7. 唔好寫入學生姓名或任何個人資料；只用自擬題目，唔好抄課本例題或圖片（D-011）。
8. 老師核對完一關後，將關卡 ID 加入 `VERIFIED` 清單再 build，該關就會喺公開試玩出現。

## 協作文件
見 `docs/ssot/`（`research.md` 按 D-015 唔放入 repo）：`STATUS.md`（任務看板）、`DECISIONS.md`、`HANDOFFS.md`、`CONVENTIONS.md`、`OPEN-QUESTIONS.md`、`UNVERIFIED_QUESTIONS.md`。
