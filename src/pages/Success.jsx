import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Success() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const res = await api.get('/me');

        setUser(res.data);

        // ✅ store updated user (important for guards / UI)
        localStorage.setItem('user', JSON.stringify(res.data));

        // ⏳ small delay then redirect
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);

      } catch (err) {
        console.log('Failed to update user');
      }
    };

    updateUser();
  }, []);

  return (
    <div style={{ padding: 40, color: '#fff' }}>
      <h1>✅ Payment Successful</h1>
      <p>Activating your subscription...</p>

      {user && (
        <p style={{ marginTop: 10 }}>
          Plan: <strong>{user.plan}</strong>
        </p>
      )}
    </div>
  );
}