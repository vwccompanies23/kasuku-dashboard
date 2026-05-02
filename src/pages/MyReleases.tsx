import { useEffect, useState, useRef } from 'react';
import { api } from '../api';
import { io } from 'socket.io-client';
import WaveSurfer from 'wavesurfer.js';

import logo from '../assets/kasuku-logo.png';

const BASE_URL = 'https://kasuku-backend.onrender.com';

// 🔥 FIX URL
const fixUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) return `${BASE_URL}${path}`;
  return `${BASE_URL}/uploads/${path}`;
};

//////////////////////////////////////////////////
// 🔥 AUDIO PLAYER (REAL WAVEFORM)
//////////////////////////////////////////////////
const AudioPlayer = ({ src }) => {
  const ref = useRef(null);
  const ws = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    if (ws.current) ws.current.destroy();

    ws.current = WaveSurfer.create({
      container: ref.current,
      waveColor: '#7c3aed',
      progressColor: '#ff003c',
      cursorColor: '#fff',
      barWidth: 3,
      barRadius: 3,
      height: 80,
      responsive: true,
      normalize: true,
    });

    ws.current.load(src);

    ws.current.on('finish', () => setPlaying(false));

    return () => ws.current.destroy();
  }, [src]);

  const toggle = () => {
    ws.current.playPause();
    setPlaying(!playing);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div ref={ref} style={{ borderRadius: 10, overflow: 'hidden' }} />

      <button onClick={toggle} style={styles.playBtn}>
        {playing ? '⏸ Pause' : '▶️ Play'}
      </button>
    </div>
  );
};

//////////////////////////////////////////////////
// 🔥 MAIN COMPONENT
//////////////////////////////////////////////////
export default function MyReleases() {
  const [releases, setReleases] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReleases();
    const interval = setInterval(fetchReleases, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const socket = io(BASE_URL);

    socket.on('release:update', (data) => {
      setReleases((prev) =>
        prev.map((r) =>
          r.id === data.releaseId
            ? { ...r, status: data.status }
            : r
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  const fetchReleases = async () => {
    try {
      let res = await api.get('/releases/me');

      if (!res.data || res.data.length === 0) {
        const userId = localStorage.getItem('userId') || '1';
        const alt = await api.get(`/music?userId=${userId}`);

        const mapped = alt.data.map((m) => ({
          id: m.id,
          title: m.title,
          artistName: m.artist,
          status: m.status || 'pending',
          music: [
            {
              fileUrl: m.fileUrl,
              coverUrl: m.coverUrl,
            },
          ],
        }));

        setReleases(mapped);
        return;
      }

      setReleases(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;

    try {
      await api.delete(`/music/${id}`);
      fetchReleases();
    } catch {
      alert('Delete failed');
    }
  };

  const filtered = releases.filter((r) =>
    filter === 'all' ? true : r.status === filter
  );

  return (
    <div style={styles.container}>

      {/* 🔥 RED GLOW BACKGROUND LIKE YOUR IMAGE */}
      <div style={styles.header}>
      <img src={logo} style={styles.logo} />
      <h1 style={styles.title}>My Releases</h1>
      </div>

      {/* TABS */}
      <div style={styles.tabs}>
        {['all','pending','reviewing','approved','live','draft'].map((t) => (
          <div
            key={t}
            onClick={() => setFilter(t)}
            style={{
              ...styles.tab,
              background:
                filter === t
                  ? 'linear-gradient(90deg,#ff003c,#7c3aed)'
                  : '#111',
            }}
          >
            {t.toUpperCase()}
          </div>
        ))}
      </div>

      {/* LIST */}
      {filtered.map((r) => (
        <div key={r.id} style={styles.card}>

          <img
            src={fixUrl(r.music?.[0]?.coverUrl)}
            style={styles.cover}
          />

          <div style={{ flex: 1 }}>
            <h3>{r.title}</h3>
            <p style={{ color: '#aaa' }}>{r.artistName}</p>

            {/* 🔥 REAL WAVE */}
            {r.music?.map((track, i) => (
              <AudioPlayer key={i} src={fixUrl(track.fileUrl)} />
            ))}

            {/* STATUS */}
            <div style={{ marginTop: 10 }}>
              <span style={getStatusStyle(r.status)}>
                {r.status === 'pending' && '⏳ Waiting for review'}
                {r.status === 'reviewing' && '👀 Under review'}
                {r.status === 'approved' && '✅ Approved'}
                {r.status === 'live' && '🚀 Live'}
                {r.status === 'draft' && '📝 Draft'}
              </span>
            </div>

            {/* ACTIONS */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => window.location.href = `/edit/${r.id}`}
                style={styles.editBtn}
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => handleDelete(r.id)}
                style={styles.deleteBtn}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

//////////////////////////////////////////////////
// 🎨 PREMIUM STYLES
//////////////////////////////////////////////////

const styles = {
  container: {
    padding: 25,
    color: '#fff',
    minHeight: '100vh',
    background: '#000',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
  },

  logo: {
    width: 80,
    height: 80,
    objectFit: 'contain',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  tabs: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },

  tab: {
    padding: '8px 16px',
    borderRadius: 10,
    cursor: 'pointer',
  },

  card: {
    display: 'flex',
    gap: 20,
    background: '#0a0a0a',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    boxShadow:
      '0 0 20px rgba(255,0,0,0.4), 0 0 20px rgba(124,58,237,0.4)',
  },

  cover: {
    width: 120,
    height: 120,
    borderRadius: 10,
    objectFit: 'cover',
  },

  playBtn: {
    marginTop: 10,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: 8,
    cursor: 'pointer',
  },

  editBtn: {
    marginTop: 10,
    background: '#7c3aed',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: 6,
  },

  deleteBtn: {
    marginTop: 10,
    background: 'red',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: 6,
  },
};

function getStatusStyle(status) {
  let bg = '#333';

  if (status === 'pending') bg = '#f59e0b';
  if (status === 'reviewing') bg = '#3b82f6';
  if (status === 'approved') bg = '#22c55e';
  if (status === 'live') bg = '#16a34a';
  if (status === 'draft') bg = '#555';

  return {
    padding: '4px 10px',
    borderRadius: 6,
    background: bg,
    color: '#fff',
    fontSize: 12,
  };
}