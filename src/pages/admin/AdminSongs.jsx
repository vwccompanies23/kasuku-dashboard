import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminSongs() {
  const [tab, setTab] = useState('pending');
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadSongs();
  }, [tab]);

  const loadSongs = async () => {
    try {
      const endpoint =
        tab === 'pending'
          ? '/releases/admin/pending'
          : '/releases';

      const res = await api.get(endpoint);

      let data = res.data;

      // ✅ filter approved manually
      if (tab === 'approved') {
        data = data.filter((r) => r.approvalStatus === 'approved');
      }

      setSongs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const approve = async (id) => {
    try {
      await api.post(`/releases/admin/${id}/approve`);
      setSongs((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const reject = async (id) => {
  const reason = prompt('Enter rejection reason');

  await api.post(`/admin/songs/reject/${id}`, {
    reason,
  });

  setSongs(prev => prev.filter(s => s.id !== id));
};

  const filtered = songs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.artistName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>🎵 Songs</h2>
        <p style={{ opacity: 0.6 }}>
          {tab === 'pending'
            ? `${songs.length} pending songs`
            : `${songs.length} approved songs`}
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

      {/* LIST */}
      {filtered.length === 0 && (
        <p style={{ opacity: 0.6 }}>No songs found</p>
      )}

      <div style={styles.grid}>
        {filtered.map((song) => (
          <div key={song.id} style={styles.card}>

            {/* COVER */}
            <img
              src={`http://localhost:3000${song.music?.[0]?.coverUrl}`}
              alt=""
              style={styles.cover}
            />

            {/* INFO */}
            <div style={styles.info}>
              <h3 style={{ margin: 0 }}>{song.title}</h3>
              <p style={styles.artist}>{song.artistName}</p>

              {/* AUDIO */}
              <audio
                controls
                src={`http://localhost:3000${song.music?.[0]?.fileUrl}`}
                style={styles.audio}
              />
            </div>

            {/* ACTIONS */}
            {tab === 'pending' && (
              <div style={styles.actions}>
                <button
                  onClick={() => approve(song.id)}
                  style={styles.approve}
                >
                  ✔ Approve
                </button>

                <button
                  onClick={() => reject(song.id)}
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

  cover: {
    width: 90,
    height: 90,
    borderRadius: 12,
    objectFit: 'cover',
  },

  info: {
    flex: 1,
  },

  artist: {
    opacity: 0.6,
    marginBottom: 10,
  },

  audio: {
    width: '100%',
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