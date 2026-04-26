import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminActivity() {
  const [users, setUsers] = useState([]); // ✅ YOU MISSED THIS

  useEffect(() => {
    api.get('/admin/activity')
      .then((res) => setUsers(res.data))
      .catch(() => console.log('failed'));
  }, []);

  return (
    <div style={{ color: 'white', padding: 20 }}>
      <h2>User Activity</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((u) => (
          <div key={u.id}>
            {u.email} — Joined: {new Date(u.createdAt).toLocaleDateString()}
          </div>
        ))
      )}
    </div>
  );
}