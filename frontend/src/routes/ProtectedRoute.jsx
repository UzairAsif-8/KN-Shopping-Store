import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
