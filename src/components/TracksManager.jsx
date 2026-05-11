export default function TracksManager({
  tracks,
  setTracks,
  handleAudio,
  removeAudio,
  removeTrack,
  addTrack,
  styles,
}) {
  return (
    <div style={styles.card}>
      <h3>Tracks</h3>

      {(tracks || []).map((t, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #222',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          {/* TRACK TITLE */}
          <input
            placeholder={`Track ${i + 1} Title`}
            value={t.title || ''}
            onChange={(e) => {
              const copy = [...tracks];
              copy[i].title = e.target.value;
              setTracks(copy);
            }}
            style={styles.input}
          />

          {/* AUDIO */}
          <label style={styles.uploadBoxSmall}>
            {t.file ? (
              <div>
                🎵 {t.file.name}

                <button
                  style={styles.removeBtn}
                  onClick={(e) => removeAudio(i, e)}
                >
                  Remove Audio
                </button>
              </div>
            ) : (
              'Upload Audio'
            )}

            <input
              type="file"
              hidden
              onChange={(e) =>
                handleAudio(e.target.files[0], i)
              }
            />
          </label>

          {/* FEATURED ARTISTS */}
          <div style={{ marginTop: 15 }}>
            <label>
              <input
                type="checkbox"
                checked={t.hasFeatured || false}
                onChange={(e) => {
                  const copy = [...tracks];

                  copy[i].hasFeatured =
                    e.target.checked;

                  if (!e.target.checked) {
                    copy[i].featuredArtists = [];
                  }

                  setTracks(copy);
                }}
              />

              {' '}Featured Artists
            </label>

            {t.hasFeatured && (
              <>
                {(t.featuredArtists || []).map(
                  (fa, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: 10,
                        marginTop: 10,
                      }}
                    >
                      <input
                        placeholder="Artist Name"
                        value={fa.name || ''}
                        onChange={(e) => {
                          const copy = [...tracks];

                          copy[i].featuredArtists[idx].name =
                            e.target.value;

                          setTracks(copy);
                        }}
                        style={styles.input}
                      />

                      <button
                        style={styles.removeBtn}
                        onClick={() => {
                          const copy = [...tracks];

                          copy[i].featuredArtists.splice(
                            idx,
                            1
                          );

                          setTracks(copy);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}

                <button
                  style={styles.addBtn}
                  onClick={() => {
                    const copy = [...tracks];

                    copy[i].featuredArtists =
                      copy[i].featuredArtists || [];

                    copy[i].featuredArtists.push({
                      name: '',
                    });

                    setTracks(copy);
                  }}
                >
                  + Add Artist
                </button>
              </>
            )}
          </div>

          {/* REMOVE TRACK */}
          <button
            onClick={() => removeTrack(i)}
            style={{
              ...styles.removeBtn,
              marginTop: 15,
            }}
          >
            Remove Track
          </button>
        </div>
      ))}

      <button
        onClick={addTrack}
        style={styles.addBtn}
      >
        + Add Track
      </button>
    </div>
  );
}