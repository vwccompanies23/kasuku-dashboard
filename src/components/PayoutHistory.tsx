import { useEffect, useState } from 'react';
import { api } from '../api';

export default function PayoutHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get('/payouts/history').then((res) => {
      setHistory(res.data);
    });
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Payout History</h3>

      {history.map((p) => (
        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{p.method}</span>
          <span>${p.amount}</span>
          <span>{p.status}</span>
        </div>
      ))}
    </div>
  );
}