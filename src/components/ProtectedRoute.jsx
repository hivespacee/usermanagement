import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import ShimmerLoader from '../effects/ShimmerLoader';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <ShimmerLoader />;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole){
    const roleRoutes = {
      'super_admin': '/dashboard/super-admin',
      'site_admin': '/dashboard/site-admin',
      'operator': '/dashboard/operator',
      'client_admin': '/dashboard/client-admin',
      'client_user': '/dashboard/client-user'
    };
    
    return <Navigate to={roleRoutes[user.role] || '/dashboard/operator'} replace />;
  }

  return children;
};

export default ProtectedRoute;
