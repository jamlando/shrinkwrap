import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { runFirebaseDebug, type DebugResult } from '../lib/firebaseDebug';
import { LogoCube } from '../components/icons';
import './Auth.css';

export default function Debug() {
  const [result, setResult] = useState<DebugResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runFirebaseDebug().then((r) => {
      setResult(r);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="auth-page"><p>Running diagnostic…</p></div>;

  const r = result!;
  const allConfigPresent = Object.values(r.configStatus).every(Boolean);

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <LogoCube />
          ShrinkWrap
        </Link>
        <Link to="/signup">Sign up</Link>
      </header>

      <main className="auth-main" style={{ maxWidth: '32rem', textAlign: 'left' }}>
        <h1>Firebase connection diagnostic</h1>

        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Config</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(r.configStatus).map(([key, present]) => (
              <li key={key} style={{ marginBottom: '0.25rem' }}>
                <code>{key}</code>: {present ? '✓ set' : '✗ missing'}
              </li>
            ))}
          </ul>
          {!allConfigPresent && (
            <p className="auth-error" role="alert">
              Some env vars are missing. Ensure <code>client/.env.local</code> has all VITE_FIREBASE_* variables.
            </p>
          )}
        </section>

        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Project</h2>
          <p>
            <strong>projectId:</strong> {r.projectId ?? '—'}
          </p>
          <p>
            <strong>authDomain:</strong> {r.authDomain ?? '—'}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Confirm this projectId matches the Firebase Console project where you enabled Auth.
          </p>
        </section>

        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>REST API test</h2>
          <p>
            Simulated sign-up request to Identity Toolkit API:
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Status: {r.restTest.status ?? '—'}</li>
            {r.restTest.error && (
              <li className="auth-error" role="alert">{r.restTest.error}</li>
            )}
            {r.restTest.raw != null && (
              <li><pre style={{ fontSize: '0.75rem', overflow: 'auto' }}>{JSON.stringify(r.restTest.raw, null, 2)}</pre></li>
            )}
          </ul>
          {r.restTest.error?.includes('CONFIGURATION_NOT_FOUND') && (
            <p className="auth-error" role="alert">
              This usually means either (a) the <strong>projectId</strong> in your env does not match the Firebase project
              where Auth is enabled, or (b) a different Firebase project (e.g. wrong .env) is being used.
            </p>
          )}
        </section>

        <p>
          <Link to="/signup">← Back to Sign up</Link>
        </p>
      </main>
    </div>
  );
}
