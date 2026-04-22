// api/claude.js — Vercel Serverless Proxy with RAG
const fs = require('fs');
const path = require('path');

// ── Load curated dataset ──────────────────────────────────────────────────────
let searchRestaurants, formatForContext;
try {
  const mod = require('../miami-restaurants.js');
  searchRestaurants = mod.searchRestaurants;
  formatForContext  = mod.formatForContext;
} catch(e) {
  console.error('Could not load miami-restaurants.js:', e.message);
  searchRestaurants = () => [];
  formatForContext  = () => '';
}

// ── Load live Google Places JSON file ────────────────────────────────────────
function loadLiveData() {
  try {
    const filePath = path.join(__dirname, '..', 'google-places-data.json');
    if (!fs.existsSync(filePath)) return [];
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return raw.map((r, i) => ({
      id: 1000 + i,
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
    }));
  } catch(e) {
    console.error('Could not load google-places-data.json:', e.message);
    return [];
  }
}

// ── Format live results for context injection ─────────────────────────────────
function formatLive(restaurants) {
  return restaurants.map(r =>
    `• ${r.name} [Google Places ✓] (${r.cuisine}, ${r.city}) — ${r.rating}★ (${r.reviews.toLocaleString()} Google reviews), ${r.price}. ${r.address ? 'Address: ' + r.address + '.' : ''} ${r.phone ? 'Phone: ' + r.phone + '.' : ''}`
  ).join('\n');
}

// ── Search live JSON data by keyword ─────────────────────────────────────────
function searchLive(query, limit = 5) {
  const q = query.toLowerCase();
  const live = loadLiveData();
  return live
    .filter(r => {
      const text = `${r.name} ${r.cuisine} ${r.city}`.toLowerCase();
      return q.split(' ').some(word => word.length > 3 && text.includes(word));
    })
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, limit);
}

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
      // Search curated dataset
      const curated = searchRestaurants(userQuery, 6);
      // Search live Google Places JSON
      const live = searchLive(userQuery, 4);

      const parts = [];
      if (curated.length > 0) {
        parts.push(`CURATED LOCAL DATA (${curated.length} matches):\n${formatForContext(curated)}`);
      }
      if (live.length > 0) {
        parts.push(`LIVE GOOGLE PLACES DATA (${live.length} matches):\n${formatLive(live)}`);
      }
      if (parts.length > 0) {
        ragContext = `\n\n---\nRESTAURANT DATA — use as PRIMARY source, cite ratings and review counts:\n${parts.join('\n\n')}\n---\n`;
      }
    }

    let finalBody = { ...body };
    if (ragContext && body.system) {
      finalBody.system = body.system + ragContext;
    }

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
