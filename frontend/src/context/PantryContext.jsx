import { createContext, useReducer } from "react";

export const PantryContext = createContext()

export const PantryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PANTRY_ITEM':
            return {
                pantryItems: action.payload
            }
        case 'CREATE_PANTRY_ITEM':
            return {
                pantryItems: [action.payload, ...state.pantryItems]
            }
        case 'DELETE_PANTRY_ITEM':
            return{
                pantryItems: state.pantryItems.filter((item) => item._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const PantryContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PantryReducer, {
        pantryItems: null
    })
    
    return (
        <PantryContext.Provider value={{...state, dispatch}}>
            { children }
        </PantryContext.Provider>
    )
}