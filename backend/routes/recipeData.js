// How the server should respond to different requests (GET, POST, DELETE, PUT)

const express = require('express')
const {
    allRecipes,
    getRecipe,
    newRecipe,
    deleteRecipe,
    updateRecipe,
} = require('../controllers/recipeController')

const router = express.Router()

// GET all recipes
router.get('/', allRecipes)

// GET a single recipe
router.get('/:id', getRecipe)

// POST a new recipe
router.get('/', newRecipe)

// DELETE a recipe
router.get('/:id', deleteRecipe)

// UPDATE a recipe
router.get('/:id', updateRecipe)

module.exports = router