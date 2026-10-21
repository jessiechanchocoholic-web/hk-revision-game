# 發佈準備：GitHub Pages（B1-DEP-01）

> 只係準備文件。**未開啟 GitHub Pages、未改 repo 設定、未部署。** 開 Pages 前必須由 Jessie 批准。
> 更新日期：2026-10-21｜負責：部署 Bot

## 1. 建議版本號：`v0.1.0`
- 目前 repo 未有任何 tag／release，`main` 只有 1 個 commit（`161bd51 初始化：SSOT 文件及遊戲骨架`）。
- 第一批功能（B1-DEV-01~07）及題庫（B1-Q-*）仍未完成／未審核，部分課題 ⚠️ 推斷、`verified:false`。
- 依 SemVer，`0.y.z` 表示初期開發、未穩定 → 首個公開預覽版用 `0.1.0`。
- 之後：修正用 `0.1.x`；新增關卡／題型用 `0.2.0`；第一批全部完成且老師核對內容後才考慮 `1.0.0`。
- 若發佈時未經 QA 全面通過，只作試用，可改用 `v0.1.0-beta.1`。

## 2. CHANGELOG 草稿

```
## [0.1.0] - 未發佈（待 QA／安全／Jessie 批准）
### 新增
- 純靜態網頁遊戲骨架：game/index.html（另有 game/開始遊戲.html 入口）、game.js、style.css
- 題庫 game/questions.js（由 game/tools/build.js 從 content.txt 及數學題生成器產生）
- 題型：選擇題、判斷題、填充題、排序題
- 進度只存瀏覽器 localStorage（key: abgps-quest-v1），無登入、無後端、不收集個人資料
- SSOT 協作文件：docs/ssot/
### 已知限制
- 部分課題屬 ⚠️ 推斷，需老師／家長核對
- 讀題語音、Boss 關、錯題簿等第一批功能尚未完成
```
> 注意：開發 Bot 本機有未 commit 的改動（questions.js 大幅更新、build.js、validate.js、questions/*.json、截圖等）。正式發佈前要先合併入 main，再按實際內容更新此 CHANGELOG。

## 3. 技術評估：可否直接由靜態檔發佈
- ✅ 純靜態 HTML/CSS/JS，**無需 build**（questions.js 已預先生成並 commit）；`build.js` 只係開發者工具。
- ✅ 所有引用都係相對路徑（`style.css`、`questions.js`、`game.js`），無外部 CDN／第三方腳本／fetch。
- ⚠️ 入口 `index.html` 喺 `game/` 子資料夾，唔係 repo 根目錄。GitHub Pages「Deploy from branch」只支援 `/`（root）或 `/docs`：
  - 方案 A（建議，最簡單）：source = `main` / root，網址 `https://jessiechanchocoholic-web.github.io/hk-revision-game/game/`；可另加根目錄 `index.html` 轉址到 `game/`（需另開 PR）。
  - 方案 B：用 GitHub Actions workflow 只發佈 `game/` 資料夾（網址較乾淨，但會一併公開較少檔案；需新增 workflow，需審批）。
  - 方案 A 會令 repo 內所有檔案（research.md、docs、game.zip 如已 commit）都可經網址讀取——repo 本身已公開，風險相同，但要留意。
- ⚠️ 中文檔名 `開始遊戲.html` 網址會 URL-encode，可用但不建議作分享連結；分享用 `game/`。
- ℹ️ repo 為 public；免費版 Pages 需要 public repo（見 OPEN-QUESTIONS Q3/Q8）。

## 4. 發佈檢查清單（全部未完成）
### 閘門
- [ ] 開發改動已 commit 並經 PR 合併入 main（現時本機有未 commit 改動）
- [ ] QA 通過：B1-QA-01 題庫內容審核
- [ ] QA 通過：B1-QA-02 功能測試（含手機／平板）
- [ ] 安全審核通過：B1-SEC-01 私隱審查
- [ ] 安全審核通過：B1-SEC-02 密鑰／第三方腳本／版權檢查
- [ ] Jessie 決定 Q2（託管平台）、Q8（使用者範圍／是否公開）
- [ ] **Jessie 審批開啟 GitHub Pages（含選擇方案 A 或 B）**
- [ ] **Jessie 審批正式部署／發佈 v0.1.0**
### 發佈前技術檢查
- [ ] `verified:false` 的題目已隱藏或清楚標示試用
- [ ] 本機開 `game/index.html` 可正常遊玩；console 無錯誤
- [ ] 所有路徑為相對路徑、無外部請求
- [ ] repo 內無機密（.env、token、key）
- [ ] 決定 `game.zip`、`research.md` 是否應公開
- [ ] CHANGELOG 按最終 main 內容更新，日期填上
### 發佈步驟（獲批後先做）
- [ ] 建立 tag `v0.1.0` 及 GitHub Release（附 CHANGELOG）
- [ ] Settings → Pages 依批准方案開啟（由 Jessie 或經批准後執行）
- [ ] 部署後測試公開網址（桌面＋手機）、localStorage 進度正常
- [ ] 更新 STATUS.md、HANDOFFS.md、DECISIONS.md
