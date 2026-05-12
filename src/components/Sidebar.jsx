import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/Kasuku-logo.png';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user') || '{}')
  );

  // 🔥 AUTO UPDATE USER
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = JSON.parse(
        localStorage.getItem('user') || '{}'
      );

      setUser(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isAdmin = user?.role === 'admin';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.reload();
  };

  // 👤 USER MENU
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

  // 👑 ADMIN MENU
  const adminMenu = [
    { name: 'Users', path: '/admin/users' },
    { name: 'Email Center', path: '/admin/email' },
    { name: 'Approvals', path: '/admin/approvals' },
    { name: 'Revenue', path: '/admin/revenue' },
    { name: 'Subscriptions', path: '/admin/subscriptions' },
    { name: 'Referrals', path: '/admin/referrals' },
    { name: 'Activity', path: '/admin/activity' },
  ];

  const menu = isAdmin ? adminMenu : userMenu;

  return (
    <div style={styles.sidebar}>
      {/* 🔥 TOP */}
      <div>
        {/* LOGO */}
        <div style={styles.logoWrap}>
          <img
            src={logo}
            alt="Kasuku"
            style={styles.logoImg}
          />

          <h2 style={styles.logoText}>KASUKU</h2>
        </div>

        {/* MENU */}
        <div style={styles.menu}>
          {menu.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  ...styles.menuItem,
                  ...(active ? styles.active : {}),
                }}
              >
                {item.icon
                  ? item.icon + ' '
                  : ''}

                {item.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔥 USER CARD */}
      <div style={styles.userCard}>
        {/* PROFILE IMAGE */}
        {user?.avatar ? (
          <img
            src={user?.avatar}
            alt="profile"
            style={styles.avatar}
          />
        ) : (
          <div style={styles.emptyAvatar}>
            👤
          </div>
        )}

        {/* USERNAME */}
        <div style={styles.username}>
          {user?.username ||
            user?.name ||
            'Artist'}
        </div>

        {/* PLAN */}
        <div style={styles.plan}>
          {user?.plan
            ? `${user.plan} Plan`
            : 'Free Plan'}
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={styles.logout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: 230,
    background:
      'linear-gradient(180deg, #0f0f0f, #050505)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: '1px solid #1f1f1f',
  },

  logoWrap: {
    textAlign: 'center',
    marginBottom: 25,
  },

  logoImg: {
    width: 55,
    marginBottom: 5,
  },

  logoText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  menuItem: {
    color: '#aaa',
    cursor: 'pointer',
    padding: 12,
    borderRadius: 12,
    transition: '0.2s',
    fontWeight: '600',
  },

  active: {
    color: '#fff',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    boxShadow:
      '0 0 25px rgba(124,58,237,0.35)',
  },

  // 🔥 USER CARD
  userCard: {
    marginTop: 30,
    borderRadius: 22,
    padding: 18,
    background:
      'linear-gradient(180deg,#111,#0a0a0a)',
    border: '1px solid rgba(255,255,255,0.06)',
    textAlign: 'center',
  },

  avatar: {
    width: 95,
    height: 95,
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: 12,
    border: '3px solid #7c3aed',
    boxShadow:
      '0 0 25px rgba(124,58,237,0.6)',
  },

  emptyAvatar: {
    width: 95,
    height: 95,
    borderRadius: '50%',
    background:
      'linear-gradient(135deg,#1f1f1f,#111)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px auto',
    fontSize: 32,
    color: '#777',
    border: '2px solid #222',
  },

  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },

  plan: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 18,
  },

  logout: {
    width: '100%',
    padding: 12,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    border: 'none',
    borderRadius: 12,
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 15,
  },
};