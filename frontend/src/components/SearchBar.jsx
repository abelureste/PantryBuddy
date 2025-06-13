import { useState, useEffect } from "react"
import { usePantryItemContext } from "../hooks/usePantryItemContext"

const SearchBar = ({ setFilteredItems }) => {
    const { pantryItems } = usePantryItemContext()
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if(!searchTerm.trim()) {
            setFilteredItems(pantryItems)
        } else {
            const filtered = pantryItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredItems(filtered)
        }
    }, [searchTerm, pantryItems, setFilteredItems])

    return (
        <form className="searchBar">
            <label>Search Items:</label>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
        </form>
    )
}

export default SearchBar