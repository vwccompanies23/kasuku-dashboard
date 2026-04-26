import { useState } from 'react';
import AddressStep from "./AddressStep";
import PaymentStep from "./PaymentStep";
import TaxStep from "./TaxStep";
import DoneStep from './DoneStep';

export default function PayoutOnboarding() {
  const [step, setStep] = useState(1);

  const steps = ['Address', 'Payment', 'Tax', 'Done'];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💸 Payout Setup</h1>

      {/* PROGRESS BAR */}
      <div style={styles.progressWrapper}>
        {steps.map((s, i) => (
          <div key={i} style={styles.stepContainer}>
            <div
              style={{
                ...styles.circle,
                background: step >= i + 1
                  ? 'linear-gradient(90deg,#ff003c,#7c3aed)'
                  : '#222',
              }}
            >
              {i + 1}
            </div>
            <span style={styles.label}>{s}</span>
          </div>
        ))}
      </div>

      {/* CARD */}
      <div style={styles.card}>
        {step === 1 && <AddressStep next={() => setStep(2)} />}
        {step === 2 && <PaymentStep next={() => setStep(3)} />}
        {step === 3 && <TaxStep next={() => setStep(4)} />}
        {step === 4 && <DoneStep />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0b0f19',
    color: '#fff',
    padding: 40,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  progressWrapper: {
    display: 'flex',
    gap: 30,
    marginBottom: 30,
  },
  stepContainer: {
    textAlign: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    opacity: 0.7,
  },
  card: {
    background: '#111827',
    padding: 30,
    borderRadius: 16,
    boxShadow: '0 0 40px rgba(124,58,237,0.2)',
  },
};