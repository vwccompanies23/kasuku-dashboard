import { useState, useEffect } from 'react';
import { api } from '../api';

export default function Pricing() {
  const [billing, setBilling] =
    useState<'monthly' | 'yearly'>(
      'yearly',
    );

  const [currency, setCurrency] =
    useState<'USD' | 'CDF'>(
      localStorage.getItem('currency') as
        | 'USD'
        | 'CDF' || 'USD',
    );

  const [pricing, setPricing] =
    useState<any>(null);

  const [loadingPlan, setLoadingPlan] =
    useState<string | null>(null);

  const usdToCdf = 2850;

  useEffect(() => {
    localStorage.setItem(
      'currency',
      currency,
    );
  }, [currency]);

  // 🔥 LOAD PRICING FROM BACKEND
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const res = await api.get(
          '/admin/subscriptions',
        );

       const plans = res.data || [];
       console.log(plans);

const formatted = {

  soloMonthly:
    plans.find(
      (p: any) =>
        p.name ===
        'Solo Artist'
    )?.monthlyPrice || 1.75,

  soloYearly:
    plans.find(
      (p: any) =>
        p.name ===
        'Solo Artist'
    )?.yearlyPrice || 20.99,

  artistsMonthly:
    plans.find(
      (p: any) =>
        p.name ===
        'Artists'
    )?.monthlyPrice || 2.08,

  artistsYearly:
    plans.find(
      (p: any) =>
        p.name ===
        'Artists'
    )?.yearlyPrice || 24.99,

  proMonthly:
    plans.find(
      (p: any) =>
        p.name ===
        'Pro'
    )?.monthlyPrice || 5.08,

  proYearly:
    plans.find(
      (p: any) =>
        p.name ===
        'Pro'
    )?.yearlyPrice || 60.99,
};

setPricing(formatted);
      } catch (err) {
        console.error(
          'Pricing load error:',
          err,
        );
      }
    };

    loadPricing();
  }, []);

  const formatPrice = (
    amount: number,
  ) => {
    if (currency === 'CDF') {
      return new Intl.NumberFormat(
        'fr-CD',
        {
          style: 'currency',
          currency: 'CDF',
          maximumFractionDigits: 0,
        },
      ).format(amount * usdToCdf);
    }

    return `$${amount}`;
  };

  const subscribe = async (
    plan: string,
    artistCount: number = 1,
  ) => {
    try {
      setLoadingPlan(plan);

      const res = await api.post(
        '/payments/subscribe',
        {
          plan,
          billing,
          artistCount,
        },
      );

      const url = res?.data?.url;

      if (!url) {
        alert('Stripe URL missing');
        return;
      }

      window.location.href = url;

    } catch (err: any) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          'Failed to start subscription',
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  const getPrice = (
    monthly: number,
    yearly: number,
  ) => {
    return formatPrice(
      billing === 'monthly'
        ? monthly
        : yearly,
    );
  };

  return (
    <div style={styles.page}>
      {/* GLOW */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            A Plan for Everyone
          </h1>

          <p style={styles.subtitle}>
            Distribute your music
            globally with Kasuku
          </p>

          {/* TOGGLE */}
          <div style={styles.toggleWrap}>
            <div
              style={{
                ...styles.slider,
                left:
                  billing === 'monthly'
                    ? '0%'
                    : '50%',
              }}
            />

            <button
              onClick={() =>
                setBilling('monthly')
              }
              style={styles.toggleText}
            >
              Monthly
            </button>

            <button
              onClick={() =>
                setBilling('yearly')
              }
              style={styles.toggleText}
            >
              Yearly
            </button>
          </div>

          {/* CURRENCY */}
          <div style={styles.currencyWrap}>
            <button
              onClick={() =>
                setCurrency('USD')
              }
              style={{
                ...styles.currencyBtn,
                ...(currency === 'USD'
                  ? styles.activeCurrency
                  : {}),
              }}
            >
              🇺🇸 USD
            </button>

            <button
              onClick={() =>
                setCurrency('CDF')
              }
              style={{
                ...styles.currencyBtn,
                ...(currency === 'CDF'
                  ? styles.activeCurrency
                  : {}),
              }}
            >
              🇨🇩 CDF
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div style={styles.cards}>
          {/* SOLO */}
          <div
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                'translateY(-14px) scale(1.04)';
              e.currentTarget.style.boxShadow =
                '0 0 40px rgba(255,0,80,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                'translateY(0px)';
              e.currentTarget.style.boxShadow =
                'none';
            }}
          >
            <div style={styles.glowBorder} />

            <div style={styles.icon}>
              🎤
            </div>

            <h3>Solo Artist</h3>

            <p style={styles.sub}>
              Perfect for independent
              artists
            </p>

            <h2 style={styles.price}>
              {getPrice(
                pricing?.soloMonthly ||
                  1.75,
                pricing?.soloYearly ||
                  20.99,
              )}

              <span style={styles.month}>
                /
                {billing ===
                'monthly'
                  ? 'month'
                  : 'year'}
              </span>
            </h2>

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
                subscribe('solo')
              }
            >
              {loadingPlan === 'solo'
                ? 'Loading...'
                : 'Get Started'}
            </button>
          </div>

          {/* ARTISTS */}
          <div
            style={
              styles.featuredCard
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                'translateY(-18px) scale(1.06)';
              e.currentTarget.style.boxShadow =
                '0 0 60px rgba(124,58,237,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                'translateY(0px)';
              e.currentTarget.style.boxShadow =
                '0 0 30px rgba(124,58,237,0.25)';
            }}
          >
            <div style={styles.glowBorder} />

            <div style={styles.badge}>
              Most Popular
            </div>

            <div style={styles.icon}>
              🎸
            </div>

            <h3>Artists</h3>

            <p style={styles.sub}>
              For bands and duos
            </p>

            <h2 style={styles.price}>
              {getPrice(
                pricing?.artistsMonthly ||
                  2.08,
                pricing?.artistsYearly ||
                  24.99,
              )}

              <span style={styles.month}>
                /
                {billing ===
                'monthly'
                  ? 'month'
                  : 'year'}
              </span>
            </h2>

            <ul style={styles.list}>
              <li>
                ✔ 2 Artist Profiles
              </li>
              <li>
                ✔ Unlimited Releases
              </li>
              <li>
                ✔ All Platforms
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
                subscribe(
                  'artists',
                  2,
                )
              }
            >
              {loadingPlan ===
              'artists'
                ? 'Loading...'
                : 'Get Started'}
            </button>
          </div>

          {/* PRO */}
          <div
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                'translateY(-14px) scale(1.04)';
              e.currentTarget.style.boxShadow =
                '0 0 40px rgba(255,0,80,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                'translateY(0px)';
              e.currentTarget.style.boxShadow =
                'none';
            }}
          >
            <div style={styles.glowBorder} />

            <div style={styles.icon}>
              🏢
            </div>

            <h3>Pro</h3>

            <p style={styles.sub}>
              For professionals &
              labels
            </p>

            <h2 style={styles.price}>
              {getPrice(
                pricing?.proMonthly ||
                  5.08,
                pricing?.proYearly ||
                  60.99,
              )}
              +

              <span style={styles.month}>
                /
                {billing ===
                'monthly'
                  ? 'month'
                  : 'year'}
              </span>
            </h2>

            <ul style={styles.list}>
              <li>
                ✔ 5+ Artist Profiles
              </li>
              <li>
                ✔ Unlimited Releases
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
                subscribe('pro', 5)
              }
            >
              {loadingPlan === 'pro'
                ? 'Loading...'
                : 'Get Started'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, #1a002b, #020617, #000)',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    padding: '80px 20px',
  },

  bgGlow1: {
    position: 'absolute',
    width: 500,
    height: 500,
    background:
      'rgba(124,58,237,0.18)',
    borderRadius: '50%',
    filter: 'blur(120px)',
    top: -150,
    left: -100,
  },

  bgGlow2: {
    position: 'absolute',
    width: 500,
    height: 500,
    background:
      'rgba(255,0,80,0.15)',
    borderRadius: '50%',
    filter: 'blur(120px)',
    bottom: -200,
    right: -100,
  },

  container: {
    maxWidth: 1400,
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },

  header: {
    textAlign: 'center',
    marginBottom: 60,
  },

  title: {
    fontSize: 56,
    fontWeight: 800,
  },

  subtitle: {
    color: '#aaa',
    marginTop: 12,
    marginBottom: 30,
    fontSize: 18,
  },

  toggleWrap: {
    position: 'relative',
    width: 220,
    margin: '0 auto',
    background: '#111',
    borderRadius: 20,
    display: 'flex',
    overflow: 'hidden',
  },

  slider: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    borderRadius: 20,
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
    fontWeight: 700,
  },

  currencyWrap: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
  },

  currencyBtn: {
    padding: '10px 18px',
    borderRadius: 12,
    border: '1px solid #333',
    background: '#111',
    color: '#aaa',
    cursor: 'pointer',
  },

  activeCurrency: {
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
  },

  cards: {
    display: 'flex',
    justifyContent: 'center',
    gap: 30,
    flexWrap: 'wrap',
  },

  card: {
    width: 300,
    padding: 25,
    borderRadius: 18,
    position: 'relative',
    overflow: 'hidden',
    transition: '0.35s',
    background: '#0a0a0a',
    border:
      '1px solid rgba(255,255,255,0.08)',
  },

  featuredCard: {
    width: 320,
    padding: 28,
    borderRadius: 18,
    position: 'relative',
    overflow: 'hidden',
    transition: '0.35s',
    background:
      'linear-gradient(135deg, rgba(255,0,60,0.15), rgba(124,58,237,0.18))',
    border:
      '1px solid rgba(255,255,255,0.08)',
    boxShadow:
      '0 0 30px rgba(124,58,237,0.25)',
  },

  glowBorder: {
    position: 'absolute',
    inset: 0,
    borderRadius: 18,
    padding: 1,
    background:
      'linear-gradient(120deg,#ff003c,#7c3aed,#ff003c)',
    WebkitMask:
      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    opacity: 0.5,
    pointerEvents: 'none',
  },

  badge: {
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    padding: '6px 12px',
    borderRadius: 999,
    fontSize: 12,
    display: 'inline-block',
    marginBottom: 15,
  },

  icon: {
    fontSize: 30,
    marginBottom: 10,
  },

  sub: {
    color: '#aaa',
    marginBottom: 20,
  },

  price: {
    fontSize: 48,
    color: '#ff2d7a',
    marginBottom: 10,
    fontWeight: 800,
  },

  month: {
    fontSize: 16,
    color: '#ccc',
  },

  list: {
    lineHeight: 2,
    marginBottom: 25,
  },

  cardBtn: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    border: 'none',
    background:
      'linear-gradient(90deg,#7c3aed,#ff003c)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700,
  },

  ctaBig: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700,
  },
};