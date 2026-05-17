import { useEffect, useState } from 'react';

export default function AdminArtistVerifications() {

  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  //
  // LOAD REQUESTS
  //
  const loadRequests = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/artist-verifications`
      );

      const data = await res.json();

      setRequests(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };

  //
  // UPDATE STATUS
  //
  const updateStatus = async (
    id: number,
    status: string,
  ) => {

    try {

      await fetch(
        `http://localhost:3000/artist-verifications/${id}/${status}`,
        {
          method: 'PATCH',
        }
      );

      loadRequests();

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (

    <div style={styles.page}>

      <h1 style={styles.title}>
        Verified Artists
      </h1>

      {loading ? (

        <p>Loading...</p>

      ) : requests.length === 0 ? (

        <p>No requests found.</p>

      ) : (

        <div style={styles.grid}>

          {requests.map((r) => (

            <div
              key={r.id}
              style={styles.card}
            >

              <div style={styles.header}>

                <div>

                  <h2 style={styles.artist}>
                    {r.artistName}
                  </h2>

                  <p style={styles.realName}>
                    {r.realName}
                  </p>

                </div>

                <div
                  style={{
                    ...styles.status,

                    background:
                      r.status ===
                      'approved'
                        ? 'rgba(0,255,150,0.15)'
                        : r.status ===
                          'rejected'
                        ? 'rgba(255,0,80,0.15)'
                        : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {r.status}
                </div>

              </div>

              {r.instagram && (
                <div style={styles.section}>
                  <span>
                    Instagram:
                  </span>

                  <a
                    href={r.instagram}
                    target="_blank"
                    style={styles.link}
                  >
                    Open
                  </a>
                </div>
              )}

              {r.spotifyUrl && (
                <div style={styles.section}>
                  <span>
                    Spotify:
                  </span>

                  <a
                    href={r.spotifyUrl}
                    target="_blank"
                    style={styles.link}
                  >
                    Open
                  </a>
                </div>
              )}

              {r.youtubeUrl && (
                <div style={styles.section}>
                  <span>
                    YouTube:
                  </span>

                  <a
                    href={r.youtubeUrl}
                    target="_blank"
                    style={styles.link}
                  >
                    Open
                  </a>
                </div>
              )}

              {r.appleMusicUrl && (
                <div style={styles.section}>
                  <span>
                    Apple Music:
                  </span>

                  <a
                    href={r.appleMusicUrl}
                    target="_blank"
                    style={styles.link}
                  >
                    Open
                  </a>
                </div>
              )}

              {r.proofLink && (
                <div style={styles.section}>
                  <span>
                    Proof:
                  </span>

                  <a
                    href={r.proofLink}
                    target="_blank"
                    style={styles.link}
                  >
                    Open Evidence
                  </a>
                </div>
              )}

              <div style={styles.actions}>

                <button
                  style={styles.reviewBtn}
                  onClick={() =>
                    updateStatus(
                      r.id,
                      'reviewing',
                    )
                  }
                >
                  Reviewing
                </button>

                <button
                  style={styles.approveBtn}
                  onClick={() =>
                    updateStatus(
                      r.id,
                      'approved',
                    )
                  }
                >
                  Approve
                </button>

                <button
                  style={styles.rejectBtn}
                  onClick={() =>
                    updateStatus(
                      r.id,
                      'rejected',
                    )
                  }
                >
                  Reject
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

const styles: any = {

  page: {
    minHeight: '100vh',
    background: '#050816',
    color: '#fff',
    padding: 30,
  },

  title: {
    fontSize: 42,
    marginBottom: 30,

    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',

    WebkitBackgroundClip: 'text',
    WebkitTextFillColor:
      'transparent',
  },

  grid: {
    display: 'grid',
    gap: 24,
  },

  card: {
    background:
      'rgba(255,255,255,0.04)',

    border:
      '1px solid rgba(255,255,255,0.08)',

    borderRadius: 24,
    padding: 24,

    backdropFilter: 'blur(18px)',
  },

  header: {
    display: 'flex',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  artist: {
    margin: 0,
    fontSize: 26,
  },

  realName: {
    color: '#999',
    marginTop: 5,
  },

  status: {
    padding: '10px 16px',
    borderRadius: 999,
    textTransform: 'uppercase',
    fontSize: 12,
  },

  section: {
    display: 'flex',
    justifyContent:
      'space-between',

    marginBottom: 14,

    color: '#ccc',
  },

  link: {
    color: '#7c3aed',
    textDecoration: 'none',
  },

  actions: {
    display: 'flex',
    gap: 12,
    marginTop: 24,
    flexWrap: 'wrap',
  },

  reviewBtn: {
    padding: '12px 18px',
    borderRadius: 12,
    border: 'none',
    background: '#1e293b',
    color: '#fff',
    cursor: 'pointer',
  },

  approveBtn: {
    padding: '12px 18px',
    borderRadius: 12,
    border: 'none',

    background:
      'linear-gradient(90deg,#00c853,#00e676)',

    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  rejectBtn: {
    padding: '12px 18px',
    borderRadius: 12,
    border: 'none',

    background:
      'linear-gradient(90deg,#ff003c,#ff1744)',

    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};