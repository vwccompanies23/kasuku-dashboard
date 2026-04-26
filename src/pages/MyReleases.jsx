import { useEffect, useState } from 'react';
import { api, deleteRelease } from '../api';
import { io } from 'socket.io-client';

export default function MyReleases() {
  const [releases, setReleases] = useState([]);
  const [filter, setFilter] = useState('all');

  // 🔥 NEW
  const [showPopup, setShowPopup] = useState(false);
  const [loadingDistribute, setLoadingDistribute] = useState(null);

  useEffect(() => {
    fetchReleases();

    // 🔥 LIVE AUTO UPDATE (every 5 seconds)
    const interval = setInterval(() => {
      fetchReleases();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const socket = io('http://localhost:3000');

  socket.on('release:update', (data) => {
    setReleases((prev) =>
      prev.map((r) => {
        if (
          r.id === data.releaseId ||
          r.distributionId === data.distributionId
        ) {
          return { ...r, status: data.status };
        }
        return r;
      })
    );
  });

  return () => socket.disconnect();
}, []);

  const fetchReleases = async () => {
    try {
      const res = await api.get('/releases/me');
      setReleases(res.data || []);
    } catch (err) {
      console.error('❌ FRONTEND ERROR:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this release?')) return;

    try {
      await deleteRelease(id);
      fetchReleases();
    } catch (err) {
      alert('❌ Failed to delete');
    }
  };

  // =========================
  // 🔥 DISTRIBUTE (LOCKED)
  // =========================
  const handleDistribute = async (id) => {
    try {
      setLoadingDistribute(id);

      await api.post(`/releases/${id}/distribute`);

      alert('🚀 Submitted for distribution!');

      // 🔥 INSTANT REFRESH
      fetchReleases();

    } catch (err) {
      console.log(err);

      if (err.response?.status === 403) {
        setShowPopup(true);
      } else {
        alert('❌ Failed to distribute');
      }
    } finally {
      setLoadingDistribute(null);
    }
  };

  // =========================
  // 🔥 SHARE
  // =========================
  const handleShare = async (url) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Release',
          text: 'Check out my music 🔥',
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('🔗 Link copied!');
      }
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  const getPublicUrl = (slug) => {
    return `${window.location.origin}/release/${slug}`;
  };

  const filtered = releases.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👽 My Releases</h1>

      {/* TABS */}
      <div style={styles.tabs}>
        {['all', 'live', 'submitted', 'draft', 'processing', 'delivered'].map((t) => (
          <div
            key={t}
            onClick={() => setFilter(t)}
            style={{
              ...styles.tab,
              background: filter === t ? '#7c3aed' : '#222',
            }}
          >
            {t.toUpperCase()}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ color: '#888' }}>No releases found</p>
      )}

      {filtered.map((r) => (
        <div key={r.id} style={styles.card}>
          {r.music?.[0]?.coverUrl && (
            <img
              src={`http://localhost:3000${r.music[0].coverUrl}`}
              style={styles.cover}
            />
          )}

          <div style={{ flex: 1 }}>
            <h3>{r.title}</h3>
            <p style={{ color: '#888' }}>{r.artistName}</p>

            {r.releaseDate && (
              <p style={styles.date}>
                {new Date(r.releaseDate).toLocaleDateString()}
              </p>
            )}

            {/* 🔥 SHARE + OPEN */}
            {r.slug && (
              <div style={styles.actions}>
                <button
                  onClick={() =>
                    window.open(getPublicUrl(r.slug), '_blank')
                  }
                  style={styles.openBtn}
                >
                  🌍 Open
                </button>

                <button
                  onClick={() =>
                    handleShare(getPublicUrl(r.slug))
                  }
                  style={styles.shareBtnBig}
                >
                  📤 Share
                </button>
              </div>
            )}

            {/* 🔥 DISTRIBUTE BUTTON */}
            {r.status === 'draft' && (
              <button
                onClick={() => handleDistribute(r.id)}
                style={styles.distributeBtn}
              >
                {loadingDistribute === r.id
                  ? 'Processing...'
                  : '🚀 Distribute'}
              </button>
            )}

            {/* TRACKS */}
            {r.music?.map((track, i) => (
              <div key={i} style={{ marginTop: 10 }}>
                <p style={{ fontSize: 12 }}>{track.title}</p>
                <audio
                  controls
                  src={`http://localhost:3000${track.fileUrl}`}
                  style={{ width: '100%' }}
                />
              </div>
            ))}

            {/* STATUS */}
            <div style={{ marginTop: 10 }}>
              <span style={getStatusStyle(r.status)}>
                {r.status}
              </span>
            </div>

            <button
              onClick={() => handleDelete(r.id)}
              style={styles.deleteBtn}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}

      {/* ========================= */}
      {/* 🔥 POPUP */}
      {/* ========================= */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h2 style={{ color: '#ff003c' }}>
              🚀 Upgrade Required
            </h2>

            <p style={{ color: '#aaa', marginTop: 10 }}>
              You need a subscription to distribute music.
            </p>

            <button
              onClick={() => (window.location.href = '/payment')}
              style={styles.upgradeBtn}
            >
              Upgrade Now
            </button>

            <button
              onClick={() => setShowPopup(false)}
              style={styles.closeBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================
// 🎨 STYLES (UNCHANGED)
// =========================
const styles = {
  container: {
    padding: 25,
    color: '#fff',
    background: 'radial-gradient(circle at top, #0f172a, #020617)',
    minHeight: '100vh',
  },
  title: { fontSize: 28, marginBottom: 20, color: '#7c3aed' },
  tabs: { display: 'flex', gap: 10, marginTop: 20 },
  tab: { padding: '8px 16px', borderRadius: 10, cursor: 'pointer' },
  card: {
    display: 'flex',
    gap: 20,
    background: '#0f172a',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
  },
  cover: { width: 120, height: 120, borderRadius: 10 },
  date: { fontSize: 12, color: '#aaa' },
  actions: { display: 'flex', gap: 10, marginTop: 10 },
  openBtn: {
    padding: '6px 12px',
    background: '#111',
    border: '1px solid #7c3aed',
    color: '#fff',
    borderRadius: 8,
    cursor: 'pointer',
  },
  shareBtnBig: {
    padding: '6px 12px',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 8,
    cursor: 'pointer',
  },
  distributeBtn: {
    marginTop: 10,
    padding: '8px 12px',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 8,
    cursor: 'pointer',
  },
  deleteBtn: {
    marginTop: 10,
    background: 'red',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: 6,
    cursor: 'pointer',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    background: '#0f172a',
    padding: 30,
    borderRadius: 16,
    textAlign: 'center',
    boxShadow: '0 0 30px rgba(124,58,237,0.6)',
  },
  upgradeBtn: {
    marginTop: 15,
    padding: 12,
    width: '100%',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 10,
    cursor: 'pointer',
  },
  closeBtn: {
    marginTop: 10,
    padding: 10,
    width: '100%',
    background: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
  },
};

function getStatusStyle(status) {
  let bg = '#333';

  if (status === 'live') bg = 'green';
  if (status === 'submitted') bg = 'orange';
  if (status === 'processing') bg = '#3b82f6';
  if (status === 'delivered') bg = '#22c55e';
  if (status === 'draft') bg = '#555';
  if (status === 'failed') bg = 'red';

  return {
    padding: '4px 10px',
    borderRadius: 6,
    background: bg,
    color: '#fff',
    fontSize: 12,
  };
}