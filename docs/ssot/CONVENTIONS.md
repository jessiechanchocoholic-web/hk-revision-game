# 協作規範

1. **SSOT**：所有任務狀態以 STATUS.md 為準；開工改「進行中」，完成改「審查中」，QA 通過先改「完成」。
2. 狀態只可用：待辦 / 進行中 / 審查中 / 完成 / 阻塞；每次更新填更新日期。
3. 交接寫入 HANDOFFS.md；重要決定寫入 DECISIONS.md，並先問 Jessie。
4. **內容規則**：只用自擬題目，不抄課本（D-011）；只用 research.md 標 ✅ 的課題；推斷內容標 `verified` 為未核實 並列入待核實清單；不用舊版英文課本標題。
5. **題目欄位（D-014）**：題庫保留 `content.txt`＋`build.js`→`questions.js`，每題要加 `verified`（已核實／未核實）同 `source`（來源）欄位；具體寫法待開發 Bot 實施後補入 README。未核實題目不會喺公開試玩顯示（D-016）。P2 讀題用瀏覽器粵語語音（D-012）。
6. **檔案位置**：非數學題目寫喺 `game/tools/content.txt`，數學題目由 `game/tools/build.js` 產生；改完必須跑 `node game/tools/build.js` 重新產生 `game/questions.js`（唔好直接改）。關卡 ID 格式 `p<年級><科目字母><課號>`，例如 `p4s3`、`p5m14`；實用文用 `99`。格式詳見 README.md。
7. **私隱與安全**：不收集學生個人資料、無登入、無追蹤；不得提交任何密鑰。
8. 文件一律用繁體中文。
9. 部署、建立/更改 repo 前必須得到 Jessie 批准。
10. 未核實或有疑問嘅題目一律列入 `docs/ssot/UNVERIFIED_QUESTIONS.md`（檔案、關卡 ID、題目、原因）；只標記，唔自行改答案。
11. **Git worktree（專案經理 Bot 規定，2026-10-21）**：每個 Bot 必須喺自己嘅 git worktree 工作，路徑 `/workspace/hk-revision-game-<bot名>`，**永遠唔好直接改共用資料夾** `/workspace/hk-revision-game`。每個 worktree 用自己嘅分支，改完經 PR 合併。
   ```bash
   cd /workspace/hk-revision-game
   git fetch origin
   # 新分支：
   git worktree add -b <分支名> /workspace/hk-revision-game-<bot名> origin/main
   # 已有分支（例：文件 Bot）：
   git worktree add /workspace/hk-revision-game-文件Bot docs/readme-ssot
   # 查看／完成後移除：
   git worktree list
   git worktree remove /workspace/hk-revision-game-<bot名>
   ```
   注意：同一分支唔可以同時喺兩個 worktree check out。
12. **research.md 不放入 repo**（D-015）；需要時喺 box `/workspace/hk-revision-game/research.md` 參考，唔好提交。
13. **技術及發佈**：純靜態網站（D-008）、GitHub Pages `/game/`（D-009）、公開 repo（D-010）、無登入任何人可玩（D-013）；啟用部署前仍要問 Jessie（D-007）。
