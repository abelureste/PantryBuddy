import { useLocation, Link } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation()

    return (
        <header>
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
                    <a>Recipes</a>
                    <a>&nbsp; | &nbsp;</a>
                    <a>Shopping List</a>
                </div>)}
            </div>
        </header>
    )
}

export default Navbar