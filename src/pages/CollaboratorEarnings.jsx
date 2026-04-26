import { useEffect, useState } from 'react';
import { api } from '../api';

export default function CollaboratorEarnings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await api.get('/earnings/collaborators');
      setData(res.data || []);
    } catch (err) {
      console.error('Error loading collaborator earnings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ color: '#fff', padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>💸 Collaborator Earnings</h1>

      {data.length === 0 && (
        <p style={{ opacity: 0.6 }}>No earnings yet</p>
      )}

      {data.map((item, i) => (
        <div key={i} style={styles.card}>
          <h3>{item.email}</h3>

          <div style={styles.row}>
            <span>Total Earned</span>
            <span>${item.total.toFixed(2)}</span>
          </div>

          <div style={styles.sub}>
            {item.releases.map((r, idx) => (
              <div key={idx} style={styles.subRow}>
                <span>Release #{r.releaseId}</span>
                <span>${r.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: 20, color: '#fff' },

  card: {
    background: '#111',
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
    fontSize: 16,
  },

  sub: {
    marginTop: 10,
    borderTop: '1px solid #222',
    paddingTop: 10,
  },

  subRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    opacity: 0.8,
  },
};