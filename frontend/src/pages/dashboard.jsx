import DashboardGauge from "../components/DashboardGauge"
import PantryItem from "../components/PantryItem"

const Dashboard = () => {

    return (
        <div className="dashboardInfo"> 
            <div className="dashboardLeft">
                <h1>Pantry Utilization</h1>
                <DashboardGauge/>
                <h3>Statistics</h3>
                <p>Items Finished: <br/> Items Thrown Away: </p>
            </div>
            <div className="dashboardRight">
                <h1>Expiring Soon</h1>
                <p>Items expiring soon go here <br/> DEV NOTES: Need to use PantryContext to display pantry item live</p>
            </div>
        </div>
    )
}

export default Dashboard