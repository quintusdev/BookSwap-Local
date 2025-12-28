
import { initializeApp, getApps, getApp, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// This is a server-side only file.

// Ensure you have `GOOGLE_APPLICATION_CREDENTIALS` set in your environment
// or that your hosting environment (like Cloud Run) has the correct service account permissions.
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS ? 
    JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS) : undefined;


export function initializeFirebase() {
  if (!getApps().length) {
    initializeApp({
        // credential: credential(serviceAccount), // In many environments (like Cloud Run), this is not needed
    });
  }
  const app = getApp();
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  
  return { app, firestore, auth };
}
