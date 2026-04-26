import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function MonthlyChart({ data }: any) {
  return (
    <div style={{
      flex: 1,
      background: '#0a0a0a',
      padding: 20,
      borderRadius: 16,
      border: '1px solid rgba(255,0,60,0.3)',
      boxShadow: '0 0 20px rgba(255,0,60,0.3)'
    }}>
      <h3 style={{ color: '#9900ff' }}>Monthly Earnings</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#ff0033"
            strokeWidth={3}
            dot={{ fill: '#ff0033' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}