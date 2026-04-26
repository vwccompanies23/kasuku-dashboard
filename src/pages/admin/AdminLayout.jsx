import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/kasuku-logo.png';
import { Outlet } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: 'Users', path: '/admin/users' },
    { name: 'Email Center', path: '/admin/email' },
    { name: 'Approvals', path: '/admin/approvals' },
    { name: 'Subscriptions', path: '/admin/subscriptions' },
    { name: 'Referrals', path: '/admin/referrals' },
    { name: 'Activity', path: '/admin/activity' },
    { name: 'Analytics', path: '/admin/analytics' },
    { name: 'Posts', path: '/admin/posts' },
    { name: 'Revenue', path: '/admin/revenue' },

    { name: 'Payout History', path: '/admin/payouts' },
     { name: 'Finance', path: '/admin/finance' },
     { name: 'Tax Approvals', path: '/admin/tax' },

    { name: 'Withdraw', path: '/admin/withdraw' }
  ];

  return (
    <div style={styles.layout}>
      
      <div style={styles.sidebar}>
        
        <div>
          <div style={styles.logoContainer}>
            <img src={logo} style={styles.logo} />
            <h2 style={{ margin: 0 }}>KASUKU</h2>
          </div>

          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  ...styles.link,
                  ...(active ? styles.active : {}),
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        {/* 🔥 ALWAYS VISIBLE */}
        <div
          onClick={() => navigate('/dashboard')}
          style={styles.backBtn}
        >
          ← Back to Dashboard
        </div>

      </div>

      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#0b0f19', color: '#fff' },

  sidebar: {
    width: 240,
    background: '#000',
    padding: 20,
    borderRight: '1px solid #1f2937',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // 🔥 KEY FIX
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },

  logo: { width: 40, height: 40 },

  link: {
    padding: 12,
    borderRadius: 10,
    cursor: 'pointer',
    marginBottom: 8,
  },

  active: {
    background: 'linear-gradient(135deg, #ff003c, #7c3aed)',
  },

  backBtn: {
    padding: 12,
    borderRadius: 10,
    cursor: 'pointer',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    textAlign: 'center',
  },

  content: { flex: 1, padding: 30 },
};