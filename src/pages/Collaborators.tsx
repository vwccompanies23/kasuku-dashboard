import { useEffect, useState } from 'react';
import { api } from '../api';
import logo from '../assets/kasuku-logo.png';


export default function Collaborators() {
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FORM STATE
  const [email, setEmail] = useState('');
  const [percent, setPercent] = useState('');

  // 🔥 NEW STATES (ADDED ONLY)
  const [earnings, setEarnings] = useState({});
  const [autoPayout, setAutoPayout] = useState({
    enabled: false,
    type: 'instant',
  });

  useEffect(() => {
    loadCollabs();
    loadEarnings();
    loadAutoPayout();
  }, []);

  const loadCollabs = async () => {
    try {
      const res = await api.get('/releases/my-collaborations');
      setCollabs(res.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // =====================
  // 💰 LOAD EARNINGS (NEW)
  // =====================
  const loadEarnings = async () => {
    try {
      const res = await api.get('/earnings/splits');
      setEarnings(res.data || {});
    } catch {}
  };

  // =====================
  // 🚀 LOAD AUTO PAYOUT (NEW)
  // =====================
  const loadAutoPayout = async () => {
    try {
      const res = await api.get('/payments/auto-payout');
      setAutoPayout(res.data);
    } catch {}
  };

  // =====================
  // 🚀 TOGGLE PAYOUT (NEW)
  // =====================
  const toggleAutoPayout = async () => {
    const updated = {
      ...autoPayout,
      enabled: !autoPayout.enabled,
    };

    setAutoPayout(updated);
    await api.post('/payments/auto-payout', updated);
  };

  const changeType = async (type) => {
    const updated = { ...autoPayout, type };
    setAutoPayout(updated);
    await api.post('/payments/auto-payout', updated);
  };

  // =====================
  // ➕ ADD COLLABORATOR
  // =====================
  const addCollaborator = async () => {
    if (!email || !percent) {
      alert('Fill all fields ❌');
      return;
    }

    const total = collabs.reduce((sum, r) => {
      return (
        sum +
        (r.splits?.reduce((s, c) => s + Number(c.percent), 0) || 0)
      );
    }, 0);

    if (total + Number(percent) > 100) {
      alert('Split exceeds 100% ❌');
      return;
    }

    try {
      await api.post('/collaborators/add', {
        email,
        percent: Number(percent),
      });

      setEmail('');
      setPercent('');
      loadCollabs();
    } catch (err) {
      alert('Failed to add ❌');
    }
  };

  // =====================
  // ❌ REMOVE COLLAB
  // =====================
  const removeCollaborator = async (id) => {
    try {
      await api.delete(`/collaborators/${id}`);
      loadCollabs();
    } catch {
      alert('Remove failed ❌');
    }
  };

  // 🔥 CALCULATE TOTAL
  const total = Object.values(earnings).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <img src={logo} style={styles.logo} />
        <h1 style={styles.title}>Collaborator Dashboard</h1>
      </div>

      <div style={styles.container}>

        {/* ===================== */}
        {/* 💰 EARNINGS (NEW) */}
        {/* ===================== */}
        <div style={styles.cardGlow}>
          <h2>💰 Earnings</h2>
          <h3 style={{ color: '#00ff9f' }}>
            Total: ${total.toFixed(2)}
          </h3>

          {Object.entries(earnings).map(([id, amount]) => (
            <div key={id} style={styles.row}>
              <span>Release #{id}</span>
              <span>${amount}</span>
            </div>
          ))}
        </div>

        {/* ===================== */}
        {/* 🚀 AUTO PAYOUT (NEW) */}
        {/* ===================== */}
        <div style={styles.cardGlow}>
          <h2>🚀 Auto Payout</h2>

          <p>
            Status:{' '}
            <span style={{ color: autoPayout.enabled ? '#00ff9f' : '#ff003c' }}>
              {autoPayout.enabled ? 'ON' : 'OFF'}
            </span>
          </p>

          <button style={styles.mainBtn} onClick={toggleAutoPayout}>
            Toggle Auto Payout
          </button>

          <button style={styles.mainBtn} onClick={() => changeType('instant')}>
            ⚡ Instant
          </button>

          <button style={styles.mainBtn} onClick={() => changeType('weekly')}>
            📅 Weekly
          </button>
        </div>

        {/* ===================== */}
        {/* 📊 ANALYTICS (NEW) */}
        {/* ===================== */}
        <div style={styles.cardGlow}>
          <h2>📊 Splits Analytics</h2>

          {Object.entries(earnings).map(([id, amount]) => {
            const percent = total
              ? ((amount / total) * 100).toFixed(1)
              : 0;

            return (
              <div key={id}>
                <div style={styles.row}>
                  <span>Release #{id}</span>
                  <span>{percent}%</span>
                </div>

                <div style={styles.barBg}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${percent}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================== */}
        {/* YOUR ORIGINAL UI (UNCHANGED) */}
        {/* ===================== */}
        {loading ? (
          <p>Loading...</p>
        ) : collabs.length === 0 ? (
          <p style={{ color: '#888' }}>No collaborations yet</p>
        ) : (
          collabs.map((release) => (
            <div key={release.id} style={styles.cardGlow}>
              <h2>{release.title}</h2>

              {release.splits?.map((s, i) => (
                <div key={i} style={styles.row}>
                  <span>{s.email}</span>
                  <span style={{ color: '#00ff9f' }}>
                    {s.percent}%
                  </span>

                  <button
                    style={styles.btnDanger}
                    onClick={() => removeCollaborator(s.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ))
        )}

        {/* ➕ ADD COLLAB (UNCHANGED) */}
        <div style={styles.cardGlow}>
          <h2>Add Collaborator</h2>

          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Split %"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
          />

          <button style={styles.mainBtn} onClick={addCollaborator}>
            Add Collaborator
          </button>
        </div>
      </div>
    </div>
  );
}

// 🎨 STYLES (ONLY ADDED SMALL THINGS)
const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#fff',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderBottom: '1px solid #111',
  },

  logo: {
    width: 45,
    marginRight: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  container: {
    maxWidth: 700,
    margin: '40px auto',
  },

  cardGlow: {
    background: 'linear-gradient(135deg,#141414,#1f0033)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },

  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    background: '#0f0f0f',
    border: '1px solid #222',
    color: '#fff',
  },

  mainBtn: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 8,
  },

  btnDanger: {
    marginLeft: 10,
    padding: '4px 10px',
    border: 'none',
    borderRadius: 6,
    background: '#ff003c',
    color: '#fff',
    cursor: 'pointer',
  },

  barBg: {
    height: 6,
    background: '#222',
    borderRadius: 10,
    marginTop: 4,
  },

  barFill: {
    height: 6,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    borderRadius: 10,
  },
};