import { useNavigate, useLocation, Outlet } from 'react-router-dom';

export default function SettingsLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: '💳 Subscription', path: '/settings/subscription' },
    { name: '📞 Contact', path: '/settings/contact' },
    { name: '💳 Card', path: '/settings/card' },
    
  ];

  return (
    <div style={styles.wrapper}>
      
      {/* LEFT PANEL */}
      <div style={styles.sidebar}>
        <h2 style={styles.title}>⚙️ Settings</h2>

        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.item,
                ...(active ? styles.active : {})
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      {/* RIGHT CONTENT */}
      <div style={styles.content}>
        <Outlet />
      </div>

    </div>
  );
}


const styles = {
  wrapper: {
    display: 'flex',
    gap: 20,
    color: '#fff',
  },

  sidebar: {
    width: 240,
    background: 'linear-gradient(180deg,#0a0a0a,#050505)',
    padding: 20,
    borderRadius: 16,
    border: '1px solid #222',
    boxShadow: '0 0 25px rgba(124,58,237,0.2)',
  },

  title: {
    marginBottom: 20,
    color: '#ff003c',
  },

  item: {
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    cursor: 'pointer',
    background: '#111',
    transition: 'all 0.3s ease',
    color: '#aaa',
  },

  active: {
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    boxShadow: '0 0 20px rgba(124,58,237,0.7)',
    transform: 'scale(1.03)',
  },

  content: {
    flex: 1,
    background: '#050505',
    padding: 25,
    borderRadius: 16,
    border: '1px solid #222',
    boxShadow: '0 0 25px rgba(124,58,237,0.1)',
  },
};