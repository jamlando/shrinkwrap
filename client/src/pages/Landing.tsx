import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LogoCube,
  Sparkle,
  ArrowRight,
  IconUnifiedWorkspace,
  IconShrinkWrap,
  IconContextPortability,
} from '../components/icons';
import { joinWaitlist } from '../lib/waitlist';
import './Landing.css';

export default function Landing() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [waitlistMessage, setWaitlistMessage] = useState('');

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    setWaitlistMessage('');
    setWaitlistStatus('loading');
    const result = await joinWaitlist(waitlistEmail, 'landing');
    if (result.success) {
      setWaitlistStatus('success');
      setWaitlistEmail('');
    } else {
      setWaitlistStatus('error');
      setWaitlistMessage(result.error);
    }
  }

  return (
    <div className="landing">
      <header className="landing-header">
        <Link to="/" className="logo">
          <span className="logo-icon" aria-hidden>
            <LogoCube />
          </span>
          ShrinkWrap
        </Link>
        <nav>
          <Link to="/login">Log In</Link>
          <Link to="/signup" className="btn btn-header">Get Started</Link>
        </nav>
      </header>

      <section className="hero">
        <p className="hero-pill">
          <Sparkle />
          The AI Context Workspace
        </p>
        <h1>Stop fighting with context windows.</h1>
        <p className="hero-subtext">
          ShrinkWrap aggregates your AI chats and snippets into a single, cohesive workspace.
          Eliminate context switching and make your workflow flow.
        </p>
        <div className="hero-ctas">
          <Link to="/signup" className="btn btn-primary btn-lg">
            Start Shrinking Context
            <ArrowRight />
          </Link>
          <a href="#how-it-works" className="btn btn-secondary btn-lg">
            See How It Works
          </a>
        </div>
      </section>

      <section className="waitlist" aria-labelledby="waitlist-heading">
        <h2 id="waitlist-heading" className="waitlist-heading">Get notified when we launch</h2>
        {waitlistStatus === 'success' ? (
          <p className="waitlist-success">You're on the list. We'll be in touch.</p>
        ) : (
          <form className="waitlist-form" onSubmit={handleWaitlistSubmit} noValidate>
            <input
              type="email"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              placeholder="Enter your email"
              className="waitlist-input"
              disabled={waitlistStatus === 'loading'}
              autoComplete="email"
              aria-invalid={waitlistStatus === 'error'}
              aria-describedby={waitlistStatus === 'error' ? 'waitlist-error' : undefined}
            />
            <button
              type="submit"
              className="btn btn-primary waitlist-btn"
              disabled={waitlistStatus === 'loading'}
            >
              {waitlistStatus === 'loading' ? 'Joining…' : 'Join waitlist'}
            </button>
            {waitlistStatus === 'error' && (
              <p id="waitlist-error" className="waitlist-error" role="alert">
                {waitlistMessage}
              </p>
            )}
          </form>
        )}
      </section>

      <section id="how-it-works" className="features">
        <div className="features-carousel">
          <article className="feature-card">
            <div className="feature-icon-wrap">
              <IconUnifiedWorkspace />
            </div>
            <h3>Unified Workspace</h3>
            <p>Keep all your code snippets, chat logs, and documentation in one organized project view.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon-wrap">
              <IconShrinkWrap />
            </div>
            <h3>AI Shrink Wrap</h3>
            <p>Instantly condense and format verbose chat logs into usable context for your next prompt.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon-wrap">
              <IconContextPortability />
            </div>
            <h3>Context Portability</h3>
            <p>Move context effortlessly between ChatGPT, Claude, and your IDE without losing meaning.</p>
          </article>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; ShrinkWrap. A unified AI workspace.</p>
      </footer>
    </div>
  );
}
