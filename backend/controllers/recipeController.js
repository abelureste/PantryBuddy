// backend/controllers/recipeController.js

const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')

// get all recipes
const allRecipes = async (request, response) => {
    const user_id = request.user._id; // get user ID from the protect middleware
    const recipes = await Recipe.find({ user_id }).sort({createdAt: -1})

    response.status(200).json(recipes)
}

// get a single recipe
const getRecipe = async (request, response) => {
    const {id} = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({error: 'No recipe found'})
    }

    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return response.status(400).json({error: 'No recipe found'})
    }
    response.status(200).json(recipe)
}

// create a new recipe
const newRecipe = async (request, response) => {
    const {recipeName, recipeDescription, recipeIngredients, recipeInstructions} = request.body

    let emptyFields = []

    if (!recipeName) {
        emptyFields.push('recipeName')
    }
    if (emptyFields.length > 0) {
        return response.status(400).json({ error: 'Please fill in the recipe name field', emptyFields})
    }
    try {
        const user_id = request.user._id; // get user ID
        const recipe = await Recipe.create({recipeName, recipeDescription, recipeIngredients, recipeInstructions, user_id}) // add user_id
        response.status(200).json(recipe)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

// delete a recipe
const deleteRecipe = async(request, response) => {
    const {id} = request.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such recipe'})
    }

    const recipe = await Recipe.findByIdAndDelete({_id: id})

    if(!recipe) {
        return response.status(404).json({error: 'No such recipe'})
    }
    response.status(200).json({recipe})
}

// update a recipe
const updateRecipe = async(request, response) => {
    const {id} = request.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such recipe'})
    }

    const recipe = await Recipe.findByIdAndUpdate({_id: id}, {
        ...request.body
    })

    if(!recipe) {
        return response.status(404).json({error: 'No such recipe'})
    }
    response.status(200).json({recipe})
}

module.exports = {
    allRecipes,
    getRecipe,
    newRecipe,
    deleteRecipe,
    updateRecipe,
}