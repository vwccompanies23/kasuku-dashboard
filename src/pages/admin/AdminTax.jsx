import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminTax() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get('/tax/admin/all');
    setUsers(res.data || []);
  };

  const approve = async (id) => {
    await api.post('/tax/admin/approve', { userId: id });
    fetchUsers();
  };

  const reject = async (id) => {
    await api.post('/tax/admin/reject', { userId: id });
    fetchUsers();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧾 Tax Approvals</h1>

      <div style={styles.table}>
        {users.map((u) => (
          <div key={u.id} style={styles.row}>
            <div>
              <h3>{u.fullName || 'User'}</h3>
              <p>{u.email}</p>
              <p>{u.country}</p>
            </div>

            <div style={styles.actions}>
              {u.taxVerified ? (
                <span style={styles.approved}>✅ Approved</span>
              ) : (
                <>
                  <button
                    style={styles.approve}
                    onClick={() => approve(u.id)}
                  >
                    Approve
                  </button>

                  <button
                    style={styles.reject}
                    onClick={() => reject(u.id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    background: '#0b0f19',
    minHeight: '100vh',
    color: '#fff',
  },

  title: {
    fontSize: 32,
    marginBottom: 20,
  },

  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  row: {
    background: '#111827',
    padding: 20,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  actions: {
    display: 'flex',
    gap: 10,
  },

  approve: {
    padding: '10px 15px',
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(90deg,#22c55e,#16a34a)',
    color: '#fff',
    cursor: 'pointer',
  },

  reject: {
    padding: '10px 15px',
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    cursor: 'pointer',
  },

  approved: {
    color: '#22c55e',
    fontWeight: 'bold',
  },
};