# 安全審核報告（B1-SEC-01 / B1-SEC-02）

- 審核日期：2026-10-21
- 審核者：安全 Bot
- 審核範圍：`main` 分支 commit `161bd51`（全部 git 歷史只有此一個 commit）
- 結論摘要：**無高風險**；兩項低風險建議。

| # | 項目 | 結論 | 等級 |
|---|---|---|---|
| 1 | 不收集學生資料 | 通過 | — |
| 2 | 無密鑰 | 通過 | — |
| 3 | 第三方 script／CDN／依賴 | 通過 | — |
| 4 | 版權（課本原文／掃描檔） | 大致通過，有待確認事項 | 低 |
| 5 | 其他（innerHTML、repo 內 zip） | 建議改善 | 低 |

## 1. 不收集學生資料 — 通過
- 進度只存瀏覽器 localStorage，key `abgps-quest-v1`（`game/game.js` 第 6、8 行；`game/README-format.md` 第 23 行）。
- 全 repo 搜尋 `fetch(`、`XMLHttpRequest`、`sendBeacon`、`<form`、`action=`、`document.cookie`、`sessionStorage`、analytics/gtag：**全部無結果**。
- 無登入、無姓名輸入欄位。
- 讀題用瀏覽器內置 `speechSynthesis`（`game/game.js` 第 18–23 行），屬本機功能；注意部分瀏覽器的雲端語音可能把朗讀文字（題目，非個人資料）送往瀏覽器供應商，風險可接受。

## 2. 無密鑰 — 通過
- 以 rg 搜尋工作目錄及 `git log --all -p` 全歷史：api key、token、password、secret、private key、`ghp_`、`sk-`、`AKIA` 等 —— 只命中 STATUS.md 的任務描述文字，無真實密鑰。
- 歷史中無 `.env`、`.pem`、key 檔。

## 3. 第三方 script／CDN — 通過
- `game/index.html`、`game/開始遊戲.html` 只載入本地 `questions.js`、`game.js`，無外部 CDN，故毋須 SRI。
- 無 `package.json`／npm 依賴；`game/tools/build.js`、`validate.js` 只用 Node 內置 `fs`、`path`。
- `validate.js` 用 `eval` 讀取本地 `questions.js`，只限開發者本機執行，風險可接受。

## 4. 版權 — 大致通過（低風險，待 Jessie 確認 Q6）
- repo 內**無 PDF、無課本掃描檔**。圖片只有 `game/screenshots/*.png`（3 張遊戲畫面截圖）。
- 題目（`game/tools/content.txt` → `game/questions.js`）為自行編寫的短題目，未見整段抄錄課文。
- `research.md` 引用課名、課題名稱、學習重點摘要及出版社附件編號（如 `12b040`、`ff94af`、`21aad5`、`dbe98d`），屬摘要式資料，非原文；但屬出版社目錄資訊，建議公開 repo 前由 Jessie 決定是否保留（OPEN-QUESTIONS Q6）。
- 建議：日後加入詞語表／課文時，不可貼原文或上載課本/作業 PDF 掃描。

## 5. 其他建議（低）
- `game/game.js` 第 10 行 `h()` 支援 `html` 屬性寫入 `innerHTML`；現時內容來自本地題庫，風險低。如日後讓老師/家長自行匯入題目，建議改用 `textContent`。
- repo 根目錄 `game.zip` 與 `game/` 內容重複（二進制檔難審核、易與源碼不同步）；建議改為 Release 附件或加入 `.gitignore`。
