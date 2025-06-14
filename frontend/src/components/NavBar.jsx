import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container"> 
                <Link to="/">
                    <img className='navLogo' src='/pantrypalLogo2-cropped-transparent.png'></img>
                </Link>
            </div>
        </header>
    )
}

export default Navbar