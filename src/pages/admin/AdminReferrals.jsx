import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function ReferralsAdmin() {
  const [users, setUsers] = useState([]);
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchGlobal();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data || []);
  };

  const fetchGlobal = async () => {
    const res = await api.get('/admin/settings');
    setGlobalEnabled(res.data?.referralSystemEnabled);
  };

  const toggleGlobal = async () => {
    const newState = !globalEnabled;
    setGlobalEnabled(newState);

    await api.post('/admin/settings/referral', {
      enabled: newState,
    });
  };

  const toggleReferral = async (userId, current) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === userId
          ? { ...u, referralEnabled: !current }
          : u
      )
    );

    await api.patch(`/referrals/toggle/${userId}`, {
      enabled: !current,
    });
  };

  // 🔍 FILTER
  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 STATS
  const total = users.length;
  const enabledCount = users.filter(u => u.referralEnabled).length;

  // 📈 LEADERBOARD
  const leaderboard = [...users]
    .sort((a, b) => (b.referralCount || 0) - (a.referralCount || 0))
    .slice(0, 5);

  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>🎯 Referral Control</h1>

      {/* 📊 STATS */}
      <div style={styles.stats}>
        <div style={styles.statBox}>
          <p>Total Users</p>
          <h2>{total}</h2>
        </div>

        <div style={styles.statBox}>
          <p>Referral Enabled</p>
          <h2 style={{ color: '#22c55e' }}>{enabledCount}</h2>
        </div>
      </div>

      {/* 🌍 GLOBAL */}
      <div style={styles.globalCard}>
        <div>
          <p style={{ fontWeight: 'bold' }}>Global Referral</p>
          <p style={{ fontSize: 12 }}>
            {globalEnabled ? 'ENABLED' : 'DISABLED'}
          </p>
        </div>

        <button
          onClick={toggleGlobal}
          style={styles.gradientBtn}
        >
          {globalEnabled ? 'Disable All' : 'Enable All'}
        </button>
      </div>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* 👥 USER CONTROL */}
      <div>
        {filtered.map((u) => (
          <div key={u.id} style={styles.card}>
            <div>
              <p style={{ fontWeight: 'bold' }}>{u.email}</p>

              <p style={styles.small}>
                Referrals: {u.referralEnabled ? 'ON' : 'OFF'}
              </p>

              {/* 🎁 REWARD */}
              {u.subscriptionEndsAt && (
                <p style={styles.reward}>
                  🎁 Free active
                </p>
              )}

              {/* 🚨 SPAM DETECTION */}
              {u.referralCount > 10 && (
                <p style={styles.warning}>
                  🚨 Suspicious activity
                </p>
              )}
            </div>

            <button
              onClick={() => toggleReferral(u.id, u.referralEnabled)}
              style={styles.gradientBtn}
            >
              {u.referralEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
        ))}
      </div>

      {/* 📊 WHO INVITED WHO */}
      <div style={styles.section}>
        <h2>👥 Referral Network</h2>

        {users.map((u) => (
          u.referredBy && (
            <div key={u.id} style={styles.network}>
              <span>{u.email}</span>
              <span style={{ color: '#888' }}>
                invited by → {u.referredBy}
              </span>
            </div>
          )
        ))}
      </div>

      {/* 📈 LEADERBOARD */}
      <div style={styles.section}>
        <h2>🏆 Top Referrers</h2>

        {leaderboard.map((u, i) => (
          <div key={u.id} style={styles.leader}>
            <span>#{i + 1}</span>
            <span>{u.email}</span>
            <span>{u.referralCount || 0} invites</span>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: 25,
    color: '#fff',
    background: '#020617',
    minHeight: '100vh',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  stats: {
    display: 'flex',
    gap: 10,
    marginTop: 20,
  },

  statBox: {
    flex: 1,
    background: '#0f172a',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
  },

  globalCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#0f172a',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  search: {
    width: '100%',
    padding: 12,
    marginTop: 20,
    background: '#0f172a',
    border: '1px solid #222',
    color: '#fff',
    borderRadius: 10,
  },

  card: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#0f172a',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  small: {
    fontSize: 12,
    color: '#888',
  },

  reward: {
    color: '#22c55e',
    fontSize: 12,
  },

  warning: {
    color: '#ff003c',
    fontSize: 12,
  },

  gradientBtn: {
    padding: '8px 14px',
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    cursor: 'pointer',
  },

  section: {
    marginTop: 30,
  },

  network: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    background: '#111',
    borderRadius: 8,
    marginTop: 5,
  },

  leader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    background: '#111',
    borderRadius: 8,
    marginTop: 5,
  },
};