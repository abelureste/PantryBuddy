const express = require('express')
const { getPantryStats, resetPantryStats } = require('../controllers/pantryStatsController')
const { protect } = require('../middleware/userMiddleware')

const router = express.Router()

router.use(protect)

router.get('/', getPantryStats)

router.delete('/', resetPantryStats)

module.exports = router