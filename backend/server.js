// Main node.js server file

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
const pantryRoutes = require('./routes/pantryData')
const recipeRoutes = require('./routes/recipeData')
const aiRoutes = require('./routes/aiData')
const pantryStatsRoutes = require('./routes/pantryStatsData')
const userRoutes = require('./routes/userData')

app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

// use routes
app.use('/api/pantryData', pantryRoutes)
app.use('/api/recipeData', recipeRoutes)
app.use('/api/aiData', aiRoutes)
app.use('/api/pantryStatsData', pantryStatsRoutes)
app.use('/api/userData', userRoutes)

// connect to database
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to database, Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
