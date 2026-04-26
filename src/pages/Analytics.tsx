import { useEffect, useState } from 'react';
import { api } from '../api';
import { PLAN_LIMITS } from '../utils/planLimits';

export default function Analytics() {
  const [stats, setStats] = useState({
    totalSongs: 0,
    totalPlays: 0,
  });

  const [sources, setSources] = useState<any[]>([]);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const limits = PLAN_LIMITS[user?.plan || 'free'];

if (!limits.analytics) {
  return <h2>🚫 Upgrade to access analytics</h2>;
}

  // 🔥 NEW (future: dynamic release id)
  const releaseId = 1;

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [statsRes, sourceRes, reportRes] = await Promise.all([
        api.get('/music/stats'),
        api.get('/royalties/sources'),
        api.get(`/analytics/release/${releaseId}`),
      ]);

      setStats(statsRes.data || {});
      setSources(sourceRes.data || []);
      setReport(reportRes.data || null);
    } catch (err) {
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ color: 'white', padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👽 Kasuku Analytics</h1>

      {/* ========================= */}
      {/* STATS */}
      {/* ========================= */}
      <div style={styles.grid}>
        <div style={styles.cardGlow}>
          <h3>Total Songs</h3>
          <p style={styles.big}>{stats.totalSongs}</p>
        </div>

        <div style={styles.cardGlow}>
          <h3>Total Plays</h3>
          <p style={styles.big}>{stats.totalPlays}</p>
        </div>
      </div>

      {/* ========================= */}
      {/* SOURCES */}
      {/* ========================= */}
      <div style={styles.cardGlow}>
        <h3>💰 Revenue by Source</h3>

        {sources.length === 0 ? (
          <p>No data</p>
        ) : (
          sources.map((s, i) => (
            <div key={i} style={styles.row}>
              <span>{s.source}</span>
              <span style={styles.money}>
                ${Number(s.total).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ========================= */}
      {/* 👽 ALIEN REPORT PAPER */}
      {/* ========================= */}
      {report && (
        <div style={styles.paperWrapper}>
          <div style={styles.paper}>
            <h2 style={styles.paperTitle}>
              🧾 MUSIC ROYALTY REPORT
            </h2>

            <p style={styles.paperSub}>
              KASUKU DISTRIBUTION
            </p>

            <div style={styles.paperBox}>
              <p>ARTIST</p>
              <h3>{report.title}</h3>
            </div>

            {/* 🔥 NEW TOTAL PLAYS */}
            <div style={styles.totalBox}>
              <p>TOTAL PLAYS</p>
              <h1>{report.totalPlays || 0}</h1>
            </div>

            {/* EXISTING */}
            <div style={styles.totalBox}>
              <p>TOTAL EARNINGS</p>
              <h1>
                ${(report.totalEarnings || 0).toFixed(2)} USD
              </h1>
            </div>

            <div style={styles.section}>
              <h4>TRACK BREAKDOWN</h4>

              {(report.tracks || []).map((t: any, i: number) => (
                <div key={i} style={styles.trackRow}>
                  <div>
                    <strong>{t.title}</strong>
                    <p style={{ fontSize: 12 }}>
                      👁️ Plays: {t.plays}
                    </p>
                  </div>

                  <div style={styles.earnings}>
                    💰 ${t.earnings.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ FIX ADDED HERE (ONLY CHANGE)
const styles = {
  container: {
    padding: 25,
    color: '#fff',
    background: 'radial-gradient(circle at top, #0f172a, #020617)',
    minHeight: '100vh',
  },

  title: {
    marginBottom: 20,
    fontSize: 28,
    color: '#7c3aed',
  },

  grid: {
    display: 'flex',
    gap: 20,
    marginBottom: 20,
  },

  cardGlow: {
    background: '#0f172a',
    padding: 20,
    borderRadius: 14,
    flex: 1,
    boxShadow: '0 0 25px rgba(124,58,237,0.5)',
    border: '1px solid rgba(124,58,237,0.3)',
  },

  big: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22c55e',
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  money: {
    color: '#22c55e',
    fontWeight: 'bold',
  },

  paperWrapper: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
  },

  paper: {
    width: 800,
    background: '#fff',
    color: '#000',
    padding: 30,
    borderRadius: 10,
    boxShadow: '0 0 40px rgba(124,58,237,0.8)',
  },

  paperTitle: {
    textAlign: 'center',
  },

  paperSub: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },

  paperBox: {
    marginTop: 20,
  },

  totalBox: {
    marginTop: 20,
    padding: 20,
    border: '2px solid #000',
    textAlign: 'center',
  },

  section: {
    marginTop: 20,
  },

  trackRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    borderBottom: '1px solid #ddd',
    marginTop: 10,
  },

  earnings: {
    fontWeight: 'bold',
  },
};