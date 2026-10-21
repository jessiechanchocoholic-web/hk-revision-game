# QA 報告（B1-QA-01 / B1-QA-02）

- 日期：2026-10-21｜審查者：QA Bot
- 範圍（審查次序）：PR #2 `feat/question-bank`（head e37e647）→ PR #1 安全報告 → PR #4 文件 → PR #3 發佈準備
- 結論：四個 PR 全部 **需要修改**（遊戲本身可玩、0 console 錯誤；問題集中喺題目內容標記及文件同步）

## PR #2 題庫
`node game/tools/validate.js` → `ALL OK 97 levels 548 questions`（0 錯誤）。548 題逐題人手核對答案，課題全部對應 research.md。

### 必須修改
1. `questions/math/P2/L02.json:83`（build.js:34）「有6組，每組20粒糖…」用乘法，research.md §3 列明 P2 L12–17 乘法**不在範圍**；而且此關 `verified:true`。→ 改為以20為一組逐組數數，或刪除。
2. **p4m18 梯形題答案錯**：`questions/math/P4/L18.json:83`（build.js:136）「一個梯形可以分割成：一個長方形和三角形」。數學核對：由短底兩端各作一條高，一般梯形（非直角）會分成 1 個長方形＋2 個三角形；只有直角梯形先係 1 個長方形＋1 個三角形。另外兩條對角線之一亦可把任何梯形分成 2 個三角形。→ 題幹改「直角梯形」，或答案改「一個長方形和兩個三角形」。
3. `questions/chi/P5/L02.json:51`「合作」反義詞答案「分裂」不恰當（常用反義為「分工各做／單幹」，題目選項中無理想答案）。→ 改題或刪除。
4. `level` 欄位按題型機械填寫，不準確：所有 mc/tf → 記憶、數學 fill → 應用、無任何「分析」題。例：`questions/math/P2/L10.json:32`「1米＝（ ）厘米」標「應用」應為「記憶」；中文修辭判斷（P2 L05 #5、P4 L05 #3、P5 L01 #5）、英文文法選擇（P4/P5 全部 mc）、科學可逆／不可逆分類（P5 L04）標「記憶」應為「理解／應用」；P4 sci L05「大量捕殺動物會…」應為「分析」。→ build.js 改為逐題指定 level（可保留預設，但要人手覆寫）。
5. `verified`：
   - 英文 P1/P2/P4/P5 全部 `true` 合理（language focus ✅），但 P5 Ch2 `good at`、`afraid of`、`share with`（`questions/eng/P5/L02.json`）不在 research.md 列出例子內，屬推斷 → 建議逐題 false 或補來源。
   - P2 math L02 見第 1 點，不應 true。
   - 其餘 69 關 false 合理（中文課文內容、只核實課名之課、P4 數學、P2/P5 科學、P4 人文、P1）。

### 建議（非阻擋）
6. `questions/chi/P5/L08.json:11` 題目寫《金縷衣》（正確寫法），research.md §1 寫「金鏤衣」→ 請 文件 Bot 更正 research.md。
7. `questions/chi/P2/L05.json:95`「小鳥在樹上唱歌」判為擬人法，具爭議（鳥本身會「鳴叫」）→ 建議換更明確例句。
8. `questions/math/P2/L19.json:11` 等 P2 活動時間題用「15時40分」24小時制，P2 未學 → 改「下午3時40分」。
9. P5 分數題要求假分數（如 `questions/math/P5/L04.json:28` 13/12），本港 P5 通常寫帶分數；`game.js` `norm()` 刪去空格，輸入「1 1/12」會變「11/12」判錯 → 建議接受帶分數。
10. 答錯時提示直接顯示 `explain`，多數已透露答案（見 qa-shots/05-wrong-feedback.png）→ 建議第一次答錯只顯示「再試一次」。

## PR #2 功能／手機測試（Playwright + Chrome，375×667）
| 項目 | 結果 |
|---|---|
| 載入題庫、年級→科目→地圖 | 通過 |
| 鎖關（未過第1關不能入第2關） | 通過 |
| 作答（mc/tf/fill/order）、答錯重試、計分 | 通過（5/6 首答對 → 2★，符合 ≥70% 規則） |
| 過關後解鎖下一關 | 通過 |
| 錯題簿收集 | 通過（1 題） |
| `#level=` 直接入關、P2 讀題按鈕／無語音提示 | 通過 |
| Console 錯誤 | 0 |
| 橫向溢出（scrollWidth） | 全部 375，無溢出 |
未測：Boss（需全關 1★）、錯題簿答啱2次移除、真機粵語語音。

## PR #1 安全報告
- `docs/ssot/STATUS.md:22` 出現亂碼「完��樣本」（UTF-8 字元損壞，原為「完整樣本」）→ 必須修正。
- 審核範圍只係 main `161bd51`，未覆蓋 PR #2 新增 548 題、questions/*.json、game.js 改動 → 建議 PR #2 合併後補審。
- 報告內容本身合理；`game.zip` 已由 PR #2 移除。

## PR #2 `?verifiedOnly=1` 開關（e37e647）
| 測試 | 結果 |
|---|---|
| 預設（`VERIFIED_ONLY_DEFAULT=false`，game.js:5） | 顯示全部：P2 中/英/數14關/科；P5 中/英/數12關/科 |
| `?verifiedOnly=1` | P2：English 3、數學 6（L1–L6）、科學 1（L1）；P5：English 3、數學 6（L1–L6）；中文、人文、其他科學隱藏 ✅ |
| `?verifiedOnly=0` | 同預設 ✅ |
| `?verifiedOnly=1#level=p2m7`（未核實關卡直入） | 唔會開未核實關，返回地圖 ✅ |
| Console 錯誤 | 0 |
- 注意：開關以「關卡」為單位；P2 數學 L2（含乘法題，見第1點）仍會顯示 → 修正第1點後先可靠。
- 建議發佈時 `VERIFIED_ONLY_DEFAULT=true`。
- 截圖：`/workspace/qa-shots/vo*.png`

## PR #4 文件（README、SSOT 同步）
- 內容已過時：README／STATUS／CONVENTIONS／DECISIONS 寫「題目無 id/source/verified/level、唔係逐課 JSON、⚠️ 未實施」，但 PR #2 已加齊欄位及 `questions/<subject>/<grade>/<lesson>.json`、`?verifiedOnly` → PR #2 合併後要重寫相關段落，OPEN-QUESTIONS Q9 可能已解決。
- CONVENTIONS.md 第5–6點改為「規劃，未實施」及新增第11點（worktree 規則）屬規範改動；按 CONVENTIONS 第3點，重要決定要寫入 DECISIONS.md 並先問 Jessie。
- README 未提 `?verifiedOnly=1`。
- STATUS.md／HANDOFFS.md 同 PR #1、#2、#3 同改同一表格，合併次序要小心處理衝突。

## PR #3 發佈準備（RELEASE.md）
- CHANGELOG 草稿過時：寫「Boss 關、錯題簿尚未完成」，實際已有；未提 548 題、questions/*.json、`?verifiedOnly`；仍提 `game.zip`（PR #2 已刪）；「main 只有 1 個 commit」「本機有未 commit 改動」已不符。
- 發佈前技術檢查「verified:false 已隱藏」→ 建議寫明具體做法：`VERIFIED_ONLY_DEFAULT=true`（game.js:5）。
- 閘門清單合理；方案 A／B 分析合理，部署仍須 Jessie 批准。

## 覆審 PR #2 eff9ac4（2026-10-21，已核實模式為試玩重點）
- validate.js：ALL OK 97 levels 548 questions；`VERIFIED_ONLY_DEFAULT=true`（game.js:5）。
- 預設／`?verifiedOnly=1`：28 關／167 題（全部題目 verified:true）；`=0`：97 關 ✅。
- 375×667、768×1024 兩種模式：無橫向溢出、0 console 錯誤 ✅（截圖 `/workspace/qa-shots/r2-*.png`）。
- 讀題：mock speechSynthesis 確認中文／數學用 `zh-HK`、英文用 `en-GB`；無語音時顯示「請老師讀題」。headless 無法驗證真實粵語發音 → 需真機測試。
- 167 題內容與 693e424 相同，已逐題覆核。

| 項目 | 狀態 |
|---|---|
| 新：game.js:64–69 讀題掣重複（P2 每題兩個） | ❌ 新問題 |
| 新：game.js:64 讀題讀出排序題正確次序（洩露答案） | ❌ 新問題 |
| P2 math L02 乘法題 verified:true | ❌ 未改 |
| eng/P5/L02 推斷用法 verified:true | ❌ 未改 |
| level 欄位機械填寫 | ❌ 未改 |
| p4m18 梯形答案、p5c2 反義詞（未核實、試玩隱藏） | ❌ 未改（非阻擋） |
| 預設只顯示已核實 | ✅ 已改 |
結論：**需要修改**；修正第1–3項後可用於 Jessie 試玩。

## 第三次覆審 PR #2 f010cdb（2026-10-21）
- validate.js：ALL OK 97 levels 548 questions。
- 預設／`?verifiedOnly=1`：26 關／154 題；`=0`：97 關 ✅。
- 7 項修正全部驗證通過：讀題掣單一、排序題讀題唔洩露答案、P2 math L02 及 eng/P5/L02 改 false、level 重新對應（應用 119／理解 20／記憶 15）、p4m18 改為對角線分割得兩個三角形（正確）、p5c2 改近義詞（協作）。
- 154 題覆核 research.md：無新問題。
- 375×667、768×1024 兩模式：無溢出、0 console 錯誤；讀題 mock 確認 zh-HK／en-GB，真實粵語發音未驗證（需真機）。
- 非阻擋：無粵語語音時仍顯示讀題掣；p5m1#5、p2s1#4 level 小執；帶分數輸入、答錯提示洩露答案（已延後）。
- 截圖：`/workspace/qa-shots/r3-*.png`
**結論：已核實模式可供 Jessie 今晚試玩。**
