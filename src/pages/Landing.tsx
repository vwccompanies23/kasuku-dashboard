import {
  useState,
  useEffect,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import { api } from '../api';

import logoImg
from '../assets/kasuku-logo.png';

import translations
from '../translations';

import {
  useLanguage,
} from '../LanguageContext';

export default function Landing() {

  //////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////

  const [billing, setBilling] =
    useState<'monthly' | 'yearly'>(
      'monthly'
    );

  const [posts, setPosts] =
    useState<any[]>([]);

  const [selectedCard, setSelectedCard] =
    useState<string | null>(null);

  const [pricing, setPricing] =
    useState<any>(null);

  const [currency, setCurrency] =
    useState(
      localStorage.getItem(
        'currency'
      ) || 'USD'
    );

  //////////////////////////////////////////////////
  // LANGUAGE
  //////////////////////////////////////////////////

  const {
    lang,
    changeLang,
  } = useLanguage();

  const t =
    translations?.[lang]
    || translations.en;

  //////////////////////////////////////////////////
  // NAVIGATION
  //////////////////////////////////////////////////

  const navigate =
    useNavigate();

  //////////////////////////////////////////////////
  // POSTS
  //////////////////////////////////////////////////

  useEffect(() => {

    const fetchPosts =
      async () => {

      try {

        const res =
          await api.get(
            `/posts?lang=${lang}`
          );

        setPosts(
          res.data || []
        );

      } catch (err) {

        console.error(
          'Posts error:',
          err
        );

      }
    };

    fetchPosts();

  }, [lang]);

  //////////////////////////////////////////////////
  // SAVE CURRENCY
  //////////////////////////////////////////////////

  useEffect(() => {

    localStorage.setItem(
      'currency',
      currency
    );

  }, [currency]);

  //////////////////////////////////////////////////
  // LOAD PRICING
  //////////////////////////////////////////////////

  useEffect(() => {

    const loadPricing =
      async () => {

      try {

        const res =
          await api.get(
            '/admin/subscriptions'
          );

        const plans =
          res.data || [];

          console.log('🔥 PRICING FROM BACKEND:', plans);

        const formatted = {

  soloMonthly:
    plans.find(
      (p: any) =>
        p.name === 'Solo Artist'
    )?.monthlyPrice || 1.75,

  soloYearly:
    plans.find(
      (p: any) =>
        p.name === 'Solo Artist'
    )?.yearlyPrice || 20.99,

  artistsMonthly:
    plans.find(
      (p: any) =>
        p.name === 'Artists'
    )?.monthlyPrice || 2.08,

  artistsYearly:
    plans.find(
      (p: any) =>
        p.name === 'Artists'
    )?.yearlyPrice || 24.99,

  proMonthly:
    plans.find(
      (p: any) =>
        p.name === 'Pro'
    )?.monthlyPrice || 5.08,

  proYearly:
    plans.find(
      (p: any) =>
        p.name === 'Pro'
    )?.yearlyPrice || 60.99,
};

console.log('🔥 FORMATTED PRICING:', formatted);
        setPricing(
          formatted
        );

      } catch (err) {

        console.error(
          'Pricing error:',
          err
        );

      }
    };

    loadPricing();

  }, []);

  //////////////////////////////////////////////////
  // CONVERT PRICE
  //////////////////////////////////////////////////

  const convertPrice = (
    usd: number
  ) => {

    if (currency === 'USD') {
      return `$${usd}`;
    }

    const rate = 2800;

    return `${(
      usd * rate
    ).toLocaleString()} FC`;
  };

  //////////////////////////////////////////////////
  // SCROLL
  //////////////////////////////////////////////////

  const scrollTo = (
    id: string
  ) => {

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  //////////////////////////////////////////////////
  // PLAN FLOW FIXED
  //////////////////////////////////////////////////

  const handlePlanSelect = (
    planName: string
  ) => {

    //////////////////////////////////////////////////
    // SAVE PLAN
    //////////////////////////////////////////////////

    localStorage.setItem(
      'selectedPlan',
      planName
    );

    //////////////////////////////////////////////////
    // SAVE BILLING
    //////////////////////////////////////////////////

    localStorage.setItem(
      'selectedBilling',
      billing
    );

    //////////////////////////////////////////////////
    // CHECK TOKEN
    //////////////////////////////////////////////////

    const token =
      localStorage.getItem(
        'token'
      );

    //////////////////////////////////////////////////
    // NOT LOGGED IN
    //////////////////////////////////////////////////

    if (!token) {

      navigate(
        `/signup?plan=${planName}&billing=${billing}`
      );

      return;
    }

    //////////////////////////////////////////////////
    // LOGGED IN
    //////////////////////////////////////////////////

    navigate(
      `/payment?plan=${planName}&billing=${billing}`
    );
  };

  //////////////////////////////////////////////////
  // CARD STYLE
  //////////////////////////////////////////////////

  const getCardStyle = (
    type: string,
    featured = false
  ) => {

    const active =
      selectedCard === type;

    return {

      width: '100%',

      maxWidth:
        featured
          ? 340
          : 320,

      minHeight: 520,

      padding: 28,

      borderRadius: 24,

      cursor: 'pointer',

      position: 'relative' as const,

      overflow: 'hidden' as const,

      transition:
        'all 0.35s ease',

      background: active
        ? 'linear-gradient(135deg, rgba(255,0,60,0.18), rgba(124,58,237,0.18))'
        : 'rgba(10,10,10,0.95)',

      border:
        '1px solid rgba(255,255,255,0.08)',

      boxShadow: active
        ? '0 0 30px rgba(255,0,60,0.4), 0 0 60px rgba(124,58,237,0.3)'
        : '0 0 0 transparent',

      transform: active
        ? 'translateY(-10px)'
        : 'translateY(0)',

      backdropFilter:
        'blur(18px)',

      boxSizing:
        'border-box' as const,
    };
  };

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////

  return (

    <div style={styles.container}>

      {/* NAVBAR */}

      <div style={styles.navbar}>

        <div style={styles.logoWrap}>

          <img
            src={logoImg}
            alt="Kasuku"
            style={styles.logoImg}
          />

          <span style={styles.logoText}>
            KASUKU
          </span>

        </div>

        <div style={styles.navRight}>

          {/* LANGUAGE */}

          <select
            value={lang}
            onChange={(e) => {

              const selected =
                e.target.value;

              changeLang(
                selected
              );

              localStorage.setItem(
                'lang',
                selected
              );
            }}
            style={styles.select}
          >
            <option value="en">
              EN 🇺🇸
            </option>

            <option value="fr">
              FR 🇫🇷
            </option>

            <option value="ksw">
              Kiswahili 🇨🇩
            </option>

            <option value="ar">
              العربية 🇸🇦
            </option>

            <option value="rn">
              Kirundi 🇧🇮
            </option>

            <option value="lg">
              Luganda 🇺🇬
            </option>

          </select>

          {/* CURRENCY */}

          <select
            value={currency}
            onChange={(e) =>
              setCurrency(
                e.target.value
              )
            }
            style={styles.select}
          >
            <option value="USD">
              USD $
            </option>

            <option value="CDF">
              CDF 🇨🇩
            </option>

          </select>

        </div>

      </div>

      {/* HERO */}

      <section style={styles.hero}>

        <h1 style={styles.heroTitle}>

          <div>
            {t.distribute}
          </div>

          <div style={styles.gradient}>
            {t.universe}
          </div>

        </h1>

        <p style={styles.heroSub}>
          Spotify, Apple Music,
          YouTube & more —
          all in one place.
        </p>

        <div style={styles.heroBtns}>

          <button
            onClick={() =>
              navigate('/signup')
            }
            style={styles.primaryBtn}
          >
            {t.getStarted}
          </button>

          <button
            onClick={() =>
              scrollTo(
                'pricing'
              )
            }
            style={styles.secondaryBtn}
          >
            {t.viewPricing}
          </button>

        </div>

      </section>

      {/* PRICING */}

      <section
        style={styles.pricing}
        id="pricing"
      >

        <div style={styles.toggleWrap}>

          <div
            style={{
              ...styles.slider,
              left:
                billing ===
                'monthly'
                  ? '0%'
                  : '50%',
            }}
          />

          <button
            onClick={() =>
              setBilling(
                'monthly'
              )
            }
            style={styles.toggleText}
          >
            {t.monthly || 'Monthly'}
          </button>

          <button
            onClick={() =>
              setBilling(
                'yearly'
              )
            }
            style={styles.toggleText}
          >
            {t.yearly || 'Yearly'}
          </button>

        </div>

        <div style={styles.cards}>

          {/* SOLO */}

          <div
            style={getCardStyle(
              'solo'
            )}
            onMouseEnter={() =>
              setSelectedCard(
                'solo'
              )
            }
          >

            <div style={styles.icon}>
              🎤
            </div>

            <h3>
              {t.soloArtist
                || 'Solo Artist'}
            </h3>

            <p style={styles.sub}>
              {t.soloDesc
                || 'Perfect for independent artists'}
            </p>

            <h2 style={styles.price}>

              {convertPrice(
                billing ===
                'monthly'
                  ? pricing?.soloMonthly
                  : pricing?.soloYearly
              )}

            </h2>

            <p style={styles.month}>
              {billing ===
              'monthly'
                ? '/month'
                : '/year'}
            </p>

            <ul style={styles.list}>
              <li>
                ✔ 1 Artist Profile
              </li>

              <li>
                ✔ Unlimited Releases
              </li>

              <li>
                ✔ All Platforms
              </li>

              <li>
                ✔ Basic Analytics
              </li>

            </ul>

            <button
              style={styles.cardBtn}
              onClick={() =>
                handlePlanSelect(
                  'solo'
                )
              }
            >
              {t.getStarted}
            </button>

          </div>

          {/* ARTISTS */}

          <div
            style={getCardStyle(
              'artists',
              true
            )}
            onMouseEnter={() =>
              setSelectedCard(
                'artists'
              )
            }
          >

            <div style={styles.badge}>
              {t.popular
                || 'Most Popular'}
            </div>

            <div style={styles.icon}>
              🎸
            </div>

            <h3>
              Artists
            </h3>

            <p style={styles.sub}>
              {t.bandDesc
                || 'For bands and duos'}
            </p>

            <h2 style={styles.price}>

              {convertPrice(
                billing ===
                'monthly'
                  ? pricing?.artistsMonthly
                  : pricing?.artistsYearly
              )}

            </h2>

            <p style={styles.month}>
              {billing ===
              'monthly'
                ? '/month'
                : '/year'}
            </p>

            <ul style={styles.list}>

              <li>
                ✔ 2 Artist Profiles
              </li>

              <li>
                ✔ Unlimited Releases
              </li>

              <li>
                ✔ Advanced Analytics
              </li>

              <li>
                ✔ Priority Support
              </li>

            </ul>

            <button
              style={styles.ctaBig}
              onClick={() =>
                handlePlanSelect(
                  'artists'
                )
              }
            >
              {t.getStarted}
            </button>

          </div>

          {/* PRO */}

          <div
            style={getCardStyle(
              'pro'
            )}
            onMouseEnter={() =>
              setSelectedCard(
                'pro'
              )
            }
          >

            <div style={styles.icon}>
              🏢
            </div>

            <h3>
              Pro
            </h3>

            <p style={styles.sub}>
              {t.proDesc
                || 'For labels & professionals'}
            </p>

            <h2 style={styles.price}>

              {convertPrice(
                billing ===
                'monthly'
                  ? pricing?.proMonthly
                  : pricing?.proYearly
              )}

            </h2>

            <p style={styles.month}>
              {billing ===
              'monthly'
                ? '/month'
                : '/year'}
            </p>

            <ul style={styles.list}>

              <li>
                ✔ 5+ Artist Profiles
              </li>

              <li>
                ✔ Premium Analytics
              </li>

              <li>
                ✔ Dedicated Manager
              </li>

            </ul>

            <button
              style={styles.cardBtn}
              onClick={() =>
                handlePlanSelect(
                  'pro'
                )
              }
            >
              {t.getStarted}
            </button>

          </div>

        </div>

      </section>

      {/* POSTS */}

      <section style={styles.feedSection}>

        <h2 style={styles.feedTitle}>
          🔥 {t.latestUpdates || 'Latest Updates'}
        </h2>

        <div style={styles.feedGrid}>

          {posts.map((p: any) => (

            <div
              key={p.id}
              style={styles.postCard}
            >

              {p.image && (

                <img
                  src={p.image}
                  alt=""
                  style={styles.postImageSmall}
                />

              )}

              <div style={styles.postContent}>

                <p style={styles.postText}>
                  {p.text}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}

      <footer style={styles.footer}>

        <p style={styles.footerText}>
          © 2026 Kasuku
        </p>

       <div style={styles.footerLinks}>

  <span
    onClick={() => navigate('/terms')}
    style={styles.footerLink}
  >
    {t.terms || 'Terms'}
  </span>

  <span
    onClick={() => navigate('/privacy')}
    style={styles.footerLink}
  >
    {t.privacy || 'Privacy'}
  </span>

  <span
    onClick={() => navigate('/help')}
    style={styles.footerLink}
  >
    {t.help || 'Help'}
  </span>

  <span
    onClick={() => navigate('/dmca')}
    style={styles.footerLink}
  >
    DMCA
  </span>

  <span
    onClick={() => navigate('/refund-policy')}
    style={styles.footerLink}
  >
    Refund Policy
  </span>

  <span
    onClick={() => navigate('/community-guidelines')}
    style={styles.footerLink}
  >
    Community
  </span>

  <span
    onClick={() => navigate('/cookie-policy')}
    style={styles.footerLink}
  >
    Cookies
  </span>

  <span
    onClick={() => navigate('/content-rules')}
    style={styles.footerLink}
  >
    Content Rules
  </span>

  <span
    onClick={() => navigate('/copyright-claim')}
    style={styles.footerLink}
  >
    Copyright Claim
  </span>

  <span
    onClick={() => navigate('/about')}
    style={styles.footerLink}
  >
    About Kasuku
  </span>

</div>

      </footer>

    </div>
  );
}

//////////////////////////////////////////////////
// STYLES
//////////////////////////////////////////////////

const styles: any = {

  container: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, #1a002b, #020617, #000)',
    color: '#fff',
    overflowX: 'hidden',
  },

  navbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    padding: '20px 24px',
    boxSizing: 'border-box',
  },

  navRight: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },

  select: {
    background: '#111',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: 10,
    padding: '10px 12px',
    outline: 'none',
  },

  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  logoImg: {
    width: 70,
    objectFit: 'contain',
  },

  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  hero: {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    textAlign: 'center',
    padding: '80px 20px 40px',
    boxSizing: 'border-box',
  },

  heroTitle: {
    fontSize:
      'clamp(42px, 8vw, 82px)',
    lineHeight: 1.1,
    fontWeight: 'bold',
  },

  gradient: {
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  heroSub: {
    color: '#aaa',
    fontSize:
      'clamp(15px, 2vw, 20px)',
    maxWidth: 700,
    margin:
      '25px auto 0',
    lineHeight: 1.7,
  },

  heroBtns: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },

  primaryBtn: {
    padding: '14px 26px',
    borderRadius: 14,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 16,
  },

  secondaryBtn: {
    padding: '14px 26px',
    borderRadius: 14,
    border:
      '1px solid rgba(255,255,255,0.12)',
    background: '#111',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 16,
  },

  pricing: {
    padding: '60px 20px',
  },

  toggleWrap: {
    position: 'relative',
    width: 240,
    margin: '0 auto 50px',
    background: '#111',
    borderRadius: 20,
    display: 'flex',
    overflow: 'hidden',
  },

  slider: {
    position: 'absolute',
    top: 0,
    width: '50%',
    height: '100%',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    transition: '0.3s',
  },

  toggleText: {
    flex: 1,
    padding: 12,
    background: 'transparent',
    border: 'none',
    color: '#fff',
    zIndex: 2,
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  cards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    gap: 24,
  },

  icon: {
    fontSize: 42,
    marginBottom: 10,
  },

  badge: {
    position: 'absolute',
    top: 14,
    right: 14,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    padding: '6px 12px',
    borderRadius: 30,
    fontSize: 12,
    fontWeight: 'bold',
  },

  sub: {
    color: '#aaa',
    marginTop: 10,
    lineHeight: 1.6,
  },

  price: {
    marginTop: 24,
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ff003c',
  },

  month: {
    color: '#999',
    marginTop: 6,
  },

  list: {
    marginTop: 24,
    lineHeight: 2,
    color: '#ddd',
    paddingLeft: 18,
  },

  cardBtn: {
    marginTop: 24,
    width: '100%',
    padding: 14,
    borderRadius: 14,
    border: 'none',
    background:
      'linear-gradient(90deg,#7c3aed,#ff003c)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 16,
  },

  ctaBig: {
    marginTop: 24,
    width: '100%',
    padding: 14,
    borderRadius: 14,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 16,
  },

  feedSection: {
    padding: '20px 20px 80px',
  },

  feedTitle: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: 'center',
  },

  feedGrid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(280px,1fr))',
    gap: 20,
  },

  postCard: {
    background:
      'rgba(20,20,20,0.95)',
    borderRadius: 18,
    overflow: 'hidden',
    border:
      '1px solid rgba(255,255,255,0.08)',
  },

  postImageSmall: {
    width: '100%',
    height: 220,
    objectFit: 'cover',
  },

  postContent: {
    padding: 18,
  },

  postText: {
    color: '#ddd',
    lineHeight: 1.7,
    fontSize: 15,
  },

  footer: {
    borderTop:
      '1px solid rgba(255,255,255,0.08)',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    textAlign: 'center',
  },

  footerText: {
    color: '#777',
  },

  footerLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },

  footerLink: {
    color: '#aaa',
    cursor: 'pointer',
    transition: '0.2s',
  },

};