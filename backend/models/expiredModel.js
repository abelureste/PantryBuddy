// Schema for expired database data

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expiredSchema = new Schema ({
    count: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('expiredData', expiredSchema)