/**
 * Waitlist collection document shape:
 * - email: string (required)
 * - createdAt: Firestore server timestamp
 * - source: string (optional, e.g. "landing", "hero")
 */
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const WAITLIST_COLLECTION = 'waitlist';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return typeof value === 'string' && value.length >= 3 && EMAIL_REGEX.test(value.trim());
}

export type JoinWaitlistResult = { success: true } | { success: false; error: string };

export async function joinWaitlist(
  email: string,
  source: string = 'landing'
): Promise<JoinWaitlistResult> {
  const trimmed = email.trim();
  if (!isValidEmail(trimmed)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  try {
    await addDoc(collection(db, WAITLIST_COLLECTION), {
      email: trimmed,
      source,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (e) {
    console.error('Waitlist signup error:', e);
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }
}
