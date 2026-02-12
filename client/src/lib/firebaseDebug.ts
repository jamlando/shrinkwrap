/**
 * Firebase connection diagnostic utility.
 * Run from browser console: import('./src/lib/firebaseDebug.ts').then(m => m.runFirebaseDebug())
 * Or visit /debug to see the report in the UI.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export type DebugResult = {
  configStatus: Record<string, boolean>;
  projectId: string | null;
  authDomain: string | null;
  restTest: { ok: boolean; status?: number; error?: string; raw?: unknown };
};

export async function runFirebaseDebug(): Promise<DebugResult> {
  const configStatus: Record<string, boolean> = {};
  for (const [k, v] of Object.entries(firebaseConfig)) {
    configStatus[k] = typeof v === 'string' && v.length > 0;
  }

  let restTest: DebugResult['restTest'] = { ok: false };
  const apiKey = firebaseConfig.apiKey;
  const projectId = firebaseConfig.projectId;

  if (typeof apiKey === 'string' && apiKey.length > 0) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword123',
          returnSecureToken: true,
        }),
      });
      const data = await res.json().catch(() => ({}));
      restTest = {
        ok: res.ok,
        status: res.status,
        error: data.error?.message ?? (res.ok ? undefined : res.statusText),
        raw: data.error ? { code: data.error?.code, message: data.error?.message } : undefined,
      };
    } catch (e) {
      restTest = { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  } else {
    restTest = { ok: false, error: 'No API key configured' };
  }

  return {
    configStatus,
    projectId: typeof projectId === 'string' ? projectId : null,
    authDomain: typeof firebaseConfig.authDomain === 'string' ? firebaseConfig.authDomain : null,
    restTest,
  };
}
