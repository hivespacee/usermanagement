import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastProvider.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Signup from './components/SignupPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import SuperAdminDashboard from './components/Dashboard/SuperAdminDashboard.jsx'
import SiteAdminDashboard from './components/Dashboard/SiteAdminDashboard.jsx'
import OperatorDashboard from './components/Dashboard/OperatorDashboard.jsx'
import ClientAdminDashboard from './components/Dashboard/ClientAdminDashboard.jsx'
import ClientUserDashboard from './components/Dashboard/ClientUserDashboard.jsx'
import MFA_Setup from './components/MFA_Setup.jsx'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setup-mfa" element={<MFA_Setup />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard/super-admin" element={
            <ProtectedRoute requiredRole="super-admin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/site-admin" element={
            <ProtectedRoute requiredRole="site-admin">
              <SiteAdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/operator" element={
            <ProtectedRoute requiredRole="operator">
              <OperatorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/client-admin" element={
            <ProtectedRoute requiredRole="client-admin">
              <ClientAdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/client-user" element={
            <ProtectedRoute requiredRole="client-user">
              <ClientUserDashboard />
            </ProtectedRoute>
          } />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </ToastProvider> 
    </AuthProvider>
  )
}

export default App
