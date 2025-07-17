const PantryStats = require('../models/pantryStatsModel')

// get all pantry stats
const getPantryStats = async (request, response) => {
    const user_id = request.user._id

    const stats = await PantryStats.findOne({ user_id: user_id })

    if (!stats) {
        return response.status(200).json({ totalItemsAdded: 0, itemsExpired: 0 });
    }
    response.status(200).json(stats)
}

// reset pantry stats
const resetPantryStats = async (request, response) => {
    const user_id = request.user._id

    try {
        const updatedStats = await PantryStats.findOneAndUpdate(
            { user_id: user_id },
            { totalItemsAdded: 0, itemsExpired: 0 },
            { new: true, upsert: true }
        );
        response.status(200).json(updatedStats)
    } catch (error) {
        response.status(500).json({ error: 'Server error while resetting stats.' })
    }
}

module.exports = {
    getPantryStats,
    resetPantryStats
}