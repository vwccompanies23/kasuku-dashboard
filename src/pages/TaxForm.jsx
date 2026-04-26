import { useState } from 'react';
import { api } from '../api';

export default function TaxForm() {
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [taxId, setTaxId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !country || !taxId) {
      alert('Fill all fields');
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/tax/submit', {
        fullName,
        country,
        taxId
      });

      alert('✅ Tax form submitted');

      window.location.href = '/withdraw';

    } catch (err) {
      // ✅ SHOW REAL ERROR FROM BACKEND
      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
        'Error submitting tax form ❌'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧾 Tax Information</h1>

      <div style={styles.card}>
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={styles.input}
        />

        {/* 🔥 COUNTRY SELECT (IMPORTANT) */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="CD">Congo (DRC)</option>
          <option value="FR">France</option>
          <option value="GB">United Kingdom</option>
        </select>

        {/* 🔥 DYNAMIC LABEL */}
        <input
          placeholder={
            country === 'US'
              ? 'SSN / EIN (US)'
              : 'Tax ID / TIN (Optional)'
          }
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
          style={styles.input}
        />

        {/* 🔥 INFO MESSAGE */}
        {country && country !== 'US' && (
          <div style={styles.info}>
            🌍 Non-US users may not need full tax verification
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Tax Form'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    background: '#0b0f19',
    minHeight: '100vh',
    color: 'white'
  },
  title: {
    fontSize: 32,
    marginBottom: 20
  },
  card: {
    background: '#111827',
    padding: 20,
    borderRadius: 12
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    border: 'none'
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: 'white',
    border: 'none'
  },
  info: {
    background: '#3b82f622',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: '#60a5fa'
  }
};