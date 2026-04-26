export default function Privacy() {
  return (
    <div style={styles.container}>
      <h1>Privacy Policy</h1>

      <p>
        We collect basic user information such as email and music data to provide
        our services.
      </p>

      <p>
        Your data is not sold to third parties.
      </p>

      <p>
        Payments and financial data are handled securely.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    color: '#fff',
  },
};