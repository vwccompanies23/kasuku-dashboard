import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kasuku-logo.png';

export default function Profile() {

  const navigate = useNavigate();

  const [saving, setSaving] =
    useState(false);

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

    plan: 'free',

    subscriptionActive: true,

    role: '',
  });

  const [referralLink,
    setReferralLink] =
    useState('');

  // =========================
  // NORMALIZE USER
  // =========================

  const normalizeUser = (
    data: any
  ) => {

    return {

      ...data,

     plan:
  String(
    data?.plan || 'free'
  ).toLowerCase(),

      isAdmin:
        data?.role === 'admin',

      subscriptionActive:
        true,

      referralEnabled:
        data?.referralEnabled !== false,

      avatar:
        data?.avatar || '',

    };

  };

  // =========================
  // LOAD PROFILE
  // =========================

  const loadProfile = async () => {

    try {

      const res =
        await api.get('/users/me');

      const normalized =
        normalizeUser(
          res.data
        );

      setUser(normalized);

      localStorage.setItem(
        'user',
        JSON.stringify(
          normalized
        )
      );

      localStorage.setItem(
        'plan',
        String(
          normalized.plan
        )
      );

      localStorage.setItem(
        'subscriptionActive',
        'true'
      );

      window.dispatchEvent(
        new Event(
          'authChanged'
        )
      );

      if (
        normalized?.referralCode
      ) {

        setReferralLink(
          `${window.location.origin}/auth?ref=${normalized.referralCode}`
        );

      }

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    loadProfile();

  }, []);

  // =========================
  // AUTO SAVE
  // =========================

  useEffect(() => {

    if (!user?.email) return;

    const timeout =
      setTimeout(async () => {

        try {

          setSaving(true);

          await api.post(
            '/users/update',
            user
          );

          localStorage.setItem(
            'user',
            JSON.stringify(
              user
            )
          );

          window.dispatchEvent(
            new Event(
              'authChanged'
            )
          );

        } catch (err) {

          console.error(err);

        } finally {

          setSaving(false);

        }

      }, 1200);

    return () =>
      clearTimeout(timeout);

  }, [user]);

  // =========================
  // AVATAR UPLOAD
  // =========================

  const uploadAvatar =
    async (e: any) => {

      const file =
        e.target.files?.[0];

      if (!file) return;

      const formData =
        new FormData();

      formData.append(
        'file',
        file
      );

      try {

        const res =
          await api.post(
            '/users/upload-avatar',
            formData
          );

        const avatarUrl =
          res.data?.url || '';

        const updatedUser = {

          ...user,

          avatar: avatarUrl,

        };

        setUser(
          updatedUser
        );

        localStorage.setItem(
          'user',
          JSON.stringify(
            updatedUser
          )
        );

        window.dispatchEvent(
          new Event(
            'authChanged'
          )
        );

      } catch (err) {

        console.error(err);

        alert(
          'Upload failed ❌'
        );

      }

    };

  // =========================
  // TOGGLE REFERRAL
  // =========================

  const toggleReferral =
    async () => {

      try {

        const updated = {

          ...user,

          referralEnabled:
            !user.referralEnabled,

        };

        setUser(updated);

        await api.post(
          '/users/update',
          updated
        );

      } catch (err) {

        console.error(err);

      }

    };

  // =========================
  // COPY REF LINK
  // =========================

  const copyReferral =
    async () => {

      if (
        !referralLink
      )
        return;

      await navigator.clipboard.writeText(
        referralLink
      );

      alert(
        'Referral link copied ✅'
      );

    };

  // =========================
  // PLAN LABEL
  // =========================
const getPlanName = () => {

  const plan =
    String(
      user?.plan || 'free'
    ).toLowerCase();

  if (plan === 'pro') {
    return 'PRO';
  }

  if (plan === 'artist') {
    return 'ARTIST';
  }

  if (plan === 'solo') {
    return 'SOLO';
  }

  return 'FREE';

};

  // =========================
  // AVATAR URL
  // =========================

  const avatarSrc =
    user?.avatar
      ? user.avatar.startsWith(
          'http'
        )
        ? user.avatar
        : `https://kasuku-backend.onrender.com${user.avatar}`
      : 'https://via.placeholder.com/100';

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

      <div style={styles.container}>

        {/* REFERRAL */}

        {user?.referralEnabled && (

          <div style={styles.card}>

            <div
              style={
                styles.referralTop
              }
            >

              <div>

                <h2>
                  🎁 Referral System
                </h2>

                <p
                  style={{
                    color:
                      '#888',

                    fontSize: 13,
                  }}
                >
                  Invite new users and get FREE 1 year trial
                </p>

              </div>

              {/* ✅ ADMIN ONLY */}

              {user?.role ===
                'admin' && (

                <button
                  onClick={
                    toggleReferral
                  }
                  style={{
                    ...styles.toggleBtn,

                    background:
                      user?.referralEnabled
                        ? 'linear-gradient(90deg,#ff003c,#7c3aed)'
                        : 'linear-gradient(90deg,#00c853,#00ff99)',
                  }}
                >

                  {user?.referralEnabled
                    ? 'Disable'
                    : 'Enable'}

                </button>

              )}

            </div>

            <input
              value={
                referralLink
              }
              readOnly
              style={
                styles.input
              }
            />

            <div
              style={{
                display:
                  'flex',

                gap: 10,

                flexWrap:
                  'wrap',

                marginTop: 12,
              }}
            >

              <button
                style={
                  styles.copyBtn
                }
                onClick={
                  copyReferral
                }
              >
                Copy Link
              </button>

              <button
                style={
                  styles.shareBtn
                }
                onClick={() => {

                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(referralLink)}`
                  );

                }}
              >
                Share
              </button>

            </div>

          </div>

        )}

        {/* PROFILE */}

        <div style={styles.card}>

          <h2>
            Artist Profile
          </h2>

          {/* PLAN */}

          <div style={styles.planBox}>

            <div>

              <div style={styles.planLabel}>
                Subscription
              </div>

              <div style={styles.planValue}>
                {getPlanName()}
              </div>

            </div>

            <div
              style={{
                ...styles.statusBadge,

                background:
                  'rgba(0,255,120,0.15)',

                color:
                  '#00ff99',
              }}
            >
              ACTIVE
            </div>

          </div>

          {/* AVATAR */}

          <div style={styles.avatarBox}>

            <img
              src={
                avatarSrc
              }
              style={
                styles.avatar
              }
            />

            <label
              style={
                styles.uploadBtn
              }
            >

              Upload Image

              <input
                type="file"
                accept="image/*"
                onChange={
                  uploadAvatar
                }
                style={{
                  display:
                    'none',
                }}
              />

            </label>

          </div>

          {/* INPUTS */}

          <input
            style={
              styles.input
            }
            value={
              user.artistName ||
              ''
            }
            placeholder="Artist Name"
            onChange={(e) =>
              setUser({
                ...user,

                artistName:
                  e.target
                    .value,
              })
            }
          />

          <input
            style={
              styles.input
            }
            value={
              user.email ||
              ''
            }
            disabled
          />

          <textarea
            style={{
              ...styles.input,

              minHeight:
                120,
            }}
            placeholder="Artist Bio"
            value={
              user.bio || ''
            }
            onChange={(e) =>
              setUser({
                ...user,

                bio:
                  e.target
                    .value,
              })
            }
          />

          <p
            style={{
              color:
                '#888',
            }}
          >
            {saving
              ? 'Saving...'
              : 'Auto-saved'}
          </p>

        </div>

        {/* SOCIAL LINKS */}

        <div style={styles.card}>

          <h2>
            Social Links
          </h2>

          {[
            'website',
            'instagram',
            'twitter',
            'youtube',
          ].map((field) => (

            <input
              key={field}
              style={
                styles.input
              }
              placeholder={
                field
              }
              value={
                user[field] ||
                ''
              }
              onChange={(e) =>
                setUser({
                  ...user,

                  [field]:
                    e.target
                      .value,
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
              style={
                styles.input
              }
              placeholder={
                field
              }
              value={
                user[field] ||
                ''
              }
              onChange={(e) =>
                setUser({
                  ...user,

                  [field]:
                    e.target
                      .value,
                })
              }
            />

          ))}

        </div>

        {/* COLLAB */}

        <div
          style={
            styles.cardGlow
          }
        >

          <h2>
            Collaborations
          </h2>

          <button
            style={
              styles.mainBtn
            }
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

const styles: any = {

  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top,#1a002b,#020617,#000)',
    color: '#fff',
    width: '100%',
    overflowX: 'hidden',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderBottom:
      '1px solid rgba(255,255,255,0.06)',
    flexWrap: 'wrap',
    gap: 10,
  },

  logo: {
    width: 50,
  },

  title: {
    fontSize:
      'clamp(22px,4vw,30px)',
    fontWeight: 'bold',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip:
      'text',
    WebkitTextFillColor:
      'transparent',
  },

  container: {
    width: '100%',
    maxWidth: 850,
    margin: '0 auto',
    padding: 20,
    boxSizing:
      'border-box',
  },

  card: {
    background:
      'rgba(15,15,15,0.9)',
    padding: 22,
    borderRadius: 18,
    marginBottom: 20,
    border:
      '1px solid rgba(255,255,255,0.06)',
    backdropFilter:
      'blur(20px)',
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
    background:
      '#0f0f0f',
    border:
      '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    outline: 'none',
    boxSizing:
      'border-box',
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
    flexWrap: 'wrap',
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
    flexWrap: 'wrap',
    gap: 10,
  },

  planLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
    textTransform:
      'uppercase',
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

  referralTop: {
    display: 'flex',
    justifyContent:
      'space-between',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
    flexWrap: 'wrap',
  },

  toggleBtn: {
    border: 'none',
    color: '#fff',
    padding:
      '10px 16px',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  copyBtn: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    borderRadius: 10,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  shareBtn: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    borderRadius: 10,
    border:
      '1px solid rgba(255,255,255,0.1)',
    background:
      '#111',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

};