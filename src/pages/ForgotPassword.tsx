import { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // =====================
  // SEND OTP
  // =====================
  const sendOtp = async () => {
    if (!email) return alert('Enter your email ❌');

    try {
      setLoading(true);

      await axios.post('http://localhost:3000/auth/send-otp', { email });

      alert('OTP sent 👽📩');
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || 'Error ❌');
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // VERIFY OTP
  // =====================
  const verifyOtp = async () => {
    if (!code) return alert('Enter OTP ❌');

    try {
      setLoading(true);

      await axios.post('http://localhost:3000/auth/verify-otp', {
        email,
        code,
      });

      alert('OTP verified ✅');
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid OTP ❌');
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // RESET PASSWORD
  // =====================
  const resetPassword = async () => {
    if (!password || !confirm) {
      return alert('Fill all fields ❌');
    }

    if (password !== confirm) {
      return alert('Passwords do not match ❌');
    }

    try {
      setLoading(true);

      await axios.post('http://localhost:3000/auth/reset-password', {
        email,
        code,
        password,
      });

      alert('Password updated 🚀');
      window.location.href = '/login';
    } catch (err) {
      alert(err.response?.data?.message || 'Failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>👽 Reset Access</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button style={styles.button} onClick={sendOtp}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              style={styles.input}
              placeholder="Enter OTP code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <button style={styles.button} onClick={verifyOtp}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input
              style={styles.input}
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button style={styles.button} onClick={resetPassword}>
              {loading ? 'Saving...' : 'Update Password'}
            </button>
          </>
        )}

      </div>
    </div>
  );
}

// =====================
// 🎨 ALIEN UI STYLE
// =====================
const styles = {
  container: {
    height: '100vh',
    background: 'radial-gradient(circle at top, #0a0a0a, #000)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: 320,
    padding: 30,
    borderRadius: 16,
    background: 'linear-gradient(145deg, #0f0f0f, #050505)',
    border: '1px solid #7c3aed',
    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  title: {
    color: '#ff003c',
    textAlign: 'center',
    marginBottom: 10,
  },

  input: {
    padding: 12,
    borderRadius: 8,
    border: '1px solid #222',
    background: '#000',
    color: '#fff',
    outline: 'none',
  },

  button: {
    padding: 12,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(255,0,60,0.4)',
  },
};