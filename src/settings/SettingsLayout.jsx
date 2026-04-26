import { useNavigate, useLocation } from 'react-router-dom';

export default function SettingsLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = data?.role === 'admin';

  const menu = [
    { name: '💳 Subscription', path: '/settings/subscription' },
    { name: '📞 Contact', path: '/settings/contact' },
    { name: '💳 Card', path: '/settings/card' },
    { name: 'Subscription', path: '/settings/subscription' },
  ];

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      
      {/* LEFT MENU */}
      <div style={{ width: 220 }}>
        {menu.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              padding: 12,
              marginBottom: 10,
              cursor: 'pointer',
              borderRadius: 8,
              background:
                location.pathname === item.path
                  ? '#7c3aed'
                  : '#111',
            }}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}