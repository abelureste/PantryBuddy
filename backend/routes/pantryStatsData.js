const express = require('express')
const { getPantryStats } = require('../controllers/pantryStatsController')
const router = express.Router()

router.get('/', getPantryStats)

module.exports = router