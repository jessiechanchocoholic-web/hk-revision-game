# 交接紀錄

格式：日期｜由 → 到｜任務 ID｜交接內容｜下一步

| 日期 | 由 | 到 | 任務 ID | 內容 | 下一步 |
|---|---|---|---|---|---|
| 2026-10-21 | Jj | 統籌 | — | 方案已批准，research.md 已完成 | 分派第一批 |
| 2026-10-21 | 統籌 | 全隊（待通知） | B1-* | 第一批任務已寫入 STATUS.md | 開發 Bot 先做 B1-DEV-01 schema |
| 2026-10-21 | 文件 Bot | 專案經理 Bot／QA Bot | B1-DOC-01、B1-DOC-02 | 新增 README.md（點玩、老師點加減題目）；同步 STATUS／DECISIONS／CONVENTIONS／OPEN-QUESTIONS 與 repo 實況；新增 UNVERIFIED_QUESTIONS.md。PR：分支 `docs/readme-ssot`（未 merge） | Jessie 審 PR；QA Bot 按 UNVERIFIED_QUESTIONS.md 核對；Jessie 決定 Q9、Q10 |
| 2026-10-21 | 文件 Bot | QA Bot／專案經理 Bot | B1-DOC-01、B1-DOC-02 | 按 QA 審查更新 README（PR #2 欄位、逐課 JSON 產出、validate.js、`?verifiedOnly`）、STATUS、DECISIONS 備註、UNVERIFIED_QUESTIONS；CONVENTIONS 暫不改（等 Jessie） | PR #1/#2/#3/#5 合併後，文件 Bot rebase PR #4 解決 STATUS／HANDOFFS 衝突 |
| 2026-10-21 | 文件 Bot | 開發 Bot | B1-DEV-09 | D-017 已定案：Jessie 不接受 PR #2 `2bcc01b` 將 7 題英文改 false，P1／P2 英文 44 題全部已核實 | 開發 Bot 喺 PR #2 將 7 題改返 `verified: true`，build＋validate 後應為 154 題 true／394 題 false |
| 2026-10-21 | 安全 Bot | 專案經理 Bot／Jessie | B1-SEC-01、B1-SEC-02 | 安全審核完成（無高風險），報告見 SECURITY_REVIEW.md | Jessie 確認 Q6 版權取向；開發 Bot 考慮 innerHTML→textContent 及移除 game.zip |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-Q-01~05 → B1-QA-01 | PR feat/question-bank：548 題，加齊 CONVENTIONS 必填欄位、JSON 檔、validate 檢查（ALL OK）、headless 載入測試通過 | QA 對照 research.md 審核答案；重點抽查 verified:false 關卡；通過後改「完成」 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-Q-01~05 → B1-QA-01 | PR #2 加 verified-only 開關；兩個模式 headless 測試通過 | QA 測 `?verifiedOnly=1`（28 關／167 題）同預設模式 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-Q-01~05、B1-DEV-06 → B1-QA-01/02 | PR #2：預設只顯示已核實；P2 讀題掣 | QA 喺真機（iPad/Android/Chrome）試粵語聲；`?verifiedOnly=0` 測全部題目 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-QA-01/02 覆審 | 已修 QA 7 項（見 PR #2 留言） | QA 覆審；真機試粵語聲 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot、Docs Bot | B1-QA-01 | P1/P2 英文 7 題改 verified:false | 覆審；待補 1A/2A 詞彙表 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-QA-01 | 按 Jessie 決定撤回 P1/P2 英文 7 題降級 | 覆審 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-QA-02 | 答錯唔透露答案、冇合適語音隱藏讀題掣、P1 無 Boss | 真機覆審讀題掣顯示 |
