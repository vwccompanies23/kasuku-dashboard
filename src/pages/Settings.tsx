import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Settings() {
  const [tab, setTab] = useState('subscription');
  const [billing, setBilling] = useState<any>({});
  const [card, setCard] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();

    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));

    const url = new URL(window.location.href);
    if (url.searchParams.get('success')) {
      alert('✅ Subscription activated!');
      loadBilling();
    }
  }, []);

  const init = async () => {
    try {
      await Promise.all([loadBilling(), loadCard()]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED
  const loadBilling = async () => {
    try {
      const res = await api.get('/billing'); // IMPORTANT
      setBilling(res.data || {});
    } catch (err) {
      console.error('Billing error:', err);
      setBilling({});
    }
  };

  const loadCard = async () => {
    try {
      const res = await api.get('/billing/card');
      setCard(res.data || null);
    } catch (err) {
      console.error('Card error:', err);
      setCard(null);
    }
  };

  const upgrade = async () => {
    try {
      const res = await api.post('/billing/checkout');
      window.location.href = res.data.url;
    } catch {
      alert('Failed to start checkout');
    }
  };

  const updateCard = async () => {
    try {
      const res = await api.post('/billing/portal');
      window.location.href = res.data.url;
    } catch {
      alert('Failed to open billing portal');
    }
  };

  const cancelPlan = async () => {
    if (!window.confirm('Cancel your subscription?')) return;

    try {
      await api.post('/billing/cancel');
      alert('Subscription canceled ❌');
      loadBilling();
    } catch {
      alert('Cancel failed');
    }
  };

  if (loading) {
    return <div style={styles.container}><h2>Loading...</h2></div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚙️ Settings</h1>

      <div style={styles.tabs}>
        {['subscription', 'card', 'contact'].map((t) => (
          <div
            key={t}
            onClick={() => setTab(t)}
            style={{
              ...styles.tab,
              background:
                tab === t
                  ? 'linear-gradient(90deg,#ff003c,#7c3aed)'
                  : '#1a1a1a',
            }}
          >
            {t.toUpperCase()}
          </div>
        ))}
      </div>

      {tab === 'subscription' && (
        <div style={styles.card}>
          <h2>📦 Subscription</h2>

          <p>Plan: <b>{billing?.plan || 'free'}</b></p>
          <p>Status: {billing?.subscriptionActive ? '✅ Active' : '❌ Inactive'}</p>
          <p>Billing: <b>{billing?.billing || 'monthly'}</b></p>
          <p>Price: <b>${billing?.price || 0}/{billing?.billing || 'month'}</b></p>
          <p>Next Billing: {billing?.nextBillingDate || 'N/A'}</p>

          {!billing?.subscriptionActive && (
            <button onClick={upgrade} style={styles.primary}>
              🚀 Upgrade Plan
            </button>
          )}

          {billing?.subscriptionActive && (
            <button onClick={cancelPlan} style={styles.danger}>
              Cancel Plan
            </button>
          )}

          <h3 style={{ marginTop: 20 }}>📜 Billing History</h3>

          {Array.isArray(billing?.invoices) && billing.invoices.length > 0 ? (
            billing.invoices.map((i: any) => (
              <div key={i.id} style={styles.invoice}>
                <span>${i.amount}</span>
                <span>{new Date(i.date).toLocaleDateString()}</span>
                <span style={styles.paid}>Paid</span>
              </div>
            ))
          ) : (
            <p>No invoices yet</p>
          )}
        </div>
      )}

      {tab === 'card' && (
        <div style={styles.card}>
          <h2>💳 Card</h2>

          {card ? (
            <>
              <p>**** **** **** {card.last4}</p>
              <p>Exp: {card.exp_month}/{card.exp_year}</p>

              <button onClick={updateCard} style={styles.primary}>
                Update Card 💳
              </button>
            </>
          ) : (
            <>
              <p>No card found ❌</p>

              <button onClick={upgrade} style={styles.primary}>
                Add Card (Subscribe)
              </button>
            </>
          )}
        </div>
      )}

      {tab === 'contact' && (
        <div style={styles.card}>
          <h2>📞 Contact Info</h2>

          <input placeholder="Full Name" style={styles.input} />
          <input placeholder="Email" defaultValue={user?.email} style={styles.input} />
          <input placeholder="Phone" style={styles.input} />

          <button style={styles.primary}>Save</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: 25, minHeight: '100vh', color: '#fff', background: '#000' },
  title: { fontSize: 28, marginBottom: 20 },
  tabs: { display: 'flex', gap: 10, marginBottom: 20 },
  tab: { padding: '10px 16px', borderRadius: 10, cursor: 'pointer', fontSize: 13 },
  card: { background: '#0a0a0a', padding: 20, borderRadius: 12 },
  invoice: { display: 'flex', justifyContent: 'space-between', marginTop: 6, background: '#111', padding: 10, borderRadius: 8 },
  paid: { color: '#22c55e', fontSize: 12 },
  input: { width: '100%', padding: 12, marginTop: 10, background: '#000', border: '1px solid #333', color: '#fff', borderRadius: 6 },
  primary: { marginTop: 15, padding: 12, width: '100%', border: 'none', borderRadius: 8, background: 'linear-gradient(90deg,#ff003c,#7c3aed)', color: '#fff' },
  danger: { marginTop: 15, padding: 12, border: 'none', borderRadius: 8, background: 'red', color: '#fff' },
};