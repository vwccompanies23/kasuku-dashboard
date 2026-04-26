import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function AdminEmailDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/email/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <p style={{ color: 'white' }}>Loading...</p>;

  const data = [
    { name: 'Sent', value: stats.totalSent },
    { name: 'Opened', value: stats.opened },
    { name: 'Clicked', value: stats.clicked },
  ];

  return (
    <div style={{ padding: 30, background: '#0f172a', minHeight: '100vh', color: 'white' }}>
      
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>📧 Email Dashboard</h1>

      {/* ================= CARDS ================= */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
        <Card title="Total Sent" value={stats.totalSent} />
        <Card title="Opened" value={stats.opened} />
        <Card title="Clicked" value={stats.clicked} />
      </div>

      {/* ================= CHART ================= */}
      <div style={{
        background: '#1e293b',
        padding: 20,
        borderRadius: 12,
      }}>
        <h2 style={{ marginBottom: 10 }}>Performance</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ================= CARD COMPONENT ================= */
function Card({ title, value }) {
  return (
    <div style={{
      flex: 1,
      background: '#1e293b',
      padding: 20,
      borderRadius: 12,
    }}>
      <h3 style={{ color: '#94a3b8' }}>{title}</h3>
      <p style={{ fontSize: 24 }}>{value}</p>
    </div>
  );
}