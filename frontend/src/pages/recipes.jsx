import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard"
import RecipeGenerator from "../components/RecipeGenerator"

const Recipes = () => {
    const [recipes, setRecipes] = useState([])

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

    return (
        <div>
            <div className="dashboardRecipes">
                <h1>Recipes</h1>
                <div className="recipeCardMaster">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            </div>
            <div className="recipeSuggest">
                <RecipeGenerator/>
            </div>
        </div>
    )
}

export default Recipes