import { useState } from 'react'

const RecipeGenerator = () => {
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ prompt })
        })

        const data = await res.json()
        setResponse(data.response)
        setLoading(false)
    }

    return (
        <div>
            <h1>Recipe Generator</h1>
                <p>Don't know what to cook? Generate a recipe based on your pantry inventory.</p>
                <form className="recipeSuggestInput">
                    <label>What are you feeling?</label>
                    <input type="text" value={prompt}></input>
                    <button type="submit">Generate</button>
                </form>
        </div>        
    )
}

export default RecipeGenerator