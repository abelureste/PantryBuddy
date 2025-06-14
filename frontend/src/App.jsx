import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Homepage from './pages/homepage'
import PantryInventory from './pages/pantryinventory'
import Navbar from './components/NavBar'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/mypantry' element={<PantryInventory />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
