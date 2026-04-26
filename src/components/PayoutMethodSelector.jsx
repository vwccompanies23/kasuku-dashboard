import { useState, useEffect } from 'react';
import { api } from '../api';

export default function PayoutMethodSelector() {
  const [method, setMethod] = useState('');

  useEffect(() => {
    loadMethod();
  }, []);

  const loadMethod = async () => {
    const res = await api.get('/payouts/method');
    setMethod(res.data.method || '');
  };

  const save = async () => {
    await api.post('/payouts/method', { method });
    alert('Saved ✅');
  };

  return (
    <div style={styles.card}>
      <h3>💳 Payout Method</h3>

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={styles.input}
      >
        <option value="">Select method</option>
        <option value="stripe">Bank (Stripe)</option>
        <option value="paypal">PayPal</option>
      </select>

      <button style={styles.btn} onClick={save}>
        Save Method
      </button>
    </div>
  );
}

const styles = {
  card: { background: '#141414', padding: 20, borderRadius: 12 },
  input: { width: '100%', padding: 10, marginBottom: 10 },
  btn: {
    width: '100%',
    padding: 10,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
  },
};