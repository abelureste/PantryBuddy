import { PantryContext } from "../context/PantryContext";
import { useContext } from "react";

export const usePantryItemContext = () => {
    const context = useContext(PantryContext)

    if (!context) {
        throw Error('usePantryContext must be used inside a PantryContextProvider')
    }

    return context
}