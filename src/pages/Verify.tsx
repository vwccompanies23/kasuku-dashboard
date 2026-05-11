import { useState, useEffect, useRef } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kasuku-logo.png';
import { toast } from 'react-hot-toast';

import { useLocation } from 'react-router-dom';

export default function Verify() {
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cardData = location.state?.cardData;

  const email = localStorage.getItem('verifyEmail');

  // =========================
  // 🔒 GUARD (VERY IMPORTANT)
  // =========================
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail =
      localStorage.getItem('verifyEmail');

    // 🔥 ONLY redirect if NOT coming from card flow
    if (
      storedToken &&
      storedToken !== 'undefined' &&
      storedToken !== 'null' &&
      location.state?.from !== 'card'
    ) {
      navigate('/dashboard');
      return;
    }

    if (!storedEmail) {
      navigate('/login');
    }
  }, [navigate, location.state]);

  // =========================
  // 📩 SEND OTP
  // =========================
  const sendOtp = async () => {
    if (!email) return;

    try {
      setSending(true);

      await api.post('/auth/send-otp', {
        email,
      });

      setCooldown(30);

      toast.success(
        'Verification code sent',
        {
          className: 'kasuku-toast',
          icon: '📩',
        },
      );

    } catch (err: any) {
      const msg =
        err?.response?.data?.message;

      // 🔥 Ignore cooldown error visually
      if (msg?.includes('Wait')) {

        toast.error(msg, {
          className: 'kasuku-toast',
          icon: '⚠️',
        });

      } else {
        console.error(err);

        toast.error(
          'Unable to send code. Try again.',
          {
            className: 'kasuku-toast',
            icon: '❌',
          },
        );
      }

    } finally {
      setSending(false);
    }
  };

  // =========================
  // 🔐 VERIFY OTP
  // =========================
  const handleVerify = async (
    inputCode?: string,
  ) => {

    const finalCode = inputCode || code;

    if (
      finalCode.length !== 6 ||
      loading
    )
      return;

    try {
      setLoading(true);

      const res = await api.post(
        '/auth/verify-otp',
        {
          email,
          code: finalCode,
        },
      );

      console.log(
        'VERIFY RESPONSE:',
        res.data,
      );

      console.log(
        'TOKEN FROM BACKEND:',
        res.data?.token,
      );

      // ✅ FIXED
      const newToken = res.data?.token;

      if (!newToken) {

        toast.error(
          'Authentication failed',
          {
            className:
              'kasuku-toast',
            icon: '🔐',
          },
        );

        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem(
        'token',
        String(newToken),
      );

      // ✅ SAVE USER
      if (res.data?.user) {

        // full user object
        localStorage.setItem(
          'user',
          JSON.stringify(
            res.data.user,
          ),
        );

        // ✅ IMPORTANT
        localStorage.setItem(
          'userId',
          String(
            res.data.user.id,
          ),
        );

        // optional useful fields
        localStorage.setItem(
          'artistName',
          res.data.user
            .artistName || '',
        );

        localStorage.setItem(
          'role',
          res.data.user.role ||
            'user',
        );
      }

 localStorage.setItem(
  'plan',
  String(res.data.user.plan ?? 1),
);

localStorage.setItem(
  'subscriptionActive',
  String(
    res.data.user.subscriptionActive ?? false,
  ),
);

      window.dispatchEvent(
        new Event('storage'),
      );

      localStorage.removeItem(
        'verifyEmail',
      );

      // 🔥 CARD FLOW
      if (
        location.state?.from ===
          'card' &&
        cardData
      ) {

        await api.post(
          '/billing/card',
          cardData,
        );

        toast.success(
          'Card saved successfully',
          {
            className:
              'kasuku-toast',
            icon: '💳',
          },
        );

        navigate('/settings/card');

        return;
      }

      toast.success(
        'Verification successful',
        {
          className: 'kasuku-toast',
          icon: '✅',
        },
      );

      // ✅ NORMAL FLOW
      navigate('/dashboard');

    } catch (err) {
      console.error(err);

      toast.error(
        'Invalid or expired code',
        {
          className: 'kasuku-toast',
          icon: '❌',
        },
      );

      setCode('');

      inputRef.current?.focus();

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🚀 AUTO SEND ON LOAD
  // =========================
  useEffect(() => {
    const alreadySent =
      sessionStorage.getItem(
        'otp_sent',
      );

    if (email && !alreadySent) {
      sendOtp();

      sessionStorage.setItem(
        'otp_sent',
        'true',
      );
    }
  }, []);

  // =========================
  // ⏱ COOLDOWN TIMER
  // =========================
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () =>
      clearInterval(timer);

  }, [cooldown]);

  // =========================
  // 🔢 INPUT HANDLER
  // =========================
  const handleChange = (
    value: string,
  ) => {

    const clean = value
      .replace(/\D/g, '')
      .slice(0, 6);

    setCode(clean);

    if (clean.length === 6) {
      handleVerify(clean);
    }
  };

  // =========================
  // 📋 PASTE HANDLER
  // =========================
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
  ) => {

    const pasted =
      e.clipboardData
        .getData('text')
        .replace(/\D/g, '');

    if (pasted.length === 6) {
      setCode(pasted);

      handleVerify(pasted);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img
          src={logo}
          alt="Kasuku"
          style={styles.logo}
        />

        <h2 style={styles.title}>
          Verify Your Account
        </h2>

        <p style={styles.subtitle}>
          Code sent to <br />
          <span
            style={{
              color: '#fff',
            }}
          >
            {email}
          </span>
        </p>

        <input
          ref={inputRef}
          value={code}
          onChange={(e) =>
            handleChange(
              e.target.value,
            )
          }
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="••••••"
          style={styles.input}
        />

        <button
          disabled
          style={styles.btn}
        >
          {loading
            ? 'Verifying...'
            : 'Enter Code'}
        </button>

        <button
          onClick={sendOtp}
          disabled={
            cooldown > 0 ||
            sending
          }
          style={styles.resend}
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : sending
            ? 'Sending...'
            : 'Resend Code'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'radial-gradient(circle at center, #0f0f1a 0%, #000 100%)',
  },

  card: {
    width: 360,
    padding: 40,
    borderRadius: 24,
    background:
      'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(25px)',
    border:
      '1px solid rgba(255,255,255,0.1)',
    textAlign: 'center',
    boxShadow:
      '0 0 60px rgba(124,58,237,0.35)',
  },

  logo: {
    width: 90,
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 10,
  },

  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 25,
  },

  input: {
    width: '100%',
    padding: 16,
    borderRadius: 14,
    border: '1px solid #333',
    background: '#000',
    color: '#fff',
    textAlign: 'center' as const,
    fontSize: 22,
    letterSpacing: 8,
    outline: 'none',
  },

  btn: {
    marginTop: 20,
    width: '100%',
    padding: 14,
    borderRadius: 14,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    fontSize: 16,
    opacity: 0.7,
  },

  resend: {
    marginTop: 15,
    background: 'none',
    border: 'none',
    color: '#7c3aed',
    cursor: 'pointer',
    fontSize: 14,
  },
};