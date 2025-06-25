import RecipeCard from "../components/RecipeCard"
import RecipeGenerator from "../components/RecipeGenerator"

const Recipes = () => {
    return (
        <div>
            <div className="dashboardRecipes">
                <h1>Recipes</h1>
                <div className="recipeCardMaster">
                    <RecipeCard/>
                    <RecipeCard/>
                    <RecipeCard/>
                </div>
            </div>
            <div className="recipeSuggest">
                <RecipeGenerator/>
            </div>
        </div>
    )
}

export default Recipes