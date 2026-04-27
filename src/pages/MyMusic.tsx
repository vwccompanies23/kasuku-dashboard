import React, { useEffect, useState, CSSProperties } from 'react';
import { api } from '../api';

export default function MyMusic() {
  const [releases, setReleases] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchReleases();
  }, []);

  useEffect(() => {
    filterReleases();
  }, [releases, activeTab, search]);

  const fetchReleases = async () => {
    try {
      const res = await api.get('/releases/me');
      setReleases(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterReleases = () => {
    let data = [...releases];

    if (search) {
      data = data.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (activeTab !== 'all') {
      data = data.filter((r) => r.status === activeTab);
    }

    setFiltered(data);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Releases</h1>
      <p style={styles.subtitle}>
        Track all your published and pending releases
      </p>

      <input
        style={styles.search}
        placeholder="Search releases..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.tabs}>
        {['all', 'live', 'approved', 'pending', 'draft'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {}),
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <h2>No releases found</h2>
          <p>Start by creating your first release</p>
        </div>
      ) : (
        filtered.map((r) => (
          <div key={r.id} style={styles.card}>
            <div>
              <h3>{r.title}</h3>
              <p style={{ color: '#888' }}>{r.artistName}</p>
            </div>

            <span
              style={{
                ...styles.status,
                background: getStatusColor(r.status),
              }}
            >
              {r.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

// ✅ FIXED styles
const styles: Record<string, CSSProperties> = {
  container: {
    padding: 20,
    color: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 5,
  },
  subtitle: {
    color: '#888',
    marginBottom: 20,
  },
  search: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    background: '#1a1a1a',
    border: 'none',
    color: '#fff',
    marginBottom: 20,
  },
  tabs: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  tab: {
    padding: '8px 16px',
    borderRadius: 20,
    background: '#222',
    color: '#aaa',
    border: 'none',
    cursor: 'pointer',
  },
  activeTab: {
    background: '#7c3aed',
    color: '#fff',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottom: '1px solid #222',
  },
  status: {
    padding: '6px 12px',
    borderRadius: 10,
    fontSize: 12,
    color: '#fff',
  },
  empty: {
    textAlign: 'center', // ✅ important: must be string literal
    marginTop: 60,
    color: '#888',
  },
};

function getStatusColor(status: string) {
  if (status === 'live') return 'green';
  if (status === 'submitted') return 'orange';
  if (status === 'approved') return '#4caf50';
  if (status === 'pending') return '#999';
  return '#333';
}