export default function DoneStep() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>✅ Setup Complete</h2>
      <p>Your payout account is ready.</p>

      <a href="/withdraw">
        <button style={styles.btn}>Go to Withdraw</button>
      </a>
    </div>
  );
}

const styles = {
  btn: {
    padding: 12,
    marginTop: 20,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 8,
  },
};