import logo from '../assets/kasuku-logo.png';

export default function CommunityGuidelines() {
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
          Community Guidelines
        </h1>

        <p style={styles.subtitle}>
          Kasuku is built to support artists,
          creators, and music communities worldwide.
          These guidelines help keep the platform
          safe, respectful, and professional.
        </p>

      </div>

      {/* CONTENT */}
      <div style={styles.container}>

        <div style={styles.card}>
          <h2 style={styles.heading}>
            1. Respect Creators
          </h2>

          <p style={styles.text}>
            Respect artists, listeners,
            and other community members.
            Harassment, threats, hate speech,
            or abusive behavior are prohibited.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>
            2. Upload Original Content
          </h2>

          <p style={styles.text}>
            Only upload music, artwork,
            videos, or content you own
            or are authorized to distribute.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>
            3. No Fake Streams or Fraud
          </h2>

          <p style={styles.text}>
            Artificial streaming,
            bots, fake engagement,
            or royalty manipulation
            are strictly prohibited.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>
            4. No Illegal Content
          </h2>

          <p style={styles.text}>
            Users may not upload illegal,
            dangerous, violent,
            exploitative, or fraudulent content.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>
            5. Account Safety
          </h2>

          <p style={styles.text}>
            Protect your account credentials
            and report suspicious activity
            immediately.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.heading}>
            6. Enforcement
          </h2>

          <p style={styles.text}>
            Kasuku reserves the right
            to remove content,
            restrict features,
            suspend accounts,
            or permanently ban users
            violating these guidelines.
          </p>
        </div>

        <div style={styles.footer}>
          ©️ {new Date().getFullYear()} Kasuku.
          Community Safety & Artist Protection.
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
    fontSize: 'clamp(32px, 6vw, 42px)',
    fontWeight: 'bold',
    marginBottom: 15,
    lineHeight: '60px',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  subtitle: {
    maxWidth: 760,
    margin: '0 auto',
    color: '#b0b0b0',
    lineHeight: 1.8,
    fontSize: 17,
  },

  container: {
    maxWidth: 950,
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
    padding: 28,
    marginBottom: 24,
    backdropFilter: 'blur(18px)',
    boxShadow:
      '0 0 30px rgba(124,58,237,0.15)',
  },

  heading: {
    fontSize: 'clamp(22px, 5vw, 28px)',
    marginBottom: 18,
    color: '#fff',
  },

  text: {
    color: '#b8b8b8',
    lineHeight: 1.9,
    fontSize: 15,
  },

  footer: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
    fontSize: 13,
    letterSpacing: 1,
  },
};