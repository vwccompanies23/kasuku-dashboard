import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Settings() {
  const [tab, setTab] = useState('subscription');
  const [billing, setBilling] = useState(null);
  const [card, setCard] = useState(null);

  // 🔥 NEW (for contact autofill)
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadBilling();
    loadCard();

    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const loadBilling = async () => {
    try {
      const res = await api.get('/billing/me');
      setBilling(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadCard = async () => {
    try {
      const res = await api.get('/billing/card');
      setCard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelPlan = async () => {
    if (!window.confirm('Cancel your subscription?')) return;

    await api.post('/billing/cancel');
    alert('Subscription canceled ❌');
    loadBilling();
  };

  return (
    <div style={styles.container}>
      <h1>⚙️ Settings</h1>

      {/* TABS */}
      <div style={styles.tabs}>
        <button onClick={() => setTab('subscription')}>Subscription</button>
        <button onClick={() => setTab('card')}>Card</button>
        <button onClick={() => setTab('contact')}>Contact</button>
      </div>

      {/* ========================= */}
      {/* SUBSCRIPTION */}
      {/* ========================= */}
      {tab === 'subscription' && (
        <div style={styles.card}>
          <h2>📦 Subscription</h2>

          <p>
            Plan: <b>{billing?.plan || 'free'}</b>
          </p>

          <p>
            Status:{' '}
            {billing?.subscriptionActive ? '✅ Active' : '❌ Inactive'}
          </p>

          <p>
            Billing: <b>{billing?.billing || 'monthly'}</b>
          </p>

          <p>
            Price: <b>${billing?.price || 0}/{billing?.billing || 'month'}</b>
          </p>

          {/* 🔥 NEW */}
          <p>
            Next Billing:{' '}
            {billing?.nextBillingDate || 'N/A'}
          </p>

          {/* 🔥 DEBUG / ADMIN */}
          {billing?.subscriptionId && (
            <p style={{ fontSize: 12, color: '#666' }}>
              ID: {billing.subscriptionId}
            </p>
          )}

          <button onClick={cancelPlan} style={styles.cancel}>
            Cancel Plan
          </button>

          <h3 style={{ marginTop: 20 }}>📜 Billing History</h3>

          {billing?.invoices?.length === 0 && (
            <p>No invoices yet</p>
          )}

          {billing?.invoices?.map((i) => (
            <div key={i.id} style={styles.invoice}>
              <span>${i.amount}</span>
              <span>{new Date(i.date).toLocaleDateString()}</span>
              <span style={styles.paid}>Paid</span>
            </div>
          ))}
        </div>
      )}

      {/* ========================= */}
      {/* CARD */}
      {/* ========================= */}
      {tab === 'card' && (
        <div style={styles.card}>
          <h2>💳 Card</h2>

          {card ? (
            <div>
              <p>**** **** **** {card.last4}</p>
              <p>
                Exp: {card.exp_month}/{card.exp_year}
              </p>

              {/* 🔥 NEW */}
              <button style={styles.updateCard}>
                Update Card
              </button>
            </div>
          ) : (
            <p>No card found ❌</p>
          )}
        </div>
      )}

      {/* ========================= */}
      {/* CONTACT */}
      {/* ========================= */}
      {tab === 'contact' && (
        <div style={styles.card}>
          <h2>📞 Contact Info</h2>

          <input
            placeholder="Full Name"
            style={styles.input}
          />

          <input
            placeholder="Email"
            defaultValue={user?.email}
            style={styles.input}
          />

          <input
            placeholder="Phone"
            style={styles.input}
          />

          <button style={styles.save}>Save</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    color: '#fff',
  },

  tabs: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },

  card: {
    background: '#111',
    padding: 20,
    borderRadius: 12,
  },

  cancel: {
    marginTop: 10,
    background: 'red',
    color: '#fff',
    border: 'none',
    padding: 10,
    borderRadius: 6,
  },

  invoice: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 5,
    background: '#222',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },

  paid: {
    color: '#22c55e',
    fontSize: 12,
  },

  input: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    background: '#000',
    border: '1px solid #333',
    color: '#fff',
  },

  save: {
    marginTop: 10,
    padding: 10,
    background: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
  },

  // 🔥 NEW
  updateCard: {
    marginTop: 10,
    padding: 10,
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
  },
};