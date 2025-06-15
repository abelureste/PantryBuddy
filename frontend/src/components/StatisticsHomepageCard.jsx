const StatisticsHomepageCard = () => {

    return (
        <div>
            <div className="padTop">
                <div className="homepageStatistics">
                    <div className="statisticsColumn">
                        <img src="/foodwaste-chart.png" />
                        <h1>Household food waste accounts for 40 - 50% of all food wasted in the United States</h1>
                    </div>
                    <div className="statisticsColumn">
                        <img src="/foodwaste-graphic.png"/>
                        <h1>On average, 6 pounds of edible food per household is wasted each week</h1>
                    </div>
                    <div className="statisticsColumn">
                        <img src="/foodwaste-truck.png"></img>
                        <h1>Each year, household food waste in America can fill over 1 million dump trucks</h1>
                    </div>
                    <p className="statisticsRow">Data collected by the <a href="https://www.nrdc.org/bio/andrea-collins/additional-research-household-food-waste">Natural Resources Defense Council</a></p>
                </div>
            </div>
        </div>
    )

}

export default StatisticsHomepageCard