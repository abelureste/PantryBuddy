import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PantryContextProvider } from './context/PantryContext.jsx'
import { RecipeGeneratorProvider } from './context/RecipeGeneratorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PantryContextProvider>
    <RecipeGeneratorProvider>
      <App />
    </RecipeGeneratorProvider>
    </PantryContextProvider>
  </StrictMode>,
)
