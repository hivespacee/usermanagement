import { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import DashboardLayout from '../Layout/DashboardLayout';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import ScrollableTable from '../UI/ScrollableTable';
import LogoutEffect from '../../effects/LogoutEffect'
import ShimmerLoader from '../../effects/ShimmerLoader';


const roleConfigs = [
  { key: 'operator', label: 'Operators', accent: 'amber' },
  { key: 'clientAdmin', label: 'Client Admins', accent: 'emerald' },
];

const columns = [
  { key: 'sno', header: 'S.No' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

const SiteAdminDashboard = () => { 
  const { user: authUser, logout } = useAuth();
  const [user] = useState({ name: authUser?.name || 'Site Admin', role: 'Site Admin' });
  const [lists, setLists] = useState({ operator: [], clientAdmin: [] });
  const [inviteOpenFor, setInviteOpenFor] = useState(null);
  const [viewListFor, setViewListFor] = useState(null);
  const [form, setForm] = useState({ email: '', organization: '' });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const onLogout = () =>{
    setLoading(true);
    setTimeout(() => {
      logout();
    }, 1500);
  };

  const sendInvite = (roleKey) => {
    if (!form.email) return;
    if (roleKey === 'clientAdmin' && !form.organization) return;
    const next = { ...lists };
    const current = next[roleKey] || [];
    next[roleKey] = [
      ...current,
      { id: Date.now(), sno: current.length + 1, email: form.email, status: 'Pending' },
    ];
    setLists(next);
    setForm({ email: '', organization: '' });
    setInviteOpenFor(null);
  };

  const renderInviteForm = (roleKey) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          placeholder="name@example.com"
          className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-gray-100 placeholder-gray-500"
        />
      </div>
      {roleKey === 'clientAdmin' && (
        <div>
          <label className="block text-sm text-gray-300 mb-1">Organization</label>
          <input
            type="text"
            value={form.organization}
            onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))}
            placeholder="Org name"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-gray-100 placeholder-gray-500"
          />
        </div>
      )}
      <div className="flex justify-end">
        <button onClick={() => sendInvite(roleKey)} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white">
          Send Invite
        </button>
      </div>
    </div>
  ); 

  if (initialLoading) {
    return <ShimmerLoader />;
  }

  if (loading) {
    return <LogoutEffect duration={1500} redirectTo="/login" />;
  }

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Site Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {roleConfigs.map((rc) => (
          <Card key={rc.key} title={rc.label} accent={rc.accent}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setInviteOpenFor(rc.key)}
                className="px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-gray-200 hover:bg-neutral-700"
              >
                Invite
              </button>
              <button
                onClick={() => setViewListFor(rc.key)}
                className="px-4 py-2 rounded-xl bg-neutral-950 border text-white hover:bg-neutral-800"
              >
                View List
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={`Invite ${roleConfigs.find((r) => r.key === inviteOpenFor)?.label || ''}`}
        isOpen={!!inviteOpenFor}
        onClose={() => setInviteOpenFor(null)}
      >
        {inviteOpenFor && renderInviteForm(inviteOpenFor)}
      </Modal>

      <Modal
        title={`${roleConfigs.find((r) => r.key === viewListFor)?.label || ''} - List`}
        isOpen={!!viewListFor}
        onClose={() => setViewListFor(null)}
        widthClass="max-w-3xl"
      >
        <ScrollableTable columns={columns} data={(viewListFor ? lists[viewListFor] : [])} heightClass="h-96" />
      </Modal>
    </DashboardLayout>
  );
};

export default SiteAdminDashboard;


