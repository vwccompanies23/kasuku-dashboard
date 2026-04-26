import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { api } from '../../api';
import { io } from 'socket.io-client';

export default function AdminApprovals() {
  const navigate = useNavigate();

  const [songCount, setSongCount] = useState(0);
  const [albumCount, setAlbumCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);

  const prevCountRef = useRef(0);
  const [hasNew, setHasNew] = useState(false);

  // 🔊 SOUND REF
  const audioRef = useRef(null);

  useEffect(() => {
    loadCounts();

    // 🎧 preload notification sound
    audioRef.current = new Audio('/notification.mp3'); // put file in /public

    const socket = io('http://localhost:3000');

    socket.on('new_release', () => {
      handleNewRelease();
    });

    return () => socket.disconnect();
  }, []);

  const handleNewRelease = async () => {
    await loadCounts();

    setHasNew(true);

    // 🔊 PLAY SOUND
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    // ⚡ AUTO OPEN SONGS PAGE (OPTIONAL)
    // comment this if you don’t want auto redirect
    // navigate('/admin/approvals/songs');
  };

  const loadCounts = async () => {
    try {
      const res = await api.get('/admin/songs/pending');
      const data = res.data || [];

      const songs = data.filter(
        (r) => r.music && r.music.length === 1
      );

      const albums = data.filter(
        (r) => r.music && r.music.length > 1
      );

      const videos = data.filter(
        (r) => r.type === 'video'
      );

      const total = songs.length + albums.length + videos.length;

      if (total > prevCountRef.current) {
        setHasNew(true);
      }

      prevCountRef.current = total;

      setSongCount(songs.length);
      setAlbumCount(albums.length);
      setVideoCount(videos.length);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>⏳ Pending Approvals</h2>

      <div style={styles.grid}>
        
        {/* 🎵 SONGS */}
        <div
          style={styles.card}
          onClick={() => {
            setHasNew(false);
            navigate('/admin/approvals/songs');
          }}
        >
          🎵 Songs
          <div style={styles.count}>{songCount}</div>
          {hasNew && <div style={styles.pulseDot} />}
        </div>

        {/* 💿 ALBUMS */}
        <div
          style={styles.card}
          onClick={() => navigate('/admin/approvals/albums')}
        >
          💿 Albums
          <div style={styles.count}>{albumCount}</div>
        </div>

        {/* 🎬 VIDEOS */}
        <div
          style={styles.card}
          onClick={() => navigate('/admin/approvals/videos')}
        >
          🎬 Videos
          <div style={styles.count}>{videoCount}</div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'flex',
    gap: 20,
    marginTop: 20,
  },

  card: {
    flex: 1,
    padding: 30,
    borderRadius: 12,
    background: '#111',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: 18,
    position: 'relative',
  },

  count: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff003c',
  },

  // 🔴 PULSE DOT (UPGRADED)
  pulseDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 12,
    height: 12,
    background: '#ff003c',
    borderRadius: '50%',
    boxShadow: '0 0 0 rgba(255,0,60, 0.7)',
    animation: 'pulse 1.5s infinite',
  },
};