# 🤖 EMA Scanner Bot - 加密貨幣趨勢掃描器

一個全自動的Telegram機器人，用EMA（指數移動平均線）掃描幣安合約市場，識別多頭和空頭趨勢。

## ✨ 功能特色

- ✅ **多時間框架**: 支持 4H、12H、1D 時間框架
- ✅ **EMA智能評分**: 基於EMA20/50/100/200排列順序自動評分
- ✅ **實時推播**: 掃描結果自動推送到Telegram
- ✅ **趨勢識別**: 清晰區分多頭、空頭、無方向
- ✅ **距離指標**: 顯示價格與EMA的距離
- ✅ **自動排程**: 按時間框架自動掃描 (Zeabur or GitHub Actions)
- ✅ **篩選機制**: 排除低流動性幣種

## 📊 評分邏輯

### 多頭評分 (EMA20 > EMA50 > EMA100 > EMA200)
```
✓ 完全對齊 (3個) → 100分 🟢 強多頭
✓ 2個對齊  → 75分  🟢 中多頭
✓ 1個對齊  → 50分  🟡 弱多頭
```

### 空頭評分 (EMA反向排列)
```
✗ 完全反向 (3個) → -100分 🔴 強空頭
✗ 2個反向  → -75分  🔴 中空頭
✗ 1個反向  → -50分  🔴 弱空頭
```

### 無方向
```
混亂排列 → 0分 ⚪ 無方向
```

## 🚀 快速開始

### 1. 克隆倉庫
```bash
git clone https://github.com/YOUR_USERNAME/ema-scanner.git
cd ema-scanner
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 設定環境變數

複製 `.env.example` 為 `.env`:
```bash
cp .env.example .env
```

編輯 `.env` 並填入:
```
BOT_TOKEN=your_telegram_bot_token
CHAT_ID=your_telegram_chat_id
```

### 4. 本地測試
```bash
node ema-scanner.js
```

## 🌐 部署到Zeabur

詳見 [ZEABUR_DEPLOY.md](./ZEABUR_DEPLOY.md)

### 快速步驟:
1. Push到GitHub
2. 連接Zeabur
3. 設定環境變數
4. 啟用Cron Jobs或GitHub Actions
5. Done! 🎉

## 📈 推播格式示例

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
━━━━━━━━━━━━━━━━━━━━

3. SOL/USDT
🟡 弱多頭 | 評分: 50分
現價: $140.2345
距EMA20: +0.95%
━━━━━━━━━━━━━━━━━━━━

...

📈 統計:
🟢 多頭: 6檔
🔴 空頭: 2檔
⚪ 無方向: 2檔
```

## ⚙️ 配置說明

### 時間框架對應
- **4h**: 每4小時掃描一次
- **12h**: 每12小時掃描一次 (UTC 00:00、12:00)
- **1d**: 每天掃描一次 (UTC 00:00)

### 掃描設定
```javascript
// ema-scanner.js 中可調整:

// 交易量篩選 (最小日成交額)
const minVolume = 10000000; // 1000萬 USDT

// 掃描數量限制
const symbols = symbols.slice(0, 100); // 掃描前100個符號

// 結果排名限制
results.slice(0, 10); // 排名前10個
```

## 🔧 技術棧

- **Node.js**: 16+
- **Binance API**: 公開行情數據
- **Telegram Bot API**: 消息推播
- **Zeabur / GitHub Actions**: 自動排程

## 📝 文件結構

```
ema-scanner/
├── ema-scanner.js              # 核心掃描邏輯
├── package.json                # 項目配置
├── .env.example                # 環境變數範本
├── ZEABUR_DEPLOY.md           # Zeabur部署指南
├── README.md                   # 本文檔
└── .github/workflows/          # GitHub Actions配置
    ├── scan-4h.yml
    ├── scan-12h.yml
    └── scan-1d.yml
```

## 🐛 常見問題

### Q: 沒有收到Telegram推播?
**A**: 檢查以下項目：
- BOT_TOKEN 是否正確
- CHAT_ID 是否正確
- Bot是否已加入你的私聊 (發送 `/start`)
- Zeabur/GitHub日誌中是否有錯誤

### Q: 為什麼掃描速度慢?
**A**: 
- Binance API有速率限制 (每秒1200個請求)
- 程式已添加延遲以避免觸發限制
- 如需加快，可減少掃描的符號數量

### Q: 可以添加其他指標嗎?
**A**: 當然！可以：
- 添加RSI、MACD、BBANDS等
- 在 `scoreEMATrend()` 函數中擴展評分邏輯
- 修改 `formatMessage()` 以顯示更多信息

### Q: 如何設定不同時區的掃描時間?
**A**: 修改GitHub Actions或Zeabur的Cron表達式：
```
# UTC 轉換為台灣時間 (UTC+8) 示例:
0 0 * * *      → 08:00 Taiwan  (UTC 00:00)
0 12 * * *     → 20:00 Taiwan  (UTC 12:00)
0 */4 * * *    → 每4小時
```

## 🎯 未來功能路線圖

- [ ] 添加 RSI / MACD / BBANDS 多指標
- [ ] 歷史掃描數據記錄
- [ ] Web Dashboard (實時查看結果)
- [ ] 自定義通知規則 (只推特定幣種)
- [ ] 績效分析 (評估策略準確度)
- [ ] 資料庫存儲 (MongoDB)
- [ ] RESTful API
- [ ] 支持其他交易所

## 🤝 貢獻

歡迎提交 Issues 和 Pull Requests！

## 📄 授權

MIT License - 詳見 LICENSE 文件

## 📧 聯絡

有任何問題或建議？提交 Issue 或聯繫開發者。

---

**免責聲明**: 此工具僅供參考，不構成投資建議。交易加密貨幣風險很大，請自行判斷。

Happy Trading! 🚀📈
