import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({
  children,
  requireSubscription = false,
}) {

  const { user, loading } = useAuth();

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#000',
          color: '#fff',
          fontSize: 18,
        }}
      >
        Loading...
      </div>
    );
  }

  // =========================
  // NOT LOGGED IN
  // =========================

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // =========================
  // SUBSCRIPTION CHECK
  // =========================

  const hasAccess =
    user?.subscriptionActive === true ||
    user?.freeAccess === true ||
    user?.isFreeOverride === true ||
    Number(user?.plan || 0) >= 1 ||
    user?.role === 'admin';

  // =========================
  // BLOCK ONLY IF REQUIRED
  // =========================

  if (requireSubscription && !hasAccess) {
    return <Navigate to="/pricing" replace />;
  }

  // =========================
  // ALLOW ACCESS
  // =========================

  return children;
}