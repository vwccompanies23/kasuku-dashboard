import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#ff0033', '#9900ff', '#00eaff'];

export default function SourcesChart({ data }: any) {
  return (
    <div style={{
      flex: 1,
      background: '#0a0a0a',
      padding: 20,
      borderRadius: 16,
      border: '1px solid rgba(153,0,255,0.3)',
      boxShadow: '0 0 20px rgba(153,0,255,0.3)'
    }}>
      <h3 style={{ color: '#ff0033' }}>Revenue Sources</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="total" nameKey="source">
            {data.map((_: any, index: number) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}