import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {

  const [data, setData] = useState(null);

  const [billing, setBilling] =
    useState('monthly');

  const [selected, setSelected] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  // =========================
  // LOAD BILLING DATA
  // =========================

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    try {

      setLoading(true);

      const res =
        await api.get('/billing/me');

      setData(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // UPGRADE
  // =========================

  const upgrade = () => {

    if (!selected) {

      alert('Please select a plan');

      return;
    }

    // ✅ SAVE PLAN
    localStorage.setItem(
      'selectedPlan',
      selected,
    );

    // ✅ SAVE BILLING
    localStorage.setItem(
      'selectedBilling',
      billing,
    );

    // ✅ PAYMENT PAGE
    navigate(
      `/payment?plan=${selected}&billing=${billing}`
    );
  };

  // =========================
  // PLANS
  // =========================

  const plans = [

    {
      id: 'solo',

      name: 'Solo Artist',

      monthly: '$1.75',

      yearly: '$20.99',

      desc:
        'Perfect for independent artists',

      popular: false,
    },

    {
      id: 'artists',

      name: 'Artists',

      monthly: '$2.08',

      yearly: '$24.99',

      desc:
        'Best for groups and teams',

      popular: true,
    },

    {
      id: 'pro',

      name: 'Pro',

      monthly: '$5.08',

      yearly: '$60.99',

      desc:
        'Advanced tools for labels and professionals',

      popular: false,
    },

  ];

  // =========================
  // FREE ACCESS
  // =========================

  const isFreeAccess =
    data?.freeAccess === true;

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div style={styles.loadingWrap}>

        <p style={styles.loading}>
          Loading...
        </p>

      </div>

    );
  }

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        {/* HEADER */}

        <div style={styles.header}>

          <h1 style={styles.title}>
            Subscription
          </h1>

          <p style={styles.subtitle}>
            Choose the plan that fits
            your music career.
          </p>

        </div>

        {/* FREE ACCESS */}

        {isFreeAccess && (

          <div style={styles.freeBox}>

            <div style={styles.freeTitle}>
              🚀 Free Access Enabled
            </div>

            <div style={styles.freeText}>
              This account can use Kasuku
              without an active subscription.
            </div>

          </div>

        )}

        {/* CURRENT PLAN */}

        {!isFreeAccess && (

          <div style={styles.current}>

            <div>

              <div style={styles.currentLabel}>
                Current Plan
              </div>

              <div style={styles.currentPlan}>
                {
                  data?.plan?.toUpperCase() ||
                  'FREE'
                }
              </div>

            </div>

            <div
              style={{
                ...styles.status,

                background:
                  data?.active
                    ? 'rgba(0,255,120,0.15)'
                    : 'rgba(255,0,60,0.15)',

                color:
                  data?.active
                    ? '#00ff88'
                    : '#ff4d6d',
              }}
            >
              {data?.active
                ? 'ACTIVE'
                : 'INACTIVE'}
            </div>

          </div>

        )}

        {/* BILLING TOGGLE */}

        <div style={styles.toggleWrap}>

          <div style={styles.toggle}>

            <button
              onClick={() =>
                setBilling('monthly')
              }
              style={{
                ...styles.toggleBtn,

                ...(billing ===
                'monthly'
                  ? styles.activeToggle
                  : {}),
              }}
            >
              Monthly
            </button>

            <button
              onClick={() =>
                setBilling('yearly')
              }
              style={{
                ...styles.toggleBtn,

                ...(billing ===
                'yearly'
                  ? styles.activeToggle
                  : {}),
              }}
            >
              Yearly
            </button>

          </div>

        </div>

        {/* PLAN CARDS */}

        <div style={styles.cards}>

          {plans.map((p) => {

            const active =
              selected === p.id;

            return (

              <div
                key={p.id}
                onClick={() =>
                  setSelected(p.id)
                }
                style={{
                  ...styles.card,

                  ...(active
                    ? styles.cardActive
                    : {}),
                }}
              >

                {p.popular && (

                  <div style={styles.badge}>
                    Most Popular
                  </div>

                )}

                <div style={styles.planName}>
                  {p.name}
                </div>

                <div style={styles.desc}>
                  {p.desc}
                </div>

                <div style={styles.price}>
                  {
                    billing ===
                    'monthly'
                      ? p.monthly
                      : p.yearly
                  }
                </div>

                <div style={styles.sub}>
                  per{' '}
                  {billing ===
                  'monthly'
                    ? 'month'
                    : 'year'}
                </div>

                <button
                  style={{
                    ...styles.cardBtn,

                    ...(active
                      ? styles.cardBtnActive
                      : {}),
                  }}
                >
                  {active
                    ? 'Selected'
                    : 'Choose Plan'}
                </button>

              </div>

            );
          })}

        </div>

        {/* BUTTON */}

        <button
          onClick={upgrade}
          style={styles.upgrade}
        >
          Continue 🚀
        </button>

      </div>

    </div>
  );
}

const styles = {

  page: {
    width: '100%',
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top,#160028,#050510,#000)',
    padding: 20,
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },

  container: {
    width: '100%',
    maxWidth: 1400,
    margin: '0 auto',
    color: '#fff',
  },

  loadingWrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
  },

  loading: {
    color: '#fff',
    fontSize: 18,
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 'clamp(28px,5vw,42px)',
    marginBottom: 10,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#aaa',
    fontSize: 'clamp(14px,2vw,16px)',
    lineHeight: 1.7,
    maxWidth: 700,
  },

  freeBox: {
    padding: 25,
    borderRadius: 24,
    marginBottom: 30,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
  },

  freeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  freeText: {
    fontSize: 15,
    lineHeight: 1.7,
  },

  current: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 25,
    marginBottom: 30,
  },

  currentLabel: {
    color: '#888',
    marginBottom: 6,
    fontSize: 13,
  },

  currentPlan: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  status: {
    padding: '10px 18px',
    borderRadius: 100,
    fontWeight: 'bold',
    fontSize: 13,
  },

  toggleWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 40,
  },

  toggle: {
    display: 'flex',
    background: '#111',
    borderRadius: 100,
    padding: 6,
    gap: 8,
    flexWrap: 'wrap',
  },

  toggleBtn: {
    border: 'none',
    background: 'transparent',
    color: '#fff',
    padding: '12px 22px',
    borderRadius: 100,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 14,
    minWidth: 120,
  },

  activeToggle: {
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
  },

  cards: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(280px,1fr))',
    gap: 25,
    marginBottom: 35,
  },

  card: {
    position: 'relative',
    background:
      'rgba(255,255,255,0.04)',
    border:
      '1px solid rgba(255,255,255,0.08)',
    borderRadius: 28,
    padding: 30,
    cursor: 'pointer',
    transition: '0.3s',
    backdropFilter: 'blur(20px)',
  },

  cardActive: {
    border:
      '2px solid rgba(124,58,237,0.9)',
    boxShadow:
      '0 0 40px rgba(124,58,237,0.4)',
    transform: 'translateY(-5px)',
  },

  badge: {
    position: 'absolute',
    top: 18,
    right: 18,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    padding: '6px 12px',
    borderRadius: 100,
    fontSize: 11,
    fontWeight: 'bold',
  },

  planName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 14,
  },

  desc: {
    color: '#aaa',
    lineHeight: 1.7,
    minHeight: 50,
    marginBottom: 25,
  },

  price: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ff2d55',
  },

  sub: {
    color: '#888',
    marginTop: 8,
    marginBottom: 30,
  },

  cardBtn: {
    width: '100%',
    padding: 14,
    borderRadius: 16,
    border: 'none',
    background: '#1a1a1a',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 15,
  },

  cardBtnActive: {
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
  },

  upgrade: {
    width: '100%',
    padding: 18,
    borderRadius: 18,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    cursor: 'pointer',
  },

};