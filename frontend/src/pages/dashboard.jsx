import React from 'react';

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

const Dashboard = () => {

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
                    <p>Items expiring soon go here <br/> DEV NOTES: Need to use PantryContext to display pantry item live</p>
                </div>
            </div>
            <div className="dashboardRecipes">
                <h1>Recommended Recipes</h1>
            </div>
        </div>
    )
}

export default Dashboard