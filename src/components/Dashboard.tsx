import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate(); // ✅ NEW

  const [stats, setStats] = useState({
    totalSongs: 0,
    totalPlays: 0,
    totalReleases: 0,
  });

  const [earnings, setEarnings] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      await Promise.all([
        fetchStats(),
        fetchReleases(),
        fetchEarnings(),
        fetchTransactions(),
      ]);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/music/stats');

      setStats((prev) => ({
        ...prev,
        totalSongs: res.data.totalSongs || 0,
        totalPlays: res.data.totalPlays || 0,
      }));
    } catch (err) {
      console.error('Stats error:', err);
    }
  };

  const fetchReleases = async () => {
    try {
      const res = await api.get('/releases');

      setStats((prev) => ({
        ...prev,
        totalReleases: res.data.length || 0,
      }));
    } catch (err) {
      console.error('Releases error:', err);
    }
  };

  const fetchEarnings = async () => {
    try {
      const res = await api.get('/royalties/total');
      setEarnings(res.data || 0);
    } catch (err) {
      console.error('Earnings error:', err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/royalties/recent');
      setTransactions(res.data || []);
    } catch (err) {
      console.error('Transactions error:', err);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* ========================= */}
      {/* SIDEBAR (NEW 🔥) */}
      {/* ========================= */}
      <div style={styles.sidebar}>
        <h2 style={{ color: '#ff003c' }}>🎵 KASUKU</h2>

        <button style={styles.navBtn} onClick={() => navigate('/dashboard')}>
          Dashboard
        </button>

        <button style={styles.navBtn} onClick={() => navigate('/create-release')}>
          New Release
        </button>

        <button style={styles.navBtn} onClick={() => navigate('/my-music')}>
          My Releases
        </button>

        <button style={styles.navBtn} onClick={() => navigate('/analytics')}>
          Analytics
        </button>

        <button style={styles.navBtn} onClick={() => navigate('/royalties')}>
          Royalties
        </button>

        <button
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

      {/* ========================= */}
      {/* MAIN CONTENT */}
      {/* ========================= */}
      <div style={styles.container}>
        <h1 style={styles.title}>📊 Dashboard</h1>

        {loading ? (
          <p style={{ color: '#aaa' }}>Loading...</p>
        ) : (
          <>
            <div style={styles.grid}>
              <div style={styles.card}>
                <h3>Total Songs 🎵</h3>
                <p style={styles.value}>{stats.totalSongs}</p>
              </div>

              <div style={styles.card}>
                <h3>Total Plays ▶️</h3>
                <p style={styles.value}>{stats.totalPlays}</p>
              </div>

              <div style={styles.card}>
                <h3>Total Releases 📀</h3>
                <p style={styles.value}>{stats.totalReleases}</p>
              </div>
            </div>

            <div style={styles.bigCard}>
              <h2>Total Earnings 💰</h2>
              <p style={styles.bigValue}>${earnings}</p>
            </div>

            <div style={styles.card}>
              <h3>Recent Transactions</h3>

              {transactions.length === 0 ? (
                <p>No transactions yet</p>
              ) : (
                transactions.map((t) => (
                  <div key={t.id} style={styles.tx}>
                    <span>${t.amount}</span>
                    <span>{t.source}</span>
                    <span>
                      {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles: any = {
  wrapper: {
    display: 'flex',
    background: '#0a0a0a',
    minHeight: '100vh',
  },

  sidebar: {
    width: 220,
    background: '#111',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  navBtn: {
    background: '#1c1c1c',
    border: 'none',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    cursor: 'pointer',
    textAlign: 'left',
  },

  logout: {
    marginTop: 'auto',
    background: '#ff003c',
    border: 'none',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    cursor: 'pointer',
  },

  container: {
    flex: 1,
    padding: 20,
    color: '#fff',
  },

  title: {
    marginBottom: 20,
  },

  grid: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },

  card: {
    background: '#141414',
    padding: 20,
    borderRadius: 12,
    minWidth: 200,
    flex: 1,
  },

  bigCard: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },

  value: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#7c3aed',
  },

  bigValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },

  tx: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottom: '1px solid #333',
    paddingBottom: 5,
  },
};