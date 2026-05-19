import { useEffect, useState } from 'react';
import { socket } from '../../utils/socket';
import { api } from '../../api';

export default function AdminFinanceDashboard() {
  const [data, setData] = useState({
    revenue: 0,
    withdraws: 0,
    payouts: 0,
  });

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      const res = await api.get(
        '/admin/finance'
      );

      const d = res.data || {};

      setData({
        revenue:
          d?.revenue || 0,

        withdraws:
          d?.withdraws || 0,

        payouts:
          d?.payouts || 0,
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    fetchData();

    socket.on(
      'finance:update',
      (d) => {
        setData({
          revenue:
            d?.revenue || 0,

          withdraws:
            d?.withdraws || 0,

          payouts:
            d?.payouts || 0,
        });
      }
    );

    return () =>
      socket.off(
        'finance:update'
      );

  }, []);

  return (
    <div style={styles.container}>

      <h1>
        Finance Dashboard
      </h1>

      <div style={styles.grid}>

        <Card
          title="Total Revenue"
          value={`$${data.revenue}`}
        />

        <Card
          title="Withdraw Requests"
          value={data.withdraws}
        />

        <Card
          title="Payouts Sent"
          value={`$${data.payouts}`}
        />

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>

      <p>{value}</p>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    background: '#0b0f19',
    color: '#fff',
    minHeight: '100vh',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(3,1fr)',
    gap: 20,
  },

  card: {
    background:
      'linear-gradient(135deg,#ff003c,#7c3aed)',
    padding: 25,
    borderRadius: 15,
    textAlign: 'center',
  },
};