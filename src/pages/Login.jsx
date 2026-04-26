import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import LanguageSwitcher from '../components/LanguageSwitcher';
import useTranslation from '../useTranslation';
import logo from '../assets/kasuku-logo.png';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const token =
        res.data?.access_token ||
        res.data?.token;

      if (!token) {
        alert('No token returned ❌');
        return;
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      localStorage.setItem('token', token);

      let payload = {};
      try {
        payload = JSON.parse(atob(token.split('.')[1]));
      } catch {}

      const user = {
        userId: payload.userId,
        email: payload.email,
        artistName: payload.artistName,
        isAdmin: payload.isAdmin || false,
      };

      localStorage.setItem('user', JSON.stringify(user));

      window.location.href = '/dashboard';

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed ❌');
    }
  };

  return (
    <div style={styles.container}>

      {/* 🌍 LANGUAGE */}
      <div style={styles.topBar}>
        <LanguageSwitcher />
      </div>

      {/* MAIN */}
      <div style={styles.wrapper}>

        {/* LEFT */}
        <div style={styles.left}>

          {/* 🔥 LOGO */}
          <img src={logo} style={styles.logo} />

          <h2 style={styles.title}>Sign In to Kasuku</h2>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          {/* PASSWORD */}
          <div style={styles.passwordBox}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eye}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {/* BUTTON */}
          <button onClick={login} style={styles.loginBtn}>
            Sign In
          </button>

          {/* LINKS */}
          <p style={styles.text}>
            Forgot Password?
            <span style={styles.link} onClick={() => navigate('/forgot-password')}>
              {' '}Reset
            </span>
          </p>

          <p style={styles.text}>
            Don’t have an account?
            <span style={styles.link} onClick={() => navigate('/signup')}>
              {' '}Sign up
            </span>
          </p>

        </div>

        {/* RIGHT */}
        <div style={styles.right}>

          <h1 style={styles.welcome}>
            Welcome Back
          </h1>

          <p style={styles.subtitle}>
            Manage your music and royalties.
          </p>

          {/* 🎸 BAND IMAGE */}
          <img
            src="/band.png"
            alt="music"
            style={styles.image}
          />

        </div>

      </div>

      {/* FOOTER (WORKING LINKS) */}
      <div style={styles.footer}>
        <span onClick={() => navigate('/help')} style={styles.footerLink}>Help</span>
        <span onClick={() => navigate('/privacy')} style={styles.footerLink}>Privacy</span>
        <span onClick={() => navigate('/terms')} style={styles.footerLink}>Terms</span>
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: '#050505',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },

  topBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 20,
  },

  wrapper: {
  flex: 1,
  display: 'flex',
  alignItems: 'center',

  margin: '0 auto',
  maxWidth: '1300px',

  // 🔥 FIX: spread content instead of squeezing
  justifyContent: 'space-between',

  // 🔥 FULL WIDTH FEEL
  width: '100%',
  padding: '40px 80px',

  gap: 60,
},

  left: {
    width: 420,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  right: {
    flex: 1,
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  /* 🔥 LOGO FIX */
  logo: {
    width: 120,
    alignSelf: 'center',
    marginBottom: 10,
    filter: 'drop-shadow(0 0 10px #ff003c)',
  },

  title: {
    textAlign: 'center',
  },

  /* 🔥 PURPLE GRADIENT TEXT */
  welcome: {
    fontSize: 34,
    background: 'linear-gradient(90deg,#7c3aed,#ff003c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  container: {
  height: '100vh',
  background: 'radial-gradient(circle at top, #1a001f, #000)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
},

  subtitle: {
    marginTop: 10,
    color: '#aaa',
  },

  image: {
    marginTop: 25,
    width: '100%',
    maxWidth: 420,
    objectFit: 'contain',
  },

  input: {
    padding: 12,
    borderRadius: 10,
    border: '1px solid #333',
    background: '#111',
    color: '#fff',
  },

  passwordBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  eye: {
    position: 'absolute',
    right: 12,
    cursor: 'pointer',
  },

  loginBtn: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  text: {
    fontSize: 14,
    color: '#aaa',
  },

  link: {
    color: '#ff003c',
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  footer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 30,
    padding: 20,
  },

  footerLink: {
    cursor: 'pointer',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
  },
};