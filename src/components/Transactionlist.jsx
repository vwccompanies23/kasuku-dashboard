import { useEffect, useState } from 'react';
import { api } from '../api';

export default function TransactionList({ refresh }: any) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = () => {
    setLoading(true);

    api.get('/wallet/transactions').then((res) => {
      setTransactions(res.data.data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadTransactions();
  }, [refresh]);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Transaction History</h3>

      {loading ? (
        <>
          {[1, 2, 3].map((i) => (
            <div key={i} style={styles.row}>
              <div style={styles.left}>
                <div style={styles.skeletonIcon} />
                <div>
                  <div style={styles.skeletonText} />
                  <div style={styles.skeletonSmall} />
                </div>
              </div>

              <div style={styles.skeletonAmount} />
            </div>
          ))}
        </>
      ) : transactions.length === 0 ? (
        <p style={styles.empty}>No transactions yet</p>
      ) : (
        transactions.map((tx: any) => (
          <div key={tx.id} style={styles.row}>
            <div style={styles.left}>
              <div style={styles.icon}>
                {tx.type === 'topup' ? '💳' : '💸'}
              </div>

              <div>
                <p style={styles.type}>
                  {tx.type === 'topup' ? 'Top-up' : 'Withdraw'}
                </p>

                <small style={styles.date}>
                  {new Date(tx.createdAt).toLocaleString()}
                </small>

                {tx.source && (
                  <p style={styles.source}>
                    via {tx.source}
                  </p>
                )}
              </div>
            </div>

            <div
              style={{
                ...styles.amount,
                color:
                  tx.type === 'topup'
                    ? '#7c3aed'
                    : '#e11d48',
              }}
            >
              {tx.type === 'topup' ? '+' : '-'}$
              {Number(tx.amount).toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// =========================
// 🎨 STYLES (MOBILE OPTIMIZED)
// =========================
const styles = {
  card: {
    backgroundColor: '#1c1c1c',
    padding: 16, // ✅ reduced padding for mobile
    borderRadius: 12,
    marginTop: 16,
    color: '#fff',
    width: '100%', // ✅ full width
    maxWidth: 420, // ✅ desktop limit
    marginLeft: 'auto',
    marginRight: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
  },

  title: {
    color: '#fff',
    marginBottom: 12,
    fontSize: 16,
  },

  empty: {
    color: '#aaa',
    fontSize: 14,
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
    padding: '14px 0', // ✅ more vertical spacing
    cursor: 'pointer',
  },

  left: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },

  icon: {
    fontSize: 18,
  },

  type: {
    color: '#fff',
    margin: 0,
    fontWeight: 'bold',
    fontSize: 14,
  },

  date: {
    color: '#aaa',
    fontSize: 11,
  },

  source: {
    color: '#7c3aed',
    fontSize: 10,
    margin: 0,
  },

  amount: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  // =========================
  // 💀 SKELETON (UNCHANGED)
  // =========================
  skeletonIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#2a2a2a',
    animation: 'pulse 1.5s infinite',
  },

  skeletonText: {
    width: 100,
    height: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
    marginBottom: 5,
    animation: 'pulse 1.5s infinite',
  },

  skeletonSmall: {
    width: 70,
    height: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
    animation: 'pulse 1.5s infinite',
  },

  skeletonAmount: {
    width: 60,
    height: 14,
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
    animation: 'pulse 1.5s infinite',
  },
};