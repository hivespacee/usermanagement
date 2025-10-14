import { useState } from 'react';
import DashboardLayout from '../Layout/DashboardLayout';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import ScrollableTable from '../UI/ScrollableTable';
import LogoutEffect from '../../effects/LogoutEffect'

const roleConfigs = [
  { key: 'siteAdmin', label: 'Site Admins' },
  { key: 'operator', label: 'Operators' },
  { key: 'clientAdmin', label: 'Client Admins' },
  { key: 'clientUser', label: 'Client Users' },
];

const initialLists = {
  siteAdmin: [],
  operator: [],
  clientAdmin: [],
  clientUser: [],
};

const columns = [
  { key: 'sno', header: 'S.No' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

const SuperAdminDashboard = () => {
  const [user] = useState({ name: 'Super Admin', role: 'Super Admin' });
  const [lists, setLists] = useState(initialLists);
  const [inviteOpenFor, setInviteOpenFor] = useState(null);
  const [viewListFor, setViewListFor] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: '', organization: '' });

  const onLogout = () => {
    setLoading(true);
  };

  const sendInvite = (roleKey) => {
    if (!form.email) return;
    if (roleKey === 'clientAdmin') {
      if (!form.organization) return;
    }
    if (roleKey === 'clientUser') {
      // Note: Client Users can only be invited by Client Admins. Allowed here for Super Admin overview.
    }
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

  const renderInviteForm = (roleKey) => {
    const isClientAdmin = roleKey === 'clientAdmin';
    const isClientUser = roleKey === 'clientUser';
    return (
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
        {isClientAdmin && (
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
        {isClientUser && (
          <p className="text-xs text-gray-400">Client Users are typically invited by Client Admins.</p>
        )}
        <div className="flex justify-end">
          <button
            onClick={() => sendInvite(roleKey)}
            className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Send Invite
          </button>
        </div>
      </div>
    );
  };

  const grid = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 min-w-0';

  if (loading) {
    return <LogoutEffect duration={1500} redirectTo="/login" />;
  }

  return (

    <DashboardLayout user={user} onLogout={onLogout}>
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Super Admin Dashboard</h2>
      <div className={grid}>
        {roleConfigs.map((rc) => (
          <Card key={rc.key} title={rc.label} >
            <div className="relative flex flex-col w-full items-center justify-center h-full">
              <div className=" flex  gap-3 mt-4 min-w-0 overflow-x-auto">
                {rc.key !== "clientUser" && (
                  <button
                    onClick={() => setInviteOpenFor(rc.key)}
                    className="w-25 h-11 flex items-center justify-center rounded-xl bg-neutral-800 border-amber-100 text-gray-200 hover:bg-neutral-700 transition-all"
                  >
                    Invite
                  </button>
                )}
                <button
                  onClick={() => setViewListFor(rc.key)}
                  className="w-28 h-11 pl-1 flex items-center justify-center rounded-xl bg-neutral-950 border text-white hover:bg-neutral-800 transition-all"
                >
                  View List
                </button>
              </div>
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

      <Modal title={`${roleConfigs.find((r) => r.key === viewListFor)?.label || ''} - List`}
        isOpen={!!viewListFor}
        onClose={() => setViewListFor(null)}
        widthClass="max-w-3xl"
      >
        <ScrollableTable columns={columns}
          data={(viewListFor ? lists[viewListFor] : [])}
          heightClass="h-96"
        />
      </Modal>



    </DashboardLayout >
  );
};

export default SuperAdminDashboard;


