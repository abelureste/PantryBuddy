import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, onDelete }) => {
    const handleDelete = async (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('You must be logged in to delete a recipe.');
            return;
        }

        if (window.confirm(`Are you sure you want to delete "${recipe.recipeName}"?`)) {
            const response = await fetch(`/api/recipeData/${recipe._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log('Recipe deleted successfully');
                if (onDelete) {
                    onDelete(recipe._id);
                }
            } else {
                const json = await response.json();
                console.error('Failed to delete recipe:', json.error);
                alert('Failed to delete recipe.');
            }
        }
    };

    return (
        <div className="recipeCard">
            <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h2>{recipe.recipeName}</h2>
                <p>{recipe.recipeDescription}</p>
            </Link>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>
    )
}

export default RecipeCard;