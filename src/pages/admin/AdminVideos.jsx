import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminVideos() {
  const [tab, setTab] = useState('pending');
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadVideos();
  }, [tab]);

  const loadVideos = async () => {
    const endpoint =
      tab === 'pending'
        ? '/admin/videos/pending'
        : '/admin/videos/approved';

    const res = await api.get(endpoint);
    setVideos(res.data);
  };

  const approve = async (id) => {
    await api.post(`/admin/videos/approve/${id}`);
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const reject = async (id) => {
    await api.post(`/admin/videos/reject/${id}`);
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.artistName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>🎬 Videos</h2>
        <p style={{ opacity: 0.6 }}>
          {tab === 'pending'
            ? `${videos.length} pending videos`
            : `${videos.length} approved videos`}
        </p>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search by title or artist..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* TABS */}
      <div style={styles.tabs}>
        <div
          onClick={() => setTab('pending')}
          style={{
            ...styles.tab,
            ...(tab === 'pending' ? styles.activeTab : {}),
          }}
        >
          Pending
        </div>

        <div
          onClick={() => setTab('approved')}
          style={{
            ...styles.tab,
            ...(tab === 'approved' ? styles.activeTab : {}),
          }}
        >
          Approved
        </div>
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p style={{ opacity: 0.6 }}>No videos found</p>
      )}

      {/* LIST */}
      <div style={styles.grid}>
        {filtered.map((video) => (
          <div key={video.id} style={styles.card}>

            {/* THUMBNAIL */}
            <div style={styles.thumbnailBox}>
              <img src={video.thumbnail} style={styles.thumbnail} />

              {/* PLAY OVERLAY */}
              <div style={styles.playOverlay}>▶</div>
            </div>

            {/* INFO */}
            <div style={styles.info}>
              <h3 style={{ margin: 0 }}>{video.title}</h3>
              <p style={styles.artist}>{video.artistName}</p>

              {/* VIDEO PLAYER */}
              <video controls src={video.videoUrl} style={styles.video} />
            </div>

            {/* ACTIONS */}
            {tab === 'pending' && (
              <div style={styles.actions}>
                <button
                  onClick={() => approve(video.id)}
                  style={styles.approve}
                >
                  ✔ Approve
                </button>

                <button
                  onClick={() => reject(video.id)}
                  style={styles.reject}
                >
                  ✖ Reject
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: 1100,
    margin: '0 auto',
    padding: '20px 0',
  },

  header: {
    marginBottom: 20,
  },

  search: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    border: '1px solid #222',
    background: '#0f172a',
    color: '#fff',
    marginBottom: 20,
  },

  tabs: {
    display: 'flex',
    gap: 10,
    marginBottom: 25,
  },

  tab: {
    padding: '10px 18px',
    borderRadius: 12,
    cursor: 'pointer',
    background: '#111',
    border: '1px solid #222',
  },

  activeTab: {
    background: 'linear-gradient(135deg, #ff003c, #7c3aed)',
  },

  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  card: {
    display: 'flex',
    gap: 20,
    padding: 20,
    background: '#0f172a',
    borderRadius: 16,
    alignItems: 'center',
    border: '1px solid #1f2937',
  },

  thumbnailBox: {
    position: 'relative',
  },

  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 12,
    objectFit: 'cover',
  },

  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0,0.6)',
    borderRadius: '50%',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 18,
  },

  info: {
    flex: 1,
  },

  artist: {
    opacity: 0.6,
    marginBottom: 10,
  },

  video: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 10,
    marginTop: 10,
  },

  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  approve: {
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: 10,
    cursor: 'pointer',
  },

  reject: {
    background: '#ff003c',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: 10,
    cursor: 'pointer',
  },
};