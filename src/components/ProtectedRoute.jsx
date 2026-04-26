import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, requireSubscription = false }) {
  const { user } = useAuth();

  // not logged in
  if (!user) return <Navigate to="/login" />;

  // subscription required
  if (requireSubscription && !user.subscriptionActive) {
    return <Navigate to="/pricing" />;
  }

  return children;
}