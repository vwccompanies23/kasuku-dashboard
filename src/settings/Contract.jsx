import { useState, useEffect } from 'react';
import { api } from '../api';
import logo from '../assets/kasuku-logo.png';
import paper from '../assets/paper-texture.jpg';
import { useNavigate } from 'react-router-dom'; // ✅ FIX

export default function Contract() {
  const [flipped, setFlipped] = useState(false);
  const [canAgree, setCanAgree] = useState(false);
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate(); // ✅ FIX

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    const res = await api.get('/contract/me');
    if (res.data) setAgreed(true);
  };

  const agree = async () => {
    if (!name) return alert('Enter your name');

    await api.post('/contract/agree', {
      fullName: name,
    });

    setAgreed(true);
    alert('Agreement saved ✅');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.paperWrapper}>
        <div
          style={{
            ...styles.paper,
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >

          {/* FRONT */}
          <div
            style={styles.side}
            onScroll={(e) => {
              const el = e.target;
              if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
                setCanAgree(true);
              }
            }}
          >
            <img src={logo} style={styles.logo} />

            <h2>Kasuku Legal Agreement</h2>

            {[...Array(8)].map((_, i) => (
              <p key={i} style={styles.text}>
                By using Kasuku, you authorize distribution of your music worldwide.
                You retain ownership. Revenue is paid based on your subscription.
              </p>
            ))}

            <input
              placeholder="Type your full name (signature)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />

            <div style={styles.actions}>
              <button
                disabled={!canAgree || agreed}
                onClick={agree}
                style={{
                  ...styles.agree,
                  opacity: canAgree ? 1 : 0.4,
                }}
              >
                {agreed ? 'Signed ✓' : 'Agree & Sign'}
              </button>

              <button style={styles.link} onClick={() => setFlipped(true)}>
                Read Back →
              </button>
            </div>
          </div>

          {/* BACK */}
          <div style={{ ...styles.side, transform: 'rotateY(180deg)' }}>
            <img src={logo} style={styles.logoSmall} />

            <h3>Additional Terms</h3>

            {[...Array(5)].map((_, i) => (
              <p key={i} style={styles.text}>
                Kasuku may remove content violating policies. Fraud checks may delay payouts.
              </p>
            ))}

            {/* ACTIONS */}
            <div style={styles.actions}>
              <button
                style={styles.manageBtn}
                onClick={() => navigate('/settings/music')}
              >
                🎵 Manage My Music
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => navigate('/settings/delete-account')}
              >
                ⚠️ Delete My Account
              </button>
            </div>

            <button style={styles.link} onClick={() => setFlipped(false)}>
              ← Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    color: '#000',
  },

  paperWrapper: {
    perspective: 1200,
    width: 700,
  },

  paper: {
    position: 'relative',
    height: 500,
    transformStyle: 'preserve-3d',
    transition: '0.6s',
  },

  side: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundImage: `url(${paper})`,
    backgroundSize: 'cover',
    padding: 25,
    borderRadius: 12,
    overflow: 'auto',
  },

  logo: { width: 120 },
  logoSmall: { width: 80 },

  text: {
    fontSize: 14,
    marginBottom: 10,
  },

  input: {
    marginTop: 10,
    padding: 10,
    width: '100%',
  },

  actions: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  agree: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 6,
  },

  manageBtn: {
    padding: 14,
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(90deg,#3b82f6,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  deleteBtn: {
    padding: 14,
    borderRadius: 12,
    border: '1px solid rgba(255,0,0,0.3)',
    background: 'rgba(255,0,0,0.1)',
    color: '#ff4d4d',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  link: {
    background: 'none',
    border: 'none',
    color: '#7c3aed',
    cursor: 'pointer',
  },
};