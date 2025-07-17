import { useEffect, useState } from 'react'
import { usePantryItemContext } from '../hooks/usePantryItemContext'

// import components
import SearchBar from '../components/SearchBar'
import PantryItem from '../components/PantryItem'
import NewItemForm from '../components/NewItemForm'

const PantryInventory = () => {
    const {pantryItems, dispatch} = usePantryItemContext()
    const [filteredItems, setFilteredItems] = useState('')

    useEffect(() => {
        const fetchPantryData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/pantryData', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_PANTRY_ITEM', payload: json})
                setFilteredItems(json)
            }
        }

        fetchPantryData()
    }, [dispatch])

return (
        <div className='pantryInventory'>
            <div className='pantryItems'>
                <SearchBar setFilteredItems={setFilteredItems} />
                {filteredItems && filteredItems.length > 0 ? (
                    filteredItems.map((pantryItem) => (
                        <PantryItem key={pantryItem._id} pantryItem={pantryItem} />
                    ))
                ) : (
                    <p>No items match your search.</p>
                )}
            </div>
            <NewItemForm />
        </div>
    )
}

export default PantryInventory