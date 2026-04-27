import { useEffect, useState } from 'react';

export default function Payment() {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) setPlan(savedPlan);
  }, []);

  const handlePayment = async () => {
    if (!plan) {
      alert('No plan selected ❌');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/payments/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          billing: 'monthly',
        }),
      });

      const data = await res.json();

      console.log('FULL RESPONSE:', data);

      if (!data || !data.url) {
        alert('Payment failed: No Stripe URL ❌');
        setLoading(false);
        return;
      }

      window.location.href = data.url;

    } catch (err) {
      console.error('PAYMENT ERROR:', err);
      alert('Payment failed ❌');
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Complete Your Subscription</h1>

        <p style={styles.plan}>
          Selected Plan:{' '}
          <span style={{ color: '#ff003c' }}>
            {plan ? plan.toUpperCase() : 'NONE'}
          </span>
        </p>

        <button
          onClick={handlePayment}
          style={styles.payBtn}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay with Card 💳'}
        </button>
      </div>
    </div>
  );
}

// ✅ FIXED styles
const styles: any = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'radial-gradient(circle at top, #1a002b, #020617, #000)',
    color: '#fff',
    padding: 20,
  },

  card: {
    width: 400,
    maxWidth: '100%',
    padding: 30,
    borderRadius: 16,
    background: '#0a0a0a',
    textAlign: 'center',
    boxShadow: '0 0 60px rgba(124,58,237,0.8)',
  },

  title: {
    color: '#ff003c',
    fontSize: 24,
  },

  plan: {
    marginTop: 15,
    color: '#aaa',
    fontSize: 16,
  },

  payBtn: {
    marginTop: 25,
    width: '100%',
    padding: 14,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 16,
  },
};