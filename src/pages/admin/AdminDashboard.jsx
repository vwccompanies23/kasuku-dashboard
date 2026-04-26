import { useEffect, useState } from 'react';
import { api } from '../../api';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();

    fetch('http://localhost:3000/email/stats')
      .then(res => res.json())
      .then(data => setStats(data));

    const socket = io('http://localhost:3000');

    socket.on('email-stats', (data) => {
      setStats(data);
    });

    return () => socket.disconnect();
  }, []);

  const sendCampaign = async () => {
    await fetch('http://localhost:3000/email/campaign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, message }),
    });

    alert('Campaign sent 🚀');
  };

  const loadData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        api.get('/payments/admin/users'),
        api.get('/payments/admin/stats'),
      ]);

      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch {
      console.log('error loading admin');
    }
  };

  const adjustMoney = async (userId, amount) => {
    await api.post('/admin/adjust-money', { userId, amount });
    loadData();
  };

  const setRole = async (id, role) => {
    await api.post(`/admin/set-role/${id}`, { role });
    loadData();
  };

  const ban = async (id) => {
    await api.post(`/admin/ban/${id}`);
    loadData();
  };

  const del = async (id) => {
    await api.delete(`/payments/admin/user/${id}`);
    loadData();
  };

  const filtered = users
    .filter((u) => {
      if (filter === 'admin') return u.role === 'admin';
      if (filter === 'staff') return u.role === 'staff';
      return true;
    })
    .filter((u) =>
      u.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={styles.main}>

      {/* BACK BUTTON (kept as you requested) */}
      <button
        onClick={() => navigate('/dashboard')}
        style={styles.backBtn}
      >
        ← Back to Dashboard
      </button>

      {/* EMAIL CENTER */}
      <div style={styles.panel}>
        <h2>Create Campaign</h2>

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={sendCampaign} style={styles.primaryBtn}>
          Send Campaign 🚀
        </button>
      </div>

      {/* TOP BAR */}
      <div style={styles.topbar}>
        <h2>Admin Dashboard</h2>
        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      {/* STATS */}
      <div style={styles.cards}>
        <Card title="Users" value={stats.totalUsers || 0} />
        <Card title="Revenue" value={`$${stats.totalRevenue || 0}`} />
        <Card title="Active Subs" value={stats.activeSubs || 0} />
      </div>

      {/* FILTER */}
      <div style={styles.filterRow}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.select}
        >
          <option value="all">All</option>
          <option value="admin">Admins</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      {/* USERS TABLE */}
      <div style={styles.table}>
        <div style={styles.rowHeader}>
          <span>Email</span>
          <span>Role</span>
          <span>Actions</span>
        </div>

        {filtered.map((u) => (
          <div key={u.id} style={styles.row}>
            <span>{u.email}</span>

            <select
              value={u.role || 'user'}
              onChange={(e) => setRole(u.id, e.target.value)}
              style={styles.role}
            >
              <option value="user">User</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>

            <div style={styles.actions}>
              <button onClick={() => adjustMoney(u.id, 100)} style={styles.green}>+$</button>
              <button onClick={() => adjustMoney(u.id, -50)} style={styles.red}>-$</button>
              <button onClick={() => ban(u.id)} style={styles.yellow}>Ban</button>
              <button onClick={() => del(u.id)} style={styles.delete}>Delete</button>
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
  main: { flex: 1, padding: 40, maxWidth: 1200, margin: '0 auto' },
  backBtn: {
    marginBottom: 20,
    padding: '10px 16px',
    borderRadius: 10,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  panel: { background: '#1e293b', padding: 20, borderRadius: 12, marginBottom: 30 },
  input: { width: '100%', marginBottom: 10, padding: 10, borderRadius: 8, background: '#111', color: '#fff' },
  textarea: { width: '100%', height: 100, marginBottom: 10, padding: 10, borderRadius: 8, background: '#111', color: '#fff' },
  primaryBtn: { background: 'linear-gradient(90deg,#ff003c,#7c3aed)', padding: 10, borderRadius: 8, border: 'none', color: '#fff' },
  topbar: { display: 'flex', justifyContent: 'space-between', marginBottom: 20 },
  search: { padding: 10, borderRadius: 8, background: '#111', color: '#fff' },
  cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 30 },
  card: { background: '#111827', padding: 20, borderRadius: 12 },
  filterRow: { marginBottom: 20 },
  select: { padding: 10, borderRadius: 8, background: '#111', color: '#fff' },
  table: { background: '#111827', borderRadius: 12 },
  rowHeader: { display: 'flex', justifyContent: 'space-between', padding: 15, fontWeight: 'bold' },
  row: { display: 'flex', justifyContent: 'space-between', padding: 15 },
  role: { background: '#000', color: '#fff' },
  actions: { display: 'flex', gap: 8 },
  green: { background: 'green', color: '#fff' },
  red: { background: 'red', color: '#fff' },
  yellow: { background: '#facc15', color: '#000' },
  delete: { background: '#ff003c', color: '#fff' },
};