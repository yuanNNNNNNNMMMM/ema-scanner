# 📌 PART 2: Zeabur部署

## 步驟1: 建立Zeabur帳號

### 1.1 登入Zeabur
1. 去 https://zeabur.com
2. 點右上角 **"Sign In"**
3. 選 **"Sign in with GitHub"** (最簡單)
4. 授權Zeabur存取你的GitHub

---

## 步驟2: 建立新Project

### 2.1 在Zeabur Dashboard
1. 點 **"New Project"**
2. 選 **"Import from GitHub"**

### 2.2 選擇倉庫
1. 在下拉菜單中找 **"ema-scanner"**
2. 點它

### 2.3 開始部署
1. 點 **"Deploy"** 按鈕
2. Zeabur開始自動building

---

## 步驟3: 等待部署完成

### 3.1 觀看部署進度
- 頁面會顯示 **"部署中..."**
- 左邊會有一個轉圈
- **通常需要 2-5分鐘**

### 3.2 查看部署日誌 (可選)
1. 點 **"部署紀錄"** 標籤
2. 看Docker building過程
3. 尋找 ✅ "Build successful" 訊息

### 3.3 部署完成
當看到 ✅ 綠色勾勾，表示成功！

---

## 步驟4: 設定環境變數

### 4.1 進入Service設定
1. 點 **ema-scanner** Service
2. 點 **"設定"** (Settings) 標籤

### 4.2 添加環境變數

點 **"新增環境變數"** 按鈕，添加以下三個：

#### 變數1: BOT_TOKEN
```
名稱: BOT_TOKEN
值: 8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs
```
點 **"新增"** 確認

#### 變數2: CHAT_ID
```
名稱: CHAT_ID
值: 7615600708
```
點 **"新增"** 確認

#### 變數3: NODE_ENV
```
名稱: NODE_ENV
值: production
```
點 **"新增"** 確認

### 4.3 保存設定
所有變數添加後，頁面會自動保存並重新部署。

---

## 步驟5: 驗證部署成功

### 5.1 檢查服務狀態
回到 **"部署狀態"** 標籤，確保顯示 ✅ "運作中"

### 5.2 檢查Logs (如果出現問題)
1. 點 **"日誌"** 標籤
2. 尋找錯誤訊息
3. 如果看到 "Caddy" 錯誤，查看 `ZEABUR_FIX.md`

---

## 📋 完成檢查

- [ ] Zeabur帳號已建立
- [ ] Project已建立
- [ ] GitHub倉庫已連接
- [ ] 部署完成 (✅ 綠色勾勾)
- [ ] 環境變數已設定 (3個)
- [ ] 服務顯示 "運作中"

---

## 🐛 除錯

### 問題1: 部署失敗，看到Caddy錯誤
**解決:** 
- 查看 `ZEABUR_FIX.md`
- 用最新的 `ema-scanner.js` 版本

### 問題2: "Cannot find module 'axios'"
**解決:**
- 點 "重新Build"
- 等待npm自動安裝依賴

### 問題3: 環境變數沒有生效
**解決:**
- 確保已點 "新增" 按鈕
- 等待部署完成
- 重新檢查變數值（沒有多餘空格）

---

## 🎯 下一步

✅ **Part 2 完成！**

現在進行 → **PART3_CRON.md**

在那裡，你將設定自動推播的時間表。

---

## 📊 Zeabur資源使用

你的應用會使用：
- **CPU**: ~100-500m (任務執行時)
- **Memory**: ~100-200Mi
- **免費配額**: 足夠

**不用擔心超過免費額度！**

---

**準備好？去看PART3_CRON.md！** 🚀
