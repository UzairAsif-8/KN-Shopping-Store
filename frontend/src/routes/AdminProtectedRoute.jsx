import { Navigate, useLocation } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('kn_admin_token');

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminProtectedRoute;
