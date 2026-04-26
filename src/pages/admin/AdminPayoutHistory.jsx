import { useEffect, useState } from 'react';

export default function AdminPayoutHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/admin/payouts')
      .then(res => res.json())
      .then(data => {
        setHistory(Array.isArray(data) ? data : data.payouts || []);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>Payout History</h1>

      {history.map(p => (
        <div key={p.id} style={styles.card}>
          <div><b>User:</b> {p.user}</div>
          <div><b>Amount:</b> ${p.amount}</div>
          <div><b>Status:</b> {p.status}</div>
          <div><b>Date:</b> {new Date(p.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: 30, background: '#0b0f19', color: '#fff' },
  card: {
    background: 'linear-gradient(135deg,#ff003c,#7c3aed)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10
  }
};