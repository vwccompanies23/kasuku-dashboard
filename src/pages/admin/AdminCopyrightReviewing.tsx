export default function AdminCopyrightReviewing() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        👀 Reviewing Claims
      </h1>

      <p style={styles.text}>
        Claims currently under review.
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