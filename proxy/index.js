import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// load environment variables from .env in proxy folder
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.NEWSAPI_KEY;

if (!API_KEY) {
  console.error('NEWSAPI_KEY environment variable is required');
  process.exit(1);
}

// simple proxy endpoint that forwards query string to NewsAPI
app.get('/api', async (req, res) => {
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

// For Vercel, export the app instead of calling listen directly if running as a serverless function
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
  });
}

export default app;