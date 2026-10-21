# 題庫格式（questions.js）
`questions.js` 定義全域變數 `window.QUESTION_BANK`（唔用 fetch，所以雙擊 index.html 離線都用到）。
**唔好直接改 questions.js**：改 `tools/content.txt`（中英常人科）或 `tools/build.js`（數學生成器），再執行 `node tools/build.js && node tools/validate.js`。

```js
window.QUESTION_BANK = { version: "2026-10-21", levels: [
  { id: "p4m6", grade: "P1|P2|P4|P5", subject: "chi|eng|math|hum|sci", title: "L6 除法(一)",
    questions: [
      { type: "mc",   q: "題目", options: ["A","B","C","D"], answer: "A", explain: "一句解釋" },
      { type: "tf",   q: "題目", answer: true, explain: "…" },
      { type: "fill", q: "題目", answer: ["可接受答案1","答案2"], numeric: true, explain: "…" },
      { type: "order",q: "指示", items: ["正確第1項","第2項","第3項"], explain: "…" }
    ] } ] };
```
- 每關至少 5 題；遊戲每次抽最多 8 題。關卡次序＝檔案次序。Boss 關由該世界每關抽 2 題自動組成（最多 12 題）。
- fill 比對會忽略空格、全形數字；分數用 `a/b` 最簡形式。
- `tools/content.txt` 一行一題：
  - `M:題目|正確答案|錯1|錯2|錯3|解釋`
  - `T:題目|解釋`（答案＝對）／`F:題目|解釋`（答案＝錯）
  - `S:題目|答案1/答案2|解釋`
  - `O:第1項>第2項>第3項|指示|解釋`
  - 新關卡：`## 年級|科目|關卡id|標題`
- 進度存喺瀏覽器 localStorage（key `hk-revision-quest-v1`）：星星、徽章、錯題簿（答錯入簿，複習時答對2次先移除）。
- 測試關卡：`index.html#level=p5m4` 直接開某一關。
- **只顯示已核實題目**：`game.js` 頂部 `VERIFIED_ONLY_DEFAULT`（預設 `false`＝顯示全部；改 `true` 即只顯示 `verified:true`）。網址參數 `?verifiedOnly=1` 開／`?verifiedOnly=0` 關，優先於預設。開啟時冇已核實題目嘅關卡同世界會隱藏（現時 28 關／167 題）。
