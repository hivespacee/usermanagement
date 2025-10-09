import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import InternetStatus from './components/InternetStatus.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <InternetStatus>
        <App />
      </InternetStatus>
    </BrowserRouter>
  </StrictMode>
);
