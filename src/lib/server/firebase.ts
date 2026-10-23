import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

/**
 * Firebase Admin, server side only (Firestore for slide decks, Cloud Storage for their files). Configured from a
 * service account: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY (newlines may be escaped as \n)
 * and FIREBASE_STORAGE_BUCKET. Returns null when not configured, so local dev and CI run without it.
 */

let app: App | null | undefined;

function firebaseApp(): App | null {
  if (app !== undefined) return app;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) return (app = null);
  app =
    getApps()[0] ??
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  return app;
}

let db: Firestore | null | undefined;

export function getDb(): Firestore | null {
  if (db !== undefined) return db;
  const instance = firebaseApp();
  if (!instance) return (db = null);
  db = getFirestore(instance);
  // REST instead of gRPC: much faster cold starts on serverless functions, same API.
  db.settings({ preferRest: true });
  return db;
}

/** The default bucket, or null when Firebase or the bucket isn't configured. */
export function getBucket() {
  const instance = firebaseApp();
  return instance && process.env.FIREBASE_STORAGE_BUCKET ? getStorage(instance).bucket() : null;
}
