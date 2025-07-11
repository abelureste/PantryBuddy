import { useEffect, useState } from 'react'
import { usePantryItemContext } from "../hooks/usePantryItemContext";

// import components
import DashboardGauge from "../components/DashboardGauge"
import PantryItem from "../components/PantryItem"
import RecipeCard from '../components/RecipeCard';

const TodaysDate = () => {
    const today = new Date();

    const fomattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <h3 className='dashboardWelcomeRight'>Today is {fomattedDate}</h3>
    )
}

const getExpiringSoonItems = (items) => {
    if (!items) return []

    const today = new Date()
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(today.getDate() + 3)

    return items.filter(item => {
        const expirationDate = new Date(item.expirationDate)
        return expirationDate >= today && expirationDate <= threeDaysFromNow
    })
}

const Dashboard = () => {
    const {pantryItems, dispatch} = usePantryItemContext()
    const [stats, setStats] = useState({ totalItemsAdded: 0, itemsExpired: 0 });


    useEffect(() => {
        const fetchPantryData = async () => {
            const response = await fetch('/api/pantryData')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_PANTRY_ITEM', payload: json})
            }
        }

        const fetchPantryStats = async () => {
            const response = await fetch('/api/pantryStatsData')
            const json = await response.json()

            if (response.ok) {
                setStats(json)
            }
        }

        fetchPantryData()
        fetchPantryStats()
    }, [dispatch])

    const itemsExpiringSoon = getExpiringSoonItems(pantryItems).slice(0, 3)

    const itemsUsed = stats.totalItemsAdded - stats.itemsExpired;
    const utilizationPercentage = stats.totalItemsAdded > 0
        ? Math.round((itemsUsed / stats.totalItemsAdded) * 100)
        : 0;

    return (
        <div>
            <div className="dashboardWelcome">
                <h3 className="dashboardWelcomeLeft">Welcome, user</h3>
                <TodaysDate/>
            </div>
            <div className="dashboardInfo"> 
                <div className="dashboardInfoLeft">
                    <h1>Pantry Utilization</h1>
                    <DashboardGauge value={utilizationPercentage} />
                    <h3>Statistics</h3>
                    <p>
                        Total Items Added: {stats.totalItemsAdded} <br/>
                        Items Thrown Away: {stats.itemsExpired}
                    </p>
                </div>
                <div className="dashboardInfoRight">
                    <h1>Expiring Soon</h1>
                    <div className='pantryItems'>
                        {itemsExpiringSoon.length > 0 ? (
                            itemsExpiringSoon.map(pantryItem => (
                                <PantryItem key={pantryItem._id} pantryItem={pantryItem} />
                            ))
                        ) : (
                            <p>No items expiring in the next 3 days.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="dashboardRecipes">
                <h1>Favorite Recipes</h1>
                <div className='recipeCardMaster'>
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard