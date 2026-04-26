import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminRevenue() {
  const [stats, setStats] = useState({ total: 0, platform: 0, users: 0 });
  const [monthly, setMonthly] = useState([]);
  const [artists, setArtists] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [rate, setRate] = useState(2800);
  const [filter, setFilter] = useState('monthly');

  // 🔥 REAL EXCHANGE RATE
  const fetchRate = async () => {
    try {
      const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await res.json();
      setRate(data.rates.CDF || 2800);
    } catch (e) {
      console.log('Rate fallback');
    }
  };

  const convert = (v) => {
    return currency === 'CDF'
      ? (v * rate).toLocaleString()
      : v.toLocaleString();
  };

  // 🔥 LOAD DATA
  const load = async () => {
    try {
      const res = await fetch(`http://localhost:3000/revenue/admin?filter=${filter}`);
      const data = await res.json();

      setStats({
        total: data?.total || 0,
        platform: data?.platform || 0,
        users: data?.users || 0,
      });

      const m = await fetch(`http://localhost:3000/revenue/${filter}`);
      const mData = await m.json();

      setMonthly(Array.isArray(mData) ? mData : mData?.data || []);

      const a = await fetch('http://localhost:3000/revenue/top-artists');
      const aData = await a.json();
      setArtists(Array.isArray(aData) ? aData : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
    fetchRate();

    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [filter]);

  // 🔥 CSV EXPORT
  const exportCSV = () => {
    let csv = 'Date,Revenue\n';
    monthly.forEach((m) => {
      csv += `${m.date || m.month},${m.total}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'revenue.csv';
    a.click();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Revenue Dashboard</h1>

      {/* 🔥 ACTIONS */}
      <div style={styles.actions}>
        <button style={styles.button} onClick={exportCSV}>
          Export CSV
        </button>

        <button
          style={styles.button}
          onClick={() =>
            setCurrency(currency === 'USD' ? 'CDF' : 'USD')
          }
        >
          {currency}
        </button>

        <select
          style={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* 🔥 CARDS */}
      <div style={styles.cards}>
        <Card title="Total Revenue" value={stats.total} currency={currency} convert={convert} />
        <Card title="Platform (70%)" value={stats.platform} currency={currency} convert={convert} />
        <Card title="Users (30%)" value={stats.users} currency={currency} convert={convert} />
      </div>

      {/* 🔥 STRIPE PAYOUTS */}
      <div style={styles.payoutBox}>
        <h2>Stripe Payouts</h2>
        <p>Available for payout: {convert(stats.platform)}</p>
        <button style={styles.payoutBtn}>
          Send Payout (Stripe)
        </button>
      </div>

      {/* 🔥 CHART */}
      <div style={styles.chartBox}>
        <h2>Revenue Trend</h2>

        {monthly.length === 0 ? (
          <p>No data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthly}>
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#ff003c"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 🔥 TOP ARTISTS */}
      <div style={styles.tableBox}>
        <h2>Top Artists</h2>

        {artists.length === 0 ? (
          <p>No data</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((a, i) => (
                <tr key={i}>
                  <td>{a.name}</td>
                  <td>
                    {currency === 'USD' ? '$' : 'CDF '}
                    {convert(a.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* 🔥 CARD COMPONENT */
function Card({ title, value, currency, convert }) {
  return (
    <div style={styles.card}>
      <p>{title}</p>
      <h2>
        {currency === 'USD' ? '$' : 'CDF '}
        {convert(value)}
      </h2>
    </div>
  );
}

/* 🎨 STYLE */
const styles = {
  container: {
    padding: 30,
    background: '#050509',
    minHeight: '100vh',
    color: '#fff',
  },

  title: {
    fontSize: 32,
    marginBottom: 20,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  actions: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },

  button: {
    padding: '10px 16px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
  },

  select: {
    padding: 10,
    borderRadius: 10,
    background: '#111',
    color: '#fff',
    border: '1px solid #333',
  },

  cards: {
    display: 'flex',
    gap: 20,
    marginBottom: 30,
  },

  card: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    background: 'rgba(255,255,255,0.03)',
  },

  payoutBox: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    background: 'rgba(124,58,237,0.1)',
  },

  payoutBtn: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
  },

  chartBox: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    background: 'rgba(255,255,255,0.03)',
  },

  tableBox: {
    padding: 20,
    borderRadius: 16,
    background: 'rgba(255,255,255,0.03)',
  },

  table: {
    width: '100%',
  },
};