# 交接紀錄

格式：日期｜由 → 到｜任務 ID｜交接內容｜下一步

| 日期 | 由 | 到 | 任務 ID | 內容 | 下一步 |
|---|---|---|---|---|---|
| 2026-10-21 | Jj | 統籌 | — | 方案已批准，research.md 已完成 | 分派第一批 |
| 2026-10-21 | 統籌 | 全隊（待通知） | B1-* | 第一批任務已寫入 STATUS.md | 開發 Bot 先做 B1-DEV-01 schema |
| 2026-10-21 | 部署 Bot | 專案經理 Bot／Jessie | B1-DEP-01 | 發佈準備文件 RELEASE.md 已完成（未開 Pages、未部署） | QA Bot、安全 Bot 完成審核後，Jessie 審批是否開啟 Pages（方案 A/B） |
| 2026-10-21 | 專案經理 Bot | 部署 Bot | B1-DEP-01 | 轉達 Jessie 決定：方案 A（main root，/game/）、公開使用；已記入 RELEASE.md、DECISIONS D-008 | 確認 research.md/docs 公開無問題；等 QA／安全通過及 Jessie 最後拍板開 Pages |
| 2026-10-21 | 文件 Bot | 專案經理 Bot／QA Bot | B1-DOC-01、B1-DOC-02 | 新增 README.md（點玩、老師點加減題目）；同步 STATUS／DECISIONS／CONVENTIONS／OPEN-QUESTIONS 與 repo 實況；新增 UNVERIFIED_QUESTIONS.md。PR：分支 `docs/readme-ssot`（未 merge） | Jessie 審 PR；QA Bot 按 UNVERIFIED_QUESTIONS.md 核對；Jessie 決定 Q9、Q10 |
| 2026-10-21 | 文件 Bot | QA Bot／專案經理 Bot | B1-DOC-01、B1-DOC-02 | 按 QA 審查更新 README（PR #2 欄位、逐課 JSON 產出、validate.js、`?verifiedOnly`）、STATUS、DECISIONS 備註、UNVERIFIED_QUESTIONS；CONVENTIONS 暫不改（等 Jessie） | PR #1/#2/#3/#5 合併後，文件 Bot rebase PR #4 解決 STATUS／HANDOFFS 衝突 |
| 2026-10-21 | 文件 Bot | 開發 Bot | B1-DEV-09 | D-017 已定案：Jessie 不接受 PR #2 `5b45ecb` 將 7 題英文改 false，P1／P2 英文 44 題全部已核實 | 開發 Bot 喺 PR #2 將 7 題改返 `verified: true`，build＋validate 後應為 154 題 true／394 題 false |
| 2026-10-21 | 安全 Bot | 專案經理 Bot／Jessie | B1-SEC-01、B1-SEC-02 | 安全審核完成（無高風險），報告見 SECURITY_REVIEW.md | Jessie 確認 Q6 版權取向；開發 Bot 考慮 innerHTML→textContent 及移除 game.zip |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-Q-01~05 → B1-QA-01 | PR feat/question-bank：548 題，加齊 CONVENTIONS 必填欄位、JSON 檔、validate 檢查（ALL OK）、headless 載入測試通過 | QA 對照 research.md 審核答案；重點抽查 verified:false 關卡；通過後改「完成」 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-Q-01~05 → B1-QA-01 | PR #2 加 verified-only 開關；兩個模式 headless 測試通過 | QA 測 `?verifiedOnly=1`（28 關／167 題）同預設模式 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-Q-01~05、B1-DEV-06 → B1-QA-01/02 | PR #2：預設只顯示已核實；P2 讀題掣 | QA 喺真機（iPad/Android/Chrome）試粵語聲；`?verifiedOnly=0` 測全部題目 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-QA-01/02 覆審 | 已修 QA 7 項（見 PR #2 留言） | QA 覆審；真機試粵語聲 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot、Docs Bot | B1-QA-01 | P1/P2 英文 7 題改 verified:false | 覆審；待補 1A/2A 詞彙表 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-QA-01 | 按 Jessie 決定撤回 P1/P2 英文 7 題降級 | 覆審 |
| 2026-10-21 | 開發 Bot（題庫） | QA Bot | B1-QA-02 | 答錯唔透露答案、冇合適語音隱藏讀題掣、P1 無 Boss | 真機覆審讀題掣顯示 |
| 2026-10-21 | QA Bot | 開發 Bot／安全 Bot／專案經理 Bot | B1-QA-01、B1-QA-02 | PR #2 需修改（見 QA_REPORT.md 第1–5點）；功能及手機版面通過；PR #1 需修 STATUS.md:22 亂碼；PR #4 文件過時（未反映 PR #2）；PR #3 CHANGELOG 過時；?verifiedOnly=1 測試通過 | 開發 Bot 修 p4m18、P2 L02 乘法題、level 欄位後通知 QA 覆審；安全 Bot 修亂碼並補審 PR #2；文件 Bot／部署 Bot 喺 PR #2 合併後更新 |
| 2026-10-21 | 部署 Bot | 專案經理 Bot | B1-DEP-02 | v1.0.0 上線後檢查通過（RELEASE.md 第 5 節）；未有 GitHub Release | 決定是否建 Release；真機試粵語讀題 |
| 2026-10-21 | 開發 Bot | QA Bot、安全 Bot | B2-DEV-03 | 進階應用題 19 題（verified:false）＋步驟顯示＋獨立覆核 | QA 核對題意／步驟；決定是否核實上線 |
| 2026-10-21 | 開發 Bot | QA Bot、安全 Bot | B2-DEV-02 | 角色＋動畫（純 CSS/SVG，冇外部資源） | QA 真機試；安全 Bot 確認無外部請求 |
| 2026-10-21 | 開發 Bot | QA Bot、安全 Bot | B2-DEV-01 | 校名移除；rg（docs/ssot 以外）0 結果 | QA 試玩；安全 Bot 覆核私隱 |
| 2026-10-21 | 開發 Bot | QA Bot、安全 Bot | B3-DEV-01 | 主題動畫＋金星（純 inline SVG/CSS） | QA 真機睇各科各級；安全 Bot 確認無外部資源 |
| 2026-10-21 | QA Bot | 開發 Bot／專案經理 Bot | B2-QA-01 | PR #10／#11／#12 審查通過；#10 要清 docs/ssot 校名及舊 key；合併次序 #10→#11→#12 | 開發 Bot 處理 #10 跟進；Jessie 批准合併 |
| 2026-10-21 | QA Bot | 專案經理 Bot／Jessie | B2-QA-01 | B2 覆審：#10／#11／#12 通過；#10 刪除舊 key 搬遷 → Pages 現有玩家進度會重置 | Jessie 決定：接受重置／保留搬遷／保留舊 key |
| 2026-10-21 | QA Bot | 開發 Bot／專案經理 Bot | B2-QA-01 | Jessie 決定 PR #10 接受現有玩家進度重置（唔讀舊 key、冇搬遷代碼） | 可按次序 #10→#11→#12 待 Jessie 批准合併 |
| 2026-10-22 | 開發 Bot | QA Bot、安全 Bot | B3-DEV-01 | PR #16 已 merge main（42e4cab）解 STATUS/HANDOFFS 衝突，build/validate ALL OK（103 關／591 題） | 請 QA Bot、安全 Bot 重審；未 merge，等 Jessie 批 |
| 2026-10-22 | 開發 Bot | QA Bot | B3-DEV-02 | favicon：根目錄＋game/ 加 favicon.svg／.ico，index.html／開始遊戲.html 加 link；離線單檔內嵌 data URI；本地 server 4 個 favicon 路徑 200 | QA 喺 Pages 開 /game/ 同根目錄確認 favicon 冇 404；離線單檔分頁顯示星星 |
| 2026-10-22 | 開發 Bot | QA Bot | B4-DEV-01 | 小一中文老師工作紙 p1c3／p1c4 共 36 題（verified:false，source 老師工作紙）；bundle 外部引用檢查收緊；build/validate（105 關／627 題 ALL OK）／bundle 通過；headless 開 #level=p1c3、p1c4 正常 | QA 核對答案同老師批改一致、干擾項唯一正確；試玩 P1 中文第3、4關 |
