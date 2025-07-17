import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipeData/${id}`)
            const json = await response.json()

            if (response.ok) {
                setRecipe(json)
            }
        }

        fetchRecipe()
    }, [id])

    if (!recipe) {
        return <div>Loading...</div>
    }

    return (
        <div className="recipeSuggest">
            <h1>{recipe.recipeName}</h1>
            <p>{recipe.recipeDescription}</p>
            
            <h3>Ingredients</h3>
            <div>
                {recipe.recipeIngredients.map((ingredient, index) => (
                    <p key={index}>
                        {ingredient.ingredientQuantity} {ingredient.ingredientName}
                    </p>
                ))}
            </div>

            <h3>Instructions</h3>
            <div>
                {recipe.recipeInstructions.map((instruction, index) => (
                    <p key={index}>{instruction.instructionDescription}</p>
                ))}
            </div>
        </div>
    );
};

export default RecipePage;