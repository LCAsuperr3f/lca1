const ALLOWED_INTERVALS = new Set(['1min','5min','15min','30min','45min','1h','2h','4h','8h','1day','1week','1month']);
const ALLOWED_CURRENCIES = new Set(['USD','EUR','GBP','JPY','CHF','AUD','CAD','NZD','TRY','SGD','HKD','NOK','SEK','MXN','ZAR','CNH','CNY','DKK','PLN','HUF','CZK','ILS','AED','SAR','THB','INR']);
function parseSymbol(value) {
  const symbol = String(value || '').trim().toUpperCase();
  if (symbol === 'XAU/USD') return symbol;
  const match = symbol.match(/^([A-Z]{3})\/([A-Z]{3})$/);
  if (!match || !ALLOWED_CURRENCIES.has(match[1]) || !ALLOWED_CURRENCIES.has(match[2]) || match[1] === match[2]) {
    throw new Error('Yalnızca desteklenen Forex döviz pariteleri ve XAU/USD kullanılabilir.');
  }
  return symbol;
}
function parseInterval(value) {
  const interval = String(value || '5min').trim();
  if (!ALLOWED_INTERVALS.has(interval)) throw new Error('Desteklenmeyen zaman dilimi.');
  return interval;
}
function json(res, status, data) {
  res.status(status);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}
function getApiKey() { return String(process.env.TWELVEDATA_API_KEY || '').trim(); }
async function requestTimeSeries({ symbol, interval, outputsize = 300 }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    const err = new Error('Sunucuya TWELVEDATA_API_KEY eklenmemiş. Vercel > Settings > Environment Variables bölümünü kontrol et.');
    err.statusCode = 503; throw err;
  }
  const url = new URL('https://api.twelvedata.com/time_series');
  url.searchParams.set('symbol', parseSymbol(symbol));
  url.searchParams.set('interval', parseInterval(interval));
  url.searchParams.set('outputsize', String(Math.min(500, Math.max(2, Number(outputsize) || 300))));
  url.searchParams.set('timezone', 'UTC');
  const response = await fetch(url.toString(), {method:'GET',headers:{'Authorization':'apikey '+apiKey,'Accept':'application/json'},cache:'no-store'});
  let payload;
  try { payload = await response.json(); } catch { throw new Error('Twelve Data okunabilir JSON yanıtı vermedi.'); }
  if (!response.ok || payload?.status === 'error' || payload?.code || !Array.isArray(payload?.values)) {
    const detail = payload?.message || 'Twelve Data isteği başarısız (HTTP '+response.status+')';
    const err = new Error(detail+(payload?.code?' (kod '+payload.code+')':''));
    err.statusCode = response.status === 429 ? 429 : (response.status === 401 || response.status === 403 ? response.status : 502);
    throw err;
  }
  return payload;
}
module.exports = { json, getApiKey, parseSymbol, parseInterval, requestTimeSeries };