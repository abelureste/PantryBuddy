const Expired = require('../models/expiredModel')
const mongoose = require('mongoose')

// get expired number
const getExpiredCount = async (request, response) => {
    const expiredCount = await Expired.findOne({})

    response.status(200).json({ count: expiredCount.count })
}

// update expired number
const updateExpiredCount = async (request, response) => {
    const { count } = request.body

    const updatedCount = await Expired.findOneAndUpdate(
        {},
        { count: count },
        { new: true, upsert: true }
    )

    response.status(200).json({ count: updatedCount.count })
}

module.exports = {
    getExpiredCount,
    updateExpiredCount
}