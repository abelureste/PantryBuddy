import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Homepage from './pages/homepage'
import Dashboard from './pages/dashboard'
import PantryInventory from './pages/pantryinventory'

// components
import Navbar from './components/NavBar'
import Footer from './components/Footer'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/mypantry' element={<PantryInventory />}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
