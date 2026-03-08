import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.NEWSAPI_KEY;

if (!API_KEY) {
  console.error('NEWSAPI_KEY environment variable is required');
}

// simple proxy endpoint that forwards query string to NewsAPI
app.get('/api', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ status: 'error', message: 'NEWSAPI_KEY is not configured on the server.' });
  }

  try {
    const query = new URLSearchParams({ ...req.query, apiKey: API_KEY });
    const response = await fetch(`https://newsapi.org/v2/everything?${query}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ status: 'error', message: 'Proxy failure' });
  }
});

// Since Vercel mounts this at /api/, it's safer to also catch / just in case.
app.get('*', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ status: 'error', message: 'NEWSAPI_KEY is not configured on the server.' });
  }

  try {
    const query = new URLSearchParams({ ...req.query, apiKey: API_KEY });
    const response = await fetch(`https://newsapi.org/v2/everything?${query}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error', err);
    res.status(500).json({ status: 'error', message: 'Proxy failure' });
  }
});

// For Vercel, export the app instead of calling listen directly
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
  });
}

export default app;
