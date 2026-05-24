import logo from '../assets/kasuku-logo.png';

import {
  useLanguage,
} from '../LanguageContext';

import translations
from '../translations';

export default function DMCA() {

  const {
    lang,
  } = useLanguage();

  const t =
    translations?.[lang] ||
    translations.en;

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
          {t?.dmcaTitle ||
            'DMCA & Copyright Policy'}
        </h1>

        <p style={styles.subtitle}>
          {t?.dmcaSubtitle ||
            `Kasuku respects the intellectual property rights
            of artists, creators, labels, publishers,
            and copyright owners across our music platform.`}
        </p>

      </div>

      {/* CONTENT */}

      <div style={styles.container}>

        {/* SECTION 1 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>
            {t?.copyrightProtection ||
              '1. Copyright Protection'}
          </h2>

          <p style={styles.text}>
            {t?.copyrightProtectionText ||
              `Users of Kasuku may not upload, distribute,
              publish, transmit, or make available content
              that infringes copyrights, trademarks,
              or intellectual property rights owned by others.`}
          </p>

        </div>

        {/* SECTION 2 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>
            {t?.dmcaNotice ||
              '2. Filing a DMCA Takedown Notice'}
          </h2>

          <p style={styles.text}>
            {t?.dmcaNoticeText ||
              `If you believe content available on Kasuku
              infringes your copyright, you may submit
              a written DMCA notice including:`}
          </p>

          <ul style={styles.list}>

            <li>
              {t?.legalName ||
                'Your legal name and contact information'}
            </li>

            <li>
              {t?.copyrightWork ||
                'Description of the copyrighted work'}
            </li>

            <li>
              {t?.infringingUrl ||
                'URL of the infringing material'}
            </li>

            <li>
              {t?.unauthorizedStatement ||
                'A statement that you believe the use is unauthorized'}
            </li>

            <li>
              {t?.accurateStatement ||
                'A statement confirming the notice is accurate'}
            </li>

            <li>
              {t?.signature ||
                'Your physical or electronic signature'}
            </li>

          </ul>

        </div>

        {/* SECTION 3 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>
            {t?.dmcaContact ||
              '3. DMCA Contact Information'}
          </h2>

          <p style={styles.text}>

            DMCA Agent

            <br />
            <br />

            Kasuku

            <br />

            Operated by VWC INC

            <br />

            copyright@kasuku.com

          </p>

        </div>

        {/* SECTION 4 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>
            {t?.counterNotification ||
              '4. Counter Notification'}
          </h2>

          <p style={styles.text}>
            {t?.counterNotificationText ||
              `If you believe your content was removed
              by mistake or misidentification,
              you may submit a counter-notification.`}
          </p>

          <p style={styles.text}>
            {t?.counterNotificationText2 ||
              `Upon receipt of a valid counter-notification,
              Kasuku may restore removed content unless
              the original complainant files legal action
              within the required timeframe.`}
          </p>

        </div>

        {/* SECTION 5 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>
            {t?.repeatInfringers ||
              '5. Repeat Infringers'}
          </h2>

          <p style={styles.text}>
            {t?.repeatInfringersText ||
              `Kasuku reserves the right to suspend
              or permanently terminate accounts
              involved in repeated copyright violations.`}
          </p>

        </div>

        {/* SECTION 6 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>
            {t?.falseClaims ||
              '6. False Claims'}
          </h2>

          <p style={styles.text}>
            {t?.falseClaimsText ||
              `Submitting false or misleading
              copyright claims may result in legal liability.
              Please ensure all information submitted
              is truthful and accurate.`}
          </p>

        </div>

        {/* FOOTER */}

        <div style={styles.footer}>

          ©️ {new Date().getFullYear()} Kasuku.

          <br />

          {t?.copyrightFooter ||
            'Copyright Protection & Artist Rights Reserved.'}

        </div>

      </div>

    </div>

  );
}

const styles = {

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

    WebkitBackgroundClip: 'text',

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

    maxWidth: 1050,

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

    marginBottom: 26,

    backdropFilter: 'blur(18px)',

    boxShadow:
      '0 0 30px rgba(124,58,237,0.15)',

    width: '100%',

    boxSizing: 'border-box',

    overflow: 'hidden',
  },

  heading: {

    fontSize:
      'clamp(22px, 5vw, 32px)',

    marginBottom: 18,

    color: '#fff',

    lineHeight: 1.3,

    wordBreak: 'break-word',
  },

  text: {

    color: '#b8b8b8',

    lineHeight: 1.9,

    fontSize:
      'clamp(14px, 2vw, 17px)',

    marginBottom: 18,

    wordBreak: 'break-word',
  },

  list: {

    color: '#d0d0d0',

    paddingLeft: 24,

    lineHeight: 2,

    fontSize:
      'clamp(14px, 2vw, 17px)',

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