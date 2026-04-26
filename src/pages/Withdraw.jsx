import { useEffect, useState } from 'react';
import { api } from '../api';
import PayoutMethodSelector from '../components/PayoutMethodSelector';
import PayoutHistory from '../components/PayoutHistory';

export default function Withdraw() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const [cdf, setCdf] = useState(0);

  const [taxCompleted, setTaxCompleted] = useState(false);
  const [taxVerified, setTaxVerified] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    fetchWallet();
    checkStatus();
    convertToCDF();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await api.get('/payouts/wallet');
      setBalance(res.data.balance || 0);
    } catch {
      setBalance(0);
    }
  };

  const checkStatus = async () => {
    try {
      const res = await api.post('/tax/status');

      setTaxCompleted(res.data.taxCompleted);
      setTaxVerified(res.data.taxVerified);
      setOnboardingCompleted(res.data.onboardingCompleted);
    } catch {
      setTaxCompleted(false);
      setTaxVerified(false);
      setOnboardingCompleted(false);
    }
  };

  const convertToCDF = async () => {
    try {
      const res = await fetch(
        'https://api.exchangerate-api.com/v4/latest/USD'
      );
      const data = await res.json();
      const rate = data.rates.CDF;
      setCdf(balance * rate);
    } catch {
      setCdf(0);
    }
  };

  // ✅ CLEAN + FIXED WITHDRAW FUNCTION
  const withdraw = async () => {
    // 🔒 COUNTRY + TAX CHECK
    if (country === 'US' && !taxCompleted) {
      alert('⚠️ US users must complete tax form');
      window.location.href = '/tax';
      return;
    }

    // ⏳ TAX UNDER REVIEW
    if (taxCompleted && !taxVerified) {
      alert('⏳ Your tax form is under review');
      return;
    }

    // ❌ ONBOARDING NOT DONE
    if (!onboardingCompleted) {
      alert('⚠️ Complete payout setup');
      window.location.href = '/onboarding';
      return;
    }

    // ❌ INVALID AMOUNT
    if (!amount || Number(amount) <= 0) {
      alert('Enter a valid amount');
      return;
    }

    await api.post('/payouts/withdraw', {
  amount: Number(amount),
  method: selectedMethod, // 'paypal' or 'stripe'
  email: paypalEmail,     // only for PayPal
});

    if (selectedMethod === 'paypal') {
  await api.post('/paypal/withdraw', {
    email: paypalEmail,
    amount: Number(amount),
  });
} else {
  await api.post('/payouts/withdraw', {
    amount: Number(amount),
  });
}

    try {
      await api.post('/payouts/withdraw', {
        amount: Number(amount),
      });

      alert('Withdrawal successful 💸');

      window.dispatchEvent(new Event('balanceUpdated'));

      setBalance((prev) => prev - Number(amount));
      setAmount('');

    } catch (err) {
      alert(err?.response?.data?.message || 'Error ❌');
    }
  };

  return (
    <div style={styles.container}>
      <h1>💰 Withdraw</h1>

      <div style={styles.card}>
        <h3>Balance</h3>
        <p>${balance}</p>
        <p style={{ color: '#aaa' }}>≈ {cdf.toFixed(0)} CDF</p>
      </div>

      {/* ❌ TAX NOT COMPLETED */}
      {!taxCompleted && (
        <div style={styles.warning}>
          ⚠️ You must complete your tax form before withdrawing
        </div>
      )}

      {/* ⏳ TAX UNDER REVIEW */}
      {taxCompleted && !taxVerified && (
        <div style={styles.pending}>
          ⏳ Tax submitted — waiting for admin approval
        </div>
      )}

      {/* ⚠️ ONBOARDING REQUIRED */}
      {taxVerified && !onboardingCompleted && (
        <div style={styles.warning}>
          ⚠️ Complete payout setup to enable withdrawals
        </div>
      )}

      {/* ✅ READY */}
      {taxVerified && onboardingCompleted && (
        <div style={styles.success}>
          ✅ Withdrawals enabled
        </div>
      )}

      {/* 🔥 PAYMENT OPTIONS */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          style={styles.btn}
          onClick={() => (window.location.href = '/withdraw/paypal')}
        >
          PayPal
        </button>

        <button
          style={styles.btn}
          onClick={() => (window.location.href = '/connect-stripe')}
        >
          Bank (Stripe)
        </button>
      </div>

      <PayoutMethodSelector />
      <PayoutHistory />

      {/* INPUT */}
      <input
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />

      {/* COUNTRY SELECT */}
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        style={styles.input}
      >
        <option value="">Select Country</option>
        <option value="US">United States</option>
        <option value="CD">Congo (DRC)</option>
        <option value="FR">France</option>
      </select>

      <button
        style={{
          ...styles.btn,
          opacity: taxVerified && onboardingCompleted ? 1 : 0.6,
          cursor:
            taxVerified && onboardingCompleted ? 'pointer' : 'not-allowed',
        }}
        onClick={withdraw}
      >
        {taxVerified && onboardingCompleted ? 'Withdraw' : 'Locked 🔒'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 25,
    color: '#fff',
  },
  card: {
    background: '#141414',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
    border: 'none',
  },
  btn: {
    padding: 10,
    width: '100%',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 8,
  },
  warning: {
    background: '#ff003c22',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    color: '#ff4d6d',
  },
  pending: {
    background: '#f59e0b22',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    color: '#fbbf24',
  },
  success: {
    background: '#22c55e22',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    color: '#4ade80',
  },
};