import { useNavigate } from 'react-router-dom';

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>❌ Payment Cancelled</h1>
        <p>No worries, you can try again anytime.</p>

        <button
          onClick={() => navigate('/settings')}
          style={styles.btn}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#000',
    color: '#fff',
  },
  card: {
    background: '#111',
    padding: 30,
    borderRadius: 12,
    textAlign: 'center',
  },
  btn: {
    marginTop: 15,
    padding: 10,
    background: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
};