import { PredictionServiceClient } from '@google-cloud/aiplatform'

const client = new PredictionServiceClient({
    keyFilename: './service-account.json',
})

const project = process.env.GCP_PROJECT_ID

export const handlePrompt = async (request, response) => {
    const { prompt } = request.body

    if (!prompt) {
        return response.status(400).json({ error: 'Prompt is required' })
    }

    
}