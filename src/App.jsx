import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastProvider.jsx'
import Signup from './components/SignupPage.jsx'
import SuccessfullSignup from './components/Dashboard/SuccessfullSignup.jsx'
import LoginPage from './components/LoginPage.jsx'
import SuperAdminDashboard from './components/Dashboard/SuperAdminDashboard.jsx'
import SiteAdminDashboard from './components/Dashboard/SiteAdminDashboard.jsx'
import OperatorDashboard from './components/Dashboard/OperatorDashboard.jsx'
import ClientAdminDashboard from './components/Dashboard/ClientAdminDashboard.jsx'
import ClientUserDashboard from './components/Dashboard/ClientUserDashboard.jsx'
import MFA_Setup from './components/mfa_setup.jsx'

function App() {
  return (
    <ToastProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/successfull-signup" element={<SuccessfullSignup />} />
          <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
          <Route path="/dashboard/site-admin" element={<SiteAdminDashboard />} />
          <Route path="/dashboard/operator" element={<OperatorDashboard />} />
          <Route path="/dashboard/client-admin" element={<ClientAdminDashboard />} />
          <Route path="/dashboard/client-user" element={<ClientUserDashboard />} />
          <Route path="/setup-mfa" element={ <MFA_Setup /> } />
        </Routes>
    </ToastProvider>
  )
}

export default App
