import logo from '../assets/kasuku-logo.png';

export default function CookiePolicy() {
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
          Cookie Policy
        </h1>

        <p style={styles.subtitle}>
          This Cookie Policy explains how Kasuku uses cookies,
          analytics technologies, and related tracking systems
          across our music distribution platform.
        </p>

      </div>

      {/* CONTENT */}
      <div style={styles.container}>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            1. What Are Cookies
          </h2>

          <p style={styles.text}>
            Cookies are small data files stored on your device
            that help websites remember preferences,
            improve user experience,
            and enhance platform functionality.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            2. How Kasuku Uses Cookies
          </h2>

          <p style={styles.text}>
            Kasuku uses cookies and similar technologies
            to improve platform performance,
            maintain secure sessions,
            personalize experiences,
            and analyze usage activity.
          </p>

          <ul style={styles.list}>
            <li>Account authentication</li>
            <li>Session management</li>
            <li>Language preferences</li>
            <li>Platform analytics</li>
            <li>Security monitoring</li>
            <li>User experience optimization</li>
          </ul>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            3. Analytics Technologies
          </h2>

          <p style={styles.text}>
            Kasuku may use analytics tools
            to understand platform traffic,
            feature usage,
            performance metrics,
            and user engagement patterns.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            4. Managing Cookies
          </h2>

          <p style={styles.text}>
            Users may control or disable cookies
            through browser settings.
          </p>

          <p style={styles.text}>
            However, disabling certain cookies
            may affect functionality,
            login sessions,
            and platform performance.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            5. Third-Party Services
          </h2>

          <p style={styles.text}>
            Some third-party services integrated
            with Kasuku,
            including payment processors
            and analytics providers,
            may also use cookies
            or similar technologies.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            6. Policy Updates
          </h2>

          <p style={styles.text}>
            Kasuku may update this Cookie Policy
            periodically to improve transparency,
            platform operations,
            or legal compliance.
          </p>

        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          ©️ {new Date().getFullYear()} Kasuku.
          Cookie & Analytics Transparency Policy.
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
    width: '100%',
    boxSizing: 'border-box',
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
    wordBreak: 'break-word',
  },

  subtitle: {
    maxWidth: 760,
    margin: '0 auto',
    color: '#b0b0b0',
    lineHeight: 1.8,
    fontSize: 17,
    width: '100%',
    wordBreak: 'break-word',
  },

  container: {
    maxWidth: 950,
    margin: '0 auto',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    boxSizing: 'border-box',
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
    width: '100%',
    boxSizing: 'border-box',
  },

  heading: {
    fontSize: 'clamp(22px, 5vw, 28px)',
    marginBottom: 18,
    color: '#fff',
    wordBreak: 'break-word',
  },

  text: {
    color: '#b8b8b8',
    lineHeight: 1.9,
    fontSize: 15,
    marginBottom: 18,
    wordBreak: 'break-word',
  },

  list: {
    color: '#d0d0d0',
    paddingLeft: 22,
    lineHeight: 2,
    marginBottom: 15,
    wordBreak: 'break-word',
  },

  footer: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
    fontSize: 13,
    letterSpacing: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
};