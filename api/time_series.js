const { json, parseSymbol, parseInterval, requestTimeSeries } = require('../lib/twelve');
module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { status: 'error', message: 'Method not allowed.' });
  let symbol, interval, outputsize;
  try {
    symbol = parseSymbol(req.query?.symbol);
    interval = parseInterval(req.query?.interval);
    outputsize = Math.min(500, Math.max(2, Number(req.query?.outputsize) || 300));
  } catch (error) { return json(res, 400, { status: 'error', message: error.message }); }
  try {
    const data = await requestTimeSeries({symbol, interval, outputsize});
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).json(data);
  } catch (error) {
    return json(res, error.statusCode || 502, {status:'error', message:error.message || 'Twelve Data isteği başarısız.', code:error.statusCode || 502});
  }
};