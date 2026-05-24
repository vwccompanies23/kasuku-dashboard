export default function MoreFeatures({
  track,
  setTrack,
}) {
  const safeFeaturedArtists =
    track.featuredArtists || [];

  const safeSongwriters =
    track.songwriters || [];

  return (
    <div style={styles.box}>
      <h3 style={styles.title}>
        Track Metadata
      </h3>

      {/* ========================= */}
      {/* FEATURED ARTISTS */}
      {/* ========================= */}

      <div style={styles.section}>
        <p style={styles.label}>
          Featured Artists
        </p>

        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={
              track.hasFeatured ||
              false
            }
            onChange={(e) =>
              setTrack({
                ...track,

                hasFeatured:
                  e.target.checked,

                featuredArtists:
                  e.target.checked
                    ? safeFeaturedArtists
                        .length
                      ? safeFeaturedArtists
                      : ['']
                    : [],
              })
            }
          />

          <span>
            This song has featured
            artist(s)
          </span>
        </label>

        {track.hasFeatured && (
          <div style={styles.group}>
            {safeFeaturedArtists.map(
              (
                artist,
                index
              ) => (
                <div
                  key={index}
                  style={
                    styles.featuredRow
                  }
                >
                  <input
                    type="text"
                    placeholder={`Featured Artist ${
                      index + 1
                    }`}
                    value={artist}
                    onChange={(e) => {
                      const updated =
                        [
                          ...safeFeaturedArtists,
                        ];

                      updated[
                        index
                      ] =
                        e.target.value;

                      setTrack({
                        ...track,

                        featuredArtists:
                          updated,
                      });
                    }}
                    style={{
                      ...styles.input,
                      flex: 1,
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const updated =
                        safeFeaturedArtists.filter(
                          (
                            _,
                            i
                          ) =>
                            i !==
                            index
                        );

                      setTrack({
                        ...track,

                        featuredArtists:
                          updated,
                      });
                    }}
                    style={
                      styles.removeBtn
                    }
                  >
                    ✕
                  </button>
                </div>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setTrack({
                  ...track,

                  featuredArtists:
                    [
                      ...safeFeaturedArtists,
                      '',
                    ],
                })
              }
              style={styles.addBtn}
            >
              + Add Another Artist
            </button>
          </div>
        )}
      </div>

      {/* ========================= */}
      {/* LANGUAGE */}
      {/* ========================= */}

      <select
        value={track.language || ''}
        onChange={(e) =>
          setTrack({
            ...track,

            language:
              e.target.value,
          })
        }
        style={styles.select}
      >
        <option value="">
          Select Language
        </option>

        <option value="English">
          English
        </option>

        <option value="French">
          French
        </option>

        <option value="Swahili">
          Swahili
        </option>

        <option value="Lingala">
          Lingala
        </option>

        <option value="Spanish">
          Spanish
        </option>

        <option value="Portuguese">
          Portuguese
        </option>

        <option value="Arabic">
          Arabic
        </option>
      </select>

      {/* ========================= */}
      {/* PRIMARY GENRE */}
      {/* ========================= */}

      <select
        value={
          track.primaryGenre ||
          ''
        }
        onChange={(e) =>
          setTrack({
            ...track,

            primaryGenre:
              e.target.value,
          })
        }
        style={styles.select}
      >
        <option value="">
          Primary Genre
        </option>

        <option>
          Hip Hop
        </option>

        <option>
          Afrobeats
        </option>

        <option>R&B</option>

        <option>Pop</option>

        <option>Amapiano</option>

        <option>
          Dancehall
        </option>

        <option>
          Gospel
        </option>

        <option>Rock</option>

        <option>Jazz</option>

        <option>EDM</option>
      </select>

      {/* ========================= */}
      {/* SECONDARY GENRE */}
      {/* ========================= */}

      <select
        value={
          track.secondaryGenre ||
          ''
        }
        onChange={(e) =>
          setTrack({
            ...track,

            secondaryGenre:
              e.target.value,
          })
        }
        style={styles.select}
      >
        <option value="">
          Secondary Genre
        </option>

        <option>
          Hip Hop
        </option>

        <option>
          Afrobeats
        </option>

        <option>R&B</option>

        <option>Pop</option>

        <option>Amapiano</option>

        <option>
          Dancehall
        </option>

        <option>
          Gospel
        </option>

        <option>Rock</option>

        <option>Jazz</option>

        <option>EDM</option>
      </select>

      {/* ========================= */}
      {/* OWNERSHIP */}
      {/* ========================= */}

      <div style={styles.section}>
        <p style={styles.label}>
          Song Ownership
        </p>

        <label style={styles.radio}>
          <input
            type="radio"
            checked={
              track.ownership ===
              'original'
            }
            onChange={() =>
              setTrack({
                ...track,

                ownership:
                  'original',
              })
            }
          />

          <span>
            I wrote this song and
            own all rights
          </span>
        </label>

        <label style={styles.radio}>
          <input
            type="radio"
            checked={
              track.ownership ===
              'cover'
            }
            onChange={() =>
              setTrack({
                ...track,

                ownership:
                  'cover',
              })
            }
          />

          <span>
            This is a cover song
          </span>
        </label>
      </div>

      {/* ========================= */}
      {/* COVER SONG INFO */}
      {/* ========================= */}

      {track.ownership ===
        'cover' && (
        <div style={styles.group}>
          <input
            placeholder="Original Artist"
            value={
              track.originalArtist ||
              ''
            }
            onChange={(e) =>
              setTrack({
                ...track,

                originalArtist:
                  e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            placeholder="Original Song Title"
            value={
              track.originalSongTitle ||
              ''
            }
            onChange={(e) =>
              setTrack({
                ...track,

                originalSongTitle:
                  e.target.value,
              })
            }
            style={styles.input}
          />

          <input
            placeholder="Original Songwriter"
            value={
              track.originalSongwriter ||
              ''
            }
            onChange={(e) =>
              setTrack({
                ...track,

                originalSongwriter:
                  e.target.value,
              })
            }
            style={styles.input}
          />
        </div>
      )}

      {/* ========================= */}
      {/* SONGWRITERS */}
      {/* ========================= */}

      {track.ownership ===
        'original' && (
        <div style={styles.section}>
          <p style={styles.label}>
            Songwriters
          </p>

          <div style={styles.group}>
            {safeSongwriters.map(
              (
                writer,
                index
              ) => (
                <div
                  key={index}
                  style={
                    styles.featuredRow
                  }
                >
                  <input
                    type="text"
                    placeholder={`Songwriter ${
                      index + 1
                    }`}
                    value={writer}
                    onChange={(e) => {
                      const updated =
                        [
                          ...safeSongwriters,
                        ];

                      updated[
                        index
                      ] =
                        e.target.value;

                      setTrack({
                        ...track,

                        songwriters:
                          updated,
                      });
                    }}
                    style={{
                      ...styles.input,
                      flex: 1,
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const updated =
                        safeSongwriters.filter(
                          (
                            _,
                            i
                          ) =>
                            i !==
                            index
                        );

                      setTrack({
                        ...track,

                        songwriters:
                          updated,
                      });
                    }}
                    style={
                      styles.removeBtn
                    }
                  >
                    ✕
                  </button>
                </div>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setTrack({
                  ...track,

                  songwriters:
                    [
                      ...safeSongwriters,
                      '',
                    ],
                })
              }
              style={styles.addBtn}
            >
              + Add Songwriter
            </button>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* RADIO EDIT */}
      {/* ========================= */}

      <div style={styles.section}>
        <p style={styles.label}>
          Is this a radio edit?
        </p>

        <label style={styles.radio}>
          <input
            type="radio"
            checked={
              !track.isRadioEdit
            }
            onChange={() =>
              setTrack({
                ...track,

                isRadioEdit:
                  false,
              })
            }
          />

          <span>
            Song is clean
          </span>
        </label>

        <label style={styles.radio}>
          <input
            type="radio"
            checked={
              track.isRadioEdit
            }
            onChange={() =>
              setTrack({
                ...track,

                isRadioEdit:
                  true,
              })
            }
          />

          <span>
            Explicit version
            exists
          </span>
        </label>
      </div>

      {/* ========================= */}
      {/* PREVIEW START */}
      {/* ========================= */}

      <input
        type="number"
        placeholder="Preview clip start time (seconds)"
        value={
          track.previewStart ||
          ''
        }
        onChange={(e) =>
          setTrack({
            ...track,

            previewStart:
              e.target.value,
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

    borderRadius: 18,

    background:
      'linear-gradient(180deg,#0b0b0f,#111118)',

    border:
      '1px solid rgba(255,255,255,0.06)',

    width: '100%',

    boxSizing:
      'border-box',

    overflow: 'hidden',
  },

  title: {
    color: '#fff',

    marginBottom: 24,

    fontSize:
      'clamp(24px,4vw,34px)',

    fontWeight: '800',

    lineHeight: 1.2,
  },

  group: {
    width: '100%',
  },

  select: {
    width: '100%',

    padding: 14,

    marginBottom: 14,

    background: '#111',

    border:
      '1px solid #222',

    borderRadius: 14,

    color: '#fff',

    fontSize: 15,

    outline: 'none',

    boxSizing:
      'border-box',
  },

  input: {
    width: '100%',

    padding: 14,

    marginBottom: 12,

    background: '#111',

    border:
      '1px solid #222',

    borderRadius: 14,

    color: '#fff',

    fontSize: 15,

    outline: 'none',

    boxSizing:
      'border-box',

    minWidth: 0,
  },

  section: {
    marginBottom: 24,
  },

  label: {
    color: '#ff4d6d',

    marginBottom: 12,

    fontWeight: '700',

    fontSize: 16,
  },

  radio: {
    display: 'flex',

    alignItems: 'center',

    gap: 10,

    marginBottom: 12,

    color: '#ddd',

    fontSize: 15,

    flexWrap: 'wrap',

    lineHeight: 1.5,
  },

  checkboxRow: {
    display: 'flex',

    alignItems: 'center',

    gap: 10,

    color: '#fff',

    fontSize: 15,

    flexWrap: 'wrap',

    lineHeight: 1.5,
  },

  featuredRow: {
    display: 'flex',

    gap: 10,

    alignItems: 'center',

    marginBottom: 12,

    width: '100%',

    flexWrap: 'wrap',
  },

  addBtn: {
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    color: '#fff',

    border: 'none',

    padding:
      '14px 18px',

    borderRadius: 14,

    cursor: 'pointer',

    fontWeight: '700',

    width: '100%',

    fontSize: 15,

    transition:
      'all 0.25s ease',
  },

  removeBtn: {
    background: '#ff004c',

    color: '#fff',

    border: 'none',

    padding:
      '14px 16px',

    borderRadius: 14,

    cursor: 'pointer',

    fontWeight: '700',

    minWidth: 55,

    flexShrink: 0,
  },
};