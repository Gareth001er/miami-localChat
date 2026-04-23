# Miami Local 🌴

A web app I built that uses AI to help people explore Miami. You can ask it anything about the city — best beaches, where to eat, nightlife, neighborhoods — and it answers like someone who actually lives there. It also has a restaurant scanner where you take a photo of any restaurant and it pulls the real Google rating and review summary.

The app is live and currently free to use.

---

## What it does

**AI City Guide** — type any question about Miami and get a real, opinionated answer backed by a dataset of 400+ South Florida restaurants and attractions. Not generic travel blog stuff — actual local knowledge with specific names, ratings, and honest warnings.

**Restaurant Scanner** — take a photo of any restaurant in Miami-Dade or Broward County and the app identifies it, finds real customer reviews from across the web, and gives you a star rating and honest verdict. Takes about 30 seconds.

---

## How it's built

- Frontend is a single HTML file — no frameworks, kept it simple
- Backend is a Vercel serverless function that proxies requests to the Anthropic Claude API
- Three restaurant datasets stored as JSON/JS files that get searched on every query before the AI responds (this is the RAG part)
- API key lives on the server as an environment variable — never exposed in the browser

---

## Project structure

```
miami-localChat/
├── api/
│   └── claude.js              ← serverless proxy + RAG search
├── index.html                 ← the whole frontend
├── miami-restaurants.js       ← curated dataset (169 restaurants)
├── google-places-data.json    ← Google Places export (156 restaurants)
├── google-places-asian.json   ← Asian cuisine dataset (39 restaurants)
├── google-places-attractions.json  ← Miami parks, malls, attractions
├── vercel.json                ← routing config
└── package.json
```

---

## Datasets

The chatbot pulls from three separate datasets that all load and get searched at the same time:

**Curated dataset** — 169 hand-researched South Florida restaurants. Each one has the name, cuisine, neighborhood, rating, price range, what it's known for, common complaints, and specific dishes worth ordering. Structured like Yelp data.

**Google Places — General** — 156 restaurants exported from Google Places. Has live ratings, review counts, addresses, and phone numbers. Covers Miami, Hollywood, Fort Lauderdale, Plantation, Davie, and surrounding cities.

**Google Places — Asian** — 39 Asian restaurants across Miami specifically. Added this one because the original dataset was light on Japanese, Korean, Vietnamese, and Thai options.

**Attractions** — 58 Miami places including parks, malls, museums, and entertainment venues for non-food questions.

---

## How the fine-tuning works

This is the part that makes it more than just a chatbot wrapper. Three things happen before the AI ever generates a response:

**System prompt engineering** — every API call includes a detailed instruction set that defines how the AI should behave. It's told to act like a lifelong Miami resident, what neighborhoods and topics it knows about, to give honest opinions and warn about tourist traps, and to cite specific places by name rather than giving vague answers. This lives in the project files, not in the cloud.

**Retrieval-Augmented Generation (RAG)** — when a user sends a message, the server searches all four datasets simultaneously before calling the AI. It scores every record by how well it matches the query — cuisine type, neighborhood, name, keywords — and injects the top results directly into the AI's context. So when someone asks about sushi in Brickell, Claude isn't guessing. It's reading from actual records that say "KamiKoi Sushi Fusion, 4.9 stars, 1,596 Google reviews" before it writes a single word.

**Structured output prompting** — for the restaurant scanner, the AI is instructed to return a specific JSON format every time. Name, rating, summary, highlights, complaints, verdict. This makes the output predictable and parseable so the app can display it reliably without errors.

The result is that the AI knows specific things about Miami that a general Claude instance would not know. It can tell you that Versailles Restaurant has over 8,000 reviews and has been on Calle Ocho since 1971, or that a specific place has a pattern of slow service on weekends. That specificity comes entirely from the local dataset files running on the server — not from anything Anthropic trained into the model.

---



The app is already deployed at the Vercel link in the About section. If you want to run your own version:

1. Fork or clone the repo
2. Go to vercel.com and import the repository
3. Add `ANTHROPIC_API_KEY` as an environment variable (Settings → Environment Variables)
4. Deploy

That's it. Vercel handles everything else automatically and redeploys whenever you push a change to GitHub.

---

## Notes

- Built entirely from an iPad — no laptop used at any point
- The AI key is stored in Vercel's environment variables and never touches the frontend
- Adding new restaurant data is as simple as uploading a new JSON file and adding the filename to the LIVE_FILES list in api/claude.js
  
