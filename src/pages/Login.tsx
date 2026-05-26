import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

import LanguageSwitcher from '../components/LanguageSwitcher';
import useTranslation from '../useTranslation';

import logo from '../assets/kasuku-logo.png';

export default function Login() {

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // LOGIN
  // =========================

  const login = async () => {

    if (!email || !password) {

      alert(
        t?.en?.enterLogin ||
        'Enter email and password'
      );

      return;
    }

    try {

      setLoading(true);

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const res =
        await api.post(
          '/auth/login',
          {
            email: cleanEmail,
            password,
          },
        );

      console.log(
        '✅ LOGIN:',
        res.data,
      );

      const user =
  res.data?.user || {};

const token =
  res.data?.access_token;

// ✅ OTP LOGIN FLOW
// backend may return ONLY success message

      // =========================
      // SAVE TOKEN
      // =========================

      localStorage.setItem(
        'token',
        token,
      );

      // =========================
      // SAVE USER
      // =========================

      localStorage.setItem(
        'user',
        JSON.stringify(user),
      );

      // =========================
      // SAVE USER DATA
      // =========================
      localStorage.setItem(
  'role',
  (
    user?.role || 'user'
  ).toLowerCase()
);

      localStorage.setItem(
        'userId',
        String(user?.id || ''),
      );

      localStorage.setItem(
        'artistName',
        user?.artistName || '',
      );

      localStorage.setItem(
        'plan',
        String(
          user?.plan || 0
        ),
      );

      localStorage.setItem(
        'subscriptionActive',
        String(
          user?.subscriptionActive || false
        ),
      );

      // =========================
      // PAYMENT CACHE FIX
      // =========================

      const userPlan =
        Number(user?.plan || 0);

      // ✅ USERS WITH ACCESS
      // SHOULD NEVER LOOP
      // BACK TO PAYMENT

      if (userPlan >= 1) {

        localStorage.removeItem(
          'redirectAfterLogin'
        );

        localStorage.removeItem(
          'selectedPlan'
        );

        localStorage.removeItem(
          'selectedBilling'
        );
      }

      // =========================
      // VERIFY EMAIL
      // =========================

      localStorage.setItem(
        'verifyEmail',
        cleanEmail,
      );

      // =========================
      // OTP FLOW
      // =========================

      localStorage.setItem(
        'otp_pending',
        'true',
      );

      // =========================
      // FORCE UI REFRESH
      // =========================

      window.dispatchEvent(
        new Event('storage'),
      );

      // =========================
      // VERIFY PAGE
      // =========================

    navigate('/verify');

    } catch (err: any) {

      console.error(
        '❌ LOGIN ERROR:',
        err,
      );

     const message =
  err?.response?.data?.message || '';

if (
  message
    .toLowerCase()
    .includes('wait before requesting another otp')
) {

  navigate('/verify');

  return;
}

alert(
  message ||
  t?.en?.loginFailed ||
  'Login failed ❌'
);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.container}>

      {/* TOP BAR */}

      <div style={styles.topBar}>

        <LanguageSwitcher />

      </div>

      {/* CONTENT */}

      <div style={styles.wrapper}>

        {/* LEFT */}

        <div style={styles.left}>

          <img
            src={logo}
            alt="Kasuku"
            style={styles.logo}
          />

          <h1 style={styles.title}>

            {t?.en?.signIn ||
              'Sign In to Kasuku'}

          </h1>

          <p style={styles.description}>

            {t?.en?.manageMusic ||
              'Manage your music, analytics, royalties and releases.'}

          </p>

          {/* EMAIL */}

          <input
            type="email"
            placeholder={
              t?.en?.emailPlaceholder ||
              'your.email@example.com'
            }
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={styles.input}
          />

          {/* PASSWORD */}

          <div style={styles.passwordBox}>

            <input
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder={
                t?.en?.password ||
                'Password'
              }
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={{
                ...styles.input,
                marginBottom: 0,
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={styles.eye}
            >
              {showPassword
                ? '🙈'
                : '👁️'}
            </button>

          </div>

          {/* LOGIN BUTTON */}

          <button
            onClick={login}
            style={styles.loginBtn}
            disabled={loading}
          >

            {loading
              ? (
                t?.en?.signingIn ||
                'Signing in...'
              )
              : (
                t?.en?.signIn ||
                'Sign In'
              )}

          </button>

          {/* FORGOT */}

          <p style={styles.text}>

            {t?.en?.forgotPassword ||
              'Forgot Password?'}

            <span
              style={styles.link}
              onClick={() =>
                navigate(
                  '/forgot-password'
                )
              }
            >
              {' '}
              {t?.en?.reset ||
                'Reset'}
            </span>

          </p>

          {/* SIGNUP */}

          <p style={styles.text}>

            {t?.en?.noAccount ||
              'Don’t have an account?'}

            <span
              style={styles.link}
              onClick={() =>
                navigate('/signup')
              }
            >
              {' '}
              {t?.en?.signUp ||
                'Sign up'}
            </span>

          </p>

        </div>

        {/* RIGHT */}

        <div style={styles.right}>

          <div style={styles.heroCard}>

            <h2 style={styles.welcome}>

              {t?.en?.welcomeBack ||
                'Welcome Back'}

            </h2>

            <p style={styles.subtitle}>

              {t?.en?.manageMusic ||
                'Distribute music, manage royalties, monitor analytics and grow your audience with Kasuku.'}

            </p>

            <img
              src="/band.png"
              alt="music"
              style={styles.image}
            />

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div style={styles.footer}>

        <span
          onClick={() =>
            navigate('/help')
          }
          style={styles.footerLink}
        >
          {t?.en?.help || 'Help'}
        </span>

        <span
          onClick={() =>
            navigate('/privacy')
          }
          style={styles.footerLink}
        >
          {t?.en?.privacy || 'Privacy'}
        </span>

        <span
          onClick={() =>
            navigate('/terms')
          }
          style={styles.footerLink}
        >
          {t?.en?.terms || 'Terms'}
        </span>

      </div>

    </div>
  );
}

const styles: any = {

  container: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top,#1a001f,#050510,#000)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },

  topBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },

  wrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 1400,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(320px,1fr))',
    gap: 40,
    alignItems: 'center',
  },

  left: {
    width: '100%',
    maxWidth: 450,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },

  right: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heroCard: {
    width: '100%',
    maxWidth: 550,
    padding: 40,
    borderRadius: 32,
    background:
      'rgba(255,255,255,0.05)',
    border:
      '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    textAlign: 'center',
  },

  logo: {
    width: 120,
    alignSelf: 'center',
    marginBottom: 20,
    filter:
      'drop-shadow(0 0 12px #ff003c)',
  },

  title: {
    fontSize:
      'clamp(28px,5vw,42px)',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  description: {
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 1.7,
    marginBottom: 30,
    fontSize: 15,
  },

  input: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    border:
      '1px solid rgba(255,255,255,0.08)',
    background: '#111',
    color: '#fff',
    fontSize: 15,
    outline: 'none',
    marginBottom: 16,
    boxSizing: 'border-box',
  },

  passwordBox: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },

  eye: {
    position: 'absolute',
    right: 14,
    top: 14,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: 18,
    color: '#fff',
  },

  loginBtn: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 10,
  },

  text: {
    marginTop: 20,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 1.7,
    fontSize: 14,
  },

  link: {
    color: '#ff003c',
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  welcome: {
    fontSize:
      'clamp(34px,6vw,60px)',
    marginBottom: 14,
    fontWeight: 'bold',
    background:
      'linear-gradient(90deg,#7c3aed,#ff003c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor:
      'transparent',
  },

  subtitle: {
    color: '#aaa',
    lineHeight: 1.8,
    marginBottom: 30,
    fontSize: 16,
  },

  image: {
    width: '100%',
    maxWidth: 420,
    objectFit: 'contain',
  },

  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 30,
    paddingBottom: 10,
  },

  footerLink: {
    cursor: 'pointer',
    fontWeight: 'bold',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor:
      'transparent',
    fontSize: 14,
  },

};