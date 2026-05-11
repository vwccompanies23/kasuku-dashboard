export default function MoreFeatures({ track, setTrack }) {
  return (
    <div style={styles.box}>
      <h3 style={styles.title}>More Features</h3>

      {/* LANGUAGE */}
      <select
        value={track.language}
        onChange={(e) =>
          setTrack({ ...track, language: e.target.value })
        }
        style={styles.select}
      >
        <option value="">Select Language</option>
        <option>English</option>
        <option>French</option>
        <option>Swahili</option>
        <option>Lingala</option>
      </select>

      {/* PRIMARY GENRE */}
      <select
        value={track.primaryGenre}
        onChange={(e) =>
          setTrack({ ...track, primaryGenre: e.target.value })
        }
        style={styles.select}
      >
        <option value="">Primary Genre</option>
        <option>Hip Hop</option>
        <option>Afrobeats</option>
        <option>R&B</option>
        <option>Pop</option>
      </select>

      {/* SECONDARY GENRE */}
      <select
        value={track.secondaryGenre}
        onChange={(e) =>
          setTrack({ ...track, secondaryGenre: e.target.value })
        }
        style={styles.select}
      >
        <option value="">Secondary Genre</option>
        <option>Hip Hop</option>
        <option>Afrobeats</option>
        <option>R&B</option>
        <option>Pop</option>
      </select>

      {/* OWNERSHIP */}
      <div style={styles.section}>
        <p style={styles.label}>Song Ownership</p>

        <label style={styles.radio}>
          <input
            type="radio"
            checked={track.ownership === 'original'}
            onChange={() =>
              setTrack({ ...track, ownership: 'original' })
            }
          />
          I wrote this song and own all rights
        </label>

        <label style={styles.radio}>
          <input
            type="radio"
            checked={track.ownership === 'cover'}
            onChange={() =>
              setTrack({ ...track, ownership: 'cover' })
            }
          />
          This is a cover song
        </label>
      </div>

      {/* COVER SONG INFO */}
      {track.ownership === 'cover' && (
        <>
          <input
            placeholder="Original Artist"
            value={track.originalArtist}
            onChange={(e) =>
              setTrack({
                ...track,
                originalArtist: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            placeholder="Original Song Title"
            value={track.originalSongTitle}
            onChange={(e) =>
              setTrack({
                ...track,
                originalSongTitle: e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            placeholder="Original Songwriter"
            value={track.originalSongwriter}
            onChange={(e) =>
              setTrack({
                ...track,
                originalSongwriter: e.target.value,
              })
            }
            style={styles.input}
          />
        </>
      )}

      {/* SONGWRITER */}
      <textarea
        placeholder="Songwriter names"
        value={track.songwriter}
        onChange={(e) =>
          setTrack({ ...track, songwriter: e.target.value })
        }
        style={styles.textarea}
      />

      {/* RADIO EDIT */}
      <div style={styles.section}>
        <p style={styles.label}>Is this a radio edit?</p>

        <label style={styles.radio}>
          <input
            type="radio"
            checked={!track.isRadioEdit}
            onChange={() =>
              setTrack({ ...track, isRadioEdit: false })
            }
          />
          Song is clean
        </label>

        <label style={styles.radio}>
          <input
            type="radio"
            checked={track.isRadioEdit}
            onChange={() =>
              setTrack({ ...track, isRadioEdit: true })
            }
          />
          Explicit version exists
        </label>
      </div>

      {/* PREVIEW START */}
      <input
        type="number"
        placeholder="Preview clip start time (seconds)"
        value={track.previewStart}
        onChange={(e) =>
          setTrack({
            ...track,
            previewStart: e.target.value,
          })
        }
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  box: {
    marginTop: 20,
    padding: 20,
    borderRadius: 14,
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
  },

  title: {
    color: '#fff',
    marginBottom: 20,
  },

  select: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    background: '#111',
    border: '1px solid #222',
    borderRadius: 10,
    color: '#fff',
  },

  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    background: '#111',
    border: '1px solid #222',
    borderRadius: 10,
    color: '#fff',
  },

  textarea: {
    width: '100%',
    minHeight: 100,
    padding: 12,
    marginBottom: 12,
    background: '#111',
    border: '1px solid #222',
    borderRadius: 10,
    color: '#fff',
  },

  section: {
    marginBottom: 20,
  },

  label: {
    color: '#ff4d6d',
    marginBottom: 10,
    fontWeight: 'bold',
  },

  radio: {
    display: 'block',
    marginBottom: 10,
    color: '#ddd',
  },
};