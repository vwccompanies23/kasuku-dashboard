import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

const BASE_URL = 'https://kasuku-backend.onrender.com';

export default function EditRelease() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: '',
    artistName: '',
  });

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [audioFile, setAudioFile] = useState<File | null>(null);

  //////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////
  useEffect(() => {
    fetchRelease();
  }, []);

  const fetchRelease = async () => {
    try {
      const res = await api.get(`/releases/${id}`);

      const data = res.data;

      setForm({
        title: data.title || '',
        artistName: data.artistName || '',
      });

      if (data.music?.[0]?.coverUrl) {
        setCoverPreview(
          data.music[0].coverUrl.startsWith('http')
            ? data.music[0].coverUrl
            : `${BASE_URL}${data.music[0].coverUrl}`
        );
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      alert('❌ Failed to load release');
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////
  // COVER
  //////////////////////////////////////////////////
  const handleCover = (file: File) => {
    setCoverFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  //////////////////////////////////////////////////
  // AUDIO
  //////////////////////////////////////////////////
  const handleAudio = (file: File) => {
    setAudioFile(file);
  };

  //////////////////////////////////////////////////
  // UPDATE
  //////////////////////////////////////////////////
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append('title', form.title);
      formData.append('artistName', form.artistName);

      if (coverFile) formData.append('cover', coverFile);
      if (audioFile) formData.append('file', audioFile);

      await api.patch(`/releases/${id}`, formData);

      alert('✅ Updated successfully');
      navigate('/my-music');
    } catch (err) {
      console.log(err);
      alert('❌ Update failed');
    }
  };

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////
  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Edit Release</h1>

      <div style={styles.card}>
        {/* COVER */}
        <label style={styles.uploadBox}>
          {coverPreview ? (
            <img src={coverPreview} style={styles.cover} />
          ) : (
            <p>Upload Cover</p>
          )}

          <input
            type="file"
            hidden
            onChange={(e) =>
              e.target.files && handleCover(e.target.files[0])
            }
          />
        </label>

        {/* TITLE */}
        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          placeholder="Title"
          style={styles.input}
        />

        {/* ARTIST */}
        <input
          value={form.artistName}
          onChange={(e) =>
            setForm({ ...form, artistName: e.target.value })
          }
          placeholder="Artist"
          style={styles.input}
        />

        {/* AUDIO */}
        <label style={styles.uploadBox}>
          {audioFile ? `🎵 ${audioFile.name}` : 'Upload Audio'}
          <input
            type="file"
            hidden
            onChange={(e) =>
              e.target.files && handleAudio(e.target.files[0])
            }
          />
        </label>

        {/* SAVE */}
        <button onClick={handleUpdate} style={styles.saveBtn}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////
// 🎨 STYLE
//////////////////////////////////////////////////

const styles = {
  container: {
    minHeight: '100vh',
    background: '#000',
    color: '#fff',
    padding: 30,
  },

  title: {
    fontSize: 28,
    marginBottom: 20,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  card: {
    background: '#0a0a0a',
    padding: 20,
    borderRadius: 12,
    maxWidth: 400,
    boxShadow:
      '0 0 20px rgba(255,0,60,0.3), 0 0 20px rgba(124,58,237,0.3)',
  },

  cover: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 15,
  },

  uploadBox: {
    border: '1px dashed #7c3aed',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
    cursor: 'pointer',
  },

  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    background: '#111',
    border: '1px solid #222',
    color: '#fff',
    borderRadius: 6,
  },

  saveBtn: {
    width: '100%',
    padding: 12,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 8,
    cursor: 'pointer',
  },

  loading: {
    color: '#fff',
    padding: 40,
  },
};