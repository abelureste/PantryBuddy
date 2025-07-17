import { useRecipeGeneratorContext } from '../hooks/useRecipeGeneratorContext'

const RecipeGenerator = () => {
  const { prompt, setPrompt, aiResponse, setAiResponse, loading, setLoading } = useRecipeGeneratorContext()

  const handleSubmit = async (e) => {
    console.log('Submitted');
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/aiData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        try {
          const recipeObject = JSON.parse(data.response);
          setAiResponse(recipeObject);
        } catch (error) {
          console.error("Failed to parse AI response:", error);
          setAiResponse(data.response || 'Received an invalid recipe format.');
        }
      } else {
        setAiResponse('Failed to generate recipe.');
      }
      
    } catch (error) {
      console.error(error);
      setAiResponse('Something went wrong while generating a recipe.');
    }

    setLoading(false);
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('You must be logged in to save a recipe.');
        return;
    }

    const response = await fetch('/api/recipeData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(aiResponse)
    });

    const json = await response.json();

    if (response.ok) {
        // Optionally, you can update the UI to show that the recipe has been saved
        console.log('Recipe saved successfully', json);
        alert('Recipe saved!');
    } else {
        console.error('Failed to save recipe:', json.error);
        alert('Failed to save recipe.');
    }
  };


  return (
    <div>
      <h1>Recipe Generator</h1>
      <p>Don't know what to cook? Generate a recipe based on your pantry inventory.</p>
      <form className="recipeSuggestInput" onSubmit={handleSubmit}>
        <label>What are you feeling?</label>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
        <button type="submit">Generate</button>
      </form>

      {loading && <p className='recipeLoad'>Loading...</p>}

      {aiResponse && (
        <div className="recipeResponse">
          <h3>Suggested Recipe:</h3>
          
          {typeof aiResponse === 'object' && aiResponse.recipeName ? (
            <div>
              <h2>{aiResponse.recipeName}</h2>
              <p>{aiResponse.recipeDescription}</p>

              <h4>Ingredients</h4>
              <div className="recipeSuggestGrid">
                {aiResponse.recipeIngredients?.map((ingredient, index) => (
                  <p className='recipeSuggestIngredients' key={index}>
                    {ingredient.ingredientQuantity} {ingredient.ingredientName}
                  </p>
                ))}
              </div>

              <h4>Instructions</h4>
              <div>
                {aiResponse.recipeInstructions?.map((instruction) => (
                  <p className='recipeSuggestInstructions' key={instruction.instructionStep}>
                    {instruction.instructionDescription}
                  </p>
                ))}
              </div><form>
                <button onClick={handleSave}>Save Recipe</button>
              </form>
            </div>
          ) : (
            <p>{aiResponse}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default RecipeGenerator