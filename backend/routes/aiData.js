
const express = require('express')
const {

} = require('../controllers/aiController')

const router = express.Router()

router.post('', handlePrompt)

module.exports = router