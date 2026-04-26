import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';

export default function PublicRelease() {
  const { slug } = useParams();
  const [release, setRelease] = useState(null);

  useEffect(() => {
    fetchRelease();
  }, [slug]); // 🔥 FIX (react to slug change)

  const fetchRelease = async () => {
    try {
      const res = await api.get(`/releases/slug/${slug}`);
      setRelease(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥🔥🔥 UPGRADED SHARE (same as MyReleases)
  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: release?.title || 'My Release',
          text: 'Check out this music 🔥',
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('🔗 Share link copied!');
      }
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  if (!release) {
    return (
      <div style={{ color: '#fff', padding: 20 }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* COVER */}
        {release.music?.[0]?.coverUrl && (
          <img
            src={`http://localhost:3000${release.music[0].coverUrl}`}
            style={styles.cover}
          />
        )}

        {/* INFO */}
        <h1 style={styles.title}>{release.title}</h1>
        <p style={styles.artist}>{release.artistName}</p>

        {/* DATE */}
        {release.releaseDate && (
          <p style={styles.date}>
            Released:{' '}
            {new Date(release.releaseDate).toDateString()}
          </p>
        )}

        {/* SHARE */}
        <button onClick={handleShare} style={styles.shareBtn}>
          🔗 Share
        </button>

        {/* TRACKS */}
        <div style={{ marginTop: 20 }}>
          <h3 style={styles.section}>Tracks</h3>

          {release.music?.map((track, i) => (
            <div key={i} style={styles.track}>
              <p>{track.title}</p>

              <audio
                controls
                src={`http://localhost:3000${track.fileUrl}`}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>

        {/* PLATFORMS */}
        {release.platformResults?.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h3 style={styles.section}>Listen On</h3>

            {release.platformResults.map((p, i) => (
              <div key={i} style={styles.platformRow}>
                {!p.delivered ? (
                  <span style={styles.processing}>
                    ⏳ Processing...
                  </span>
                ) : (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.platformBtn}
                  >
                    🎧 {p.platformName || p.platform}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, #1a002b, #020617, #000)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    color: '#fff',
  },

  card: {
    width: 520,
    background:
      'linear-gradient(145deg, #0a0a0a, #1a002b)',
    padding: 20,
    borderRadius: 16,
    textAlign: 'center',
    boxShadow:
      '0 0 40px rgba(255,0,60,0.3), 0 0 60px rgba(124,58,237,0.4)',
    border: '1px solid rgba(124,58,237,0.3)',
  },

  cover: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 15,
    boxShadow: '0 0 20px rgba(255,0,60,0.4)',
  },

  title: {
    color: '#ff003c',
  },

  artist: {
    color: '#c084fc',
  },

  date: {
    fontSize: 12,
    color: '#aaa',
  },

  section: {
    color: '#7c3aed',
  },

  track: {
    marginTop: 15,
    background: '#111',
    padding: 10,
    borderRadius: 10,
  },

  platformRow: {
    marginTop: 10,
  },

  platformBtn: {
    display: 'block',
    padding: 10,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    borderRadius: 8,
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },

  processing: {
    color: '#facc15',
    fontSize: 13,
  },

  shareBtn: {
    marginTop: 10,
    padding: '8px 12px',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    borderRadius: 8,
    color: '#fff',
    cursor: 'pointer',
  },
};