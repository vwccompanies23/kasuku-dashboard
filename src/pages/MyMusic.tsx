import { useEffect, useState, useRef } from 'react';
import { api } from '../api';
import { io } from 'socket.io-client';
import WaveSurfer from 'wavesurfer.js';

import logo from '../assets/kasuku-logo.png';

//////////////////////////////////////////////////
// 🌍 LANGUAGE SYSTEM
//////////////////////////////////////////////////
const TEXT = {
  en: {
    title: 'My Releases',

    subtitle:
      'Track all your published and pending releases',

    loading: 'Loading releases...',

    emptyTitle: 'No releases found',

    emptySubtitle:
      'Upload music and it will appear here automatically',

    pending: 'Pending',

    processing: 'Processing',

    submitted: 'Submitted',

    approved: 'Approved',

    live: 'Live',

    draft: 'Draft',

    delivered: 'Delivered',

    failed: 'Failed',

    all: 'All',

    play: '▶ Play',

    pause: '⏸ Pause',

    edit: '✏ Edit',

    delete: '🗑 Delete',

    confirmDelete:
      'Delete this release?',

    deleteFailed:
      'Delete failed ❌',
  },
};

//////////////////////////////////////////////////
// 🌍 CURRENT LANGUAGE
//////////////////////////////////////////////////
const lang = 'en';

const t = TEXT[lang];

//////////////////////////////////////////////////
// 🔥 BACKEND URL
//////////////////////////////////////////////////
const BASE_URL =
  'https://kasuku-backend.onrender.com';

//////////////////////////////////////////////////
// 🔥 FIX URL
//////////////////////////////////////////////////
const fixUrl = (path) => {

  if (!path) {
    return logo;
  }

  // already full URL
  if (
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path;
  }

 // normalize slashes
let cleanPath = path.trim();

if (!cleanPath.startsWith('/')) {
  cleanPath = '/' + cleanPath;
}

return `${BASE_URL}${cleanPath}`;
};


//////////////////////////////////////////////////
// 🎵 AUDIO PLAYER
//////////////////////////////////////////////////
const AudioPlayer = ({ src }) => {
  const ref = useRef(null);

  const waveRef = useRef(null);

  const [playing, setPlaying] =
    useState(false);

  useEffect(() => {
    if (!ref.current || !src)
      return;

    if (waveRef.current) {
      waveRef.current.destroy();
    }

    waveRef.current =
      WaveSurfer.create({
        container: ref.current,

        waveColor: '#7c3aed',

        progressColor: '#ff003c',

        cursorColor: '#ffffff',

        barWidth: 2,

        barRadius: 4,

        height: 60,

        responsive: true,

        normalize: true,
      });

    waveRef.current.load(src);

    waveRef.current.on(
      'finish',
      () => {
        setPlaying(false);
      },
    );

    return () => {
      if (waveRef.current) {
        waveRef.current.destroy();
      }
    };
  }, [src]);

  const toggle = () => {
    if (!waveRef.current) return;

    waveRef.current.playPause();

    setPlaying(!playing);
  };

  return (
    <div style={styles.playerWrap}>
      <div
        ref={ref}
        style={styles.wave}
      />

      <button
        onClick={toggle}
        style={styles.playBtn}
      >
        {playing
          ? t.pause
          : t.play}
      </button>
    </div>
  );
};

//////////////////////////////////////////////////
// 🔥 MAIN COMPONENT
//////////////////////////////////////////////////
export default function MyReleases() {
  const [releases, setReleases] =
    useState([]);

  const [filter, setFilter] =
    useState('all');

  const [loading, setLoading] =
    useState(true);

  //////////////////////////////////////////////////
  // 🔥 FETCH RELEASES
  //////////////////////////////////////////////////
  const fetchReleases =
    async () => {
      try {
        const userId =
          localStorage.getItem(
            'userId',
          );

        const token =
          localStorage.getItem(
            'token',
          );

        if (!userId || !token) {
          window.location.href =
            '/login';

          return;
        }

        const res = await api.get(
          `/music?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(
  'RELEASES API:',
  res.data
);

        if (!Array.isArray(res.data)) {

  console.log(
    'Invalid releases response:',
    res.data
  );

  setLoading(false);

  return;
}

const mapped = res.data.map((m) => ({

  id:
    m._id ||
    m.id,

  title:
     String(
    m.title ||
    'Untitled',
     ),

  artistName:
    m.artistName ||
    m.artist ||
    'Unknown Artist',

  featuredArtists:
    Array.isArray(m.featuredArtists)
      ? m.featuredArtists
      : [],

  songwriters:
    m.songwriters ||
    m.songwriter ||
    null,

  producer:
    m.producer || null,

  genre:
    m.genre ||
    m.primaryGenre ||
    null,

  subgenre:
    m.subgenre ||
    m.secondaryGenre ||
    null,

  language:
    m.language || null,

  labelName:
    m.labelName || null,

  copyright:
    m.copyright || null,

  releaseDate:
    m.releaseDate ||
    m.date ||
    null,

  isrc:
    m.isrc || null,

  upc:
    m.upc || null,

status:
  String(
    m.status ||
    'pending'
  ).toLowerCase(),

  coverUrl:
    m.coverUrl ||
    m.cover ||
    m.artwork ||
    m.image ||
    m.thumbnail ||
    null,

 fileUrl:
  m.fileUrl?.startsWith('http')
    ? m.fileUrl
    : fixUrl(
        m.fileUrl ||
        m.audioUrl ||
        m.trackUrl ||
        m.song ||
        m.audio ||
        m.music ||
        '',
      ),

}));

        setReleases(mapped);

        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
      }
    };

  //////////////////////////////////////////////////
  // 🔥 LOAD
  //////////////////////////////////////////////////
  useEffect(() => {
    fetchReleases();

    const interval =
      setInterval(() => {
        fetchReleases();
      }, 30000);

    return () =>
      clearInterval(interval);
  }, []);

  //////////////////////////////////////////////////
  // 🔥 SOCKET
  //////////////////////////////////////////////////
  useEffect(() => {
    const socket = io(
      BASE_URL,
    );

    socket.on(
      'release:update',
      (data) => {
        setReleases((prev) =>
          prev.map((r) =>
            r.id ===
            data.releaseId
              ? {
                  ...r,
                  status:
                    data.status,
                }
              : r,
          ),
        );
      },
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  //////////////////////////////////////////////////
  // 🔥 DELETE
  //////////////////////////////////////////////////
  const handleDelete =
    async (id) => {
      const token =
        localStorage.getItem(
          'token',
        );

      const ok =
        window.confirm(
          t.confirmDelete,
        );

      if (!ok) return;

      try {
        await api.delete(
          `/music/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        fetchReleases();
      } catch (err) {
        console.log(err);

        alert(t.deleteFailed);
      }
    };

  //////////////////////////////////////////////////
  // 🔥 FILTER
  //////////////////////////////////////////////////
  const filtered =
    releases.filter((r) => {

      if (filter === 'all') {
        return true;
      }
if (filter === 'pending') {
  return r.status === 'pending';
}

      if (
        filter ===
        'processing'
      ) {
        return (
          r.status ===
          'processing'
        );
      }

      if (
        filter ===
        'submitted'
      ) {
        return (
          r.status ===
          'submitted'
        );
      }

      if (
        filter ===
        'approved'
      ) {
        return (
          r.status ===
          'approved'
        );
      }

      if (filter === 'live') {
        return (
          r.status === 'live'
        );
      }

      if (filter === 'draft') {
        return (
          r.status === 'draft'
        );
      }

      if (
        filter ===
        'delivered'
      ) {
        return (
          r.status ===
          'delivered'
        );
      }

      if (
        filter ===
        'failed'
      ) {
        return (
          r.status ===
          'failed'
        );
      }

      return true;
    });

  //////////////////////////////////////////////////
  // 🔥 UI
  //////////////////////////////////////////////////
  return (
    <div style={styles.container}>
      <div style={styles.glow1} />

      <div style={styles.glow2} />

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.logoWrap}>
          <img
            src={logo}
            alt="Kasuku"
            style={styles.logo}
          />

          <div>
            <h1 style={styles.title}>
              {t.title}
            </h1>

            <p style={styles.subtitle}>
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div style={styles.tabs}>
        {[
          'pending',
          'processing',
          'submitted',
          'approved',
          'live',
          'draft',
          'delivered',
          'failed',
          'all',
        ].map((item) => (
          <button
            key={item}
            onClick={() =>
              setFilter(item)
            }
            style={{
              ...styles.tab,

              background:
                filter === item
                  ? 'linear-gradient(90deg,#ff003c,#7c3aed)'
                  : 'rgba(255,255,255,0.05)',
            }}
          >
            {t[item]}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div style={styles.empty}>
          <img
            src={logo}
            alt="Kasuku"
            style={
              styles.emptyLogo
            }
          />

          <h2>{t.loading}</h2>
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        filtered.length ===
          0 && (
          <div
            style={styles.empty}
          >
            <img
              src={logo}
              alt="Kasuku"
              style={
                styles.emptyLogo
              }
            />

            <h2>
              {t.emptyTitle}
            </h2>

            <p>
              {
                t.emptySubtitle
              }
            </p>
          </div>
        )}

      {/* RELEASES */}
      {filtered.map((r) => (
        <div
          key={r.id}
          style={styles.card}
        >
          {/* COVER */}
          <img
  src={fixUrl(
    r.coverUrl,
  )}

  onError={(e) => {
    e.currentTarget.src =
      logo;
  }}
            alt={r.title}
            style={styles.cover}
          />

          {/* INFO */}
          <div style={styles.info}>
            <h2
              style={
                styles.songTitle
              }
            >
              {r.title}
            </h2>

           {/* FEATURED ARTISTS */}
{r.featuredArtists?.length > 0 && (
  <p style={styles.meta}>
    Featuring:{' '}
    {r.featuredArtists
      .map((a) =>
  typeof a === 'string'
    ? a
    : a?.name
)
      .join(', ')}
  </p>
)}

{/* SONGWRITERS */}
<p style={styles.meta}>
  Songwriter:{' '}
  {r.songwriters || 'Unknown'}
</p>

{/* LANGUAGE */}
<p style={styles.meta}>
  Language:{' '}
  {r.language || 'No Language'}
</p>

{/* ISRC */}
<p style={styles.meta}>
  ISRC:{' '}
  {r.isrc || 'No ISRC'}
</p>

{/* UPC */}
<p style={styles.meta}>
  UPC:{' '}
  {r.upc || 'No UPC'}
</p>

{/* GENRE */}
<p style={styles.meta}>
  Genre:{' '}
  {r.genre || 'No Genre'}
</p>

{/* SUBGENRE */}
<p style={styles.meta}>
  Subgenre:{' '}
  {r.subgenre || 'No Subgenre'}
</p>

{/* PRODUCER */}
<p style={styles.meta}>
  Producer:{' '}
  {r.producer || 'Unknown'}
</p>

{/* LABEL */}
<p style={styles.meta}>
  Label:{' '}
  {r.labelName || 'Independent'}
</p>

{/* COPYRIGHT */}
<p style={styles.meta}>
  Copyright:{' '}
  {r.copyright || 'Not Provided'}
</p>

{/* RELEASE DATE */}
<p style={styles.meta}>
  Release Date:{' '}
  {r.releaseDate || 'Not Set'}
</p>

            {/* AUDIO */}

{console.log("AUDIO URL:", r.fileUrl)}

           {r.fileUrl &&
 r.fileUrl !== 'null' &&
 r.fileUrl !== 'undefined' && (
               <AudioPlayer
               src={r.fileUrl}
               />
            )}

            {/* STATUS */}
            <div
              style={{
                marginTop: 16,
              }}
            >
              <span
                style={getStatusStyle(
                  r.status,
                )}
              >
                {r.status ===
                  'pending' &&
                  `⏳ ${t.pending}`}

                {r.status ===
                  'processing' &&
                  `⚡ ${t.processing}`}

                {r.status ===
                  'submitted' &&
                  `📤 ${t.submitted}`}

                {r.status ===
                  'approved' &&
                  `✅ ${t.approved}`}

                {r.status ===
                  'live' &&
                  `🚀 ${t.live}`}

                {r.status ===
                  'draft' &&
                  `📝 ${t.draft}`}

                {r.status ===
                  'delivered' &&
                  `🎵 ${t.delivered}`}

                {r.status ===
                  'failed' &&
                  `❌ ${t.failed}`}
              </span>
            </div>

            {/* ACTIONS */}
            <div
              style={
                styles.actions
              }
            >
              <button
                onClick={() =>
                  (window.location.href = `/edit/${r.id}`)
                }
                style={
                  styles.editBtn
                }
              >
                {t.edit}
              </button>

              <button
                onClick={() =>
                  handleDelete(
                    r.id,
                  )
                }
                style={
                  styles.deleteBtn
                }
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

//////////////////////////////////////////////////
// 🎨 STYLES
//////////////////////////////////////////////////
const styles = {
  container: {
    minHeight: '100vh',

    padding:
      'clamp(16px,4vw,32px)',

    color: '#ffffff',

    overflow: 'hidden',

    position: 'relative',

    background: `
      radial-gradient(circle at top left,
      rgba(124,58,237,0.18),
      transparent 30%),

      radial-gradient(circle at top right,
      rgba(255,0,60,0.18),
      transparent 30%),

      linear-gradient(
        to bottom,
        #000000,
        #050505,
        #0a0a0a
      )
    `,
  },

 meta: {
  margin: 0,

  color: '#bdbdbd',

  fontSize: 13,

  lineHeight: 1.3,

  wordBreak: 'break-word',
},

  glow1: {
    position: 'absolute',

    top: -120,

    left: -120,

    width: 350,

    height: 350,

    borderRadius: '50%',

    background:
      'rgba(124,58,237,0.18)',

    filter: 'blur(120px)',
  },

  glow2: {
    position: 'absolute',

    bottom: -120,

    right: -120,

    width: 350,

    height: 350,

    borderRadius: '50%',

    background:
      'rgba(255,0,60,0.18)',

    filter: 'blur(120px)',
  },

  header: {
    position: 'relative',

    zIndex: 2,

    marginBottom: 30,
  },

  logoWrap: {
    display: 'flex',

    alignItems: 'center',

    gap: 16,

    flexWrap: 'wrap',
  },

  logo: {
    width:
      'clamp(60px,8vw,90px)',

    height:
      'clamp(60px,8vw,90px)',

    objectFit: 'contain',
  },

  title: {
    margin: 0,

    fontSize:
      'clamp(30px,5vw,52px)',

    fontWeight: 900,
  },

  subtitle: {
    marginTop: 6,

    color: '#aaaaaa',

    fontSize:
      'clamp(12px,2vw,15px)',
  },

  tabs: {
    display: 'flex',

    gap: 12,

    flexWrap: 'wrap',

    marginBottom: 28,
  },

  tab: {
    border: 'none',

    color: '#ffffff',

    padding: '12px 20px',

    borderRadius: 14,

    cursor: 'pointer',

    fontWeight: 'bold',

    fontSize: 13,

    minWidth: 90,
  },

  empty: {
    textAlign: 'center',

    marginTop: 90,
  },

  emptyLogo: {
    width: 120,

    marginBottom: 20,
  },
card: {
  display: 'flex',

  flexWrap: 'wrap',

  alignItems: 'flex-start',

  gap: 18,

  padding: 18,

  marginBottom: 20,

  borderRadius: 20,

  background:
    'rgba(15,15,15,0.88)',

  border:
    '1px solid rgba(255,255,255,0.06)',

  backdropFilter:
    'blur(12px)',

  width: '100%',

  boxSizing: 'border-box',
},

  cover: {
    width: 160,

    height: 160,

    minWidth: 160,

    borderRadius: 18,

    objectFit: 'cover',

    background: '#111111',
  },

 info: {
  flex: 1,

  width: '100%',

  display: 'flex',

  flexDirection: 'column',

  gap: 3,
},

  songTitle: {
    margin: 0,

    marginBottom: 8,

    fontSize:
      'clamp(24px,4vw,34px)',

    fontWeight: 800,

    wordBreak: 'break-word',
  },

  artist: {
    margin: 0,

    color: '#aaaaaa',

    fontSize:
      'clamp(13px,2vw,16px)',
  },

  playerWrap: {
    width: '100%',

    marginTop: 12,
  },

  wave: {
    width: '100%',

    overflow: 'hidden',

    borderRadius: 14,
  },

  playBtn: {
    marginTop: 12,

    border: 'none',

    color: '#ffffff',

    cursor: 'pointer',

    fontWeight: 700,

    borderRadius: 12,

    padding: '10px 18px',

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
  },

  actions: {
    display: 'flex',

    gap: 12,

    flexWrap: 'wrap',

    marginTop: 20,
  },

  editBtn: {
    border: 'none',

    color: '#ffffff',

    cursor: 'pointer',

    fontWeight: 'bold',

    borderRadius: 12,

    padding: '12px 18px',

    background:
      'linear-gradient(90deg,#7c3aed,#5b21b6)',
  },

  deleteBtn: {
    border: 'none',

    color: '#ffffff',

    cursor: 'pointer',

    fontWeight: 'bold',

    borderRadius: 12,

    padding: '12px 18px',

    background:
      'linear-gradient(90deg,#ff003c,#dc2626)',
  },
};

//////////////////////////////////////////////////
// 🔥 STATUS STYLE
//////////////////////////////////////////////////
function getStatusStyle(
  status,
) {
  let bg = '#444';

  if (
    status === 'pending'
  ) {
    bg =
      'linear-gradient(90deg,#f59e0b,#ff8800)';
  }

  if (
    status === 'processing'
  ) {
    bg =
      'linear-gradient(90deg,#fb923c,#ea580c)';
  }

  if (
    status === 'submitted'
  ) {
    bg =
      'linear-gradient(90deg,#3b82f6,#2563eb)';
  }

  if (
    status === 'approved'
  ) {
    bg =
      'linear-gradient(90deg,#22c55e,#16a34a)';
  }

  if (status === 'live') {
    bg =
      'linear-gradient(90deg,#00c853,#00e676)';
  }

  if (status === 'draft') {
    bg =
      'linear-gradient(90deg,#666,#444)';
  }

  if (
    status === 'delivered'
  ) {
    bg =
      'linear-gradient(90deg,#8b5cf6,#7c3aed)';
  }

  if (
    status === 'failed'
  ) {
    bg =
      'linear-gradient(90deg,#dc2626,#991b1b)';
  }

  return {
    display: 'inline-block',

    padding: '8px 14px',

    borderRadius: 999,

    background: bg,

    color: '#ffffff',

    fontWeight: 'bold',

    fontSize: 12,

    textTransform: 'capitalize',
  };
}