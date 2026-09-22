# Security notice

Never commit a Gemini, Vercel, or other production secret to this repository or include it in a downloadable ZIP. Configure secrets in Vercel Project Settings → Environment Variables.

The Gemini key previously shared in chat should be revoked in Google AI Studio and replaced because it has been exposed. The replacement should be added only as `GEMINI_API_KEY` in Vercel.
