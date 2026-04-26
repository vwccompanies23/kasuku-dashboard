import { useState, useEffect } from 'react';
import { createRelease, api } from '../api';
import { useNavigate } from 'react-router-dom';

import SplitsComponent from '../components/SplitsComponent';

// COMPONENTS
import TrackList from '../components/TrackList';
import PlatformSelector from '../components/PlatformSelector';
import ReleasePreview from '../components/ReleasePreview';

export default function CreateRelease() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [checkingSub, setCheckingSub] = useState(true);

  const [releaseType, setReleaseType] = useState('single');

  const [form, setForm] = useState({
    title: '',
    artistName: '',
    primaryArtist: '',
    featuringArtists: '',
    releaseMode: 'now',
    releaseDate: '',
    recordLabel: '',
  });

  const [cover, setCover] = useState(null);

  const [tracks, setTracks] = useState([
    {
      title: '',
      file: null,
      preview: null,
      artists: '',
    },
  ]);

  const [selectedPlatforms, setSelectedPlatforms] = useState([
    'spotify',
    'apple',
    'youtube',
    'tiktok',
  ]);

  // 🎧 AUDIO SETTINGS
  const [audioSettings, setAudioSettings] = useState({
    dolbyAtmos: false,
    appleDigitalMasters: false,
  });

  // 🔗 SPOTIFY
  const [spotifyLink, setSpotifyLink] = useState('');
  const [spotifyURI, setSpotifyURI] = useState('');
  const [verified, setVerified] = useState(false);

  // 💰 SPLITS (NOW CONTROLLED BY COMPONENT)
  const [splits, setSplits] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get('/users/me');
      setUser(res.data);
    } catch {
      setUser({ plan: 'free' });
    } finally {
      setCheckingSub(false);
    }
  };

  // 📀 TYPE DETECTION
  useEffect(() => {
    if (tracks.length === 1) setReleaseType('single');
    else if (tracks.length <= 6) setReleaseType('ep');
    else setReleaseType('album');
  }, [tracks]);

  // 🔗 SPOTIFY VERIFY
  const handleSpotifyVerify = () => {
    if (!spotifyLink.includes('spotify.com/artist')) {
      alert('Invalid Spotify link');
      return;
    }

    const uri = spotifyLink.split('/artist/')[1]?.split('?')[0];
    setSpotifyURI(uri);
    setVerified(true);
  };

  // 🚀 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append('releaseType', releaseType);
    formData.append('spotifyURI', spotifyURI);
    formData.append('verified', verified);
    formData.append('dolbyAtmos', audioSettings.dolbyAtmos);
    formData.append(
      'appleDigitalMasters',
      audioSettings.appleDigitalMasters
    );

    // 🔥 SPLITS CONNECTED
    formData.append('splits', JSON.stringify(splits));

    formData.append('platforms', JSON.stringify(selectedPlatforms));

    if (cover) formData.append('cover', cover);

    tracks.forEach((t) => {
      formData.append('tracks', t.file);
      formData.append('trackTitles', t.title);
      formData.append('artists', t.artists || '');
    });

    await createRelease(formData);

    alert('🔥 Release created');
  };

  if (checkingSub)
    return <div style={{ color: '#fff' }}>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.container}>
        <h1>Create Release</h1>

        {/* TYPE */}
        <p style={{ color: '#7c3aed' }}>
          📀 {releaseType.toUpperCase()}
        </p>

        {/* BASIC */}
        <div style={styles.card}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            style={styles.input}
          />

          <input
            placeholder="Primary Artist"
            value={form.primaryArtist}
            onChange={(e) =>
              setForm({
                ...form,
                primaryArtist: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            placeholder="Featuring Artists"
            value={form.featuringArtists}
            onChange={(e) =>
              setForm({
                ...form,
                featuringArtists: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            type="file"
            onChange={(e) => setCover(e.target.files[0])}
          />
        </div>

        {/* 🔗 SPOTIFY */}
        <div style={styles.card}>
          <h3>Spotify Verification</h3>

          <input
            placeholder="Spotify Artist Link"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
            style={styles.input}
          />

          <button type="button" onClick={handleSpotifyVerify}>
            Verify
          </button>

          {verified && <p>✅ Verified</p>}
        </div>

        {/* TRACKS */}
        <TrackList tracks={tracks} setTracks={setTracks} />

        {/* AUDIO */}
        <div style={styles.card}>
          <h3>Audio</h3>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                setAudioSettings({
                  ...audioSettings,
                  dolbyAtmos: !audioSettings.dolbyAtmos,
                })
              }
            />
            Dolby Atmos
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() =>
                setAudioSettings({
                  ...audioSettings,
                  appleDigitalMasters:
                    !audioSettings.appleDigitalMasters,
                })
              }
            />
            Apple Digital Masters
          </label>
        </div>

        {/* 💰 SPLITS (NEW CLEAN UI) */}
        <SplitsComponent
          splits={splits}
          setSplits={setSplits}
          user={user}
        />

        {/* PLATFORM */}
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
        />

        {/* PREVIEW */}
        <ReleasePreview
          form={form}
          coverPreview={
            cover ? URL.createObjectURL(cover) : null
          }
          tracks={tracks}
          selectedPlatforms={selectedPlatforms}
        />

        <button style={styles.publish}>🚀 Publish</button>
      </div>
    </form>
  );
}

const styles = {
  container: { padding: 20, color: '#fff' },

  card: {
    background: '#111',
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
  },

  input: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    background: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    border: 'none',
  },

  publish: {
    marginTop: 20,
    padding: 15,
    width: '100%',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
  },
};