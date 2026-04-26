import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function AdminAlbums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const res = await api.get('/releases/admin/pending');
      const data = res.data || [];

      // 🎯 Only albums (more than 1 track)
      const albumsOnly = data.filter(
        (r) => r.music && r.music.length > 1
      );

      setAlbums(albumsOnly);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // 🧠 AI CHECK
  // =========================
  const analyzeAlbum = (album) => {
    const issues = [];

    if (!album.music || album.music.length < 2) {
      issues.push('Album must have at least 2 tracks');
    }

    album.music?.forEach((track, i) => {
      if (track.fileSize && track.fileSize < 1000000) {
        issues.push(`Track ${i + 1} low quality file`);
      }

      if (track.bitrate && track.bitrate < 128) {
        issues.push(`Track ${i + 1} low bitrate`);
      }

      if (track.isDuplicate) {
        issues.push(`Track ${i + 1} duplicate detected`);
      }
    });

    return issues;
  };

  // =========================
  // ✅ APPROVE
  // =========================
  const approve = async (id) => {
    await api.post(`/admin/songs/approve/${id}`);
    setAlbums((prev) => prev.filter((a) => a.id !== id));
  };

  // =========================
  // ❌ REJECT
  // =========================
  const reject = async (id) => {
    await api.post(`/admin/songs/reject/${id}`, {
      reason: 'Did not meet quality standards',
    });

    setAlbums((prev) => prev.filter((a) => a.id !== id));
  };

  // =========================
  // ⚡ BULK APPROVE
  // =========================
  const bulkApprove = async () => {
    const validAlbums = albums.filter(
      (a) => analyzeAlbum(a).length === 0
    );

    for (const album of validAlbums) {
      await api.post(`/admin/songs/approve/${album.id}`);
    }

    loadAlbums();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>💿 Album Approvals</h2>

        <button onClick={bulkApprove} style={styles.bulkBtn}>
          ⚡ Approve All Valid Albums
        </button>
      </div>

      {albums.length === 0 && (
        <p style={{ opacity: 0.6 }}>No albums pending</p>
      )}

      {albums.map((album) => {
        const issues = analyzeAlbum(album);
        const valid = issues.length === 0;

        const totalDuration =
          album.music?.reduce(
            (acc, t) => acc + (t.duration || 0),
            0
          ) || 0;

        return (
          <div key={album.id} style={styles.card}>
            {/* COVER */}
            <img
              src={album.music?.[0]?.cover}
              alt=""
              style={styles.cover}
            />

            {/* INFO */}
            <div style={styles.info}>
              <h3>{album.title}</h3>
              <p style={styles.artist}>{album.artistName}</p>

              <p style={styles.meta}>
                🎵 {album.music.length} tracks • ⏱{' '}
                {Math.floor(totalDuration / 60)} min
              </p>

              {/* 🎧 PLAYER */}
              <div style={styles.tracks}>
                {album.music.map((track, i) => (
                  <div key={i} style={styles.track}>
                    <span>{track.title}</span>
                    <audio controls src={track.fileUrl} />
                  </div>
                ))}
              </div>

              {/* 🧠 AI WARNINGS */}
              {issues.length > 0 && (
                <div style={styles.aiBox}>
                  {issues.map((i, idx) => (
                    <p key={idx} style={styles.aiWarning}>
                      ⚠ {i}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* ACTIONS */}
            <div style={styles.actions}>
              <button
                disabled={!valid}
                onClick={() => approve(album.id)}
                style={{
                  ...styles.approve,
                  background: valid
                    ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                    : '#333',
                }}
              >
                ✔ Approve
              </button>

              <button
                onClick={() => reject(album.id)}
                style={styles.reject}
              >
                ✖ Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =========================
// 🎨 STYLES (YOUR BRAND)
// =========================
const styles = {
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: 20,
    color: '#fff',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  bulkBtn: {
    padding: '10px 18px',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(135deg,#ff003c,#7c3aed)',
    color: '#fff',
    cursor: 'pointer',
  },

  card: {
    display: 'flex',
    gap: 20,
    padding: 20,
    borderRadius: 16,
    background: '#0f172a',
    border: '1px solid #1f2937',
    marginBottom: 20,
  },

  cover: {
    width: 120,
    height: 120,
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

  meta: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 10,
  },

  tracks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  track: {
    background: '#020617',
    padding: 10,
    borderRadius: 10,
    border: '1px solid #222',
  },

  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
  },

  approve: {
    padding: '10px 14px',
    borderRadius: 10,
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },

  reject: {
    padding: '10px 14px',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(135deg,#ff003c,#dc2626)',
    color: '#fff',
    cursor: 'pointer',
  },

  aiBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    background: 'rgba(255,0,60,0.1)',
    border: '1px solid rgba(255,0,60,0.3)',
  },

  aiWarning: {
    fontSize: 12,
    color: '#ff4d6d',
  },
};