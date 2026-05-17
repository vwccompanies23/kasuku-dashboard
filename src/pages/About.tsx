import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';

import youtubeIcon from '../assets/icons/youtube.png';
import facebookIcon from '../assets/icons/facebook.png';
import instagramIcon from '../assets/icons/Instagram.png';
import xIcon from '../assets/icons/X.png';
import logo from '../assets/kasuku-logo.png';

export default function About() {

  const navigate = useNavigate();

  const [visible, setVisible] =
    useState(false);

  const { lang } = useLanguage();

  useEffect(() => {

    setTimeout(() => {
      setVisible(true);
    }, 150);

  }, []);

  // ✅ FALLBACK TO ENGLISH
  const content =
    translations[lang] &&
    translations[lang].about?.length > 2
      ? translations[lang]
      : translations.en;

  return (
    <div style={styles.container}>

      {/* BACK */}
      <button
        onClick={() => navigate('/')}
        style={styles.backBtn}
      >
        ← Back
      </button>

      {/* HERO */}
      <section
        style={{
          ...styles.hero,

          opacity: visible ? 1 : 0,

          transform: visible
            ? 'translateY(0)'
            : 'translateY(40px)',
        }}
      >

        <div style={styles.bgAnimation} />

        <img
          src={logo}
          style={styles.logo}
        />

        <h1 style={styles.title}>
          KASUKU
        </h1>

        <p style={styles.tagline}>
          {content.tagline}
        </p>

        <p style={styles.sub}>
          {content.sub}
        </p>

      </section>

      {/* ABOUT */}
      <section style={styles.sectionCard}>

        <h2 style={styles.sectionTitle}>
          {content.aboutTitle}
        </h2>

        {content.about.map((t, i) => (
          <p
            key={i}
            style={styles.text}
          >
            {t}
          </p>
        ))}

      </section>

      {/* EXPERIENCE */}
      <section style={styles.sectionCard}>

        <h2 style={styles.sectionTitle}>
          {content.experienceTitle}
        </h2>

        <ul style={styles.list}>
          {content.experience.map((item, i) => (
            <li key={i}>
              {item}
            </li>
          ))}
        </ul>

      </section>

      {/* VISION */}
      <section style={styles.sectionCard}>

        <h2 style={styles.sectionTitle}>
          {content.visionTitle}
        </h2>

        {content.vision.map((t, i) => (
          <p
            key={i}
            style={styles.text}
          >
            {t}
          </p>
        ))}

        <p style={styles.highlight}>
          {content.visionHighlight}
        </p>

      </section>

      {/* WHY */}
      <section style={styles.sectionCard}>

        <h2 style={styles.sectionTitle}>
          {content.whyTitle}
        </h2>

        <ul style={styles.list}>
          {content.why.map((item, i) => (
            <li key={i}>
              {item}
            </li>
          ))}
        </ul>

        <p style={styles.text}>
          {content.whyEnd}
        </p>

      </section>

      {/* CTA */}
      <section style={styles.cta}>

        <h2 style={styles.ctaTitle}>
          {content.cta}
        </h2>

        <button
          onClick={() =>
            navigate('/signup')
          }
          style={styles.ctaBtn}
        >
          Start Your Journey
        </button>

      </section>

      {/* SOCIAL */}
      <section style={styles.socialSection}>

        <h3 style={styles.socialTitle}>
          {content.follow}
        </h3>

        <div style={styles.socialIcons}>

          <a
            href="https://www.youtube.com/@Kasukudistributor"
            target="_blank"
          >
            <img
              src={youtubeIcon}
              style={styles.socialIcon}
            />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61589769474951"
            target="_blank"
          >
            <img
              src={facebookIcon}
              style={styles.socialIcon}
            />
          </a>

          <a
            href="https://www.instagram.com/kasuku_distributor/"
            target="_blank"
          >
            <img
              src={instagramIcon}
              style={styles.socialIcon}
            />
          </a>

          <a
            href="https://x.com/kasuku_platform"
            target="_blank"
          >
            <img
              src={xIcon}
              style={styles.socialIcon}
            />
          </a>

        </div>

      </section>

    </div>
  );
}

//
// 🌍 TRANSLATIONS
//
const translations: any = {

  en: {

    tagline:
      'Music Distribution. Reimagined.',

    sub:
      'Where artistry meets precision, and culture meets global reach.',

    aboutTitle:
      'About Kasuku',

    about: [

      'Kasuku Music Distribution is a premium platform redefining how music is released, experienced, and valued.',

      'Established under the vision of VWC, a Congolese company founded in 2019 by Patrice (Heripoza), Kasuku officially launched on April 27, 2026.',

      'Kasuku exists for creators who demand more than access.',

      'It is built for those who seek ownership, reach, and excellence.',

    ],

    experienceTitle:
      'The Experience',

    experience: [

      'Release music globally',

      'Unified audio & video experience',

      'Direct connection with audience',

      'Structured revenue system',

      'Full creative ownership',

    ],

    visionTitle:
      'Our Vision',

    vision: [

      'African creativity at the center of global culture.',

      'Connecting local talent to global recognition.',

    ],

    visionHighlight:
      'This is cultural positioning.',

    whyTitle:
      'Why Kasuku',

    why: [

      'Artist-first system',

      'Direct creator-to-fan connection',

      'CDF & USD support',

      'Built for long-term vision',

    ],

    whyEnd:
      'We define direction.',

    cta:
      'This is where artistry becomes legacy.',

    follow:
      'Follow Kasuku',
  },

  // 🔥 TEMPORARY FALLBACK
  fr: {},
  ar: {},
  ksw: {},
  rn: {},
  lg: {},
};

//
// 🎨 STYLES
//
const styles: any = {

  container: {

    minHeight: '100vh',

    background: '#000',

    color: '#fff',

    width: '100%',

    padding: '40px 20px',

    position: 'relative',

    overflowX: 'hidden',

    boxSizing: 'border-box',
  },

  backBtn: {

    marginBottom: 20,

    padding: '10px 16px',

    borderRadius: 10,

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    color: '#fff',

    border: 'none',

    cursor: 'pointer',
  },

  hero: {

    textAlign: 'center',

    padding:
      '100px 20px',

    position: 'relative',

    transition: '0.8s ease',
  },

  bgAnimation: {

    position: 'absolute',

    inset: 0,

    background:
      'radial-gradient(circle at 30% 30%, #ff003c55, transparent 40%), radial-gradient(circle at 70% 60%, #7c3aed55, transparent 40%)',

    filter: 'blur(80px)',
  },

  logo: {

    width:
      'clamp(90px,12vw,130px)',

    marginBottom: 15,
  },

  title: {

    fontSize:
      'clamp(42px,9vw,72px)',

    fontWeight: '900',

    textAlign: 'center',

    lineHeight: 1.05,

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    WebkitBackgroundClip:
      'text',

    WebkitTextFillColor:
      'transparent',

    wordBreak: 'break-word',
  },

  tagline: {

    fontSize:
      'clamp(18px,3vw,24px)',

    color: '#aaa',

    marginTop: 10,
  },

  sub: {

    marginTop: 10,

    color: '#888',

    fontSize:
      'clamp(15px,2vw,18px)',

    maxWidth: 900,

    marginLeft: 'auto',

    marginRight: 'auto',

    lineHeight: 1.8,
  },

  sectionCard: {

    marginBottom: 40,

    padding:
      'clamp(20px,4vw,35px)',

    borderRadius: 20,

    background:
      'rgba(255,255,255,0.03)',

    border:
      '1px solid rgba(255,255,255,0.05)',
  },

  sectionTitle: {

    fontSize:
      'clamp(24px,4vw,32px)',

    marginBottom: 15,
  },

  text: {

    color: '#bbb',

    marginBottom: 12,

    lineHeight: 1.9,

    fontSize:
      'clamp(15px,2vw,18px)',
  },

  highlight: {

    color: '#ff003c',

    marginTop: 15,

    fontWeight: 'bold',
  },

  list: {

    paddingLeft: 20,

    lineHeight: 2,

    color: '#ccc',

    fontSize:
      'clamp(15px,2vw,18px)',
  },

  cta: {

    textAlign: 'center',

    marginTop: 60,
  },

  ctaTitle: {

    fontSize:
      'clamp(28px,5vw,42px)',

    lineHeight: 1.4,
  },

  ctaBtn: {

    marginTop: 20,

    padding:
      '14px 26px',

    borderRadius: 20,

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    color: '#fff',

    border: 'none',

    fontWeight: 'bold',

    cursor: 'pointer',

    fontSize: 15,
  },

  socialSection: {

    textAlign: 'center',

    marginTop: 80,
  },

  socialTitle: {

    marginBottom: 20,

    color: '#aaa',

    fontSize: 18,
  },

  socialIcons: {

    display: 'flex',

    justifyContent: 'center',

    gap: 22,

    flexWrap: 'wrap',
  },

  socialIcon: {

    width: 34,

    height: 34,

    objectFit: 'contain',
  },
};