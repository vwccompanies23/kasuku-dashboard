export default function AdminCopyrightRejected() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        ❌ Rejected Claims
      </h1>

      <p style={styles.text}>
        Rejected copyright reports.
      </p>
    </div>
  );
}

const styles: any = {
  page: {
    padding: 30,
    color: '#fff',
  },

  title: {
    fontSize: 32,
    marginBottom: 20,
  },

  text: {
    color: '#aaa',
  },
};