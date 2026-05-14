import logo from '../assets/kasuku-logo.png';

export default function Help() {
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
          Help Center
        </h1>

        <p style={styles.subtitle}>
          Welcome to Kasuku Support. We are here to help artists,
          labels, creators, and teams manage music distribution,
          releases, payments, royalties, subscriptions, and platform access.
        </p>

      </div>

      {/* CONTENT */}
      <div style={styles.container}>

        {/* ACCOUNT */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            Account & Login Support
          </h2>

          <p style={styles.text}>
            Having trouble logging in, verifying your account,
            receiving OTP codes, or accessing your dashboard?
            Our support team can help restore account access
            and solve authentication issues quickly.
          </p>

          <ul style={styles.list}>
            <li>OTP verification issues</li>
            <li>Password reset support</li>
            <li>Account recovery assistance</li>
            <li>Email verification problems</li>
            <li>Dashboard access support</li>
          </ul>

        </div>

        {/* MUSIC */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            Music Distribution Help
          </h2>

          <p style={styles.text}>
            Kasuku helps artists distribute music to major streaming
            platforms worldwide. If your release is pending, rejected,
            missing artwork, or delayed, contact support for assistance.
          </p>

          <ul style={styles.list}>
            <li>Spotify release issues</li>
            <li>Apple Music delivery support</li>
            <li>YouTube Content ID help</li>
            <li>Metadata corrections</li>
            <li>Artist profile linking</li>
            <li>Royalty & analytics support</li>
          </ul>

        </div>

        {/* PAYMENTS */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            Billing & Subscription Support
          </h2>

          <p style={styles.text}>
            Need help with subscriptions, Stripe payments,
            yearly billing, invoices, or failed payments?
            Kasuku support can assist you with all billing-related issues.
          </p>

          <ul style={styles.list}>
            <li>Monthly & yearly plans</li>
            <li>Payment verification</li>
            <li>Subscription activation</li>
            <li>Invoice & billing questions</li>
            <li>Card payment troubleshooting</li>
          </ul>

        </div>

        {/* CONTACT */}
        <div style={styles.contactBox}>

          <h2 style={styles.contactTitle}>
            Contact Kasuku Support
          </h2>

          <p style={styles.contactText}>
            Our support team is available to assist artists and creators
            with platform, distribution, and billing support requests.
          </p>

          <a
            href="mailto:support@kasukuu.com"
            style={styles.contactBtn}
          >
            support@kasukuu.com
          </a>

        </div>

      </div>
    </div>
  );
}

const styles: any = {

  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, #1a002b, #020617, #000)',
    color: '#fff',
    paddingBottom: 80,
  },

  hero: {
    textAlign: 'center',
    padding: '90px 20px 50px',
  },

  logo: {
    width: 95,
    marginBottom: 20,
    filter:
      'drop-shadow(0 0 25px rgba(124,58,237,0.8))',
  },

  title: {
    fontSize: 'clamp(40px, 8vw, 64px)',
    fontWeight: 'bold',
    marginBottom: 20,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.2',
  },

  subtitle: {
    maxWidth: 850,
    margin: '0 auto',
    color: '#d1d5db',
    lineHeight: 1.9,
    fontSize: 18,
  },

  container: {
    maxWidth: 1050,
    margin: '0 auto',
    padding: '0 20px',
  },

  card: {
    background:
      'rgba(255,255,255,0.05)',
    border:
      '1px solid rgba(255,255,255,0.08)',
    borderRadius: 28,
    padding: 35,
    marginBottom: 28,
    backdropFilter: 'blur(20px)',
    boxShadow:
      '0 0 50px rgba(124,58,237,0.18)',
  },

  heading: {
    fontSize: 32,
    marginBottom: 18,
    color: '#fff',
    lineHeight: '1.3',
  },

  text: {
    color: '#cfcfcf',
    lineHeight: 1.9,
    fontSize: 16,
    marginBottom: 22,
  },

  list: {
    color: '#e5e5e5',
    paddingLeft: 24,
    lineHeight: 2,
    fontSize: 16,
  },

  contactBox: {
    marginTop: 40,
    padding: 45,
    borderRadius: 30,
    textAlign: 'center',
    background:
      'linear-gradient(135deg, rgba(255,0,60,0.12), rgba(124,58,237,0.18))',
    border:
      '1px solid rgba(255,255,255,0.08)',
    boxShadow:
      '0 0 60px rgba(124,58,237,0.28)',
  },

  contactTitle: {
    fontSize: 38,
    marginBottom: 18,
    color: '#fff',
  },

  contactText: {
    color: '#d1d5db',
    lineHeight: 1.8,
    maxWidth: 700,
    margin: '0 auto 28px',
    fontSize: 17,
  },

  contactBtn: {
    display: 'inline-block',
    padding: '16px 34px',
    borderRadius: 16,
    textDecoration: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    boxShadow:
      '0 0 35px rgba(124,58,237,0.45)',
  },
};