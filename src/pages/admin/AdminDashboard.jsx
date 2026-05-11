import { useEffect, useState } from 'react';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const BASE_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://kasuku-backend.onrender.com';

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersRes, statsRes] =
        await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/stats'),
        ]);

      setUsers(usersRes.data || []);
      setStats(statsRes.data || {});
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // SEND CAMPAIGN
  // =========================
  const sendCampaign = async () => {
    try {
      if (!subject || !message) {
        return alert(
          'Subject and message required ❌',
        );
      }

      const token =
        localStorage.getItem('token');

      const res = await fetch(
        `${BASE_URL}/admin/send-email`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            sendToAll: true,
            subject,
            message,
          }),
        },
      );

      const data = await res.json();

      console.log(data);

      alert('Campaign sent 🚀');

      setSubject('');
      setMessage('');

    } catch (err) {
      console.log(err);

      alert(
        'Failed to send campaign ❌',
      );
    }
  };

  // =========================
  // BAN USER
  // =========================
  const ban = async (id) => {
    try {
      await api.patch(`/admin/ban/${id}`);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // DELETE USER
  // =========================
  const del = async (id) => {
    try {
      await api.delete(
        `/admin/user/${id}`,
      );

      loadData();

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FILTER USERS
  // =========================
  const filtered = users
    .filter((u) => {
      if (filter === 'admin') {
        return u.role === 'admin';
      }

      return true;
    })
    .filter((u) =>
      u.email
        ?.toLowerCase()
        .includes(
          search.toLowerCase(),
        ),
    );

  return (
    <div style={styles.main}>

      {/* BACK */}
      <button
        onClick={() =>
          navigate('/dashboard')
        }
        style={styles.backBtn}
      >
        ← Back to Dashboard
      </button>

      {/* CAMPAIGN CARD */}
      <div style={styles.panel}>

        <h2 style={styles.panelTitle}>
          📢 Create Campaign
        </h2>

        <input
          placeholder="Email subject..."
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
          style={styles.input}
        />

        <textarea
          placeholder="Write message to all users..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          style={styles.textarea}
        />

        <button
          onClick={sendCampaign}
          style={styles.primaryBtn}
        >
          Send Campaign 🚀
        </button>

      </div>

      {/* TOP */}
      <div style={styles.topbar}>
        <h2>Admin Dashboard</h2>

        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.search}
        />
      </div>

      {/* STATS */}
      <div style={styles.cards}>
        <Card
          title="Users"
          value={
            stats.totalUsers || 0
          }
        />

        <Card
          title="Active"
          value={
            stats.active || 0
          }
        />

        <Card
          title="Unpaid"
          value={
            stats.unpaid || 0
          }
        />
      </div>

      {/* FILTER */}
      <div style={styles.filterRow}>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          style={styles.select}
        >
          <option value="all">
            All Users
          </option>

          <option value="admin">
            Admins
          </option>
        </select>
      </div>

      {/* USERS TABLE */}
      <div style={styles.table}>

        <div style={styles.rowHeader}>
          <span>Email</span>
          <span>Role</span>
          <span>Actions</span>
        </div>

        {filtered.length === 0 && (
          <div style={styles.empty}>
            No users found
          </div>
        )}

        {filtered.map((u) => (
          <div
            key={u.id}
            style={styles.row}
          >

            <span>{u.email}</span>

            <span style={styles.role}>
              {u.role}
            </span>

            <div style={styles.actions}>

              <button
                onClick={() =>
                  ban(u.id)
                }
                style={styles.yellow}
              >
                Ban
              </button>

              <button
                onClick={() =>
                  del(u.id)
                }
                style={styles.delete}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

const styles = {
  main: {
    flex: 1,
    padding: 40,
    maxWidth: 1200,
    margin: '0 auto',
  },

  backBtn: {
    marginBottom: 20,
    padding: '10px 16px',
    borderRadius: 10,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },

  panel: {
    background:
      'linear-gradient(135deg,#111827,#1e293b)',
    padding: 24,
    borderRadius: 18,
    marginBottom: 30,
    border:
      '1px solid rgba(255,255,255,0.08)',
  },

  panelTitle: {
    marginTop: 0,
    marginBottom: 20,
    color: '#fff',
  },

  input: {
    width: '100%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    border: '1px solid #222',
    background: '#0f172a',
    color: '#fff',
    outline: 'none',
  },

  textarea: {
    width: '100%',
    height: 140,
    marginBottom: 14,
    padding: 14,
    borderRadius: 12,
    border: '1px solid #222',
    background: '#0f172a',
    color: '#fff',
    resize: 'none',
    outline: 'none',
  },

  primaryBtn: {
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    padding: '12px 18px',
    borderRadius: 12,
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  topbar: {
    display: 'flex',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  search: {
    padding: 12,
    borderRadius: 10,
    border: '1px solid #222',
    background: '#111',
    color: '#fff',
    width: 260,
  },

  cards: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(220px,1fr))',
    gap: 20,
    marginBottom: 30,
  },

  card: {
    background:
      'linear-gradient(135deg,#111827,#1e293b)',
    padding: 24,
    borderRadius: 18,
    border:
      '1px solid rgba(255,255,255,0.06)',
  },

  filterRow: {
    marginBottom: 20,
  },

  select: {
    padding: 10,
    borderRadius: 10,
    background: '#111',
    color: '#fff',
    border: '1px solid #222',
  },

  table: {
    background: '#111827',
    borderRadius: 18,
    overflow: 'hidden',
  },

  rowHeader: {
    display: 'flex',
    justifyContent:
      'space-between',
    padding: 18,
    fontWeight: 'bold',
    background: '#0f172a',
  },

  row: {
    display: 'flex',
    justifyContent:
      'space-between',
    alignItems: 'center',
    padding: 18,
    borderTop:
      '1px solid rgba(255,255,255,0.05)',
  },

  role: {
    opacity: 0.8,
  },

  actions: {
    display: 'flex',
    gap: 10,
  },

  yellow: {
    background: '#facc15',
    color: '#000',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
  },

  delete: {
    background: '#ff003c',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
  },

  empty: {
    padding: 30,
    textAlign: 'center',
    opacity: 0.6,
  },
};