import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Settings() {

  const [tab, setTab] =
    useState('subscription');

  const [billing, setBilling] =
    useState<any>({});

  const [card, setCard] =
    useState<any>(null);

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD
  // =========================

  useEffect(() => {

    init();

    const stored =
      localStorage.getItem(
        'user'
      );

    if (stored) {

      const parsed =
        JSON.parse(stored);

      setUser(parsed);

    }

    const url =
      new URL(
        window.location.href
      );

    if (
      url.searchParams.get(
        'success'
      )
    ) {

      alert(
        '✅ Subscription activated!'
      );

      loadBilling();

    }

  }, []);

  const init = async () => {

    try {

      await Promise.all([
        loadBilling(),
        loadCard(),
      ]);

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // BILLING
  // =========================

  const loadBilling =
    async () => {

      try {

        const res =
          await api.get(
            '/billing'
          );

        const data =
          res.data || {};

        // ✅ FIXED PLAN
        const normalizedPlan =
          Number(
            data.plan ??
            user?.plan ??
            0
          );

        // ✅ ALL ACCOUNTS ACTIVE
        const normalized = {

          ...data,

          plan:
            normalizedPlan,

          subscriptionActive:
            true,

        };

        setBilling(
          normalized
        );

        // ✅ UPDATE STORAGE
        const storedUser =
          JSON.parse(
            localStorage.getItem(
              'user'
            ) || '{}'
          );

        const updatedUser = {

          ...storedUser,

          plan:
            normalizedPlan,

          subscriptionActive:
            true,

        };

        localStorage.setItem(
          'user',
          JSON.stringify(
            updatedUser
          )
        );

        window.dispatchEvent(
          new Event(
            'authChanged'
          )
        );

      } catch (err) {

        console.error(
          'Billing error:',
          err
        );

        setBilling({
          subscriptionActive:
            true,
        });

      }

    };

  // =========================
  // CARD
  // =========================

  const loadCard =
    async () => {

      try {

        const res =
          await api.get(
            '/billing/card'
          );

        setCard(
          res.data || null
        );

      } catch (err) {

        console.error(
          'Card error:',
          err
        );

        setCard(null);

      }

    };

  // =========================
  // UPGRADE
  // =========================

  const upgrade =
    async () => {

      try {

        const res =
          await api.post(
            '/billing/checkout'
          );

        window.location.href =
          res.data.url;

      } catch {

        alert(
          'Failed to start checkout'
        );

      }

    };

  // =========================
  // UPDATE CARD
  // =========================

  const updateCard =
    async () => {

      try {

        const res =
          await api.post(
            '/billing/portal'
          );

        window.location.href =
          res.data.url;

      } catch {

        alert(
          'Failed to open billing portal'
        );

      }

    };

  // =========================
  // CANCEL
  // =========================

  const cancelPlan =
    async () => {

      if (
        !window.confirm(
          'Cancel your subscription?'
        )
      ) return;

      try {

        await api.post(
          '/billing/cancel'
        );

        alert(
          'Subscription canceled ❌'
        );

        loadBilling();

      } catch {

        alert(
          'Cancel failed'
        );

      }

    };

  // =========================
  // PLAN LABEL
  // =========================

  const getPlanName = () => {

    const plan =
      Number(
        billing?.plan ||
        user?.plan ||
        0
      );

    if (plan >= 3) {
      return 'PRO';
    }

    if (plan === 2) {
      return 'ARTIST';
    }

    if (plan === 1) {
      return 'SOLO';
    }

    return 'FREE';

  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div style={styles.container}>

        <h2>
          Loading...
        </h2>

      </div>

    );

  }

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        ⚙️ Settings
      </h1>

      {/* TABS */}

      <div style={styles.tabs}>

        {[
          'subscription',
          'card',
          'contact',
        ].map((t) => (

          <div
            key={t}
            onClick={() =>
              setTab(t)
            }
            style={{
              ...styles.tab,

              background:
                tab === t
                  ? 'linear-gradient(90deg,#ff003c,#7c3aed)'
                  : '#1a1a1a',
            }}
          >
            {t.toUpperCase()}
          </div>

        ))}

      </div>

      {/* SUBSCRIPTION */}

      {tab ===
        'subscription' && (

        <div style={styles.card}>

          <h2>
            📦 Subscription
          </h2>

          <p>

            Plan:

            <b>
              {' '}
              {getPlanName()}
            </b>

          </p>

          {/* ✅ ALWAYS ACTIVE */}

          <p>

            Status:

            <span
              style={{
                color:
                  '#22c55e',
                fontWeight:
                  'bold',
              }}
            >
              {' '}
              ✅ Active
            </span>

          </p>

          <p>

            Billing:

            <b>
              {' '}
              {billing?.billing ||
                'monthly'}
            </b>

          </p>

          <p>

            Price:

            <b>

              {' '}
              $
              {billing?.price ||
                0}

              /

              {billing?.billing ||
                'month'}

            </b>

          </p>

          <p>

            Next Billing:

            {' '}

            {billing?.nextBillingDate ||
              'N/A'}

          </p>

          {Number(
            billing?.plan || 0
          ) < 3 && (

            <button
              onClick={upgrade}
              style={
                styles.primary
              }
            >
              🚀 Upgrade Plan
            </button>

          )}

          {Number(
            billing?.plan || 0
          ) > 0 && (

            <button
              onClick={
                cancelPlan
              }
              style={
                styles.danger
              }
            >
              Cancel Plan
            </button>

          )}

          <h3
            style={{
              marginTop: 20,
            }}
          >
            📜 Billing History
          </h3>

          {Array.isArray(
            billing?.invoices
          ) &&
          billing.invoices
            .length > 0 ? (

            billing.invoices.map(
              (i: any) => (

                <div
                  key={i.id}
                  style={
                    styles.invoice
                  }
                >

                  <span>
                    $
                    {i.amount}
                  </span>

                  <span>

                    {new Date(
                      i.date
                    ).toLocaleDateString()}

                  </span>

                  <span
                    style={
                      styles.paid
                    }
                  >
                    Paid
                  </span>

                </div>

              )
            )

          ) : (

            <p>
              No invoices yet
            </p>

          )}

        </div>

      )}

      {/* CARD */}

      {tab === 'card' && (

        <div style={styles.card}>

          <h2>
            💳 Card
          </h2>

          {card ? (

            <>

              <p>

                **** **** ****{' '}

                {card.last4}

              </p>

              <p>

                Exp:{' '}

                {card.exp_month}/
                {card.exp_year}

              </p>

              <button
                onClick={
                  updateCard
                }
                style={
                  styles.primary
                }
              >
                Update Card 💳
              </button>

            </>

          ) : (

            <>

              <p>
                No card found ❌
              </p>

              <button
                onClick={upgrade}
                style={
                  styles.primary
                }
              >
                Add Card
              </button>

            </>

          )}

        </div>

      )}

      {/* CONTACT */}

      {tab === 'contact' && (

        <div style={styles.card}>

          <h2>
            📞 Contact Info
          </h2>

          <input
            placeholder="Full Name"
            style={styles.input}
          />

          <input
            placeholder="Email"
            defaultValue={
              user?.email
            }
            style={styles.input}
          />

          <input
            placeholder="Phone"
            style={styles.input}
          />

          <button
            style={
              styles.primary
            }
          >
            Save
          </button>

        </div>

      )}

    </div>

  );

}

const styles: any = {

  container: {
    padding: 25,
    minHeight: '100vh',
    color: '#fff',
    background: '#000',
    width: '100%',
    boxSizing:
      'border-box',
    overflowX: 'hidden',
  },

  title: {
    fontSize:
      'clamp(24px,4vw,32px)',
    marginBottom: 20,
  },

  tabs: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },

  tab: {
    padding: '10px 16px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 13,
    minWidth: 110,
    textAlign: 'center',
  },

  card: {
    background: '#0a0a0a',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    boxSizing:
      'border-box',
  },

  invoice: {
    display: 'flex',
    justifyContent:
      'space-between',
    marginTop: 6,
    background: '#111',
    padding: 10,
    borderRadius: 8,
    gap: 10,
    flexWrap: 'wrap',
  },

  paid: {
    color: '#22c55e',
    fontSize: 12,
  },

  input: {
    width: '100%',
    padding: 12,
    marginTop: 10,
    background: '#000',
    border:
      '1px solid #333',
    color: '#fff',
    borderRadius: 6,
    boxSizing:
      'border-box',
  },

  primary: {
    marginTop: 15,
    padding: 12,
    width: '100%',
    border: 'none',
    borderRadius: 8,
    background:
      'linear-gradient(90deg,#ff003c,#7c3aed)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  danger: {
    marginTop: 15,
    padding: 12,
    width: '100%',
    border: 'none',
    borderRadius: 8,
    background: 'red',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },

};