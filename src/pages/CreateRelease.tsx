import { useState, useRef, useEffect } from 'react';
import PlatformSelector from '../components/PlatformSelector';
import ReleasePreview from '../components/ReleasePreview';
import { useNavigate } from 'react-router-dom';
import MoreFeatures from '../components/MoreFeatures';
import TracksManager from '../components/TracksManager';
import { api } from '../api';

export default function CreateRelease() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const isAdmin =
    user?.role === 'admin';

  const getPlanLevel = (plan) => {
  if (plan === 'pro') return 3;
  if (plan === 'artist') return 2;
  if (plan === 'solo') return 1;
  return 0;
};

const userPlan = isAdmin
  ? 999
  : getPlanLevel(user?.plan);

  const [showUpgrade, setShowUpgrade] =
    useState(false);

  const [publishing, setPublishing] =
    useState(false);

  const [type, setType] =
    useState('single');

  const [cover, setCover] =
    useState(null);

  const [coverPreview, setCoverPreview] =
    useState(null);

  const [releaseStatus, setReleaseStatus] =
    useState('not_live');

  const [selectedPlatforms, setSelectedPlatforms] =
    useState([]);

  const audioRef = useRef();

  const emptyTrack = () => ({
    title: '',
    file: null,
    duration: '',

    producer: '',

    hasFeatured: false,
    featuredArtists: [],

    language: '',
    primaryGenre: '',
    secondaryGenre: '',

    songwriterOption: 'original',

    originalArtistName: '',
    originalSongTitle: '',
    originalSongwriter: '',

    songwriterNames: [''],

    radioEdit: 'no',

    previewStartTime: '',
  });

 const [tracks, setTracks] = useState([
  emptyTrack(),
]);

const [
  selectedTrackIndex,
  setSelectedTrackIndex,
] = useState(0);

  const [form, setForm] = useState({
    title: '',
    artistName: '',
    date: '',
    isrc: '',
    upc: '',
    originalDate: '',
    labelName: '',
  });

  // =========================
  // LOAD DRAFT
  // =========================

  useEffect(() => {
    const saved =
      localStorage.getItem(
        'releaseDraft'
      );

    if (saved) {
      const data =
        JSON.parse(saved);

      setForm(data.form || {});

      setTracks(
        Array.isArray(data.tracks) &&
          data.tracks.length > 0
          ? data.tracks.map(
              (track) => ({
                ...emptyTrack(),
                ...track,
                featuredArtists:
                  track.featuredArtists ||
                  [],
              })
            )
          : [emptyTrack()]
      );

      setCoverPreview(
        data.coverPreview || null
      );

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

        tracks: tracks.map((t) => ({
          ...t,
          file: null,
        })),

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
  // CHANGE TYPE
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

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setCoverPreview(
        reader.result
      );
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

    const url =
      URL.createObjectURL(file);

    const audio =
      new Audio(url);

    audio.onloadedmetadata = () => {
      const duration = Math.floor(
        audio.duration
      );

      const mins = Math.floor(
        duration / 60
      );

      const secs =
        duration % 60;

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
          file.name.replace(
            /\.[^/.]+$/,
            ''
          ),
      };

      setTracks(copy);
    };
  };

  const removeAudio = (
    index,
    e
  ) => {
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

  const uploadToCloud =
    async () => {
      try {
        const formData =
          new FormData();

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
          JSON.stringify(
            selectedPlatforms
          )
        );

        formData.append(
          'trackTitles',
          JSON.stringify(
            tracks.map(
              (t) => t.title
            )
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

        tracks.forEach(
          (track, index) => {
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
  `track_${index}_producer`,
  track.producer || ''
);

            formData.append(
              `track_${index}_primaryGenre`,
              track.primaryGenre ||
                ''
            );

            formData.append(
              `track_${index}_secondaryGenre`,
              track.secondaryGenre ||
                ''
            );

            // ✍️ SONGWRITER
            formData.append(
              `track_${index}_songwriterOption`,
              track.songwriterOption ||
                ''
            );

            formData.append(
              `track_${index}_songwriterNames`,
              track.songwriterNames ||
                ''
            );

            // 📻 RADIO EDIT
            formData.append(
              `track_${index}_radioEdit`,
              track.radioEdit || ''
            );

            // ⏱ PREVIEW TIME
            formData.append(
              `track_${index}_previewStartTime`,
              track.previewStartTime ||
                ''
            );

            // 🎤 FEATURED ARTISTS
            formData.append(
              `track_${index}_featuredArtists`,
              JSON.stringify(
                track.featuredArtists ||
                  []
              )
            );

            // 🔁 ORIGINAL SONG INFO
            formData.append(
              `track_${index}_originalArtistName`,
              track.originalArtistName ||
                ''
            );

            formData.append(
              `track_${index}_originalSongTitle`,
              track.originalSongTitle ||
                ''
            );

            formData.append(
              `track_${index}_originalSongwriter`,
              track.originalSongwriter ||
                ''
            );
          }
        );

        formData.append(
          'releaseStatus',
          releaseStatus
        );

        const token =
          localStorage.getItem(
            'token'
          );

        console.log(
          '🚀 STARTING RELEASE UPLOAD'
        );

        const res =
          await api.post(
            '/releases/upload-full',
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        return res.data;
      } catch (err) {
        console.log(
          '❌ uploadToCloud ERROR'
        );

        console.log(err);

        throw err;
      }
    };

  // =========================
  // PUBLISH
  // =========================

  const handlePublish =
    async () => {
      if (publishing) return;

      try {
        setPublishing(true);

        // ✅ VALIDATION

        if (!form.title) {
          alert(
            'Release title required'
          );
          return;
        }

        if (!form.artistName) {
          alert(
            'Artist name required'
          );
          return;
        }

        if (!form.date) {
          alert(
            'Release date required'
          );
          return;
        }

        if (!cover) {
          alert(
            'Cover image required'
          );
          return;
        }

        for (const track of tracks) {
          if (!track.title) {
            alert(
              'Track title required'
            );
            return;
          }

          if (!track.file) {
            alert(
              `Audio file missing for ${
                track.title ||
                'track'
              }`
            );

            return;
          }
        }

        const result =
          await uploadToCloud();

        console.log(
          '✅ SUCCESS',
          result
        );

        localStorage.removeItem(
          'releaseDraft'
        );

        alert(
          'Release uploaded successfully ✅'
        );

        navigate('/my-music');
      } catch (err) {
        console.log(
          '❌ UPLOAD ERROR',
          err
        );

        console.log(
          err?.response?.data
        );

        alert(
          err?.response?.data
            ?.message ||
            'Upload failed ❌'
        );
      } finally {
        setPublishing(false);
      }
    };

    const isMobile =
  window.innerWidth <= 768;

const isTablet =
  window.innerWidth <= 1100;

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

      <div
  style={{
    ...styles.grid,

    gridTemplateColumns:
      isMobile
        ? '1fr'
        : isTablet
        ? '1fr'
        : 'minmax(0, 1fr) 360px',
  }}
>
        <div style={styles.left}>
          <div style={styles.card}>
            <h3>
              Release Details
            </h3>

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
              value={
                form.artistName
              }
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
                colorScheme:
                  'dark',
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
                position:
                  'relative',
              }}
              onClick={() => {
                if (
                  userPlan < 2 &&
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
  userPlan < 2 &&
  !isAdmin
    ? 0.6
    : 1,
                }}
                value={
                  form.labelName
                }
                onChange={(e) => {
                  if (
  userPlan < 2 &&
  !isAdmin
)
  return;

                  setForm({
                    ...form,

                    labelName:
                      e.target
                        .value,
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

            {/* COVER */}

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
                    alt="Cover"
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
                accept="image/*"
                onChange={(e) =>
                  handleCover(
                    e.target
                      .files?.[0]
                  )
                }
              />
            </label>

            {/* SINGLE AUDIO */}

            {type ===
              'single' && (
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
                  accept=".mp3,.wav,audio/*"
                  onChange={(e) =>
                    handleAudio(
                      e.target
                        .files?.[0]
                    )
                  }
                />
              </label>
            )}
          </div>

          {type !==
            'single' && (
            <TracksManager
              tracks={tracks}
              setTracks={
                setTracks
              }
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

          <div style={styles.card}>
  <h3>
    Track Metadata
  </h3>

  {tracks.length > 1 && (
    <select
      value={
        selectedTrackIndex
      }
      onChange={(e) =>
        setSelectedTrackIndex(
          Number(
            e.target.value
          )
        )
      }
      style={styles.input}
    >
      {tracks.map(
        (track, index) => (
          <option
            key={index}
            value={index}
          >
            {track.title ||
              `Track ${
                index + 1
              }`}
          </option>
        )
      )}
    </select>
  )}

  <MoreFeatures
    track={
      tracks[
        selectedTrackIndex
      ] || emptyTrack()
    }
    setTrack={(
      updatedTrack
    ) => {
      const copy = [
        ...tracks,
      ];

      copy[
        selectedTrackIndex
      ] = updatedTrack;

      setTracks(copy);
    }}
  />
</div>
        </div>

        <div
  style={{
    ...styles.right,

    position:
      isTablet
        ? 'relative'
        : 'sticky',
  }}
>
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
        style={{
          ...styles.publish,

          opacity:
            publishing
              ? 0.7
              : 1,

          cursor:
            publishing
              ? 'not-allowed'
              : 'pointer',
        }}
        onClick={
          handlePublish
        }
        disabled={publishing}
      >
        {publishing
          ? 'Uploading...'
          : '🚀 Publish Release'}
      </button>
    </div>
  );
}

const styles = {
 container: {

  width: '100%',

  maxWidth: 1600,

  margin: '0 auto',

  padding: '24px',

  background: '#000',

  color: '#fff',

  minHeight: '100vh',

  boxSizing: 'border-box',

  overflowX: 'hidden',
},

  switch: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,

    flexWrap: 'wrap',
  },

  btn: {
    padding:
      '10px 18px',

    borderRadius: 8,

    color: '#fff',

    border: 'none',

    cursor: 'pointer',

    minWidth: 100,
  },

  grid: {

  display: 'grid',

  gridTemplateColumns:
    'minmax(0, 1fr) 360px',

  gap: 24,

  alignItems: 'start',

  width: '100%',
},

  left: {
    width: '100%',

    minWidth: 0,
  },

  right: {
    width: '100%',

    position: 'sticky',

    top: 24,

    alignSelf: 'start',
  },

  card: {
    background: '#0a0a0a',

    padding: 24,

    borderRadius: 18,

    marginBottom: 24,

    border:
      '1px solid rgba(255,255,255,0.06)',

      boxShadow:
         '0 0 25px rgba(0,0,0,0.25)',

         overflow: 'hidden',
  },

  input: {
    width: '100%',

    padding: 14,

    fontSize: 15,

    boxSizing: 'border-box',

    marginBottom: 14,

    background: '#111',

    border:
      '1px solid #222',

    color: '#fff',

    borderRadius: 12,

    outline: 'none',

    transition:
      'all 0.2s ease',
  },

  uploadBox: {
    border:
      '1px dashed #7c3aed',

    padding: 28,

    borderRadius: 18,

    marginBottom: 16,

    cursor: 'pointer',

    textAlign: 'center',

    transition:
      'all 0.25s ease',

    overflow: 'hidden',

    background:
      'rgba(255,255,255,0.02)',
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

  aspectRatio: '1 / 1',

  objectFit: 'cover',

  borderRadius: 18,

  maxWidth: 420,

  margin: '0 auto',
},

  duration: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 6,
  },

  removeBtn: {
    background: '#ff004c',

    color: '#fff',

    border: 'none',

    padding:
      '8px 12px',

    marginTop: 10,

    cursor: 'pointer',

    borderRadius: 8,
  },

  addBtn: {
    background: '#7c3aed',

    color: '#fff',

    border: 'none',

    padding: 10,

    borderRadius: 8,
  },

  selector: {
    position: 'relative',

    border:
      '1px solid #222',

    borderRadius: 10,

    overflow: 'hidden',
  },

  slider: {
    position: 'absolute',

    width: '100%',

    height: '50%',

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    transition:
      'transform 0.25s ease',
  },

  option: {
    padding: 14,

    cursor: 'pointer',

    position: 'relative',

    zIndex: 2,
  },

 publish: {

  width: '100%',

  padding: 18,

  background:
    'linear-gradient(90deg,#ff003c,#7c3aed)',

  border: 'none',

  color: '#fff',

  fontSize: 17,

  fontWeight: 'bold',

  borderRadius: 18,

  marginTop: 30,

  cursor: 'pointer',

  transition:
    'all 0.25s ease',

  maxWidth: 500,

  display: 'block',

  marginInline: 'auto',
},

  lockText: {
    position: 'absolute',

    right: 10,

    top: 10,

    fontSize: 11,

    color: '#ff4d6d',
  },
};