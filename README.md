# Sold By HD — Harjas Dulku Realtor Site

Static marketing site for Harjas Dulku, Calgary real estate advisor.

**Stack:** plain HTML, CSS, vanilla JS. No build step, no dependencies.

## Deploy to Vercel (collaborator / one-click)

Click to deploy this project to your **own** Vercel account. Vercel will fork the repo into your GitHub and wire up auto-deploys from `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmurttaza%2Fsoldbyharjas)

That's it — no build command, no framework preset needed. Vercel auto-detects it as a static site and serves everything from the repo root.

## Manual deploy (CLI)

```bash
npm i -g vercel
vercel           # preview deploy
vercel --prod    # production deploy
```

## Local preview

Just open `index.html` in a browser, or run any static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

## Project structure

```
.
├── index.html          # Home
├── about.html          # About Harjas
├── listings.html       # Active listings
├── why-me.html         # Value proposition
├── reviews.html        # Client reviews
├── contact.html        # Contact form
├── styles.css          # All site styles
├── script.js           # Nav + scroll behaviour
├── Images/             # Photos, logos
└── vercel.json         # Deploy config (headers, caching)
```

## Custom domain

In the Vercel dashboard: **Project → Settings → Domains** → add `soldbyhd.ca` (or whatever domain you're using), then update the DNS records Vercel gives you at your registrar. Vercel issues the SSL cert automatically.
