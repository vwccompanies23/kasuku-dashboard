import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';

export default function SmartLink() {
  const { slug } = useParams();
  const [release, setRelease] = useState(null);

  useEffect(() => {
    fetchRelease();
  }, [slug]);

  const fetchRelease = async () => {
    try {
      const res = await api.get(`/releases/slug/${slug}`);
      setRelease(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: release?.title,
          text: 'Listen to this 🔥',
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('🔗 Link copied!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 NEW (CLICK TRACKING)
  const handleClick = async (platform) => {
    try {
      await api.post('/analytics/track-click', {
        releaseId: release.id,
        platform: platform.platform,
      });

      window.open(platform.url, '_blank');
    } catch (err) {
      console.error('Click tracking failed:', err);
      window.open(platform.url, '_blank');
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

        {/* SHARE */}
        <button onClick={handleShare} style={styles.shareBtn}>
          🔗 Share
        </button>

        {/* ========================= */}
        {/* 🎧 PLATFORM BUTTONS */}
        {/* ========================= */}
        <div style={{ marginTop: 20 }}>
          {release.platformResults?.map((p, i) => (
            <button
              key={i}
              onClick={() => handleClick(p)}
              style={styles.platformBtn}
            >
              <span style={styles.icon}>
                {getPlatformIcon(p.platform)}
              </span>
              {p.platformName || p.platform}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🔥 ICONS
function getPlatformIcon(name) {
  if (name === 'spotify') return '🟢';
  if (name === 'apple') return '🍎';
  if (name === 'youtube') return '🔴';
  return '🎵';
}

// 🎨 👽 ALIEN DESIGN SYSTEM (UNCHANGED)
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
    width: 420,
    background:
      'linear-gradient(145deg, #0a0a0a, #1a002b)',
    padding: 25,
    borderRadius: 16,
    textAlign: 'center',
    boxShadow:
      '0 0 40px rgba(255,0,60,0.4), 0 0 60px rgba(124,58,237,0.5)',
    border: '1px solid rgba(124,58,237,0.3)',
    animation: 'pulseGlow 3s infinite alternate',
  },

  cover: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 15,
    boxShadow: '0 0 20px rgba(255,0,60,0.4)',
  },

  title: {
    color: '#ff003c',
    fontWeight: 'bold',
  },

  artist: {
    color: '#c084fc',
    marginBottom: 10,
  },

  shareBtn: {
    marginTop: 10,
    padding: '8px 14px',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    borderRadius: 8,
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 0 10px rgba(124,58,237,0.6)',
  },

  platformBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 12,
    padding: 12,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    borderRadius: 10,
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    transition: '0.2s',
    boxShadow: '0 0 15px rgba(255,0,60,0.3)',
  },

  icon: {
    fontSize: 18,
  },
};