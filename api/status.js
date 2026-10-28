const { json, getApiKey } = require('../lib/twelve');
module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { connected: false, message: 'Method not allowed.' });
  // Never return the secret itself.
  return json(res, 200, { connected: Boolean(getApiKey()) });
};