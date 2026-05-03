const axios = require('axios');
const { TelegramClient } = require('telegram');
const { NewMessage } = require('telegram/events');
const TelegramBot = require('node-telegram-bot-api');

// 環境變數
const BOT_TOKEN = process.env.BOT_TOKEN || '8635032978:AAFUOJTIwraDnZ02zeANjY8q-HTsEnfbzs';
const CHAT_ID = process.env.CHAT_ID || '7615600708';
const BINANCE_BASE = 'https://api.binance.com/api/v3';

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

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
  // 多頭評分 (EMA20 > EMA50 > EMA100 > EMA200)
  const bullishCount = [
    ema20 > ema50,
    ema50 > ema100,
    ema100 > ema200
  ].filter(Boolean).length;
  
  // 空頭評分 (反向排列)
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
  
  // 計算距離指標
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
async function getKlinesAndCalculateEMA(symbol, interval, limit = 200) {
  try {
    const response = await axios.get(`${BINANCE_BASE}/klines`, {
      params: {
        symbol: symbol,
        interval: interval,
        limit: limit
      }
    });
    
    const closes = response.data.map(kline => parseFloat(kline[4])); // 收盤價
    const currentPrice = closes[closes.length - 1];
    
    const ema20 = calculateEMA(closes, 20);
    const ema50 = calculateEMA(closes, 50);
    const ema100 = calculateEMA(closes, 100);
    const ema200 = calculateEMA(closes, 200);
    
    const analysis = scoreEMATrend(ema20, ema50, ema100, ema200, currentPrice);
    
    return {
      symbol,
      currentPrice,
      ema20: ema20?.toFixed(8),
      ema50: ema50?.toFixed(8),
      ema100: ema100?.toFixed(8),
      ema200: ema200?.toFixed(8),
      ...analysis
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error.message);
    return null;
  }
}

/**
 * 獲取所有USDT交易對
 */
async function getAllUSDTPairs() {
  try {
    const response = await axios.get(`${BINANCE_BASE}/exchangeInfo`);
    const symbols = response.data.symbols
      .filter(s => 
        s.quoteAsset === 'USDT' &&
        s.status === 'TRADING' &&
        s.contractType === 'PERPETUAL' // 合約市場
      )
      .map(s => s.symbol);
    
    console.log(`找到 ${symbols.length} 個USDT合約交易對`);
    return symbols;
  } catch (error) {
    console.error('Error fetching exchange info:', error.message);
    return [];
  }
}

/**
 * 獲取交易量篩選
 */
async function getSymbolsByVolume(symbols, minVolume = 10000000) {
  const filteredSymbols = [];
  
  for (const symbol of symbols) {
    try {
      const response = await axios.get(`${BINANCE_BASE}/ticker/24hr`, {
        params: { symbol }
      });
      
      const volume = parseFloat(response.data.quoteAssetVolume);
      if (volume > minVolume) {
        filteredSymbols.push(symbol);
      }
    } catch (error) {
      // 跳過
    }
  }
  
  return filteredSymbols;
}

/**
 * 掃描並排名
 */
async function scanAndRank(interval, limit = 10) {
  console.log(`\n開始 ${interval} 掃描...`);
  
  let symbols = await getAllUSDTPairs();
  console.log(`篩選後符合交易量的: ${symbols.length} 個`);
  
  // 限制掃描數量以加快速度
  symbols = symbols.slice(0, 100);
  
  const results = [];
  let completed = 0;
  
  for (const symbol of symbols) {
    const analysis = await getKlinesAndCalculateEMA(symbol, interval);
    if (analysis && analysis.ema20 && analysis.ema50 && analysis.ema100 && analysis.ema200) {
      results.push(analysis);
    }
    completed++;
    if (completed % 10 === 0) {
      console.log(`已掃描: ${completed}/${symbols.length}`);
    }
    // 避免API限流
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  // 排序: 多頭優先 (降序), 然後空頭 (升序)
  results.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score; // 多頭在上
    }
    return parseFloat(a.distanceFromEMA20) - parseFloat(b.distanceFromEMA20);
  });
  
  return results.slice(0, limit);
}

/**
 * 格式化推播消息
 */
function formatMessage(timeframe, results) {
  let message = `📊 <b>${timeframe}掃描結果</b>\n`;
  message += `時間: ${new Date().toLocaleString('zh-TW')}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  let bullCount = 0, bearCount = 0, neutralCount = 0;
  
  results.forEach((r, idx) => {
    if (r.score > 0) bullCount++;
    else if (r.score < 0) bearCount++;
    else neutralCount++;
    
    message += `<b>${idx + 1}. ${r.symbol}</b>\n`;
    message += `${r.trend} | 評分: ${r.score}分\n`;
    message += `現價: $${parseFloat(r.currentPrice).toFixed(4)}\n`;
    message += `距EMA20: ${r.distanceFromEMA20}%\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
  });
  
  message += `\n📈 統計:\n`;
  message += `🟢 多頭: ${bullCount}檔\n`;
  message += `🔴 空頭: ${bearCount}檔\n`;
  message += `⚪ 無方向: ${neutralCount}檔\n`;
  
  return message;
}

/**
 * 發送Telegram消息
 */
async function sendTelegramMessage(message) {
  try {
    await bot.sendMessage(CHAT_ID, message, { 
      parse_mode: 'HTML',
      disable_web_page_preview: true 
    });
    console.log('✅ 消息已發送');
  } catch (error) {
    console.error('❌ 發送失敗:', error.message);
  }
}

/**
 * 主掃描流程
 */
async function runFullScan() {
  const intervals = ['4h', '12h', '1d'];
  const binanceIntervals = {
    '4h': '4h',
    '12h': '12h',
    '1d': '1d'
  };
  
  for (const interval of intervals) {
    try {
      const results = await scanAndRank(binanceIntervals[interval], 10);
      const message = formatMessage(interval, results);
      await sendTelegramMessage(message);
      
      // 間隔發送，避免洪泛
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`掃描 ${interval} 時出錯:`, error.message);
    }
  }
}

// 導出用於排程
module.exports = {
  runFullScan,
  scanAndRank,
  getKlinesAndCalculateEMA
};

// 如果直接運行此文件
if (require.main === module) {
  runFullScan()
    .then(() => {
      console.log('✅ 掃描完成');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ 掃描失敗:', error);
      process.exit(1);
    });
}
