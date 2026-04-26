import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import useTranslation from '../useTranslation';
import logo from '../assets/kasuku-logo.png';

import MonthlyChart from '../components/MonthlyChart';
import SourcesChart from '../components/SourcesChart';
import RecentTable from '../components/RecentTable';
import DashboardFooter from '../components/DashboardFooter';

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const [data, setData] = useState({
    total: 0,
    monthly: {},
    sources: [],
    recent: [],
  });

  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/earnings/import', formData);
      alert('Report uploaded 🚀');
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Upload failed ❌');
    }
  };

  const fetchData = async () => {
    try {
      const res = await api.get('/earnings', {
        params: { userId: 6 },
      });

      setData({
        total: res.data?.total || 0,
        monthly: res.data?.months || {},
        sources: [],
        recent: [],
      });

    } catch {
      setData({
        total: 25,
        monthly: {
          "2026-04": 25,
          "2026-03": 10,
        },
        sources: [],
        recent: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    api.get('/posts').then(res => setPosts(res.data));
  }, []);

  const chartData = Object.entries(data.monthly || {}).map(
    ([month, value]) => ({
      month,
      value,
    })
  );

  if (loading) {
    return <div style={{ color: 'white', padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <img src={logo} style={styles.logo} />
          <h1 style={styles.welcome}>{t('welcome')}</h1>
        </div>
      </div>  

      {/* TOTAL */}
      <div style={styles.bigCard}>
        <h2>💰 {t('total')}</h2>
        <h1 style={styles.bigAmount}>${data.total.toFixed(2)}</h1>
      </div>

      {/* UPLOAD */}
      <div style={styles.card}>
        <h3>📊 Import Earnings Report</h3>
        <input type="file" onChange={uploadFile} style={styles.fileInput} />
      </div>

      {/* CHART */}
      <div style={styles.card}>
        <h3>📈 {t('monthly')}</h3>
        <MonthlyChart data={chartData} />
      </div>

      {/* SOURCES */}
      <div style={styles.card}>
        <h3>💿 {t('sources')}</h3>
        <SourcesChart data={data.sources} />
      </div>

      {/* RECENT */}
      <div style={styles.card}>
        <h3>📄 {t('recent')}</h3>
        <RecentTable data={data.recent} />
      </div>

      {/* 🔥 POSTS FEED (FIXED POSITION) */}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ marginBottom: 15 }}>📢 Latest Updates</h3>

        {posts.length === 0 && (
          <p style={{ opacity: 0.6 }}>No updates yet</p>
        )}

        {posts.map(p => (
          <div key={p.id} style={styles.post}>
            {p.image && <img src={p.image} style={styles.image} />}
            <p>{p.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ✅ FIXED STYLES */
const styles = {
  container: {
    padding: 30,
    color: '#fff',
    maxWidth: 1200,
    margin: '0 auto',
  },

  post: {
    background: '#111',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    border: '1px solid #1f2937',
  },

  image: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
  },

  welcome: {
    fontSize: 22,
    opacity: 0.9,
  },

  logo: {
    height: 100,
    width: 100,
    objectFit: 'contain',
  },

  bigCard: {
    marginTop: 10,
    padding: 30,
    borderRadius: 20,
    background: 'linear-gradient(135deg,#ff003c,#7c3aed)',
  },

  bigAmount: {
    fontSize: 42,
    marginTop: 10,
    fontWeight: 'bold',
  },

  card: {
    marginTop: 25,
    padding: 25,
    background: '#141414',
    borderRadius: 18,
  },

  fileInput: {
    marginTop: 12,
    padding: 12,
    background: '#1a1a1a',
    color: '#fff',
    border: '1px solid #333',
    borderRadius: 10,
    cursor: 'pointer',
  },
};