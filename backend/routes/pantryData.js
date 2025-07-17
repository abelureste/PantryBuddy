// How the server should respond to different requests (GET, POST, DELETE, PUT)

const express = require('express')
const {
    allPantryItems,
    getPantryItem,
    newPantryItem,
    deletePantryItem,
    updatePantryItem
} = require('../controllers/pantryController')

const { protect } = require('../middleware/userMiddleware')

const router = express.Router()

router.use(protect)

// GET all pantry data
router.get('/', allPantryItems)

// GET a single pantry log
router.get('/:id', getPantryItem)

// POST a new pantry log
router.post('/', newPantryItem)

// DELETE a pantry log
router.delete('/:id', deletePantryItem)

// UPDATE a pantry log
router.patch('/:id', updatePantryItem)

module.exports = router