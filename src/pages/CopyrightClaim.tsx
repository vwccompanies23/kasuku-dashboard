import React, { useState } from 'react';
import logo from '../assets/kasuku-logo.png';

export default function CopyrightClaim() {

  const [submitted, setSubmitted] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState<any>({
    fullName: '',
    email: '',
    copyrightedWork: '',
    infringingUrl: '',
    proofLink: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

    const res = await fetch(
  `${import.meta.env.VITE_API_URL}/copyright-claims`,
  {

    method: 'POST',

    headers: {
      'Content-Type':
        'application/json',
    },

    body: JSON.stringify(form),

  }
);

      if (!res.ok) {
        throw new Error(
          'Failed to submit claim'
        );
      }

      setSubmitted(true);

      // RESET FORM
      setForm({
        fullName: '',
        email: '',
        copyrightedWork: '',
        infringingUrl: '',
        proofLink: '',
        description: '',
      });

    } catch (err) {

      console.error(err);

      alert(
        'Something went wrong. Please try again.'
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
          alt="Kasuku"
          style={styles.logo}
        />

        <h1 style={styles.title}>
          Copyright Claim Portal
        </h1>

        <p style={styles.subtitle}>
          Submit copyright infringement reports
          related to music, artwork,
          videos, or content distributed
          through the Kasuku platform.
        </p>

      </div>

      {/* FORM */}
      <div style={styles.container}>

        <div style={styles.card}>

          {submitted ? (

            <div style={styles.success}>

              <h2>
                Claim Submitted Successfully
              </h2>

              <p style={{ marginTop: 10 }}>
                Our moderation team
                will review your claim.
              </p>

              <p style={{ marginTop: 10 }}>
                Status updates may include:
              </p>

              <div style={styles.statusBox}>
                ⏳ Pending Review
              </div>

              <div style={styles.statusBox}>
                👀 Under Reviewing
              </div>

              <div style={styles.statusBox}>
                ✅ Approved
              </div>

              <div style={styles.statusBox}>
                ❌ Rejected
              </div>

            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
            >

              {/* FULL NAME */}
              <div style={styles.group}>

                <label style={styles.label}>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

              </div>

              {/* EMAIL */}
              <div style={styles.group}>

                <label style={styles.label}>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

              </div>

              {/* WORK */}
              <div style={styles.group}>

                <label style={styles.label}>
                  Copyrighted Work
                </label>

                <input
                  type="text"
                  name="copyrightedWork"
                  value={form.copyrightedWork}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

              </div>

              {/* URL */}
              <div style={styles.group}>

                <label style={styles.label}>
                  Infringing Content URL
                </label>

                <input
                  type="text"
                  name="infringingUrl"
                  value={form.infringingUrl}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

              </div>

              {/* PROOF */}
              <div style={styles.group}>

                <label style={styles.label}>
                  Proof Link
                </label>

                <input
                  type="text"
                  name="proofLink"
                  value={form.proofLink}
                  onChange={handleChange}
                  placeholder="Google Drive, Dropbox, Website..."
                  style={styles.input}
                />

              </div>

              {/* DESCRIPTION */}
              <div style={styles.group}>

                <label style={styles.label}>
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={styles.textarea}
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                style={styles.button}
                disabled={loading}
              >

                {loading
                  ? 'Submitting...'
                  : 'Submit Claim'}

              </button>

            </form>

          )}

        </div>

        {/* FOOTER */}
        <div style={styles.footer}>

          ©️ {new Date().getFullYear()}
          {' '}Kasuku.

          Copyright Protection
          & Rights Enforcement.

        </div>

      </div>

    </div>
  );
}

const styles: any = {

  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, #1a002b 0%, #020617 45%, #000 100%)',
    color: '#fff',
    paddingBottom: 60,
    overflowX: 'hidden',
    width: '100%',
  },

  hero: {
    paddingTop: 70,
    paddingBottom: 50,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },

  logo: {
    width: 110,
    marginBottom: 20,
    filter:
      'drop-shadow(0 0 25px rgba(124,58,237,0.6))',
  },

  title: {
    fontSize:
      'clamp(32px, 6vw, 42px)',
    fontWeight: 'bold',
    marginBottom: 15,
    lineHeight: '60px',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor:
      'transparent',
  },

  subtitle: {
    maxWidth: 760,
    margin: '0 auto',
    color: '#b0b0b0',
    lineHeight: 1.8,
    fontSize: 17,
  },

  container: {
    maxWidth: 850,
    margin: '0 auto',
    paddingLeft: 20,
    paddingRight: 20,
  },

  card: {
    background:
      'rgba(255,255,255,0.04)',
    border:
      '1px solid rgba(255,255,255,0.08)',
    borderRadius: 22,
    padding: 30,
    backdropFilter: 'blur(18px)',
    boxShadow:
      '0 0 30px rgba(124,58,237,0.15)',
  },

  group: {
    marginBottom: 22,
  },

  label: {
    display: 'block',
    marginBottom: 10,
    color: '#ccc',
  },

  input: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    border:
      '1px solid rgba(255,255,255,0.08)',
    background:
      'rgba(255,255,255,0.04)',
    color: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
  },

  textarea: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    border:
      '1px solid rgba(255,255,255,0.08)',
    background:
      'rgba(255,255,255,0.04)',
    color: '#fff',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
  },

  button: {
    width: '100%',
    padding: 15,
    borderRadius: 14,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 15,
    opacity: 1,
  },

  success: {
    padding: 20,
    borderRadius: 16,
    background:
      'rgba(0,255,150,0.08)',
    border:
      '1px solid rgba(0,255,150,0.25)',
    color: '#8fffc1',
    textAlign: 'center',
    lineHeight: 1.8,
  },

  statusBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    background:
      'rgba(255,255,255,0.05)',
  },

  footer: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
    fontSize: 13,
    letterSpacing: 1,
  },
};