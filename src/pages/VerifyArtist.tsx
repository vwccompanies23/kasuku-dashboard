import { useState } from 'react';
import logo from '../assets/kasuku-logo.png';

export default function VerifyArtist() {

  const [submitted, setSubmitted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({

    artistName: '',
    realName: '',
    instagram: '',
    spotifyUrl: '',
    youtubeUrl: '',
    appleMusicUrl: '',
    proofLink: '',

  });

  const handleChange = (
    e: any,
  ) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });
  };

  const handleSubmit = async (
    e: any,
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem('token');

      const user =
        JSON.parse(
          localStorage.getItem('user')
          || '{}'
        );

   const res = await fetch(
  `${import.meta.env.VITE_API_URL}/artist-verifications`,
  {

    method: 'POST',

    headers: {
      'Content-Type':
        'application/json',

      Authorization:
        `Bearer ${token}`,
    },

    body: JSON.stringify({

      ...form,

      userId: user.id,

    }),

  }
);

      if (!res.ok) {

        throw new Error(
          'Failed',
        );
      }

      setSubmitted(true);

    } catch (err) {

      console.error(err);

      alert(
        'Verification request failed',
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>

        <img
          src={logo}
          style={styles.logo}
        />

        <h1 style={styles.title}>
          Verified Artist
        </h1>

        <p style={styles.subtitle}>
          Apply for an official Kasuku
          verification badge and confirm
          ownership of your artist identity.
        </p>

      </div>

      {/* FORM */}
      <div style={styles.container}>

        <div style={styles.card}>

          {submitted ? (

            <div style={styles.success}>

              Your verification request
              has been submitted.

            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
            >

              <div style={styles.group}>
                <label style={styles.label}>
                  Artist Name
                </label>

                <input
                  name="artistName"
                  value={form.artistName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>
                  Real Name
                </label>

                <input
                  name="realName"
                  value={form.realName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>
                  Instagram
                </label>

                <input
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>
                  Spotify Profile
                </label>

                <input
                  name="spotifyUrl"
                  value={form.spotifyUrl}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>
                  YouTube Channel
                </label>

                <input
                  name="youtubeUrl"
                  value={form.youtubeUrl}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>
                  Apple Music Profile
                </label>

                <input
                  name="appleMusicUrl"
                  value={form.appleMusicUrl}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.group}>
                <label style={styles.label}>
                  Proof Link
                </label>

                <input
                  name="proofLink"
                  value={form.proofLink}
                  onChange={handleChange}
                  placeholder="
Google Drive / Website / ID
"
                  style={styles.input}
                />
              </div>

              <button
                type="submit"
                style={styles.button}
                disabled={loading}
              >
                {
                  loading
                    ? 'Submitting...'
                    : 'Apply For Verification'
                }
              </button>

            </form>

          )}

        </div>

      </div>
    </div>
  );
}

const styles: any = {

  page: {
    minHeight: '100vh',
    background: '#050816',
    color: '#fff',
    padding: '40px 16px',
    overflowX: 'hidden',
  },

  hero: {
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 35,
    paddingLeft: 12,
    paddingRight: 12,
    maxWidth: 900,
    margin: '0 auto',
  },

  logo: {
    width: 'clamp(80px, 12vw, 120px)',
    marginBottom: 18,
  },

  title: {
    fontSize: 'clamp(34px, 5vw, 58px)',
    fontWeight: 900,
    lineHeight: 1.05,
    textAlign: 'center',
    margin: 0,

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    wordBreak: 'break-word',
  },

  subtitle: {
    maxWidth: 760,
    margin: '18px auto 0',
    color: '#b8b8b8',
    lineHeight: 1.8,
    fontSize: 'clamp(15px, 2vw, 19px)',
    textAlign: 'center',
  },

  container: {
    width: '100%',
    maxWidth: 850,
    margin: '0 auto',
  },

  card: {
    background:
      'rgba(255,255,255,0.04)',

    border:
      '1px solid rgba(255,255,255,0.08)',

    borderRadius: 24,

    padding: 'clamp(20px, 4vw, 38px)',

    backdropFilter: 'blur(18px)',

    boxShadow:
      '0 0 40px rgba(124,58,237,0.18)',
  },

  group: {
    marginBottom: 22,
  },

  label: {
    display: 'block',
    marginBottom: 10,
    color: '#d6d6d6',
    fontSize: 15,
    fontWeight: 600,
  },

  input: {
    width: '100%',
    padding: '15px 16px',
    borderRadius: 14,

    border:
      '1px solid rgba(255,255,255,0.08)',

    background:
      'rgba(255,255,255,0.04)',

    color: '#fff',

    outline: 'none',

    boxSizing: 'border-box',

    fontSize: 15,

    transition: '0.2s',
  },

  button: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    border: 'none',

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    color: '#fff',

    fontWeight: 800,

    fontSize: 15,

    cursor: 'pointer',

    marginTop: 12,

    boxShadow:
      '0 0 30px rgba(124,58,237,0.35)',
  },

  success: {
    padding: 24,
    borderRadius: 18,

    background:
      'rgba(0,255,150,0.08)',

    border:
      '1px solid rgba(0,255,150,0.25)',

    color: '#8fffc1',

    textAlign: 'center',

    fontSize: 16,

    lineHeight: 1.7,
  },
};