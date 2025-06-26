import { RecipeGeneratorContext } from "../context/RecipeGeneratorContext"
import { useContext } from "react";

export const useRecipeGeneratorContext = () => {
    const context = useContext(RecipeGeneratorContext)

    if (!context) {
        throw Error('useRecipeGeneratorContext must be used inside a RecipeGeneratorContextProvider')
    }

    return context
}