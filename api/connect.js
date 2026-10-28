const { json, getApiKey, parseSymbol, parseInterval, requestTimeSeries } = require('../lib/twelve');
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, message: 'Method not allowed.' });
  if (!getApiKey()) return json(res, 503, { ok: false, message: 'Sunucuya TWELVEDATA_API_KEY eklenmemiş. Vercel ortam değişkenini ayarla.' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const symbol = parseSymbol(body.symbol || 'EUR/USD');
    const interval = parseInterval(body.interval || '5min');
    const data = await requestTimeSeries({symbol, interval, outputsize:3});
    return json(res, 200, {ok:true, connected:true, symbol, interval, sampleCount:Array.isArray(data.values)?data.values.length:0, message:'Twelve Data bağlantısı doğrulandı.'});
  } catch (error) {
    return json(res, error.statusCode || 400, {ok:false, connected:false, message:error.message || 'Bağlantı kurulamadı.'});
  }
};