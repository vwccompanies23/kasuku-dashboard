import React, {
  useState,
} from 'react';

import logo from '../assets/kasuku-logo.png';

import {
  useLanguage,
} from '../LanguageContext';

import translations
from '../translations';

export default function CopyrightClaim() {

  const {
    lang,
  } = useLanguage();

  const t =
    translations?.[lang] ||
    translations.en;

  const [submitted,
    setSubmitted] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const [form,
    setForm] =
    useState<any>({
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

      const res =
        await fetch(
          `${import.meta.env.VITE_API_URL}/copyright-claims`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify(form),
          }
        );

      if (!res.ok) {

        throw new Error(
          'Failed to submit claim'
        );

      }

      setSubmitted(true);

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
        t?.claimError ||
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
          {t?.copyrightClaimTitle ||
            'Copyright Claim Portal'}
        </h1>

        <p style={styles.subtitle}>
          {t?.copyrightClaimSubtitle ||
            `Submit copyright infringement reports
            related to music, artwork,
            videos, or content distributed
            through the Kasuku platform.`}
        </p>

      </div>

      {/* FORM */}

      <div style={styles.container}>

        <div style={styles.card}>

          {submitted ? (

            <div style={styles.success}>

              <h2 style={styles.successTitle}>

                {t?.claimSubmitted ||
                  'Claim Submitted Successfully'}

              </h2>

              <p style={styles.successText}>

                {t?.claimReview ||
                  'Our moderation team will review your claim.'}

              </p>

              <p style={styles.successText}>

                {t?.claimStatus ||
                  'Status updates may include:'}

              </p>

              <div style={styles.statusBox}>
                ⏳ {t?.pendingReview || 'Pending Review'}
              </div>

              <div style={styles.statusBox}>
                👀 {t?.underReview || 'Under Reviewing'}
              </div>

              <div style={styles.statusBox}>
                ✅ {t?.approved || 'Approved'}
              </div>

              <div style={styles.statusBox}>
                ❌ {t?.rejected || 'Rejected'}
              </div>

            </div>

          ) : (

            <form onSubmit={handleSubmit}>

              {/* FULL NAME */}

              <div style={styles.group}>

                <label style={styles.label}>
                  {t?.fullName || 'Full Name'}
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
                  {t?.emailAddress || 'Email Address'}
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
                  {t?.copyrightedWork ||
                    'Copyrighted Work'}
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
                  {t?.infringingContent ||
                    'Infringing Content URL'}
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
                  {t?.proofLink || 'Proof Link'}
                </label>

                <input
                  type="text"
                  name="proofLink"
                  value={form.proofLink}
                  onChange={handleChange}
                  placeholder={
                    t?.proofPlaceholder ||
                    'Google Drive, Dropbox, Website...'
                  }
                  style={styles.input}
                />

              </div>

              {/* DESCRIPTION */}

              <div style={styles.group}>

                <label style={styles.label}>
                  {t?.description || 'Description'}
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
                style={{
                  ...styles.button,

                  opacity:
                    loading
                      ? 0.7
                      : 1,
                }}
                disabled={loading}
              >

                {loading
                  ? (
                    t?.submitting ||
                    'Submitting...'
                  )
                  : (
                    t?.submitClaim ||
                    'Submit Claim'
                  )}

              </button>

            </form>

          )}

        </div>

        {/* FOOTER */}

        <div style={styles.footer}>

          ©️ {new Date().getFullYear()} Kasuku.

          <br />

          {t?.copyrightFooter ||
            'Copyright Protection & Rights Enforcement.'}

        </div>

      </div>

    </div>

  );

}

const styles: any = {

  page: {

    minHeight: '100vh',

    width: '100%',

    overflowX: 'hidden',

    boxSizing: 'border-box',

    background:
      'radial-gradient(circle at top, #1a002b 0%, #020617 45%, #000 100%)',

    color: '#fff',

    paddingBottom: 70,
  },

  hero: {

    padding:
      'clamp(70px, 10vw, 110px) 20px 50px',

    textAlign: 'center',

    width: '100%',

    boxSizing: 'border-box',
  },

  logo: {

    width:
      'clamp(75px, 12vw, 110px)',

    marginBottom: 20,

    filter:
      'drop-shadow(0 0 25px rgba(124,58,237,0.6))',
  },

  title: {

    fontSize:
      'clamp(34px, 7vw, 56px)',

    fontWeight: 'bold',

    marginBottom: 18,

    lineHeight: 1.2,

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    WebkitBackgroundClip:
      'text',

    WebkitTextFillColor:
      'transparent',

    wordBreak: 'break-word',
  },

  subtitle: {

    maxWidth: 850,

    margin: '0 auto',

    color: '#b0b0b0',

    lineHeight: 1.9,

    fontSize:
      'clamp(15px, 2vw, 18px)',

    padding:
      '0 clamp(0px, 2vw, 20px)',

    wordBreak: 'break-word',
  },

  container: {

    width: '100%',

    maxWidth: 900,

    margin: '0 auto',

    padding:
      '0 clamp(16px, 3vw, 24px)',

    boxSizing: 'border-box',
  },

  card: {

    background:
      'rgba(255,255,255,0.04)',

    border:
      '1px solid rgba(255,255,255,0.08)',

    borderRadius:
      'clamp(20px, 3vw, 30px)',

    padding:
      'clamp(22px, 4vw, 36px)',

    backdropFilter: 'blur(18px)',

    boxShadow:
      '0 0 30px rgba(124,58,237,0.15)',

    width: '100%',

    boxSizing: 'border-box',

    overflow: 'hidden',
  },

  group: {

    marginBottom: 24,
  },

  label: {

    display: 'block',

    marginBottom: 10,

    color: '#ccc',

    fontSize:
      'clamp(14px, 2vw, 16px)',
  },

  input: {

    width: '100%',

    padding:
      '14px 16px',

    borderRadius: 14,

    border:
      '1px solid rgba(255,255,255,0.08)',

    background:
      'rgba(255,255,255,0.04)',

    color: '#fff',

    outline: 'none',

    boxSizing: 'border-box',

    fontSize:
      'clamp(14px, 2vw, 16px)',
  },

  textarea: {

    width: '100%',

    minHeight: 160,

    padding:
      '14px 16px',

    borderRadius: 14,

    border:
      '1px solid rgba(255,255,255,0.08)',

    background:
      'rgba(255,255,255,0.04)',

    color: '#fff',

    outline: 'none',

    resize: 'vertical',

    boxSizing: 'border-box',

    fontSize:
      'clamp(14px, 2vw, 16px)',
  },

  button: {

    width: '100%',

    padding:
      '16px 20px',

    borderRadius: 16,

    border: 'none',

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    color: '#fff',

    fontWeight: 'bold',

    cursor: 'pointer',

    fontSize:
      'clamp(15px, 2vw, 17px)',

    transition:
      '0.2s ease',
  },

  success: {

    padding:
      'clamp(18px, 4vw, 30px)',

    borderRadius: 20,

    background:
      'rgba(0,255,150,0.08)',

    border:
      '1px solid rgba(0,255,150,0.25)',

    color: '#8fffc1',

    textAlign: 'center',

    lineHeight: 1.8,
  },

  successTitle: {

    fontSize:
      'clamp(24px, 5vw, 34px)',

    lineHeight: 1.3,
  },

  successText: {

    marginTop: 12,

    fontSize:
      'clamp(14px, 2vw, 16px)',
  },

  statusBox: {

    marginTop: 14,

    padding:
      '14px 16px',

    borderRadius: 14,

    background:
      'rgba(255,255,255,0.05)',

    fontSize:
      'clamp(14px, 2vw, 16px)',

    wordBreak: 'break-word',
  },

  footer: {

    textAlign: 'center',

    marginTop: 55,

    color: '#777',

    fontSize:
      'clamp(12px, 2vw, 14px)',

    letterSpacing: 1,

    padding:
      '0 20px',

    lineHeight: 1.8,

    wordBreak: 'break-word',
  },

};