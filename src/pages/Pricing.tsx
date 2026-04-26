import { useState } from 'react';
import { api } from '../api';

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const subscribe = async (
    plan: string,
    artistCount: number = 1,
  ) => {
    try {
      const res = await api.post('/payments/subscribe', {
        plan,
        billing,
        artistCount,
      });

      // 🚀 redirect to Stripe
      window.location.href = res.data.url;
    } catch (err) {
      alert('❌ Failed to start subscription');
    }
  };

  return (
    <div style={{ padding: 40, color: 'white' }}>
      <h1>A Plan for Everyone</h1>

      {/* 🔄 TOGGLE */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setBilling('monthly')}>
          Monthly
        </button>
        <button onClick={() => setBilling('yearly')}>
          Yearly
        </button>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* SOLO */}
        <div style={card}>
          <h2>Solo Artist</h2>
          <h1>
            {billing === 'monthly' ? '$1.75/mo' : '$20.99/yr'}
          </h1>

          <button onClick={() => subscribe('solo')}>
            Get Started
          </button>
        </div>

        {/* ARTISTS */}
        <div style={card}>
          <h2>Artists</h2>
          <h1>
            {billing === 'monthly' ? '$2.08/mo' : '$24.99/yr'}
          </h1>

          <button onClick={() => subscribe('artists', 2)}>
            Get Started
          </button>
        </div>

        {/* PRO */}
        <div style={card}>
          <h2>Pro</h2>
          <h1>
            {billing === 'monthly' ? '$5.08/mo' : '$60.99+/yr'}
          </h1>

          <button onClick={() => subscribe('pro', 5)}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

const card = {
  padding: 20,
  border: '1px solid #444',
  borderRadius: 10,
  width: 200,
};