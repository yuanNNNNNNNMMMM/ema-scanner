# 📦 檔案清單 (Files Manifest)

## 核心檔案

### 程式碼
- **ema-scanner.js** (8KB)
  - 完整的EMA掃描邏輯
  - Telegram推播功能
  - 支持4h/12h/1d三個時間框架

- **package.json** (434B)
  - Node.js依賴配置
  - 啟動命令設定
  - 只需要 `axios` 一個依賴

### 配置
- **.env.example** (286B)
  - 環境變數範本
  - 已預設你的Bot Token和Chat ID
  - 部署時複製為 `.env`

- **zeabur.json** (350B)
  - Zeabur部署配置
  - 根目錄設定

- **.gitignore** (279B)
  - Git忽略清單
  - 自動跳過 `node_modules` 等

---

## 部署指南

### 開始這裡 (必讀)
- **00_START_HERE.md**
  - 完整的部署總覽
  - 快速開始指南
  - 檔案說明

### 三部分部署指南
1. **PART1_GITHUB.md** (GitHub倉庫設定)
   - 建立GitHub倉庫
   - 上傳檔案
   - 推送到遠端

2. **PART2_ZEABUR.md** (Zeabur部署)
   - 建立Zeabur帳號
   - 連接GitHub
   - 部署應用
   - 設定環境變數

3. **PART3_CRON.md** (自動推播)
   - 啟用Cron Job
   - 設定時間表
   - 測試推播

### 參考文檔
- **README.md**
  - 專案完整文檔
  - 功能說明
  - 常見問題

- **ZEABUR_FIX.md**
  - 部署失敗時查看
  - 已簡化的版本解決問題

- **ZEABUR_DEPLOY.md** (可選)
  - 詳細的Zeabur配置
  - GitHub Actions設定

---

## 自動化配置

### GitHub Actions (可選)
位置: `.github/workflows/`

- **scan-4h.yml**
  - 每4小時執行掃描
  - UTC時間: 0 */4 * * *

- **scan-12h.yml**
  - 每12小時執行掃描
  - UTC時間: 0 0,12 * * *

- **scan-1d.yml**
  - 每天執行掃描
  - UTC時間: 0 0 * * *

**注:** 使用Zeabur Cron的話，可以不用GitHub Actions

---

## 檔案大小統計

```
00_START_HERE.md         ~4KB   ✅ 必讀
PART1_GITHUB.md          ~5KB   ✅ 必讀
PART2_ZEABUR.md          ~4KB   ✅ 必讀
PART3_CRON.md            ~5KB   ✅ 必讀
README.md                ~5KB   參考
ZEABUR_FIX.md            ~3KB   需要時看
ema-scanner.js           ~8KB   核心
package.json             <1KB   配置
.env.example             <1KB   配置
zeabur.json              <1KB   配置
.gitignore               <1KB   配置
━━━━━━━━━━━━━━━━━━━━━━━━━━━
總計                    ~40KB   全部檔案
```

---

## 推薦閱讀順序

### 新手:
1. **00_START_HERE.md** - 了解整體
2. **PART1_GITHUB.md** - 建立倉庫
3. **PART2_ZEABUR.md** - 部署
4. **PART3_CRON.md** - 設定推播
5. **README.md** - 深入了解

### 有經驗的開發者:
1. **00_START_HERE.md** - 快速概覽
2. **PART1_GITHUB.md** - 快速步驟
3. **PART2_ZEABUR.md** - 部署
4. **PART3_CRON.md** - 配置

### 遇到問題:
1. **ZEABUR_FIX.md** - 部署失敗
2. **README.md** - 常見問題
3. **PART3_CRON.md** - 推播除錯

---

## 檔案下載方式

### 選項A: 克隆整個倉庫 (推薦)
```bash
git clone https://github.com/YOUR_USERNAME/ema-scanner.git
cd ema-scanner
```

### 選項B: 下載ZIP
1. GitHub倉庫主頁
2. 點綠色 "Code" 按鈕
3. 選 "Download ZIP"
4. 解壓縮

### 選項C: 個別下載
- 每個檔案都可以單獨下載
- 點檔案 → 右鍵 → "Save As"

---

## 檔案內容速查

| 需求 | 查看檔案 |
|------|---------|
| 不知道從何開始 | 00_START_HERE.md |
| 建立GitHub倉庫 | PART1_GITHUB.md |
| 部署到Zeabur | PART2_ZEABUR.md |
| 設定自動推播 | PART3_CRON.md |
| 部署失敗了 | ZEABUR_FIX.md |
| 修改設定參數 | README.md |
| 常見問題 | README.md |
| 技術細節 | ema-scanner.js |

---

## 環境變數速查

```
BOT_TOKEN = 8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs
CHAT_ID = 7615600708
NODE_ENV = production
```

**已預設，無需修改！**

---

## 重要提醒

✅ **已包含的:**
- 完整的程式碼
- 詳細的部署指南
- 所有必要的配置檔案
- Telegram推播設定

❌ **不包含的:**
- Binance API Key (不需要)
- Private環境變數 (已預設)

---

## 更新日期

```
最後更新: 2024年5月3日
版本: 1.0.0
相容性: Node.js 16+
```

---

## 支援

有任何問題:
1. 查看相應的MD檔案
2. 檢查Zeabur Logs
3. 確認環境變數設定

---

**準備好了嗎？開始從 00_START_HERE.md 看起！** 🚀
