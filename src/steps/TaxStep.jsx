import { useState } from 'react';
import { api } from '../api';

export default function TaxStep({ next }) {
  const [type, setType] = useState('W9');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [taxId, setTaxId] = useState('');

  const submit = async () => {
    await api.post('/tax/submit', {
      fullName,
      country,
      taxId,
      type,
    });

    next();
  };

  return (
    <div>
      <h2>🧾 Tax Information</h2>

      <div style={styles.radioGroup}>
        <label>
          <input
            type="radio"
            checked={type === 'W9'}
            onChange={() => setType('W9')}
          />
          W9 (US)
        </label>

        <label>
          <input
            type="radio"
            checked={type === 'W8'}
            onChange={() => setType('W8')}
          />
          W-8BEN (Non-US)
        </label>
      </div>

      <input
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Country"
        onChange={(e) => setCountry(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Tax ID"
        onChange={(e) => setTaxId(e.target.value)}
        style={styles.input}
      />

      <button style={styles.btn} onClick={submit}>
        Submit Tax →
      </button>
    </div>
  );
}

const styles = {
  radioGroup: {
    display: 'flex',
    gap: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
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