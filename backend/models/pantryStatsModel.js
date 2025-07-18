// Schema for pantry stats

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pantryStatsSchema = new Schema ({
    totalItemsAdded: {
        type: Number,
        default: 0
    },
    itemsExpired: {
        type: Number,
        default: 0
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('PantryStats', pantryStatsSchema)