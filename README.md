# Atlas — ICT Forex Trading Assistant

A mobile-first, installable iOS-style PWA for session monitoring, liquidity sweep workflows, 15M execution planning, and Gemini-powered chart reading.

## Deploy on Vercel

1. Import `blessedbrian422/forex-trading-assistant` at [vercel.com/new](https://vercel.com/new).
2. Add the environment variable `GEMINI_API_KEY` in Project Settings → Environment Variables.
3. Optionally set `GEMINI_MODEL` (defaults to `gemini-3.1-pro`).
4. Deploy. The `/api/analyze` serverless function keeps the key off the client.

The app is educational and does not provide financial advice. Validate all analysis independently and use appropriate risk controls.
