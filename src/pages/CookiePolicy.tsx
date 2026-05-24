import logo from '../assets/kasuku-logo.png';

import {
  useLanguage,
} from '../LanguageContext';

import translations
from '../translations';

export default function CookiePolicy() {

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

          {t?.cookiePolicyTitle ||
            'Cookie Policy'}

        </h1>

        <p style={styles.subtitle}>

          {t?.cookiePolicySubtitle ||
            `This Cookie Policy explains how Kasuku uses cookies,
            analytics technologies, and related tracking systems
            across our music distribution platform.`}

        </p>

      </div>

      {/* CONTENT */}

      <div style={styles.container}>

        {/* SECTION 1 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.whatAreCookies ||
              '1. What Are Cookies'}

          </h2>

          <p style={styles.text}>

            {t?.whatAreCookiesText ||
              `Cookies are small data files stored on your device
              that help websites remember preferences,
              improve user experience,
              and enhance platform functionality.`}

          </p>

        </div>

        {/* SECTION 2 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.howKasukuUsesCookies ||
              '2. How Kasuku Uses Cookies'}

          </h2>

          <p style={styles.text}>

            {t?.howKasukuUsesCookiesText ||
              `Kasuku uses cookies and similar technologies
              to improve platform performance,
              maintain secure sessions,
              personalize experiences,
              and analyze usage activity.`}

          </p>

          <ul style={styles.list}>

            <li>
              {t?.accountAuthentication ||
                'Account authentication'}
            </li>

            <li>
              {t?.sessionManagement ||
                'Session management'}
            </li>

            <li>
              {t?.languagePreferences ||
                'Language preferences'}
            </li>

            <li>
              {t?.platformAnalytics ||
                'Platform analytics'}
            </li>

            <li>
              {t?.securityMonitoring ||
                'Security monitoring'}
            </li>

            <li>
              {t?.userExperienceOptimization ||
                'User experience optimization'}
            </li>

          </ul>

        </div>

        {/* SECTION 3 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.analyticsTechnologies ||
              '3. Analytics Technologies'}

          </h2>

          <p style={styles.text}>

            {t?.analyticsTechnologiesText ||
              `Kasuku may use analytics tools
              to understand platform traffic,
              feature usage,
              performance metrics,
              and user engagement patterns.`}

          </p>

        </div>

        {/* SECTION 4 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.managingCookies ||
              '4. Managing Cookies'}

          </h2>

          <p style={styles.text}>

            {t?.managingCookiesText ||
              `Users may control or disable cookies
              through browser settings.`}

          </p>

          <p style={styles.text}>

            {t?.managingCookiesText2 ||
              `However, disabling certain cookies
              may affect functionality,
              login sessions,
              and platform performance.`}

          </p>

        </div>

        {/* SECTION 5 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.thirdPartyServices ||
              '5. Third-Party Services'}

          </h2>

          <p style={styles.text}>

            {t?.thirdPartyServicesText ||
              `Some third-party services integrated
              with Kasuku,
              including payment processors
              and analytics providers,
              may also use cookies
              or similar technologies.`}

          </p>

        </div>

        {/* SECTION 6 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.policyUpdates ||
              '6. Policy Updates'}

          </h2>

          <p style={styles.text}>

            {t?.policyUpdatesText ||
              `Kasuku may update this Cookie Policy
              periodically to improve transparency,
              platform operations,
              or legal compliance.`}

          </p>

        </div>

        {/* FOOTER */}

        <div style={styles.footer}>

          ©️ {new Date().getFullYear()} Kasuku.

          <br />

          {t?.cookieFooter ||
            'Cookie & Analytics Transparency Policy.'}

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