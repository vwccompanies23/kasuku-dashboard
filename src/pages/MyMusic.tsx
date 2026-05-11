import { useEffect, useState, useRef } from 'react';
import { api } from '../api';
import { io } from 'socket.io-client';
import WaveSurfer from 'wavesurfer.js';

import logo from '../assets/kasuku-logo.png';

//////////////////////////////////////////////////
// 🔥 BACKEND URL
//////////////////////////////////////////////////
const BASE_URL = 'http://localhost:3000';

//////////////////////////////////////////////////
// 🔥 FIX URL
//////////////////////////////////////////////////
const fixUrl = (path) => {
  if (!path) return '';

  if (path.startsWith('http')) {
    return path;
  }

  if (path.startsWith('/')) {
    return `${BASE_URL}${path}`;
  }

  return `${BASE_URL}/uploads/${path}`;
};

//////////////////////////////////////////////////
// 🔥 AUDIO PLAYER
//////////////////////////////////////////////////
const AudioPlayer = ({ src }) => {
  const ref = useRef(null);

  const ws = useRef(null);

  const [playing, setPlaying] =
    useState(false);

  useEffect(() => {
    if (!ref.current || !src) return;

    if (ws.current) {
      ws.current.destroy();
    }

    ws.current = WaveSurfer.create({
      container: ref.current,

      waveColor: '#7c3aed',

      progressColor: '#ff003c',

      cursorColor: '#ffffff',

      barWidth: 3,

      barRadius: 4,

      height: 70,

      responsive: true,

      normalize: true,
    });

    ws.current.load(src);

    ws.current.on('finish', () => {
      setPlaying(false);
    });

    return () => {
      if (ws.current) {
        ws.current.destroy();
      }
    };
  }, [src]);

  const toggle = () => {
    if (!ws.current) return;

    ws.current.playPause();

    setPlaying(!playing);
  };

  return (
    <div style={{ marginTop: 14 }}>
      <div
        ref={ref}
        style={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: 12,
        }}
      />

      <button
        onClick={toggle}
        style={styles.playBtn}
      >
        {playing
          ? '⏸ Pause'
          : '▶️ Play'}
      </button>
    </div>
  );
};

//////////////////////////////////////////////////
// 🔥 MAIN COMPONENT
//////////////////////////////////////////////////
export default function MyReleases() {
  const [releases, setReleases] =
    useState([]);

  const [filter, setFilter] =
    useState('pending');

  const [loading, setLoading] =
    useState(true);

  //////////////////////////////////////////////////
  // 🔥 FETCH RELEASES
  //////////////////////////////////////////////////
  const fetchReleases = async () => {

    try {

      const userId =
        localStorage.getItem('userId');

      const token =
        localStorage.getItem('token');

      console.log(
        '🔥 USER ID:',
        userId,
      );

      console.log(
        '🔥 TOKEN:',
        token,
      );

      //////////////////////////////////////////////////
      // 🔒 AUTH CHECK
      //////////////////////////////////////////////////
      if (!userId || !token) {

        console.log(
          '❌ NO AUTH FOUND',
        );

        window.location.href =
          '/login';

        return;
      }

      //////////////////////////////////////////////////
      // 🔥 FETCH MUSIC
      //////////////////////////////////////////////////
      const res = await api.get(
        `/music?userId=${userId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      console.log(
        '🔥 MUSIC RESPONSE:',
        res.data,
      );

      //////////////////////////////////////////////////
      // 🔥 INVALID RESPONSE
      //////////////////////////////////////////////////
      if (!Array.isArray(res.data)) {

        setReleases([]);

        setLoading(false);

        return;
      }

      //////////////////////////////////////////////////
      // 🔥 MAP DATA
      //////////////////////////////////////////////////
      const mapped = res.data.map(
        (m) => ({
          id: m.id,

          title:
            m.title ||
            'Untitled',

          artistName:
            m.artistName ||
            m.artist ||
            'Unknown Artist',

          status:
            m.status ||
            'processing',

          coverUrl:
            m.coverUrl ||
            m.cover ||
            null,

          fileUrl:
            m.fileUrl ||
            m.cloudinaryUrl ||
            null,
        }),
      );

      console.log(
        '🔥 FINAL RELEASES:',
        mapped,
      );

      setReleases(mapped);

      setLoading(false);

    } catch (err) {

      console.log(
        '❌ FETCH RELEASES ERROR',
      );

      console.log(err);

      setLoading(false);
    }
  };

  //////////////////////////////////////////////////
  // 🔥 INITIAL LOAD
  //////////////////////////////////////////////////
  useEffect(() => {
    fetchReleases();

    const interval = setInterval(() => {
      fetchReleases();
    }, 5000);

    return () =>
      clearInterval(interval);
  }, []);

  //////////////////////////////////////////////////
  // 🔥 SOCKET
  //////////////////////////////////////////////////
  useEffect(() => {
    const socket = io(BASE_URL);

    socket.on(
      'release:update',
      (data) => {
        setReleases((prev) =>
          prev.map((r) =>
            r.id === data.releaseId
              ? {
                  ...r,
                  status: data.status,
                }
              : r,
          ),
        );
      },
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  //////////////////////////////////////////////////
  // 🔥 DELETE
  //////////////////////////////////////////////////
  const handleDelete = async (
    id,
  ) => {

    const token =
      localStorage.getItem('token');

    const ok = window.confirm(
      'Delete this release?',
    );

    if (!ok) return;

    try {

      await api.delete(
        `/music/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      fetchReleases();

    } catch (err) {

      console.log(err);

      alert('Delete failed ❌');
    }
  };

  //////////////////////////////////////////////////
  // 🔥 FILTER
  //////////////////////////////////////////////////
  const filtered =
    releases.filter((r) => {

      if (filter === 'all') {
        return true;
      }

      if (filter === 'pending') {
        return [
          'pending',
          'processing',
        ].includes(r.status);
      }

      return r.status === filter;
    });

  //////////////////////////////////////////////////
  // 🔥 UI
  //////////////////////////////////////////////////
  return (
    <div style={styles.container}>

      {/* 🔥 BACKGROUND GLOW */}
      <div style={styles.glow1} />

      <div style={styles.glow2} />

      {/* 🔥 HEADER */}
      <div style={styles.header}>

        <div style={styles.logoWrap}>

          <img
            src={logo}
            alt="Kasuku Logo"
            style={styles.logo}
          />

          <div>
            <h1 style={styles.title}>
              My Releases
            </h1>

            <p style={styles.subtitle}>
              Track all your published
              and pending releases
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 FILTERS */}
      <div style={styles.tabs}>
        {[
          'pending',
          'approved',
          'live',
          'draft',
          'all',
        ].map((t) => (
          <button
            key={t}
            onClick={() =>
              setFilter(t)
            }
            style={{
              ...styles.tab,

              background:
                filter === t
                  ? 'linear-gradient(90deg,#ff003c,#7c3aed)'
                  : 'rgba(255,255,255,0.05)',
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🔥 LOADING */}
      {loading && (
        <div style={styles.empty}>
          <img
            src={logo}
            alt="Kasuku"
            style={styles.emptyLogo}
          />

          <h2>Loading releases...</h2>
        </div>
      )}

      {/* 🔥 EMPTY */}
      {!loading &&
        filtered.length === 0 && (
          <div style={styles.empty}>
            <img
              src={logo}
              alt="Kasuku"
              style={styles.emptyLogo}
            />

            <h2>
              No releases found
            </h2>

            <p>
              Upload music and it
              will appear here
              automatically
            </p>
          </div>
        )}

      {/* 🔥 RELEASES */}
      {filtered.map((r) => (
        <div
          key={r.id}
          style={styles.card}
        >

          {/* 🔥 COVER */}
          <img
            src={
              r.coverUrl
                ? fixUrl(
                    r.coverUrl,
                  )
                : logo
            }
            alt={r.title}
            style={styles.cover}
          />

          {/* 🔥 INFO */}
          <div style={{ flex: 1 }}>

            <h2 style={styles.songTitle}>
              {r.title}
            </h2>

            <p style={styles.artist}>
              {r.artistName}
            </p>

            {/* 🔥 AUDIO */}
            {r.fileUrl && (
              <AudioPlayer
                src={fixUrl(
                  r.fileUrl,
                )}
              />
            )}

            {/* 🔥 STATUS */}
            <div
              style={{
                marginTop: 16,
              }}
            >
              <span
                style={getStatusStyle(
                  r.status,
                )}
              >
                {[
                  'pending',
                  'processing',
                ].includes(
                  r.status,
                ) &&
                  '⏳ Pending'}

                {r.status ===
                  'approved' &&
                  '✅ Approved'}

                {r.status ===
                  'live' &&
                  '🚀 Live'}

                {r.status ===
                  'draft' &&
                  '📝 Draft'}
              </span>
            </div>

            {/* 🔥 ACTIONS */}
            <div
              style={styles.actions}
            >

              <button
                onClick={() =>
                  (window.location.href = `/edit/${r.id}`)
                }
                style={styles.editBtn}
              >
                ✏️ Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(
                    r.id,
                  )
                }
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
// 🎨 STYLES
//////////////////////////////////////////////////
const styles = {
  container: {
    position: 'relative',

    minHeight: '100vh',

    padding: 25,

    overflow: 'hidden',

    color: '#ffffff',

    background: `
      radial-gradient(circle at top left,
      rgba(124,58,237,0.18),
      transparent 30%),

      radial-gradient(circle at top right,
      rgba(255,0,60,0.18),
      transparent 30%),

      linear-gradient(
        to bottom,
        #000000,
        #050505,
        #0a0a0a
      )
    `,
  },

  glow1: {
    position: 'absolute',

    top: -150,

    left: -120,

    width: 400,

    height: 400,

    borderRadius: '50%',

    background:
      'rgba(124,58,237,0.18)',

    filter: 'blur(120px)',
  },

  glow2: {
    position: 'absolute',

    bottom: -150,

    right: -120,

    width: 400,

    height: 400,

    borderRadius: '50%',

    background:
      'rgba(255,0,60,0.16)',

    filter: 'blur(120px)',
  },

  header: {
    position: 'relative',

    zIndex: 2,

    marginBottom: 35,
  },

  logoWrap: {
    display: 'flex',

    alignItems: 'center',

    gap: 18,
  },

  logo: {
    width: 90,

    height: 90,

    objectFit: 'contain',

    display: 'block',

    filter:
      'drop-shadow(0 0 25px rgba(255,0,60,0.45))',
  },

  title: {
    margin: 0,

    fontSize: 40,

    fontWeight: '900',

    color: '#ffffff',
  },

  subtitle: {
    marginTop: 6,

    color: '#aaaaaa',

    fontSize: 14,
  },

  tabs: {
    position: 'relative',

    zIndex: 2,

    display: 'flex',

    gap: 12,

    flexWrap: 'wrap',

    marginBottom: 28,
  },

  tab: {
    border: 'none',

    color: '#ffffff',

    padding: '11px 20px',

    borderRadius: 14,

    cursor: 'pointer',

    fontWeight: 'bold',

    fontSize: 13,

    backdropFilter: 'blur(10px)',

    transition: '0.2s',

    boxShadow:
      '0 0 20px rgba(124,58,237,0.12)',
  },

  empty: {
    position: 'relative',

    zIndex: 2,

    textAlign: 'center',

    marginTop: 100,

    color: '#888888',
  },

  emptyLogo: {
    width: 120,

    marginBottom: 20,

    opacity: 0.95,

    filter:
      'drop-shadow(0 0 25px rgba(255,0,60,0.4))',
  },

  card: {
    position: 'relative',

    zIndex: 2,

    display: 'flex',

    gap: 20,

    padding: 22,

    marginBottom: 24,

    borderRadius: 22,

    background:
      'rgba(15,15,15,0.88)',

    border:
      '1px solid rgba(255,255,255,0.06)',

    boxShadow: `
      0 0 30px rgba(124,58,237,0.12),
      0 0 40px rgba(255,0,60,0.10)
    `,

    backdropFilter:
      'blur(12px)',
  },

  cover: {
    width: 150,

    height: 150,

    borderRadius: 18,

    objectFit: 'cover',

    background: '#111111',

    border:
      '1px solid rgba(255,255,255,0.08)',
  },

  songTitle: {
    margin: 0,

    marginBottom: 8,

    fontSize: 26,

    fontWeight: '800',
  },

  artist: {
    margin: 0,

    color: '#aaaaaa',

    fontSize: 15,
  },

  playBtn: {
    marginTop: 12,

    border: 'none',

    color: '#ffffff',

    cursor: 'pointer',

    fontWeight: '700',

    borderRadius: 12,

    padding: '10px 18px',

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    boxShadow:
      '0 0 20px rgba(255,0,60,0.35)',
  },

  actions: {
    display: 'flex',

    gap: 12,

    marginTop: 18,
  },

  editBtn: {
    border: 'none',

    color: '#ffffff',

    cursor: 'pointer',

    fontWeight: 'bold',

    borderRadius: 12,

    padding: '10px 18px',

    background:
      'linear-gradient(90deg,#7c3aed,#5b21b6)',
  },

  deleteBtn: {
    border: 'none',

    color: '#ffffff',

    cursor: 'pointer',

    fontWeight: 'bold',

    borderRadius: 12,

    padding: '10px 18px',

    background:
      'linear-gradient(90deg,#ff003c,#dc2626)',
  },
};

//////////////////////////////////////////////////
// 🔥 STATUS STYLE
//////////////////////////////////////////////////
function getStatusStyle(status) {

  let bg = '#444444';

  if (
    status === 'pending' ||
    status === 'processing'
  ) {
    bg =
      'linear-gradient(90deg,#f59e0b,#ff8800)';
  }

  if (status === 'approved') {
    bg =
      'linear-gradient(90deg,#22c55e,#16a34a)';
  }

  if (status === 'live') {
    bg =
      'linear-gradient(90deg,#00c853,#00e676)';
  }

  if (status === 'draft') {
    bg =
      'linear-gradient(90deg,#666,#444)';
  }

  return {
    display: 'inline-block',

    padding: '8px 14px',

    borderRadius: 999,

    background: bg,

    color: '#ffffff',

    fontWeight: 'bold',

    fontSize: 12,
  };
}