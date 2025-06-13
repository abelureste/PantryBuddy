import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PantryContextProvider } from './context/PantryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PantryContextProvider>
      <App />
    </PantryContextProvider>
  </StrictMode>,
)
