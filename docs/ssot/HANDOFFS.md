# 交接紀錄

格式：日期｜由 → 到｜任務 ID｜交接內容｜下一步

| 日期 | 由 | 到 | 任務 ID | 內容 | 下一步 |
|---|---|---|---|---|---|
| 2026-10-21 | Jj | 統籌 | — | 方案已批准，research.md 已完成 | 分派第一批 |
| 2026-10-21 | 統籌 | 全隊（待通知） | B1-* | 第一批任務已寫入 STATUS.md | 開發 Bot 先做 B1-DEV-01 schema |
| 2026-10-21 | 文件 Bot | 專案經理 Bot／QA Bot | B1-DOC-01、B1-DOC-02 | 新增 README.md（點玩、老師點加減題目）；同步 STATUS／DECISIONS／CONVENTIONS／OPEN-QUESTIONS 與 repo 實況；新增 UNVERIFIED_QUESTIONS.md。PR：分支 `docs/readme-ssot`（未 merge） | Jessie 審 PR；QA Bot 按 UNVERIFIED_QUESTIONS.md 核對；Jessie 決定 Q9、Q10 |
| 2026-10-21 | 文件 Bot | QA Bot／專案經理 Bot | B1-DOC-01、B1-DOC-02 | 按 QA 審查更新 README（PR #2 欄位、逐課 JSON 產出、validate.js、`?verifiedOnly`）、STATUS、DECISIONS 備註、UNVERIFIED_QUESTIONS；CONVENTIONS 暫不改（等 Jessie） | PR #1/#2/#3/#5 合併後，文件 Bot rebase PR #4 解決 STATUS／HANDOFFS 衝突 |
