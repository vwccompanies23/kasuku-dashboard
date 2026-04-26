import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  // 🔥 NEW: GET USER FROM TOKEN (FIXED FOREVER)
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      setUser({
        userId: payload.userId,
        email: payload.email,
        artistName: payload.artistName,
        isAdmin: payload.isAdmin || false,
      });

    } catch (err) {
      console.log('Invalid token → clearing');

      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const menu = [
    { name: '📊 Dashboard', path: '/dashboard' },
    { name: '⬆️ New Release', path: '/upload' },
    { name: '🎶 My Releases', path: '/my-music' },
    { name: '📈 Analytics', path: '/analytics' },
    { name: '💰 Royalties', path: '/royalties' },
    { name: '💸 Withdraw', path: '/withdraw' },
    { name: '💳 Stripe', path: '/connect-stripe' },
    { name: '👤 Profile', path: '/profile' },
    { name: '⚙️ Settings', path: '/settings' },
  ];

  return (
    <div style={styles.container}>
      
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🎵 KASUKU</h2>

        {/* 🚀 PRO BADGE */}
        {user?.subscriptionActive && (
          <div style={styles.proBadge}>🚀 PRO</div>
        )}

        <div style={styles.menu}>
          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  ...styles.item,
                  ...(active ? styles.active : {}),
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        {/* 👑 ADMIN BUTTON */}
        {user?.isAdmin && (
          <div
            onClick={() => navigate('/admin')}
            style={styles.item}
          >
            👑 Admin
          </div>
        )}

        {/* USER INFO */}
        <div style={styles.bottom}>
          <div style={styles.user}>
            👤 {user?.artistName || user?.email || 'User'}
          </div>

          <div style={styles.plan}>
            {user?.subscriptionActive ? 'Subscribed ✅' : 'Free Plan'}
          </div>

          <button style={styles.logout} onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {children}
      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    background: 'radial-gradient(circle at top, #0a0a0a, #000)',
    color: '#fff',
  },

  sidebar: {
    width: 230,
    background: 'linear-gradient(180deg, #0f0f0f, #050505)',
    borderRight: '1px solid #222',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },

  logo: {
    color: '#ff003c',
    marginBottom: 10,
    fontWeight: 'bold',
  },

  proBadge: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    padding: '6px 10px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  item: {
    padding: 10,
    borderRadius: 8,
    cursor: 'pointer',
    color: '#aaa',
  },

  active: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
  },

  bottom: {
    marginTop: 20,
  },

  user: {
    marginBottom: 5,
    color: '#ccc',
  },

  plan: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },

  logout: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    cursor: 'pointer',
  },

  main: {
    flex: 1,
    padding: 25,
    overflowY: 'auto',
  },
};