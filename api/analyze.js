import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'Vision analysis is not configured. Add GEMINI_API_KEY in Vercel project settings.' });
  try {
    const { image, mimeType = 'image/jpeg', timeframe = '1H' } = req.body || {};
    if (!image || !/^image\/(png|jpeg|webp|heic)$/.test(mimeType)) return res.status(400).json({ error: 'A supported chart image is required.' });
    const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-3.1-pro' });
    const prompt = `You are a disciplined ICT market-structure analyst. Analyze this ${timeframe} Forex chart image. Do not invent unreadable prices. Return ONLY valid JSON with this schema: {"bias":"BUY|SELL|WAIT","confidence":0,"instrument":"string","timeframe":"${timeframe}","entry":"string","stopLoss":"string","takeProfit":"string","sweep":"string","orderBlock":"string","fvg":"string","patterns":["string"],"riskNote":"string"}. Identify liquidity sweeps, displacement, order blocks, FVGs, and market structure. If the chart is insufficient, use WAIT and explain in riskNote. This is educational information, not financial advice.`;
    const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }, { inlineData: { mimeType, data: image.replace(/^data:[^;]+;base64,/, '') } }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.15, maxOutputTokens: 1600 } });
    const raw = result.response.text();
    return res.status(200).json(JSON.parse(raw.replace(/^```json|```$/g, '').trim()));
  } catch (error) { console.error(error); return res.status(500).json({ error: 'Analysis failed. Please try a clearer chart image.' }); }
}
