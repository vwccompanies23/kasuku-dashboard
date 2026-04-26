import { useEffect, useState } from 'react';
import { api } from '../../api';
import { io } from 'socket.io-client';

export default function AdminEmail() {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [sendToAll, setSendToAll] = useState(false);

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [stats, setStats] = useState({
    sent: 0,
    opened: 0,
    clicked: 0,
  });

  // 📊 STATS + REALTIME SOCKET
  useEffect(() => {
    fetch('http://localhost:3000/email/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(() => {});

    const socket = io('http://localhost:3000');

    socket.on('email-stats', (data) => {
      setStats(data);
    });

    return () => socket.disconnect();
  }, []);

  // 👥 LOAD USERS
  useEffect(() => {
    api.get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch(() => {});
  }, []);

  // ✉️ SEND EMAIL
  const handleSend = async () => {
    try {
      await api.post('/admin/send-email', {
        email: sendToAll ? null : selectedEmail,
        subject,
        message,
        sendToAll,
      });

      alert('✅ Email sent successfully');

      // reset form
      setSubject('');
      setMessage('');
      setSelectedEmail('');
    } catch {
      alert('❌ Failed to send email');
    }
  };

  return (
    <div style={styles.page}>

      {/* 📊 EMAIL STATS */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>Sent: {stats.sent}</div>
        <div style={styles.statCard}>Opened: {stats.opened}</div>
        <div style={styles.statCard}>Clicked: {stats.clicked}</div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>📧 Email Center</h2>

        {/* 🔥 TOGGLE */}
        <div style={styles.toggleWrap}>
          <button
            style={!sendToAll ? styles.activeToggle : styles.toggle}
            onClick={() => setSendToAll(false)}
          >
            Single User
          </button>

          <button
            style={sendToAll ? styles.activeToggle : styles.toggle}
            onClick={() => setSendToAll(true)}
          >
            Send To All Users
          </button>
        </div>

        {/* 👤 SELECT USER */}
        {!sendToAll && (
          <div style={styles.field}>
            <label style={styles.label}>Select User</label>
            <select
              style={styles.input}
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
            >
              <option value="">Choose user...</option>
              {users.map((u) => (
                <option key={u.id} value={u.email}>
                  {u.email}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ✉️ SUBJECT */}
        <div style={styles.field}>
          <label style={styles.label}>Subject</label>
          <input
            style={styles.input}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="🔥 New update"
          />
        </div>

        {/* 💬 MESSAGE */}
        <div style={styles.field}>
          <label style={styles.label}>Message</label>
          <textarea
            style={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write message..."
          />
        </div>

        {/* 🚀 SEND */}
        <button style={styles.button} onClick={handleSend}>
          🚀 Send Email
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES (OUTSIDE COMPONENT ✅) ================= */

const styles = {
  page: {
    padding: '40px',
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    minHeight: '100vh',
  },

  statsRow: {
    display: 'flex',
    gap: 20,
    marginBottom: 20,
  },

  statCard: {
    background: '#111827',
    padding: 20,
    borderRadius: 10,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },

  card: {
    maxWidth: '700px',
    margin: '0 auto',
    background: '#0b1220',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
  },

  title: {
    color: '#e2e8f0',
    marginBottom: '25px',
    fontSize: '22px',
  },

  toggleWrap: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },

  toggle: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#020617',
    color: '#94a3b8',
    cursor: 'pointer',
  },

  activeToggle: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '15px',
  },

  label: {
    color: '#94a3b8',
    fontSize: '13px',
  },

  input: {
    background: '#020617',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
    color: '#e2e8f0',
  },

  textarea: {
    background: '#020617',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
    color: '#e2e8f0',
    minHeight: '120px',
  },

  button: {
    marginTop: '10px',
    background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
  },
};