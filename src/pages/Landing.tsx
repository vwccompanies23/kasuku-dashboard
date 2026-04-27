import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import logoImg from '../assets/kasuku-logo.png';

export default function Landing() {
  const [plan, setPlan] = useState('monthly');
  const [posts, setPosts] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`/posts?lang=${lang}`);
        setPosts(res.data || []);
      } catch (err) {
        console.error('Posts error:', err);
      }
    };

    fetchPosts();
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const convertPrice = (usd) => {
    if (currency === 'USD') return `$${usd}`;
    const rate = 2800;
    return `${(usd * rate).toLocaleString()} FC`;
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // 🔥🔥 UPDATED LOGIC (PAYMENT FIRST)
  const handlePlanSelect = (planName) => {
    localStorage.setItem('selectedPlan', planName);

    // ✅ FORCE FLOW: payment → then login
    localStorage.setItem('redirectAfterPayment', '/login');

    navigate('/payment'); // ALWAYS go to payment first
  };

  return (
    <div style={styles.container}>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.logoWrap}>
          <img src={logoImg} style={styles.logoImg} />
          <span style={styles.logoText}>KASUKU</span>
        </div>

        <select
          value={lang}
          onChange={(e) => {
            const selected = e.target.value;
            setLang(selected);
            localStorage.setItem('lang', selected);
          }}
          style={styles.select}
        >
          <option value="en">EN 🇺🇸</option>
          <option value="fr">FR 🇫🇷</option>
          <option value="ksw">Kishwahili drc</option>
        </select>

        <div style={styles.navLinks}>
          <span onClick={() => scrollTo('features')} style={styles.link}>Features</span>
          <span onClick={() => scrollTo('pricing')} style={styles.link}>Pricing</span>

          {/* ✅ FIXED (NO MORE <a href>) */}
          <span onClick={() => navigate('/login')} style={styles.link}>Login</span>

          {/* ✅ FIXED */}
          <span onClick={() => navigate('/signup')} style={styles.ctaBtn}>
            Get Started
          </span>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={styles.select}
          >
            <option value="USD">USD $</option>
            <option value="CDF">CDF 🇨🇩</option>
          </select>
        </div>
      </div>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          <div>Distribute Your Music</div>
          <div style={styles.gradient}>Across the Universe</div>
        </h1>

        <p style={styles.heroSub}>
          Spotify, Apple Music, YouTube & more — all in one place.
        </p>

        <div style={styles.heroBtns}>
          {/* ✅ FIXED */}
          <button onClick={() => navigate('/signup')} style={styles.primaryBtn}>
            Start Now 🚀
          </button>

          <button onClick={() => scrollTo('pricing')} style={styles.secondaryBtn}>
            View Pricing
          </button>
        </div>
      </section>

      {/* PRICING */}
      <section style={styles.pricing} id="pricing">
        <div style={styles.cards}>

          <div style={getCardStyle(selectedCard, 'solo')}
               onClick={() => setSelectedCard('solo')}>
            <h3>Solo Artist</h3>
            <button onClick={() => handlePlanSelect('solo')} style={styles.cardBtn}>
              Get Started
            </button>
          </div>

          <div style={getCardStyle(selectedCard, 'artists')}
               onClick={() => setSelectedCard('artists')}>
            <h3>Artists</h3>
            <button onClick={() => handlePlanSelect('artists')} style={styles.cardBtn}>
              Get Started
            </button>
          </div>

          <div style={getCardStyle(selectedCard, 'pro')}
               onClick={() => setSelectedCard('pro')}>
            <h3>Pro</h3>
            <button onClick={() => handlePlanSelect('pro')} style={styles.cardBtn}>
              Get Started
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <div style={styles.footer}>
        <span onClick={() => navigate('/terms')} style={styles.link}>Terms</span>
        <span onClick={() => navigate('/privacy')} style={styles.link}>Privacy</span>
        <span onClick={() => navigate('/help')} style={styles.link}>Help</span>
      </div>

    </div>
  );
}

const styles = {
  container: {
    background: 'radial-gradient(circle at top, #1a002b, #020617, #000)',
    color: '#fff',
    minHeight: '100vh',
  },

  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    alignItems: 'center',
  },

  postCard: {
  background: 'rgba(20,20,20,0.9)',
  padding: 12,
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  border: '1px solid rgba(255,255,255,0.06)',
  backdropFilter: 'blur(10px)',
  transition: '0.25s',
},

postImageSmall: {
  width: 90,
  height: 90,
  borderRadius: 12,
  objectFit: 'cover',
  flexShrink: 0,
},

postContent: {
  flex: 1,
},

postText: {
  fontSize: 14,
  lineHeight: 1.5,
  color: '#ddd',
},

  logoWrap: { display: 'flex', alignItems: 'center', gap: 10 },

  logoImg: { height: 100 },

  // 🔥 GRADIENT TEXT FIXED
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  navLinks: { display: 'flex', gap: 15 },

  link: { color: '#aaa', cursor: 'pointer' },

  ctaBtn: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    padding: '6px 12px',
    borderRadius: 6,
    color: '#fff',
  },

  hero: { padding: 100, textAlign: 'center' },

  heroTitle: { fontSize: 52, lineHeight: 1.2 },

  gradient: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  heroSub: { color: '#aaa', marginTop: 20 },

  heroBtns: { marginTop: 30 },

  primaryBtn: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
  },

  secondaryBtn: {
    marginLeft: 10,
    padding: 12,
    background: '#111',
    color: '#fff',
  },

  pricing: { padding: 80 },

  toggleWrap: {
    position: 'relative',
    width: 220,
    margin: '0 auto 40px',
    background: '#111',
    borderRadius: 20,
    display: 'flex',
  },

  slider: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    borderRadius: 20,
    transition: '0.3s',
  },

  toggleText: {
    flex: 1,
    padding: 10,
    background: 'transparent',
    border: 'none',
    color: '#fff',
    zIndex: 2,
    cursor: 'pointer',
  },

  cards: {
    display: 'flex',
    justifyContent: 'center',
    gap: 30,
    flexWrap: 'wrap',
  },

  glowBorder: {
    position: 'absolute',
    inset: 0,
    borderRadius: 18,
    padding: 1,
    background: 'linear-gradient(120deg,#ff003c,#7c3aed,#ff003c)',
    WebkitMask:
      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    opacity: 0.6,
    pointerEvents: 'none',
  },

  badge: {
    background: '#7c3aed',
    padding: 5,
    borderRadius: 10,
    fontSize: 12,
  },

  icon: { fontSize: 30, marginBottom: 10 },

  sub: { color: '#aaa' },

  price: { fontSize: 28, color: '#ff003c' },

  month: { fontSize: 14 },

  list: { textAlign: 'left', marginTop: 15, lineHeight: 1.8 },

  cardBtn: {
    marginTop: 15,
    padding: 10,
    width: '100%',
    background: '#7c3aed',
    border: 'none',
    color: '#fff',
  },

  ctaBig: {
    marginTop: 15,
    padding: 12,
    width: '100%',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
  },

  feedSection: { padding: 60 },

  feedTitle: { fontSize: 26, marginBottom: 20 },

  feedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
    gap: 20,
  },

  postCard: {
    background: '#111',
    padding: 15,
    borderRadius: 12,
  },

  postImage: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },

  footer: {
    marginTop: 60,
    padding: 20,
    borderTop: '1px solid #222',
    display: 'flex',
    justifyContent: 'space-between',
  },

  footerLinks: {
    display: 'flex',
    gap: 20,
  },
};