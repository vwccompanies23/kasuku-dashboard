import {
  useNavigate,
  useLocation,
} from 'react-router-dom';

import {
  useEffect,
  useState,
} from 'react';

import {
  useLanguage,
} from '../LanguageContext';

import translations
from '../translations';

import {
  getUserPlan,
  getPlanLabel,
} from '../utils/permissions';

import LanguageSwitcher
from './LanguageSwitcher';

import logo from '../assets/kasuku-logo.png';

export default function Layout({
  children,
}) {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    lang,
  } = useLanguage();

  const t =
    translations[lang] ||
    translations.en;

  // =========================
  // STATE
  // =========================

  const [user, setUser] =
    useState(null);

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  const [screenWidth,
    setScreenWidth] =
    useState(
      window.innerWidth
    );

  // =========================
  // RESPONSIVE
  // =========================

  useEffect(() => {

    const handleResize =
      () => {

        setScreenWidth(
          window.innerWidth
        );

      };

    window.addEventListener(
      'resize',
      handleResize
    );

    return () => {

      window.removeEventListener(
        'resize',
        handleResize
      );

    };

  }, []);

  const isTablet =
    screenWidth <= 1100;

  const isMobile =
    screenWidth <= 768;

  // =========================
  // LOAD USER
  // =========================

  useEffect(() => {

    const loadUser =
      () => {

        try {

          const token =
            localStorage.getItem(
              'token'
            );

          const savedUser =
            JSON.parse(
              localStorage.getItem(
                'user'
              ) || '{}'
            );

          if (
            !token ||
            token ===
              'undefined' ||
            token === 'null'
          ) {

            setUser(null);

            return;

          }

          let payload = {};

          try {

            payload =
              JSON.parse(
                atob(
                  token.split('.')[1]
                )
              );

          } catch {

            payload = {};

          }

          const normalizedPlan =
            getUserPlan({
              ...savedUser,
              ...payload,
            });

          const avatarUrl =
            savedUser.avatar ||
            savedUser.image ||
            payload.avatar ||
            '';

          setUser({

            userId:
              payload.userId ||
              savedUser.userId,

            email:
              savedUser.email ||
              payload.email ||
              '',

            artistName:
              savedUser.artistName ||
              payload.artistName ||
              'Artist',

            avatar:
              avatarUrl.startsWith(
                'http'
              )
                ? avatarUrl
                : avatarUrl
                ? `${import.meta.env.VITE_API_URL}${avatarUrl}`
                : '',

            role:
              savedUser.role ||
              payload.role ||
              'user',

            plan:
              normalizedPlan,

            subscriptionActive:
  normalizedPlan === 'solo' ||
  normalizedPlan === 'artist' ||
  normalizedPlan === 'pro',

            isAdmin:
              savedUser.role ===
                'admin' ||
              payload.role ===
                'admin',

          });

        } catch (
          error
        ) {

          console.log(
            'LOAD USER ERROR',
            error
          );

          setUser(null);

        }

      };

    loadUser();

    // 🔥 LIVE UPDATE
    window.addEventListener(
      'storage',
      loadUser
    );

    window.addEventListener(
      'authChanged',
      loadUser
    );

    return () => {

      window.removeEventListener(
        'storage',
        loadUser
      );

      window.removeEventListener(
        'authChanged',
        loadUser
      );

    };

  }, []);

  // =========================
  // AUTO LOGOUT
  // =========================

  useEffect(() => {

    let timeout;

    const logoutUser =
      () => {

        localStorage.removeItem(
          'token'
        );

        localStorage.removeItem(
          'user'
        );

        window.location.href =
          '/login';

      };

    const resetTimer =
      () => {

        clearTimeout(timeout);

        timeout =
          setTimeout(
            logoutUser,
            1000 *
              60 *
              60 *
              24
          );

      };

    window.addEventListener(
      'mousemove',
      resetTimer
    );

    window.addEventListener(
      'keydown',
      resetTimer
    );

    window.addEventListener(
      'click',
      resetTimer
    );

    window.addEventListener(
      'scroll',
      resetTimer
    );

    resetTimer();

    return () => {

      clearTimeout(timeout);

      window.removeEventListener(
        'mousemove',
        resetTimer
      );

      window.removeEventListener(
        'keydown',
        resetTimer
      );

      window.removeEventListener(
        'click',
        resetTimer
      );

      window.removeEventListener(
        'scroll',
        resetTimer
      );

    };

  }, []);

  // =========================
  // LOGOUT
  // =========================

  const logout =
    () => {

      localStorage.removeItem(
        'token'
      );

      localStorage.removeItem(
        'user'
      );

      window.dispatchEvent(
        new Event(
          'authChanged'
        )
      );

      navigate('/login');

    };

  // =========================
  // MENU
  // =========================

  const menu = [

    {
      name:
        t?.dashboard ||
        'Dashboard',
      icon: '📊',
      path: '/dashboard',
    },

    {
      name:
        t?.upload ||
        'Upload',
      icon: '⬆️',
      path: '/upload',
    },

    {
      name:
        t?.releases ||
        'Releases',
      icon: '🎶',
      path: '/my-music',
    },

    {
      name:
        t?.analytics ||
        'Analytics',
      icon: '📈',
      path: '/analytics',
    },

    {
      name:
        t?.royalties ||
        'Royalties',
      icon: '💰',
      path: '/royalties',
    },

    {
      name:
        t?.withdraw ||
        'Withdraw',
      icon: '💸',
      path: '/withdraw',
    },

    {
      name:
        t?.profile ||
        'Profile',
      icon: '👤',
      path: '/profile',
    },

    {
      name:
        t?.settings ||
        'Settings',
      icon: '⚙️',
      path: '/settings',
    },

  ];

  return (

    <div style={styles.container}>

      {/* MOBILE TOP */}

      {isMobile && (

        <div
          style={
            styles.mobileTop
          }
        >

          <div
            style={
              styles.mobileLogoWrap
            }
          >

            <img
              src={logo}
              alt="Kasuku"
              style={
                styles.mobileLogo
              }
            />

            <span>
              KASUKU
            </span>

          </div>

          <button
            style={
              styles.mobileBtn
            }
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
          >
            ☰
          </button>

        </div>

      )}

      {/* OVERLAY */}

      {mobileMenu &&
        isMobile && (

          <div
            style={
              styles.overlay
            }
            onClick={() =>
              setMobileMenu(
                false
              )
            }
          />

        )}

      {/* SIDEBAR */}

      <div
        style={{
          ...styles.sidebar,

          width:
            isTablet
              ? 90
              : 260,

          left:
            isMobile
              ? mobileMenu
                ? 0
                : '-100%'
              : 0,

          position:
            isMobile
              ? 'fixed'
              : 'relative',
        }}
      >

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
                styles.logo
              }
            />

            {!isTablet && (
              <h2
                style={
                  styles.logoText
                }
              >
                KASUKU
              </h2>
            )}

          </div>

          {/* MENU */}

          <div
            style={
              styles.menu
            }
          >

            {menu.map(
              (item) => {

                const active =
                  location.pathname ===
                  item.path;

                return (

                  <div
                    key={
                      item.path
                    }
                    onClick={() => {

                      navigate(
                        item.path
                      );

                      setMobileMenu(
                        false
                      );

                    }}
                    style={{
                      ...styles.item,

                      ...(active
                        ? styles.active
                        : {}),
                    }}
                  >

                    <span
                      style={
                        styles.icon
                      }
                    >
                      {
                        item.icon
                      }
                    </span>

                    {!isTablet && (
                      <span>
                        {
                          item.name
                        }
                      </span>
                    )}

                  </div>

                );

              }
            )}

          </div>

        </div>

        {/* PROFILE */}

        <div>

          <div
            style={
              styles.profileBox
            }
          >

            {user?.avatar ? (

              <img
                src={
                  user.avatar
                }
                alt="avatar"
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

            {!isTablet && (

              <div
                style={{
                  overflow:
                    'hidden',
                }}
              >

                <div
                  style={
                    styles.userName
                  }
                >
                  {user?.artistName ||
                    'Artist'}
                </div>

                <div
                  style={
                    styles.plan
                  }
                >
                  {getPlanLabel(
                    user?.plan
                  )}
                </div>

              </div>

            )}

          </div>

          <button
            style={
              styles.logout
            }
            onClick={
              logout
            }
          >

            {t?.signOut ||
              'Sign Out'}

          </button>


        </div>

      </div>

      {/* MAIN */}

     <div
  style={{
    ...styles.main,

    marginLeft:
      isMobile
        ? 0
        : isTablet
        ? 90
        : 260,

    paddingTop:
      isMobile
        ? 85
        : 24,

    paddingBottom:
      isMobile
        ? 100
        : 24,

    width:
      isMobile
        ? '100%'
        : `calc(100% - ${
            isTablet
              ? 90
              : 260
          }px)`,
  }}
>

<div style={styles.topBar}>

  <div />

  <div style={styles.topActions}>
    <LanguageSwitcher />
  </div>

</div>

       {children}

<div style={styles.footerLinks}>

  <a href="/help" style={styles.footerLink}>
    Help Center
  </a>

  <a href="/terms" style={styles.footerLink}>
    Terms
  </a>

  <a href="/privacy" style={styles.footerLink}>
    Privacy
  </a>

  <a href="/cookie-policy" style={styles.footerLink}>
    Cookie Policy
  </a>

  <a href="/dmca" style={styles.footerLink}>
    DMCA
  </a>

  <a
    href="/copyright-claim"
    style={styles.footerLink}
  >
    Copyright Claim
  </a>

</div>

      </div>

      {/* MOBILE BOTTOM NAV */}

      {isMobile && (

        <div
          style={
            styles.bottomNav
          }
        >

          {menu
            .slice(0, 5)
            .map((item) => (

              <div
                key={
                  item.path
                }
                onClick={() =>
                  navigate(
                    item.path
                  )
                }
                style={{
                  ...styles.bottomItem,

                  ...(location.pathname ===
                  item.path
                    ? styles.bottomActive
                    : {}),
                }}
              >

                <div>
                  {
                    item.icon
                  }
                </div>

                <div
                  style={{
                    fontSize: 10,
                    marginTop: 4,
                  }}
                >
                  {
                    item.name
                  }
                </div>

              </div>

            ))}

        </div>

      )}

    </div>

  );

}

// =========================
// STYLES
// =========================

const styles = {

 container: {

  display: 'flex',

  height: '100vh',

  width: '100%',

  background:
    'radial-gradient(circle at top,#0a0a0a,#000)',

  color: '#fff',

  overflow: 'hidden',
},

footerLinks: {

  marginTop: 80,

  paddingTop: 30,

  paddingBottom: 40,

  borderTop:
    '1px solid rgba(255,255,255,0.06)',

  display: 'flex',

  flexWrap: 'wrap',

  gap: 20,

  justifyContent: 'center',
},

footerLink: {

  color: '#c084fc',

  textDecoration: 'none',

  fontSize: 13,

  fontWeight: 700,

  padding: '8px 14px',

  borderRadius: 999,

  background:
    'rgba(124,58,237,0.14)',

  border:
    '1px solid rgba(255,0,60,0.12)',

  boxShadow:
    '0 0 18px rgba(124,58,237,0.15)',

  transition:
    'all 0.25s ease',
},


topBar: {

  width: '100%',

  display: 'flex',

  justifyContent:
    'space-between',

  alignItems: 'center',

  marginBottom: 20,

  gap: 20,

  flexWrap: 'wrap',
},

topActions: {

  display: 'flex',

  alignItems: 'center',

  gap: 12,

  marginLeft: 'auto',
},

  overlay: {

    position: 'fixed',

    inset: 0,

    background:
      'rgba(0,0,0,0.65)',

    zIndex: 9997,
  },

  mobileTop: {

    position: 'fixed',

    top: 0,

    left: 0,

    right: 0,

    height: 65,

    background: '#050505',

    borderBottom:
      '1px solid rgba(255,255,255,0.06)',

    display: 'flex',

    alignItems: 'center',

    justifyContent:
      'space-between',

    padding: '0 18px',

    zIndex: 9999,
  },

  mobileLogoWrap: {

    display: 'flex',

    alignItems: 'center',

    gap: 10,

    fontWeight: 'bold',
  },

  mobileLogo: {

    width: 34,

    height: 34,

    objectFit: 'contain',
  },

  mobileBtn: {

    background:
      'transparent',

    border: 'none',

    color: '#fff',

    fontSize: 28,

    cursor: 'pointer',
  },

 sidebar: {

  position: 'fixed',

  top: 0,

  left: 0,

  bottom: 0,

  width: 260,

  overflowY: 'auto',

  overflowX: 'hidden',

  WebkitOverflowScrolling:
    'touch',

  scrollbarWidth: 'none',

  flexShrink: 0,

  background:
    'linear-gradient(180deg,#0f0f0f,#050505)',

  borderRight:
    '1px solid rgba(255,255,255,0.06)',

  display: 'flex',

  flexDirection: 'column',

  justifyContent:
    'space-between',

  padding: 20,

  boxSizing:
    'border-box',

  zIndex: 9998,

  transition:
    'all 0.3s ease',
},

  logoWrap: {

    display: 'flex',

    alignItems: 'center',

    gap: 12,

    marginBottom: 30,
  },

  logo: {

    width: 42,

    height: 42,

    objectFit: 'contain',
  },

  logoText: {

    fontSize: 24,

    fontWeight: 'bold',
  },

  menu: {

    display: 'flex',

    flexDirection: 'column',

    gap: 10,
  },

  item: {

    display: 'flex',

    alignItems: 'center',

    gap: 12,

    padding: 14,

    borderRadius: 14,

    cursor: 'pointer',

    color: '#aaa',

    fontSize: 15,

    whiteSpace: 'nowrap',

    transition:
      '0.2s ease',
  },

  active: {

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    color: '#fff',

    boxShadow:
      '0 0 20px rgba(124,58,237,0.25)',
  },

  icon: {

    fontSize: 18,

    minWidth: 22,
  },

main: {

  flex: 1,

  width: '100%',

  maxWidth: '100%',

  marginLeft: 260,

  padding: 20,

  boxSizing:
    'border-box',

  overflowY: 'auto',

  overflowX: 'hidden',

  height: '100vh',
},

  profileBox: {

    display: 'flex',

    alignItems: 'center',

    gap: 12,

    marginBottom: 15,

    overflow: 'hidden',
  },

  avatar: {

    width: 52,

    height: 52,

    borderRadius: '50%',

    objectFit: 'cover',

    border:
      '2px solid rgba(124,58,237,0.45)',

    flexShrink: 0,
  },

  emptyAvatar: {

    width: 52,

    height: 52,

    borderRadius: '50%',

    background: '#111',

    display: 'flex',

    alignItems: 'center',

    justifyContent:
      'center',

    flexShrink: 0,
  },

  userName: {

    fontWeight: 'bold',

    overflow: 'hidden',

    textOverflow:
      'ellipsis',

    whiteSpace: 'nowrap',
  },

  plan: {

    color: '#888',

    fontSize: 12,

    marginTop: 4,
  },

  logout: {

    width: '100%',

    padding: 13,

    border: 'none',

    borderRadius: 14,

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    color: '#fff',

    fontWeight: 'bold',

    cursor: 'pointer',

    fontSize: 14,
  },

  bottomNav: {

    position: 'fixed',

    bottom: 0,

    left: 0,

    right: 0,

    height: 72,

    background: '#050505',

    borderTop:
      '1px solid rgba(255,255,255,0.06)',

    display: 'flex',

    justifyContent:
      'space-around',

    alignItems: 'center',

    zIndex: 9999,
  },

  bottomItem: {

    color: '#888',

    fontSize: 11,

    cursor: 'pointer',

    display: 'flex',

    flexDirection:
      'column',

    alignItems: 'center',

    justifyContent:
      'center',

    flex: 1,
  },

  bottomActive: {

    color: '#fff',

    fontWeight: 'bold',
  },

};