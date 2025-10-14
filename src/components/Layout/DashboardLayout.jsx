import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ user, onLogout, children }) => {
  return (
    <div className="min-h-screen w-full bg-neutral-800 text-gray-100 font-mono tracking-widest">
      <Navbar user={user} onLogout={onLogout} />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {children} 
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


