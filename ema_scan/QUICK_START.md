# 🚀 EMA Scanner - 5分鐘快速開始

## 你已經有的信息：
```
✅ Bot Token: 8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs
✅ Chat ID: 7615600708
✅ Bot Username: @ema_scanner_tw_bot
```

---

## Step 1: 準備GitHub倉庫 (2分鐘)

### 1.1 建立GitHub倉庫

1. 登入 GitHub → 點 "New"
2. 倉庫名: `ema-scanner`
3. 描述: "EMA trend scanner for crypto"
4. 選 Public (方便部署)
5. **Create repository**

### 1.2 上傳檔案

在你的電腦上:

```bash
# 建立本地資料夾
mkdir ema-scanner
cd ema-scanner

# 初始化Git
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ema-scanner.git
git push -u origin main
```

或用GitHub Desktop更簡單：
- Clone倉庫
- 複製所有檔案到資料夾
- Commit & Publish

---

## Step 2: 連接Zeabur (2分鐘)

### 2.1 登入Zeabur

1. 去 https://zeabur.com
2. 用GitHub帳號登入

### 2.2 建立新Project

1. 點 "New Project"
2. 選 "Import from GitHub"
3. 選擇 `ema-scanner` 倉庫
4. 點 "Deploy"

### 2.3 設定環境變數

Zeabur Dashboard中:

1. 進入Project → Settings
2. 找 "Variables"
3. 添加:
   ```
   BOT_TOKEN = 8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs
   CHAT_ID = 7615600708
   NODE_ENV = production
   ```
4. Save & Deploy

---

## Step 3: 設定自動推播 (1分鐘)

### 選項A: 使用Zeabur Cron (推薦 ⭐)

在Zeabur Dashboard:

1. 進入Service → Settings
2. 找 "Cron Jobs"
3. 添加三個任務:

```
4H掃描:
- Schedule: 0 */4 * * *
- Command: node ema-scanner.js

12H掃描:
- Schedule: 0 0,12 * * *
- Command: node ema-scanner.js

1D掃描:
- Schedule: 0 0 * * *
- Command: node ema-scanner.js
```

4. Save & Done! 🎉

### 選項B: 使用GitHub Actions (備選)

1. 在GitHub倉庫 → Settings → Secrets
2. 添加兩個Secrets:
   - `BOT_TOKEN` = 你的Token
   - `CHAT_ID` = 你的Chat ID
3. GitHub Actions會自動執行 (`.github/workflows/` 中的配置)

---

## Step 4: 測試推播 (可選)

### 方式1: 手動觸發GitHub Actions
1. GitHub倉庫 → Actions
2. 選 "EMA 4H Scan"
3. 點 "Run workflow" → "Run workflow"
4. 等待完成，應該會收到Telegram推播！

### 方式2: 本地測試
```bash
npm install
BOT_TOKEN="8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs" CHAT_ID="7615600708" node ema-scanner.js
```

---

## ✅ 完成清單

- [ ] GitHub倉庫已建立
- [ ] 檔案已上傳
- [ ] Zeabur Project已建立
- [ ] 環境變數已設定
- [ ] Cron Jobs已設定
- [ ] 收到測試推播
- [ ] 啟慶慶！🎉

---

## 📅 推播時間表

### UTC時間:
- **4H**: 每4小時 (00:00, 04:00, 08:00, 12:00, 16:00, 20:00 UTC)
- **12H**: 00:00, 12:00 UTC
- **1D**: 00:00 UTC

### 台灣時間 (UTC+8):
- **4H**: 每4小時 (08:00, 12:00, 16:00, 20:00, 00:00, 04:00 台灣)
- **12H**: 08:00, 20:00 台灣
- **1D**: 08:00 台灣 (每天早上)

---

## 🎯 推播內容示例

```
📊 4h掃描結果
時間: 2024-05-03 10:20:30

━━━━━━━━━━━━━━━━━━━━

1. BTC/USDT
🟢 強多頭 | 評分: 100分
現價: $52000.1234
距EMA20: +2.35%
━━━━━━━━━━━━━━━━━━━━

2. ETH/USDT
🟢 中多頭 | 評分: 75分
現價: $2800.5678
距EMA20: +1.82%
...

📈 統計:
🟢 多頭: 6檔
🔴 空頭: 2檔
⚪ 無方向: 2檔
```

---

## 🐛 問題排查

### 沒有收到推播?

**檢查清單:**
- ✓ Bot Token正確嗎? (複製時沒有多空格?)
- ✓ Chat ID正確嗎? (應該是 7615600708)
- ✓ 環境變數在Zeabur中已Save?
- ✓ Bot已加入你的私聊? (在Telegram發送 `/start` 給 @ema_scanner_tw_bot)
- ✓ Zeabur日誌有錯誤嗎? (Dashboard → Logs)

**查看Zeabur日誌:**
1. Zeabur Dashboard
2. 選擇Project → Service
3. 點 "Logs"
4. 尋找 error 訊息

### 掃描太慢?

正常情況下：
- 4H掃描: 3-5分鐘 (掃描100個幣種)
- 12H掃描: 3-5分鐘
- 1D掃描: 3-5分鐘

如果超過10分鐘，可能是：
- Binance API有時會慢
- 網路問題

---

## 📚 進階配置

### 修改掃描設定

編輯 `ema-scanner.js`:

```javascript
// 修改掃描的幣種數量
symbols = symbols.slice(0, 100); // 改成你想要的數量

// 修改最小交易量
const minVolume = 10000000; // 改成其他值
```

### 添加更多指標

可以在 `scoreEMATrend()` 函數中添加：
- RSI
- MACD
- Bollinger Bands
- 其他技術指標

詳見 `README.md` 的"未來功能"部分。

---

## 💡 小提示

1. **時間轉換**: Cron使用UTC，記得轉換為你的時區
2. **成本**: Zeabur免費配額足夠運行此服務
3. **數據**: 使用的是幣安公開API，無需API Key
4. **安全**: 請不要在公開倉庫中暴露Bot Token (已用環境變數保護)

---

## ✨ 現在你已經準備好了！

去體驗你的EMA Scanner吧！

有任何問題，查看 `README.md` 或 `ZEABUR_DEPLOY.md`

**Happy Trading! 🚀📈**

---

*Created: May 3, 2024*
*Bot: @ema_scanner_tw_bot*
