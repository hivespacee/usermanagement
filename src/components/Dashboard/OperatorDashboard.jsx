import { useState } from 'react';
import DashboardLayout from '../Layout/DashboardLayout';
import ScrollableTable from '../UI/ScrollableTable';
import LogoutEffect from '../../effects/LogoutEffect'
import Card from '../UI/Card';
import Modal from '../UI/Modal';

const roleConfigs = [
  { key: 'clientAdmin', label: 'Client Admins', accent: 'emerald' },
];


const columns = [
  { key: 'sno', header: 'S.No' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

const OperatorDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [user] = useState({ name: 'Operator', role: 'Operator' });
  const [lists, setLists] = useState({ clientAdmin: [] });

  const [inviteOpenFor, setInviteOpenFor] = useState(null);
  const [viewListFor, setViewListFor] = useState(null);
  const [form, setForm] = useState({ email: '', organization: '' });

  // Read-only sample list of client admins
  // const [clientAdmins] = useState([
  //   // Example static rows; integrate API as needed
  //   { id: 1, sno: 1, email: 'alice.admin@client.com', status: 'Accepted' },
  //   { id: 2, sno: 2, email: 'bob.admin@client.com', status: 'Pending' },
  // ]);

  const onLogout = () => {
    setLoading(true);
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





  if (loading) {
    return <LogoutEffect duration={1500} redirectTo="/login" />;
  }

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Operator Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {
          roleConfigs.map((rc) => (
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
          ))

        }



        {/* <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Client Admins</h3>
          <span className="text-xs text-gray-400">Read-only</span>
        </div>
        <ScrollableTable columns={columns} data={clientAdmins} heightClass="h-96" /> */}
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

export default OperatorDashboard;


