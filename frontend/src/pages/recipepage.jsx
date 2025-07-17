import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipeData/${id}`);
            const json = await response.json();

            if (response.ok) {
                setRecipe(json.recipe);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipePage">
            <h1>{recipe.recipeName}</h1>
            <p>{recipe.recipeDescription}</p>
            
            <h3>Ingredients</h3>
            <ul>
                {recipe.recipeIngredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.ingredientQuantity} {ingredient.ingredientName}
                    </li>
                ))}
            </ul>

            <h3>Instructions</h3>
            <ol>
                {recipe.recipeInstructions.map((instruction, index) => (
                    <li key={index}>{instruction.instructionDescription}</li>
                ))}
            </ol>
        </div>
    );
};

export default RecipePage;