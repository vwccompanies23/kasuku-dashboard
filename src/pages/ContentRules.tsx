export default function ContentRules() {

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.title}>
          Content Monetization Rules
        </h1>

        <p style={styles.text}>
          These Content Monetization Rules govern
          all music, videos, artwork, audio,
          and digital content distributed through
          the Kasuku platform.
        </p>

        {/* OWNERSHIP */}
        <section style={styles.section}>

          <h2 style={styles.heading}>
            1. Rights Ownership
          </h2>

          <p style={styles.text}>
            Users must own or control all necessary
            rights to any content uploaded to Kasuku.
            By uploading content, you confirm that:
          </p>

          <ul style={styles.list}>
            <li>
              You own the copyrights,
              master recordings,
              and publishing rights
            </li>

            <li>
              OR you have written permission,
              licenses, or authorization
            </li>

            <li>
              Your content does not infringe
              any third-party rights
            </li>
          </ul>

        </section>

        {/* PROHIBITED */}
        <section style={styles.section}>

          <h2 style={styles.heading}>
            2. Prohibited Content
          </h2>

          <p style={styles.text}>
            The following content is strictly prohibited:
          </p>

          <ul style={styles.list}>
            <li>Stolen music or unauthorized uploads</li>
            <li>Fake remixes or unofficial releases</li>
            <li>Impersonation of artists or labels</li>
            <li>Fraudulent royalty claims</li>
            <li>AI-generated voice cloning without consent</li>
            <li>Hate speech or illegal content</li>
            <li>Content violating copyright laws</li>
          </ul>

        </section>

        {/* STREAM FRAUD */}
        <section style={styles.section}>

          <h2 style={styles.heading}>
            3. Artificial Streaming & Fraud
          </h2>

          <p style={styles.text}>
            Kasuku strictly prohibits artificial streaming,
            stream manipulation, playlist fraud,
            bots, click farms, or any activity intended
            to inflate royalties or performance metrics.
          </p>

          <p style={styles.text}>
            Accounts involved in fraudulent activity may:
          </p>

          <ul style={styles.list}>
            <li>Lose monetization access</li>
            <li>Have earnings frozen</li>
            <li>Have releases removed</li>
            <li>Be permanently suspended</li>
          </ul>

        </section>

        {/* COPYRIGHT */}
        <section style={styles.section}>

          <h2 style={styles.heading}>
            4. Copyright Enforcement
          </h2>

          <p style={styles.text}>
            Kasuku respects intellectual property rights
            and responds to valid copyright claims.
            Content reported through our DMCA or
            Copyright Claim system may be reviewed,
            restricted, demonetized, or removed.
          </p>

        </section>

        {/* MONETIZATION */}
        <section style={styles.section}>

          <h2 style={styles.heading}>
            5. Monetization Eligibility
          </h2>

          <p style={styles.text}>
            Monetization is available only to users
            in good standing who comply with all
            platform policies, payment requirements,
            tax verification requirements,
            and copyright regulations.
          </p>

        </section>

        {/* TERMINATION */}
        <section style={styles.section}>

          <h2 style={styles.heading}>
            6. Enforcement Actions
          </h2>

          <p style={styles.text}>
            Kasuku reserves the right to:
          </p>

          <ul style={styles.list}>
            <li>Remove content</li>
            <li>Suspend distributions</li>
            <li>Withhold royalties</li>
            <li>Terminate accounts</li>
            <li>Report illegal activity</li>
          </ul>

        </section>

        <div style={styles.footer}>
          Last Updated: May 2026
        </div>

      </div>

    </div>
  );
}

const styles: any = {

  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top, #140021 0%, #020617 50%, #000 100%)',
    color: '#fff',
    padding: '60px 20px',
  },

  container: {
    maxWidth: 900,
    margin: '0 auto',
  },

  title: {
    fontSize: 'clamp(34px, 6vw, 52px)',
    marginBottom: 30,
    fontWeight: 'bold',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  section: {
    marginBottom: 50,
  },

  heading: {
    fontSize: 26,
    marginBottom: 18,
    color: '#fff',
  },

  text: {
    color: '#b5b5b5',
    lineHeight: 1.9,
    fontSize: 16,
  },

  list: {
    marginTop: 15,
    paddingLeft: 20,
    color: '#d5d5d5',
    lineHeight: 2,
  },

  footer: {
    marginTop: 70,
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
};