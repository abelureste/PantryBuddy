import { usePantryItemContext } from "../hooks/usePantryItemContext"

const PantryItem = ({ pantryItem }) => {
    const { dispatch } = usePantryItemContext()

    const handleClick = async () => {
        const response = await fetch('/api/pantryData/' + pantryItem._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_PANTRY_ITEM', payload: json})
        }
    }

    return (
        <div className="pantryItem">
            <h4>{pantryItem.name}</h4>
            <p><strong>Quantity: </strong>{pantryItem.quantity}</p>
            <p><strong>Expiration Date: </strong>{pantryItem.expirationDate}</p>
            <p><strong>Date Added: </strong>{pantryItem.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default PantryItem