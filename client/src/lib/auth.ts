import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  type UserCredential,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isConfigured } from './firebase';

const usersCollection = 'users';

async function ensureUserDoc(uid: string, email: string | null, displayName: string | null) {
  if (!db) return;
  await setDoc(
    doc(db, usersCollection, uid),
    {
      email: email ?? null,
      displayName: displayName ?? null,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export type AuthResult = { success: true } | { success: false; error: string };

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResult> {
  if (!isConfigured || !auth || !db) {
    return { success: false, error: 'Authentication is not configured.' };
  }
  try {
    const cred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, usersCollection, cred.user.uid), {
      email: cred.user.email ?? email,
      displayName: displayName ?? cred.user.displayName ?? null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Sign up failed.';
    if (msg.includes('email-already-in-use')) return { success: false, error: 'This email is already in use.' };
    if (msg.includes('weak-password')) return { success: false, error: 'Password should be at least 6 characters.' };
    return { success: false, error: msg };
  }
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  if (!isConfigured || !auth) {
    return { success: false, error: 'Authentication is not configured.' };
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Login failed.';
    if (msg.includes('invalid-credential') || msg.includes('wrong-password') || msg.includes('user-not-found'))
      return { success: false, error: 'Invalid email or password.' };
    return { success: false, error: msg };
  }
}

export async function signInWithGoogle(): Promise<AuthResult> {
  if (!isConfigured || !auth || !db) {
    return { success: false, error: 'Authentication is not configured.' };
  }
  try {
    const cred = await signInWithPopup(auth, new GoogleAuthProvider());
    const isNewUser = cred.user.metadata.creationTime === cred.user.metadata.lastSignInTime;
    if (isNewUser) {
      await setDoc(doc(db, usersCollection, cred.user.uid), {
        email: cred.user.email ?? null,
        displayName: cred.user.displayName ?? null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      await ensureUserDoc(cred.user.uid, cred.user.email ?? null, cred.user.displayName ?? null);
    }
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Google sign-in failed.';
    return { success: false, error: msg };
  }
}

export async function signOutUser(): Promise<void> {
  if (auth) await signOut(auth);
}
