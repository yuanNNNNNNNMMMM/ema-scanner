const axios = require('axios');
const https = require('https');

// 環境變數
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const BINANCE_BASE = 'https://api.binance.com/api/v3';

// 檢查環境變數
if (!BOT_TOKEN || !CHAT_ID) {
  console.error('❌ 錯誤: 缺少 BOT_TOKEN 或 CHAT_ID 環境變數');
  process.exit(1);
}

/**
 * 計算EMA (指數移動平均線)
 */
function calculateEMA(prices, period) {
  if (prices.length < period) return null;
  
  const k = 2 / (period + 1);
  let ema = prices.slice(0, period).reduce((a, b) => a + b) / period;
  
  for (let i = period; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }
  
  return ema;
}

/**
 * 評分邏輯 - 根據EMA排列順序
 */
function scoreEMATrend(ema20, ema50, ema100, ema200, currentPrice) {
  const bullishCount = [
    ema20 > ema50,
    ema50 > ema100,
    ema100 > ema200
  ].filter(Boolean).length;
  
  const bearishCount = [
    ema20 < ema50,
    ema50 < ema100,
    ema100 < ema200
  ].filter(Boolean).length;
  
  let score = 0;
  let trend = 'NEUTRAL';
  
  if (bullishCount === 3) {
    score = 100;
    trend = '🟢 強多頭';
  } else if (bullishCount === 2) {
    score = 75;
    trend = '🟢 中多頭';
  } else if (bullishCount === 1) {
    score = 50;
    trend = '🟡 弱多頭';
  } else if (bearishCount === 3) {
    score = -100;
    trend = '🔴 強空頭';
  } else if (bearishCount === 2) {
    score = -75;
    trend = '🔴 中空頭';
  } else if (bearishCount === 1) {
    score = -50;
    trend = '🔴 弱空頭';
  } else {
    score = 0;
    trend = '⚪ 無方向';
  }
  
  const distanceFromEMA20 = ((currentPrice - ema20) / ema20 * 100).toFixed(2);
  const distanceEMA20to200 = ((ema20 - ema200) / ema200 * 100).toFixed(2);
  
  return {
    score,
    trend,
    distanceFromEMA20,
    distanceEMA20to200,
    bullishCount,
    bearishCount
  };
}

/**
 * 獲取K線數據並計算EMA
 */
async function getKlinesAndCalculateEMA(symbol, interval) {
  try {
    const response = await axios.get(`${BINANCE_BASE}/klines`, {
      params: {
        symbol: symbol,
        interval: interval,
        limit: 200
      },
      timeout: 5000
    });
    
    const closes = response.data.map(kline => parseFloat(kline[4]));
    const currentPrice = closes[closes.length - 1];
    
    const ema20 = calculateEMA(closes, 20);
    const ema50 = calculateEMA(closes, 50);
    const ema100 = calculateEMA(closes, 100);
    const ema200 = calculateEMA(closes, 200);
    
    if (!ema20 || !ema50 || !ema100 || !ema200) {
      return null;
    }
    
    const analysis = scoreEMATrend(ema20, ema50, ema100, ema200, currentPrice);
    
    return {
      symbol,
      currentPrice,
      ema20: ema20.toFixed(8),
      ema50: ema50.toFixed(8),
      ema100: ema100.toFixed(8),
      ema200: ema200.toFixed(8),
      ...analysis
    };
  } catch (error) {
    console.log(`⏭️ 跳過 ${symbol}: ${error.message}`);
    return null;
  }
}

/**
 * 獲取所有USDT交易對
 */
async function getAllUSDTPairs() {
  try {
    const response = await axios.get(`${BINANCE_BASE}/exchangeInfo`, {
      timeout: 10000
    });
    
    return response.data.symbols
      .filter(s => 
        s.quoteAsset === 'USDT' &&
        s.status === 'TRADING' &&
        s.contractType === 'PERPETUAL'
      )
      .map(s => s.symbol);
  } catch (error) {
    console.error('❌ 獲取交易對失敗:', error.message);
    return [];
  }
}

/**
 * 掃描並排名
 */
async function scanAndRank(binanceInterval, limit = 10) {
  console.log(`\n⏳ 開始掃描...`);
  
  let symbols = await getAllUSDTPairs();
  console.log(`📊 找到 ${symbols.length} 個USDT合約`);
  
  // 只掃描前80個符號以加快速度
  symbols = symbols.slice(0, 80);
  
  const results = [];
  let completed = 0;
  
  for (const symbol of symbols) {
    const analysis = await getKlinesAndCalculateEMA(symbol, binanceInterval);
    if (analysis) {
      results.push(analysis);
    }
    completed++;
    
    if (completed % 20 === 0) {
      console.log(`✓ 已掃描: ${completed}/${symbols.length}`);
    }
    
    // 延遲避免API限流
    await new Promise(resolve => setTimeout(resolve, 30));
  }
  
  console.log(`✓ 完成掃描: ${completed}/${symbols.length}`);
  
  // 排序
  results.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return parseFloat(a.distanceFromEMA20) - parseFloat(b.distanceFromEMA20);
  });
  
  return results.slice(0, limit);
}

/**
 * 格式化推播消息
 */
function formatMessage(timeframe, results) {
  let message = `📊 <b>${timeframe} 掃描結果</b>\n`;
  message += `時間: ${new Date().toLocaleString('zh-TW')}\n`;
  message += `━━━━━━━━━━━━━━━━\n\n`;
  
  let bullCount = 0, bearCount = 0, neutralCount = 0;
  
  results.forEach((r, idx) => {
    if (r.score > 0) bullCount++;
    else if (r.score < 0) bearCount++;
    else neutralCount++;
    
    message += `<b>${idx + 1}. ${r.symbol}</b>\n`;
    message += `${r.trend} | 評分: <b>${r.score}分</b>\n`;
    message += `現價: $${parseFloat(r.currentPrice).toFixed(4)}\n`;
    message += `距EMA20: <b>${r.distanceFromEMA20}%</b>\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
  });
  
  message += `\n📈 <b>統計</b>\n`;
  message += `🟢 多頭: ${bullCount} 檔\n`;
  message += `🔴 空頭: ${bearCount} 檔\n`;
  message += `⚪ 無方向: ${neutralCount} 檔\n`;
  
  return message;
}

/**
 * 發送Telegram消息
 */
async function sendTelegramMessage(message) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });

    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.ok) {
            console.log('✅ Telegram 消息已發送');
            resolve();
          } else {
            console.error('❌ Telegram 錯誤:', result.description);
            reject(new Error(result.description));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ 網絡錯誤:', e.message);
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

/**
 * 主掃描流程
 */
async function runFullScan() {
  const intervals = [
    { name: '4h', binance: '4h' },
    { name: '12h', binance: '12h' },
    { name: '1d', binance: '1d' }
  ];
  
  for (const interval of intervals) {
    try {
      console.log(`\n🔄 掃描 ${interval.name} ...`);
      const results = await scanAndRank(interval.binance, 10);
      
      if (results.length === 0) {
        console.log(`⚠️ ${interval.name} 無結果`);
        continue;
      }
      
      const message = formatMessage(interval.name, results);
      await sendTelegramMessage(message);
      
      // 避免過快發送
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ ${interval.name} 掃描出錯:`, error.message);
    }
  }
  
  console.log('\n✅ 全部掃描完成！');
}

/**
 * 執行
 */
if (require.main === module) {
  console.log('🚀 EMA Scanner 啟動');
  console.log(`📍 Chat ID: ${CHAT_ID}`);
  console.log(`⏰ 時間: ${new Date().toLocaleString('zh-TW')}\n`);
  
  runFullScan()
    .then(() => {
      console.log('\n✨ 任務完成，進程結束');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ 錯誤:', error);
      process.exit(1);
    });
}
