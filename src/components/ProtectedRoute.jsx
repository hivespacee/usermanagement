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
      'super-admin': '/dashboard/super-admin',
      'site-admin': '/dashboard/site-admin',
      'operator': '/dashboard/operator',
      'client-admin': '/dashboard/client-admin',
      'client-user': '/dashboard/client-user'
    };
    
    return <Navigate to={roleRoutes[user.role] || '/dashboard/super-admin'} replace />;
  }

  return children;
};

export default ProtectedRoute;
