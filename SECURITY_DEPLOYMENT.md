# 🔒 Security Hardening & Deployment Guide

## Executive Summary
Your portfolio has been hardened against:
- ✅ Secrets exposure (service account key removed from source)
- ✅ CSRF/XSS attacks (origin checks, HTML stripping, rate limiting)
- ✅ Dependency vulnerabilities (npm audit: 0 vulnerabilities)
- ✅ Unauthorized API access (rate limiting, input validation)
- ✅ Information disclosure (hardened CSP, removed unsafe-inline from scripts)
- ✅ Server-side code execution (Firebase Admin SDK server-only validation)

---

## 1. LOCAL DEVELOPMENT SETUP

### 1.1 Restore Service Account Key (Local Dev Only)
```bash
# You have: .env.local.backup (contains real service account)
# Copy your Firebase service account JSON into .env.local:
cp .env.local.backup .env.local
```

**DO NOT COMMIT `.env.local`** — it's in `.gitignore` and will be rejected.

### 1.2 Test Locally
```bash
npm run dev
# Visit http://localhost:3000/contact and submit a test message
```

**Expected result**: Message saves to Firestore + email via Formspree

---

## 2. PRODUCTION DEPLOYMENT (Vercel)

### 2.1 Set Vercel Environment Variables

**⚠️ CRITICAL**: Never paste `.env.local` as-is. Add variables **one by one** in Vercel Dashboard:

1. Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

2. Add these variables as **Production** secrets:

| Variable | Value | Type |
|----------|-------|------|
| `RESEND_API_KEY` | `re_c431FDL1_HBdpaJDQ8KXftzW7t82PK4dK` | Secret |
| `CONTACT_EMAIL` | `kartikpathak883@gmail.com` | Secret |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyAXHr_JmS2VivbFDLmj98Pf6K57NxM2jTQ` | Public (safe) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `portmail-892bf.firebaseapp.com` | Public (safe) |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `portmail-892bf` | Public (safe) |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `portmail-892bf.firebasestorage.app` | Public (safe) |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `450898398958` | Public (safe) |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:450898398958:web:85919e07820de79028adff` | Public (safe) |
| `FORMSPREE_ID` | `mqeeakbd` | Secret |
| `ALLOWED_ORIGINS` | `https://latest-portfolio.vercel.app` | Secret |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | **Full JSON** (paste entire service account file) | Secret |

⚠️ **For `FIREBASE_SERVICE_ACCOUNT_KEY`**: Paste the **entire contents** of your Firebase service account JSON file as a single variable (must be properly escaped).

### 2.2 Deploy
```bash
git push
# Vercel auto-deploys on push
```

---

## 3. SECURITY FEATURES IMPLEMENTED

### 3.1 Contact Form API (`/api/contact`)
- ✅ **Input Sanitization**: HTML tags stripped, whitespace collapsed
- ✅ **Email Validation**: RFC-compliant regex check
- ✅ **Rate Limiting**: Max 10 requests per IP per minute (429 Too Many Requests)
- ✅ **Origin/CSRF Check**: Only accepts submissions from allowed origins
- ✅ **Content Length Limits**: Name (2-100 chars), Message (10-5000 chars)
- ✅ **Dual Write**: Saves to Firestore AND sends via Formspree (failover)
- ✅ **Error Handling**: Generic errors to prevent information leakage

### 3.2 Firebase Admin SDK (`src/lib/firebaseAdmin.ts`)
- ✅ **Server-Only Validation**: Throws error if accidentally imported in browser
- ✅ **Environment Checks**: Validates service account structure before init
- ✅ **Singleton Pattern**: Firebase app initialized only once
- ✅ **Graceful Fallback**: If Firestore fails, Formspree email still sent

### 3.3 Content Security Policy (CSP)
**Hardened from previous version:**
```
default-src 'self'
script-src 'self' *.googletagmanager.com *.google-analytics.com
style-src 'self' 'unsafe-inline' fonts.googleapis.com
frame-ancestors 'none'  (prevents embedding in iframes)
form-action 'self'      (prevents external form submissions)
object-src 'none'       (blocks plugins)
```

### 3.4 Additional Security Headers
| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-sniffing |
| `X-Frame-Options` | `DENY` | Blocks clickjacking |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Forces HTTPS |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Blocks device access |

---

## 4. FIRESTORE SECURITY RULES

**⚠️ TODO**: Set these in **Firebase Console** → **Firestore Database** → **Rules**:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contact submissions: read by authenticated admin only
    match /contact_submissions/{document=**} {
      allow read: if request.auth != null && request.auth.token.admin == true;
      // Write: allowed from server via Admin SDK (bypasses rules)
      allow write: if false;
    }
    
    // Deny all other reads/writes by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Explanation**: 
- Only authenticated admin users can view submissions in Firebase Console
- Server-side (Admin SDK) writes bypass these rules for API route
- All other access is denied by default

---

## 5. GITHUB SECURITY BEST PRACTICES

### 5.1 Protected Branches (Recommended)
1. Go to **Settings** → **Branches** → **Add Rule**
2. Require pull request reviews before merge
3. Require status checks to pass (npm run build)

### 5.2 Secret Scanning
Enable in **Settings** → **Security & analysis** → **Secret scanning**

### 5.3 .gitignore Verification
```bash
git check-ignore .env.local
# Output: .env.local (✓ means it's ignored)
```

---

## 6. INCIDENT RESPONSE CHECKLIST

**If secret is accidentally leaked:**

1. **Immediate**: Revoke/rotate the compromised key in Firebase Console
2. **Generate new service account**: Firebase Console → Service Accounts → Create Key
3. **Update Vercel**: Add new key to Environment Variables
4. **Re-deploy**: `git push` or manually redeploy in Vercel
5. **Audit**: Check Firebase activity logs for suspicious access

---

## 7. TESTING CHECKLIST

### 7.1 Contact Form
```bash
# Test valid submission
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Test message"}'

# Expected: { "success": true, "service": "Firestore", "stored": true }
```

### 7.2 Rate Limiting
```bash
# Send 15 rapid requests from same IP
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","message":"Message"}'
done

# Expected: 11th+ request returns 429 (Too Many Requests)
```

### 7.3 CSRF Protection
```bash
# Request from wrong origin should be rejected
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -H "Origin: https://attacker.com" \
  -d '{"name":"Attacker","email":"evil@example.com","message":"Hack"}'

# Expected: 403 (Forbidden)
```

### 7.4 XSS/HTML Injection
```bash
# Test HTML stripping
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(1)</script>John","email":"john@example.com","message":"Test"}'

# Expected: HTML tags stripped, only "alert(1) John" stored
```

---

## 8. MONITORING & LOGGING

### 8.1 Vercel Logs
Monitor contact API errors:
```bash
vercel logs --tail
```

### 8.2 Firebase Console
- **Firestore**: View submissions in **Data** tab
- **Audit Logs**: Check who accessed service account keys
- **Usage**: Monitor read/write operations

### 8.3 Formspree Dashboard
- View submitted forms
- Check delivery status
- Monitor spam/bounces

---

## 9. MAINTENANCE & UPDATES

### 9.1 Quarterly Security Audit
```bash
npm audit
npm outdated
```

### 9.2 Renew Certificates (Auto with Vercel)
HTTPS certificates auto-renew via Let's Encrypt

### 9.3 Rotate Service Account Keys (Annually)
1. Generate new key in Firebase Console
2. Update Vercel secret
3. Revoke old key
4. Test deployment

---

## 10. QUICK REFERENCE

**Problem** | **Solution**
-----------|------------
Contact form returns 403 | Check `ALLOWED_ORIGINS` includes your domain
Contact form returns 429 | Rate limit hit; wait 1 minute
Firestore write fails | Check service account has Firestore permissions
Email not arriving | Check Formspree dashboard for bounces
Build fails | Run `npm run build` locally; check TypeScript errors

---

## Support & Questions
For security issues, contact: `kartikpathak883@gmail.com`

Last updated: **14 January 2026**
