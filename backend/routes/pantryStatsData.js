const express = require('express')
const { getPantryStats } = require('../controllers/pantryStatsController')
const { protect } = require('../middleware/userMiddleware')

const router = express.Router()

router.use(protect)

router.get('/', getPantryStats)

module.exports = router