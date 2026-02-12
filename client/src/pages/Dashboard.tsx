import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser } from '../lib/auth';
import { useAuth } from '../contexts/AuthContext';
import { LogoCube } from '../components/icons';
import Modal from '../components/Modal';
import './Dashboard.css';

const WELCOME_SESSION_KEY = 'shrinkwrap_welcome_shown';

export default function Dashboard() {
  const { user } = useAuth();
  const displayName = user?.displayName ?? null;
  const email = user?.email ?? null;
  const navigate = useNavigate();

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    if (!user) return;
    const alreadyShown = sessionStorage.getItem(WELCOME_SESSION_KEY);
    if (!alreadyShown) {
      setShowWelcomeModal(true);
    }
  }, [user]);

  function handleCloseWelcome() {
    sessionStorage.setItem(WELCOME_SESSION_KEY, '1');
    setShowWelcomeModal(false);
  }

  async function handleSignOut() {
    await signOutUser();
    navigate('/');
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <Link to="/" className="dashboard-logo">
          <LogoCube />
          ShrinkWrap
        </Link>
        <button type="button" className="btn btn-outline" onClick={handleSignOut}>
          Sign out
        </button>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-panels">
          <div className="dashboard-panel">
            <h2 className="panel-header">Grok</h2>
            <div className="panel-content">
              <p className="panel-placeholder">Grok interface coming soon</p>
            </div>
          </div>
          <div className="dashboard-panel">
            <h2 className="panel-header">Claude</h2>
            <div className="panel-content">
              <p className="panel-placeholder">Claude interface coming soon</p>
            </div>
          </div>
        </div>
      </main>

      <Modal isOpen={showWelcomeModal} onClose={handleCloseWelcome}>
        <h2 id="modal-title" className="modal-title">
          Welcome, {displayName || email || 'there'}!
        </h2>
        <p className="modal-subtitle">Your workspace is ready.</p>
        <button type="button" className="modal-cta" onClick={handleCloseWelcome}>
          Get started
        </button>
      </Modal>
    </div>
  );
}
