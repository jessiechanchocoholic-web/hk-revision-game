# 任務看板（愛秩序灣官立小學溫習闖關遊戲）

狀態只可使用：待辦 / 進行中 / 審查中 / 完成 / 阻塞
資料來源：`/workspace/hk-revision-game/research.md`（✅ 已核實；⚠️ 推斷＝要老師／課本核對；❌ 未有）
規則：題目只可用 ✅ 課題；⚠️ 內容必須在 JSON 標 `"verified": false`，不可上線。

## 第一批

| ID | 任務 | 負責 Bot | 狀態 | 更新日期 | 備註 |
|---|---|---|---|---|---|
| B1-DEV-01 | 題庫 JSON schema（年級/科目/課/題型/能力層次/來源/verified/readAloud）＋範例檔＋驗證腳本 | 開發 Bot | 待辦 | 2026-10-21 | 最優先；題庫任務依賴此 schema |
| B1-DEV-02 | 遊戲框架：世界地圖（中文城、英文島、數學山、人文村、科學實驗室）、年級選擇（P1 練習／P2／P4／P5）、關卡＝每課一關 | 開發 Bot | 待辦 | 2026-10-21 | 技術棧待 Jessie 決定（Q1），暫定靜態網頁 |
| B1-DEV-03 | 題型元件：選擇、圖片選擇、填充、拖放配對、排序、判斷修正（✓／改錯）、限時快答 | 開發 Bot | 待辦 | 2026-10-21 | |
| B1-DEV-04 | 數學螺旋複習關（每單元尾混舊課題）＋每世界 Boss 模擬考（全範圍＋舊知識） | 開發 Bot | 待辦 | 2026-10-21 | |
| B1-DEV-05 | 錯題簿：自動收集錯題→生成「復仇關」，答啱 2 次先移除；只存本機 localStorage | 開發 Bot | 待辦 | 2026-10-21 | 不收集學生個人資料 |
| B1-DEV-06 | P2 讀題功能（瀏覽器 Web Speech API，粵語／英語） | 開發 Bot | 待辦 | 2026-10-21 | 對應 P2 老師讀卷；粵語語音支援待測 |
| B1-DEV-07 | 獎勵：三星、徽章、combo；P1 只開練習關（無 Boss） | 開發 Bot | 待辦 | 2026-10-21 | |
| B1-Q-01 | 題庫 P5 數學 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ 5上A L1 多位數、L2 近似值和大數量的估計、L3 分數的比較、L4 異分母分數加法、L5 異分母分數減法、L6 異分母分數加減混合運算、L7 平行四邊形、L8 三角形、L9 梯形、L10 多邊形的面積；5上B L14、L15 代數符號(一)(二)。L7–10、L14–15 只核實課名，學習重點 ⚠️推斷 |
| B1-Q-02 | 題庫 P2 數學 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ L1 三位數、L2 數數活動、L3 加法(一)、L4 加法(二)、L5 減法、L6 加減應用題、L7 角和直角、L8 垂直線、L9 銳角和鈍角、L10–11 米的認識(一)(二)、L18 報時、L19 活動時間、L20 年和月。L7–11、L18–20 只核實課名 ⚠️；L12–17 乘法不在範圍；溫習工作紙(1) ❌；題目需 readAloud |
| B1-Q-03 | 題庫 P5 英文 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ 5A Ch1 Good manners（should/shouldn't、adverbs of manner）；Ch2 Be a good friend（verbs/adjectives + prepositions、adverbs of degree）；Ch3 Describing people（prepositional phrases in/with、relative pronoun who）。課文詞彙表 ❌；只用 2nd ed，舊版附件只參考題型 |
| B1-Q-04 | 題庫 P4 英文 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ 4A Ch1 My favourite activities（simple present、adverbs of frequency）；Ch2 Shows we like（too/either、both…and、or、but）；Ch3 At the supermarket（comparatives/superlatives、phrases of quantity）。詞彙表 ❌ |
| B1-Q-05 | 題庫 P4 科學 | 開發 Bot（題庫） | 審查中 | 2026-10-21 | ✅ 四上 L1 地球的結構（有完整樣本：地殼/地幔/地核、板塊、三類岩石、三類土壤）、L2 轉動的地球、L3 天氣和氣候、L4 動植物與環境、L5 大自然的平衡。L2–5 只有課名，內容 ⚠️推斷 |
| B1-QA-01 | 題庫內容審核：每題對照 research.md 課題、答案正確、⚠️ 題目標 verified:false | QA Bot | 待辦 | 2026-10-21 | 依賴 B1-Q-01~05 |
| B1-QA-02 | 功能測試：關卡、Boss、錯題簿、讀題、手機/平板顯示 | QA Bot | 待辦 | 2026-10-21 | 依賴 B1-DEV |
| B1-SEC-01 | 私隱審查：不收集學生姓名/個人資料、無登入、無追蹤分析、只用 localStorage | 安全 Bot | 待辦 | 2026-10-21 | |
| B1-SEC-02 | 檢查 repo 無密鑰/token、無第三方腳本風險、版權（課本內容只作溫習用，不整段抄錄） | 安全 Bot | 待辦 | 2026-10-21 | 版權取向待 Jessie 確認（Q6） |
| B1-DOC-01 | 老師／家長指南：如何用 JSON 增減題目 | 文件 Bot | 待辦 | 2026-10-21 | 依賴 B1-DEV-01 |
| B1-DOC-02 | 維護 SSOT 文件及「待核實內容清單」（⚠️ 項目） | 文件 Bot | 待辦 | 2026-10-21 | |
| B1-DEP-01 | 部署準備（只準備，不上線）：比較 GitHub Pages / Netlify 等方案，寫部署步驟 | 部署 Bot | 待辦 | 2026-10-21 | 部署前必須問 Jessie |

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

## 題庫 PR（feat/question-bank）— 2026-10-21
- 狀態：審查中（交 QA Bot：B1-QA-01）
- 題庫：97 關、548 題；`questions/<subject>/<grade>/<lesson>.json`（由 `game/tools/build.js` 生成，與 `game/questions.js` 同步）
- verified:true 關卡：數學 P2 L1–L6、P5 L1–L6；英文 P1/P2/P4/P5 全部；科學 P4 L1、P2 L1。其餘全部 verified:false（只核實課名或題型推斷）
- 「能力層次」(level) 由題型自動推定，待 QA 抽查
- 2026-10-21 更新：加「只顯示 verified:true」開關（`VERIFIED_ONLY_DEFAULT`／`?verifiedOnly=1`），預設顯示全部；開啟時 28 關／167 題。上線前用邊個模式待 Jessie 決定。
