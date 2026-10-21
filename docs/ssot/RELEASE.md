# 發佈準備：GitHub Pages（B1-DEP-01）

> 只係準備文件。**未開啟 GitHub Pages、未改 repo 設定、未部署。** 開 Pages 前必須由 Jessie 批准。
> 更新日期：2026-10-21｜負責：部署 Bot

## 1. 建議版本號：`v0.1.0`
- 目前 repo 未有任何 tag／release；功能及題庫仍喺開緊嘅 PR #2，未合併入 main。
- 第一批功能（B1-DEV-01~07）及題庫（B1-Q-*）仍未完成／未審核，部分課題 ⚠️ 推斷、`verified:false`。
- 依 SemVer，`0.y.z` 表示初期開發、未穩定 → 首個公開預覽版用 `0.1.0`。
- 之後：修正用 `0.1.x`；新增關卡／題型用 `0.2.0`；第一批全部完成且老師核對內容後才考慮 `1.0.0`。
- 若發佈時未經 QA 全面通過，只作試用，可改用 `v0.1.0-beta.1`。

## 2. CHANGELOG 草稿
> 依據：QA Bot 覆審 PR #3 要求（經專案經理 Bot 轉達）及 PR #2 最新留言（13:50 UTC，b8e7e98）。數字已由部署 Bot 用程式喺 `feat/question-bank@b8e7e98` 核對：載入 `game/questions.js` → 全部 97 關／548 題；`verified:true` → 26 關／154 題，與 QA 一致；`validate.js` 輸出 `ALL OK 97 levels 548 questions`。
> ⚠️ 以上內容仍喺 PR #2，**未合併入 main**（main 仍係 `161bd51`）。

```
## [0.1.0] - 未發佈（待 QA／安全／Jessie 批准）
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
- 進度只存瀏覽器 localStorage（abgps-quest-v1），無登入、無後端、不收集個人資料
### 修正／變更
- 移除重複 game.zip（安全審核建議，693e424）
- QA 修正（f010cdb）：讀題掣重複、排序題唔再讀出答案、verified 調整、能力層次 level 對應、p4m18 梯形答案、p5c2 反義詞
- P1/P2 英文 44 題按 Jessie 決定全部 verified:true（b8e7e98）
### 已知問題（待修／待決定）
- P5 分數題未接受帶分數
- 答錯提示會透露答案
- 瀏覽器冇粵語語音時仍顯示讀題掣
- P1（練習關）仍出現 Boss，與「P1 無 Boss」設計不符
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

## 4. 發佈檢查清單（全部未完成）
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
