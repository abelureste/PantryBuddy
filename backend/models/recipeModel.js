// Schema for recipe database data

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ingredientSchema = new Schema ({
    ingredientName: {
        type: String,
        required: true,
        trim: true,
    },
    ingredientQuantity: {
        type: String,
        required: true,
    }
})

const instructionsSchema = new Schema ({
    instructionStep: {
        type: Number,
        required: true
    },
    instructionDescription: {
        type: String,
        required: true
    },
})

const recipeSchema = new Schema ({
    recipeName: {
        type: String,
        required: true
    },
    recipeDescription: {
        type: String,
        required: false
    },
    recipeIngredients: {
        type: [ingredientSchema],
        required: true
    },
    recipeIntructons: {
        type: [instructionsSchema],
        required: true
    },
})

module.exports = mongoose.model('RecipeData', recipeSchema)