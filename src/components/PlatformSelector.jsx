import { useState, useMemo } from 'react';

import {
  getUserPlan,
} from '../utils/permissions';

import {
  useLanguage,
} from '../LanguageContext';

import translations
from '../translations';

// =========================
// USER
// =========================

const user = JSON.parse(
  localStorage.getItem('user') || '{}'
);

const userPlan =
  getUserPlan(user);

const isAdmin =
  user?.role === 'admin';

// =========================
// PLAN ACCESS
// =========================

const hasAccess = (
  required
) => {

  if (isAdmin) {
    return true;
  }

  if (required === 'free') {
    return true;
  }

  if (
    required === 'solo'
  ) {

    return [
      'solo',
      'artist',
      'pro',
    ].includes(userPlan);

  }

  if (
    required === 'artist'
  ) {

    return [
      'artist',
      'pro',
    ].includes(userPlan);

  }

  if (
    required === 'pro'
  ) {

    return (
      userPlan === 'pro'
    );

  }

  return false;
};

// =========================
// PLATFORMS
// =========================

const PLATFORMS = [

  // FREE
  {
    id: 'audiomack',
    name: 'Audiomack',
    domain: 'audiomack.com',
    level: 'free',
  },

  {
    id: 'boomplay',
    name: 'Boomplay',
    domain: 'boomplay.com',
    level: 'free',
  },

  {
    id: 'soundcloud',
    name: 'SoundCloud',
    domain: 'soundcloud.com',
    level: 'free',
  },

  // SOLO
  {
    id: 'spotify',
    name: 'Spotify',
    domain: 'spotify.com',
    level: 'solo',
  },

  {
    id: 'apple',
    name: 'Apple Music',
    domain: 'apple.com',
    level: 'solo',
  },

  {
    id: 'amazon',
    name: 'Amazon Music',
    domain: 'amazon.com',
    level: 'solo',
  },

  {
    id: 'deezer',
    name: 'Deezer',
    domain: 'deezer.com',
    level: 'solo',
  },

  {
    id: 'tidal',
    name: 'Tidal',
    domain: 'tidal.com',
    level: 'solo',
  },

  {
    id: 'napster',
    name: 'Napster',
    domain: 'napster.com',
    level: 'solo',
  },

  // ARTIST
  {
    id: 'youtube',
    name: 'YouTube Music',
    domain: 'youtube.com',
    level: 'artist',
  },

  {
    id: 'anghami',
    name: 'Anghami',
    domain: 'anghami.com',
    level: 'artist',
  },

  {
    id: 'pandora',
    name: 'Pandora',
    domain: 'pandora.com',
    level: 'artist',
  },

  {
    id: 'iheartradio',
    name: 'iHeartRadio',
    domain: 'iheartradio.com',
    level: 'artist',
  },

  {
    id: 'kkbox',
    name: 'KKBOX',
    domain: 'kkbox.com',
    level: 'artist',
  },

  {
    id: 'jiosaavn',
    name: 'JioSaavn',
    domain: 'jiosaavn.com',
    level: 'artist',
  },

  // PRO
  {
    id: 'tiktok',
    name: 'TikTok',
    domain: 'tiktok.com',
    level: 'pro',
  },

  {
    id: 'instagram',
    name: 'Instagram',
    domain: 'instagram.com',
    level: 'pro',
  },

  {
    id: 'facebook',
    name: 'Facebook',
    domain: 'facebook.com',
    level: 'pro',
  },

];

const ALL = [...PLATFORMS];

export default function PlatformSelector({
  selectedPlatforms = [],
  setSelectedPlatforms,
}) {

  const {
    lang,
  } = useLanguage();

  const t =
    translations[lang]
    || translations.en;

  const [expanded,
    setExpanded] =
    useState(false);

  const visible = useMemo(() => {

    return expanded
      ? ALL
      : ALL.slice(0, 12);

  }, [expanded]);

  // =========================
  // TOGGLE PLATFORM
  // =========================

  const toggle = (id) => {

    const platform =
      ALL.find(
        (p) => p.id === id
      );

    if (!platform) {
      return;
    }

    const locked =
      !hasAccess(
        platform.level
      );

    if (locked) {

      alert(
        `Upgrade to ${platform.level.toUpperCase()} 🚀`
      );

      return;
    }

    if (
      selectedPlatforms.includes(id)
    ) {

      setSelectedPlatforms(
        selectedPlatforms.filter(
          (p) => p !== id
        )
      );

    } else {

      setSelectedPlatforms([
        ...selectedPlatforms,
        id,
      ]);

    }

  };

  // =========================
  // SELECT ALL
  // =========================

  const selectAll = () => {

    const unlocked =
      ALL.filter(
        (p) =>
          hasAccess(
            p.level
          )
      ).map(
        (p) => p.id
      );

    setSelectedPlatforms(
      unlocked
    );

    setExpanded(true);

  };

  // =========================
  // CLEAR
  // =========================

  const clearAll = () => {

    setSelectedPlatforms([]);

  };

  return (

    <div style={styles.container}>

      {/* HEADER */}

      <div style={styles.header}>

        <div>

          <h3 style={styles.title}>
            🎵 {
              t?.distribution ||
              'Distribution'
            }
          </h3>

          <p style={styles.subtitle}>
            Distribute your music to
            150+ global platforms
          </p>

        </div>

        <div style={styles.actions}>

          <button
            onClick={selectAll}
            style={styles.primary}
          >
            Select All
          </button>

          <button
            onClick={clearAll}
            style={styles.secondary}
          >
            Unselect All
          </button>

        </div>

      </div>

      {/* GRID */}

      <div style={styles.grid}>

        {visible.map((p) => {

          const active =
            selectedPlatforms.includes(
              p.id
            );

          const locked =
            !hasAccess(
              p.level
            );

          return (

            <div
              key={p.id}
              onClick={() =>
                toggle(p.id)
              }
              style={{
                ...styles.box,

                border: active
                  ? '1px solid #ff004c'
                  : '1px solid rgba(255,255,255,0.06)',

                background: active
                  ? 'rgba(255,0,60,0.08)'
                  : '#0a0a0a',

                opacity:
                  locked ? 0.55 : 1,
              }}
            >

              <img
                src={`https://logo.clearbit.com/${p.domain}`}
                alt={p.name}
                onError={(e) => {

                  e.currentTarget.src =
                    'https://cdn-icons-png.flaticon.com/512/727/727245.png';

                }}
                style={styles.logo}
              />

              <div style={styles.info}>

                <span style={styles.name}>
                  {p.name}
                </span>

                <span style={styles.level}>
                  {p.level.toUpperCase()}
                </span>

              </div>

              {locked && (
                <div style={styles.lock}>
                  🔒
                </div>
              )}

            </div>

          );

        })}

      </div>

      {!expanded && (

        <button
          onClick={() =>
            setExpanded(true)
          }
          style={styles.expand}
        >
          Show All Platforms
        </button>

      )}

    </div>

  );

}

const styles = {

  container: {
    width: '100%',
    background:
      'linear-gradient(180deg,#050505,#000)',
    padding: 20,
    borderRadius: 18,
    border:
      '1px solid rgba(255,255,255,0.06)',
    boxSizing: 'border-box',
  },

  header: {
    display: 'flex',
    justifyContent:
      'space-between',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },

  subtitle: {
    color: '#888',
    fontSize: 13,
  },

  actions: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },

  primary: {
    padding: '10px 16px',
    background:
      'linear-gradient(90deg,#ff004c,#7c3aed)',
    border: 'none',
    color: '#fff',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  secondary: {
    padding: '10px 16px',
    background: '#111',
    border:
      '1px solid rgba(255,255,255,0.08)',
    color: '#aaa',
    borderRadius: 10,
    cursor: 'pointer',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit,minmax(180px,1fr))',
    gap: 14,
    width: '100%',
  },

  box: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    cursor: 'pointer',
    transition: '0.25s ease',
    minHeight: 72,
    background: '#0a0a0a',
  },

  logo: {
    width: 32,
    height: 32,
    objectFit: 'contain',
    flexShrink: 0,
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
  },

  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
  },

  level: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },

  lock: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 12,
    background:
      'rgba(0,0,0,0.7)',
    padding: '3px 7px',
    borderRadius: 999,
    color: '#ff4d6d',
  },

  expand: {
    marginTop: 18,
    width: '100%',
    padding: 14,
    background: '#0f0f0f',
    border:
      '1px solid rgba(255,255,255,0.08)',
    color: '#aaa',
    borderRadius: 12,
    cursor: 'pointer',
    fontSize: 14,
  },

};