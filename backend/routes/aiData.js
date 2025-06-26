const express = require('express')

const {
    sendPromptToGemini,
} = require('../controllers/aiController')

const router = express.Router()

router.post('/', sendPromptToGemini)

module.exports = router