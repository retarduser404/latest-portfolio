import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import DOMPurify from 'isomorphic-dompurify';

// Rate limiting setup (optional: only if UPSTASH env vars are set)
let ratelimit: any = null;
try {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (upstashUrl && upstashToken) {
    const { Ratelimit } = require('@upstash/ratelimit');
    const { Redis } = require('@upstash/redis');
    
    const redis = new Redis({
      url: upstashUrl,
      token: upstashToken,
    });
    
    ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour per IP
    });
  }
} catch (err) {
  console.warn('[RATE LIMIT] Upstash not configured, rate limiting disabled');
}

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ID = process.env.FORMSPREE_ID || 'mqeeakbd';

// Allowed origins for form POST (comma-separated env or defaults)
// Supports wildcard patterns like https://*.vercel.app
const rawAllowedOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://kartiksportfolio.vercel.app';
const ALLOWED_ORIGIN_PATTERNS: Array<string | RegExp> = rawAllowedOrigins
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)
  .map((p): string | RegExp => {
    if (p.includes('*')) {
      // Convert wildcard to regex: https://*.vercel.app -> https://.*\.vercel\.app
      const regexString = p
        .replace(/\./g, '\\.')    // Escape dots
        .replace(/\*/g, '.*');     // Convert * to .*
      return new RegExp(`^${regexString}$`);
    }
    return p;
  });

// Simple in-memory rate limiter (per-IP) — suitable for single-instance dev/testing
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window
const rateMap: Map<string, { count: number; expires: number }> = new Map();

// Sanitize input to prevent injection attacks
function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  // Use DOMPurify to remove any malicious HTML/script tags
  const purified = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  // Collapse whitespace and trim
  const collapsed = purified.replace(/\s+/g, ' ').trim();
  return collapsed.slice(0, 5000); // Limit to 5000 chars
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting if Upstash is configured
    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown';
      const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip);
      
      if (!success) {
        console.warn(`[RATE LIMIT] IP ${ip} exceeded limit`);
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }

    // Basic origin/referer check to prevent CSRF from unknown origins
    const origin = request.headers.get('origin') || request.headers.get('referer') || '';
    const rawAllowedOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://kartiksportfolio.vercel.app';
    const allowedOrigins = rawAllowedOrigins
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    
    if (origin) {
      const isAllowed = allowedOrigins.some(o => origin === o || origin.startsWith(o));
      if (!isAllowed) {
        console.warn(`[CONTACT API] Origin rejected: ${origin}. Allowed: ${rawAllowedOrigins}`);
        return NextResponse.json({ error: 'Forbidden - origin not allowed' }, { status: 403 });
      }
    }

    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const state = rateMap.get(ip) || { count: 0, expires: now + RATE_LIMIT_WINDOW_MS };
    if (now > state.expires) {
      state.count = 0;
      state.expires = now + RATE_LIMIT_WINDOW_MS;
    }
    state.count += 1;
    rateMap.set(ip, state);
    if (state.count > RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }


    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedMessage = sanitizeInput(message);

    // Validate email format using validator library
    if (!validator.isEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate name length
    if (!validator.isLength(sanitizedName, { min: 2, max: 100 })) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    // Validate message length
    if (!validator.isLength(sanitizedMessage, { min: 10, max: 5000 })) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Try to dynamically import Firebase Admin and write to Firestore.
    // If import or write fails, continue and use Formspree as fallback.
    let firestoreSuccess = false;
    try {
      const firebaseAdminMod = await import('@/lib/firebaseAdmin');
      const admin = firebaseAdminMod.default ?? firebaseAdminMod;
      const adminDb = firebaseAdminMod.adminDb ?? firebaseAdminMod.adminDb;

      if (admin && adminDb) {
        await adminDb.collection('contact_submissions').add({
          name: sanitizedName,
          email: sanitizedEmail,
          message: sanitizedMessage,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          read: false,
        });
        firestoreSuccess = true;
        console.log('✓ Contact submission saved to Firestore');
      }
    } catch (firestoreError) {
      console.error('Firestore import/write error (continuing):', firestoreError);
      // Continue with Formspree as fallback
    }

    // Send via Formspree for immediate email notification
    try {
      const formspreeResponse = await fetch(
        `https://formspree.io/f/${FORMSPREE_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: sanitizedName,
            email: sanitizedEmail,
            message: sanitizedMessage,
          }),
        }
      );

      if (formspreeResponse.ok) {
        return NextResponse.json(
          { 
            success: true, 
            message: 'Email sent successfully',
            service: firestoreSuccess ? 'Firestore + Formspree' : 'Formspree',
            stored: firestoreSuccess,
          },
          { status: 200, headers: { 'Access-Control-Allow-Origin': origin || '*' } }
        );
      } else {
        const errorText = await formspreeResponse.text();
        console.error('Formspree error:', errorText);
        
        // If Firestore saved but Formspree failed, still return success
        if (firestoreSuccess) {
          return NextResponse.json(
            { 
              success: true, 
              message: 'Submission saved (email delayed)',
              service: 'Firestore',
              stored: true,
            },
            { status: 200 }
          );
        }

        return NextResponse.json(
          { error: 'Failed to send message. Please try again.' },
          { status: 500, headers: { 'Access-Control-Allow-Origin': origin || '*' } }
        );
      }
    } catch (error) {
      console.error('Contact API error:', error);
      
      // If Firestore saved but email failed, still return success
      if (firestoreSuccess) {
        return NextResponse.json(
          { 
            success: true, 
            message: 'Submission saved (email delayed)',
            service: 'Firestore',
            stored: true,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: 'Internal server error. Please try again later.' },
        { status: 500, headers: { 'Access-Control-Allow-Origin': origin || '*' } }
      );
    }
  } catch (error) {
    console.error('Request parsing error:', error);
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  const allowed = ALLOWED_ORIGIN_PATTERNS.some(pattern => {
    if (pattern instanceof RegExp) return pattern.test(origin);
    return origin === pattern || origin.startsWith(pattern);
  });

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowed ? origin : '',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
