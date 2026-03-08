// helper to call the proxy server instead of NewsAPI directly

const BASE = process.env.REACT_APP_PROXY_URL || '';

/**
 * fetchNews
 * options should be an object of query params (q, domains, page, pageSize, etc.)
 * returns parsed JSON from NewsAPI via the proxy
 */
export async function fetchNews(options = {}) {
  const query = new URLSearchParams(options).toString();
  const url = `${BASE}/api?${query}`;
  const res = await fetch(url);
  return res.json();
}
