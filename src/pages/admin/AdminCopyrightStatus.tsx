import { useEffect, useState } from 'react';

export default function AdminCopyrightClaims() {

  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  //
  // LOAD CLAIMS
  //
  const loadClaims = async () => {

    try {

      const res = await fetch(
        'http://localhost:3000/copyright-claims'
      );

      const data = await res.json();

      setClaims(data);

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
    id: string,
    status: string,
  ) => {

    try {

      await fetch(
        `${import.meta.env.VITE_API_URL}/copyright-claims/${id}/${status}`,
        {
          method: 'PATCH',
        }
      );

      loadClaims();

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {
    loadClaims();
  }, []);

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>
        Copyright Claims
      </h1>

      {loading ? (

        <div style={styles.loading}>
          Loading claims...
        </div>

      ) : claims.length === 0 ? (

        <div style={styles.empty}>
          No copyright claims found.
        </div>

      ) : (

        <div style={styles.grid}>

          {claims.map((claim) => (

            <div
              key={claim._id}
              style={styles.card}
            >

              <div style={styles.header}>

                <div>
                  <h2 style={styles.name}>
                    {claim.fullName}
                  </h2>

                  <p style={styles.email}>
                    {claim.email}
                  </p>
                </div>

                <div
                  style={{
                    ...styles.status,

                    background:
                      claim.status === 'approved'
                        ? 'rgba(0,255,150,0.15)'
                        : claim.status === 'rejected'
                        ? 'rgba(255,0,80,0.15)'
                        : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {claim.status}
                </div>

              </div>

              <div style={styles.section}>
                <div style={styles.label}>
                  Copyrighted Work
                </div>

                <div style={styles.text}>
                  {claim.copyrightedWork}
                </div>
              </div>

              <div style={styles.section}>
                <div style={styles.label}>
                  Infringing URL
                </div>

                <a
                  href={claim.infringingUrl}
                  target="_blank"
                  style={styles.link}
                >
                  {claim.infringingUrl}
                </a>
              </div>

              {claim.proofLink && (

                <div style={styles.section}>
                  <div style={styles.label}>
                    Proof Link
                  </div>

                  <a
                    href={claim.proofLink}
                    target="_blank"
                    style={styles.link}
                  >
                    Open Evidence
                  </a>
                </div>

              )}

              <div style={styles.section}>
                <div style={styles.label}>
                  Description
                </div>

                <div style={styles.description}>
                  {claim.description}
                </div>
              </div>

              <div style={styles.actions}>

                <button
                  onClick={() =>
                    updateStatus(
                      claim._id,
                      'reviewing'
                    )
                  }
                  style={styles.reviewBtn}
                >
                  Reviewing
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      claim._id,
                      'approved'
                    )
                  }
                  style={styles.approveBtn}
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      claim._id,
                      'rejected'
                    )
                  }
                  style={styles.rejectBtn}
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
    fontSize: 38,
    marginBottom: 30,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  loading: {
    color: '#aaa',
  },

  empty: {
    color: '#777',
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
    borderRadius: 22,
    padding: 24,
    backdropFilter: 'blur(18px)',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    gap: 20,
  },

  name: {
    margin: 0,
    fontSize: 22,
  },

  email: {
    color: '#999',
    marginTop: 5,
  },

  status: {
    padding: '10px 16px',
    borderRadius: 999,
    fontSize: 13,
    textTransform: 'uppercase',
  },

  section: {
    marginBottom: 22,
  },

  label: {
    color: '#888',
    marginBottom: 8,
    fontSize: 13,
    textTransform: 'uppercase',
  },

  text: {
    color: '#fff',
  },

  description: {
    color: '#bbb',
    lineHeight: 1.8,
  },

  link: {
    color: '#7c3aed',
    textDecoration: 'none',
    wordBreak: 'break-all',
  },

  actions: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 20,
  },

  reviewBtn: {
    padding: '12px 18px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    background: '#1e293b',
    color: '#fff',
  },

  approveBtn: {
    padding: '12px 18px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    background:
      'linear-gradient(90deg,#00c853,#00e676)',
    color: '#fff',
    fontWeight: 'bold',
  },

  rejectBtn: {
    padding: '12px 18px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    background:
      'linear-gradient(90deg,#ff003c,#ff1744)',
    color: '#fff',
    fontWeight: 'bold',
  },
};