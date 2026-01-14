import { NextRequest, NextResponse } from 'next/server';
// Lazy import firebase-admin inside the handler to avoid crashing the dev server
// if optional native deps are missing. We'll attempt to import at request time.
// import is done below in the POST handler.

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ID = process.env.FORMSPREE_ID || 'mqeeakbd';

// Allowed origins for form POST (comma-separated env or defaults)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://latest-portfolio.vercel.app').split(',').map(s => s.trim());

// Simple in-memory rate limiter (per-IP) — suitable for single-instance dev/testing
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window
const rateMap: Map<string, { count: number; expires: number }> = new Map();

// Sanitize input to prevent injection attacks
function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  // Remove HTML tags
  const stripped = input.replace(/<[^>]*>/g, '');
  // Collapse whitespace and trim
  const collapsed = stripped.replace(/\s+/g, ' ').trim();
  return collapsed.slice(0, 5000); // Limit to 5000 chars
}

export async function POST(request: NextRequest) {
  try {
    // Basic origin/referer check to prevent CSRF from unknown origins
    const origin = request.headers.get('origin') || request.headers.get('referer') || '';
    if (origin) {
      const isAllowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
      if (!isAllowed) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
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

    // Validate email format
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate name and message length
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 5000) {
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
          { status: 200 }
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
          { status: 500 }
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
        { status: 500 }
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
