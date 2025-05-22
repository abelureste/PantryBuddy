// Main node.js server file

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const pantryRoutes = require('./routes/pantryData')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((request, response, next) => {
    console.log(request.path, request.method)
    next()
})

// routes
app.use('/api/pantryData', pantryRoutes)

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
