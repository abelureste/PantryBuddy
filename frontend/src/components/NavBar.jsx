import { useLocation, Link } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation()

    return (
        <header>
            {location.pathname != '/login' && location.pathname != '/register' && (
            <div className="container"> 
                <Link to="/">
                    <img className='navLogo' src='/pantrypalLogo2-cropped-transparent.png'></img>
                </Link>
                {location.pathname != '/' && (
                <div className='navLinks'>
                    <Link to='/dashboard'>Dashboard</Link>
                    <a>&nbsp; | &nbsp;</a>
                    <Link to='/mypantry'>Pantry Inventory</Link>
                    <a>&nbsp; | &nbsp;</a>
                    <Link to='/recipes'>Recipes</Link>
                    <a>&nbsp; | &nbsp;</a>
                    <Link to='/settings'>Settings</Link>
                </div>)}
            </div>)}
        </header>
    )
}

export default Navbar