import { useEffect, useState } from 'react';
import { api } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/kasuku-logo.png';

export default function Payment() {

  const location = useLocation();
  const navigate = useNavigate();

  const [plan, setPlan] = useState('');
  const [billing, setBilling] = useState('monthly');

  const [loading, setLoading] = useState(false);

  // =========================
  // LOAD PLAN + BILLING
  // =========================
  useEffect(() => {

    const params =
      new URLSearchParams(location.search);

    const urlPlan =
      params.get('plan');

    const urlBilling =
      params.get('billing');

    const savedPlan =
      localStorage.getItem('selectedPlan');

    const savedBilling =
      localStorage.getItem('selectedBilling');

    // ✅ PRIORITY = URL PARAMS
    const finalPlan =
      urlPlan || savedPlan || '';

    const finalBilling =
      urlBilling || savedBilling || 'monthly';

    setPlan(finalPlan);

    setBilling(finalBilling);

    // ✅ KEEP STORAGE UPDATED
    if (finalPlan) {
      localStorage.setItem(
        'selectedPlan',
        finalPlan
      );
    }

    if (finalBilling) {
      localStorage.setItem(
        'selectedBilling',
        finalBilling
      );
    }

  }, [location]);

  // =========================
  // PAYMENT
  // =========================
  const handlePayment = async () => {

    if (!plan) {

      alert('No plan selected ❌');

      navigate('/pricing');

      return;
    }

    setLoading(true);

    try {

      const res = await api.post(
        '/payments/subscribe',
        {
          plan,
          billing,
        }
      );

      const data = res.data;

      console.log(
        'PAYMENT RESPONSE:',
        data
      );

      if (!data?.url) {

        alert(
          'Stripe checkout failed ❌'
        );

        setLoading(false);

        return;
      }

      // ✅ REDIRECT TO STRIPE
      window.location.href =
        data.url;

    } catch (err) {

      console.error(
        'PAYMENT ERROR:',
        err
      );

      alert(
        'Payment failed ❌'
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        {/* LOGO */}
        <img
          src={logo}
          alt="Kasuku"
          style={styles.logo}
        />

        <h1 style={styles.title}>
          Complete Your Subscription
        </h1>

        <p style={styles.subtitle}>
          Secure your music distribution
          plan and unlock premium
          features with Kasuku.
        </p>

        {/* PLAN */}
        <p style={styles.plan}>
          Selected Plan:{' '}

          <span
            style={{
              color: '#ff003c',
            }}
          >
            {plan
              ? plan.toUpperCase()
              : 'NONE'}
          </span>
        </p>

        {/* BILLING */}
        <p style={styles.plan}>
          Billing:{' '}

          <span
            style={{
              color: '#7c3aed',
            }}
          >
            {billing.toUpperCase()}
          </span>
        </p>

        {/* BUTTON */}
        <button
          onClick={handlePayment}
          style={styles.payBtn}
          disabled={loading}
        >
          {loading
            ? 'Processing...'
            : `Pay ${billing.toUpperCase()} 💳`}
        </button>

        <p style={styles.secureText}>
          🔒 Powered securely by Stripe
        </p>

      </div>

    </div>
  );
}

const styles: any = {

  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'radial-gradient(circle at top, #1a002b, #020617, #000)',
    color: '#fff',
    padding: 20,
  },

  card: {
    width: 430,
    maxWidth: '100%',
    padding: 35,
    borderRadius: 24,
    background:
      'rgba(10,10,10,0.95)',
    textAlign: 'center',
    border:
      '1px solid rgba(255,255,255,0.08)',
    boxShadow:
      '0 0 60px rgba(124,58,237,0.45)',
    backdropFilter: 'blur(20px)',
  },

  logo: {
    width: 95,
    marginBottom: 10,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#aaa',
    fontSize: 15,
    lineHeight: 1.7,
    marginBottom: 25,
  },

  plan: {
    marginTop: 10,
    color: '#ccc',
    fontSize: 17,
  },

  payBtn: {
    marginTop: 30,
    width: '100%',
    padding: 15,
    borderRadius: 14,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 17,
    transition: '0.3s',
  },

  secureText: {
    marginTop: 18,
    color: '#777',
    fontSize: 13,
    letterSpacing: 0.5,
  },
};