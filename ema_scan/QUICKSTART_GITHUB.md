# 🎯 GitHub到Zeabur - 5分鐘快速流程

## 📥 Step 1: 下載所有檔案 (2分鐘)

### 下載方式選一種:

#### 方式A: Git Clone (推薦)
如果已有你的GitHub倉庫:
```bash
git clone https://github.com/YOUR_USERNAME/ema-scanner.git
cd ema-scanner
```

#### 方式B: 下載ZIP
1. 本頁面上方點 **"Code"** 綠色按鈕
2. 選 **"Download ZIP"**
3. 解壓縮

#### 方式C: 逐個下載
下載以下檔案到同一個資料夾:
```
ema-scanner.js
package.json
.env.example
.gitignore
zeabur.json
README.md
00_START_HERE.md
PART1_GITHUB.md
PART2_ZEABUR.md
PART3_CRON.md
FILES_MANIFEST.md
.github/workflows/ (整個資料夾)
```

---

## 🚀 Step 2: 建立你的GitHub倉庫 (2分鐘)

### 2.1 在GitHub建立新倉庫
1. GitHub → **"New repository"**
2. 倉庫名: `ema-scanner`
3. 選 **"Public"**
4. 點 **"Create repository"**

### 2.2 上傳檔案到你的倉庫

**在你的電腦上執行:**
```bash
# 進入ema-scanner資料夾
cd ema-scanner

# 初始化Git (如果還沒有)
git init

# 添加所有檔案
git add .

# 提交
git commit -m "Initial commit"

# 重命名分支
git branch -M main

# 連接到你的倉庫 (替換YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ema-scanner.git

# 推送
git push -u origin main
```

✅ 完成！檔案已在GitHub上

---

## 🎯 Step 3: 部署到Zeabur (1分鐘)

### 3.1 打開Zeabur並建立Project
1. 去 https://zeabur.com
2. 用GitHub帳號登入
3. 點 **"New Project"**
4. 選 **"Import from GitHub"**
5. 選擇 `ema-scanner` 倉庫
6. 點 **"Deploy"**

### 3.2 等待部署完成
- 看到 ✅ 綠色勾勾 = 成功！
- 通常需要 2-5分鐘

---

## ⚙️ Step 4: 設定環境變數 (1分鐘)

進入Zeabur Dashboard:

1. 點 **ema-scanner** Service
2. 進入 **"設定"** 標籤
3. 點 **"新增環境變數"** 三次

#### 變數1:
```
BOT_TOKEN = 8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs
```

#### 變數2:
```
CHAT_ID = 7615600708
```

#### 變數3:
```
NODE_ENV = production
```

✅ 自動保存並重新部署

---

## 🔄 Step 5: 啟用自動推播 (1分鐘)

在Zeabur Service設定中:

1. 找 **"定時自動運載"** 
2. 點灰色開關 → 變紫色
3. 輸入時間表:

#### 選擇一個:
- **每4小時**: `0 */4 * * *`
- **每12小時**: `0 0,12 * * *`  
- **每天**: `0 0 * * *`

4. 點 **"儲存"**

✅ 完成！系統會自動在設定時間推播結果

---

## ✨ 現在的情況

```
✅ GitHub倉庫已建立
✅ 檔案已上傳
✅ Zeabur已部署
✅ 環境變數已設定
✅ 自動推播已啟用
```

---

## 🎉 享受結果！

你現在會在Telegram收到定時的EMA掃描結果：

```
📊 4h掃描結果

1. BTC/USDT
🟢 強多頭 | 評分: 100分

2. ETH/USDT  
🟢 中多頭 | 評分: 75分

📈 統計: 6多 2空 2中立
```

---

## 🆘 遇到問題？

### 部署失敗?
→ 查看 `ZEABUR_FIX.md`

### 沒有收到推播?
→ 查看 `PART3_CRON.md` 的除錯部分

### 想修改設定?
→ 編輯 `ema-scanner.js`

### 詳細說明?
→ 查看 `00_START_HERE.md`

---

## 📚 檔案總覽

| 必讀 | 檔案 | 用途 |
|------|------|------|
| ⭐⭐⭐ | 00_START_HERE.md | 開始這裡 |
| ⭐⭐⭐ | PART1_GITHUB.md | GitHub倉庫 |
| ⭐⭐⭐ | PART2_ZEABUR.md | Zeabur部署 |
| ⭐⭐⭐ | PART3_CRON.md | 自動推播 |
| ⭐⭐ | FILES_MANIFEST.md | 檔案清單 |
| ⭐⭐ | README.md | 完整文檔 |
| ⭐ | ZEABUR_FIX.md | 部署失敗時 |

---

## 🎯 時間表

```
4小時一次:   08:00, 12:00, 16:00, 20:00, 00:00, 04:00 (台灣)
12小時一次:  08:00, 20:00 (台灣)
每天一次:    08:00 (台灣)
```

---

## 💡 重點

✅ **已預設的:**
- Bot Token: `8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs`
- Chat ID: `7615600708`
- 無需修改任何東西！

❌ **不需要的:**
- Binance API Key
- 複雜的配置

---

## 🚀 就這樣！

你已經擁有一個**完全自動化的加密貨幣趨勢掃描系統**！

每天都會在你指定的時間自動掃描市場，推送結果到Telegram。

**祝你交易順利！** 📈

---

**如有任何問題，查看相應的MD檔案。** 📖
