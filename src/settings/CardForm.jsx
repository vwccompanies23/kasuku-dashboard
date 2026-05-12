import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { api } from '../api';
import kasukuLogo from '../assets/kasuku-logo.png';

export default function CardForm() {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const [name, setName] = useState('');

  useEffect(() => {
    createSetupIntent();
  }, []);

  const createSetupIntent = async () => {
    try {
      const res = await api.post('/billing/create-setup-intent');

      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.error(err);
      alert('Failed to initialize Stripe ❌');
    }
  };

  // 🔥 SAVE CARD TO STRIPE
  const saveCard = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);

      const cardNumber =
        elements.getElement(CardNumberElement);

      const result = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: cardNumber,
            billing_details: {
              name,
            },
          },
        },
      );

      if (result.error) {
        alert(result.error.message);
        return;
      }

      await api.post('/billing/save-card', {
        paymentMethodId:
          result.setupIntent.payment_method,
      });

      alert('Card saved successfully 💳');

      navigate('/settings/card');
    } catch (err) {
      console.error(err);

      alert('Failed to save card ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        💳 Add / Update Card
      </h1>

      {/* CARD PREVIEW */}
      <div style={styles.preview}>
        <div style={styles.card}>

          {/* TOP */}
          <div style={styles.top}>
            <div style={styles.chip}></div>

            <div style={styles.brand}>
              STRIPE
            </div>
          </div>

          {/* LOGO */}
          <img
            src={kasukuLogo}
            style={styles.logo}
          />

          {/* NUMBER */}
          <div style={styles.number}>
            **** **** **** ****
          </div>

          {/* BOTTOM */}
          <div style={styles.bottom}>
            <div>
              <p style={styles.label}>
                CARD HOLDER
              </p>

              <p>
                {name || 'YOUR NAME'}
              </p>
            </div>

            <div>
              <p style={styles.label}>
                SECURE
              </p>

              <p>STRIPE</p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.form}>

        {/* CARD HOLDER */}
        <input
          placeholder="Card Holder Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={styles.input}
        />

        {/* CARD NUMBER */}
        <div style={styles.stripeInput}>
          <CardNumberElement
            options={{
              style: {
                base: {
                  color: '#fff',
                  fontSize: '16px',
                  '::placeholder': {
                    color: '#888',
                  },
                },
              },
            }}
          />
        </div>

        {/* ROW */}
        <div style={styles.row}>
          <div style={styles.stripeInput}>
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    color: '#fff',
                    fontSize: '16px',
                    '::placeholder': {
                      color: '#888',
                    },
                  },
                },
              }}
            />
          </div>

          <div style={styles.stripeInput}>
            <CardCvcElement
              options={{
                style: {
                  base: {
                    color: '#fff',
                    fontSize: '16px',
                    '::placeholder': {
                      color: '#888',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveCard}
          disabled={loading}
          style={styles.button}
        >
          {loading
            ? 'Saving Card...'
            : 'Verify & Save 💳'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    color: '#fff',
    maxWidth: 500,
    margin: '0 auto',
  },

  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 20,
  },

  preview: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30,
  },

  card: {
    width: 320,
    height: 200,
    borderRadius: 20,
    padding: 20,
    background:
      'linear-gradient(135deg,#ff003c,#7c3aed)',
    boxShadow:
      '0 0 40px rgba(124,58,237,0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },

  top: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  chip: {
    width: 40,
    height: 30,
    borderRadius: 5,
    background: 'gold',
  },

  brand: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  logo: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 55,
  },

  number: {
    fontSize: 20,
    letterSpacing: 2,
  },

  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 10,
    opacity: 0.7,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  input: {
    padding: 12,
    borderRadius: 10,
    border:
      '1px solid rgba(255,255,255,0.1)',
    background: '#111',
    color: '#fff',
  },

  stripeInput: {
    padding: 16,
    borderRadius: 10,
    border:
      '1px solid rgba(255,255,255,0.1)',
    background: '#111',
  },

  row: {
    display: 'flex',
    gap: 10,
  },

  button: {
    padding: 14,
    borderRadius: 12,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    opacity: 1,
  },
};