import { useState, useEffect } from 'react';
import { api } from '../api';

export default function ConnectStripe() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // =========================
  // 🔍 CHECK STATUS
  // =========================
  useEffect(() => {
    api.get('/payments/stripe-status')
      .then((res) => {
        setConnected(res.data.connected);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // =========================
  // 🔗 CONNECT STRIPE
  // =========================
  const connectStripe = async () => {
    try {
      const res = await api.post('/payments/connect');
      window.location.href = res.data.url;
    } catch (err) {
      alert('Failed to connect Stripe ❌');
    }
  };

  if (loading) return <p style={{ color: '#fff' }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1>💳 Stripe Connection</h1>

      {connected ? (
        <div style={styles.success}>
          ✅ Stripe Connected
        </div>
      ) : (
        <button style={styles.btn} onClick={connectStripe}>
          🔗 Connect Stripe
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: '#0a0a0a',
    minHeight: '100vh',
    padding: 20,
    color: '#fff',
  },
  btn: {
    padding: '12px 20px',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    cursor: 'pointer',
  },
  success: {
    padding: 15,
    background: '#16a34a',
    borderRadius: 10,
  },
};