import { useState, useRef, useEffect } from 'react';
import PlatformSelector from '../components/PlatformSelector';
import ReleasePreview from '../components/ReleasePreview';
import { useNavigate } from 'react-router-dom';
import MoreFeatures from '../components/MoreFeatures';
import TracksManager from '../components/TracksManager';
import { api } from '../api';

export default function CreateRelease() {
  const [showUpgrade, setShowUpgrade] = useState(false);
const user = JSON.parse(
  localStorage.getItem('user') || '{}'
);

const navigate = useNavigate();

const isAdmin =
  user?.role === 'admin';

const userPlan =
  isAdmin
    ? 3
    : user?.plan === 'pro'
    ? 3
    : user?.plan === 'artist'
    ? 2
    : 1;

  const [type, setType] = useState('single');

  const emptyTrack = () => ({
    title: '',
    file: null,
    duration: '',

    hasFeatured: false,
    featuredArtists: [],

    language: '',
    primaryGenre: '',
    secondaryGenre: '',

    songwriterOption: 'original',

    originalArtistName: '',
    originalSongTitle: '',
    originalSongwriter: '',

    songwriterNames: '',

    radioEdit: 'no',

    previewStartTime: '',
  });

  const [tracks, setTracks] = useState([emptyTrack()]);

  const [cover, setCover] = useState(null);

  const [coverPreview, setCoverPreview] = useState(null);

  const [releaseStatus, setReleaseStatus] =
    useState('not_live');

  const [selectedPlatforms, setSelectedPlatforms] =
    useState([]);

  const [artists, setArtists] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: '',
    artistName: '',
    date: '',
    isrc: '',
    upc: '',
    originalDate: '',
    labelName: '',
  });

  const audioRef = useRef();

  // =========================
  // LOAD DRAFT
  // =========================

  useEffect(() => {
    const saved = localStorage.getItem('releaseDraft');

    if (saved) {
      const data = JSON.parse(saved);

      setForm(data.form || {});

      setTracks(
        Array.isArray(data.tracks) &&
          data.tracks.length > 0
          ? data.tracks.map((track) => ({
              ...emptyTrack(),
              ...track,
              featuredArtists:
                track.featuredArtists || [],
            }))
          : [emptyTrack()]
      );

      setCoverPreview(data.coverPreview || null);

      setSelectedPlatforms(
        data.selectedPlatforms || []
      );
    }
  }, []);

  // =========================
  // AUTO SAVE
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
  }, [
    form,
    tracks,
    coverPreview,
    selectedPlatforms,
  ]);

  // =========================
  // TRACK TYPE
  // =========================

  const changeType = (t) => {
    setType(t);

    if (t === 'single') {
      setTracks([emptyTrack()]);
    }

    if (t === 'ep') {
      setTracks([
        emptyTrack(),
        emptyTrack(),
      ]);
    }

    if (t === 'album') {
      setTracks([
        emptyTrack(),
        emptyTrack(),
        emptyTrack(),
      ]);
    }
  };

  // =========================
  // ADD TRACK
  // =========================

  const addTrack = () => {
    setTracks((prev) => [
      ...prev,
      emptyTrack(),
    ]);
  };

  // =========================
  // REMOVE TRACK
  // =========================

  const removeTrack = (index) => {
    setTracks((prev) =>
      prev.filter((_, i) => i !== index)
    );
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

  const handleAudio = (
    file,
    index = 0
  ) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    const audio = new Audio (url);

    audio.onloadedmetadata = () => {
      const duration = Math.floor(
        audio.duration
      );

      const mins = Math.floor(
        duration / 60
      );

      const secs = duration % 60;

      const formatted = `${mins}:${secs
        .toString()
        .padStart(2, '0')}`;

      const copy = [...tracks];

      copy[index] = {
  ...copy[index],
  file,
  duration: formatted,
  title:
    copy[index].title ||
    file.name.replace(/\.[^/.]+$/, ''),
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
    e.currentTarget.style.transform =
      'scale(1.02)';

    e.currentTarget.style.border =
      '1px solid #ff004c';

    e.currentTarget.style.boxShadow =
      '0 0 15px rgba(255,0,80,0.7)';
  };

  const hoverOff = (e) => {
    e.currentTarget.style.transform =
      'scale(1)';

    e.currentTarget.style.border =
      '1px dashed #7c3aed';

    e.currentTarget.style.boxShadow =
      'none';
  };

  // =========================
  // UPLOAD
  // =========================

  const uploadToCloud = async () => {
  try {
    const formData = new FormData();

    formData.append(
      'title',
      form.title
    );

    formData.append(
      'artistName',
      form.artistName
    );

    formData.append(
      'date',
      form.date
    );

    formData.append(
      'labelName',
      form.labelName || ''
    );

    formData.append(
      'platforms',
      JSON.stringify(selectedPlatforms)
    );

    formData.append(
      'trackTitles',
      JSON.stringify(
        tracks.map((t) => t.title)
      )
    );

    if (form.upc) {
      formData.append(
        'upc',
        form.upc
      );
    }

    if (form.isrc) {
      formData.append(
        'isrc',
        form.isrc
      );
    }

    if (form.originalDate) {
      formData.append(
        'originalDate',
        form.originalDate
      );
    }

    if (cover) {
      formData.append(
        'cover',
        cover
      );
    }

    tracks.forEach((track, index) => {

  // 🎵 AUDIO FILE
  if (track.file) {
    formData.append(
      'tracks',
      track.file
    );
  }

  // 🎵 TRACK TITLE
  formData.append(
    `track_${index}_title`,
    track.title || ''
  );

  // 🌍 LANGUAGE
  formData.append(
    `track_${index}_language`,
    track.language || ''
  );

  // 🎼 GENRES
  formData.append(
    `track_${index}_primaryGenre`,
    track.primaryGenre || ''
  );

  formData.append(
    `track_${index}_secondaryGenre`,
    track.secondaryGenre || ''
  );

  // ✍️ SONGWRITER
  formData.append(
    `track_${index}_songwriterOption`,
    track.songwriterOption || ''
  );

  formData.append(
    `track_${index}_songwriterNames`,
    track.songwriterNames || ''
  );

  // 📻 RADIO EDIT
  formData.append(
    `track_${index}_radioEdit`,
    track.radioEdit || ''
  );

  // ⏱ PREVIEW TIME
  formData.append(
    `track_${index}_previewStartTime`,
    track.previewStartTime || ''
  );

  // 🎤 FEATURED ARTISTS
  formData.append(
    `track_${index}_featuredArtists`,
    JSON.stringify(
      track.featuredArtists || []
    )
  );

  // 🔁 ORIGINAL SONG INFO
  formData.append(
    `track_${index}_originalArtistName`,
    track.originalArtistName || ''
  );

  formData.append(
    `track_${index}_originalSongTitle`,
    track.originalSongTitle || ''
  );

  formData.append(
    `track_${index}_originalSongwriter`,
    track.originalSongwriter || ''
  );
});

formData.append(
  'releaseStatus',
  releaseStatus
);

    console.log(
      'SELECTED PLATFORMS:',
      selectedPlatforms
    );

    const token =
      localStorage.getItem('token');

      for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}


    const res = await api.post(

      '/releases/upload-full',
      formData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    );

    return res.data;

  } catch (err) {
    console.log(err);
    throw err;
  }
};

  // =========================
  // PUBLISH
  // =========================

  const handlePublish = async () => {
    try {
      // ✅ VALIDATION
if (!form.title) {
  return alert('Release title required');
}

if (!form.artistName) {
  return alert('Artist name required');
}

if (!form.date) {
  return alert('Release date required');
}

if (!cover) {
  return alert('Cover image required');
}

for (const track of tracks) {

  if (!track.title) {
    return alert('Track title required');
  }

  if (!track.file) {
    return alert(
      `Audio file missing for ${track.title || 'track'}`
    );
  }
}

await uploadToCloud();

      localStorage.removeItem(
        'releaseDraft'
      );

      navigate('/my-music');
    } catch (err) {
      console.log(err);

     console.log(
  err?.response?.data,
);

alert(
  JSON.stringify(
    err?.response?.data,
  ),
);

};
  }

  return (
    <div style={styles.container}>
      <h1>Create New Release</h1>

      <div style={styles.switch}>
        {[
          'single',
          'ep',
          'album',
        ].map((t) => (
          <button
            key={t}
            onClick={() =>
              changeType(t)
            }
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

            <input
              placeholder="Title"
              style={styles.input}
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
            />

            <input
              placeholder="Artist Name"
              style={styles.input}
              value={form.artistName}
              onChange={(e) =>
                setForm({
                  ...form,
                  artistName:
                    e.target.value,
                })
              }
            />

            <input
              type="date"
              value={form.date}
              style={{
                ...styles.input,
                color: '#fff',
                colorScheme: 'dark',
              }}
              onChange={(e) =>
                setForm({
                  ...form,
                  date:
                    e.target.value,
                })
              }
            />

            <div
              style={{
                position: 'relative',
              }}
              onClick={() => {
                if (
                  userPlan === 1 &&
                  !isAdmin
                ) {
                  setShowUpgrade(
                    true
                  );
                }
              }}
            >
              <input
                placeholder="Label Name"
                style={{
                  ...styles.input,
                  opacity:
                    userPlan ===
                      1 &&
                    !isAdmin
                      ? 0.6
                      : 1,
                }}
                value={
                  form.labelName
                }
                onChange={(e) => {
                  if (
                    userPlan ===
                      1 &&
                    !isAdmin
                  )
                    return;

                  setForm({
                    ...form,
                    labelName:
                      e.target.value,
                  });
                }}
              />
            </div>

            {releaseStatus ===
              'live' && (
              <>
                <input
                  placeholder="UPC"
                  style={
                    styles.input
                  }
                  value={form.upc}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      upc:
                        e.target
                          .value,
                    })
                  }
                />

                <input
                  placeholder="ISRC"
                  style={
                    styles.input
                  }
                  value={form.isrc}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isrc:
                        e.target
                          .value,
                    })
                  }
                />
              </>
            )}

            <label
              style={
                styles.uploadBox
              }
              onMouseEnter={
                hoverOn
              }
              onMouseLeave={
                hoverOff
              }
            >
              {coverPreview ? (
                <div>
                  <img
                    src={
                      coverPreview
                    }
                    style={
                      styles.coverPreview
                    }
                  />

                  <button
                    style={
                      styles.removeBtn
                    }
                    onClick={
                      removeCover
                    }
                  >
                    Remove Cover
                  </button>
                </div>
              ) : (
                <p>
                  Upload Cover
                </p>
              )}

              <input
                type="file"
                hidden
                onChange={(e) =>
                  handleCover(
                    e.target
                      .files[0]
                  )
                }
              />
            </label>

            {type === 'single' && (
              <label
                style={
                  styles.uploadBox
                }
              >
                {tracks[0]
                  ?.file ? (
                  <div>
                    🎵{' '}
                    {
                      tracks[0]
                        .file
                        .name
                    }

                    <div
                      style={
                        styles.duration
                      }
                    >
                      {
                        tracks[0]
                          .duration
                      }
                    </div>
                  </div>
                ) : (
                  <p>
                    Upload Audio
                  </p>
                )}

                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleAudio(
                      e.target
                        .files[0]
                    )
                  }
                />
              </label>
            )}
          </div>

          {type !== 'single' && (
            <TracksManager
              tracks={tracks}
              setTracks={setTracks}
              handleAudio={
                handleAudio
              }
              removeAudio={
                removeAudio
              }
              removeTrack={
                removeTrack
              }
              addTrack={addTrack}
              styles={styles}
            />
          )}

          <MoreFeatures
            track={
              tracks[0] ||
              emptyTrack()
            }
            setTrack={(
              updatedTrack
            ) => {
              const copy = [
                ...tracks,
              ];

              copy[0] =
                updatedTrack;

              setTracks(copy);
            }}
          />
        </div>

        <div style={styles.right}>
          <div style={styles.card}>
            <h3>
              🎵 Artist Profile
              Check
            </h3>

            <div
              style={
                styles.selector
              }
            >
              <div
                style={{
                  ...styles.slider,
                  transform:
                    releaseStatus ===
                    'not_live'
                      ? 'translateY(0%)'
                      : 'translateY(100%)',
                }}
              />

              <div
                style={
                  styles.option
                }
                onClick={() =>
                  setReleaseStatus(
                    'not_live'
                  )
                }
              >
                First Release
              </div>

              <div
                style={
                  styles.option
                }
                onClick={() =>
                  setReleaseStatus(
                    'live'
                  )
                }
              >
                Already Released
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlatformSelector
        selectedPlatforms={
          selectedPlatforms
        }
        setSelectedPlatforms={
          setSelectedPlatforms
        }
      />

      <ReleasePreview
        form={form}
        coverPreview={
          coverPreview
        }
        tracks={tracks}
      />

      <button
        style={styles.publish}
        onClick={handlePublish}
      >
        🚀 Publish Release
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    background: '#000',
    color: '#fff',
  },

  switch: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },

  btn: {
    padding: 10,
    borderRadius: 8,
    color: '#fff',
  },

  grid: {
    display: 'flex',
    gap: 20,
  },

  left: {
    flex: 2,
  },

  right: {
    flex: 1,
  },

  card: {
    background: '#0a0a0a',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    background: '#111',
    border: '1px solid #222',
    color: '#fff',
  },

  uploadBox: {
    border:
      '1px dashed #7c3aed',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    cursor: 'pointer',
    textAlign: 'center',
  },

  uploadBoxSmall: {
    border:
      '1px dashed #7c3aed',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },

  coverPreview: {
    width: '100%',
    borderRadius: 10,
  },

  duration: {
    fontSize: 12,
    color: '#aaa',
  },

  removeBtn: {
    background: '#ff004c',
    color: '#fff',
    border: 'none',
    padding: 6,
    marginTop: 5,
    cursor: 'pointer',
  },

  addBtn: {
    background: '#7c3aed',
    color: '#fff',
    border: 'none',
    padding: 10,
  },

  selector: {
    position: 'relative',
    border: '1px solid #222',
    borderRadius: 10,
    overflow: 'hidden',
  },

  slider: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
  },

  option: {
    padding: 12,
    cursor: 'pointer',
  },

  publish: {
    width: '100%',
    padding: 15,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
  },

  lockText: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 11,
    color: '#ff4d6d',
  },
};