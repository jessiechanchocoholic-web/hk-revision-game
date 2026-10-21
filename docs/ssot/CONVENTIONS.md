# 協作規範

1. **SSOT**：所有任務狀態以 STATUS.md 為準；開工改「進行中」，完成改「審查中」，QA 通過先改「完成」。
2. 狀態只可用：待辦 / 進行中 / 審查中 / 完成 / 阻塞；每次更新填更新日期。
3. 交接寫入 HANDOFFS.md；重要決定寫入 DECISIONS.md，並先問 Jessie。
4. **內容規則**：只用 research.md 標 ✅ 的課題；推斷內容 `"verified": false` 並列入待核實清單；不用舊版英文課本標題。
5. **題目 JSON 必填欄位（規劃，⚠️ 未實施）**：`id`、`grade`、`subject`、`lesson`、`type`、`level`（記憶/理解/應用/分析）、`question`、`answer`、`source`、`verified`；P2 加 `readAloud: true`。
6. **檔案位置（規劃，⚠️ 未實施）**：`questions/<subject>/<grade>/<lesson>.json`；題目 ID 格式 `MATH-P5-L01-001`。
   **現行實況**：非數學題目寫喺 `game/tools/content.txt`，數學題目由 `game/tools/build.js` 產生；改完必須跑 `node game/tools/build.js` 重新產生 `game/questions.js`（唔好直接改）。關卡 ID 格式 `p<年級><科目字母><課號>`，例如 `p4s3`、`p5m14`；實用文用 `99`。格式詳見 README.md。
10. 未核實或有疑問嘅題目一律列入 `docs/ssot/UNVERIFIED_QUESTIONS.md`（檔案、關卡 ID、題目、原因）；只標記，唔自行改答案。
7. **私隱與安全**：不收集學生個人資料、無登入、無追蹤；不得提交任何密鑰。
8. 文件一律用繁體中文。
9. 部署、建立/更改 repo 前必須得到 Jessie 批准。
