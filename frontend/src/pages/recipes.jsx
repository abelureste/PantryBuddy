import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard"
import RecipeGenerator from "../components/RecipeGenerator"

const Recipes = () => {
    const [recipes, setRecipes] = useState([])
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipeData')
            const json = await response.json()

            if (response.ok) {
                setRecipes(json)
            }
        }

        fetchRecipes()
    }, [])

    const handleDeleteRecipe = (deletedRecipeId) => {
        setRecipes(recipes.filter(recipe => recipe._id !== deletedRecipeId));
    };

    const visibleRecipes = showAll ? recipes : recipes.slice(0, 8);

    return (
        <div>
            <div className="dashboardRecipes">
                <h1>Recipes</h1>
                <div className="recipeCardMaster">
                    {visibleRecipes.map(recipe => (
                        <RecipeCard key={recipe._id} recipe={recipe} onDelete={handleDeleteRecipe} />
                    ))}
                </div>
                {recipes.length > 8 && !showAll && (
                    <form className="viewMoreContainer">
                        <button className="viewMoreButton" onClick={() => setShowAll(true)}>View More</button>
                    </form>
                )}
            </div>
            <div className="recipeSuggest">
                <RecipeGenerator/>
            </div>
        </div>
    )
}

export default Recipes;