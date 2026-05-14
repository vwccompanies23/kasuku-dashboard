import logo from '../assets/kasuku-logo.png';

export default function Privacy() {
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
          Privacy Policy
        </h1>

        <p style={styles.subtitle}>
          Your privacy matters to us. This Privacy Policy
          explains how Kasuku collects, protects,
          stores, and uses your personal information
          across our music distribution platform.
        </p>

      </div>

      {/* CONTENT */}
      <div style={styles.container}>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            1. Information We Collect
          </h2>

          <p style={styles.text}>
            Kasuku may collect personal information
            when you create an account, upload music,
            purchase subscriptions, connect payment methods,
            or use platform features.
          </p>

          <p style={styles.text}>
            Information we collect may include:
          </p>

          <ul style={styles.list}>
            <li>Name and artist profile information</li>
            <li>Email address and login credentials</li>
            <li>Music metadata and uploaded content</li>
            <li>Payment and billing information</li>
            <li>Streaming analytics and royalty data</li>
            <li>Device information and usage activity</li>
          </ul>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            2. How We Use Your Information
          </h2>

          <p style={styles.text}>
            We use your information to provide,
            improve, and secure the Kasuku platform.
          </p>

          <p style={styles.text}>
            Your data may be used to:
          </p>

          <ul style={styles.list}>
            <li>Distribute music to streaming platforms</li>
            <li>Process subscription payments</li>
            <li>Deliver analytics and royalty reports</li>
            <li>Verify artist ownership and identity</li>
            <li>Improve platform performance and security</li>
            <li>Provide customer support and notifications</li>
          </ul>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            3. Payment Security
          </h2>

          <p style={styles.text}>
            Kasuku does not directly store sensitive
            payment card information on our servers.
          </p>

          <p style={styles.text}>
            Payments are securely processed through
            trusted third-party providers such as Stripe,
            using encrypted and industry-standard
            security technologies.
          </p>

          <p style={styles.text}>
            We take reasonable measures to protect
            your account and financial information
            from unauthorized access.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            4. Data Sharing
          </h2>

          <p style={styles.text}>
            Kasuku does not sell your personal data
            to advertisers or third parties.
          </p>

          <p style={styles.text}>
            Your information may only be shared with:
          </p>

          <ul style={styles.list}>
            <li>Streaming platforms for music delivery</li>
            <li>Payment processors for billing</li>
            <li>Legal authorities if required by law</li>
            <li>Security systems preventing fraud or abuse</li>
          </ul>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            5. Cookies & Analytics
          </h2>

          <p style={styles.text}>
            Kasuku may use cookies and analytics tools
            to improve user experience, monitor performance,
            and understand platform activity.
          </p>

          <p style={styles.text}>
            These technologies help us optimize features,
            security systems, and dashboard experiences.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            6. Account Protection
          </h2>

          <p style={styles.text}>
            Users are responsible for maintaining
            the confidentiality of their login credentials
            and account access.
          </p>

          <p style={styles.text}>
            We recommend using strong passwords
            and enabling secure authentication methods
            whenever possible.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            7. Data Retention
          </h2>

          <p style={styles.text}>
            Kasuku retains user information only for as long
            as necessary to provide services,
            comply with legal obligations,
            resolve disputes, and enforce platform policies.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            8. Policy Updates
          </h2>

          <p style={styles.text}>
            We may update this Privacy Policy
            from time to time to improve transparency,
            security, or legal compliance.
          </p>

          <p style={styles.text}>
            Continued use of Kasuku after updates
            means you accept the revised Privacy Policy.
          </p>

        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          © {new Date().getFullYear()} Kasuku.
          Privacy & Security Protected.
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