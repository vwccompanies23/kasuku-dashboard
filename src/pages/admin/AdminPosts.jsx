import { useState, useEffect } from 'react';
import { api } from '../../api';

export default function AdminPosts() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // ✅ NEW
  const [loading, setLoading] = useState(false); // ✅ NEW
  const [posts, setPosts] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data || []);
    } catch (err) {
      console.error('LOAD POSTS ERROR:', err);
      setPosts([]);
    }
  };

  // ✅ IMAGE PREVIEW
  const handleImage = (file) => {
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const createPost = async () => {
    if (!text) {
      alert('Write something');
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append('text', text);
      if (image) form.append('image', image);

      await api.post('/posts', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setText('');
      setImage(null);
      setPreview(null);
      loadPosts();
    } catch (err) {
      console.error('CREATE ERROR:', err);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      console.error('DELETE ERROR:', err);
      alert('Failed to delete');
    }
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditText(post.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = async (id) => {
    try {
      await api.put(`/posts/${id}`, { text: editText });

      setEditingId(null);
      setEditText('');
      loadPosts();
    } catch (err) {
      console.error('UPDATE ERROR:', err);
      alert('Failed to update post');
    }
  };

  return (
    <div style={styles.container}>
      <h2>📢 Admin Posts</h2>

      {/* CREATE */}
      <div style={styles.card}>
        <textarea
          placeholder="Write announcement, promo, news..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />

        {/* ✅ IMAGE PREVIEW */}
        {preview && (
          <img src={preview} style={styles.preview} />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImage(e.target.files[0])}
        />

        <button
          onClick={createPost}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
          }}
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post 🚀'}
        </button>
      </div>

      {/* LIST */}
      <div style={{ marginTop: 30 }}>
        {(posts || []).map((p) => (
          <div key={p.id} style={styles.postCard}>

            <div style={styles.postRow}>
              {p.image && (
                <img
                  src={p.image} // ✅ already full URL now
                  style={styles.imageSmall}
                />
              )}

              <div style={{ flex: 1 }}>
                {editingId === p.id ? (
                  <>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={styles.textarea}
                    />

                    <div style={styles.actions}>
                      <button onClick={() => saveEdit(p.id)} style={styles.button}>
                        Save
                      </button>

                      <button onClick={cancelEdit} style={styles.delete}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={styles.text}>{p.text}</p>

                    <div style={styles.actions}>
                      <button onClick={() => startEdit(p)} style={styles.button}>
                        Edit
                      </button>

                      <button onClick={() => deletePost(p.id)} style={styles.delete}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: '0 auto',
  },

  card: {
    background: '#0f172a',
    padding: 20,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    border: '1px solid #1f2937',
  },

  textarea: {
    minHeight: 100,
    padding: 12,
    borderRadius: 10,
    background: '#020617',
    color: '#fff',
    border: '1px solid #222',
  },

  preview: {
    width: 120,
    height: 120,
    borderRadius: 12,
    objectFit: 'cover',
  },

  button: {
    padding: 12,
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #ff003c, #7c3aed)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  delete: {
    background: '#ff003c',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: 8,
    cursor: 'pointer',
  },

  postCard: {
    background: 'rgba(20,20,20,0.9)',
    padding: 12,
    borderRadius: 14,
    marginBottom: 15,
    border: '1px solid rgba(255,255,255,0.06)',
    backdropFilter: 'blur(10px)',
  },

  postRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  },

  imageSmall: {
    width: 80,
    height: 80,
    borderRadius: 10,
    objectFit: 'cover',
    flexShrink: 0,
  },

  text: {
    color: '#ddd',
    fontSize: 14,
  },

  actions: {
    display: 'flex',
    gap: 10,
    marginTop: 10,
  },
};