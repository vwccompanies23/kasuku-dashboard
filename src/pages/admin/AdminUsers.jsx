import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/admin/users').then((res) => setUsers(res.data));
  }, []);

  return (
    <div style={styles.main}>
      <h2 style={styles.title}>👥 All Users</h2>

      <div style={styles.table}>
        {users.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No users found</p>
        ) : (
          users.map((u) => (
            <div key={u.id} style={styles.row}>
              <span>{u.email}</span>
              <span style={styles.role}>{u.role}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  main: { flex: 1 },
  title: { marginBottom: 20 },
  table: {
    background: '#111',
    borderRadius: 12,
    padding: 20,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 12,
    borderBottom: '1px solid #222',
  },
  role: { opacity: 0.7 },
};