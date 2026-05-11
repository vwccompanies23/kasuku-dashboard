import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import kasukuLogo from '../assets/kasuku-logo.png';

export default function Card() {
  const [card, setCard] = useState(null);
  const [flip, setFlip] = useState(false);
  const [transform, setTransform] = useState('');
  const [shine, setShine] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadCard();
  }, []);

  const loadCard = async () => {
    try {
      const res = await api.get('/billing/card');
      setCard(res.data);
    } catch {
      setCard(null);
    }
  };

  // 🔥 UPDATED: GO TO CARD INPUT PAGE
  const updateCard = () => {
    navigate('/settings/card-form'); // 👈 create this page
  };

  // 🔥 3D + LIGHT EFFECT
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 10;
    const rotateY = (x - rect.width / 2) / 10;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

    setShine({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 60%)`,
    });
  };

  const reset = () => {
    setTransform('rotateX(0deg) rotateY(0deg)');
    setShine({});
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💳 Payment Method</h1>

      {/* CARD */}
      <div
        style={styles.wrapper}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={() => setFlip(!flip)}
      >
        <div
          style={{
            ...styles.card,
            transform: `${transform} ${flip ? 'rotateY(180deg)' : ''}`,
          }}
        >

          {/* FRONT */}
          <div style={styles.front}>
            <div style={styles.glow}></div>
            <div style={{ ...styles.shine, ...shine }}></div>

            <div style={styles.topRow}>
              <div style={styles.chip}></div>
              <img src={kasukuLogo} style={styles.logo} />
            </div>

            <div style={styles.number}>
              {card
                ? `**** **** **** ${card.last4}`
                : '**** **** **** ****'}
            </div>

            <div style={styles.bottom}>
              <div>
                <p style={styles.label}>CARD HOLDER</p>
                <p>{card?.name || 'YOUR NAME'}</p>
              </div>

              <div>
                <p style={styles.label}>EXPIRES</p>
                <p>
                  {card
                    ? `${card.exp_month}/${card.exp_year}`
                    : 'MM/YY'}
                </p>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div style={styles.back}>
            <div style={styles.strip}></div>

            <div style={styles.cvvBox}>
              <span>CVV</span>
              <div style={styles.cvv}>***</div>
            </div>

            <p style={{ opacity: 0.6 }}>
              Kasuku Secure Payment
            </p>
          </div>

        </div>
      </div>

      {!card && <p style={styles.noCard}>No card saved ❌</p>}

      {/* 🔥 UPDATED BUTTON TEXT */}
      <button onClick={updateCard} style={styles.button}>
        Upgrade Card Info 💳
      </button>
    </div>
  );
}


// 🎨 STYLES (UNCHANGED)
const styles = {
  container: {
    color: '#fff',
  },

  title: {
    fontSize: 28,
    marginBottom: 20,
  },

  wrapper: {
    perspective: 1200,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
    cursor: 'pointer',
  },

  card: {
    width: 360,
    height: 220,
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.4s ease',
  },

  front: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 20,
    backfaceVisibility: 'hidden',
    background:
      'linear-gradient(135deg,#ff003c,#7c3aed)',
    boxShadow: '0 0 50px rgba(124,58,237,0.7)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  back: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 20,
    background: '#111',
    transform: 'rotateY(180deg)',
    backfaceVisibility: 'hidden',
  },

  glow: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    background:
      'radial-gradient(circle, rgba(255,0,60,0.3), transparent 70%)',
    top: '-20%',
    left: '-20%',
    animation: 'pulse 6s infinite',
  },

  shine: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },

  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    width: 70,
    filter: 'drop-shadow(0 0 10px rgba(255,0,60,0.8))',
  },

  chip: {
    width: 50,
    height: 35,
    borderRadius: 6,
    background: 'gold',
  },

  number: {
    fontSize: 22,
    letterSpacing: 2,
  },

  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 10,
    opacity: 0.7,
  },

  strip: {
    height: 40,
    background: '#000',
    marginBottom: 20,
  },

  cvvBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  cvv: {
    background: '#fff',
    color: '#000',
    padding: '5px 10px',
    borderRadius: 5,
  },

  noCard: {
    textAlign: 'center',
    color: '#aaa',
  },

  button: {
    marginTop: 20,
    padding: 12,
    width: '100%',
    borderRadius: 10,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};