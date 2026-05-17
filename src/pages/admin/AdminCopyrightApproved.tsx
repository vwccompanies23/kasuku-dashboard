export default function AdminCopyrightApproved() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        ✅ Approved Claims
      </h1>

      <p style={styles.text}>
        Approved copyright reports.
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