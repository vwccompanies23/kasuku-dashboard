import { useNavigate } from 'react-router-dom';

export default function DashboardFooter() {
  const navigate = useNavigate();

  return (
    <div style={styles.footer}>

      <span style={styles.link} onClick={() => navigate('/terms')}>
        Terms
      </span>

      <span style={styles.link} onClick={() => navigate('/privacy')}>
        Privacy
      </span>

      <span style={styles.link}>
        © {new Date().getFullYear()} Kasuku
      </span>

    </div>
  );
}

const styles = {
  footer: {
    marginTop: 50,
    paddingTop: 20,
    borderTop: '1px solid #222',
    display: 'flex',
    justifyContent: 'center',
    gap: 40,
    fontSize: 13,
  },

  link: {
    cursor: 'pointer',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    transition: '0.3s',
  },
};