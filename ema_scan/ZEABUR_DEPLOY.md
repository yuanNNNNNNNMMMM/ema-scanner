# EMA Scanner Bot - Zeabur部署指南

## 📋 準備工作

### 1. 項目檔案結構
```
ema-scanner/
├── ema-scanner.js
├── package.json
├── .env.example
├── zeabur.json
├── .github/workflows/scan-4h.yml
├── .github/workflows/scan-12h.yml
├── .github/workflows/scan-1d.yml
└── README.md
```

### 2. 環境變數

在Zeabur中設定以下環境變數：

```
BOT_TOKEN=8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs
CHAT_ID=7615600708
NODE_ENV=production
```

## 🚀 Zeabur部署步驟

### Step 1: 建立GitHub倉庫

1. 在GitHub建立新倉庫 `ema-scanner`
2. 上傳所有檔案:
```bash
git init
git add .
git commit -m "Initial commit: EMA Scanner Bot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ema-scanner.git
git push -u origin main
```

### Step 2: 連接Zeabur

1. 登入 https://zeabur.com
2. 點選 "New Project"
3. 選擇 "Import from GitHub"
4. 選擇 `ema-scanner` 倉庫
5. 點選 Deploy

### Step 3: 配置環境變數

在Zeabur Dashboard:
1. 進入 Project Settings
2. 找到 "Environment Variables"
3. 添加:
   - `BOT_TOKEN` = 你的Bot Token
   - `CHAT_ID` = 你的Chat ID
4. Save & Deploy

### Step 4: 配置自動推播 (Cron Jobs)

Zeabur支持兩種方式:

#### 方式A: 使用Zeabur Cron (推薦)

在服務設定中添加 Cron Jobs:

```
4H掃描:
- Schedule: 0 */4 * * * (每4小時)
- Command: node ema-scanner.js

12H掃描:
- Schedule: 0 0,12 * * * (每12小時 - 00:00、12:00 UTC)
- Command: node ema-scanner.js

1D掃描:
- Schedule: 0 0 * * * (每天00:00 UTC)
- Command: node ema-scanner.js
```

#### 方式B: 使用GitHub Actions (備選)

見下方GitHub Actions配置。

## 📅 GitHub Actions自動推播 (可選)

### 4H掃描 (.github/workflows/scan-4h.yml)

```yaml
name: EMA 4H Scan

on:
  schedule:
    - cron: '0 */4 * * *'  # 每4小時
  workflow_dispatch:

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run 4H scan
        env:
          BOT_TOKEN: ${{ secrets.BOT_TOKEN }}
          CHAT_ID: ${{ secrets.CHAT_ID }}
        run: node ema-scanner.js
```

### 12H掃描 (.github/workflows/scan-12h.yml)

```yaml
name: EMA 12H Scan

on:
  schedule:
    - cron: '0 0,12 * * *'  # 每12小時 (UTC 00:00、12:00)
  workflow_dispatch:

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run 12H scan
        env:
          BOT_TOKEN: ${{ secrets.BOT_TOKEN }}
          CHAT_ID: ${{ secrets.CHAT_ID }}
        run: node ema-scanner.js
```

### 1D掃描 (.github/workflows/scan-1d.yml)

```yaml
name: EMA 1D Scan

on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 00:00
  workflow_dispatch:

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run 1D scan
        env:
          BOT_TOKEN: ${{ secrets.BOT_TOKEN }}
          CHAT_ID: ${{ secrets.CHAT_ID }}
        run: node ema-scanner.js
```

## 🔐 設定GitHub Secrets (如使用GitHub Actions)

1. 進入 GitHub倉庫 Settings
2. 找到 "Secrets and variables" → "Actions"
3. 點 "New repository secret"
4. 添加:
   - Name: `BOT_TOKEN`, Value: `8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs`
   - Name: `CHAT_ID`, Value: `7615600708`

## ⚡ 時間區域注意

GitHub Actions使用 **UTC時間**:
- 4H: 每4小時執行一次 (UTC)
- 12H: UTC 00:00 和 12:00
- 1D: UTC 00:00 (每天)

如需轉換為台灣時間 (UTC+8):
- 4H: 同上
- 12H: 台灣時間 08:00、20:00
- 1D: 台灣時間 08:00

## 📊 推播示例

```
📊 4h掃描結果
時間: 2024-05-03 10:20 (台灣時間)
━━━━━━━━━━━━━━━━━━━━

1. BTC/USDT
🟢 強多頭 | 評分: 100分
現價: $52000.0000
距EMA20: +2.35%
━━━━━━━━━━━━━━━━━━━━

2. ETH/USDT
🟢 中多頭 | 評分: 75分
現價: $2800.0000
距EMA20: +1.82%
━━━━━━━━━━━━━━━━━━━━

...

📈 統計:
🟢 多頭: 6檔
🔴 空頭: 2檔
⚪ 無方向: 2檔
```

## 🐛 除錯

### 檢查日誌

Zeabur Dashboard → Project Logs

### 本地測試

```bash
npm install
BOT_TOKEN=xxx CHAT_ID=xxx node ema-scanner.js
```

### 常見問題

**問題**: 沒有收到推播
- 檢查BOT_TOKEN和CHAT_ID是否正確
- 確保Bot已加入你的私聊
- 檢查Zeabur日誌

**問題**: API限流
- Binance有API速率限制
- 程式中已加入延遲，正常使用不會超限

**問題**: 掃描太慢
- 現在掃描前100個USDT對，可在程式中調整
- 考慮按流動性預先篩選

## 📈 未來優化

- [ ] 添加更多指標 (RSI、MACD)
- [ ] 歷史記錄追蹤
- [ ] 自定義通知規則
- [ ] Web Dashboard
- [ ] 績效分析

## 📝 授權

MIT License

---

有任何問題？查看 README.md 或提交Issue！
