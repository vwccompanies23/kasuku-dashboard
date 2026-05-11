import { useState, useEffect } from 'react';
import { api } from '../api';

export default function ArtistSelector({ onChange }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // 🔍 SEARCH (SPOTIFY + FALLBACK)
  // =========================
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchArtists = async () => {
      setLoading(true);

      try {
        // 🔥 Try Spotify first
        const res = await api.get(`/spotify/search?name=${query}`);
        setResults(res.data || []);
      } catch (err) {
        console.log('Spotify failed, fallback to DB');

        try {
          const res = await api.get(`/artists/search?name=${query}`);
          setResults(res.data || []);
        } catch (err2) {
          console.error(err2);
        }
      }

      setLoading(false);
    };

    const delay = setTimeout(fetchArtists, 300);
    return () => clearTimeout(delay);
  }, [query]);

  // =========================
  // ➕ ADD (AUTO SAVE TO DB)
  // =========================
  const addArtist = async (artist) => {
    try {
      // 🔥 Always store artist in your DB
      const res = await api.post('/artists', {
        name: artist.name,
        spotifyId: artist.spotifyId || '',
        youtubeId: artist.youtubeId || '',
        image: artist.image || '',
      });

      const updated = [...selected, res.data];
      setSelected(updated);

      if (onChange) onChange(updated);

      setQuery('');
      setResults([]);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // ❌ REMOVE
  // =========================
  const removeArtist = (id) => {
    const updated = selected.filter((a) => a.id !== id);
    setSelected(updated);

    if (onChange) onChange(updated);
  };

  return (
    <div style={styles.container}>
      {/* INPUT */}
      <input
        placeholder="Type artist name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />

      {/* DROPDOWN */}
      {query && (
        <div style={styles.dropdown}>
          {loading && <div style={styles.item}>Searching...</div>}

          {!loading &&
            results.map((artist) => (
              <div
                key={artist.spotifyId || artist.id}
                style={styles.item}
                onClick={() => addArtist(artist)}
              >
                <div style={styles.row}>
                  {artist.image && (
                    <img
                      src={artist.image}
                      style={styles.avatar}
                    />
                  )}

                  <div>
                    <div style={styles.name}>{artist.name}</div>

                    <div style={styles.meta}>
                      🎧 {artist.spotifyId || 'Local Artist'}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {!loading && results.length === 0 && (
            <div style={styles.create}>
              No results found
            </div>
          )}
        </div>
      )}

      {/* SELECTED */}
      <div style={styles.selected}>
        {selected.map((artist) => (
          <div key={artist.id} style={styles.tag}>
            {artist.name}
            <span onClick={() => removeArtist(artist.id)}>✕</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    marginBottom: 12,
  },

  input: {
    width: '100%',
    padding: 12,
    background: '#0a0a0a',
    border: '1px solid #222',
    color: '#fff',
    borderRadius: 8,
    outline: 'none',
  },

  dropdown: {
    position: 'absolute',
    width: '100%',
    background: '#0a0a0a',
    border: '1px solid #222',
    borderRadius: 8,
    marginTop: 5,
    zIndex: 20,
    maxHeight: 220,
    overflowY: 'auto',
    boxShadow:
      '0 0 15px rgba(255,0,80,0.2), 0 0 30px rgba(124,58,237,0.2)',
  },

  item: {
    padding: 12,
    cursor: 'pointer',
    borderBottom: '1px solid #111',
    transition: '0.2s',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
  },

  name: {
    fontWeight: 'bold',
    color: '#fff',
  },

  meta: {
    fontSize: 11,
    color: '#999',
  },

  create: {
    padding: 12,
    color: '#ff004c',
    fontWeight: 'bold',
  },

  selected: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 10,
  },

  tag: {
    background: 'linear-gradient(90deg,#ff004c,#7c3aed)',
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: '#fff',
  },
};