// api/claude.js — Vercel Serverless Proxy with RAG
// Injects Miami restaurant dataset into the prompt before calling Anthropic

const { searchRestaurants, formatForContext } = require('../miami-restaurants.js');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: { message: 'API key not configured on server.' } });

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    // ── RAG: Extract latest user message and search the dataset ───────────────
    const messages = body.messages || [];
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    const userQuery = typeof lastUserMsg?.content === 'string'
      ? lastUserMsg.content
      : (lastUserMsg?.content?.find?.(c => c.type === 'text')?.text || '');

    // Only inject RAG for chat calls (not the vision/scanner calls which have image content)
    const isVisionCall = messages.some(m =>
      Array.isArray(m.content) && m.content.some(c => c.type === 'image')
    );

    let ragContext = '';
    if (userQuery && !isVisionCall) {
      const matches = searchRestaurants(userQuery, 8);
      if (matches.length > 0) {
        ragContext = `\n\n---\nRELEVANT DATA FROM MIAMI RESTAURANT DATASET (${matches.length} matches found — use this as your PRIMARY source for these restaurants, citing ratings and review counts):\n${formatForContext(matches)}\n---\n`;
      }
    }

    // Inject RAG context into system prompt
    let finalBody = { ...body };
    if (ragContext && body.system) {
      finalBody.system = body.system + ragContext;
    }

    // Forward to Anthropic
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(finalBody),
    });

    const data = await anthropicRes.json();
    return res.status(anthropicRes.status).json(data);

  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: { message: 'Proxy failed: ' + err.message } });
  }
}
