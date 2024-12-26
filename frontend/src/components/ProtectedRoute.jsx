import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, role }) {
  const maintainer = useAuth();

  if (!maintainer) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
