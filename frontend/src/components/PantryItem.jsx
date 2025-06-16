import { usePantryItemContext } from "../hooks/usePantryItemContext"

import { formatDistanceToNow, format, isPast, isValid } from 'date-fns'

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

    const expirationDate = new Date(pantryItem.expirationDate)

    const expirationStatus = () => {
        if (!isValid(expirationDate)) {
            return null
        }

        if (isPast(expirationDate)) {
            return <p><div>Expired {formatDistanceToNow(expirationDate, {addSuffix: true})}</div></p>
        } 
        
        else {
            return <p>Expires {formatDistanceToNow(expirationDate, {addSuffix: true})}</p>
        }
    }

    return (
        <div className="pantryItem">
            <h4>{pantryItem.name}</h4>
            <p><strong>Quantity: </strong>{pantryItem.quantity}</p>
            {pantryItem.expirationDate && new Date(pantryItem.expirationDate).getTime() !== 0 && (
                <>
                    <p><strong>Expiration Date: </strong>{format(new Date(pantryItem.expirationDate), 'MM/dd/yyyy')}</p>
                    { expirationStatus() }
                </>
            )}
            <p>Added {formatDistanceToNow(new Date(pantryItem.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default PantryItem