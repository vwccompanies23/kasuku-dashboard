import logo from '../assets/kasuku-logo.png';

import {
  useLanguage,
} from '../LanguageContext';

import translations
from '../translations';

export default function Terms() {

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

          {t?.termsTitle ||
            'Terms of Service'}

        </h1>

        <p style={styles.subtitle}>

          {t?.termsSubtitle ||
            `These Terms govern your use of Kasuku music distribution,
            royalty systems, artist tools, analytics services,
            and platform infrastructure.`}

        </p>

      </div>

      {/* CONTENT */}

      <div style={styles.container}>

        {/* SECTION 1 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.acceptanceOfTerms ||
              '1. Acceptance of Terms'}

          </h2>

          <p style={styles.text}>

            {t?.acceptanceOfTermsText1 ||
              `By accessing or using Kasuku, you agree to comply
              with these Terms of Service, our platform policies,
              and all applicable laws regarding music ownership,
              copyright, monetization, and digital distribution.`}

          </p>

          <p style={styles.text}>

            {t?.acceptanceOfTermsText2 ||
              `If you do not agree with any part of these Terms,
              you may not use the Kasuku platform.`}

          </p>

        </div>

        {/* SECTION 2 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.musicOwnershipRights ||
              '2. Music Ownership & Rights'}

          </h2>

          <p style={styles.text}>

            {t?.musicOwnershipRightsText ||
              `By uploading music, artwork, videos, metadata,
              or other content to Kasuku, you confirm that:`}

          </p>

          <ul style={styles.list}>

            <li>
              {t?.rightsItem1 ||
                'You own or control all distribution rights.'}
            </li>

            <li>
              {t?.rightsItem2 ||
                'Your content does not infringe copyrights.'}
            </li>

            <li>
              {t?.rightsItem3 ||
                'You have permission from collaborators and producers.'}
            </li>

            <li>
              {t?.rightsItem4 ||
                'Your releases comply with DSP platform policies.'}
            </li>

          </ul>

          <p style={styles.text}>

            {t?.rightsBottomText ||
              `Kasuku reserves the right to remove content that
              violates copyright laws, trademark protections,
              or platform guidelines.`}

          </p>

        </div>

        {/* SECTION 3 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.distributionServices ||
              '3. Distribution Services'}

          </h2>

          <p style={styles.text}>

            {t?.distributionServicesText1 ||
              `Kasuku distributes music to supported streaming
              platforms and digital music services worldwide.
              Delivery times may vary depending on third-party
              platform processing schedules.`}

          </p>

          <p style={styles.text}>

            {t?.distributionServicesText2 ||
              `We do not guarantee playlist placements,
              streaming performance, audience growth,
              royalties, or financial earnings.`}

          </p>

          <p style={styles.text}>

            {t?.distributionServicesText3 ||
              `Some platforms may reject releases due to
              metadata issues, artwork violations,
              copyright claims, spam detection,
              or policy enforcement.`}

          </p>

        </div>

        {/* SECTION 4 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.paymentsSubscriptions ||
              '4. Payments & Subscriptions'}

          </h2>

          <p style={styles.text}>

            {t?.paymentsSubscriptionsText1 ||
              `Paid subscriptions unlock premium distribution
              tools, analytics, royalty systems,
              and advanced artist features.`}

          </p>

          <p style={styles.text}>

            {t?.paymentsSubscriptionsText2 ||
              `Subscription payments are processed securely
              through trusted payment providers including Stripe.`}

          </p>

          <p style={styles.text}>

            {t?.paymentsSubscriptionsText3 ||
              `Fees are non-refundable unless required by law
              or approved directly by Kasuku support.`}

          </p>

        </div>

        {/* SECTION 5 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.royaltiesEarnings ||
              '5. Royalties & Earnings'}

          </h2>

          <p style={styles.text}>

            {t?.royaltiesEarningsText1 ||
              `Royalties displayed inside Kasuku dashboards
              are based on reports received from
              digital streaming platforms and partners.`}

          </p>

          <p style={styles.text}>

            {t?.royaltiesEarningsText2 ||
              `Payment timelines may vary depending on:`}

          </p>

          <ul style={styles.list}>

            <li>
              {t?.royaltyItem1 ||
                'DSP reporting delays'}
            </li>

            <li>
              {t?.royaltyItem2 ||
                'Bank processing times'}
            </li>

            <li>
              {t?.royaltyItem3 ||
                'Verification reviews'}
            </li>

            <li>
              {t?.royaltyItem4 ||
                'Tax or compliance checks'}
            </li>

          </ul>

          <p style={styles.text}>

            {t?.royaltiesBottomText ||
              `Kasuku is not responsible for delays caused
              by third-party payment processors,
              distributors, banks, or DSP systems.`}

          </p>

        </div>

        {/* SECTION 6 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.platformRules ||
              '6. Platform Rules'}

          </h2>

          <p style={styles.text}>

            {t?.platformRulesText ||
              `Users may not upload or distribute:`}

          </p>

          <ul style={styles.list}>

            <li>
              {t?.platformRule1 ||
                'Fraudulent streams or artificial engagement'}
            </li>

            <li>
              {t?.platformRule2 ||
                'Stolen music or copyrighted content'}
            </li>

            <li>
              {t?.platformRule3 ||
                'Hate speech or illegal material'}
            </li>

            <li>
              {t?.platformRule4 ||
                'Spam releases or misleading metadata'}
            </li>

            <li>
              {t?.platformRule5 ||
                'Impersonation of artists or brands'}
            </li>

          </ul>

          <p style={styles.text}>

            {t?.platformRulesBottom ||
              `Violations may result in account suspension,
              frozen royalties, release takedowns,
              or permanent removal from Kasuku.`}

          </p>

        </div>

        {/* SECTION 7 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.accountSecurity ||
              '7. Account Security'}

          </h2>

          <p style={styles.text}>

            {t?.accountSecurityText1 ||
              `You are responsible for maintaining the security
              of your account credentials, payment methods,
              and login information.`}

          </p>

          <p style={styles.text}>

            {t?.accountSecurityText2 ||
              `Kasuku is not liable for unauthorized access
              caused by compromised passwords,
              device theft, phishing attacks,
              or user negligence.`}

          </p>

        </div>

        {/* SECTION 8 */}

        <div style={styles.card}>

          <h2 style={styles.heading}>

            {t?.changesToTerms ||
              '8. Changes to Terms'}

          </h2>

          <p style={styles.text}>

            {t?.changesToTermsText1 ||
              `Kasuku may update or modify these Terms
              at any time to improve platform security,
              legal compliance, services,
              or operational functionality.`}

          </p>

          <p style={styles.text}>

            {t?.changesToTermsText2 ||
              `Continued use of Kasuku after updates
              means you accept the revised Terms.`}

          </p>

        </div>

        {/* FOOTER */}

        <div style={styles.footer}>

          ©️ {new Date().getFullYear()} Kasuku.

          <br />

          {t?.termsFooter ||
            'All rights reserved.'}

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