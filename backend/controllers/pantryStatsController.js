const PantryStats = require('../models/pantryStatsModel')

// get all pantry stats
const getPantryStats = async (request, response) => {
    const stats = await PantryStats.findOne({})
    if (!stats) {
        return response.status(200).json({ totalItemsAdded: 0, itemsExpired: 0 });
    }
    response.status(200).json(stats)
}

module.exports = {
    getPantryStats
}