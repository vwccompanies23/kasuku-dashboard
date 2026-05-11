export default function DeleteAccount() {
  return (
    <div style={{ color: '#fff' }}>
      <h1>⚠️ Delete Account</h1>

      <p>
        This action is permanent. All your music and data will be removed.
      </p>

      <button style={{
        padding: 14,
        background: 'red',
        color: '#fff',
        border: 'none',
        borderRadius: 10
      }}>
        Delete My Account
      </button>
    </div>
  );
}