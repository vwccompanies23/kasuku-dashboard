import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function MonthlyChart({ data }) {

  // ✅ ALWAYS SAFE
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Monthly Earnings</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={safeData}>
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff003c"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  card: {
    background: '#14141f',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  title: {
    marginBottom: 10,
  },
};