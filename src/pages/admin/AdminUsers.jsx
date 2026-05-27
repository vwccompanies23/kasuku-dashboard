import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState({
  totalUsers: 0,
  paidUsers: 0,
  freeUsers: 0,
  managedUsers: 0,
  admins: 0,
});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadStats = async () => {
  try {

    const res =
      await api.get(
        '/users/stats',
      );

    setStats(res.data);

  } catch (err) {

    console.log(err);

  }
};

  // =========================
  // 🎁 GIVE FREE ACCESS
  // =========================
  const grantAccess = async (userId) => {
    try {
      const plan = prompt(
        'Enter plan: SOLO / ARTISTS / PRO',
      );

      if (!plan) return;

      const days = prompt(
        'Days? (optional)',
      );

      const months = prompt(
        'Months? (optional)',
      );

      const years = prompt(
        'Years? (optional)',
      );

      const revenuePercentage = prompt(
        'Revenue percentage Kasuku takes? (example 15)',
      );

      const managed = window.confirm(
        'Managed artist account?',
      );

      await api.patch(
        `/users/${userId}/free-access`,
        {
          plan: plan.toUpperCase(),

          days: days
            ? Number(days)
            : undefined,

          months: months
            ? Number(months)
            : undefined,

          years: years
            ? Number(years)
            : undefined,

          revenuePercentage:
            revenuePercentage
              ? Number(
                  revenuePercentage,
                )
              : 15,

          isManaged: managed,
        },
      );

      alert(
        'Access granted successfully 🚀',
      );

      loadUsers();

    } catch (err) {
      console.log(err);
      alert('Failed ❌');
    }
  };

  // =========================
  // 🚫 REMOVE ACCESS
  // =========================
  const removeAccess = async (
    userId,
  ) => {
    try {
      await api.patch(
        '/admin/free-access',
        {
          userId,
          value: false,
        },
      );

      alert('Access removed ❌');

      loadUsers();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.main}>
      <h2 style={styles.title}>
        👥 All Users
      </h2>

      <div style={styles.statsGrid}>

  <div style={styles.statCard}>
    <h3>{stats.totalUsers}</h3>
    <p>Total Users</p>
  </div>

  <div style={styles.statCard}>
    <h3>{stats.paidUsers}</h3>
    <p>Paid Users</p>
  </div>

  <div style={styles.statCard}>
    <h3>{stats.freeUsers}</h3>
    <p>Free Users</p>
  </div>

  <div style={styles.statCard}>
    <h3>{stats.managedUsers}</h3>
    <p>Managed Artists</p>
  </div>

  <div style={styles.statCard}>
    <h3>{stats.admins}</h3>
    <p>Admins</p>
  </div>

</div>

      <div style={styles.table}>
        {users.length === 0 ? (
          <p style={{ opacity: 0.6 }}>
            No users found
          </p>
        ) : (
          users.map((u) => (
            <div
              key={u.id}
              style={styles.row}
            >
              {/* USER INFO */}
              <div style={styles.left}>
                <div
                  style={styles.email}
                >
                  {u.email}
                </div>

                <div
                  style={styles.meta}
                >
                  Role: {u.role}
                </div>

                <div
                  style={styles.meta}
                >
                  Plan:{' '}
                  {u.plan || 'FREE'}
                </div>

                <div
                  style={styles.meta}
                >
                  Managed:{' '}
                  {u.isManaged
                    ? 'YES'
                    : 'NO'}
                </div>

                <div
                  style={styles.meta}
                >
                  Revenue Share:{' '}
                  {u.revenuePercentage ||
                    0}
                  %
                </div>

                {u.freeAccessExpiresAt && (
                  <div
                    style={
                      styles.expire
                    }
                  >
                    Expires:{' '}
                    {new Date(
                      u.freeAccessExpiresAt,
                    ).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div
                style={styles.actions}
              >
                <button
                  style={
                    styles.grantBtn
                  }
                  onClick={() =>
                    grantAccess(
                      u.id,
                    )
                  }
                >
                  🎁 Grant Access
                </button>

                <button
                  style={
                    styles.removeBtn
                  }
                  onClick={() =>
                    removeAccess(
                      u.id,
                    )
                  }
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  main: {
    flex: 1,
    padding: 20,
  },

  title: {
    marginBottom: 20,
    fontSize: 28,
    fontWeight: 'bold',
  },

  table: {
    background: '#111',
    borderRadius: 18,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  statsGrid: {
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit,minmax(180px,1fr))',
  gap: 20,
  marginBottom: 30,
},

statCard: {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 18,
  padding: 24,
  textAlign: 'center',
},

  row: {
    display: 'flex',
    justifyContent:
      'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    background: '#0f172a',
    border: '1px solid #1f2937',
  },

  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },

  email: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  meta: {
    opacity: 0.7,
    fontSize: 13,
  },

  expire: {
    color: '#facc15',
    fontSize: 13,
  },

  actions: {
    display: 'flex',
    gap: 10,
  },

  grantBtn: {
    background:
      'linear-gradient(135deg,#ff003c,#7c3aed)',
    color: '#fff',
    border: 'none',
    padding: '12px 18px',
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  removeBtn: {
    background: '#111827',
    color: '#fff',
    border: '1px solid #374151',
    padding: '12px 18px',
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};