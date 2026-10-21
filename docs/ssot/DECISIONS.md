# 決策紀錄

| ID | 日期 | 決定 | 原因 | 決定人 |
|---|---|---|---|---|
| D-001 | 2026-10-21 | 開展溫習闖關遊戲（網頁版），對象 P1/P2/P4/P5 | 2026-27 第一次考試溫習 | Jessie |
| D-002 | 2026-10-21 | 只做中文（含中作）、英文、數學、人文、科學；不做普通話、音樂、體育 | 用戶指示 | Jessie |
| D-003 | 2026-10-21 | 每科一個世界、每課一關；數學加螺旋複習關；每世界 Boss 模擬考；錯題簿自動生成複習關；P2 讀題；P1 只做練習關 | 已批准方案 | Jessie |
| D-004 | 2026-10-21 | 題庫用 JSON，方便老師增減（已由 D-014 取代） | 已批准方案 | Jessie |
| D-005 | 2026-10-21 | 只用 ✅ 已核實課題出題；⚠️ 推斷內容標記待核實，不上線 | 準確性 | Jessie |
| D-006 | 2026-10-21 | GitHub repo 未建，SSOT 暫放 /workspace/hk-revision-game/ | 待決定 repo | Jessie |（已過時：repo hk-revision-game 已建立，SSOT 現於 repo `docs/ssot/`）
| D-007 | 2026-10-21 | 重要決定及部署前必須問 Jessie | 用戶指示 | Jessie |
| D-008 | 2026-10-21 | 純靜態網站（無後端） | 由專案經理 Bot 轉達 Jessie 批准（對應 Q1） | Jessie |
| D-009 | 2026-10-21 | 用 GitHub Pages 發佈，路徑 `/game/` | 由專案經理 Bot 轉達 Jessie 批准（對應 Q2） | Jessie |
| D-010 | 2026-10-21 | 使用新公開 repo `hk-revision-game` | 由專案經理 Bot 轉達 Jessie 批准（對應 Q3） | Jessie |
| D-011 | 2026-10-21 | 只用自擬題目，不引用／抄錄課本例題或圖片 | 由專案經理 Bot 轉達 Jessie 批准（對應 Q6） | Jessie |
| D-012 | 2026-10-21 | 讀題用瀏覽器內置粵語語音 | 由專案經理 Bot 轉達 Jessie 批准（對應 Q7） | Jessie |
| D-013 | 2026-10-21 | 任何人都可以玩，無登入 | 由專案經理 Bot 轉達 Jessie 批准（對應 Q8） | Jessie |
| D-014 | 2026-10-21 | 保留 `content.txt`＋`build.js`→`questions.js` 題庫格式，並為題目加 `verified`／`source` 欄位（取代 D-004 逐課 JSON 規劃） | 由專案經理 Bot 轉達 Jessie 批准（對應 Q9） | Jessie |
| D-015 | 2026-10-21 | `research.md` 不放入 repo | 由專案經理 Bot 轉達 Jessie 批准（對應 Q10） | Jessie |
| D-016 | 2026-10-21 | 試玩（公開版）只顯示已核實題目（`verified` 為真） | 由專案經理 Bot 轉達 Jessie 批准（對應 —） | Jessie |
| D-017 | 2026-10-21 | P1／P2 英文 44 題：① Jessie 於 2026-10-21 13:47 UTC 同文件 Bot 傾偈時親自決定全部當已核實；② 其後 PR #2 commit `2bcc01b`（開發 Bot 覆核）逐題對照 research.md 句式，將 7 題改 `verified: false`（ENG-P1-L00-005、ENG-P1-L01-004、ENG-P1-L01-005、ENG-P1-L03-002、ENG-P1-L03-003、ENG-P1-L03-005、ENG-P2-L03-005），其餘 37 題保留已核實 ；③ Jessie 其後（由專案經理 Bot 轉達，與 13:47 決定一致）**不接受** 7 題改 false → 全部 44 題當已核實；④ PR #2 commit `b8e7e98` 已將 7 題改返 `verified: true`（文件 Bot 核對：154 true／394 false）。註：`2bcc01b`、`b8e7e98` 作者顯示「安全 Bot」，係因為共用 git config，實際由開發 Bot 提交（見 CONVENTIONS 第 11 點） | ① ③ 由 Jessie 批准（① 親自，③ 由專案經理 Bot 轉達）；狀態：**已定案** | Jessie |
| D-018 | 2026-10-21 | 每個 Bot 喺自己嘅 git worktree（`/workspace/hk-revision-game-<bot名>`）工作，唔直接改共用資料夾（CONVENTIONS 第 11 點） | 由專案經理 Bot 轉達 Jessie 批准 | Jessie |
| D-019 | 2026-10-21 | 批准 CONVENTIONS 第 4、5、12、13 點：第 4 點自擬題目（D-011，Q6）；第 5 點題庫欄位按 PR #2 實施（D-014，Q9）；第 12 點 research.md 不入 repo（D-015，Q10）；第 13 點技術及發佈（D-008～D-010、D-013，Q1–Q3、Q8） | 由專案經理 Bot 轉達 Jessie 批准 | Jessie |
| D-020 | 2026-10-21 | 批准 CONVENTIONS 第 6 點（題目檔案位置：content.txt／build.js → questions.js；關卡 ID 格式 `p4s3`） | 由專案經理 Bot 轉達 Jessie 批准 | Jessie |
| D-021 | 2026-10-21 | 批准 CONVENTIONS 第 10 點（未核實或有疑問題目列入 UNVERIFIED_QUESTIONS.md，只標記唔自行改答案） | 由專案經理 Bot 轉達 Jessie 批准 | Jessie |
| D-022 | 2026-10-21 | 各 Bot 可在 repo 留 PR 意見及更新 docs/ssot，無需逐次請示；合併及發佈仍須 Jessie 批准（長期有效） | 由專案經理 Bot 轉達 Jessie 批准 | Jessie |

## 備註
- D-004：人手編輯改為 content.txt＋build.js（D-014）；PR #2 仍會由 build.js 自動輸出逐課 JSON（`questions/<subject>/<grade>/<lesson>.json`），作產出檔，唔係人手編輯。
- D-009 只係決定平台；實際啟用 GitHub Pages 前仍按 D-007 問 Jessie。

## 待 Jessie 決定
見 `OPEN-QUESTIONS.md`。
