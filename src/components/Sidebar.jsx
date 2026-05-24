import {
  useNavigate,
  useLocation,
} from 'react-router-dom';

import {
  useEffect,
  useState,
} from 'react';

import logo from '../assets/Kasuku-logo.png';

export default function Sidebar() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem(
          'user'
        ) || '{}'
      )
    );

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(
      window.innerWidth < 900
    );

  // =========================
  // RESPONSIVE
  // =========================

  useEffect(() => {
    const resize = () => {
      setIsMobile(
        window.innerWidth < 900
      );
    };

    window.addEventListener(
      'resize',
      resize
    );

    return () =>
      window.removeEventListener(
        'resize',
        resize
      );
  }, []);

  // =========================
  // AUTO UPDATE USER
  // =========================

  useEffect(() => {
    const interval =
      setInterval(() => {
        const updated =
          JSON.parse(
            localStorage.getItem(
              'user'
            ) || '{}'
          );

        setUser(updated);
      }, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  const isAdmin =
    user?.role === 'admin';

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'user'
    );

    window.location.reload();
  };

  // =========================
  // LANGUAGE READY
  // =========================

  const t = {
    dashboard: 'Dashboard',
    newRelease: 'New Release',
    releases: 'My Releases',
    analytics: 'Analytics',
    royalties: 'Royalties',
    withdraw: 'Withdraw',
    stripe: 'Stripe',
    reports: 'Reports',
    settings: 'Settings',
    signOut: 'Sign Out',
    freePlan: 'Free Plan',
  };

  // =========================
  // USER MENU
  // =========================

  const userMenu = [
    {
      name: t.dashboard,
      path: '/dashboard',
      icon: '📊',
    },

    {
      name: t.newRelease,
      path: '/upload',
      icon: '⬆️',
    },

    {
      name: t.releases,
      path: '/my-music',
      icon: '🎶',
    },

    {
      name: t.analytics,
      path: '/analytics',
      icon: '📈',
    },

    {
      name: t.royalties,
      path: '/royalties',
      icon: '💰',
    },

    {
      name: t.withdraw,
      path: '/withdraw',
      icon: '💸',
    },

    {
      name: t.stripe,
      path: '/connect-stripe',
      icon: '💳',
    },

    {
      name: t.reports,
      path: '/report',
      icon: '📑',
    },

    {
      name: t.settings,
      path: '/settings',
      icon: '⚙️',
    },
  ];

  // =========================
  // ADMIN MENU
  // =========================

  const adminMenu = [
    {
      name: 'Users',
      path: '/admin/users',
      icon: '👥',
    },

    {
      name: 'Email Center',
      path: '/admin/email',
      icon: '📧',
    },

    {
      name: 'Approvals',
      path: '/admin/approvals',
      icon: '✅',
    },

    {
      name: 'Revenue',
      path: '/admin/revenue',
      icon: '💵',
    },

    {
      name: 'Subscriptions',
      path:
        '/admin/subscriptions',
      icon: '📦',
    },

    {
      name: 'Referrals',
      path:
        '/admin/referrals',
      icon: '🎯',
    },

    {
      name: 'Activity',
      path: '/admin/activity',
      icon: '📊',
    },
  ];

  const menu = isAdmin
    ? adminMenu
    : userMenu;

  // =========================
  // NAVIGATE
  // =========================

  const goTo = (path) => {
    navigate(path);

    // CLOSE MOBILE MENU
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* ========================= */}
      {/* MOBILE TOP BAR */}
      {/* ========================= */}

      {isMobile && (
        <div style={styles.mobileTop}>
          <div
            style={styles.mobileLogo}
          >
            <img
              src={logo}
              alt="Kasuku"
              style={
                styles.mobileLogoImg
              }
            />

            <span>
              KASUKU
            </span>
          </div>

          <button
            style={
              styles.menuButton
            }
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
          >
            ☰
          </button>
        </div>
      )}

      {/* ========================= */}
      {/* OVERLAY */}
      {/* ========================= */}

      {mobileOpen &&
        isMobile && (
          <div
            style={styles.overlay}
            onClick={() =>
              setMobileOpen(
                false
              )
            }
          />
        )}

      {/* ========================= */}
      {/* SIDEBAR */}
      {/* ========================= */}

      <div
        style={{
          ...styles.sidebar,

          ...(isMobile
            ? {
                transform:
                  mobileOpen
                    ? 'translateX(0)'
                    : 'translateX(-100%)',
              }
            : {}),
        }}
      >
        {/* TOP */}
        <div>
          {/* LOGO */}

          <div
            style={
              styles.logoWrap
            }
          >
            <img
              src={logo}
              alt="Kasuku"
              style={
                styles.logoImg
              }
            />

            <h2
              style={
                styles.logoText
              }
            >
              KASUKU
            </h2>
          </div>

          {/* MENU */}

          <div style={styles.menu}>
            {menu.map((item) => {
              const active =
                location.pathname ===
                item.path;

              return (
                <div
                  key={item.path}
                  onClick={() =>
                    goTo(
                      item.path
                    )
                  }
                  style={{
                    ...styles.menuItem,

                    ...(active
                      ? styles.active
                      : {}),
                  }}
                >
                  <span>
                    {item.icon}
                  </span>

                  <span>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* USER CARD */}

        <div
          style={styles.userCard}
        >
          {user?.avatar ? (
            <img
              src={
                user.avatar
              }
              alt="profile"
              style={
                styles.avatar
              }
            />
          ) : (
            <div
              style={
                styles.emptyAvatar
              }
            >
              👤
            </div>
          )}

          <div
            style={
              styles.username
            }
          >
            {user?.username ||
              user?.name ||
              'Artist'}
          </div>

          <div style={styles.plan}>
            {user?.plan
              ? `${user.plan} Plan`
              : t.freePlan}
          </div>

          <button
            onClick={logout}
            style={
              styles.logout
            }
          >
            {t.signOut}
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  // =========================
  // MOBILE TOP
  // =========================

  mobileTop: {
    position: 'fixed',

    top: 0,

    left: 0,

    right: 0,

    height: 70,

    background:
      '#0b0b0b',

    display: 'flex',

    alignItems: 'center',

    justifyContent:
      'space-between',

    padding:
      '0 18px',

    zIndex: 2000,

    borderBottom:
      '1px solid #1f1f1f',
  },

  mobileLogo: {
    display: 'flex',

    alignItems: 'center',

    gap: 10,

    color: '#fff',

    fontWeight: 'bold',

    fontSize: 20,
  },

  mobileLogoImg: {
    width: 38,
  },

  menuButton: {
    background: 'none',

    border: 'none',

    color: '#fff',

    fontSize: 30,

    cursor: 'pointer',
  },

  overlay: {
    position: 'fixed',

    inset: 0,

    background:
      'rgba(0,0,0,0.6)',

    zIndex: 1500,
  },

  // =========================
  // SIDEBAR
  // =========================

  sidebar: {
    width: 260,

    height: '100vh',

    background:
      'linear-gradient(180deg,#0f0f0f,#050505)',

    padding: 20,

    display: 'flex',

    flexDirection: 'column',

    justifyContent:
      'space-between',

    borderRight:
      '1px solid #1f1f1f',

    position: 'fixed',

    left: 0,

    top: 0,

    zIndex: 2001,

    overflowY: 'auto',

    transition:
      'transform 0.3s ease',

    boxSizing:
      'border-box',
  },

  // =========================
  // LOGO
  // =========================

  logoWrap: {
    textAlign: 'center',

    marginBottom: 30,
  },

  logoImg: {
    width: 60,

    marginBottom: 8,
  },

  logoText: {
    color: '#fff',

    fontSize: 24,

    fontWeight: 'bold',

    letterSpacing: 1,
  },

  // =========================
  // MENU
  // =========================

  menu: {
    display: 'flex',

    flexDirection: 'column',

    gap: 10,
  },

  menuItem: {
    display: 'flex',

    alignItems: 'center',

    gap: 12,

    color: '#aaa',

    cursor: 'pointer',

    padding: 14,

    borderRadius: 14,

    transition:
      'all 0.25s ease',

    fontWeight: '600',

    fontSize: 15,
  },

  active: {
    color: '#fff',

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    boxShadow:
      '0 0 25px rgba(124,58,237,0.35)',
  },

  // =========================
  // USER CARD
  // =========================

  userCard: {
    marginTop: 30,

    borderRadius: 24,

    padding: 20,

    background:
      'linear-gradient(180deg,#111,#0a0a0a)',

    border:
      '1px solid rgba(255,255,255,0.06)',

    textAlign: 'center',
  },

  avatar: {
    width: 90,

    height: 90,

    borderRadius: '50%',

    objectFit: 'cover',

    marginBottom: 12,

    border:
      '3px solid #7c3aed',

    boxShadow:
      '0 0 25px rgba(124,58,237,0.5)',
  },

  emptyAvatar: {
    width: 90,

    height: 90,

    borderRadius: '50%',

    background:
      'linear-gradient(135deg,#1f1f1f,#111)',

    display: 'flex',

    alignItems: 'center',

    justifyContent:
      'center',

    margin:
      '0 auto 12px auto',

    fontSize: 34,

    color: '#777',

    border:
      '2px solid #222',
  },

  username: {
    color: '#fff',

    fontSize: 19,

    fontWeight: '700',

    marginBottom: 4,

    wordBreak:
      'break-word',
  },

  plan: {
    color: '#aaa',

    fontSize: 14,

    marginBottom: 18,
  },

  logout: {
    width: '100%',

    padding: 14,

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    border: 'none',

    borderRadius: 14,

    color: '#fff',

    cursor: 'pointer',

    fontWeight: 'bold',

    fontSize: 15,
  },
};