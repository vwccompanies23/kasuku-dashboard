export default function Terms() {
  return (
    <div style={styles.container}>
      <h1>Terms of Service</h1>

      <p>
        Welcome to Kasuku. By using this platform, you agree to distribute music
        and manage earnings through our system.
      </p>

      <p>
        We do not guarantee revenue and are not responsible for third-party
        distributor payouts.
      </p>

      <p>
        By uploading content, you confirm you own the rights to distribute it.
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