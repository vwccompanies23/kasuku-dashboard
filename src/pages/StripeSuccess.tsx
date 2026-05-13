import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/kasuku-logo.png';

export default function StripeSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/connect-stripe');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #1a1a2e 0%, #0f0f1a 55%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(24, 24, 40, 0.95)',
          padding: '60px 50px',
          borderRadius: '28px',
          textAlign: 'center',
          width: '100%',
          maxWidth: '620px',
          boxShadow: '0 0 60px rgba(255,0,128,0.18)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <img
          src={logo}
          alt="Kasuku"
          style={{
            width: '95px',
            marginBottom: '30px',
          }}
        />

        <div
          style={{
            width: '90px',
            height: '90px',
            margin: '0 auto 30px',
            borderRadius: '50%',
            background:
              'linear-gradient(to right, #ff0080, #7928ca)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '42px',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 0 40px rgba(255,0,128,0.35)',
          }}
        >
          ✓
        </div>

        <h1
          style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '18px',
            lineHeight: '1.2',
            background:
              'linear-gradient(to right, #ff0080, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Stripe Connected Successfully
        </h1>

        <p
          style={{
            color: '#c7c7d9',
            fontSize: '19px',
            lineHeight: '1.9',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          Your payout account has been securely verified and connected to Kasuku.
          <br />
          <br />
          You can now receive royalties, withdrawals, and future earnings directly through Stripe with protected and reliable payouts.
        </p>

        <div
          style={{
            marginTop: '40px',
            width: '100%',
            height: '7px',
            background: '#2a2a40',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background:
                'linear-gradient(to right, #ff0080, #7928ca)',
              animation: 'load 4s linear forwards',
            }}
          />
        </div>

        <p
          style={{
            marginTop: '18px',
            color: '#8f8fa8',
            fontSize: '14px',
            letterSpacing: '0.5px',
          }}
        >
          Redirecting you back to your dashboard...
        </p>
      </div>

      <style>
        {`
          @keyframes load {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0%);
            }
          }
        `}
      </style>
    </div>
  );
}