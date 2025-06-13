// Schema for database data

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pantrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        default: 'none',
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('PantryData', pantrySchema)