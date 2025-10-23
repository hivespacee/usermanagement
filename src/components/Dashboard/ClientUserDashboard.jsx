import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import DashboardLayout from '../Layout/DashboardLayout';
import Card from '../UI/Card';
import LogoutEffect from '../../effects/LogoutEffect'
import ShimmerLoader from '../../effects/ShimmerLoader';

const ClientUserDashboard = () => {
  const { user: authUser, logout } = useAuth();
  const [user] = useState({
    name: authUser?.name || 'Client User',
    role: 'Client User',
    email: authUser?.email || 'user@client.com',
    organization: 'ExampleOrg',
    assignedAdmin: 'alice.admin@client.com',
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const onLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
    }, 1500);
  };

  if (initialLoading) {
    return <ShimmerLoader />;
  }

  if (loading) {
    return <LogoutEffect duration={1500} redirectTo="/login" />;
  }
  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Welcome</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Profile" accent="emerald">
          <div className="space-y-2 text-gray-200">
            <div>
              <span className="text-gray-400 text-sm">Name</span>
              <div className="text-sm">{user.name}</div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Email</span>
              <div className="text-sm">{user.email}</div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Organization</span>
              <div className="text-sm">{user.organization}</div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Assigned Admin</span>
              <div className="text-sm">{user.assignedAdmin}</div>
            </div>
          </div>
        </Card>
        <Card title="Summary" accent="indigo">
          <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">
            <li>Access to client resources</li>
            <li>MFA recommended for enhanced security</li>
            <li>Contact assigned admin for permissions</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientUserDashboard;


