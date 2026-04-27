import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifySubscription();
  }, []);

  const verifySubscription = async () => {
    try {
      // 🔥 fetch updated user
      const res = await api.get('/users/me');

      // 🔥 SAVE USER (IMPORTANT)
      localStorage.setItem('user', JSON.stringify(res.data));

      // ✅ ADDED: get redirect target
      const redirect = localStorage.getItem('redirectAfterPayment') || '/dashboard';

      // ✅ ADDED: clear after use (important)
      localStorage.removeItem('redirectAfterPayment');

      setTimeout(() => {
        navigate(redirect); // 🔥 dynamic redirect
      }, 2000);

    } catch (err) {
      console.error(err);

      // ✅ ADDED: fallback (if user not logged in yet)
      navigate('/login');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>✅ Payment Successful</h1>
        <p>Your subscription is now active 🚀</p>

        {loading && <p>Updating your account...</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#000',
    color: '#fff',
  },
  card: {
    background: '#111',
    padding: 30,
    borderRadius: 12,
    textAlign: 'center',
  },
};