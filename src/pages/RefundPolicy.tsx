import logo from '../assets/kasuku-logo.png';

export default function RefundPolicy() {
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
          Refund Policy
        </h1>

        <p style={styles.subtitle}>
          This Refund Policy explains how subscription payments,
          billing disputes, and refund requests are handled
          across the Kasuku platform.
        </p>

      </div>

      {/* CONTENT */}
      <div style={styles.container}>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            1. Subscription Payments
          </h2>

          <p style={styles.text}>
            Kasuku provides digital music distribution
            and artist platform services through recurring
            subscription plans.
          </p>

          <p style={styles.text}>
            By purchasing a subscription, users agree
            to the pricing, billing cycle, and features
            associated with their selected plan.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            2. Non-Refundable Services
          </h2>

          <p style={styles.text}>
            Due to the digital nature of music distribution,
            subscription fees and completed platform services
            are generally non-refundable.
          </p>

          <p style={styles.text}>
            This includes:
          </p>

          <ul style={styles.list}>
            <li>Music distribution submissions</li>
            <li>Active subscription periods</li>
            <li>Delivered analytics and reports</li>
            <li>Released content on streaming platforms</li>
            <li>Verification or promotional services</li>
          </ul>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            3. Billing Errors
          </h2>

          <p style={styles.text}>
            If you believe you were charged incorrectly,
            duplicated, or experienced a technical billing issue,
            you may contact Kasuku support for review.
          </p>

          <p style={styles.text}>
            Approved billing corrections may qualify
            for partial or full refunds depending
            on the circumstances.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            4. Subscription Cancellation
          </h2>

          <p style={styles.text}>
            Users may cancel subscriptions at any time
            through their account settings.
          </p>

          <p style={styles.text}>
            Cancellation prevents future billing
            but does not automatically generate refunds
            for previous or active billing periods.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            5. Fraud & Abuse
          </h2>

          <p style={styles.text}>
            Kasuku reserves the right to deny refunds
            in cases involving fraud, abuse,
            policy violations, chargeback misuse,
            or suspicious platform activity.
          </p>

        </div>

        {/* SECTION */}
        <div style={styles.card}>

          <h2 style={styles.heading}>
            6. Contact Support
          </h2>

          <p style={styles.text}>
            For billing questions or refund requests,
            contact:
          </p>

          <p style={styles.text}>
            support@kasukuu.com
          </p>

        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          ©️ {new Date().getFullYear()} Kasuku.
          Billing & Subscription Protection Policy.
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