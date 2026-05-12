import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  // ✅ GET USER FROM TOKEN
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

const savedUser = JSON.parse(
  localStorage.getItem('user') || '{}'
);

setUser({
  userId: payload.userId,
  email: payload.email,
  artistName:
    savedUser.artistName || payload.artistName,

  avatar: savedUser.avatar || '',

  role: payload.role,

  plan: payload.plan || 1,

  subscriptionActive:
    payload.subscriptionActive || false,

  isAdmin: payload.role === 'admin',
});

    } catch (err) {
      console.log('Invalid token → clearing');

      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  // 🔥 AUTO LOGOUT (30 MINUTES)
  useEffect(() => {
    let timeout;

    const logoutUser = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    };

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        logoutUser();
      }, 30 * 60 * 1000); // ✅ 30 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [navigate]);

  // ✅ LOGOUT BUTTON
  const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  setUser(null);

  // 🔥 FORCE APP RESET
  window.location.href = '/';
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

        {user?.plan === 'pro' && (
  <div style={styles.proBadge}>🚀 PRO</div>
)}

{user?.plan === 'enterprise' && (
  <div style={styles.proBadge}>👑 ENTERPRISE</div>
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

        {user?.isAdmin && (
          <div onClick={() => navigate('/admin')} style={styles.item}>
            👑 Admin
          </div>
        )}

    <div style={styles.bottom}>

  {/* 🔥 PROFILE */}
  <div style={styles.profileBox}>

    {user?.avatar ? (
      <img
        src={user.avatar}
        alt="avatar"
        style={styles.avatar}
      />
    ) : (
      <div style={styles.emptyAvatar}>
        👤
      </div>
    )}

    <div>
      <div style={styles.userName}>
        {user?.artistName || user?.email || 'User'}
      </div>

      <div style={styles.plan}>
        {
          user?.plan === 'enterprise'
            ? 'Enterprise Plan 🚀'
            : user?.plan === 'pro'
            ? 'Pro Plan 💎'
            : 'Free Plan'
        }
      </div>
    </div>

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

  profileBox: {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 15,
},

avatar: {
  width: 52,
  height: 52,
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid rgba(124,58,237,0.7)',
  boxShadow: '0 0 15px rgba(124,58,237,0.4)',
},

emptyAvatar: {
  width: 52,
  height: 52,
  borderRadius: '50%',
  background: 'linear-gradient(135deg,#1a1a1a,#111)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  color: '#888',
  border: '1px solid #222',
},

userName: {
  fontSize: 18,
  fontWeight: 'bold',
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