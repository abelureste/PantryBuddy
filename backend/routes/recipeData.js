// How the server should respond to different requests (GET, POST, DELETE, PUT)

const express = require('express')
const {
    allRecipes,
    getRecipe,
    newRecipe,
    deleteRecipe,
    updateRecipe,
} = require('../controllers/recipeController')

const { protect } = require('../middleware/userMiddleware')

const router = express.Router()

// GET all recipes
router.get('/', protect, allRecipes)

// GET a single recipe
router.get('/:id', getRecipe)

// POST a new recipe
router.post('/', protect, newRecipe)

// DELETE a recipe
router.delete('/:id', protect, deleteRecipe)

// UPDATE a recipe
router.patch('/:id', protect, updateRecipe)

module.exports = router