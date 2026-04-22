// api/claude.js — Vercel Serverless Proxy with RAG
const fs   = require('fs');
const path = require('path');

// ── Load curated dataset ──────────────────────────────────────────────────────
let searchRestaurants, formatForContext;
try {
  const mod     = require('../miami-restaurants.js');
  searchRestaurants = mod.searchRestaurants;
  formatForContext  = mod.formatForContext;
} catch(e) {
  console.error('Dataset load error:', e.message);
  searchRestaurants = () => [];
  formatForContext  = () => '';
}

// ── Load all live Google Places JSON files ────────────────────────────────────
// Add new dataset files to this list anytime — no other code changes needed
const LIVE_FILES = [
  'google-places-data.json',
  'google-places-asian.json',
];

function loadLiveData() {
  let all = [];
  for (const fname of LIVE_FILES) {
    try {
      const filePath = path.join(__dirname, '..', fname);
      if (!fs.existsSync(filePath)) continue;
      const entries = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      all = all.concat(entries.map((r, i) => ({
        id: 2000 + all.length + i,
        name: r.title || '',
        cuisine: (r.categoryName || 'Restaurant').replace(/ restaurant$/i, ''),
        neighborhood: r.city || 'Miami',
        city: r.city || 'Miami',
        rating: r.totalScore || 0,
        reviews: r.reviewsCount || 0,
        price: '$$',
        address: r.street || '',
        phone: r.phone || '',
        website: r.website || '',
        source: 'google_places_live',
        highlights: `${r.categoryName || 'Restaurant'} with ${r.totalScore}★ and ${(r.reviewsCount || 0).toLocaleString()} Google reviews`,
        warnings: '',
        mustOrder: 'see Google reviews for recommendations',
      })));
    } catch(e) {
      console.error(`Could not load ${fname}:`, e.message);
    }
  }
  return all;
}

function searchLive(query, limit = 5) {
  const q = query.toLowerCase();
  return loadLiveData()
    .filter(r => q.split(' ').some(w =>
      w.length > 3 && `${r.name} ${r.cuisine} ${r.city}`.toLowerCase().includes(w)
    ))
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, limit);
}

function formatLive(list) {
  return list.map(r =>
    `• ${r.name} [Google ✓] (${r.cuisine}, ${r.city}) — ${r.rating}★ (${r.reviews.toLocaleString()} reviews).${r.address ? ' ' + r.address : ''}`
  ).join('\n');
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: { message: 'API key not configured.' } });

  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const messages = body.messages || [];
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    const userQuery = typeof lastUserMsg?.content === 'string'
      ? lastUserMsg.content
      : (lastUserMsg?.content?.find?.(c => c.type === 'text')?.text || '');

    const isVisionCall = messages.some(m =>
      Array.isArray(m.content) && m.content.some(c => c.type === 'image')
    );

    let ragContext = '';
    if (userQuery && !isVisionCall) {
      const curated = searchRestaurants(userQuery, 6);
      const live    = searchLive(userQuery, 5);
      const parts   = [];
      if (curated.length) parts.push(`CURATED DATA:\n${formatForContext(curated)}`);
      if (live.length)    parts.push(`LIVE GOOGLE DATA:\n${formatLive(live)}`);
      if (parts.length) {
        ragContext = `\n\n---\nRESTAURANT DATA (use as PRIMARY source, cite ratings):\n${parts.join('\n\n')}\n---\n`;
      }
    }

    let finalBody = { ...body };
    if (ragContext && body.system) finalBody.system = body.system + ragContext;

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
