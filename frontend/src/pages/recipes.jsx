const Recipes = () => {
    return (
        <div>
            <div className="recipeSuggest">
                <h1>Recipe Generator</h1>
                <p>Don't know what to cook? Generate a recipe based on your pantry inventory.</p>
                <form className="recipeSuggestInput">
                    <label>What are you feeling?</label>
                    <input></input>
                    <button>Generate</button>
                </form>
            </div>
        </div>
    )
}

export default Recipes