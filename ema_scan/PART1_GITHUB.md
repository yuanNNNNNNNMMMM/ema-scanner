# 📌 PART 1: GitHub倉庫設定

## 步驟1: 在GitHub建立新倉庫

### 1.1 進入GitHub
1. 登入 https://github.com
2. 點右上角 **"+"** → **"New repository"**

### 1.2 填寫倉庫信息
```
Repository name: ema-scanner
Description: EMA trend scanner for crypto - Telegram bot
Visibility: Public (為了方便Zeabur連接)
```

### 1.3 建立倉庫
點 **"Create repository"**

---

## 步驟2: 準備本地檔案

### 2.1 在你的電腦上建立資料夾

**Windows (用CMD):**
```bash
mkdir ema-scanner
cd ema-scanner
```

**Mac/Linux:**
```bash
mkdir ema-scanner
cd ema-scanner
```

### 2.2 複製所有檔案到這個資料夾

下載本倉庫的所有檔案，並複製到 `ema-scanner` 資料夾：

需要的檔案：
```
ema-scanner/
├── ema-scanner.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── 00_START_HERE.md
├── PART1_GITHUB.md (這個檔案)
├── PART2_ZEABUR.md
├── PART3_CRON.md
├── zeabur.json
└── .github/
    └── workflows/
        ├── scan-4h.yml
        ├── scan-12h.yml
        └── scan-1d.yml
```

---

## 步驟3: 初始化Git並推送

### 3.1 在資料夾中打開終端

**Windows:** 
- 在資料夾空白處右鍵 → "在此處打開PowerShell"

**Mac:**
- 在Finder中進入資料夾，Command+Space 搜索 Terminal

**Linux:**
- 在資料夾中打開終端

### 3.2 初始化Git

```bash
git init
```

### 3.3 配置Git用戶（第一次設定）

```bash
git config user.email "your.email@example.com"
git config user.name "Your Name"
```

### 3.4 添加所有檔案

```bash
git add .
```

### 3.5 第一次提交

```bash
git commit -m "Initial commit: EMA Scanner Bot"
```

### 3.6 重命名分支為main（如果需要）

```bash
git branch -M main
```

### 3.7 連接到遠端倉庫

**用你的GitHub倉庫地址替換 YOUR_USERNAME：**

```bash
git remote add origin https://github.com/YOUR_USERNAME/ema-scanner.git
```

例如，如果你的GitHub用戶名是 `john123`：
```bash
git remote add origin https://github.com/john123/ema-scanner.git
```

### 3.8 推送到GitHub

```bash
git push -u origin main
```

系統會要求你輸入GitHub認證（可能是token或密碼）。

---

## 步驟4: 驗證上傳成功

1. 去你的GitHub倉庫頁面
2. 應該能看到所有檔案已上傳
3. 確認 `ema-scanner.js` 和 `package.json` 在那裡

---

## ✅ 完成檢查

- [ ] GitHub倉庫已建立
- [ ] 倉庫名稱是 `ema-scanner`
- [ ] 所有檔案已上傳
- [ ] 可以在GitHub看到檔案列表

---

## 🤔 遇到問題？

### 問題1: "fatal: not a git repository"
**解決:** 確保你在 `ema-scanner` 資料夾中執行命令

### 問題2: "Permission denied" 或認證失敗
**解決:** 
- 用GitHub Token而不是密碼
- 或使用SSH Key (可選，進階)

### 問題3: "remote origin already exists"
**解決:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/ema-scanner.git
```

---

## 🎯 下一步

✅ **Part 1 完成！**

現在進行 → **PART2_ZEABUR.md**

在那裡，你將學習如何部署到Zeabur。

---

## 📝 快速參考

| 命令 | 用途 |
|------|------|
| `git init` | 初始化Git倉庫 |
| `git add .` | 添加所有檔案 |
| `git commit -m "message"` | 提交更改 |
| `git remote add origin [URL]` | 連接遠端倉庫 |
| `git push origin main` | 推送到GitHub |
| `git status` | 查看目前狀態 |

---

**完成了？去看PART2_ZEABUR.md！** 🚀
