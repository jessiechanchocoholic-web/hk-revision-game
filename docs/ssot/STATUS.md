# 任務看板（小學溫習闖關遊戲）

Repo：https://github.com/jessiechanchocoholic-web/hk-revision-game （預設分支 `main`）

## 現況摘要（2026-10-21，文件 Bot 核對 repo）
- 遊戲骨架已在 `game/`：純靜態網頁，入口 `game/index.html`／`game/開始遊戲.html`。
- 題庫：97 關、548 題，由 `game/tools/build.js` 讀 `game/tools/content.txt` ＋ 數學產生器輸出 `game/questions.js`。
- 已有：世界／年級選擇、每課一關、Boss 模擬考、錯題簿（localStorage）、P2 讀題（Web Speech）、星星／徽章。
- 題目欄位（D-014）已喺 PR #2 實施（未合併）：build.js 自動加 id／source／verified 等欄位，並輸出 `questions/<subject>/<grade>/<lesson>.json`；`validate.js` 檢查；`?verifiedOnly=1` 開關、預設只顯示已核實（28 關／167 題，D-016）。
- 未部署；已決定用 GitHub Pages `/game/`（D-009），啟用前要問 Jessie。
- 已包括第二、三批部分內容（P4 數學、P2 英文、P2/P5 科學、P4 人文、P1 練習、中文各課）。
- 待核實題目清單：`UNVERIFIED_QUESTIONS.md`。

狀態只可使用：待辦 / 進行中 / 審查中 / 完成 / 阻塞
資料來源：`research.md`（按 D-015 不放入 repo，現存於 box `/workspace/hk-revision-game/research.md`）（✅ 已核實；⚠️ 推斷＝要老師／課本核對；❌ 未有）
規則：題目只可用 ✅ 課題；⚠️ 內容必須標 `verified` 為未核實，不可上線（D-016）。

## 第一批

| ID | 任務 | 負責 Bot | 狀態 | 更新日期 | 備註 |
|---|---|---|---|---|---|
| B1-DEV-01 | 題庫欄位（按 D-014：content.txt＋build.js 加 verified/source）＋範例檔＋驗證腳本 | 開發 Bot | 審查中 | 2026-10-21 | 最優先；題庫任務依賴此 schema；現行格式為 content.txt＋build.js→questions.js，無 verified/id 欄位；未有獨立驗證腳本 |
| B1-DEV-02 | 遊戲框架：世界地圖（中文城、英文島、數學山、人文村、科學實驗室）、年級選擇（P1 練習／P2／P4／P5）、關卡＝每課一關 | 開發 Bot | 審查中 | 2026-10-21 | 純靜態網站（D-008）；已在 repo（靜態 HTML/JS），待 QA |
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
| B1-QA-01 | 題庫內容審核：每題對照 research.md 課題、答案正確、⚠️ 題目標 verified:false | QA Bot | 待辦 | 2026-10-21 | 依賴 B1-Q-01~05 |
| B1-QA-02 | 功能測試：關卡、Boss、錯題簿、讀題、手機/平板顯示 | QA Bot | 待辦 | 2026-10-21 | 依賴 B1-DEV |
| B1-SEC-01 | 私隱審查：不收集學生姓名/個人資料、無登入、無追蹤分析、只用 localStorage | 安全 Bot | 待辦 | 2026-10-21 | |
| B1-SEC-02 | 檢查 repo 無密鑰/token、無第三方腳本風險、版權（課本內容只作溫習用，不整段抄錄） | 安全 Bot | 待辦 | 2026-10-21 | 只用自擬題目（D-011） |
| B1-DOC-01 | 老師／家長指南：如何增減題目（content.txt／build.js） | 文件 Bot | 審查中 | 2026-10-21 | 依賴 B1-DEV-01；README.md 已寫（PR docs/readme-ssot） |
| B1-DOC-02 | 維護 SSOT 文件及「待核實內容清單」（⚠️ 項目） | 文件 Bot | 審查中 | 2026-10-21 | ；SSOT 已同步；UNVERIFIED_QUESTIONS.md 已建立（PR docs/readme-ssot） |
| B1-DEP-01 | 部署準備（只準備，不上線）：GitHub Pages `/game/`（D-009）部署步驟 | 部署 Bot | 待辦 | 2026-10-21 | 部署前必須問 Jessie |

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
| ID | 任務 | 負責 Bot | 狀態 | 更新日期 | 備註 |
|---|---|---|---|---|---|
| B1-DEV-08 | 為題目加 `verified`／`source` 欄位（content.txt＋build.js），試玩只顯示已核實題目 | 開發 Bot | 審查中 | 2026-10-21 | D-014、D-016；PR #2 已實施，待 QA 及合併 |
| B1-DEV-09 | PR #2：將 commit `2bcc01b` 改為 false 嘅 7 題（ENG-P1-L00-005、ENG-P1-L01-004、ENG-P1-L01-005、ENG-P1-L03-002、ENG-P1-L03-003、ENG-P1-L03-005、ENG-P2-L03-005）改返 `verified: true`（移除 `UNVERIFIED_Q` 入面呢 7 個 ID），重新 build／validate | 開發 Bot | 完成 | 2026-10-21 | D-017 已定案：P1／P2 英文 44 題全部已核實；PR #2 commit `b8e7e98` 已改返，文件 Bot 核對：7 題全部 true，總數 154 true／394 false |
