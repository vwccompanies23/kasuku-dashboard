import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function ReleaseUpload() {
  const navigate = useNavigate();

  const [type, setType] = useState('single');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');

  const [cover, setCover] = useState(null);
  const [track, setTrack] = useState(null);

  const [isrc, setIsrc] = useState('');
  const [upc, setUpc] = useState('');

  const [platforms, setPlatforms] = useState([]);

  const ALL_PLATFORMS = [
    'Spotify',
    'Apple Music',
    'YouTube Music',
    'Amazon Music',
    'Tidal',
    'Deezer',
    'TikTok',
    'Instagram',
    'Facebook',
    'Audiomack',
    'Boomplay',
    'Pandora',
  ];

  const togglePlatform = (name) => {
    setPlatforms((prev) =>
      prev.includes(name)
        ? prev.filter((p) => p !== name)
        : [...prev, name],
    );
  };

  const toggleAllPlatforms = () => {
    if (platforms.length === ALL_PLATFORMS.length) {
      setPlatforms([]);
    } else {
      setPlatforms(ALL_PLATFORMS);
    }
  };

  // =========================
  // 🚀 FINAL WORKING SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('❌ You are not logged in');
        return;
      }

      // =========================
      // 1️⃣ CREATE RELEASE
      // =========================
      const createRes = await api.post(
        '/releases',
        {
          title,
          artistName: artist,
          type,
          releaseDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('🔥 RELEASE CREATED:', createRes.data);

      const releaseId = createRes.data.id;

      // =========================
      // 2️⃣ PREPARE FILES
      // =========================
      const form = new FormData();

      if (cover) form.append('cover', cover);
      if (track) form.append('track', track);

      form.append('description', description);
      form.append('isrc', isrc);
      form.append('upc', upc);
      form.append('platforms', JSON.stringify(platforms));

      console.log('📦 UPLOADING:', {
        releaseId,
        cover,
        track,
        platforms,
      });

      // =========================
      // 3️⃣ UPLOAD TRACK
      // =========================
      const uploadRes = await api.post(
        `/releases/${releaseId}/upload-track`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('✅ UPLOAD SUCCESS:', uploadRes.data);

      alert('🔥 Release uploaded successfully');

      navigate('/dashboard');
    } catch (err) {
      console.error('❌ FULL ERROR:', err?.response || err);
      alert('❌ Upload failed (check console)');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>

        <h1 style={styles.header}>Create New Release</h1>

        <div style={styles.tabs}>
          {['single', 'ep', 'album'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                ...styles.tab,
                background:
                  type === t
                    ? 'linear-gradient(90deg,#ff003c,#7c3aed)'
                    : '#111',
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          <div style={styles.left}>

            <div style={styles.card}>
              <h3>Release Details</h3>

              <input
                style={styles.input}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Artist"
                onChange={(e) => setArtist(e.target.value)}
              />

              <input
                type="date"
                style={styles.input}
                onChange={(e) => setReleaseDate(e.target.value)}
              />

              <textarea
                style={styles.input}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="file"
                onChange={(e) =>
                  setCover(e.target.files?.[0] || null)
                }
              />
            </div>

            <div style={styles.card}>
              <h3>Track Upload</h3>
              <input
                type="file"
                onChange={(e) =>
                  setTrack(e.target.files?.[0] || null)
                }
              />
            </div>
          </div>

          <div style={styles.right}>
            <div style={styles.card}>
              <h3>Platforms</h3>

              <div onClick={toggleAllPlatforms}>
                {platforms.length === ALL_PLATFORMS.length ? '✅' : '⬜'} All
              </div>

              {ALL_PLATFORMS.map((p) => (
                <div key={p} onClick={() => togglePlatform(p)}>
                  {platforms.includes(p) ? '✅' : '⬜'} {p}
                </div>
              ))}
            </div>

            <button style={styles.publishBtn} onClick={handleSubmit}>
              Publish 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#0a0a0a', minHeight: '100vh' },
  main: { maxWidth: 1000, margin: 'auto', padding: 20 },
  header: { color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 },
  left: { display: 'flex', flexDirection: 'column', gap: 20 },
  right: { display: 'flex', flexDirection: 'column', gap: 20 },
  card: { background: '#141414', padding: 20, borderRadius: 10, color: '#fff' },
  input: { width: '100%', padding: 10, marginTop: 10 },
  publishBtn: {
    padding: 15,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    border: 'none',
  },
};