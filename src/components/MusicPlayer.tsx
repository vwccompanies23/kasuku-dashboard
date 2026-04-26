import { useEffect, useState } from 'react';
import { api } from '../api';
import toast from 'react-hot-toast';

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [current, setCurrent] = useState<any>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // =========================
  // 🔄 LOAD MUSIC
  // =========================
  const loadMusic = async () => {
    try {
      const res = await api.get('/music');
      setTracks(res.data || []);
    } catch (err) {
      toast.error('Failed to load music ❌');
    }
  };

  useEffect(() => {
    loadMusic();
  }, []);

  // =========================
  // ▶️ PLAY MUSIC
  // =========================
  const playTrack = (track: any) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(
      `http://localhost:3000${track.fileUrl}`,
    );

    newAudio.play();

    setAudio(newAudio);
    setCurrent(track);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎵 Music Library</h2>

      {tracks.length === 0 && (
        <p style={styles.empty}>No music uploaded</p>
      )}

      {/* =========================
          🎧 TRACK LIST
      ========================= */}
      {tracks.map((track) => (
        <div
          key={track.id}
          style={styles.track}
          onClick={() => playTrack(track)}
        >
          <div>
            <p style={styles.name}>{track.title}</p>
            <small style={styles.artist}>
              {track.artist}
            </small>
          </div>

          <div style={styles.playBtn}>
            ▶️
          </div>
        </div>
      ))}

      {/* =========================
          🎶 NOW PLAYING
      ========================= */}
      {current && (
        <div style={styles.player}>
          <p style={styles.nowPlaying}>
            Now Playing:
          </p>

          <h3 style={styles.currentTitle}>
            {current.title}
          </h3>

          <p style={styles.currentArtist}>
            {current.artist}
          </p>
        </div>
      )}
    </div>
  );
}

// =========================
// 🎨 STYLES (YOUR THEME)
// =========================
const styles = {
  container: {
    backgroundColor: '#0f0f0f',
    color: '#fff',
    padding: 20,
  },

  title: {
    marginBottom: 20,
  },

  empty: {
    color: '#aaa',
  },

  track: {
    backgroundColor: '#1c1c1c',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.2s',
  },

  name: {
    margin: 0,
    fontWeight: 'bold',
  },

  artist: {
    color: '#aaa',
  },

  playBtn: {
    color: '#7c3aed',
    fontSize: 20,
  },

  player: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    border: '1px solid #7c3aed',
  },

  nowPlaying: {
    color: '#aaa',
  },

  currentTitle: {
    margin: 0,
  },

  currentArtist: {
    color: '#aaa',
  },
};