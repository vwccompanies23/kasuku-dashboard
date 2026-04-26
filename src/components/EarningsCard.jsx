export default function EarningsCard({ total }) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #ff003c, #7b00ff)',
        padding: 20,
        borderRadius: 12,
        marginTop: 20,
      }}
    >
      <h2>Total Earnings</h2>
      <h1>${total}</h1>
    </div>
  );
}