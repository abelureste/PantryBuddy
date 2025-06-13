import { useEffect } from 'react'
import { usePantryItemContext } from '../hooks/usePantryItemContext'

// import components
import PantryItem from '../components/PantryItem'
import NewItemForm from '../components/NewItemForm'

const Home = () => {
    const {pantryItems, dispatch} = usePantryItemContext()

    useEffect(() => {
        const fetchPantryData = async () => {
            const response = await fetch('/api/pantryData')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_PANTRY_ITEM', payload: json})
            }
        }

        fetchPantryData()
    }, [])

    return (
        <div className='home'>
            <div className='pantryItems'>
                {pantryItems && pantryItems.map((pantryItem) => (
                    <PantryItem key={pantryItem._id} pantryItem={pantryItem}></PantryItem>
                ))}
            </div>
            <NewItemForm></NewItemForm>
        </div>
    )
}

export default Home