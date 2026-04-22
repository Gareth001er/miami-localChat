# 🌴 Miami Local — AI City Guide

 AI-powered Miami travel guide + restaurant scanner. 

---




## 📁 Project Structure

```
miami-local/
├── api/
│   └── claude.js        ← Serverless proxy (API key lives here)
├── public/
│   └── index.html       ← The full Miami Local web app
├── vercel.json          ← Vercel routing config
├── package.json
└── README.md
```

---

## 🔒 Security 

```
User browser  →  /api/claude (your Vercel server)  →  Anthropic API
                      ↑
               API key stored here
               as environment variable.
               Never sent to the browser.
```

- Visitors never see the  API key
- All requests go through the  serverless function
  

