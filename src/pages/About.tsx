import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import youtubeIcon from '../assets/icons/Youtube.png';
import facebookIcon from '../assets/icons/FaceBook.png';
import instagramIcon from '../assets/icons/Instagram.png';
import xIcon from '../assets/icons/X.png';
import logo from '../assets/kasuku-logo.png';

export default function About() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const { lang } = useLanguage(); // ✅ CLEAN

  useEffect(() => {
    setTimeout(() => setVisible(true), 150);
  }, []);

  // 🌍 TRANSLATIONS (FULL CONTENT)
  const content = translations[lang] || translations.en;

  return (
    <div style={styles.container}>

      {/* BACK */}
      <button onClick={() => navigate('/')} style={styles.backBtn}>
        ← Back
      </button>

      {/* HERO */}
      <section
        style={{
          ...styles.hero,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        <div style={styles.bgAnimation} />

        <img src={logo} style={styles.logo} />

        <h1 style={styles.title}>KASUKU</h1>

        <p style={styles.tagline}>{content.tagline}</p>
        <p style={styles.sub}>{content.sub}</p>
      </section>

      {/* ABOUT */}
      <section style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>{content.aboutTitle}</h2>
        {content.about.map((t, i) => (
          <p key={i} style={styles.text}>{t}</p>
        ))}
      </section>

      {/* EXPERIENCE */}
      <section style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>{content.experienceTitle}</h2>

        <ul style={styles.list}>
          {content.experience.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* VISION */}
      <section style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>{content.visionTitle}</h2>

        {content.vision.map((t, i) => (
          <p key={i} style={styles.text}>{t}</p>
        ))}

        <p style={styles.highlight}>{content.visionHighlight}</p>
      </section>

      {/* WHY */}
      <section style={styles.sectionCard}>
        <h2 style={styles.sectionTitle}>{content.whyTitle}</h2>

        <ul style={styles.list}>
          {content.why.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p style={styles.text}>{content.whyEnd}</p>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>{content.cta}</h2>

        <button
          onClick={() => navigate('/signup')}
          style={styles.ctaBtn}
        >
          Start Your Journey
        </button>
      </section>

      {/* 🌐 SOCIAL */}
      <section style={styles.socialSection}>
        <h3 style={styles.socialTitle}>{content.follow}</h3>

        <div style={styles.socialIcons}>
          <a href="https://www.youtube.com/@Kasukudistributor" target="_blank">
            <img src={youtubeIcon} style={styles.socialIcon} />
          </a>

          <a href="https://www.facebook.com/profile.php?id=61589769474951" target="_blank">
            <img src={facebookIcon} style={styles.socialIcon} />
          </a>

          <a href="https://www.instagram.com/kasuku_distributor/" target="_blank">
            <img src={instagramIcon} style={styles.socialIcon} />
          </a>

          <a href="https://x.com/kasuku_platform" target="_blank">
            <img src={xIcon} style={styles.socialIcon} />
          </a>
        </div>
      </section>

    </div>
  );
}

//
// 🌍 TRANSLATIONS
//
const translations = {
  en: {
    tagline: 'Music Distribution. Reimagined.',
    sub: 'Where artistry meets precision, and culture meets global reach.',

    aboutTitle: 'About Kasuku',
    about: [
      'Kasuku Music Distribution is a premium platform redefining how music is released, experienced, and valued.',
      'Established under the vision of VWC, a Congolese company founded in 2019 by Patrice (Heripoza), Kasuku officially launched on April 27, 2026.',
      'Kasuku exists for creators who demand more than access.',
      'It is built for those who seek ownership, reach, and excellence.',
    ],

    experienceTitle: 'The Experience',
    experience: [
      'Release music globally',
      'Unified audio & video experience',
      'Direct connection with audience',
      'Structured revenue system',
      'Full creative ownership',
    ],

    visionTitle: 'Our Vision',
    vision: [
      'African creativity at the center of global culture.',
      'Connecting local talent to global recognition.',
    ],
    visionHighlight: 'This is cultural positioning.',

    whyTitle: 'Why Kasuku',
    why: [
      'Artist-first system',
      'Direct creator-to-fan connection',
      'CDF & USDC support',
      'Built for long-term vision',
    ],
    whyEnd: 'We define direction.',

    cta: 'This is where artistry becomes legacy.',
    follow: 'Follow Kasuku',
  },

  fr: {
    tagline: 'Distribution musicale réinventée.',
    sub: 'Là où l’art rencontre la précision.',

    aboutTitle: 'À propos de Kasuku',
    about: [
      'Kasuku redéfinit la distribution musicale.',
      'Fondé par VWC en 2019.',
      'Créé pour les artistes ambitieux.',
      'Conçu pour l’excellence.',
    ],

    experienceTitle: 'Expérience',
    experience: [
      'Distribution mondiale',
      'Audio + vidéo',
      'Connexion directe',
      'Monétisation',
      'Contrôle total',
    ],

    visionTitle: 'Vision',
    vision: [
      'La créativité africaine au centre.',
      'Connexion mondiale.',
    ],
    visionHighlight: 'Position culturelle.',

    whyTitle: 'Pourquoi Kasuku',
    why: [
      'Système transparent',
      'Connexion directe',
      'Support moderne',
      'Vision long terme',
    ],
    whyEnd: 'Nous définissons la direction.',

    cta: 'Ici commence votre héritage.',
    follow: 'Suivre Kasuku',
  },
};

//
// 🎨 STYLES (UNCHANGED + EXTENDED)
//
const styles = {
  container: {
    minHeight: '100vh',
    background: '#000',
    color: '#fff',
    padding: '40px 20px',
    maxWidth: 1100,
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  },

  backBtn: {
    marginBottom: 20,
    padding: '10px 16px',
    borderRadius: 10,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },

  socialIcon: {
  width: 32,
  height: 32,
  objectFit: 'contain',
},

  hero: {
    textAlign: 'center',
    padding: '100px 20px',
    position: 'relative',
    transition: '0.8s ease',
  },

  bgAnimation: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 30% 30%, #ff003c55, transparent 40%), radial-gradient(circle at 70% 60%, #7c3aed55, transparent 40%)',
    filter: 'blur(80px)',
    animation: 'moveBg 8s infinite alternate',
  },

  logo: {
    width: 120,
    marginBottom: 15,
    animation: 'float 4s infinite',
  },

  title: {
    fontSize: 64,
    fontWeight: '900',
    whiteSpace: 'nowrap',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  tagline: { fontSize: 22, color: '#aaa' },
  sub: { marginTop: 10, color: '#888' },

  sectionCard: {
    marginBottom: 40,
    padding: 25,
    borderRadius: 16,
    background: 'rgba(255,255,255,0.03)',
  },

  sectionTitle: { fontSize: 26, marginBottom: 15 },
  text: { color: '#bbb', marginBottom: 10 },
  highlight: { color: '#ff003c' },

  list: {
    paddingLeft: 20,
    lineHeight: 1.8,
  },

  cta: { textAlign: 'center', marginTop: 40 },
  ctaTitle: { fontSize: 28 },
  ctaBtn: {
    marginTop: 15,
    padding: 12,
    borderRadius: 20,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    border: 'none',
  },

  socialSection: {
    textAlign: 'center',
    marginTop: 60,
  },

  socialTitle: {
    marginBottom: 15,
    color: '#aaa',
  },

  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },

  icon: {
    fontSize: 30,
    cursor: 'pointer',
  },
};