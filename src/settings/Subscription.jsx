import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const [data, setData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get('/billing/me');
    setData(res.data);
  };

  const isAdmin = data?.role === 'admin';
  const isManaged = data?.isManaged === true;

  // 🌍 Currency (USD / CDF)
  const currency = data?.currency || 'USD';
  const symbol = currency === 'CDF' ? 'FC' : '$';

  const cancelPlan = async () => {
    if (isAdmin || isManaged) {
      return alert('This account does not use subscriptions 🚀');
    }

    await api.post('/billing/cancel');
    load();
  };

  const upgrade = () => {
    if (isAdmin || isManaged) {
      alert('No subscription required for this account 🚀');
      return;
    }

    if (!selectedPlan) return alert('Select a plan');

    localStorage.setItem('selectedPlan', selectedPlan);
    navigate('/payment');
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div style={styles.container}>

      <h1>Subscription</h1>

      {/* PLAN BOX */}
      <div style={styles.box}>
        <h3>{data.plan}</h3>

        <p>
          {symbol}{data.price}/month
        </p>

        <p style={{ color: data.active ? 'green' : 'red' }}>
          {data.active ? 'Active' : 'Inactive'}
        </p>

        {/* 👑 ADMIN */}
        {isAdmin && (
          <div style={styles.adminBadge}>
            ADMIN • PRO ACCESS
          </div>
        )}

        {/* 🟣 MANAGED USER */}
        {isManaged && (
          <div style={styles.managedBadge}>
            Managed Account • Revenue Share 40–70%
          </div>
        )}

        {/* ❌ CANCEL ONLY FOR NORMAL USERS */}
        {!isAdmin && !isManaged && (
          <button onClick={cancelPlan}>
            Cancel Plan ❌
          </button>
        )}
      </div>

      {/* 🔥 PLAN SELECT (ONLY NORMAL USERS) */}
      {!isAdmin && !isManaged && (
        <>
          <h3>Upgrade Plan</h3>

          <div style={styles.grid}>
            {['solo', 'artists', 'pro'].map((p) => (
              <div
                key={p}
                onClick={() => setSelectedPlan(p)}
                style={{
                  ...styles.card,
                  ...(selectedPlan === p ? styles.active : {}),
                }}
              >
                {p}
              </div>
            ))}
          </div>

          <button onClick={upgrade}>
            Upgrade 🚀
          </button>
        </>
      )}

    </div>
  );
}

const styles = {
  container: { color: '#fff' },

  box: {
    background: '#111',
    padding: 20,
    borderRadius: 10,
  },

  adminBadge: {
    marginTop: 10,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    padding: '6px 10px',
    borderRadius: 10,
  },

  managedBadge: {
    marginTop: 10,
    background: '#22c55e',
    padding: '6px 10px',
    borderRadius: 10,
  },

  grid: {
    display: 'flex',
    gap: 20,
    marginTop: 20,
  },

  card: {
    padding: 20,
    background: '#222',
    cursor: 'pointer',
    borderRadius: 10,
  },

  active: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
  },
};