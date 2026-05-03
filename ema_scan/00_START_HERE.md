# 🚀 EMA Scanner Bot - 完整部署指南

## 📍 你在這裡

這是一個**加密貨幣EMA趨勢掃描器**，會自動掃描幣安合約市場，識別多頭和空頭趨勢，並通過Telegram推送結果。

---

## ✨ 功能一覽

- ✅ **自動掃描**: 4h / 12h / 1d 三個時間框架
- ✅ **智能評分**: EMA20/50/100/200排列自動評分 (-100 ~ 100分)
- ✅ **Telegram推播**: 結果自動推送到你的私聊
- ✅ **零成本部署**: 完全免費 (Zeabur + GitHub)
- ✅ **無需API**: 只用Binance公開行情數據

---

## 🎯 你需要的信息

我已經有了：
```
✅ Bot Token: 8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs
✅ Chat ID: 7615600708
✅ Bot Username: @ema_scanner_tw_bot
```

---

## 📋 分三部分完成部署

### 📌 Part 1: 準備GitHub倉庫 (5分鐘)
→ 見 `PART1_GITHUB.md`

### 📌 Part 2: 部署到Zeabur (5分鐘)
→ 見 `PART2_ZEABUR.md`

### 📌 Part 3: 設定自動推播 (2分鐘)
→ 見 `PART3_CRON.md`

---

## 🚀 快速開始 (給急著的人)

### 1️⃣ 克隆倉庫
```bash
git clone https://github.com/YOUR_USERNAME/ema-scanner.git
cd ema-scanner
```

### 2️⃣ 複製環境變數
```bash
cp .env.example .env
# 不用改，已經預設了你的Token和Chat ID
```

### 3️⃣ 上傳到你的GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 4️⃣ 連接到Zeabur
1. 去 zeabur.com
2. Import from GitHub
3. 選擇你的 ema-scanner 倉庫
4. Deploy (應該成功了！)

### 5️⃣ 設定Cron Job
1. 進入Service → 設定
2. 定時自動運載 → 啟用
3. 設定執行時間 (e.g., 每4小時)

### 6️⃣ 完成！ 🎉
等待推播結果到你的Telegram

---

## 📚 詳細文檔

| 檔案 | 用途 |
|------|------|
| **00_START_HERE.md** | 這個檔案 (總覽) |
| **PART1_GITHUB.md** | GitHub倉庫設定 |
| **PART2_ZEABUR.md** | Zeabur部署步驟 |
| **PART3_CRON.md** | 自動推播設定 |
| **README.md** | 專案完整文檔 |
| **ZEABUR_FIX.md** | 如果部署失敗 |
| **ema-scanner.js** | 核心程式碼 |
| **package.json** | 依賴配置 |

---

## 🔑 環境變數

已經預設在 `.env.example` 中：

```
BOT_TOKEN=8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs
CHAT_ID=7615600708
NODE_ENV=production
```

**無需修改，直接使用！**

---

## ⏰ 推播時間表

### UTC時間:
- **4H**: 每4小時執行
- **12H**: 00:00、12:00
- **1D**: 00:00

### 台灣時間 (UTC+8):
- **4H**: 每4小時
- **12H**: 08:00、20:00  
- **1D**: 08:00 (每天早上)

---

## 💡 推播內容示例

```
📊 4h掃描結果
時間: 2024-05-03 10:20

━━━━━━━━━━━━━━

1. BTC/USDT
🟢 強多頭 | 評分: 100分
現價: $52000.1234
距EMA20: +2.35%

2. ETH/USDT
🟢 中多頭 | 評分: 75分
現價: $2800.5678
距EMA20: +1.82%

📈 統計:
🟢 多頭: 6檔
🔴 空頭: 2檔
⚪ 無方向: 2檔
```

---

## 🐛 遇到問題？

### 問題1: Zeabur部署失敗
→ 查看 `ZEABUR_FIX.md`

### 問題2: 沒有收到Telegram推播
→ 查看 `PART3_CRON.md` 的除錯部分

### 問題3: 想要修改掃描設定
→ 編輯 `ema-scanner.js` 中的參數

---

## 📞 支援

有任何問題：
1. 查看相應的MD檔案
2. 檢查Zeabur的Logs
3. 確認環境變數設定正確

---

## ✅ 完成清單

部署時檢查以下項目：

- [ ] GitHub倉庫已建立
- [ ] 檔案已上傳到GitHub
- [ ] Zeabur連接成功
- [ ] 環境變數已設定
- [ ] 服務已Deploy
- [ ] Cron Job已啟用
- [ ] 收到第一個推播
- [ ] 慶祝成功！🎉

---

## 🎯 下一步

**選擇一個部分開始：**

1. **還沒有GitHub倉庫？** → 看 `PART1_GITHUB.md`
2. **準備好Deploy了？** → 看 `PART2_ZEABUR.md`
3. **要設定自動推播？** → 看 `PART3_CRON.md`

---

**Good luck! 祝部署順利！** 🚀📈

*Last updated: May 3, 2024*
