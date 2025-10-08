import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastProvider.jsx'
import Signup from './components/SignupPage.jsx'
import SuccessfullSignup from './components/SuccessfullSignup.jsx'

function App() {
  return (
    <ToastProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/successfull-signup" element={<SuccessfullSignup />} />
        </Routes>

        <div className="bg-black">
          <p>

          </p>
        </div>
    </ToastProvider>
  )
}

export default App
