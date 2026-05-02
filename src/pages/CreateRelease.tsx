import { useState, useRef, useEffect } from 'react';
import PlatformSelector from '../components/PlatformSelector';
import ReleasePreview from '../components/ReleasePreview';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function CreateRelease() {

  const navigate = useNavigate();
  const [type, setType] = useState('single');
  const [tracks, setTracks] = useState([{ title: '', file: null, duration: '' }]);

  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [releaseStatus, setReleaseStatus] = useState('not_live');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const [form, setForm] = useState({
    title: '',
    artistName: '',
    date: '',
    isrc: '',
    upc: '',
    originalDate: '',
  });

  const audioRef = useRef();

  // =========================
  // 💾 LOAD DRAFT ON REFRESH
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem('releaseDraft');
    if (saved) {
      const data = JSON.parse(saved);

      setForm(data.form || {});
      setTracks(data.tracks || [{ title: '', file: null, duration: '' }]);
      setCoverPreview(data.coverPreview || null);
      setSelectedPlatforms(data.selectedPlatforms || []);
    }
  }, []);

  // =========================
  // 💾 AUTO SAVE
  // =========================
  useEffect(() => {
    localStorage.setItem(
      'releaseDraft',
      JSON.stringify({
        form,
        tracks,
        coverPreview,
        selectedPlatforms,
      })
    );
  }, [form, tracks, coverPreview, selectedPlatforms]);

  // =========================
  // TRACKS
  // =========================
  const changeType = (t) => {
    setType(t);

    if (t === 'single') setTracks([{ title: '', file: null, duration: '' }]);
    if (t === 'ep') setTracks([{ title: '' }, { title: '' }]);
    if (t === 'album')
      setTracks([{ title: '' }, { title: '' }, { title: '' }]);
  };

  const addTrack = () => {
    setTracks([...tracks, { title: '', file: null }]);
  };

  const removeTrack = (i) => {
    const copy = [...tracks];
    copy.splice(i, 1);
    setTracks(copy);
  };

  // =========================
  // COVER
  // =========================
  const handleCover = (file) => {
    if (!file) return;

    setCover(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeCover = (e) => {
    e.stopPropagation();
    setCover(null);
    setCoverPreview(null);
  };

  // =========================
  // AUDIO
  // =========================
  const handleAudio = (file, index = 0) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    const audio = new Audio(url);

    audio.onloadedmetadata = () => {
      const duration = Math.floor(audio.duration);
      const mins = Math.floor(duration / 60);
      const secs = duration % 60;

      const formatted = `${mins}:${secs.toString().padStart(2, '0')}`;

      const copy = [...tracks];
      copy[index] = {
        ...copy[index],
        file,
        duration: formatted,
      };

      setTracks(copy);
    };
  };

  const removeAudio = (index, e) => {
    e.stopPropagation();
    const copy = [...tracks];
    copy[index].file = null;
    copy[index].duration = '';
    setTracks(copy);
  };

  // =========================
  // HOVER
  // =========================
  const hoverOn = (e) => {
    e.currentTarget.style.transform = 'scale(1.02)';
    e.currentTarget.style.border = '1px solid #ff004c';
    e.currentTarget.style.boxShadow =
      '0 0 15px rgba(255,0,80,0.7), 0 0 30px rgba(124,58,237,0.5)';
  };

  const hoverOff = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.border = '1px dashed #7c3aed';
    e.currentTarget.style.boxShadow = 'none';
  };

  // =========================
// 🔥 NEW: DIRECT MUSIC UPLOAD
// =========================
const uploadToCloud = async () => {
  try {
    const formData = new FormData();

    formData.append('title', form.title);
    formData.append('artist', form.artistName);
    formData.append('userId', localStorage.getItem('userId') || '1');

    if (cover) {
      formData.append('cover', cover);
    }

    if (tracks[0]?.file) {
      formData.append('file', tracks[0].file);
    }

    const res = await api.post('/upload/music', formData);

    console.log('✅ Cloud upload:', res.data);

    return res.data;
  } catch (err) {
    console.log('❌ Cloud upload error:', err);
    throw err;
  }
};

  // =========================
  // 🚀 PUBLISH + DISTRIBUTE
  // =========================
const handlePublish = async () => {
  try {
    const res = await uploadToCloud();

    console.log('🎵 Uploaded:', res);

    // ✅ clear draft
    localStorage.removeItem('releaseDraft');

    // ✅ redirect to releases page
    navigate('/my-music');

  } catch (err) {
    console.error('❌ Publish error:', err);
    alert('Upload failed ❌');
  }
};

  return (
    <div style={styles.container}>
      <h1>Create New Release</h1>

      <div style={styles.switch}>
        {['single', 'ep', 'album'].map((t) => (
          <button
            key={t}
            onClick={() => changeType(t)}
            style={{
              ...styles.btn,
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

            <input placeholder="Title" style={styles.input}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <input placeholder="Artist" style={styles.input}
              value={form.artistName}
              onChange={(e) => setForm({ ...form, artistName: e.target.value })} />

            <input type="date"
              value={form.date}
              style={{ ...styles.input, color: '#fff', colorScheme: 'dark' }}
              onChange={(e) => setForm({ ...form, date: e.target.value })} />

            {/* COVER */}
            <label style={styles.uploadBox}
              onMouseEnter={hoverOn}
              onMouseLeave={hoverOff}>

              {coverPreview ? (
                <div>
                  <img src={coverPreview} style={styles.coverPreview} />
                  <button style={styles.removeBtn} onClick={removeCover}>
                    Remove Cover
                  </button>
                </div>
              ) : (
                <p>Upload Cover</p>
              )}

              <input type="file" hidden
                onChange={(e) => handleCover(e.target.files[0])} />
            </label>

            {/* AUDIO */}
            {type === 'single' && (
              <label style={styles.uploadBox}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}>

                {tracks[0]?.file ? (
                  <div>
                    🎵 {tracks[0].file.name}
                    <div style={styles.duration}>{tracks[0].duration}</div>

                    <button
                      style={styles.removeBtn}
                      onClick={(e) => removeAudio(0, e)}
                    >
                      Remove Audio
                    </button>
                  </div>
                ) : (
                  <p>Upload Audio</p>
                )}

                <input type="file" hidden
                  onChange={(e) => handleAudio(e.target.files[0])} />
              </label>
            )}
          </div>

          {/* MULTI TRACK unchanged */}
          {type !== 'single' && (
            <div style={styles.card}>
              <h3>Tracks</h3>

              {tracks.map((t, i) => (
                <div key={i}>
                  <input placeholder={`Track ${i + 1}`}
                    style={styles.input}
                    onChange={(e) => {
                      const copy = [...tracks];
                      copy[i].title = e.target.value;
                      setTracks(copy);
                    }} />

                  <label style={styles.uploadBoxSmall}>
                    {t.file ? (
                      <div>
                        🎵 {t.file.name}
                        <button
                          style={styles.removeBtn}
                          onClick={(e) => removeAudio(i, e)}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      'Upload Audio'
                    )}

                    <input type="file" hidden
                      onChange={(e) => handleAudio(e.target.files[0], i)} />
                  </label>

                  <button onClick={() => removeTrack(i)}
                    style={styles.removeBtn}>
                    Remove Track
                  </button>
                </div>
              ))}

              <button onClick={addTrack} style={styles.addBtn}>
                + Add Track
              </button>
            </div>
          )}
        </div>

        <div style={styles.right}>
          <div style={styles.card}>
            <h3>🎵 Artist Profile Check</h3>

            <div style={styles.selector}>
              <div style={{
                ...styles.slider,
                transform:
                  releaseStatus === 'not_live'
                    ? 'translateY(0%)'
                    : 'translateY(100%)',
              }} />

              <div style={styles.option}
                onClick={() => setReleaseStatus('not_live')}>
                First Release
              </div>

              <div style={styles.option}
                onClick={() => setReleaseStatus('live')}>
                Already Released
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlatformSelector
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
      />

      <ReleasePreview
        form={form}
        coverPreview={coverPreview}
        tracks={tracks}
      />

      <button style={styles.publish} onClick={handlePublish}>
        🚀 Publish Release
      </button>
    </div>
  );
}

const styles = {
  container: { padding: 20, background: '#000', color: '#fff' },
  switch: { display: 'flex', gap: 10, marginBottom: 20 },
  btn: { padding: 10, borderRadius: 8, color: '#fff' },
  grid: { display: 'flex', gap: 20 },
  left: { flex: 2 },
  right: { flex: 1 },
  card: { background: '#0a0a0a', padding: 20, borderRadius: 10, marginBottom: 20 },
  input: { width: '100%', padding: 10, marginBottom: 10, background: '#111', border: '1px solid #222', color: '#fff' },
  uploadBox: { border: '1px dashed #7c3aed', padding: 20, borderRadius: 10, marginBottom: 10, cursor: 'pointer', textAlign: 'center' },
  uploadBoxSmall: { border: '1px dashed #7c3aed', padding: 10, borderRadius: 8, marginBottom: 5 },
  coverPreview: { width: '100%', borderRadius: 10 },
  duration: { fontSize: 12, color: '#aaa' },
  removeBtn: { background: '#ff004c', color: '#fff', border: 'none', padding: 6, marginTop: 5, cursor: 'pointer' },
  addBtn: { background: '#7c3aed', color: '#fff', border: 'none', padding: 10 },
  selector: { position: 'relative', border: '1px solid #222', borderRadius: 10, overflow: 'hidden' },
  slider: { position: 'absolute', width: '100%', height: '50%', background: 'linear-gradient(90deg,#ff003c,#7c3aed)' },
  option: { padding: 12, cursor: 'pointer' },
  publish: { width: '100%', padding: 15, background: 'linear-gradient(90deg,#ff003c,#7c3aed)', border: 'none', color: '#fff' },
};