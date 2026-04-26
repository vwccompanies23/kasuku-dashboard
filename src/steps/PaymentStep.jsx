import { useState } from 'react';

export default function PaymentStep({ next }) {
  const [email, setEmail] = useState('');

  return (
    <div>
      <h2>💳 Payment Method</h2>

      <input
        placeholder="PayPal or Bank Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <button style={styles.btn} onClick={next}>
        Continue →
      </button>
    </div>
  );
}

const styles = {
  input: {
    width: '100%',
    padding: 12,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 8,
    border: 'none',
  },
  btn: {
    padding: 12,
    width: '100%',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 8,
  },
};