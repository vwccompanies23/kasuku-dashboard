import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Referral() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    fetchReferral();
  }, []);

  const fetchReferral = async () => {
    try {
      const userRes = await api.get('/auth/me');
      const user = userRes.data;

      setEnabled(user.referralEnabled);

      if (!user.referralEnabled) {
        setLoading(false);
        return;
      }

      const res = await api.get(`/referrals/code/${user.id}`);
      setCode(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const referralLink = `${window.location.origin}/signup?ref=${code}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    alert('🔗 Referral link copied!');
  };

  const shareLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join me on Kasuku 🎧',
          text: 'Sign up and get started!',
          url: referralLink,
        });
      } else {
        copyLink();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (!enabled) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>🚫 Referrals Disabled</h2>
        <p style={{ color: '#aaa' }}>
          Referral program is not available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎁 Refer a Friend</h1>

      <p style={styles.subtitle}>
        Invite a friend and get <b>FREE 1 year distribution</b> 🎧
      </p>

      <div style={styles.box}>
        <p style={{ fontSize: 12, color: '#aaa' }}>Your referral link</p>

        <input
          value={referralLink}
          readOnly
          style={styles.input}
        />

        <div style={styles.actions}>
          <button onClick={copyLink} style={styles.copyBtn}>
            📋 Copy
          </button>

          <button onClick={shareLink} style={styles.shareBtn}>
            📤 Share
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================
// 🎨 STYLES (MATCH YOUR APP)
// =========================
const styles = {
  container: {
    padding: 25,
    color: '#fff',
    background: 'radial-gradient(circle at top, #0f172a, #020617)',
    minHeight: '100vh',
  },

  title: {
    fontSize: 28,
    marginBottom: 10,
    color: '#7c3aed',
  },

  subtitle: {
    color: '#aaa',
    marginBottom: 20,
  },

  box: {
    background: '#0f172a',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
  },

  input: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    border: '1px solid #333',
    background: '#020617',
    color: '#fff',
    marginTop: 10,
  },

  actions: {
    display: 'flex',
    gap: 10,
    marginTop: 15,
  },

  copyBtn: {
    flex: 1,
    padding: 10,
    background: '#111',
    border: '1px solid #7c3aed',
    color: '#fff',
    borderRadius: 8,
    cursor: 'pointer',
  },

  shareBtn: {
    flex: 1,
    padding: 10,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 8,
    cursor: 'pointer',
  },
};