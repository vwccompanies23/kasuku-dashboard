import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userState } from 'react';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [artist, setArtist] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const signup = async () => {
    if (password !== confirm) {
      alert('Passwords do not match ❌');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/signup', {
        email,
        password,
        artist,
      });

      alert('Account created ✅');

      // 🔥 GET REDIRECT (IMPORTANT FIX)
      const redirect = localStorage.getItem('redirectAfterLogin');

      if (redirect) {
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirect); // 👉 goes to /payment
      } else {
        navigate('/'); // fallback
      }

    } catch (err) {
      console.log('SIGNUP ERROR:', err);

      const message =
        err.response?.data?.message || 'Signup failed ❌';

      alert(message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* LOGO */}
        <h1 style={styles.logo}>🎵 KASUKU</h1>

        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>
          Start distributing your music worldwide
        </p>

        {/* INPUTS */}
        <input
          style={styles.input}
          placeholder="Artist Name"
          onChange={(e) => setArtist(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

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

        <input
          style={styles.input}
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setConfirm(e.target.value)}
        />

        {/* BUTTON */}
        <button onClick={signup} style={styles.button}>
          Create Account →
        </button>

        {/* LOGIN LINK */}
        <p style={styles.text}>
          Already have an account?
          <span style={styles.link} onClick={() => navigate('/login')}>
            {' '}Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

// 🎨 STYLES (UNCHANGED)
const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#111',
    padding: 30,
    borderRadius: 16,
    width: 380,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    border: '1px solid rgba(124, 58, 237, 0.4)',
    boxShadow: '0 0 30px rgba(124,58,237,0.3)',
  },

  logo: {
    textAlign: 'center',
    color: '#ff003c',
    marginBottom: 5,
  },

  title: {
    textAlign: 'center',
    color: '#fff',
  },

  subtitle: {
    textAlign: 'center',
    color: '#aaa',
    marginBottom: 10,
    fontSize: 14,
  },

  input: {
    padding: 12,
    borderRadius: 10,
    border: '1px solid #333',
    backgroundColor: '#000',
    color: '#fff',
  },

  button: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg, #ff003c, #7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  text: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 14,
  },

  link: {
    color: '#ff003c',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};