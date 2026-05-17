import logo from '../assets/kasuku-logo.png';

export default function DMCA() {
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
          DMCA & Copyright Policy
        </h1>

        <p style={styles.subtitle}>
          Kasuku respects the intellectual property rights
          of artists, creators, labels, publishers,
          and copyright owners across our music platform.
        </p>

      </div>

      {/* CONTENT */}
      <div style={styles.container}>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            1. Copyright Protection
          </h2>

          <p style={styles.text}>
            Users of Kasuku may not upload, distribute,
            publish, transmit, or make available content
            that infringes copyrights, trademarks,
            or intellectual property rights owned by others.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            2. Filing a DMCA Takedown Notice
          </h2>

          <p style={styles.text}>
            If you believe content available on Kasuku
            infringes your copyright, you may submit
            a written DMCA notice including:
          </p>

          <ul style={styles.list}>
            <li>Your legal name and contact information</li>
            <li>Description of the copyrighted work</li>
            <li>URL of the infringing material</li>
            <li>
              A statement that you believe the use
              is unauthorized
            </li>
            <li>
              A statement confirming the notice is accurate
            </li>
            <li>Your physical or electronic signature</li>
          </ul>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            3. DMCA Contact Information
          </h2>

          <p style={styles.text}>
            DMCA Agent
            <br /><br />

            Kasuku
            <br />
            Operated by VWC INC
            <br />
            copyright@kasuku.com
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            4. Counter Notification
          </h2>

          <p style={styles.text}>
            If you believe your content was removed
            by mistake or misidentification,
            you may submit a counter-notification.
          </p>

          <p style={styles.text}>
            Upon receipt of a valid counter-notification,
            Kasuku may restore removed content unless
            the original complainant files legal action
            within the required timeframe.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            5. Repeat Infringers
          </h2>

          <p style={styles.text}>
            Kasuku reserves the right to suspend
            or permanently terminate accounts
            involved in repeated copyright violations.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            6. False Claims
          </h2>

          <p style={styles.text}>
            Submitting false or misleading
            copyright claims may result in legal liability.
            Please ensure all information submitted
            is truthful and accurate.
          </p>

        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          ©️ {new Date().getFullYear()} Kasuku.
          Copyright Protection & Artist Rights Reserved.
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