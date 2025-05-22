// Contains code interacting with MongoDB database

const PantryItems = require('../models/pantryModel')
const mongoose = require('mongoose')

// get all pantry items
const allPantryItems = async (request, response) => {
    const pantryItems = await PantryItems.find({}).sort({createdAt: -1})

    response.status(200).json(pantryItems)
}

// get a single pantry item
const getPantryItem = async (request, response) => {
    const {id} = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No pantry item found'})
    }

    const pantryItem = await PantryItems.findById(id)

    if (!pantryItem) {
        return response.status(400).json({error: 'No pantry item found'})
    }
    response.status(200).json({pantryItem})
}

// create a new pantry item
const newPantryItem = async (request, response) => {
    const {name, size, expirationDate} = request.body

    try{
        const pantryItem = await PantryItems.create({name, size, expirationDate})
        response.status(200).json(pantryItem)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

// delete a pantry item
const deletePantryItem = async (request, response) => {
    const {id} = request.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return response.status(404).json({error: 'Cannot delete pantry item'})
    }

    const pantryItem = await PantryItems.findOneAndDelete({_id: id})

    if (!pantryItem) {
        return response.status(400).json({error: 'No pantry item found'})
    }
    response.status(200).json({pantryItem})
}


// update a pantry item
const updatePantryItem = async (request, response) => {
    const {id} = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such pantry item'})
    }

    const pantryItem = await PantryItems.findOneAndUpdate({_id: id}, {
        ...request.body
    })

    if(!pantryItem) {
        return response.status(400).json({error: 'No such pantry item'})
    }
    response.status(200).json({pantryItem})
}


module.exports = {
    allPantryItems,
    getPantryItem,
    newPantryItem,
    deletePantryItem,
    updatePantryItem
}