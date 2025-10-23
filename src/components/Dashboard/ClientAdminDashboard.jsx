import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import DashboardLayout from '../Layout/DashboardLayout';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import LogoutEffect from '../../effects/LogoutEffect'
import ScrollableTable from '../UI/ScrollableTable';
import ShimmerLoader from '../../effects/ShimmerLoader';

const columns = [
  { key: 'sno', header: 'S.No' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

const ClientAdminDashboard = () => {
  const { user: authUser, logout } = useAuth();
  const [user] = useState({ name: authUser?.name || 'Client Admin', role: 'Client Admin' });
  const [clientUsers, setClientUsers] = useState([]);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [form, setForm] = useState({ email: '' });
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

  const sendInvite = () => {
    if (!form.email) return;
    setClientUsers((prev) => [
      ...prev,
      { id: Date.now(), sno: prev.length + 1, email: form.email, status: 'Pending' },
    ]);
    setForm({ email: '' });
    setInviteOpen(false); 
  };

  if (initialLoading) {
    return <ShimmerLoader />;
  }

  if (loading) {
    return <LogoutEffect duration={1500} redirectTo="/login" />;
  }

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Client Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card title="Client Users" accent="rose">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setInviteOpen(true)}
              className="px-4 py-2 rounded-xl bg-neutral-800 border-amber-100 text-gray-200 hover:bg-neutral-700"
            >
              Invite
            </button>
            <button
              onClick={() => setInviteOpen('view')}
              className="px-4 py-2 rounded-xl bg-neutral-950 border text-white hover:bg-neutral-800"
            >
              View List
            </button>
          </div>
        </Card>
      </div>

      <Modal title="Invite Client User" isOpen={inviteOpen === true} onClose={() => setInviteOpen(false)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ email: e.target.value })}
              placeholder="user@client.com"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-gray-100 placeholder-gray-500"
            />
          </div>
          <div className="flex justify-end">
            <button onClick={sendInvite} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white">
              Send Invite
            </button>
          </div>
        </div>
      </Modal>

      <Modal title="Client Users - List" isOpen={inviteOpen === 'view'} onClose={() => setInviteOpen(false)} widthClass="max-w-3xl">
        <ScrollableTable columns={columns} data={clientUsers} heightClass="h-96" />
      </Modal>
    </DashboardLayout>
  );
};

export default ClientAdminDashboard;


