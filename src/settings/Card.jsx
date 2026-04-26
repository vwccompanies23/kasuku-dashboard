import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Card() {
  const [card, setCard] = useState(null);

  useEffect(() => {
    loadCard();
  }, []);

  const loadCard = async () => {
    const res = await api.get('/billing/card');
    setCard(res.data);
  };

  const updateCard = async () => {
    const res = await api.post('/billing/create-setup-intent');

    window.location.href = res.data.url; // Stripe update page
  };

  return (
    <div>
      <h1>Payment Method</h1>

      {card ? (
        <div>
          <p>💳 **** **** **** {card.last4}</p>
          <p>Expires {card.exp_month}/{card.exp_year}</p>
        </div>
      ) : (
        <p>No card found ❌</p>
      )}

      <button onClick={updateCard}>
        Update Card
      </button>
    </div>
  );
}