import { useEffect, useState } from 'react';
import { api } from '../api';

export default function ManageMusic() {
  const [songs, setSongs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const userId = localStorage.getItem('userId');

      const res = await api.get(
        `/music?userId=${userId}`
      );

      console.log('SONGS DATA:', res.data);

      setSongs(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(
        selected.filter((s) => s !== id)
      );
    } else {
      setSelected([...selected, id]);
    }
  };

  const selectAll = () => {
    if (selected.length === songs.length) {
      setSelected([]);
    } else {
      setSelected(
        songs.map((s) => s.id)
      );
    }
  };

  const deleteSongs = async () => {
    if (selected.length === 0) {
      return alert(
        'Select at least one song'
      );
    }

    const confirmDelete =
      window.confirm(
        '⚠️ This will SEND A REQUEST to delete your music.\nAdmin must approve before removal.\n\nContinue?'
      );

    if (!confirmDelete) return;

    try {
      setRequesting(true);

      const userId =
        localStorage.getItem('userId');

      await api.post(
        '/music/request-delete',
        {
          userId,
          ids: selected,
        }
      );

      setRequested(true);
      setSelected([]);

      alert(
        'Delete request sent for approval ✅'
      );
    } catch (err) {
      console.error(err);

      alert(
        'Error sending request ❌'
      );
    } finally {
      setRequesting(false);
    }
  };

  const deleteAccount = async () => {
    const confirmDelete =
      window.confirm(
        '⚠️ This will delete your ENTIRE account.\nAll music, revenue, and data will be lost.\n\nContinue?'
      );

    if (!confirmDelete) return;

    try {
      await api.delete('/users/me');

      alert(
        'Account deleted successfully ❌'
      );

      localStorage.clear();

      window.location.href = '/login';
    } catch (err) {
      console.error(err);

      alert('Error deleting account');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            🎵 Manage My Music
          </h1>

          <p style={styles.subtitle}>
            Control your song across all
            platforms
          </p>
        </div>

        {loading ? (
          <div style={styles.center}>
            Loading...
          </div>
        ) : songs.length === 0 ? (
          <div style={styles.emptyBox}>
            <div style={styles.emptyIcon}>
              🎧
            </div>

            <h2>
              No music released yet
            </h2>

            <p>
              Your tracks will appear
              here once distributed
            </p>
          </div>
        ) : (
          <>
            <div style={styles.topBar}>
              <label
                style={styles.selectAll}
              >
                <input
                  type="checkbox"
                  checked={
                    selected.length ===
                    songs.length
                  }
                  onChange={selectAll}
                />

                Select All
              </label>

              <button
                onClick={deleteSongs}
                style={styles.deleteBtn}
                disabled={
                  requesting || requested
                }
              >
                {requested
                  ? 'Request Sent ✅'
                  : requesting
                  ? 'Sending...'
                  : 'Request Delete'}
              </button>
            </div>

            <div style={styles.grid}>
              {songs.map((song) => (
                <div
                  key={song.id}
                  style={styles.card}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(
                      song.id
                    )}
                    onChange={() =>
                      toggleSelect(song.id)
                    }
                    style={styles.checkbox}
                  />

                  <div
                    style={
                      styles.coverWrapper
                    }
                  >
                    <img
                      src={
                        song.coverUrl
                          ? song.coverUrl.startsWith(
                              'http'
                            )
                            ? song.coverUrl
                            : `https://kasuku-backend.onrender.com${song.coverUrl}`
                          : 'https://via.placeholder.com/500x500?text=KASUKU'
                      }
                      alt={song.title}
                      style={styles.cover}
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://via.placeholder.com/500x500?text=KASUKU';
                      }}
                    />
                  </div>

                  <div
                    style={styles.songInfo}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#fff',
                      }}
                    >
                      {song.title}
                    </h3>

                    <p
                      style={{
                        marginTop: 6,
                        color:
                          'rgba(255,255,255,0.7)',
                        fontSize: 14,
                      }}
                    >
                      {song.artist}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={styles.dangerZone}>
          <h3 style={styles.dangerTitle}>
            Danger Zone
          </h3>

          <button
            onClick={deleteAccount}
            style={styles.deleteAccount}
          >
            ⚠️ Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at center, #0f0f1a 0%, #000 100%)',
    padding: 40,
    color: '#fff',
  },

  container: {
    maxWidth: 1000,
    margin: '0 auto',
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 36,
    marginBottom: 5,
    fontWeight: '800',
  },

  subtitle: {
    opacity: 0.7,
    fontSize: 16,
  },

  center: {
    textAlign: 'center',
    marginTop: 100,
  },

  emptyBox: {
    textAlign: 'center',
    padding: 60,
    background:
      'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: 10,
  },

  topBar: {
    display: 'flex',
    justifyContent:
      'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },

  selectAll: {
    fontWeight: '600',
    fontSize: 18,
  },

  deleteBtn: {
    background:
      'linear-gradient(90deg,#ff003c,#ff4d4d)',
    border: 'none',
    padding: '12px 22px',
    borderRadius: 12,
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: 15,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 24,
  },

  card: {
    background:
      'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 14,
    width: 240,
    backdropFilter:
      'blur(10px)',
    border:
      '1px solid rgba(255,255,255,0.08)',
    position: 'relative',
  },

  coverWrapper: {
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: 16,
    overflow: 'hidden',
    background: '#111',
    marginBottom: 14,
  },

  cover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  checkbox: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
  },

  songInfo: {
    marginTop: 10,
    textAlign: 'left',
  },

  dangerZone: {
    marginTop: 60,
    paddingTop: 30,
    borderTop:
      '1px solid rgba(255,255,255,0.1)',
  },

  dangerTitle: {
    color: '#ff4d4d',
    marginBottom: 12,
    fontSize: 24,
    fontWeight: '700',
  },

  deleteAccount: {
    background:
      'rgba(255,0,0,0.1)',
    border:
      '1px solid rgba(255,0,0,0.4)',
    padding: '12px 20px',
    borderRadius: 12,
    color: '#ff4d4d',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};