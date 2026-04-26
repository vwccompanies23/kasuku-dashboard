import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Royalties() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const [walletRes, historyRes] = await Promise.all([
        api.get('/payouts/wallet'),
        api.get('/payouts/history'),
      ]);

      setBalance(walletRes.data?.balance || 0);
      setHistory(historyRes.data || []);
    } catch (err) {
      console.error('Royalties error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ color: 'white', padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💰 Royalties</h1>

      {/* BALANCE */}
      <div style={styles.balanceCard}>
        <h2>Available Balance</h2>
        <h1>${balance}</h1>

        <button
          style={styles.btn}
          onClick={() => navigate('/withdraw')}
        >
          Withdraw
        </button>
      </div>

      {/* HISTORY */}
      <div style={styles.card}>
        <h3>Payout History</h3>

        {history.length === 0 ? (
          <p>No payouts yet</p>
        ) : (
          history.map((p: any) => (
            <div key={p.id} style={styles.row}>
              <span>${p.amount}</span>

              {/* ✅ STATUS COLOR */}
              <span
                style={{
                  color:
                    p.status === 'completed'
                      ? '#4ade80'
                      : p.status === 'pending'
                      ? '#facc15'
                      : '#f87171',
                }}
              >
                {p.status}
              </span>

              <span>
                {new Date(p.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 25,
    color: '#fff',
  },

  title: {
    marginBottom: 20,
  },

  balanceCard: {
    background: 'linear-gradient(135deg, #ff003c, #7c3aed)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },

  card: {
    background: '#141414',
    padding: 20,
    borderRadius: 12,
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottom: '1px solid #333',
    paddingBottom: 8,
  },

  btn: {
    marginTop: 10,
    padding: 10,
    border: 'none',
    borderRadius: 8,
    background: '#000',
    color: '#fff',
    cursor: 'pointer',
  },
};