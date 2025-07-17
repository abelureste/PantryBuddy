// Contains code interacting with MongoDB database

const PantryItems = require('../models/pantryModel')
const PantryStats = require('../models/pantryStatsModel')
const mongoose = require('mongoose')

// get all pantry items
const allPantryItems = async (request, response) => {
    const user_id = request.user._id;

    const newlyExpiredItems = await PantryItems.find({
        user_id: user_id,
        expirationDate: { $lte: new Date() },
        isExpired: false
    })

    if (newlyExpiredItems.length > 0) {
        await PantryStats.findOneAndUpdate(
            { user_id: user_id },
            { $inc: { itemsExpired: newlyExpiredItems.length } }, 
            { upsert: true, new: true }
        )

        const idsToUpdate = newlyExpiredItems.map(item => item._id);
        await PantryItems.updateMany({ _id: { $in: idsToUpdate } }, { $set: { isExpired: true } });
    }

    const pantryItems = await PantryItems.find({ user_id }).sort({createdAt: -1})
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
    const {name, quantity, expirationDate} = request.body
    let emptyFields = []

    if(!name) emptyFields.push('name')
    if(!quantity) emptyFields.push('quantity')
    if(emptyFields.length > 0) return response.status(400).json({ error: 'Please fill in all fields', emptyFields})

    try {
        const user_id = request.user._id

        const pantryItem = await PantryItems.create({name, quantity, expirationDate, user_id: user_id}) 
        
        await PantryStats.findOneAndUpdate(
            { user_id: user_id }, // <-- Find by user_id
            { $inc: { totalItemsAdded: 1 } }, 
            { upsert: true, new: true } // Create if it doesn't exist
        )
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
    response.status(200).json(pantryItem)
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