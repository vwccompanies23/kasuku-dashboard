import logo from '../assets/kasuku-logo.png';

export default function Terms() {
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
          Terms of Service
        </h1>

        <p style={styles.subtitle}>
          These Terms govern your use of Kasuku music distribution,
          royalty systems, artist tools, analytics services,
          and platform infrastructure.
        </p>
      </div>

      {/* CONTENT */}
      <div style={styles.container}>

        {/* SECTION */}
        <div style={styles.card}>
          <h2 style={styles.heading}>
            1. Acceptance of Terms
          </h2>

          <p style={styles.text}>
            By accessing or using Kasuku, you agree to comply
            with these Terms of Service, our platform policies,
            and all applicable laws regarding music ownership,
            copyright, monetization, and digital distribution.
          </p>

          <p style={styles.text}>
            If you do not agree with any part of these Terms,
            you may not use the Kasuku platform.
          </p>
        </div>

        {/* SECTION */}
        <div style={styles.card}>
          <h2 style={styles.heading}>
            2. Music Ownership & Rights
          </h2>

          <p style={styles.text}>
            By uploading music, artwork, videos, metadata,
            or other content to Kasuku, you confirm that:
          </p>

          <ul style={styles.list}>
            <li>You own or control all distribution rights.</li>
            <li>Your content does not infringe copyrights.</li>
            <li>You have permission from collaborators and producers.</li>
            <li>Your releases comply with DSP platform policies.</li>
          </ul>

          <p style={styles.text}>
            Kasuku reserves the right to remove content that
            violates copyright laws, trademark protections,
            or platform guidelines.
          </p>
        </div>

        {/* SECTION */}
        <div style={styles.card}>
          <h2 style={styles.heading}>
            3. Distribution Services
          </h2>

          <p style={styles.text}>
            Kasuku distributes music to supported streaming
            platforms and digital music services worldwide.
            Delivery times may vary depending on third-party
            platform processing schedules.
          </p>

          <p style={styles.text}>
            We do not guarantee playlist placements,
            streaming performance, audience growth,
            royalties, or financial earnings.
          </p>

          <p style={styles.text}>
            Some platforms may reject releases due to
            metadata issues, artwork violations,
            copyright claims, spam detection,
            or policy enforcement.
          </p>
        </div>

        {/* SECTION */}
        <div style={styles.card}>
          <h2 style={styles.heading}>
            4. Payments & Subscriptions
          </h2>

          <p style={styles.text}>
            Paid subscriptions unlock premium distribution
            tools, analytics, royalty systems,
            and advanced artist features.
          </p>

          <p style={styles.text}>
            Subscription payments are processed securely
            through trusted payment providers including Stripe.
          </p>

          <p style={styles.text}>
            Fees are non-refundable unless required by law
            or approved directly by Kasuku support.
          </p>
        </div>

        {/* SECTION */}
        <div style={styles.card}>
          <h2 style={styles.heading}>
            5. Royalties & Earnings
          </h2>

          <p style={styles.text}>
            Royalties displayed inside Kasuku dashboards
            are based on reports received from
            digital streaming platforms and partners.
          </p>

          <p style={styles.text}>
            Payment timelines may vary depending on:
          </p>

          <ul style={styles.list}>
            <li>DSP reporting delays</li>
            <li>Bank processing times</li>
            <li>Verification reviews</li>
            <li>Tax or compliance checks</li>
          </ul>

          <p style={styles.text}>
            Kasuku is not responsible for delays caused
            by third-party payment processors,
            distributors, banks, or DSP systems.
          </p>
        </div>

        {/* SECTION */}
        <div style={styles.card}>
          <h2 style={styles.heading}>
            6. Platform Rules
          </h2>

          <p style={styles.text}>
            Users may not upload or distribute:
          </p>

          <ul style={styles.list}>
            <li>Fraudulent streams or artificial engagement</li>
            <li>Stolen music or copyrighted content</li>
            <li>Hate speech or illegal material</li>
            <li>Spam releases or misleading metadata</li>
            <li>Impersonation of artists or brands</li>
          </ul>

          <p style={styles.text}>
            Violations may result in account suspension,
            frozen royalties, release takedowns,
            or permanent removal from Kasuku.
          </p>
        </div>

        {/* SECTION */}
        <div style={styles.card}>
          <h2 style={styles.heading}>
            7. Account Security
          </h2>

          <p style={styles.text}>
            You are responsible for maintaining the security
            of your account credentials, payment methods,
            and login information.
          </p>

          <p style={styles.text}>
            Kasuku is not liable for unauthorized access
            caused by compromised passwords,
            device theft, phishing attacks,
            or user negligence.
          </p>
        </div>

        {/* SECTION */}
        <div style={styles.card}>
          <h2 style={styles.heading}>
            8. Changes to Terms
          </h2>

          <p style={styles.text}>
            Kasuku may update or modify these Terms
            at any time to improve platform security,
            legal compliance, services,
            or operational functionality.
          </p>

          <p style={styles.text}>
            Continued use of Kasuku after updates
            means you accept the revised Terms.
          </p>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          © {new Date().getFullYear()} Kasuku.
          All rights reserved.
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
    fontSize: 42,
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
    fontSize: 24,
    marginBottom: 18,
    color: '#fff',
  },

  text: {
    color: '#b8b8b8',
    lineHeight: 1.9,
    fontSize: 15,
    marginBottom: 18,
  },

  list: {
    color: '#d0d0d0',
    paddingLeft: 22,
    lineHeight: 2,
    marginBottom: 15,
  },

  footer: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
    fontSize: 13,
    letterSpacing: 1,
  },
};