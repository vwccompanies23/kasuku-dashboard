import { useEffect, useState } from 'react';
import { socket } from '../../utils/socket';

export default function AdminWithdraw() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();

    // 🔥 LIVE UPDATES
    socket.on('withdraw:update', (data) => {
      setList(data);
    });

    return () => socket.off('withdraw:update');
  }, []);

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/admin/withdraws');
    const data = await res.json();

    setList(Array.isArray(data) ? data : data.withdraws || []);
  };

  const approve = async (id) => {
    await fetch(`http://localhost:5000/admin/withdraws/${id}/approve`, {
      method: 'POST'
    });
  };

  const reject = async (id) => {
    await fetch(`http://localhost:5000/admin/withdraws/${id}/reject`, {
      method: 'POST'
    });
  };

  return (
    <div style={styles.container}>
      <h1>Live Withdraws</h1>

      {list.map(w => (
        <div key={w.id} style={styles.row}>
          <div>{w.user}</div>
          <div>${w.amount}</div>
          <div>{w.status}</div>

          {w.status === 'pending' && (
            <>
              <button onClick={() => approve(w.id)}>Approve</button>
              <button onClick={() => reject(w.id)}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: 30, background: '#0b0f19', color: '#fff' },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    background: '#111827',
    borderRadius: 10
  }
};