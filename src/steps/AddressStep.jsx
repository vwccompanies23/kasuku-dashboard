import { useState } from 'react';

export default function AddressStep({ next }) {
  const [address, setAddress] = useState('');

  return (
    <div>
      <h2>📍 Address</h2>

      <input
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
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