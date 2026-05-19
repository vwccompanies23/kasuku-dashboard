import { useEffect, useState } from 'react';
import { api } from '../../api';
import { io } from 'socket.io-client';

export default function AdminEmail() {

  //////////////////////////////////////////////////
  // 🔥 STATES
  //////////////////////////////////////////////////
  const [users, setUsers] =
    useState([]);

  const [selectedEmail, setSelectedEmail] =
    useState('');

  const [sendToAll, setSendToAll] =
    useState(false);

  const [subject, setSubject] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [sending, setSending] =
    useState(false);

  const [loadingUsers, setLoadingUsers] =
    useState(true);

  const [stats, setStats] =
    useState({
      sent: 0,
      opened: 0,
      clicked: 0,
    });

  //////////////////////////////////////////////////
  // 🔥 BACKEND URL
  //////////////////////////////////////////////////
  const BASE_URL =
    'https://kasuku-backend.onrender.com';

  //////////////////////////////////////////////////
  // 📊 STATS + SOCKET
  //////////////////////////////////////////////////
  useEffect(() => {

    fetch(`${BASE_URL}/email/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => {
        console.log(err);
      });

    const socket = io(BASE_URL);

    socket.on(
      'email-stats',
      (data) => {
        setStats(data);
      }
    );

    return () => {
      socket.disconnect();
    };

  }, []);

  //////////////////////////////////////////////////
  // 👥 LOAD USERS
  //////////////////////////////////////////////////
  useEffect(() => {

    const loadUsers = async () => {

      try {

        setLoadingUsers(true);

        const res = await api.get(
          '/admin/users'
        );

        setUsers(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoadingUsers(false);
      }
    };

    loadUsers();

  }, []);

  //////////////////////////////////////////////////
  // ✉️ SEND EMAIL
  //////////////////////////////////////////////////
  const handleSend = async () => {

    //////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////
    if (
      !sendToAll &&
      !selectedEmail
    ) {
      return alert(
        'Select a user ❌'
      );
    }

    if (!subject.trim()) {
      return alert(
        'Subject required ❌'
      );
    }

    if (!message.trim()) {
      return alert(
        'Message required ❌'
      );
    }

    //////////////////////////////////////////////////
    // SEND
    //////////////////////////////////////////////////
    try {

      setSending(true);

      await api.post(
        '/admin/send-email',
        {
          email:
            sendToAll
              ? null
              : selectedEmail,

          subject,
          message,
          sendToAll,
        }
      );

      //////////////////////////////////////////////////
      // SUCCESS
      //////////////////////////////////////////////////
      alert(
        '✅ Email sent successfully'
      );

      // RESET
      setSubject('');
      setMessage('');
      setSelectedEmail('');

    } catch (err) {

      console.log(err);

      alert(
        '❌ Failed to send email'
      );

    } finally {

      setSending(false);
    }
  };

  //////////////////////////////////////////////////
  // 🔥 UI
  //////////////////////////////////////////////////
  return (
    <div style={styles.page}>

      {/* 📊 STATS */}
      <div style={styles.statsRow}>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>
            Sent
          </p>

          <h2 style={styles.statNumber}>
            {stats.sent}
          </h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>
            Opened
          </p>

          <h2 style={styles.statNumber}>
            {stats.opened}
          </h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>
            Clicked
          </p>

          <h2 style={styles.statNumber}>
            {stats.clicked}
          </h2>
        </div>

      </div>

      {/* 🔥 MAIN CARD */}
      <div style={styles.card}>

        <h2 style={styles.title}>
          📧 Email Center
        </h2>

        <p style={styles.subtitle}>
          Send announcements,
          updates, promotions,
          and platform alerts
        </p>

        {/* 🔥 TOGGLE */}
        <div style={styles.toggleWrap}>

          <button
            style={
              !sendToAll
                ? styles.activeToggle
                : styles.toggle
            }
            onClick={() =>
              setSendToAll(false)
            }
          >
            Single User
          </button>

          <button
            style={
              sendToAll
                ? styles.activeToggle
                : styles.toggle
            }
            onClick={() =>
              setSendToAll(true)
            }
          >
            Send To All Users
          </button>

        </div>

        {/* 👤 SELECT USER */}
        {!sendToAll && (
          <div style={styles.field}>

            <label style={styles.label}>
              Select User
            </label>

            <select
              style={styles.input}
              value={selectedEmail}
              onChange={(e) =>
                setSelectedEmail(
                  e.target.value
                )
              }
            >

              <option value="">
                {loadingUsers
                  ? 'Loading users...'
                  : 'Choose user...'}
              </option>

              {users.map((u) => (
                <option
                  key={u.id}
                  value={u.email}
                >
                  {u.email}
                </option>
              ))}

            </select>

          </div>
        )}

        {/* ✉️ SUBJECT */}
        <div style={styles.field}>

          <label style={styles.label}>
            Subject
          </label>

          <input
            style={styles.input}
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
            placeholder="🔥 New update"
          />

        </div>

        {/* 💬 MESSAGE */}
        <div style={styles.field}>

          <label style={styles.label}>
            Message
          </label>

          <textarea
            style={styles.textarea}
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Write message..."
          />

        </div>

        {/* 🚀 SEND */}
        <button
          style={{
            ...styles.button,
            opacity:
              sending ? 0.7 : 1,
            cursor:
              sending
                ? 'not-allowed'
                : 'pointer',
          }}
          onClick={handleSend}
          disabled={sending}
        >

          {sending
            ? 'Sending...'
            : '🚀 Send Email'}

        </button>

      </div>

    </div>
  );
}

/* =========================
🎨 STYLES
========================= */

const styles = {

  page: {
    padding: 40,

    background:
      'linear-gradient(135deg,#020617,#0f172a,#111827)',

    minHeight: '100vh',

    color: '#fff',
  },

  statsRow: {
    display: 'grid',

    gridTemplateColumns:
      'repeat(auto-fit,minmax(180px,1fr))',

    gap: 20,

    marginBottom: 25,
  },

  statCard: {
    background:
      'rgba(15,23,42,0.9)',

    padding: 20,

    borderRadius: 16,

    border:
      '1px solid rgba(255,255,255,0.05)',

    textAlign: 'center',

    backdropFilter:
      'blur(10px)',
  },

  statLabel: {
    color: '#94a3b8',

    marginBottom: 10,

    fontSize: 14,
  },

  statNumber: {
    margin: 0,

    fontSize: 30,

    fontWeight: '800',

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    WebkitBackgroundClip:
      'text',

    WebkitTextFillColor:
      'transparent',
  },

  card: {
    maxWidth: 750,

    margin: '0 auto',

    background:
      'rgba(11,18,32,0.95)',

    borderRadius: 24,

    padding: 30,

    border:
      '1px solid rgba(255,255,255,0.05)',

    boxShadow:
      '0 10px 40px rgba(0,0,0,0.45)',
  },

  title: {
    margin: 0,

    marginBottom: 10,

    fontSize: 28,

    fontWeight: '800',

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    WebkitBackgroundClip:
      'text',

    WebkitTextFillColor:
      'transparent',
  },

  subtitle: {
    color: '#94a3b8',

    marginBottom: 25,

    fontSize: 14,
  },

  toggleWrap: {
    display: 'flex',

    gap: 12,

    marginBottom: 25,

    flexWrap: 'wrap',
  },

  toggle: {
    flex: 1,

    minWidth: 180,

    padding: 12,

    borderRadius: 12,

    border:
      '1px solid #334155',

    background: '#020617',

    color: '#94a3b8',

    cursor: 'pointer',

    fontWeight: '600',
  },

  activeToggle: {
    flex: 1,

    minWidth: 180,

    padding: 12,

    borderRadius: 12,

    border: 'none',

    background:
      'linear-gradient(135deg,#ff003c,#7c3aed)',

    color: '#fff',

    fontWeight: '700',

    cursor: 'pointer',

    boxShadow:
      '0 0 25px rgba(124,58,237,0.35)',
  },

  field: {
    display: 'flex',

    flexDirection: 'column',

    gap: 8,

    marginBottom: 18,
  },

  label: {
    color: '#cbd5e1',

    fontSize: 13,

    fontWeight: '600',
  },

  input: {
    background: '#020617',

    border:
      '1px solid #334155',

    borderRadius: 12,

    padding: 14,

    color: '#e2e8f0',

    outline: 'none',

    fontSize: 14,
  },

  textarea: {
    background: '#020617',

    border:
      '1px solid #334155',

    borderRadius: 12,

    padding: 14,

    color: '#e2e8f0',

    minHeight: 150,

    resize: 'vertical',

    outline: 'none',

    fontSize: 14,
  },

  button: {
    width: '100%',

    marginTop: 10,

    background:
      'linear-gradient(135deg,#ff003c,#7c3aed)',

    border: 'none',

    borderRadius: 14,

    padding: 14,

    color: '#fff',

    fontWeight: '700',

    fontSize: 15,

    transition: '0.2s',
  },
};