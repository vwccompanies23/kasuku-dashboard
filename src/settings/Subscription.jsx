import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const [data, setData] = useState(null);
  const [billing, setBilling] = useState('monthly');
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get('/billing/me');
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const upgrade = () => {
    if (!selected) return alert('Select a plan');

    localStorage.setItem('selectedPlan', selected);
    localStorage.setItem('billingType', billing);

    navigate('/payment');
  };

  if (!data) return <p style={{ color: '#fff' }}>Loading...</p>;

  const isFreeAccess = data?.freeAccess === true;

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Subscription</h1>

      {/* FREE ACCESS MESSAGE */}
      {isFreeAccess && (
        <div style={styles.freeBox}>
          🚀 This account has FREE ACCESS  
          <br />
          No subscription required for now
        </div>
      )}

      {/* CURRENT PLAN */}
      {!isFreeAccess && (
        <div style={styles.current}>
          <h2>{data.plan?.toUpperCase() || 'FREE'}</h2>
          <p>{data.active ? 'Active ✅' : 'Inactive ❌'}</p>
        </div>
      )}

      {/* TOGGLE */}
      {!isFreeAccess && (
        <div style={styles.toggle}>
          <div
            onClick={() => setBilling('monthly')}
            style={{
              ...styles.toggleBtn,
              ...(billing === 'monthly' ? styles.activeToggle : {})
            }}
          >
            Monthly
          </div>

          <div
            onClick={() => setBilling('yearly')}
            style={{
              ...styles.toggleBtn,
              ...(billing === 'yearly' ? styles.activeToggle : {})
            }}
          >
            Yearly
          </div>
        </div>
      )}

      {/* CARDS */}
      {!isFreeAccess && (
        <div style={styles.cards}>

          {[
            {
              id: 'solo',
              name: 'Solo Artist',
              monthly: '$1.75',
              yearly: '$20.99',
              desc: 'Perfect for independent artists'
            },
            {
              id: 'artists',
              name: 'Artists',
              monthly: '$2.08',
              yearly: '$24.99',
              desc: 'For bands and duos',
              popular: true
            },
            {
              id: 'pro',
              name: 'Pro',
              monthly: '$5.08',
              yearly: '$60.99',
              desc: 'For professionals and labels'
            }
          ].map((p) => {
            const active = selected === p.id;

            return (
              <div
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  ...styles.card,
                  ...(active ? styles.cardActive : {})
                }}
              >
                {p.popular && (
                  <div style={styles.badge}>Most Popular</div>
                )}

                <h2>{p.name}</h2>
                <p style={styles.desc}>{p.desc}</p>

                <h1 style={styles.price}>
                  {billing === 'monthly' ? p.monthly : p.yearly}
                </h1>

                <p style={styles.sub}>
                  /{billing === 'monthly' ? 'month' : 'year'}
                </p>

                <button style={styles.cardBtn}>
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* UPGRADE BUTTON */}
      {!isFreeAccess && (
        <button style={styles.upgrade} onClick={upgrade}>
          Upgrade 🚀
        </button>
      )}

    </div>
  );
}


const styles = {
  container: {
    color: '#fff',
  },

  title: {
    fontSize: 32,
    marginBottom: 20,
  },

  freeBox: {
    padding: 20,
    borderRadius: 16,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },

  current: {
    background: '#111',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },

  toggle: {
    display: 'flex',
    gap: 10,
    marginBottom: 30,
  },

  toggleBtn: {
    padding: 10,
    borderRadius: 20,
    background: '#222',
    cursor: 'pointer',
  },

  activeToggle: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
  },

  cards: {
    display: 'flex',
    gap: 20,
  },

  card: {
    flex: 1,
    padding: 25,
    borderRadius: 20,
    background: '#0f0f0f',
    border: '1px solid #222',
    textAlign: 'center',
    cursor: 'pointer',
    transition: '0.3s',
    position: 'relative',
  },

  cardActive: {
    border: '2px solid #7c3aed',
    boxShadow: '0 0 25px rgba(124,58,237,0.7)',
    transform: 'scale(1.05)',
  },

  badge: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#7c3aed',
    padding: '5px 12px',
    borderRadius: 10,
    fontSize: 12,
  },

  desc: {
    color: '#aaa',
  },

  price: {
    fontSize: 30,
    color: '#ff003c',
  },

  sub: {
    fontSize: 12,
    color: '#aaa',
  },

  cardBtn: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    cursor: 'pointer',
  },

  upgrade: {
    marginTop: 30,
    width: '100%',
    padding: 15,
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};