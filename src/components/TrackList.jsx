import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function TrackList({ tracks, setTracks }) {

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tracks);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setTracks(items);
  };

  const updateTrack = (i, field, value) => {
    const updated = [...tracks];
    updated[i][field] = value;
    setTracks(updated);
  };

  const addTrack = () => {
    setTracks([
      ...tracks,
      { title: '', file: null, preview: null, artists: '' },
    ]);
  };

  const removeTrack = (i) => {
    const updated = [...tracks];
    updated.splice(i, 1);
    setTracks(updated);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🎧 Tracks</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tracks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              
              {tracks.map((track, i) => (
                <Draggable key={i} draggableId={String(i)} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...styles.card,
                        ...provided.draggableProps.style,
                      }}
                    >

                      {/* DRAG HANDLE */}
                      <div {...provided.dragHandleProps} style={styles.drag}>
                        ☰
                      </div>

                      {/* TITLE */}
                      <input
                        placeholder="Track Title"
                        value={track.title}
                        onChange={(e) =>
                          updateTrack(i, 'title', e.target.value)
                        }
                        style={styles.input}
                      />

                      {/* ARTIST */}
                      <input
                        placeholder="Artists"
                        value={track.artists}
                        onChange={(e) =>
                          updateTrack(i, 'artists', e.target.value)
                        }
                        style={styles.input}
                      />

                      {/* FILE */}
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          updateTrack(i, 'file', file);

                          if (file) {
                            const preview = URL.createObjectURL(file);
                            updateTrack(i, 'preview', preview);
                          }
                        }}
                        style={styles.file}
                      />

                      {/* AUDIO PREVIEW */}
                      {track.preview && (
                        <audio controls style={styles.audio}>
                          <source src={track.preview} />
                        </audio>
                      )}

                      {/* REMOVE */}
                      <button
                        onClick={() => removeTrack(i)}
                        style={styles.remove}
                        type="button"
                      >
                        ✖
                      </button>

                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* ADD BUTTON */}
      <button type="button" onClick={addTrack} style={styles.add}>
        + Add Track
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
  },

  title: {
    marginBottom: 10,
    color: '#fff',
  },

  card: {
    position: 'relative',
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
    background: 'rgba(0,0,0,0.7)',
    border: '1px solid #222',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 0 15px rgba(124,58,237,0.2)',
    transition: '0.3s',
  },

  drag: {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'grab',
    opacity: 0.6,
  },

  input: {
    width: '100%',
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    border: '1px solid #333',
    background: '#111',
    color: '#fff',
  },

  file: {
    marginTop: 10,
    color: '#aaa',
  },

  audio: {
    marginTop: 10,
    width: '100%',
  },

  remove: {
    marginTop: 10,
    background: '#ff003c',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 8,
    color: '#fff',
    cursor: 'pointer',
  },

  add: {
    marginTop: 15,
    padding: 12,
    width: '100%',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    cursor: 'pointer',
  },
};