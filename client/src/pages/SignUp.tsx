import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail, signInWithGoogle } from '../lib/auth';
import { LogoCube } from '../components/icons';
import './Auth.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const result = await signUpWithEmail(email, password, displayName || undefined);
    setLoading(false);
    if (result.success) navigate('/dashboard');
    else setError(result.error);
  }

  async function handleGoogleClick() {
    setError('');
    setLoading(true);
    const result = await signInWithGoogle();
    setLoading(false);
    if (result.success) navigate('/dashboard');
    else setError(result.error);
  }

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <LogoCube />
          ShrinkWrap
        </Link>
        <Link to="/login">Log in</Link>
      </header>

      <main className="auth-main">
        <h1>Create your account</h1>
        <form className="auth-form" onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="text"
            placeholder="Display name (optional)"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing up…' : 'Sign up'}
          </button>
        </form>

        <p className="auth-divider">or</p>

        <button
          type="button"
          className="btn btn-google"
          onClick={handleGoogleClick}
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </main>
    </div>
  );
}
