const express = require('express')
const {
    getExpiredCount,
    updateExpiredCount
} = require('../controllers/expiredController')

const router = express.Router()

router.get('/', getExpiredCount)

router.patch('/', updateExpiredCount)

module.exports = router