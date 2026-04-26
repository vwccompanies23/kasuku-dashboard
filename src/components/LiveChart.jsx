import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';

export default function LiveChart() {
  const [data, setData] = useState([
    { value: 10 },
    { value: 12 },
    { value: 11 },
    { value: 13 },
    { value: 15 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1].value;

        const next = last + (Math.random() - 0.5) * 2;

        const newData = [...prev.slice(1), { value: next }];

        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#7c3aed"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}