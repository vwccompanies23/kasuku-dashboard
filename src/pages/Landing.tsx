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

  const handlePlanSelect = (planName) => {
    const token = localStorage.getItem('token');

    localStorage.setItem('selectedPlan', planName);
    localStorage.setItem('redirectAfterLogin', '/payment');

    if (!token) navigate('/signup');
    else navigate('/payment');
  };

  const getCardStyle = (type, featured = false) => {
    const active = selectedCard === type;

    return {
      width: featured ? 320 : 300,
      padding: 25,
      borderRadius: 18,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      background: active
        ? 'linear-gradient(135deg, rgba(255,0,60,0.2), rgba(124,58,237,0.2))'
        : '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: active
        ? '0 0 30px rgba(255,0,60,0.6), 0 0 60px rgba(124,58,237,0.5)'
        : '0 0 0 transparent',
      transform: active
        ? 'translateY(-14px) scale(1.06)'
        : 'translateY(0) scale(1)',
    };
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
          <option value="en">EN 🇺🇸a</option>
          <option value="fr">FR 🇫🇷</option>
          <option value="ksw">Kishwahili drc</option>
          <option value="ar">AR 🇸🇦</option>
          <option value="rn">Kirundi 🇧🇮</option>
          <option value="lg">Luganda 🇺🇬</option>
        </select>

        <div style={styles.navLinks}>
          <span onClick={() => scrollTo('features')} style={styles.link}>Features</span>
          <span onClick={() => scrollTo('pricing')} style={styles.link}>Pricing</span>
          <a href="/login" style={styles.link}>Login</a>
          <a href="/signup" style={styles.ctaBtn}>Get Started</a>

          <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={styles.select}>
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
          <a href="/signup" style={styles.primaryBtn}>Start Now 🚀</a>
          <button onClick={() => scrollTo('pricing')} style={styles.secondaryBtn}>
            View Pricing
          </button>
        </div>
      </section>

      {/* PRICING */}
      <section style={styles.pricing} id="pricing">
        <div style={styles.cards}>
          <div style={getCardStyle('solo')} onClick={() => setSelectedCard('solo')}>
            <h3>Solo Artist</h3>
            <button style={styles.cardBtn} onClick={() => handlePlanSelect('solo')}>
              Get Started
            </button>
          </div>

          <div style={getCardStyle('artists')} onClick={() => setSelectedCard('artists')}>
            <h3>Artists</h3>
            <button style={styles.cardBtn} onClick={() => handlePlanSelect('artists')}>
              Get Started
            </button>
          </div>

          <div style={getCardStyle('pro')} onClick={() => setSelectedCard('pro')}>
            <h3>Pro</h3>
            <button style={styles.cardBtn} onClick={() => handlePlanSelect('pro')}>
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* POSTS */}
      <div style={styles.feedSection}>
        <h2 style={styles.feedTitle}>🔥 Latest Updates</h2>

        <div style={styles.feedGrid}>
          {posts.map(p => (
            <div key={p.id} style={styles.postCard}>
              {p.image && <img src={p.image} style={styles.postImageSmall} />}
              <div style={styles.postContent}>
                <p style={styles.postText}>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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

  logoWrap: { display: 'flex', alignItems: 'center', gap: 10 },
  logoImg: { height: 100 },

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
  heroTitle: { fontSize: 52 },

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

  cards: {
    display: 'flex',
    justifyContent: 'center',
    gap: 30,
    flexWrap: 'wrap',
  },

  postCard: {
    background: 'rgba(20,20,20,0.9)',
    padding: 12,
    borderRadius: 14,
    display: 'flex',
    gap: 12,
  },

  postImageSmall: {
    width: 90,
    height: 90,
    borderRadius: 12,
    objectFit: 'cover',
  },

  postContent: { flex: 1 },

  postText: { color: '#ddd' },

  feedSection: { padding: 60 },
  feedTitle: { fontSize: 26 },

  feedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
    gap: 20,
  },

  footer: {
    marginTop: 60,
    padding: 20,
    borderTop: '1px solid #222',
    display: 'flex',
    justifyContent: 'space-between',
  },
};