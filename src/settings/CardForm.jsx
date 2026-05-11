import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kasukuLogo from '../assets/kasuku-logo.png';

export default function CardForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    number: '',
    name: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
  });

  // 🔥 detect card brand
  const detectBrand = (number) => {
    const cleaned = number.replace(/\s/g, '');

    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';

    return 'unknown';
  };

  const brand = detectBrand(form.number);

  // 🔥 format card number
  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === 'number') {
      value = formatCardNumber(value);
    }

    setForm({ ...form, [e.target.name]: value });
  };

  // ✅ GO TO VERIFY WITH CARD DATA
  const goToVerify = () => {
    navigate('/verify', {
      state: {
        cardData: form,
        from: 'card', // 🔥 VERY IMPORTANT
      },
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💳 Add / Update Card</h1>

      {/* CARD PREVIEW */}
      <div style={styles.preview}>
        <div style={styles.card}>

          {/* TOP */}
          <div style={styles.top}>
            <div style={styles.chip}></div>

            {/* BRAND */}
            <div style={styles.brand}>
              {brand === 'visa' && 'VISA'}
              {brand === 'mastercard' && 'MC'}
            </div>
          </div>

          {/* 🔥 LOGO TOP RIGHT */}
          <img src={kasukuLogo} style={styles.logo} />

          {/* NUMBER */}
          <div style={styles.number}>
            {form.number || '**** **** **** ****'}
          </div>

          {/* BOTTOM */}
          <div style={styles.bottom}>
            <div>
              <p style={styles.label}>CARD HOLDER</p>
              <p>{form.name || 'YOUR NAME'}</p>
            </div>

            <div>
              <p style={styles.label}>EXPIRES</p>
              <p>
                {form.exp_month || 'MM'}/{form.exp_year || 'YY'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.form}>
        <input
          name="number"
          placeholder="Card Number"
          value={form.number}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="name"
          placeholder="Card Holder Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.row}>
          <input
            name="exp_month"
            placeholder="MM"
            value={form.exp_month}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="exp_year"
            placeholder="YY"
            value={form.exp_year}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="cvc"
            placeholder="CVC"
            value={form.cvc}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button onClick={goToVerify} style={styles.button}>
          Verify & Save 💳
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
    background: 'linear-gradient(135deg,#ff003c,#7c3aed)',
    boxShadow: '0 0 40px rgba(124,58,237,0.6)',
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

  // ✅ LOGO FIXED POSITION
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
    border: '1px solid rgba(255,255,255,0.1)',
    background: '#111',
    color: '#fff',
  },

  row: {
    display: 'flex',
    gap: 10,
  },

  button: {
    padding: 14,
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};