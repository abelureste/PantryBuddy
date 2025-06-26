import { createContext, useState } from 'react'

export const RecipeGeneratorContext = createContext()

export const RecipeGeneratorProvider = ({ children }) => {
    const [prompt, setPrompt] = useState('')
    const [aiResponse, setAiResponse] = useState('')
    const [loading, setLoading] = useState(false)

    return (
        <RecipeGeneratorContext.Provider value={{ prompt, setPrompt, aiResponse, setAiResponse, loading, setLoading }}>
            { children }
        </RecipeGeneratorContext.Provider>
    )
}