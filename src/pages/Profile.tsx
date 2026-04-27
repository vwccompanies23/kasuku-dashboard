import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kasuku-logo.png';

// 🔥 MOCK ARTISTS
const mockArtists = [
  {
    name: 'Drake',
    spotifyArtistId: 'sp_drake_123',
    appleMusicId: 'am_drake_456',
    youtubeChannelId: 'yt_drake_789',
  },
  {
    name: 'Hera',
    spotifyArtistId: 'sp_hera_999',
    appleMusicId: 'am_hera_888',
    youtubeChannelId: 'yt_hera_777',
  },
];

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    artistName: '',
    email: '',
    bio: '',
    avatar: '',
    website: '',
    instagram: '',
    twitter: '',
    youtube: '',
    spotifyArtistId: '',
    appleMusicId: '',
    amazonMusicId: '',
    youtubeChannelId: '',
    tidalId: '',
    deezerId: '',
    platformIdsVerified: false,

    // 🔥 REFERRAL
    referralCode: '',
    referralDisabled: false,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔥 REF LINK
  const [refLink, setRefLink] = useState('');

  const locked = user.platformIdsVerified;

  // =====================
  // LOAD PROFILE
  // =====================
  const loadProfile = async () => {
    try {
      const res = await api.get('/users/me');
      setUser(res.data);

      if (res.data?.referralCode) {
        setRefLink(
          `${window.location.origin}/auth?ref=${res.data.referralCode}`
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // =====================
  // AUTO SAVE
  // =====================
  useEffect(() => {
    if (!user.email) return;

    const timeout = setTimeout(async () => {
      try {
        await api.post('/users/update', user);
      } catch {}
      setSaving(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [user]);

  // =====================
  // ARTIST SEARCH
  // =====================
  const handleArtistChange = (value) => {
    if (locked) return;

    setUser({ ...user, artistName: value });

    const results = mockArtists.filter((a) =>
      a.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(results);
    setShowDropdown(true);
  };

  const selectArtist = async (artist) => {
    const updatedUser = {
      ...user,
      artistName: artist.name,
      spotifyArtistId: artist.spotifyArtistId || '',
      appleMusicId: artist.appleMusicId || '',
      youtubeChannelId: artist.youtubeChannelId || '',
      platformIdsVerified: true,
    };

    setUser(updatedUser);
    setShowDropdown(false);

    await api.post('/users/update', updatedUser);
  };

  // =====================
  // AVATAR
  // =====================
  const uploadAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/users/upload-avatar', formData);
      setUser((prev) => ({
        ...prev,
        avatar: res.data.url,
      }));
    } catch {
      alert('Upload failed ❌');
    }
  };

  // =====================
  // 🔗 SHARE
  // =====================
  const handleShare = async () => {
    if (!refLink) return;

    if (navigator.share) {
      await navigator.share({
        title: 'Join Kasuku',
        text: 'Get FREE 1 year subscription 🎧',
        url: refLink,
      });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(refLink)}`);
    }
  };

  // =====================
  // 📋 COPY
  // =====================
  const handleCopy = async () => {
    if (!refLink) return;

    await navigator.clipboard.writeText(refLink);
    alert('Link copied 🔥');
  };

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <img src={logo} style={styles.logo} />
        <h1 style={styles.title}>Profile Settings</h1>
      </div>

      {/* 🔥 TOP RIGHT REFERRAL (ADDED ONLY) */}
      {!user.referralDisabled && (
        <div style={styles.refBox}>
          <div style={{ fontWeight: 'bold' }}>🎁 Refer & Earn</div>

          <div style={{ fontSize: 12, color: '#aaa' }}>
            FREE 1 year subscription
          </div>

          <input
            value={refLink || 'Generating...'}
            readOnly
            style={styles.refInput}
          />

          <div style={{ display: 'flex', gap: 6 }}>
            <button style={styles.smallBtn} onClick={handleShare}>
              Share
            </button>

            <button style={styles.smallBtnOutline} onClick={handleCopy}>
              Copy
            </button>
          </div>
        </div>
      )}

      <div style={styles.container}>

        {/* ===================== */}
        {/* ARTIST PROFILE */}
        {/* ===================== */}
        <div style={styles.card}>
          <h2>Artist Profile</h2>

          <div style={styles.avatarBox}>
            <img
              src={user.avatar || 'https://via.placeholder.com/100'}
              style={styles.avatar}
            />

            <label style={styles.uploadBtn}>
              Upload Image
              <input
                type="file"
                onChange={uploadAvatar}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <input
            style={styles.input}
            value={user.artistName || ''}
            onChange={(e) => handleArtistChange(e.target.value)}
            placeholder="Artist Name"
          />

          {/* 🔥 DROPDOWN */}
          {showDropdown && suggestions.length > 0 && (
            <div style={styles.dropdown}>
              {suggestions.map((a, i) => (
                <div
                  key={i}
                  style={styles.dropdownItem}
                  onClick={() => selectArtist(a)}
                >
                  {a.name}
                </div>
              ))}
            </div>
          )}

          <input style={styles.input} value={user.email || ''} disabled />

          <textarea
            style={styles.input}
            value={user.bio || ''}
            placeholder="Bio"
            onChange={(e) =>
              setUser({ ...user, bio: e.target.value })
            }
          />

          <p style={{ color: '#888' }}>
            {saving ? 'Saving...' : 'Auto-saved'}
          </p>
        </div>

        {/* ===================== */}
        {/* SOCIAL LINKS */}
        {/* ===================== */}
        <div style={styles.card}>
          <h2>Social Links</h2>

          {['website', 'instagram', 'twitter', 'youtube'].map((field) => (
            <input
              key={field}
              style={styles.input}
              placeholder={field}
              value={user[field] || ''}
              onChange={(e) =>
                setUser({ ...user, [field]: e.target.value })
              }
            />
          ))}
        </div>

        {/* ===================== */}
        {/* PLATFORM IDS */}
        {/* ===================== */}
        <div style={styles.card}>
          <h2>Platform Artist IDs</h2>

          {[
            'spotifyArtistId',
            'appleMusicId',
            'youtubeChannelId',
            'amazonMusicId',
            'tidalId',
            'deezerId',
          ].map((field) => (
            <input
              key={field}
              style={styles.input}
              placeholder={field}
              value={user[field] || ''}
              onChange={(e) =>
                setUser({ ...user, [field]: e.target.value })
              }
            />
          ))}
        </div>

        {/* ===================== */}
        {/* COLLAB */}
        {/* ===================== */}
        <div style={styles.cardGlow}>
          <h2>Collaborations</h2>
          <button
            style={styles.mainBtn}
            onClick={() => navigate('/collaborators')}
          >
            Open Collaborator Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  page: { minHeight: '100vh', background: '#0a0a0a', color: '#fff', position: 'relative' },

  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderBottom: '1px solid #111',
  },

  logo: { width: 45, marginRight: 10 },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  container: { maxWidth: 700, margin: '40px auto' },

  card: {
    background: '#111',
    padding: 20,
    borderRadius: 14,
    marginBottom: 20,
  },

  cardGlow: {
    background: 'linear-gradient(135deg,#141414,#1f0033)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
  },

  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    background: '#0f0f0f',
    border: '1px solid #222',
    color: '#fff',
  },

  avatar: { width: 100, height: 100, borderRadius: '50%' },

  avatarBox: {
    marginBottom: 15,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  uploadBtn: {
    padding: '10px 14px',
    borderRadius: 8,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    cursor: 'pointer',
    fontSize: 12,
  },

  dropdown: {
    background: '#000',
    border: '1px solid #222',
    marginBottom: 10,
  },

  dropdownItem: {
    padding: 10,
    cursor: 'pointer',
  },

  mainBtn: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
  },

  // 🔥 REFERRAL
  refBox: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 240,
    background: 'linear-gradient(135deg,#140014,#1f0033)',
    padding: 12,
    borderRadius: 12,
    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
  },

  refInput: {
    width: '100%',
    padding: 8,
    margin: '8px 0',
    fontSize: 11,
    background: '#0f0f0f',
    border: '1px solid #222',
    color: '#fff',
  },

  smallBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontSize: 12,
  },

  smallBtnOutline: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: '1px solid #333',
    background: '#0f0f0f',
    color: '#fff',
    fontSize: 12,
  },
};