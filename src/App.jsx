import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastProvider.jsx'
import Signup from './components/SignupPage.jsx'
import SuccessfullSignup from './components/Dashboard/SuccessfullSignup.jsx'
import LoginPage from './components/LoginPage.jsx'
import DemoPage from './components/DemoPage.jsx'
import MFA_Setup from './components/mfa_setup.jsx'

function App() {
  return (
    <ToastProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={ <LoginPage/> } />
          <Route path="/successfull-signup" element={<SuccessfullSignup />} />
          <Route path="/dashboard" element={ <DemoPage/> } />
          <Route path="/setup-mfa" element={ <MFA_Setup/> } />
        </Routes>
    </ToastProvider>
  )
}

export default App
