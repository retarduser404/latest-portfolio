/**
 * Firebase Admin SDK - Server-side initialization
 * CRITICAL SECURITY: This file must ONLY be imported in server-side files (API routes, SSR).
 * Never import this in client components or browser bundles.
 */

import admin from "firebase-admin";

// Validate that we''re in a server environment
if (typeof window !== "undefined") {
  throw new Error(
    "CRITICAL: firebaseAdmin.ts imported in browser! This file must ONLY run on the server."
  );
}

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey || serviceAccountKey === "YOUR_SERVICE_ACCOUNT_JSON_HERE") {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY is missing or not set. " +
    "For local dev: add your service account JSON to .env.local (see .env.local.backup). " +
    "For production: add it as a secret in Vercel dashboard."
  );
}

interface ServiceAccountKey {
  type?: string;
  private_key?: string;
  client_email?: string;
  project_id?: string;
}

let serviceAccount: ServiceAccountKey;

try {
  serviceAccount = JSON.parse(serviceAccountKey);
} catch (error) {
  throw new Error(
    `Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY as JSON. ` +
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );
}

// Validate service account structure
if (
  !serviceAccount.type ||
  !serviceAccount.private_key ||
  !serviceAccount.client_email ||
  !serviceAccount.project_id
) {
  throw new Error(
    "Invalid service account JSON. Must include: type, private_key, client_email, project_id"
  );
}

// Initialize Firebase Admin SDK (singleton pattern - only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
  console.log(
    `Firebase Admin SDK initialized for project: ${serviceAccount.project_id}`
  );
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();

export default admin;
