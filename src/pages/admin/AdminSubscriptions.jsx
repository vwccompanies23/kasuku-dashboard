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
      const res = await api.get('/admin/subscriptions');
      setPlans(res.data);

      // initialize local editing state
      const initial = {};
      res.data.forEach((p) => {
        initial[p.id] = {
          monthlyPrice: p.monthlyPrice,
          yearlyPrice: p.yearlyPrice,
        };
      });
      setEditing(initial);
    } catch {
      console.log('Failed to load plans');
    }
  };

  // ✅ update local state (NOT backend yet)
  const handleChange = (id, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // ✅ save button (SAFE for Stripe)
  const savePlan = async (id) => {
    try {
      setLoading(true);

      await api.patch(`/admin/subscriptions/${id}`, {
        monthlyPrice: Number(editing[id].monthlyPrice),
        yearlyPrice: Number(editing[id].yearlyPrice),
      });

      alert('✅ Updated successfully');
      loadPlans();
    } catch {
      alert('❌ Failed to update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>💰 Subscription Control</h2>

      {plans.map((plan) => (
        <div key={plan.id} style={styles.card}>
          <h3>{plan.name}</h3>

          <div style={styles.row}>
            <label>Monthly Price ($)</label>
            <input
              type="number"
              value={editing[plan.id]?.monthlyPrice || ''}
              onChange={(e) =>
                handleChange(plan.id, 'monthlyPrice', e.target.value)
              }
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <label>Yearly Price ($)</label>
            <input
              type="number"
              value={editing[plan.id]?.yearlyPrice || ''}
              onChange={(e) =>
                handleChange(plan.id, 'yearlyPrice', e.target.value)
              }
              style={styles.input}
            />
          </div>

          {/* ✅ SAVE BUTTON (THIS WAS MISSING) */}
          <button
            onClick={() => savePlan(plan.id)}
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    padding: 30,
    background: '#0b0f19',
    minHeight: '100vh',
    color: '#fff',
  },

  title: {
    marginBottom: 20,
  },

  card: {
    background: '#111827',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  row: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: '1px solid #333',
    background: '#000',
    color: '#fff',
  },

  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '600',
  },
};