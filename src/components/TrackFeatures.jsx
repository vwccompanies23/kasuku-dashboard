import { genres, languages } from './GenresData';

export default function TrackFeatures({
  track,
  tracks,
  setTracks,
  index,
}) {

  const updateTrack = (field, value) => {
    const copy = [...tracks];
    copy[index][field] = value;
    setTracks(copy);
  };

  const addWriter = () => {
    const copy = [...tracks];
    copy[index].songwriters.push('');
    setTracks(copy);
  };

  const removeWriter = (i) => {
    const copy = [...tracks];
    copy[index].songwriters.splice(i, 1);
    setTracks(copy);
  };

  const addFeature = () => {
    const copy = [...tracks];
    copy[index].featuredArtists.push('');
    setTracks(copy);
  };

  const removeFeature = (i) => {
    const copy = [...tracks];
    copy[index].featuredArtists.splice(i, 1);
    setTracks(copy);
  };

  return (
    <div style={styles.container}>

      {/* FEATURED */}
      <div style={styles.section}>

        <label style={styles.label}>
          <input
            type="checkbox"
            checked={track.hasFeatured}
            onChange={(e) =>
              updateTrack('hasFeatured', e.target.checked)
            }
          />

          {' '}Featured Artists
        </label>

        {track.hasFeatured && (
          <>
            {track.featuredArtists.map((artist, i) => (
              <div key={i} style={styles.row}>
                <input
                  placeholder="Featured artist name"
                  value={artist}
                  onChange={(e) => {
                    const copy = [...tracks];
                    copy[index].featuredArtists[i] =
                      e.target.value;
                    setTracks(copy);
                  }}
                  style={styles.input}
                />

                <button
                  style={styles.remove}
                  onClick={() => removeFeature(i)}
                >
                  ✕
                </button>
              </div>
            ))}

            <button style={styles.add} onClick={addFeature}>
              + Add Featured Artist
            </button>
          </>
        )}
      </div>

      {/* MORE FEATURES */}
      <details style={styles.more}>
        <summary style={styles.summary}>
          + More Features
        </summary>

        {/* LANGUAGE */}
        <select
          style={styles.input}
          value={track.language}
          onChange={(e) =>
            updateTrack('language', e.target.value)
          }
        >
          <option value="">Language</option>

          {languages.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>

        {/* PRIMARY */}
        <select
          style={styles.input}
          value={track.primaryGenre}
          onChange={(e) =>
            updateTrack('primaryGenre', e.target.value)
          }
        >
          <option value="">Primary Genre</option>

          {genres.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

        {/* SECONDARY */}
        <select
          style={styles.input}
          value={track.secondaryGenre}
          onChange={(e) =>
            updateTrack('secondaryGenre', e.target.value)
          }
        >
          <option value="">Secondary Genre</option>

          {genres.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

        {/* OWNERSHIP */}
        <select
          style={styles.input}
          value={track.ownershipType}
          onChange={(e) =>
            updateTrack('ownershipType', e.target.value)
          }
        >
          <option value="original">
            I wrote this song and own all rights
          </option>

          <option value="cover">
            This is a cover song
          </option>
        </select>

        {/* COVER INFO */}
        {track.ownershipType === 'cover' && (
          <>
            <input
              placeholder="Original Artist"
              value={track.originalArtist}
              onChange={(e) =>
                updateTrack('originalArtist', e.target.value)
              }
              style={styles.input}
            />

            <input
              placeholder="Original Song Title"
              value={track.originalSongTitle}
              onChange={(e) =>
                updateTrack(
                  'originalSongTitle',
                  e.target.value
                )
              }
              style={styles.input}
            />

            <input
              placeholder="Original Songwriter"
              value={track.originalSongwriter}
              onChange={(e) =>
                updateTrack(
                  'originalSongwriter',
                  e.target.value
                )
              }
              style={styles.input}
            />
          </>
        )}

        {/* SONGWRITERS */}
        <div style={styles.writerBox}>
          <h4>Songwriters</h4>

          {track.songwriters.map((writer, i) => (
            <div key={i} style={styles.row}>
              <input
                placeholder="Writer name"
                value={writer}
                onChange={(e) => {
                  const copy = [...tracks];
                  copy[index].songwriters[i] =
                    e.target.value;
                  setTracks(copy);
                }}
                style={styles.input}
              />

              <button
                style={styles.remove}
                onClick={() => removeWriter(i)}
              >
                ✕
              </button>
            </div>
          ))}

          <button style={styles.add} onClick={addWriter}>
            + Add Songwriter
          </button>
        </div>

        {/* EXPLICIT */}
        <select
          style={styles.input}
          value={track.explicitType}
          onChange={(e) =>
            updateTrack('explicitType', e.target.value)
          }
        >
          <option value="clean">
            Clean Version
          </option>

          <option value="explicit">
            Explicit Version
          </option>
        </select>

        {/* PREVIEW */}
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={track.customPreview}
            onChange={(e) =>
              updateTrack('customPreview', e.target.checked)
            }
          />

          {' '}Custom Preview Clip
        </label>

        {track.customPreview && (
          <input
            type="number"
            placeholder="Preview Start Time (seconds)"
            value={track.previewStart}
            onChange={(e) =>
              updateTrack('previewStart', e.target.value)
            }
            style={styles.input}
          />
        )}
      </details>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 15,
    padding: 15,
    background: '#070707',
    border: '1px solid #1a1a1a',
    borderRadius: 12,
  },

  section: {
    marginBottom: 15,
  },

  label: {
    color: '#fff',
    fontSize: 14,
  },

  more: {
    marginTop: 10,
  },

  summary: {
    cursor: 'pointer',
    color: '#ff004c',
    fontWeight: 'bold',
    marginBottom: 15,
  },

  input: {
    width: '100%',
    padding: 12,
    background: '#0f0f0f',
    border: '1px solid #262626',
    borderRadius: 10,
    color: '#fff',
    marginBottom: 10,
    outline: 'none',
  },

  row: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },

  add: {
    background:
      'linear-gradient(90deg,#ff004c,#7c3aed)',
    border: 'none',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: 10,
    cursor: 'pointer',
    marginTop: 10,
  },

  remove: {
    background: '#ff004c',
    border: 'none',
    color: '#fff',
    width: 35,
    height: 35,
    borderRadius: 8,
    cursor: 'pointer',
  },

  writerBox: {
    marginTop: 20,
  },
};