import { useRecipeGeneratorContext } from '../hooks/useRecipeGeneratorContext'

const RecipeGenerator = () => {
  const { prompt, setPrompt, aiResponse, setAiResponse, loading, setLoading } = useRecipeGeneratorContext()

  const handleSubmit = async (e) => {
    console.log('Submitted')

    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/aiData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (response.ok) {
        setAiResponse(data.response || 'No recipe found.')
      } else {
        setAiResponse('Failed to generate recipe.')
      }
      
    } catch (error) {
      console.error(error)
      setAiResponse('Something went wrong while generating a recipe.')
    }

    setLoading(false)
  }

  return (
    <div>
      <h1>Recipe Generator</h1>
      <p>Don't know what to cook? Generate a recipe based on your pantry inventory.</p>
      <form className="recipeSuggestInput" onSubmit={handleSubmit}>
        <label>What are you feeling?</label>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
        <button type="submit">Generate</button>
      </form>

      {loading && <p>Loading...</p>}
      {aiResponse && (
        <div className="recipeResponse">
          <h3>Suggested Recipe:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  )
}

export default RecipeGenerator