import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {

    return (
        <Link to={`/recipe/${recipe._id}`} className="recipeCard">
            <img src="/SAMPLEroastedChicken.png"></img>
            <h2>{recipe.recipeName}</h2>
            <p>{recipe.recipeDescription}</p>
        </Link>
    )
}

export default RecipeCard