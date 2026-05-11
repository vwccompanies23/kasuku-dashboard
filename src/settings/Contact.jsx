import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    address: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.placeholder.toLowerCase().replace(' ', '')]: e.target.value,
    });
  };

  const save = () => {
    alert('Saved ✅');
  };

  return (
    <div style={styles.wrapper}>

      <h1 style={styles.title}>📞 Contact Information</h1>

      <div style={styles.card}>
        <div style={styles.grid}>
          <input placeholder="Email" onChange={handleChange} style={styles.input} />
          <input placeholder="Phone" onChange={handleChange} style={styles.input} />
          <input placeholder="First Name" onChange={handleChange} style={styles.input} />
          <input placeholder="Last Name" onChange={handleChange} style={styles.input} />
          <input placeholder="Country" onChange={handleChange} style={styles.input} />
          <input placeholder="Address" onChange={handleChange} style={styles.input} />
        </div>

        {/* SAVE BUTTON */}
        <button style={styles.save} onClick={save}>
          Save Changes 💾
        </button>

        {/* 🔥 CONTRACT SECTION */}
        <div style={styles.contractBox}>
          <h3 style={styles.contractTitle}>📄 Legal Agreement</h3>

          <p style={styles.contractText}>
            Review and manage your agreement with Kasuku.
          </p>

          <button
            style={styles.contractButton}
            onClick={() => navigate('/settings/contract')}
          >
            Open Contract →
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    color: '#fff',
  },

  title: {
    marginBottom: 20,
  },

  card: {
    background: 'linear-gradient(180deg,#0f0f0f,#050505)',
    padding: 25,
    borderRadius: 16,
    border: '1px solid rgba(124,58,237,0.3)',
    boxShadow: '0 0 30px rgba(124,58,237,0.15)',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 15,
  },

  input: {
    padding: 14,
    borderRadius: 10,
    border: '1px solid #222',
    background: '#000',
    color: '#fff',
  },

  save: {
    marginTop: 20,
    width: '100%',
    padding: 14,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  contractBox: {
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
  },

  contractTitle: {
    marginBottom: 5,
  },

  contractText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 15,
  },

  contractButton: {
    padding: 12,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#7c3aed,#ff003c)',
    color: '#fff',
    cursor: 'pointer',
  },
};