import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminSubscriptions() {
  const [plans, setPlans] = useState([]);
  const [editing, setEditing] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await api.get(
        '/admin/subscriptions',
      );

      setPlans(res.data);

      const initial = {};

      res.data.forEach((p) => {
        initial[p.id] = {
          monthlyPrice:
            p.monthlyPrice,
          yearlyPrice:
            p.yearlyPrice,
        };
      });

      setEditing(initial);

    } catch (err) {
      console.log(
        'Failed to load plans',
      );
    }
  };

  const handleChange = (
    id,
    field,
    value,
  ) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const savePlan = async (
    id,
  ) => {
    try {
      setLoading(true);

      await api.patch(
        `/admin/subscriptions/${id}`,
        {
          monthlyPrice:
            Number(
              editing[id]
                .monthlyPrice,
            ),

          yearlyPrice:
            Number(
              editing[id]
                .yearlyPrice,
            ),
        },
      );

      alert(
        '✅ Subscription updated successfully',
      );

      loadPlans();

    } catch (err) {
      console.log(err);

      alert(
        '❌ Failed to update subscription',
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* GLOW */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      <div style={styles.container}>
        <h1 style={styles.title}>
          💰 Subscription Control
        </h1>

        <p style={styles.subtitle}>
          Manage Kasuku pricing
          globally in real-time
        </p>

        <div style={styles.grid}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'translateY(-10px)';

                e.currentTarget.style.boxShadow =
                  '0 0 50px rgba(124,58,237,0.28)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  'translateY(0px)';

                e.currentTarget.style.boxShadow =
                  '0 0 25px rgba(0,0,0,0.35)';
              }}
            >
              <div
                style={styles.planIcon}
              >
                {plan.name ===
                'solo'
                  ? '🎤'
                  : plan.name ===
                    'artists'
                  ? '🎸'
                  : '🏢'}
              </div>

              <h2 style={styles.planName}>
                {plan.name
                  .charAt(0)
                  .toUpperCase() +
                  plan.name.slice(1)}
              </h2>

              {/* MONTHLY */}
              <div style={styles.row}>
                <label
                  style={styles.label}
                >
                  Monthly Price ($)
                </label>

                <input
                  type="number"
                  value={
                    editing[
                      plan.id
                    ]
                      ?.monthlyPrice ||
                    ''
                  }
                  onChange={(e) =>
                    handleChange(
                      plan.id,
                      'monthlyPrice',
                      e.target.value,
                    )
                  }
                  style={styles.input}
                />
              </div>

              {/* YEARLY */}
              <div style={styles.row}>
                <label
                  style={styles.label}
                >
                  Yearly Price ($)
                </label>

                <input
                  type="number"
                  value={
                    editing[
                      plan.id
                    ]
                      ?.yearlyPrice ||
                    ''
                  }
                  onChange={(e) =>
                    handleChange(
                      plan.id,
                      'yearlyPrice',
                      e.target.value,
                    )
                  }
                  style={styles.input}
                />
              </div>

              {/* LIVE PREVIEW */}
              <div
                style={
                  styles.preview
                }
              >
                <p>
                  Monthly:
                  <span
                    style={
                      styles.previewPrice
                    }
                  >
                    $
                    {
                      editing[
                        plan.id
                      ]
                        ?.monthlyPrice
                    }
                  </span>
                </p>

                <p>
                  Yearly:
                  <span
                    style={
                      styles.previewPrice
                    }
                  >
                    $
                    {
                      editing[
                        plan.id
                      ]
                        ?.yearlyPrice
                    }
                  </span>
                </p>
              </div>

              {/* SAVE */}
              <button
                onClick={() =>
                  savePlan(
                    plan.id,
                  )
                }
                style={
                  plan.name ===
                  'artists'
                    ? styles.activeButton
                    : styles.button
                }
                disabled={
                  loading
                }
              >
                {loading
                  ? 'Saving...'
                  : '💾 Save Changes'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'linear-gradient(180deg,#050505,#000)',
    overflow: 'hidden',
    position: 'relative',
    padding: '80px 20px',
    color: '#fff',
  },

  bgGlow1: {
    position: 'absolute',
    width: 500,
    height: 500,
    background:
      'rgba(124,58,237,0.16)',
    borderRadius: '50%',
    filter: 'blur(120px)',
    top: -150,
    left: -100,
  },

  bgGlow2: {
    position: 'absolute',
    width: 500,
    height: 500,
    background:
      'rgba(255,0,80,0.15)',
    borderRadius: '50%',
    filter: 'blur(120px)',
    bottom: -200,
    right: -100,
  },

  container: {
    maxWidth: 1300,
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },

  title: {
    fontSize: 52,
    fontWeight: 800,
    marginBottom: 10,
    textAlign: 'center',
    background:
      'linear-gradient(90deg,#fff,#ff4da6)',
    WebkitBackgroundClip:
      'text',
    WebkitTextFillColor:
      'transparent',
  },

  subtitle: {
    textAlign: 'center',
    color: '#9ca3af',
    marginBottom: 50,
    fontSize: 18,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(320px,1fr))',
    gap: 30,
  },

  card: {
    background:
      'rgba(0,0,0,0.82)',
    border:
      '1px solid rgba(255,255,255,0.08)',
    borderRadius: 28,
    padding: 35,
    backdropFilter: 'blur(20px)',
    transition: '0.35s',
    boxShadow:
      '0 0 25px rgba(0,0,0,0.35)',
  },

  planIcon: {
    fontSize: 42,
    marginBottom: 18,
  },

  planName: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 30,
  },

  row: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 22,
  },

  label: {
    marginBottom: 10,
    color: '#ccc',
    fontSize: 15,
  },

  input: {
    padding: 15,
    borderRadius: 14,
    border:
      '1px solid rgba(255,255,255,0.08)',
    background: '#050505',
    color: '#fff',
    fontSize: 17,
    outline: 'none',
  },

  preview: {
    marginTop: 10,
    marginBottom: 30,
    padding: 18,
    borderRadius: 16,
    background:
      'rgba(255,255,255,0.03)',
    border:
      '1px solid rgba(255,255,255,0.05)',
    color: '#ddd',
    lineHeight: 1.8,
  },

  previewPrice: {
    marginLeft: 10,
    color: '#ff2d7a',
    fontWeight: 700,
  },

  button: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    border:
      '1px solid rgba(168,85,247,0.2)',
    background:
      'rgba(124,58,237,0.08)',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    transition: '0.3s',
    fontSize: 16,
  },

  activeButton: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff0066,#7c3aed)',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow:
      '0 0 30px rgba(168,85,247,0.28)',
    fontSize: 16,
  },
};