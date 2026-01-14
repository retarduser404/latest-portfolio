# 🚀 Deployment Guide

## Quick Deployment to Vercel (Recommended)

Vercel is the official Next.js platform and makes deployment super simple!

### Step 1: Push to GitHub

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "My premium developer portfolio"

# Create GitHub repo and push
# (Create repo on github.com first, then):
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" or "Log in"
3. Click "Import"
4. Select "Import from Git"
5. Connect your GitHub
6. Select your portfolio repository
7. Click "Import"
8. Vercel auto-detects Next.js settings
9. Click "Deploy"

**That's it! Your site will be live in < 2 minutes** ✅

Your URL will be something like: `your-portfolio.vercel.app`

---

## Add Custom Domain to Vercel

1. Go to your Vercel project settings
2. Click "Domains"
3. Enter your domain name
4. Follow the DNS setup instructions
5. Point your domain registrar to Vercel nameservers

**Cost**: Domains usually $10-15/year from:
- [Namecheap](https://namecheap.com) (cheapest)
- [GoDaddy](https://godaddy.com)
- [Google Domains](https://domains.google.com)

---

## Alternative Deployment Options

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site"
4. Select "Import an existing project"
5. Connect GitHub
6. Select repository
7. Auto-detected build settings
8. Click "Deploy"

**Custom domain**: Settings → Domain management

---

### GitHub Pages (Free, No Backend)

1. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
};
export default nextConfig;
```

2. Push to GitHub

3. Go to repo settings → Pages

4. Select "Deploy from branch"

5. Choose `main` branch and `/root` folder

6. Your site will be at `github.com/YOUR_USERNAME.github.io`

---

### AWS Amplify

1. Push to GitHub
2. Go to [aws.amazon.com/amplify](https://aws.amazon.com/amplify)
3. Click "Amplify Hosting"
4. Connect GitHub
5. Select repository and branch
6. Confirm build settings
7. Deploy

**Cost**: Free tier includes 5GB storage + bandwidth

---

### DigitalOcean App Platform

1. Push to GitHub
2. Go to [digitalocean.com](https://digitalocean.com)
3. Create account
4. Click "Create" → "Apps"
5. Connect GitHub
6. Select portfolio repo
7. Review build settings
8. Deploy

**Cost**: From $5/month

---

## Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All personal info updated (name, email, links)
- [ ] No dummy/placeholder content left
- [ ] All links working (test locally)
- [ ] Mobile responsive (test with DevTools)
- [ ] No console errors (F12 → Console)
- [ ] Build succeeds locally: `npm run build`
- [ ] No TypeScript errors: `npm run lint`

---

## Environment Variables (If Needed)

If you need secrets (API keys, emails, etc.):

1. Create `.env.local` file (not committed to git):
```
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_API_KEY=your-secret-key
```

2. In code, use:
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

3. For secret variables, set them in:
   - **Vercel**: Project → Settings → Environment Variables
   - **Netlify**: Site settings → Build & Deploy → Environment
   - **Other**: Platform-specific settings

---

## After Deployment

### 1. Set Up Analytics

#### Google Analytics
1. Create account at [google.com/analytics](https://google.com/analytics)
2. Get your tracking ID
3. Add to `src/app/layout.tsx`:

```typescript
import Script from 'next/script';

export default function RootLayout() {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR_ID');
            `,
          }}
        />
      </head>
      <body>{/* ... */}</body>
    </html>
  );
}
```

### 2. Verify with Search Engines

#### Google
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain)
3. Verify ownership (add DNS record or HTML file)
4. Submit sitemap

#### Bing
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify and submit

### 3. Set Up Contact Form Backend

Your form currently logs to console. To actually send emails:

#### Option A: Formspree (Free)
```typescript
// src/components/Contact.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  if (response.ok) {
    setSubmitted(true);
  }
};
```

#### Option B: Netlify Forms (Free on Netlify)
```typescript
// Just add netlify attribute to form:
<form netlify name="contact">
```

#### Option C: EmailJS
```bash
npm install @emailjs/browser
```

```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
  setSubmitted(true);
};
```

---

## Domain Setup Tips

### Best Domain Registrars
1. **Namecheap** - Cheapest, easy setup
2. **Google Domains** - Integrated with Google services
3. **Dreamhost** - Good support
4. **Bluehost** - WordPress-friendly

### Good Domain Names
❌ Avoid:
- Too long
- Hard to spell
- Outdated (2023, v2, etc.)

✅ Good:
- `yourname.dev`
- `yourname.io`
- `yourname.com`
- `yourportfolio.dev`

### DNS Configuration
After buying domain, point to your host:
- **Vercel**: Use Vercel nameservers (easiest)
- **Netlify**: Use Netlify nameservers
- **Other**: Update A/CNAME records

---

## Performance Optimization

After deployment, check performance:

### Vercel Analytics
- Built-in for Vercel deployments
- Shows Core Web Vitals
- Identify slow pages

### Lighthouse Report
1. Open your site in Chrome
2. Press F12
3. Go to "Lighthouse" tab
4. Click "Analyze page load"
5. Fix any issues (aim for 90+)

### Common Optimizations
- ✅ Already done:
  - Next.js optimization
  - Image optimization
  - Code splitting
  - CSS optimization
  
- 🎯 You can add:
  - Project screenshots
  - Lazy load images
  - Compress images

---

## Troubleshooting Deployment

### Build fails on Vercel
1. Check logs in Vercel dashboard
2. Fix TypeScript errors: `npm run build`
3. Ensure all dependencies installed
4. Check `next.config.ts` for errors

### Site shows old version
1. Hard refresh (Ctrl+Shift+R)
2. Clear cache in Vercel: Settings → Deployments → Redeploy
3. Wait 5-10 minutes for CDN refresh

### 404 errors
1. Check links in components
2. Ensure files exist
3. Check file paths are relative

### Slow load times
1. Compress images
2. Check Lighthouse report
3. Optimize fonts
4. Reduce animations

---

## SSL Certificate

Good news! SSL certificates are:
- ✅ **Free on Vercel** (auto-configured)
- ✅ **Free on Netlify** (auto-configured)
- ✅ **Free on GitHub Pages** (auto-configured)

Your site will automatically have HTTPS! 🔒

---

## Continuous Deployment

Once set up, your portfolio auto-deploys!

- Make changes locally
- Push to GitHub
- Your platform auto-detects
- Site updates automatically

No manual deployment needed after setup! 🎉

---

## Final Deployment Commands

```bash
# Test build locally
npm run build

# Start production server
npm run start

# Check for issues
npm run lint

# Clean build
rm -rf .next
npm run build

# Deploy (platform specific)
# Vercel: git push (auto-deploys)
# Netlify: git push (auto-deploys)
# Other: Follow platform instructions
```

---

## Success! You're Deployed 🎉

Once deployed:
1. ✅ Share your portfolio link
2. ✅ Add to LinkedIn
3. ✅ Email to recruiters
4. ✅ Put on GitHub profile
5. ✅ Share on Twitter/X

Your professional portfolio is now on the web!

---

## Still Have Questions?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Deployment Guide**: https://nextjs.org/docs/deployment

**Happy deploying!** 🚀
