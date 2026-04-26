import { useEffect, useRef, useState } from 'react';
import { api } from '../api';

export default function AlbumPlayer({ releaseId }: any) {
  const [tracks, setTracks] = useState<any[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // =========================
  // 🎵 LOAD ALBUM
  // =========================
  useEffect(() => {
    api.get(`/releases/${releaseId}`).then((res) => {
      setTracks(res.data.music || []);
    });
  }, [releaseId]);

  // =========================
  // ▶️ PLAY TRACK
  // =========================
  const playTrack = (index: number) => {
    setCurrent(index);
    setPlaying(true);
  };

  // =========================
  // ⏯ CONTROL AUDIO
  // =========================
  useEffect(() => {
    if (!audioRef.current || !tracks[current]) return;

    audioRef.current.src =
      'http://localhost:3000' + tracks[current].fileUrl;

    if (playing) {
      audioRef.current.play();
    }
  }, [current, playing, tracks]);

  // =========================
  // ⏭ AUTO NEXT
  // =========================
  const handleEnded = () => {
    if (current < tracks.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setPlaying(false);
    }
  };

  // =========================
  // ⏯ PLAY / PAUSE
  // =========================
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div style={styles.card}>
      <h3>🎧 Album Player</h3>

      {tracks.length === 0 ? (
        <p style={styles.empty}>No tracks yet</p>
      ) : (
        <>
          {/* CURRENT TRACK */}
          <div style={styles.current}>
            <p>{tracks[current]?.title}</p>
          </div>

          {/* CONTROLS */}
          <button onClick={togglePlay} style={styles.playBtn}>
            {playing ? '⏸ Pause' : '▶️ Play'}
          </button>

          {/* TRACK LIST */}
          {tracks.map((track, index) => (
            <div
              key={track.id}
              style={{
                ...styles.track,
                ...(index === current && styles.active),
              }}
              onClick={() => playTrack(index)}
            >
              🎵 {track.title}
            </div>
          ))}

          {/* AUDIO */}
          <audio
            ref={audioRef}
            onEnded={handleEnded}
          />
        </>
      )}
    </div>
  );
}

// =========================
// 🎨 STYLES
// =========================
const styles = {
  card: {
    backgroundColor: '#1c1c1c',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    color: '#fff',
  },

  empty: {
    color: '#aaa',
  },

  current: {
    marginBottom: 10,
    fontWeight: 'bold',
  },

  playBtn: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#7c3aed',
    color: '#fff',
    marginBottom: 10,
    cursor: 'pointer',
  },

  track: {
    padding: 10,
    borderBottom: '1px solid #333',
    cursor: 'pointer',
  },

  active: {
    color: '#7c3aed',
    fontWeight: 'bold',
  },
};