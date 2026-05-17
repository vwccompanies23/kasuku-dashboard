import { useEffect, useState } from 'react';
import { api } from '../api';
import logo from '../assets/kasuku-logo.png';

export default function Collaborators() {

  const [collabs, setCollabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FORM STATE
  const [email, setEmail] = useState('');
  const [percent, setPercent] = useState('');

  // 🔥 EARNINGS
  const [earnings, setEarnings] = useState<any>({});

  // 🔥 AUTO PAYOUT
  const [autoPayout, setAutoPayout] = useState({
    enabled: false,
    type: 'instant',
  });

  useEffect(() => {
    loadCollabs();
    loadEarnings();
    loadAutoPayout();
  }, []);

  // =====================
  // LOAD COLLABS
  // =====================
  const loadCollabs = async () => {
    try {

      const res = await api.get(
        '/releases/my-collaborations'
      );

      setCollabs(res.data || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  };

  // =====================
  // LOAD EARNINGS
  // =====================
  const loadEarnings = async () => {
    try {

      const res = await api.get(
        '/earnings/splits'
      );

      setEarnings(res.data || {});

    } catch (err) {

      console.error(err);
    }
  };

  // =====================
  // LOAD PAYOUT
  // =====================
  const loadAutoPayout = async () => {
    try {

      const res = await api.get(
        '/payments/auto-payout'
      );

      setAutoPayout(res.data);

    } catch (err) {

      console.error(err);
    }
  };

  // =====================
  // TOGGLE PAYOUT
  // =====================
  const toggleAutoPayout = async () => {

    const updated = {
      ...autoPayout,
      enabled: !autoPayout.enabled,
    };

    setAutoPayout(updated);

    await api.post(
      '/payments/auto-payout',
      updated,
    );
  };

  // =====================
  // CHANGE PAYOUT TYPE
  // =====================
  const changeType = async (
    type: string,
  ) => {

    const updated = {
      ...autoPayout,
      type,
    };

    setAutoPayout(updated);

    await api.post(
      '/payments/auto-payout',
      updated,
    );
  };

  // =====================
  // ADD COLLABORATOR
  // =====================
  const addCollaborator = async () => {

    if (!email || !percent) {

      alert('Fill all fields ❌');
      return;
    }

    const totalSplits = collabs.reduce(
      (sum: number, r: any) => {

        return (
          sum +
          (
            r.splits?.reduce(
              (s: number, c: any) =>
                s + Number(c.percent),
              0,
            ) || 0
          )
        );
      },
      0,
    );

    if (
      totalSplits + Number(percent) >
      100
    ) {

      alert(
        'Split exceeds 100% ❌'
      );

      return;
    }

    try {

      await api.post(
        '/collaborators/add',
        {
          email,
          percent: Number(percent),
        },
      );

      setEmail('');
      setPercent('');

      loadCollabs();

    } catch (err) {

      alert('Failed to add ❌');
    }
  };

  // =====================
  // REMOVE COLLAB
  // =====================
  const removeCollaborator = async (
    id: number,
  ) => {

    try {

      await api.delete(
        `/collaborators/${id}`
      );

      loadCollabs();

    } catch {

      alert('Remove failed ❌');
    }
  };

  // =====================
  // TOTAL EARNINGS
  // =====================
  const total = Object.values(
    earnings,
  ).reduce(
    (sum: number, val: any) =>
      sum + Number(val),
    0,
  );

  return (

    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>

        <div style={styles.headerLeft}>
          <img
            src={logo}
            style={styles.logo}
          />

          <h1 style={styles.title}>
            Collaborator Dashboard
          </h1>
        </div>

      </div>

      {/* MAIN */}
      <div style={styles.container}>

        {/* 💰 EARNINGS */}
        <div style={styles.cardGlow}>

          <h2>💰 Earnings</h2>

          <h3
            style={{
              color: '#00ff9f',
            }}
          >
            Total: $
            {total.toFixed(2)}
          </h3>

          {Object.entries(
            earnings,
          ).map(
            ([id, amount]: any) => (

              <div
                key={id}
                style={styles.row}
              >
                <span>
                  Release #{id}
                </span>

                <span>
                  $
                  {Number(
                    amount,
                  ).toFixed(2)}
                </span>
              </div>
            ),
          )}
        </div>

        {/* 🚀 AUTO PAYOUT */}
        <div style={styles.cardGlow}>

          <h2>
            🚀 Auto Payout
          </h2>

          <p>
            Status:{' '}

            <span
              style={{
                color:
                  autoPayout.enabled
                    ? '#00ff9f'
                    : '#ff003c',
              }}
            >
              {autoPayout.enabled
                ? 'ON'
                : 'OFF'}
            </span>
          </p>

          <button
            style={styles.mainBtn}
            onClick={
              toggleAutoPayout
            }
          >
            Toggle Auto Payout
          </button>

          <button
            style={styles.mainBtn}
            onClick={() =>
              changeType(
                'instant',
              )
            }
          >
            ⚡ Instant
          </button>

          <button
            style={styles.mainBtn}
            onClick={() =>
              changeType(
                'weekly',
              )
            }
          >
            📅 Weekly
          </button>

        </div>

        {/* 📊 ANALYTICS */}
        <div style={styles.cardGlow}>

          <h2>
            📊 Splits Analytics
          </h2>

          {Object.entries(
            earnings,
          ).map(
            ([id, amount]: any) => {

              const percent =
                total
                  ? (
                      (Number(
                        amount,
                      ) /
                        total) *
                      100
                    ).toFixed(1)
                  : '0';

              return (

                <div key={id}>

                  <div
                    style={
                      styles.row
                    }
                  >
                    <span>
                      Release #
                      {id}
                    </span>

                    <span>
                      {percent}%
                    </span>
                  </div>

                  <div
                    style={
                      styles.barBg
                    }
                  >
                    <div
                      style={{
                        ...styles.barFill,
                        width: `${percent}%`,
                      }}
                    />
                  </div>

                </div>
              );
            },
          )}

        </div>

        {/* RELEASES */}
        {loading ? (

          <p>Loading...</p>

        ) : collabs.length === 0 ? (

          <p
            style={{
              color: '#888',
            }}
          >
            No collaborations yet
          </p>

        ) : (

          collabs.map(
            (release: any) => (

              <div
                key={release.id}
                style={
                  styles.cardGlow
                }
              >

                <h2>
                  {release.title}
                </h2>

                {release.splits?.map(
                  (
                    s: any,
                    i: number,
                  ) => (

                    <div
                      key={i}
                      style={
                        styles.row
                      }
                    >

                      <span>
                        {s.email}
                      </span>

                      <span
                        style={{
                          color:
                            '#00ff9f',
                        }}
                      >
                        {s.percent}%
                      </span>

                      <button
                        style={
                          styles.btnDanger
                        }
                        onClick={() =>
                          removeCollaborator(
                            s.id,
                          )
                        }
                      >
                        ✕
                      </button>

                    </div>
                  ),
                )}

              </div>
            ),
          )
        )}

        {/* ADD COLLAB */}
        <div style={styles.cardGlow}>

          <h2>
            Add Collaborator
          </h2>

          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value,
              )
            }
          />

          <input
            style={styles.input}
            placeholder="Split %"
            value={percent}
            onChange={(e) =>
              setPercent(
                e.target.value,
              )
            }
          />

          <button
            style={styles.mainBtn}
            onClick={
              addCollaborator
            }
          >
            Add Collaborator
          </button>

        </div>

        {/* ✅ VERIFICATION CARD */}
        <div style={styles.verifyCard}>

          <div
            style={
              styles.verifyGlow
            }
          />

          <h2
            style={
              styles.verifyTitle
            }
          >
            ✅ Official Artist
            Verification
          </h2>

          <p
            style={
              styles.verifyText
            }
          >
            Get the official
            Kasuku verification
            badge to unlock
            trusted artist
            status, platform
            credibility,
            priority support,
            and premium profile
            visibility.
          </p>

          <div
            style={
              styles.verifyBenefits
            }
          >
            <div>
              ✔ Official
              Verified Badge
            </div>

            <div>
              ✔ Priority Support
            </div>

            <div>
              ✔ Trusted Artist
              Status
            </div>

            <div>
              ✔ Better Profile
              Visibility
            </div>
          </div>

          {/* ✅ VERIFIED ARTIST CARD */}
<div style={styles.verifyCard}>

  <h2 style={styles.verifyCardTitle}>
    Official Artist Verification
  </h2>

  <p style={styles.verifyCardText}>
    Apply for a verified Kasuku badge
    to unlock trusted artist status,
    priority support, and profile
    visibility boosts.
  </p>

  <button
    style={styles.verifyCardBtn}
    onClick={() => {
      window.location.href =
        '/verify-artist';
    }}
  >
    Apply For Verification
  </button>

</div>

        </div>

      </div>

    </div>
  );
}

const styles: any = {

  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#fff',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:
      'space-between',
    padding: 20,
    borderBottom:
      '1px solid #111',
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },

  logo: {
    width: 45,
    marginRight: 10,
  },

  verifyCard: {
  marginTop: 30,

  background:
    'linear-gradient(135deg,#141414,#1a0826)',

  border:
    '1px solid rgba(255,255,255,0.08)',

  borderRadius: 20,

  padding: 24,

  boxShadow:
    '0 0 30px rgba(124,58,237,0.22)',
},

verifyCardTitle: {
  fontSize: 24,
  fontWeight: 'bold',

  marginBottom: 12,

  background:
    'linear-gradient(90deg,#ff003c,#7c3aed)',

  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
},

verifyCardText: {
  color: '#aaa',
  lineHeight: 1.7,
  marginBottom: 20,
},

verifyCardBtn: {
  width: '100%',
  padding: 14,

  borderRadius: 14,
  border: 'none',

  cursor: 'pointer',

  color: '#fff',
  fontWeight: 'bold',

  background:
    'linear-gradient(90deg,#ff003c,#7c3aed)',
},

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    WebkitBackgroundClip:
      'text',
    WebkitTextFillColor:
      'transparent',
  },

  container: {
    maxWidth: 700,
    margin: '40px auto',
  },

  cardGlow: {
    background:
      'linear-gradient(135deg,#141414,#1f0033)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    boxShadow:
      '0 0 20px rgba(124,58,237,0.4)',
  },

  row: {
    display: 'flex',
    justifyContent:
      'space-between',
    marginTop: 8,
    alignItems: 'center',
  },

  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    background: '#0f0f0f',
    border:
      '1px solid #222',
    color: '#fff',
    borderRadius: 10,
  },

  mainBtn: {
    width: '100%',
    padding: 14,
    borderRadius: 10,
    border: 'none',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 8,
  },

  btnDanger: {
    marginLeft: 10,
    padding: '4px 10px',
    border: 'none',
    borderRadius: 6,
    background: '#ff003c',
    color: '#fff',
    cursor: 'pointer',
  },

  barBg: {
    height: 6,
    background: '#222',
    borderRadius: 10,
    marginTop: 4,
  },

  barFill: {
    height: 6,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    borderRadius: 10,
  },

  // ✅ VERIFICATION
  verifyCard: {
    position: 'relative',
    overflow: 'hidden',
    background:
      'linear-gradient(135deg,#111,#240046)',
    padding: 30,
    borderRadius: 22,
    marginTop: 40,
    marginBottom: 60,
    border:
      '1px solid rgba(255,255,255,0.08)',
    boxShadow:
      '0 0 40px rgba(124,58,237,0.35)',
  },

  verifyGlow: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at top right, rgba(255,0,60,0.18), transparent 40%)',
    pointerEvents: 'none',
  },

  verifyTitle: {
    fontSize: 28,
    marginBottom: 18,
    background:
      'linear-gradient(90deg,#fff,#d8b4fe)',
    WebkitBackgroundClip:
      'text',
    WebkitTextFillColor:
      'transparent',
  },

  verifyText: {
    color: '#bbb',
    lineHeight: 1.8,
    marginBottom: 24,
  },

  verifyBenefits: {
    display: 'grid',
    gap: 12,
    color: '#fff',
    marginBottom: 28,
  },

  verifyApplyBtn: {
    width: '100%',
    padding: 16,
    borderRadius: 14,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    boxShadow:
      '0 0 30px rgba(124,58,237,0.45)',
  },
};