
const axios = require('axios')

const sendPromptToGemini = async (request, response) => {
    const { prompt } = request.body
    console.log('Prompt received:', prompt)

    if (!prompt) {
        return response.status(400).json({ error: 'Prompt is required' })
    }

    try {
        const aiResponse = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
            {
                contents: [{ parts: [{ text: prompt }] }],
            },
            {
                headers : { 'Content-Type': 'application/json'},
                params: { key: process.env.GEMINI_API_KEY},
            }
        )

        const text = aiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text

        response.status(200).json({ response: text || 'No response from Gemini' })
    } catch (error) {
        if (error.response) {
            // API responded with error status and data
            console.error('Gemini API response error:', error.response.status, error.response.data)
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received from Gemini API:', error.request)
        } else {
            // Something else went wrong
            console.error('Gemini API error:', error.message)
        }
  response.status(500).json({ error: 'Failed to get response from Gemini' })
    }
}

module.exports = {
    sendPromptToGemini
}