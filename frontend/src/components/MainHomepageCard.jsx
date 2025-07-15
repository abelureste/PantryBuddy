import { Link } from 'react-router-dom'

const MainHomepageCard = () => {

    return (
        <div className="homepageMain">
            <h1>Consume Smarter</h1>
            <h2>Track your pantry with PantryPal</h2>
            <form>
                <Link to='/login'><button>Get Started</button></Link>
            </form>
        </div>
    )
}

export default MainHomepageCard