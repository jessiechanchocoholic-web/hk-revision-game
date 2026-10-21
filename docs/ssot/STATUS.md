# 任務看板（小學溫習闖關遊戲）

Repo：https://github.com/jessiechanchocoholic-web/hk-revision-game （預設分支 `main`）

## 現況摘要（2026-10-21，專案經理 Bot 發佈後更新）
- 遊戲骨架已在 `game/`：純靜態網頁，入口 `game/index.html`／`game/開始遊戲.html`。
- 題庫：103 關、591 題（B2，D-027；v1.1 時為 100 關／572 題），由 `game/tools/build.js` 讀 `game/tools/content.txt` ＋ 數學產生器輸出 `game/questions.js`。
- 已有：世界／年級選擇、每課一關、Boss 模擬考、錯題簿（localStorage）、P2 讀題（Web Speech）、星星／徽章。
- 題目欄位（D-014）已實施（PR #2 已合併）：build.js 自動加 id／source／verified 等欄位，並輸出 `questions/<subject>/<grade>/<lesson>.json`；`validate.js` 檢查；`?verifiedOnly=1` 開關；26 關／154 題已核實、437 題未核實（B2 後）；v1.1 起預設顯示全部（`VERIFIED_ONLY_DEFAULT=false`，D-025）。
- 已發佈 v1.1（D-025，PR #9 `a1c572c`）：顯示全部題目、所有關卡及 Boss 一開始解鎖（`UNLOCK_ALL=true`）、新增 P4 數學 L1–3 乘法、重寫 P2/P4/P5 中文第1課。
- 已發佈 v1.0.0（D-024）：https://jessiechanchocoholic-web.github.io/hk-revision-game/game/ （GitHub Pages，main 根目錄）；PR #1–#5 已合併。
- 已包括第二、三批部分內容（P4 數學、P2 英文、P2/P5 科學、P4 人文、P1 練習、中文各課）。
- 待核實題目清單：`UNVERIFIED_QUESTIONS.md`。

狀態只可使用：待辦 / 進行中 / 審查中 / 完成 / 阻塞
資料來源：`research.md`（按 D-015 不放入 repo，現存於 box `/workspace/hk-revision-game/research.md`）（✅ 已核實；⚠️ 推斷＝要老師／課本核對；❌ 未有）
規則：題目只可用 ✅ 課題；⚠️ 內容必須標 `verified` 為未核實，不可上線（D-016）。

## 第一批

| ID | 任務 | 負責 Bot | 狀態 | 更新日期 | 備註 |
|---|---|---|---|---|---|
| B1-DEV-01 | 題庫欄位（按 D-014：content.txt＋build.js 加 verified/source）＋範例檔＋驗證腳本 | 開發 Bot | 審查中 | 2026-10-21 | 最優先；題庫任務依賴此 schema；現行格式為 content.txt＋build.js→questions.js，無 verified/id 欄位；未有獨立驗證腳本 |
| B1-DEV-02 | 遊戲框架：世界地圖（中文城、英文島、數學山、人文村、科學實驗室）、年級選擇（P1 練習／P2／P4／P5）、關卡＝每課一關 | 開發 Bot | 審查中 | 2026-10-21 | 純靜態網站（D-026）；已在 repo（靜態 HTML/JS），待 QA |
| B1-DEV-03 | 題型元件：選擇、圖片選擇、填充、拖放配對、排序、判斷修正（✓／改錯）、限時快答 | 開發 Bot | 審查中 | 2026-10-21 | ；已有選擇、判斷、填充、排序；未見圖片選擇、拖放配對、判斷修正、限時快答 |
| B1-DEV-04 | 數學螺旋複習關（每單元尾混舊課題）＋每世界 Boss 模擬考（全範圍＋舊知識） | 開發 Bot | 審查中 | 2026-10-21 | ；Boss 已有（每關抽2題，最多12題）；未見獨立數學螺旋複習關 |
| B1-DEV-05 | 錯題簿：自動收集錯題→生成「復仇關」，答啱 2 次先移除；只存本機 localStorage | 開發 Bot | 審查中 | 2026-10-21 | 不收集學生個人資料；錯題簿已有，存 localStorage；「答啱 2 次先移除」待 QA 核對 |
| B1-DEV-06 | P2 讀題功能（瀏覽器 Web Speech API，粵語／英語） | 開發 Bot | 審查中 | 2026-10-21 | 對應 P2 老師讀卷；粵語（D-012），裝置支援待測；P2 讀題已有（zh-HK／en-GB），視乎裝置語音 |
| B1-DEV-07 | 獎勵：三星、徽章、combo；P1 只開練習關（無 Boss） | 開發 Bot | 審查中 | 2026-10-21 | ；星星、Boss 徽章、全三星徽章已有；未見 combo |
| B1-Q-01 | 題庫 P5 數學 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ 5上A L1 多位數、L2 近似值和大數量的估計、L3 分數的比較、L4 異分母分數加法、L5 異分母分數減法、L6 異分母分數加減混合運算、L7 平行四邊形、L8 三角形、L9 梯形、L10 多邊形的面積；5上B L14、L15 代數符號(一)(二)。L7–10、L14–15 只核實課名，學習重點 ⚠️推斷；已入題庫；L7–10、L14–15 待核實 |
| B1-Q-02 | 題庫 P2 數學 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ L1 三位數、L2 數數活動、L3 加法(一)、L4 加法(二)、L5 減法、L6 加減應用題、L7 角和直角、L8 垂直線、L9 銳角和鈍角、L10–11 米的認識(一)(二)、L18 報時、L19 活動時間、L20 年和月。L7–11、L18–20 只核實課名 ⚠️；L12–17 乘法不在範圍；溫習工作紙(1) ❌；題目需 readAloud；已入題庫；L7–11、L18–20 待核實 |
| B1-Q-03 | 題庫 P5 英文 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ 5A Ch1 Good manners（should/shouldn't、adverbs of manner）；Ch2 Be a good friend（verbs/adjectives + prepositions、adverbs of degree）；Ch3 Describing people（prepositional phrases in/with、relative pronoun who）。課文詞彙表 ❌；只用 2nd ed，舊版附件只參考題型；已入題庫 |
| B1-Q-04 | 題庫 P4 英文 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ 4A Ch1 My favourite activities（simple present、adverbs of frequency）；Ch2 Shows we like（too/either、both…and、or、but）；Ch3 At the supermarket（comparatives/superlatives、phrases of quantity）。詞彙表 ❌；已入題庫 |
| B1-Q-05 | 題庫 P4 科學 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ 四上 L1 地球的結構（有完整樣本：地殼/地幔/地核、板塊、三類岩石、三類土壤）、L2 轉動的地球、L3 天氣和氣候、L4 動植物與環境、L5 大自然的平衡。L2–5 只有課名，內容 ⚠️推斷；已入題庫；L2–5 待核實 |
| B1-DOC-01 | 老師／家長指南：如何增減題目（content.txt／build.js） | 文件 Bot | 審查中 | 2026-10-21 | 依賴 B1-DEV-01；README.md 已寫（PR docs/readme-ssot） |
| B1-DOC-02 | 維護 SSOT 文件及「待核實內容清單」（⚠️ 項目） | 文件 Bot | 審查中 | 2026-10-21 | ；SSOT 已同步；UNVERIFIED_QUESTIONS.md 已建立（PR docs/readme-ssot） |
| B1-QA-01 | 題庫內容審核：每題對照 research.md 課題、答案正確、⚠️ 題目標 verified:false | QA Bot | 完成 | 2026-10-21 | PR #2 57f900a 覆審通過（已核實模式 26 關／154 題）；非阻擋建議見 QA_REPORT.md |
| B1-QA-02 | 功能測試：關卡、Boss、錯題簿、讀題、手機/平板顯示 | QA Bot | 進行中 | 2026-10-21 | 57f900a：手機／平板兩模式通過、P1 無 Boss、提示及讀題掣修正已驗證、讀題修正已驗證；Boss、錯題簿移除、真機粵語語音未測 |
| B1-SEC-01 | 私隱審查：不收集學生姓名/個人資料、無登入、無追蹤分析、只用 localStorage | 安全 Bot | 審查中 | 2026-10-21 | 通過，見 SECURITY_REVIEW.md |
| B1-SEC-02 | 檢查 repo 無密鑰/token、無第三方腳本風險、版權（課本內容只作溫習用，不整段抄錄） | 安全 Bot | 審查中 | 2026-10-21 | 無高風險；版權：只用自擬題目（D-011），見 SECURITY_REVIEW.md |
| B1-DEP-01 | 部署準備及上線：GitHub Pages（main root，/game/） | 部署 Bot | 完成 | 2026-10-21 | v1.0.0 已上線（D-024）；上線後檢查通過（見 RELEASE.md 第 5 節）；未有 GitHub Release |
| B1-DEP-02 | 上線後檢查（HTTP、資源、題數、headless、機密） | 部署 Bot | 審查中 | 2026-10-21 | 全部通過；待跟進：建立 Release（需批准）、favicon、真機粵語；第 40 行 B1-DEP-01 為重複舊列 |

## 第二批（待第一批完成，根據 research.md「題庫優先次序」）
6. 數學 P4：4上A L4–9、4上B L11–14、18–19（L1–3 課名待抄錄 ⚠️）
7. 英文 P2：2A Ch1–3
8. 科學 P2 L1–4、P5 L1–5
9. 人文 P4 L1–4
10. 中文 P2/P4/P5 各課 —— 先做實用文格式關（賀卡、週記）；詞語表 ❌

## 第三批（練習模式）
P1 中文一上單元一二、英文 1A Ch1–4、科學一上。

## 暫停
人文 P2/P5、數學 P1（無目錄）。

## 新增待辦（2026-10-21）
| B1-DEV-08 | 為題目加 `verified`／`source` 欄位（content.txt＋build.js），試玩只顯示已核實題目 | 開發 Bot | 審查中 | 2026-10-21 | D-014、D-016；PR #2 已實施，待 QA 及合併 |
| B1-DEV-09 | PR #2：將 commit `5b45ecb` 改為 false 嘅 7 題（ENG-P1-L00-005、ENG-P1-L01-004、ENG-P1-L01-005、ENG-P1-L03-002、ENG-P1-L03-003、ENG-P1-L03-005、ENG-P2-L03-005）改返 `verified: true`（移除 `UNVERIFIED_Q` 入面呢 7 個 ID），重新 build／validate | 開發 Bot | 完成 | 2026-10-21 | D-017 已定案：P1／P2 英文 44 題全部已核實；PR #2 commit `3c8146a` 已改返，文件 Bot 核對：7 題全部 true，總數 154 true／394 false |
## 題庫 PR（feat/question-bank）— 2026-10-21
- 狀態：審查中（交 QA Bot：B1-QA-01）
- 題庫：97 關、548 題；`questions/<subject>/<grade>/<lesson>.json`（由 `game/tools/build.js` 生成，與 `game/questions.js` 同步）
- verified:true 關卡：數學 P2 L1–L6、P5 L1–L6；英文 P1/P2/P4/P5 全部；科學 P4 L1、P2 L1。其餘全部 verified:false（只核實課名或題型推斷）
- 「能力層次」(level) 由題型自動推定，待 QA 抽查
- 2026-10-21 更新：加「只顯示 verified:true」開關（`VERIFIED_ONLY_DEFAULT`／`?verifiedOnly=1`），預設顯示全部；開啟時 28 關／167 題。上線前用邊個模式待 Jessie 決定。
- 2026-10-21 更新：VERIFIED_ONLY_DEFAULT 改為 true（預設只顯示 28 關／167 題）；P2 加讀題掣（粵語 zh-HK／英文 en）。
- 2026-10-21 QA 修正：讀題掣重複、排序題讀出答案、P2 數學 L2 及 P5 英文 L2 改 verified:false、level 對應、p4m18、p5c2。已核實模式 26 關／154 題。
- 2026-10-21 Docs Bot 意見：P1/P2 英文逐題對照 research.md，7 題改 verified:false（build.js UNVERIFIED_Q）。已核實模式 26 關／147 題。
- 2026-10-21 Jessie 決定：P1/P2 英文 7 題改返 verified:true。已核實模式 26 關／154 題。
- 2026-10-21 v1.1（D-025）：`VERIFIED_ONLY_DEFAULT=false` 顯示全部 100 關／572 題（154 已核實、418 未核實）；`UNLOCK_ALL=true`；新增 p4m1–p4m3；重寫 p2c1／p4c1／p5c1。
- 2026-10-21 小修：答錯唔再顯示答案／解釋（答啱先顯示）；冇粵語（zh-HK/yue）或英文聲就隱藏讀題掣（voiceschanged 會更新）；P1 冇 Boss 關。已核實模式 26 關／154 題。
- 2026-10-21 B2-DEV-03 審查中：進階應用題 3 關 19 題（P2 兩步加減、P4 直式乘除、P5 分數），答啱後顯示算式＋逐步運算；validate.js 獨立覆核；全部 verified:false。
- 2026-10-21 B2-DEV-02 審查中：卡通角色「波波」（inline SVG）＋答啱／答錯／過關／Boss 動畫；離線單檔 HTML、手機 375px、prefers-reduced-motion 已測。
- 2026-10-21 B2-DEV-01 審查中：移除公開文字中嘅校名（標題、README、使用說明、遊戲首頁、截圖、人文題地名改為「柴灣」、localStorage key 改 `hk-revision-quest-v1`（不讀舊進度 key，玩家進度會重置；Jessie 已接受））。
- 2026-10-21 歷史改寫後語意覆核：文字替換將舊進度 key 名換成新 key 名；已逐行檢查，修正 STATUS 第 70 行（「沿用舊進度」已不正確）。
- 2026-10-21 B2 完成：Jessie 批准（D-027），PR #10→#11→#12 已合併（4e4705c、7e445bf、0f3e632），GitHub Pages 已更新（103 關／591 題，VERIFIED_ONLY_DEFAULT=false、UNLOCK_ALL=true，校名 0 結果）；單一離線 HTML 已出；玩家舊進度重設，家長通知見 RELEASE.md 第 6 節。#13／#14／#15 未合併。
- 2026-10-21 文件 Bot 核對 main `8c49220`：`validate.js` → ALL OK 103 levels 591 questions；154 題 `verified:true`（26 關）、437 題 `false`；B2 新增 p2m96（6）、p4m96（8）、p5m96（5）共 19 題，全部 `verified:false`。
