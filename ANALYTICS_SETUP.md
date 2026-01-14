# Google Analytics Setup

Your portfolio now includes Google Analytics integration. Follow these steps to enable it:

## 1. Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **Create Account**
4. Fill in your account details:
   - **Account name:** Kartik Pathak Portfolio
   - **Website name:** kartikpathak.dev
   - **Website URL:** https://kartikpathak.dev
5. Click **Create** and accept the terms

## 2. Get Your Measurement ID

1. In Google Analytics, go to **Data Streams**
2. Create a new Web stream for your domain
3. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

## 3. Add to Your Project

In `src/app/layout.tsx`, replace `G-XXXXXXXXXX` with your actual Measurement ID:

```tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-YOUR-ACTUAL-ID');
    `,
  }}
/>
```

## 4. Test Analytics

1. Run `npm run dev`
2. Visit http://localhost:3000
3. In Google Analytics, go to **Real Time** > **Overview**
4. You should see your session appear within seconds

---

## What's Tracked

Google Analytics will automatically track:
- Page views
- Session duration
- User location
- Device type
- Browser type
- Traffic sources

---

## SEO Improvements Added ✅

1. **robots.txt** - Tells search engines how to crawl your site
2. **sitemap.xml** - Lists all important pages for faster indexing
3. **JSON-LD Schema** - Rich snippets for search results
4. **Meta tags** - Proper title, description, OG tags
5. **Canonical URL** - Prevents duplicate content issues

---

## CSP Security Improvements ✅

1. **Removed 'unsafe-eval'** - Reduces XSS attack surface
2. **Added Analytics domains** - Google Analytics now whitelisted
3. **Preload directive** - Added to HSTS header
4. **Script source whitelist** - Specific allowlist instead of blanket access

---

## Build & Deploy

```bash
# Clean build
npm run build

# Test locally
npm run dev

# Deploy to Vercel
vercel deploy
```

After deployment, update your Google Analytics with the production domain.
