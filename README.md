# 🌴 Miami Local — AI City Guide

Your AI-powered Miami travel guide + restaurant scanner. The API key lives securely on Vercel's servers — it is **never** exposed to visitors.

---

## 🚀 Deploy to Vercel in 5 Minutes

### Step 1 — Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2 — Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate with your email or GitHub account.

### Step 3 — Deploy the project
Inside this folder, run:
```bash
vercel
```
Answer the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your personal account
- **Link to existing project?** → No
- **Project name?** → `miami-local` (or anything you like)
- **Directory?** → `.` (current directory)

### Step 4 — Add your API key as an Environment Variable
```bash
vercel env add ANTHROPIC_API_KEY
```
When prompted:
- **Value?** → Paste your Anthropic API key (`sk-ant-...`)
- **Environment?** → Select **Production**, **Preview**, and **Development**

### Step 5 — Redeploy to apply the env variable
```bash
vercel --prod
```

✅ That's it! Vercel gives you a live URL like `https://miami-local.vercel.app`

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

## 🔒 How the Security Works

```
User browser  →  /api/claude (your Vercel server)  →  Anthropic API
                      ↑
               API key stored here
               as environment variable.
               Never sent to the browser.
```

- Visitors never see your API key
- All requests go through your serverless function
- You can set spending limits at console.anthropic.com

---

## 🛠 Local Development

```bash
vercel dev
```

This starts a local server at `http://localhost:3000` with the env variable loaded. Make sure you've run `vercel env add ANTHROPIC_API_KEY` first.

---

## ✏️ Updating the App

Edit `public/index.html`, then redeploy:
```bash
vercel --prod
```
