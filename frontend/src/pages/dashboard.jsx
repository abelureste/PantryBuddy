import { useEffect, useState } from 'react'
import { usePantryItemContext } from "../hooks/usePantryItemContext";

// import components
import DashboardGauge from "../components/DashboardGauge"
import PantryItem from "../components/PantryItem"

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

    useEffect(() => {
        const fetchPantryData = async () => {
            const response = await fetch('/api/pantryData')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_PANTRY_ITEM', payload: json})
            }
        }

        fetchPantryData()
    }, [])

    const itemsExpiringSoon = getExpiringSoonItems(pantryItems).slice(0, 3)

    return (
        <div>
            <div className="dashboardWelcome">
                <h3 className="dashboardWelcomeLeft">Welcome, user</h3>
                <TodaysDate/>
            </div>
            <div className="dashboardInfo"> 
                <div className="dashboardInfoLeft">
                    <h1>Pantry Utilization</h1>
                    <DashboardGauge/>
                    <h3>Statistics</h3>
                    <p>Items Finished: <br/> Items Thrown Away: </p>
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
            </div>
        </div>
    )
}

export default Dashboard