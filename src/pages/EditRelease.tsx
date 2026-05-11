import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

const BASE_URL = 'https://kasuku-backend.onrender.com';

export default function EditRelease() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const userPlan =
  localStorage.getItem('plan');

const canEditLabel =
  userPlan === 'artist' ||
  userPlan === 'pro';

const [form, setForm] = useState({
  title: '',
  artistName: '',

  labelName: '',

  primaryGenre: '',
  secondaryGenre: '',

  language: '',

  contentRating: 'clean',

  songwriter: '',

  composer: '',

  producer: '',

  copyrightOwner: '',

  publishingRights: '',

  releaseVersion: '',
});

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [audioFile, setAudioFile] = useState<File | null>(null);

  //////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////
  const [fetched, setFetched] =
  useState(false);

useEffect(() => {
  if (fetched) return;

  setFetched(true);

  fetchRelease();
}, [fetched]);

  const fetchRelease = async () => {
    try {
      const res = await api.get(`/releases/${id}`);

      const data = res.data;

     setForm({
  title: data.title || '',

  artistName:
    data.artistName || '',

  labelName:
    data.labelName || '',

  primaryGenre:
    data.primaryGenre || '',

  secondaryGenre:
    data.secondaryGenre || '',

  language:
    data.language || '',

  contentRating:
    data.contentRating || 'clean',

  songwriter:
    data.songwriter || '',

  composer:
    data.composer || '',

  producer:
    data.producer || '',

  copyrightOwner:
    data.copyrightOwner || '',

  publishingRights:
    data.publishingRights || '',

  releaseVersion:
    data.releaseVersion || '',
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
      console.log(
  'Failed to load release',
);
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

      formData.append(
  'labelName',
  form.labelName,
);

formData.append(
  'primaryGenre',
  form.primaryGenre,
);

formData.append(
  'secondaryGenre',
  form.secondaryGenre,
);

formData.append(
  'language',
  form.language,
);

formData.append(
  'contentRating',
  form.contentRating,
);

formData.append(
  'songwriter',
  form.songwriter,
);

formData.append(
  'composer',
  form.composer,
);

formData.append(
  'producer',
  form.producer,
);

formData.append(
  'copyrightOwner',
  form.copyrightOwner,
);

formData.append(
  'publishingRights',
  form.publishingRights,
);

formData.append(
  'releaseVersion',
  form.releaseVersion,
);

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

        {/* LABEL */}
<input
  value={form.labelName}
  disabled={!canEditLabel}
  onChange={(e) =>
    setForm({
      ...form,
      labelName: e.target.value,
    })
  }
  placeholder={
    canEditLabel
      ? 'Label Name'
      : 'Kasuku'
  }
  style={{
    ...styles.input,
    opacity: canEditLabel ? 1 : 0.6,
  }}
/>

{/* PRIMARY GENRE */}
<input
  value={form.primaryGenre}
  onChange={(e) =>
    setForm({
      ...form,
      primaryGenre:
        e.target.value,
    })
  }
  placeholder="Primary Genre"
  style={styles.input}
/>

{/* SECONDARY GENRE */}
<input
  value={form.secondaryGenre}
  onChange={(e) =>
    setForm({
      ...form,
      secondaryGenre:
        e.target.value,
    })
  }
  placeholder="Secondary Genre"
  style={styles.input}
/>

{/* LANGUAGE */}
<input
  value={form.language}
  onChange={(e) =>
    setForm({
      ...form,
      language:
        e.target.value,
    })
  }
  placeholder="Language"
  style={styles.input}
/>

{/* EXPLICIT */}
<select
  value={form.contentRating}
  onChange={(e) =>
    setForm({
      ...form,
      contentRating:
        e.target.value,
    })
  }
  style={styles.input}
>
  <option value="clean">
    Clean
  </option>

  <option value="explicit">
    Explicit
  </option>
</select>

{/* SONGWRITER */}
<input
  value={form.songwriter}
  onChange={(e) =>
    setForm({
      ...form,
      songwriter:
        e.target.value,
    })
  }
  placeholder="Songwriter"
  style={styles.input}
/>

{/* COMPOSER */}
<input
  value={form.composer}
  onChange={(e) =>
    setForm({
      ...form,
      composer:
        e.target.value,
    })
  }
  placeholder="Composer"
  style={styles.input}
/>

{/* PRODUCER */}
<input
  value={form.producer}
  onChange={(e) =>
    setForm({
      ...form,
      producer:
        e.target.value,
    })
  }
  placeholder="Producer"
  style={styles.input}
/>

{/* COPYRIGHT */}
<input
  value={form.copyrightOwner}
  onChange={(e) =>
    setForm({
      ...form,
      copyrightOwner:
        e.target.value,
    })
  }
  placeholder="Copyright Owner"
  style={styles.input}
/>

{/* PUBLISHING */}
<input
  value={form.publishingRights}
  onChange={(e) =>
    setForm({
      ...form,
      publishingRights:
        e.target.value,
    })
  }
  placeholder="Publishing Rights"
  style={styles.input}
/>

{/* VERSION */}
<input
  value={form.releaseVersion}
  onChange={(e) =>
    setForm({
      ...form,
      releaseVersion:
        e.target.value,
    })
  }
  placeholder="Version (Live, Remix, Acoustic)"
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