import { useState } from 'react';
import { api } from '../api';

export default function PaypalWithdraw() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const withdraw = async () => {
    try {
      await api.post('/paypal/withdraw', {
        email,
        amount: Number(amount),
      });

      alert('💸 PayPal payout sent');
    } catch (err) {
      alert('Error sending payout ❌');
    }
  };

  return (
    <div>
      <h1>PayPal Withdraw</h1>

      <input
        placeholder="PayPal Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={withdraw}>Send</button>
    </div>
  );
}

const styles = {
  container: { padding: 30, color: '#fff' },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    border: 'none',
  },
  btn: {
    padding: 12,
    width: '100%',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
  },
};