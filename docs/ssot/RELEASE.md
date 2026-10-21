# 發佈準備：GitHub Pages（B1-DEP-01）

> **v1.0.0 已於 2026-10-21 上線**（D-024，Jessie 批准合併同發佈）：https://jessiechanchocoholic-web.github.io/hk-revision-game/game/ 。上線後檢查見第 5 節。以下第 1–4 節為發佈前準備紀錄。
> 更新日期：2026-10-21｜負責：部署 Bot

## 1. 版本號：`v1.0.0`（D-024）
- 原建議 `v0.1.0`（初期開發、內容未全核實）；Jessie 於 D-024 批准以 **`v1.0.0`** 公開發佈，以 D-024 為準。
- tag `v1.0.0` → `1957042`。之後：修正 `1.0.x`；新增關卡／題型 `1.1.0`；破壞性改動（例如題庫格式、localStorage 格式不相容）`2.0.0`。

## 2. CHANGELOG 草稿
> 依據：QA Bot 覆審 PR #3 要求（經專案經理 Bot 轉達）及 PR #2 最新 commit 88bf137。數字已由部署 Bot 用程式喺 `feat/question-bank@88bf137` 核對：載入 `game/questions.js` → 全部 97 關／548 題；`verified:true` → 26 關／154 題，與 QA 一致；`validate.js` 輸出 `ALL OK 97 levels 548 questions`。
> ⚠️ 以上內容仍喺 PR #2，**未合併入 main**（main 仍係 `161bd51`）。

```
## [1.0.0] - 2026-10-21（原草稿為 0.1.0；按 D-024 改為 1.0.0）
### 新增
- 純靜態網頁遊戲：game/index.html（另有 game/開始遊戲.html）、game.js、style.css，無需 build
- 題庫：questions/<科目>/<年級>/Lxx.json（P1/P2/P4/P5 中英數人科），共 97 關／548 題；
  由 game/tools/build.js 生成 game/questions.js，game/tools/validate.js 驗證
- 只顯示已核實題目模式：game.js:5 `VERIFIED_ONLY_DEFAULT=true`（預設開）；
  網址 `?verifiedOnly=1` 強制開、`?verifiedOnly=0` 顯示全部
  → 公開版預設只顯示 26 關／154 題（verified:true）
- 題型：選擇、判斷、填充、排序
- 每世界 Boss 模擬考（完成所有關卡解鎖）、錯題簿、星星／徽章
- P2 讀題掣（瀏覽器 speechSynthesis，zh-HK／en-GB）
- 進度只存瀏覽器 localStorage（hk-revision-quest-v1），無登入、無後端、不收集個人資料
### 修正／變更
- 移除重複 game.zip（安全審核建議，693e424）
- QA 修正（f010cdb）：讀題掣重複、排序題唔再讀出答案、verified 調整、能力層次 level 對應、p4m18 梯形答案、p5c2 反義詞
- P1/P2 英文 44 題按 Jessie 決定全部 verified:true（b8e7e98）
- 88bf137（game.js）：答錯提示唔再顯示解釋／答案，改為「再試一次！再讀一次題目，諗吓重點。」；
  瀏覽器冇對應粵語（zh-HK／yue）或英文語音時自動隱藏讀題掣（voiceschanged 時更新），唔再用普通話聲代替；
  P1 練習關唔再出現 Boss
### 已知問題（待修／待決定）
- P5 分數題未接受帶分數輸入
- 冇語音時讀題掣直接隱藏，冇任何提示（舊版「此瀏覽器不支援讀題」提示已移除）
- 真機粵語語音未測試（只做過 headless mock 測試）
```
> 正式發佈前，以上已知問題修好並合併入 main 後，按最終內容再更新一次。

## 3. 技術評估：可否直接由靜態檔發佈
- ✅ 純靜態 HTML/CSS/JS，**無需 build**（questions.js 已預先生成並 commit；PR #2 版本）；`build.js` 只係開發者工具。
- ✅ 所有引用都係相對路徑（`style.css`、`questions.js`、`game.js`），無外部 CDN／第三方腳本／fetch。
- ✅ **已定：方案 A、公開使用（專案經理 Bot 轉達 Jessie 決定，2026-10-21）**：Pages source = `main` / root，分享網址 `https://jessiechanchocoholic-web.github.io/hk-revision-game/game/`；任何人可玩。可另加根目錄 `index.html` 轉址到 `game/`（需另開 PR）。
  - 注意：root 發佈會令 repo 內所有已 commit 檔案（research.md、docs/、questions/*.json）都可經網址讀取。
  - 備註：方案 B（GitHub Actions 只發佈 `game/`）已不採用，只作日後參考。
- ⚠️ 中文檔名 `開始遊戲.html` 網址會 URL-encode，可用但不建議作分享連結；分享用 `game/`。
- ℹ️ repo 為 public；免費版 Pages 需要 public repo（見 OPEN-QUESTIONS Q3/Q8）。

## 4. 發佈檢查清單（發佈前版本；D-024 已批准合併及發佈，實際結果見第 5 節）
### 閘門
- [ ] PR #2（題庫及功能）修好 QA 意見並合併入 main
- [ ] QA 通過：B1-QA-01 題庫內容審核
- [ ] QA 通過：B1-QA-02 功能測試（含手機／平板）
- [ ] 安全審核通過：B1-SEC-01 私隱審查
- [ ] 安全審核通過：B1-SEC-02 密鑰／第三方腳本／版權檢查
- [x] 託管方案 A（main root，/game/）及公開使用已定（專案經理 Bot 轉達 Jessie 決定）
- [ ] 確認 research.md／docs/ 經 Pages 公開無問題（私隱、版權、內部資料）
- [ ] **Jessie 最後拍板開啟 GitHub Pages（方案 A）**
- [ ] **Jessie 審批正式部署／發佈 v0.1.0**
### 發佈前技術檢查
- [ ] `verified:false` 題目已隱藏：確認 main 上 `VERIFIED_ONLY_DEFAULT=true`（game.js:5），公開版顯示 26 關／154 題
- [ ] 本機開 `game/index.html` 可正常遊玩；console 無錯誤
- [ ] 所有路徑為相對路徑、無外部請求
- [ ] repo 內無機密（.env、token、key）
- [ ] CHANGELOG 按最終 main 內容更新，日期填上
### 發佈步驟（獲批後先做）
- [ ] 建立 tag `v0.1.0` 及 GitHub Release（附 CHANGELOG）
- [ ] Settings → Pages：main / root（方案 A），經 Jessie 最後拍板後先開啟（由 Jessie 或經批准後執行）
- [ ] 部署後測試公開網址（桌面＋手機）、localStorage 進度正常
- [ ] 更新 STATUS.md、HANDOFFS.md、DECISIONS.md

## 5. 上線後檢查（部署 Bot，2026-10-21 14:20 UTC 左右，唯讀）
| 項目 | 結果 |
|---|---|
| main HEAD | ✅ `1957042`（SSOT：記錄 v1.0.0 發佈），PR #1–#5 全部 MERGED |
| tag | ✅ `v1.0.0` → `1957042` |
| GitHub Release | ❌ **未有 Release**（`gh release list` 空）——建議補建（附第 2 節 CHANGELOG），需 Jessie／專案經理 Bot 決定 |
| Pages 設定（唯讀 API） | ✅ source `main` / `/`、build_type legacy、public、https_enforced；查詢時 status=`building`（可能有新 build 進行中） |
| 網址 HTTP | ✅ `/game/`、`/game/index.html`、`/game/開始遊戲.html` 均 200 |
| 引用資源 | ✅ `style.css`、`questions.js`、`game.js` 均 200，全部相對路徑；無外部 URL／CDN |
| 上線檔案 = main | ✅ 線上 `game.js`、`questions.js` 與 main 逐 byte 相同 |
| 題數（線上 questions.js） | ✅ 全部 97 關／548 題；verified:true 26 關／154 題 |
| VERIFIED_ONLY_DEFAULT | ✅ `true`；頁面 `window.__verifiedOnly=true` |
| Headless Chrome（playwright-core） | ✅ 手機 375×667、桌面 1280×800 均載入主頁（年級選擇），無橫向溢出、無 JS pageerror；手機首次載入有 1 個 console 404，應為 `/favicon.ico`（已確認 404，無影響）|
| 機密 | ✅ `/.env`、`/.git/config` 404；main 全 repo 搜尋 key/token/password/private key 只見文件描述字眼，無實際密鑰 |
| 公開範圍 | ⚠️ root 發佈令 `docs/ssot/*`、`game/tools/*` 等可公開讀取（例：`/docs/ssot/STATUS.md` 200），符合方案 A 預期；`research.md` 404（main 未有此檔）|

### 未做／待跟進
- [ ] 建立 GitHub Release v1.0.0（需批准）
- [ ] 加 favicon（可選，消除 404）
- [ ] 真機（iPad／手機）試玩及粵語讀題（headless 未能驗證發音）
- [ ] 深入流程（答題、Boss、錯題簿）只由 QA 測過，今次只檢查載入
- [ ] STATUS.md 有兩列 B1-DEP-01（第 40 行舊列「待辦」），建議文件 Bot 清理
