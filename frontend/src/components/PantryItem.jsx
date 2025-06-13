import { usePantryItemContext } from "../hooks/usePantryItemContext"

import { formatDistanceToNow, format } from 'date-fns'

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
            {pantryItem.expirationDate && new Date(pantryItem.expirationDate).getTime() !== 0 && (
                <>
                    <p><strong>Expiration Date: </strong>{format(new Date(pantryItem.expirationDate), 'MM/dd/yyyy')}</p>
                    <p>Expires {formatDistanceToNow(new Date(pantryItem.expirationDate), {addSuffix: true})}</p>
                </>
            )}
            <p>Added {formatDistanceToNow(new Date(pantryItem.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default PantryItem