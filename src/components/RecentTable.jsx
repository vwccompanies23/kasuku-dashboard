import React from 'react';

export default function RecentTable({ data = [] }) {

  if (!data || data.length === 0) {
    return (
      <div style={styles.empty}>
        No recent activity
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Recent Activity</h3>

      <div style={styles.table}>
        <div style={styles.header}>
          <span>Track</span>
          <span>Platform</span>
          <span>Amount</span>
          <span>Date</span>
        </div>

        {data.map((item, index) => (
          <div key={index} style={styles.row}>
            <span style={styles.track}>
              {item.track || 'Unknown'}
            </span>

            <span style={styles.platform}>
              {item.platform || '—'}
            </span>

            <span style={styles.amount}>
              +${item.amount || 0}
            </span>

            <span style={styles.date}>
              {formatDate(item.date)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================
// 🧠 HELPERS
// =====================
function formatDate(date) {
  if (!date) return '-';

  const d = new Date(date);
  return d.toLocaleDateString();
}

// =====================
// 🎨 STYLES
// =====================
const styles = {
  container: {
    marginTop: 20,
    background: '#121212',
    padding: 20,
    borderRadius: 18,
  },

  title: {
    marginBottom: 15,
    opacity: 0.9,
  },

  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  header: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    opacity: 0.6,
    fontSize: 12,
  },

  row: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    padding: '10px 0',
    borderBottom: '1px solid #222',
    alignItems: 'center',
  },

  track: {
    fontWeight: 'bold',
  },

  platform: {
    opacity: 0.8,
  },

  amount: {
    color: '#22c55e',
    fontWeight: 'bold',
  },

  date: {
    opacity: 0.6,
    fontSize: 12,
  },

  empty: {
    marginTop: 20,
    padding: 20,
    background: '#121212',
    borderRadius: 18,
    textAlign: 'center',
    opacity: 0.6,
  },
};