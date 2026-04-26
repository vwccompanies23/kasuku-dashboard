import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminAnalytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get('/admin/analytics').then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>📊 Analytics</h2>

      <div style={styles.grid}>
        <Card title="Pending" value={data.pending || 0} />
        <Card title="Approved" value={data.approved || 0} />
        <Card title="Rejected" value={data.rejected || 0} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

const styles = {
  grid: {
    display: 'flex',
    gap: 20,
  },
  card: {
    flex: 1,
    background: '#111',
    padding: 20,
    borderRadius: 12,
  },
};