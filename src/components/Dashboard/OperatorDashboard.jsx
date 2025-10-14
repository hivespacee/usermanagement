import { useState } from 'react';
import DashboardLayout from '../Layout/DashboardLayout';
import ScrollableTable from '../UI/ScrollableTable';
import LogoutEffect from '../../effects/LogoutEffect'

const columns = [
  { key: 'sno', header: 'S.No' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

const OperatorDashboard = () => {
   const [loading, setLoading] = useState(false);
  const [user] = useState({ name: 'Operator', role: 'Operator' });
  // Read-only sample list of client admins
  const [clientAdmins] = useState([
    // Example static rows; integrate API as needed
    { id: 1, sno: 1, email: 'alice.admin@client.com', status: 'Accepted' },
    { id: 2, sno: 2, email: 'bob.admin@client.com', status: 'Pending' },
  ]);

  const onLogout = () =>{
    setLoading(true);
  };

   if (loading) {
    return <LogoutEffect duration={1500} redirectTo="/login" />;
  }

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Operator Dashboard</h2>
      <div className="rounded-2xl border border-neutral-700 bg-neutral-900/70 p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Client Admins</h3>
          {/* <span className="text-xs text-gray-400">Read-only</span> */}
        </div>
        <ScrollableTable columns={columns} data={clientAdmins} heightClass="h-96" />
      </div>
    </DashboardLayout>
  );
};

export default OperatorDashboard;


