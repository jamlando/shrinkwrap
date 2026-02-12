import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle } from '../lib/auth';
import { LogoCube } from '../components/icons';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signInWithEmail(email, password);
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
        <Link to="/signup">Sign up</Link>
      </header>

      <main className="auth-main">
        <h1>Log in</h1>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in…' : 'Log in'}
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
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </main>
    </div>
  );
}
