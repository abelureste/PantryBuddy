import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Homepage from './pages/homepage'
import Dashboard from './pages/dashboard'
import PantryInventory from './pages/pantryinventory'
import Recipes from './pages/recipes'
import RecipePage from './pages/recipepage'
import Login from './pages/login'
import Register from './pages/register'
import Settings from './pages/settings'

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
            <Route path='/recipes' element={<Recipes />}/>
            <Route path='/recipe/:id' element={<RecipePage />}/>            
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
