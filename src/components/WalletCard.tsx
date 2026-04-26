import { useEffect, useState } from 'react';
import { api } from '../api';
import TransactionList from './TransactionList';
import toast from 'react-hot-toast';

export default function WalletCard({ refresh }: any) {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(50);
  const [txRefresh, setTxRefresh] = useState(false);

  const loadWallet = () => {
    api.get('/wallet/balance').then((res) => {
      setBalance(res.data.balance || 0);
    });
  };

  useEffect(() => {
    loadWallet();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('refresh')) {
      loadWallet();
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  const addMoney = async () => {
    try {
      const res = await api.post('/payments/checkout', {
        amount: Number(amount),
      });

      toast.success('Redirecting to Stripe 💳');
      window.location.href = res.data.url;
    } catch (err) {
      toast.error('Payment failed ❌');
    }
  };

  const withdraw = async () => {
    try {
      await api.post('/payments/withdraw', {
        amount: Number(amount),
      });

      toast.success('Withdrawal sent 💸');

      loadWallet();
      setTxRefresh((prev) => !prev);
      refresh && refresh();
    } catch (err) {
      toast.error('Withdraw failed ❌');
    }
  };

  const connectStripe = async () => {
    try {
      const res = await api.post('/payments/connect');

      toast.success('Redirecting to Stripe setup 🔗');
      window.location.href = res.data.url;
    } catch (err) {
      toast.error('Stripe connect failed ❌');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="fade-in">
        <h3 style={styles.title}>Wallet Balance</h3>

        <h1 style={styles.balance}>
          ${Number(balance).toFixed(2)}
        </h1>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={styles.input}
        />

        <button onClick={addMoney} style={styles.buttonPrimary}>
          💳 Add Money
        </button>

        <button onClick={withdraw} style={styles.buttonDanger}>
          💸 Withdraw
        </button>

        <button onClick={connectStripe} style={styles.buttonSecondary}>
          🔗 Connect Stripe
        </button>
      </div>

      <TransactionList refresh={txRefresh} />
    </div>
  );
}

// =========================
// 🎨 STYLES (MOBILE OPTIMIZED)
// =========================
const styles = {
  page: {
    backgroundColor: '#0f0f0f',
    minHeight: '100vh',
    padding: 16, // ✅ smaller padding for mobile
  },

  card: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 12,
    color: '#fff',
    width: '100%', // ✅ full width on phone
    maxWidth: 420, // ✅ still nice on desktop
    margin: '0 auto 20px auto', // ✅ center on desktop
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    transition: 'all 0.3s ease',
  },

  title: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },

  balance: {
    color: '#fff',
    fontSize: 28, // ✅ better for mobile
    marginBottom: 16,
  },

  input: {
    width: '100%',
    padding: 12, // ✅ bigger touch area
    borderRadius: 10,
    border: 'none',
    marginBottom: 12,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: 16,
    outline: 'none',
  },

  buttonPrimary: {
    width: '100%',
    padding: 14, // ✅ thumb-friendly
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#e11d48',
    color: '#fff',
    marginTop: 6,
    fontSize: 15,
    cursor: 'pointer',
  },

  buttonDanger: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#b91c1c',
    color: '#fff',
    marginTop: 6,
    fontSize: 15,
    cursor: 'pointer',
  },

  buttonSecondary: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#7c3aed',
    color: '#fff',
    marginTop: 6,
    fontSize: 15,
    cursor: 'pointer',
  },
};