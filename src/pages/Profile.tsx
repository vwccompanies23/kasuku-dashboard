import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kasuku-logo.png';

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>({
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

    referralCode: '',
    referralEnabled: true,

    plan: '',
    subscriptionActive: false,
  });

  const [saving, setSaving] = useState(false);

  // 🔥 LIVE SEARCH
  const [artistSearch, setArtistSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searching, setSearching] = useState(false);

  // 🔥 REFERRAL
  const [refLink, setRefLink] = useState('');

  // =====================
  // LOAD PROFILE
  // =====================
  const loadProfile = async () => {
    try {

      const res = await api.get('/users/me');

      setUser(res.data);

      localStorage.setItem(
        'user',
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem('user') || '{}'
          ),

          ...res.data,

          avatar: res.data.avatar,
          image: res.data.avatar,

          username:
            res.data.artistName ||
            res.data.username,
        })
      );

      window.dispatchEvent(
        new Event('storage')
      );

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

        setSaving(true);

        await api.post(
          '/users/update',
          user
        );

        localStorage.setItem(
          'user',
          JSON.stringify({
            ...JSON.parse(
              localStorage.getItem('user') || '{}'
            ),

            ...user,

            avatar: user.avatar,
            image: user.avatar,

            username:
              user.artistName ||
              user.username,
          })
        );

        window.dispatchEvent(
          new Event('storage')
        );

      } catch (err) {

        console.error(err);

      } finally {

        setSaving(false);
      }

    }, 1200);

    return () => clearTimeout(timeout);

  }, [user]);

  // =====================
  // 🔥 LIVE SPOTIFY SEARCH
  // =====================
  useEffect(() => {

    const searchArtists = async () => {

      if (!artistSearch.trim()) {

        setSearchResults([]);
        setShowSearch(false);

        return;
      }

      try {

        setSearching(true);

        const res = await api.get(
          `/spotify/search?name=${encodeURIComponent(
            artistSearch
          )}`
        );

        setSearchResults(
          res.data || []
        );

        setShowSearch(true);

      } catch (err) {

        console.error(err);

        setSearchResults([]);
        setShowSearch(false);

      } finally {

        setSearching(false);
      }
    };

    const timeout = setTimeout(() => {
      searchArtists();
    }, 400);

    return () => clearTimeout(timeout);

  }, [artistSearch]);

  // =====================
  // AVATAR
  // =====================
  const uploadAvatar = async (e: any) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append('file', file);

    try {

      const res = await api.post(
        '/users/upload-avatar',
        formData
      );

      const updated = {
        ...user,
        avatar: res.data.url,
      };

      // 🔥 UPDATE UI INSTANTLY
      setUser(updated);

      // 🔥 UPDATE STORAGE
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem('user') || '{}'
          ),

          ...updated,

          avatar: updated.avatar,
          image: updated.avatar,

          username:
            updated.artistName ||
            updated.username,
        })
      );

      // 🔥 FORCE SIDEBAR UPDATE
      window.dispatchEvent(
        new Event('storage')
      );

    } catch {

      alert('Upload failed ❌');
    }
  };

  // =====================
  // SELECT PROFILE
  // =====================
  const selectArtistProfile = (
    artist: any
  ) => {

    const updatedUser = {

      ...user,

      artistName:
        artist.name || '',

      spotifyArtistId:
        artist.spotifyId || '',

      spotifyUrl:
        artist.spotifyId
          ? `https://open.spotify.com/artist/${artist.spotifyId}`
          : '',
    };

    setUser(updatedUser);

    setArtistSearch(
      artist.name
    );

    setShowSearch(false);

    // 🔥 SAVE IMMEDIATELY
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...JSON.parse(
          localStorage.getItem('user') || '{}'
        ),

        ...updatedUser,

        avatar: updatedUser.avatar,
        image: updatedUser.avatar,

        username:
          updatedUser.artistName,
      })
    );

    window.dispatchEvent(
      new Event('storage')
    );
  };

  // =====================
  // SHARE REF LINK
  // =====================
  const handleShare = async () => {

    if (!refLink) return;

    if (navigator.share) {

      await navigator.share({
        title: 'Join Kasuku',

        text:
          'Get FREE 1 year subscription 🎧',

        url: refLink,
      });

    } else {

      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          refLink
        )}`
      );
    }
  };

  // =====================
  // COPY REF LINK
  // =====================
  const handleCopy = async () => {

    if (!refLink) return;

    await navigator.clipboard.writeText(
      refLink
    );

    alert('Link copied 🔥');
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>

        <img
          src={logo}
          style={styles.logo}
        />

        <h1 style={styles.title}>
          Profile Settings
        </h1>

      </div>

      {/* REFERRAL */}
      {user.referralEnabled && (

        <div style={styles.refBox}>

          <div style={{ fontWeight: 'bold' }}>
            🎁 Refer & Earn
          </div>

          <div
            style={{
              fontSize: 12,
              color: '#aaa',
            }}
          >
            FREE 1 year subscription
          </div>

          <input
            value={
              refLink || 'Generating...'
            }
            readOnly
            style={styles.refInput}
          />

          <div
            style={{
              display: 'flex',
              gap: 6,
            }}
          >

            <button
              style={styles.smallBtn}
              onClick={handleShare}
            >
              Share
            </button>

            <button
              style={styles.smallBtnOutline}
              onClick={handleCopy}
            >
              Copy
            </button>

          </div>

        </div>
      )}

      <div style={styles.container}>

        {/* PROFILE */}
        <div style={styles.card}>

          <h2>Artist Profile</h2>

          {/* PLAN */}
          <div style={styles.planBox}>

            <div>

              <div style={styles.planLabel}>
                Subscription
              </div>

              <div style={styles.planValue}>
                {user.plan
                  ? user.plan.toUpperCase()
                  : 'FREE'}
              </div>

            </div>

            <div
              style={{
                ...styles.statusBadge,

                background:
                  user.subscriptionActive
                    ? 'rgba(0,255,120,0.15)'
                    : 'rgba(255,0,60,0.15)',

                color:
                  user.subscriptionActive
                    ? '#00ff99'
                    : '#ff4d6d',
              }}
            >
              {user.subscriptionActive
                ? 'ACTIVE'
                : 'INACTIVE'}
            </div>

          </div>

          {/* AVATAR */}
          <div style={styles.avatarBox}>

            <img
              src={
  user.avatar
    ? `https://kasuku-backend.onrender.com${user.avatar}`
    : 'https://via.placeholder.com/100'
}
              style={styles.avatar}
            />

            <label style={styles.uploadBtn}>

              Upload Image

              <input
                type="file"
                onChange={uploadAvatar}
                style={{
                  display: 'none',
                }}
              />

            </label>

          </div>

          <input
            style={styles.input}
            value={user.artistName || ''}
            placeholder="Artist Name"
            onChange={(e) =>
              setUser({
                ...user,
                artistName:
                  e.target.value,
              })
            }
          />

          <input
            style={styles.input}
            value={user.email || ''}
            disabled
          />

          <textarea
            style={{
              ...styles.input,
              minHeight: 120,
            }}
            placeholder="Artist Bio"
            value={user.bio || ''}
            onChange={(e) =>
              setUser({
                ...user,
                bio: e.target.value,
              })
            }
          />

          <p style={{ color: '#888' }}>
            {saving
              ? 'Saving...'
              : 'Auto-saved'}
          </p>

        </div>

        {/* SOCIALS */}
        <div style={styles.card}>

          <h2>Social Links</h2>

          {[
            'website',
            'instagram',
            'twitter',
            'youtube',
          ].map((field) => (

            <input
              key={field}
              style={styles.input}
              placeholder={field}
              value={user[field] || ''}
              onChange={(e) =>
                setUser({
                  ...user,
                  [field]:
                    e.target.value,
                })
              }
            />

          ))}

        </div>

        {/* PLATFORM IDS */}
        <div style={styles.card}>

          <h2>
            Platform Artist IDs
          </h2>

          {/* 🔥 LIVE SEARCH */}
          <input
            style={styles.input}
            placeholder="Search Spotify artist..."
            value={artistSearch}
            onChange={(e) =>
              setArtistSearch(
                e.target.value
              )
            }
          />

          {/* RESULTS */}
          {showSearch && (

            <div style={styles.searchResults}>

              {searching ? (

                <div style={styles.noResults}>
                  Searching...
                </div>

              ) : searchResults.length > 0 ? (

                searchResults.map(
                  (artist, index) => (

                    <div
                      key={index}
                      style={styles.resultCard}
                      onClick={() =>
                        selectArtistProfile(
                          artist
                        )
                      }
                    >

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >

                        <img
                          src={
                            artist.image ||
                            'https://via.placeholder.com/50'
                          }
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />

                        <div>

                          <div
                            style={{
                              fontWeight: 'bold',
                            }}
                          >
                            {artist.name}
                          </div>

                          <div
                            style={{
                              fontSize: 12,
                              color: '#888',
                            }}
                          >
                            Spotify Artist
                          </div>

                        </div>

                      </div>

                    </div>
                  )
                )

              ) : (

                <div style={styles.noResults}>
                  No profile found
                </div>
              )}

            </div>
          )}

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
                setUser({
                  ...user,
                  [field]:
                    e.target.value,
                })
              }
            />

          ))}

        </div>

        {/* COLLAB */}
        <div style={styles.cardGlow}>

          <h2>Collaborations</h2>

          <button
            style={styles.mainBtn}
            onClick={() =>
              navigate(
                '/collaborators'
              )
            }
          >
            Open Collaborator Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

// 🎨 STYLES
const styles: any = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, #1a002b, #020617, #000)',
    color: '#fff',
    position: 'relative',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderBottom:
      '1px solid rgba(255,255,255,0.06)',
  },

  logo: {
    width: 50,
    marginRight: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor:
      'transparent',
  },

  container: {
    maxWidth: 750,
    margin: '40px auto',
    padding: 20,
  },

  card: {
    background:
      'rgba(15,15,15,0.9)',
    padding: 22,
    borderRadius: 18,
    marginBottom: 20,
    border:
      '1px solid rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px)',
  },

  cardGlow: {
    background:
      'linear-gradient(135deg,#141414,#1f0033)',
    padding: 22,
    borderRadius: 18,
    marginBottom: 20,
    boxShadow:
      '0 0 40px rgba(124,58,237,0.35)',
  },

  input: {
    width: '100%',
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    background: '#0f0f0f',
    border:
      '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    outline: 'none',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    objectFit: 'cover',
    border:
      '3px solid rgba(124,58,237,0.5)',
  },

  avatarBox: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },

  uploadBtn: {
    padding: '10px 16px',
    borderRadius: 10,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 'bold',
  },

  mainBtn: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 15,
  },

  planBox: {
    marginTop: 15,
    marginBottom: 20,
    padding: 16,
    borderRadius: 14,
    background:
      'linear-gradient(135deg, rgba(255,0,60,0.12), rgba(124,58,237,0.12))',
    border:
      '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  planLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  planValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  statusBadge: {
    padding: '8px 14px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  refBox: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 240,
    background:
      'linear-gradient(135deg,#140014,#1f0033)',
    padding: 12,
    borderRadius: 14,
    boxShadow:
      '0 0 25px rgba(124,58,237,0.35)',
  },

  refInput: {
    width: '100%',
    padding: 8,
    margin: '8px 0',
    fontSize: 11,
    background: '#0f0f0f',
    border:
      '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    borderRadius: 8,
  },

  smallBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontSize: 12,
    cursor: 'pointer',
  },

  smallBtnOutline: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border:
      '1px solid rgba(255,255,255,0.08)',
    background: '#0f0f0f',
    color: '#fff',
    fontSize: 12,
    cursor: 'pointer',
  },

  searchResults: {
    marginBottom: 16,
  },

  resultCard: {
    padding: 14,
    borderRadius: 12,
    background:
      'rgba(255,255,255,0.04)',
    marginBottom: 10,
    cursor: 'pointer',
    border:
      '1px solid rgba(255,255,255,0.06)',
  },

  noResults: {
    padding: 14,
    borderRadius: 12,
    background:
      'rgba(255,0,60,0.08)',
    border:
      '1px solid rgba(255,0,60,0.2)',
    color: '#ff7b9c',
    marginBottom: 16,
    textAlign: 'center',
  },
};