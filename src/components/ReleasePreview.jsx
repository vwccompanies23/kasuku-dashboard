import { useRef, useState, useEffect } from 'react';

export default function ReleasePreview({
  form = {},
  coverPreview = null,
  tracks = [],
}) {
  const audioRefs = useRef({});
  const canvasRefs = useRef({});
  const animationRefs = useRef({});
  const urlCache = useRef({}); // 🔥 prevent recreating blob urls

  const [current, setCurrent] = useState(null);
  const [progress, setProgress] = useState({});
  const [duration, setDuration] = useState({});
  const [volume, setVolume] = useState(1);
  const [showCover, setShowCover] = useState(false);

  // =========================
  // 🔥 CREATE STABLE URL
  // =========================
  const getAudioSrc = (t, i) => {
    // local file
    if (t.file) {
      if (!urlCache.current[i]) {
        urlCache.current[i] = URL.createObjectURL(t.file);
      }
      return urlCache.current[i];
    }

    // backend file
    if (t.url) {
      return `http://localhost:3000${t.url}`;
    }

    return null;
  };

  // =========================
  // 🌊 WAVE
  // =========================
  const draw = (index) => {
    const canvas = canvasRefs.current[index];
    const audio = audioRefs.current[index];

    if (!canvas || !audio) return;

    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bars = 60;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const height =
          Math.random() * canvas.height * (audio.paused ? 0.3 : 1);

        const x = i * barWidth;
        const y = canvas.height - height;

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, '#ff004c');
        gradient.addColorStop(1, '#7c3aed');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth * 0.8, height);
      }

      if (audio.duration && !isNaN(audio.duration)) {
        const percent = audio.currentTime / audio.duration;
        const cursorX = percent * canvas.width;

        ctx.fillStyle = '#fff';
        ctx.fillRect(cursorX, 0, 2, canvas.height);

        setProgress((p) => ({
          ...p,
          [index]: audio.currentTime,
        }));
      }

      animationRefs.current[index] = requestAnimationFrame(render);
    };

    render();
  };

  // =========================
  // ▶️ PLAY (FIXED HARD)
  // =========================
  const togglePlay = async (i) => {
    const audio = audioRefs.current[i];
    if (!audio) return;

    // stop others
    Object.entries(audioRefs.current).forEach(([k, a]) => {
      if (Number(k) !== i && a) {
        a.pause();
        a.currentTime = 0;
        cancelAnimationFrame(animationRefs.current[k]);
      }
    });

    if (current === i) {
      audio.pause();
      cancelAnimationFrame(animationRefs.current[i]);
      setCurrent(null);
      return;
    }

    try {
      audio.muted = false;
      audio.volume = volume;

      await audio.play();

      setCurrent(i);
      draw(i);
    } catch (err) {
      console.log('❌ PLAY FAILED:', err);
      alert('Audio failed to play (format or backend issue)');
    }
  };

  // =========================
  // 🎯 SEEK
  // =========================
  const handleSeek = (e, i) => {
    const canvas = canvasRefs.current[i];
    const audio = audioRefs.current[i];

    if (!audio || !audio.duration) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;

    audio.currentTime = percent * audio.duration;
  };

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div
          style={styles.coverBox}
          onClick={() => setShowCover(true)}
        >
          {coverPreview ? (
            <img src={coverPreview} style={styles.cover} />
          ) : (
            <div style={styles.placeholder}>No Cover</div>
          )}
        </div>

        <div>
          <h2>{form.title || 'Untitled Release'}</h2>
          <p style={{ color: '#aaa' }}>
            {form.artistName || 'Unknown Artist'}
          </p>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVolume(v);

              Object.values(audioRefs.current).forEach((a) => {
                if (a) a.volume = v;
              });
            }}
          />
        </div>
      </div>

      {tracks.map((t, i) => {
        const src = getAudioSrc(t, i);

        return (
          <div key={i} style={styles.track}>
            {src && (
              <audio
                ref={(el) => (audioRefs.current[i] = el)}
                src={src}
                preload="auto"
                onLoadedMetadata={(e) =>
                  setDuration((d) => ({
                    ...d,
                    [i]: e.target.duration,
                  }))
                }
                onError={() => {
                  console.log('❌ AUDIO LOAD ERROR:', src);
                }}
              />
            )}

            <button style={styles.play} onClick={() => togglePlay(i)}>
              {current === i ? '⏸' : '▶️'}
            </button>

            <div style={{ flex: 1 }}>
              <div style={styles.trackTitle}>
                {t.title || `Track ${i + 1}`}
              </div>

              <canvas
                ref={(el) => (canvasRefs.current[i] = el)}
                width={500}
                height={70}
                style={styles.canvas}
                onClick={(e) => handleSeek(e, i)}
              />

              <div style={styles.timeRow}>
                <span>{formatTime(progress[i])}</span>
                <span>{formatTime(duration[i])}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: { padding: 20, background: '#000', borderRadius: 14, color: '#fff' },
  header: { display: 'flex', gap: 20, marginBottom: 25, alignItems: 'center' },
  coverBox: { width: 120, height: 120, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', border: '2px solid #222' },
  cover: { width: '100%', height: '100%', objectFit: 'cover' },
  placeholder: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' },
  track: { display: 'flex', gap: 15, marginBottom: 25, alignItems: 'center' },
  play: { width: 45, height: 45, borderRadius: '50%', border: 'none', background: 'linear-gradient(90deg,#ff004c,#7c3aed)', color: '#fff', cursor: 'pointer' },
  canvas: { width: '100%', background: '#111', borderRadius: 6 },
  trackTitle: { marginBottom: 5 },
  timeRow: { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#aaa' },
};