// Schema for pantry database data

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pantrySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },
    expirationDate: {
        type: Date,
        default: 'none',
        required: false
    },
    isExpired: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('PantryData', pantrySchema)