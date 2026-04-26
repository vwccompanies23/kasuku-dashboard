import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Kasuku-logo.png'; // ✅ FIX LOGO

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin'); // ✅ detect admin

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  // 👤 USER MENU (UNCHANGED)
  const userMenu = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'New Release', path: '/upload', icon: '⬆️' },
    { name: 'My Releases', path: '/my-music', icon: '🎶' },
    { name: 'Analytics', path: '/analytics', icon: '📈' },
    { name: 'Royalties', path: '/royalties', icon: '💰' },
    { name: 'Withdraw', path: '/withdraw', icon: '💸' },
    { name: 'Stripe', path: '/connect-stripe', icon: '💳' },
    { name: 'Reports', path: '/report', icon: '📊' },
  ];

  // 👑 ADMIN MENU (NEW — THIS FIXES YOUR ISSUE)
  const adminMenu = [
    { name: 'Users', path: '/admin/users' },
    { name: 'Email Center', path: '/admin/email' },
    { name: 'Approvals', path: '/admin/approvals' },
    { name: 'Revenue', path: '/admin/revenue' },
    { name: 'Subscriptions', path: '/admin/subscriptions' }, // ✅ FIXED
    { name: 'Referrals', path: '/admin/referrals' },
    { name: 'Activity', path: '/admin/activity' },
  ];

  const menu = isAdmin ? adminMenu : userMenu;

  return (
    <div style={styles.sidebar}>
      {/* ✅ LOGO FIX */}
      <div style={styles.logoWrap}>
        <img src={logo} alt="Kasuku" style={styles.logoImg} />
        <h2 style={styles.logoText}>KASUKU</h2>
      </div>

      <div style={styles.menu}>
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.menuItem,
                ...(active ? styles.active : {}),
              }}
            >
              {item.icon ? item.icon + ' ' : ''}{item.name}
            </div>
          );
        })}
      </div>

      <button onClick={logout} style={styles.logout}>
        🚪 Logout
      </button>
    </div>
  );
}

const styles = {
  sidebar: {
    width: 230,
    background: 'linear-gradient(180deg, #0f0f0f, #050505)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: '1px solid #1f1f1f',
  },

  logoWrap: {
    textAlign: 'center',
    marginBottom: 20,
  },

  logoImg: {
    width: 50,
    marginBottom: 5,
  },

  logoText: {
    color: '#ff003c',
  },

  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  menuItem: {
    color: '#aaa',
    cursor: 'pointer',
    padding: 10,
    borderRadius: 8,
  },

  active: {
    color: '#fff',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
  },

  logout: {
    padding: 10,
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    borderRadius: 8,
    color: '#fff',
    cursor: 'pointer',
  },
};