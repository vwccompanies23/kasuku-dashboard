import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#ff003c', '#7b00ff', '#00eaff'];

export default function SourcesChart({ data }) {
  return (
    <div style={{ flex: 1, background: '#14141f', padding: 20, borderRadius: 12 }}>
      <h3>Revenue Sources</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="total" nameKey="source">
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}