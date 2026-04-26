export const platforms = [

  // =========================
  // 🌍 MAINSTREAM
  // =========================
  { id: 'spotify', name: 'Spotify', users: 600, logo: 'https://cdn.simpleicons.org/spotify', category: 'mainstream' },
  { id: 'apple', name: 'Apple Music', users: 90, logo: 'https://cdn.simpleicons.org/applemusic', category: 'mainstream' },
  { id: 'youtube', name: 'YouTube Music', users: 2000, logo: 'https://cdn.simpleicons.org/youtube', category: 'mainstream' },
  { id: 'amazon', name: 'Amazon Music', users: 80, logo: 'https://cdn.simpleicons.org/amazonmusic', category: 'mainstream' },
  { id: 'deezer', name: 'Deezer', users: 16, logo: 'https://cdn.simpleicons.org/deezer', category: 'mainstream' },
  { id: 'tidal', name: 'TIDAL', users: 5, logo: 'https://cdn.simpleicons.org/tidal', category: 'mainstream' },
  { id: 'pandora', name: 'Pandora', users: 50, logo: 'https://logo.clearbit.com/pandora.com', category: 'mainstream' },
  { id: 'napster', name: 'Napster', users: 5, logo: 'https://logo.clearbit.com/napster.com', category: 'mainstream' },

  // =========================
  // 🌍 SOCIAL / VIRAL
  // =========================
  { id: 'tiktok', name: 'TikTok', users: 1000, logo: 'https://cdn.simpleicons.org/tiktok', category: 'social' },
  { id: 'soundcloud', name: 'SoundCloud', users: 76, logo: 'https://cdn.simpleicons.org/soundcloud', category: 'social' },
  { id: 'instagram', name: 'Instagram Music', users: 2000, logo: 'https://cdn.simpleicons.org/instagram', category: 'social' },
  { id: 'facebook', name: 'Facebook Music', users: 2500, logo: 'https://cdn.simpleicons.org/facebook', category: 'social' },
  { id: 'snapchat', name: 'Snapchat Sounds', users: 800, logo: 'https://cdn.simpleicons.org/snapchat', category: 'social' },

  // =========================
  // 🌍 AFRICA
  // =========================
  { id: 'boomplay', name: 'Boomplay', users: 95, logo: 'https://logo.clearbit.com/boomplay.com', category: 'africa' },
  { id: 'audiomack', name: 'Audiomack', users: 40, logo: 'https://cdn.simpleicons.org/audiomack', category: 'africa' },
  { id: 'mdundo', name: 'Mdundo', users: 20, logo: 'https://logo.clearbit.com/mdundo.com', category: 'africa' },
  { id: 'u-duku', name: 'Uduku', users: 5, logo: 'https://logo.clearbit.com/uduku.com', category: 'africa' },

  // =========================
  // 🌍 ASIA
  // =========================
  { id: 'jiosaavn', name: 'JioSaavn', users: 100, logo: 'https://logo.clearbit.com/jiosaavn.com', category: 'asia' },
  { id: 'gaana', name: 'Gaana', users: 150, logo: 'https://logo.clearbit.com/gaana.com', category: 'asia' },
  { id: 'joox', name: 'Joox', users: 60, logo: 'https://logo.clearbit.com/joox.com', category: 'asia' },
  { id: 'kkbox', name: 'KKBOX', users: 10, logo: 'https://logo.clearbit.com/kkbox.com', category: 'asia' },
  { id: 'melon', name: 'Melon', users: 30, logo: 'https://logo.clearbit.com/melon.com', category: 'asia' },

  // =========================
  // 🌍 MIDDLE EAST
  // =========================
  { id: 'anghami', name: 'Anghami', users: 20, logo: 'https://logo.clearbit.com/anghami.com', category: 'middleeast' },

  // =========================
  // 🌍 OTHER / LONG TAIL (100+)
  // =========================
  ...Array.from({ length: 120 }).map((_, i) => ({
    id: `platform_${i}`,
    name: `Global Platform ${i + 1}`,
    users: Math.floor(Math.random() * 50) + 1,
    logo: `https://logo.clearbit.com/example${i}.com`,
    category: 'mainstream'
  })),
];