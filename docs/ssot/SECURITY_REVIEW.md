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
- 進度只存瀏覽器 localStorage，key `hk-revision-quest-v1`（`game/game.js` 第 6、8 行；`game/README-format.md` 第 23 行）。
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
- （更正）`research.md` 實際**從未提交入 repo**（已列入 `.gitignore`，只存在本機工作目錄）；以下評語只適用於本機檔案。`research.md` 引用課名、課題名稱、學習重點摘要及出版社附件編號（如 `12b040`、`ff94af`、`21aad5`、`dbe98d`），屬摘要式資料，非原文；但屬出版社目錄資訊，建議公開 repo 前由 Jessie 決定是否保留（OPEN-QUESTIONS Q6）。
- 建議：日後加入詞語表／課文時，不可貼原文或上載課本/作業 PDF 掃描。

## 5. 其他建議（低）
- `game/game.js` 第 10 行 `h()` 支援 `html` 屬性寫入 `innerHTML`；現時內容來自本地題庫，風險低。如日後讓老師/家長自行匯入題目，建議改用 `textContent`。
- ~~repo 根目錄 `game.zip` 與 `game/` 內容重複~~ → **已處理**：PR #2 commit `693e424` 已刪除 `game.zip` 並加入 `.gitignore`（已核實 PR #2 樹中不再有此檔；合併後 main 生效）。

## 補審：PR #2（commit `b8e7e98`，548 題題庫）

審核日期：2026-10-21；範圍：`main..b8e7e98` 共 8 個 commit、111 個檔案（`questions/<科目>/<年級>/*.json`、`game/game.js`、`game/questions.js`、`game/tools/*.js`、SSOT 文件）。

| # | 項目 | 結論 | 等級 |
|---|---|---|---|
| 1 | 不收集學生資料 | 通過 | — |
| 2 | 無密鑰 | 通過 | — |
| 3 | 第三方 script／CDN | 通過 | — |
| 4 | 版權 | 通過（低風險提示） | 低 |
| 5 | `validate.js` 使用 `eval` | 建議改善 | 低 |

1. **學生資料**：`game/game.js` 仍只用 localStorage（第 11、13 行，key `hk-revision-quest-v1`）；新增內容無 fetch／XHR／sendBeacon／form／cookie／analytics。題庫 JSON 無任何網址。
2. **密鑰**：`git log -p main..b8e7e98` 全部新增內容搜尋 api key、token、password、secret、private key、`ghp_`、`sk-`、`AKIA`：**0 個命中**；無 `.env`、`.pem` 檔。
3. **第三方 script**：HTML 仍只載入本地 `questions.js`、`game.js`；無 CDN、無 `package.json`。`game.js` 的 `innerHTML` 只用於清空（`=''`），`h()` 的 `html` 屬性目前無呼叫者。
4. **版權**：PR 內無 PDF／掃描檔，圖片只有 3 張遊戲截圖。題目 JSON 中最長字串僅 74 字，屬自編短題；`source` 欄只引用書系及課名（如《科學新領域》、Primary Longman Elect 2nd ed），屬出處標註，非原文抄錄。課名屬出版社目錄資料，公開與否仍待 Jessie 確認 Q6。
5. **`game/tools/validate.js` 第 2 行 `eval`**：只在開發者本機執行、讀取 repo 內 `questions.js`，風險低；但若日後有人透過 PR 改 `questions.js`，執行驗證時會在本機跑任意程式碼。替代方案（擇一）：
   - 首選：驗證直接讀 `questions/**/*.json` 並用 `JSON.parse`（validate.js 已有此段，可改為唯一資料來源），`questions.js` 由 `build.js` 從 JSON 生成；
   - 或用 Node `vm.runInNewContext(code, {window:{}}, {timeout:1000})`，限制可存取的全域物件（注意 `vm` 並非完全安全沙盒，只屬減低風險）。

**PR #2 結論：無高風險，可在 QA 通過及 Jessie 批准後合併；`eval` 建議作後續改善，不阻擋合併。**

> 審核範圍去到 88bf137（PR #2 最終 commit；`b8e7e98..88bf137` 只改 `game/game.js` 12 行及 SSOT 文件，無新增網絡請求／外部 script／eval／innerHTML 寫入）。

## 複查：v1.0.0（main `1957042`）

審核日期：2026-10-21；重點範圍：`88bf137..1957042`。

- 此範圍**只改文件**（README.md 及 docs/ssot 下 CONVENTIONS、DECISIONS、HANDOFFS、OPEN-QUESTIONS、QA_REPORT、RELEASE、SECURITY_REVIEW、STATUS、UNVERIFIED_QUESTIONS），**無程式碼、HTML 或題庫變更**。

| # | 項目 | 結論 | 等級 |
|---|---|---|---|
| 1 | 學生資料只用 localStorage | 通過（程式碼與 88bf137 相同） | — |
| 2 | 無密鑰 | 通過：新增內容的關鍵字命中全屬審核／檢查清單文字，無真實值；main 無 `.env`／`.pem` | — |
| 3 | 第三方 script／CDN | 通過：無新增 script；文件內網址只有 repo、GitHub Pages 網址及 `localhost` 測試網址 | — |
| 4 | 版權 | 通過（低）：main 無 PDF／掃描檔，圖片只有 3 張遊戲截圖；Q6 取向仍以 Jessie 決定為準 | 低 |

- 已確認 `game.zip`、`research.md` **均不在 main `1957042`** 檔案樹中。
- 尚存低風險建議：`game/tools/validate.js` 第 2 行仍用 `eval`（改善方案見上文），不影響已上線遊戲（只在開發者本機執行）。
- 提示：RELEASE.md 記錄方案 A 公開 GitHub Pages；遊戲為純靜態網頁、不收集資料，公開無額外私隱風險。

**v1.0.0 結論：無高風險。**
