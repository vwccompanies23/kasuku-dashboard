import { useState, useMemo } from 'react';

// ✅ REAL PLATFORMS (WITH REAL DOMAINS)
const PLATFORMS = [
  { id: 'spotify', name: 'Spotify', domain: 'spotify.com' },
  { id: 'apple', name: 'Apple Music', domain: 'apple.com' },
  { id: 'youtube', name: 'YouTube Music', domain: 'youtube.com' },
  { id: 'amazon', name: 'Amazon Music', domain: 'amazon.com' },
  { id: 'tidal', name: 'Tidal', domain: 'tidal.com' },
  { id: 'deezer', name: 'Deezer', domain: 'deezer.com' },
  { id: 'soundcloud', name: 'SoundCloud', domain: 'soundcloud.com' },
  { id: 'boomplay', name: 'Boomplay', domain: 'boomplay.com' },
  { id: 'audiomack', name: 'Audiomack', domain: 'audiomack.com' },
  { id: 'anghami', name: 'Anghami', domain: 'anghami.com' },
  { id: 'pandora', name: 'Pandora', domain: 'pandora.com' },
  { id: 'napster', name: 'Napster', domain: 'napster.com' },
  { id: 'iheartradio', name: 'iHeartRadio', domain: 'iheartradio.com' },
  { id: 'kkbox', name: 'KKBOX', domain: 'kkbox.com' },
  { id: 'jiosaavn', name: 'JioSaavn', domain: 'jiosaavn.com' },
  { id: 'gaana', name: 'Gaana', domain: 'gaana.com' },
  { id: 'yandex', name: 'Yandex Music', domain: 'yandex.ru' },
  { id: 'vk', name: 'VK Music', domain: 'vk.com' },

  // SOCIAL
  { id: 'tiktok', name: 'TikTok', domain: 'tiktok.com' },
  { id: 'instagram', name: 'Instagram', domain: 'instagram.com' },
  { id: 'facebook', name: 'Facebook', domain: 'facebook.com' },
];

// 🔥 AUTO-GENERATE MORE REAL-LOOKING (NO BROKEN IMAGES)
const EXTRA = Array.from({ length: 80 }).map((_, i) => ({
  id: `label_${i}`,
  name: `Partner ${i + 1}`,
  domain: 'music.apple.com', // fallback safe domain
}));

const ALL = [...PLATFORMS, ...EXTRA];

export default function PlatformSelector({
  selectedPlatforms = [],
  setSelectedPlatforms,
}) {
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => {
    return expanded ? ALL : ALL.slice(0, 40);
  }, [expanded]);

  const toggle = (id) => {
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== id));
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const selectAll = () => {
    setSelectedPlatforms(ALL.map((p) => p.id));
    setExpanded(true);
  };

  const clearAll = () => {
    setSelectedPlatforms([]);
    setExpanded(false);
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h3 style={styles.title}>Distribution</h3>

        <div style={styles.actions}>
          <button onClick={selectAll} style={styles.primary}>
            Select All
          </button>
          <button onClick={clearAll} style={styles.secondary}>
            Clear
          </button>
        </div>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {visible.map((p) => {
          const active = selectedPlatforms.includes(p.id);

          return (
            <div
              key={p.id}
              onClick={() => toggle(p.id)}
              style={{
                ...styles.box,
                border: active
                  ? '1px solid #ff004c'
                  : '1px solid #111',
                background: active ? '#0f0f0f' : 'transparent',
              }}
            >
              {/* ✅ LOGO FROM CLEARBIT */}
              <img
                src={`https://logo.clearbit.com/${p.domain}`}
                onError={(e) =>
                  (e.currentTarget.src =
                    'https://cdn-icons-png.flaticon.com/512/727/727245.png')
                }
                style={styles.logo}
              />

              <span style={styles.name}>{p.name}</span>
            </div>
          );
        })}
      </div>

      {!expanded && (
        <button onClick={() => setExpanded(true)} style={styles.expand}>
          Show All Platforms
        </button>
      )}
    </div>
  );
}

// ================= STYLES =================
const styles = {
  container: {
    background: 'linear-gradient(180deg,#050505,#000)',
    padding: 16,
    borderRadius: 14,
    border: '1px solid #111',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  title: {
    color: '#fff',
    fontWeight: 600,
  },

  actions: { display: 'flex', gap: 8 },

  primary: {
    padding: '6px 12px',
    background: 'linear-gradient(90deg,#ff004c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 8,
  },

  secondary: {
    padding: '6px 12px',
    background: '#111',
    border: '1px solid #222',
    color: '#aaa',
    borderRadius: 8,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: 10,
  },

  box: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 8,
    cursor: 'pointer',
    transition: '0.2s',
  },

  logo: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },

  name: {
    color: '#fff',
    fontSize: 12,
  },

  expand: {
    marginTop: 10,
    width: '100%',
    padding: 10,
    background: '#0f0f0f',
    border: '1px solid #222',
    color: '#888',
    borderRadius: 10,
  },
};