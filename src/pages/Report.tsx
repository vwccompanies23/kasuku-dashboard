import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Report() {
  const [report, setReport] = useState(null);
  const [month, setMonth] = useState('2026-03');

  useEffect(() => {
    loadReport();
  }, [month]);

  const loadReport = async () => {
    try {
      const res = await api.get(`/earnings/report?month=${month}`);
      setReport(res.data);
    } catch {
      alert('Failed to load report ❌');
    }
  };

  const downloadPdf = async () => {
  try {
    const res = await fetch(
      `http://localhost:3000/earnings/report/pdf/${month}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${month}.pdf`;
    a.click();
  } catch {
    alert('Download failed ❌');
  }
};

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>🎧 Royalty Statement</h1>
        <select value={month} onChange={(e) => setMonth(e.target.value)} style={styles.select}>
          <option value="2026-01">Jan 2026</option>
          <option value="2026-02">Feb 2026</option>
          <option value="2026-03">Mar 2026</option>
        </select>
      </div>

      <button onClick={downloadPdf} style={styles.download}>
       📄 Download PDF
      </button>

      {/* TOTAL */}
      <div style={styles.totalBox}>
        <h2>Total Earnings</h2>
        <p style={styles.total}>
          ${report?.total || 0}
        </p>
      </div>

      {/* AI INSIGHTS */}
      <div style={styles.aiBox}>
        <h3>🤖 AI Insights</h3>
        <p>Next Month Prediction: ${report?.predictedNext || 0}</p>
        <p>Growth Rate: {report?.growthRate || 0}%</p>
      </div>

      {/* PLATFORM BREAKDOWN */}
      <div style={styles.section}>
        <h2>Platforms</h2>

        {report?.platforms &&
          Object.entries(report.platforms).map(([platform, data]) => (
            <div key={platform} style={styles.platformCard}>
              <div style={styles.platformHeader}>
                <h3>{getPlatformIcon(platform)} {platform}</h3>
                <span>${data.total.toFixed(2)}</span>
              </div>

              {/* TRACKS */}
              <div style={styles.tracks}>
                {Object.entries(data.tracks).map(([track, amount]) => (
                  <div key={track} style={styles.trackRow}>
                    <span>{track}</span>
                    <span>${amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

// 🎧 PLATFORM ICONS
function getPlatformIcon(name) {
  if (name.toLowerCase().includes('spotify')) return '🟢';
  if (name.toLowerCase().includes('apple')) return '🍎';
  if (name.toLowerCase().includes('youtube')) return '🔴';
  return '🎵';
}

// 🎨 PREMIUM STYLES
const styles = {
  container: {
    padding: 30,
    background: '#0b0b0f',
    color: '#fff',
    minHeight: '100vh',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    background: 'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },

  select: {
    padding: 10,
    borderRadius: 8,
    background: '#111',
    color: '#fff',
    border: '1px solid #333',
  },

  totalBox: {
    background: 'linear-gradient(135deg,#ff003c,#7c3aed)',
    padding: 25,
    borderRadius: 16,
    marginBottom: 20,
  },

  total: {
    fontSize: 36,
    fontWeight: 'bold',
  },

  aiBox: {
    background: '#111',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  section: {
    marginTop: 30,
  },

  platformCard: {
    background: '#111',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  platformHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  tracks: {
    borderTop: '1px solid #222',
    marginTop: 10,
  },

  trackRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #1a1a1a',
  },
};