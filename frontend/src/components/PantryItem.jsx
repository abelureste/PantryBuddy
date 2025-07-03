import { usePantryItemContext } from "../hooks/usePantryItemContext"
import { useEffect } from 'react'
import { formatDistanceToNow, format, isPast, isValid, addDays, isWithinInterval } from 'date-fns'

const PantryItem = ({ pantryItem }) => {
    const { dispatch } = usePantryItemContext()

    const handleClick = async () => {
        const response = await fetch('/api/pantryData/' + pantryItem._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_PANTRY_ITEM', payload: json })
        }
    }

    const incrementExpiredCount = async () => {
        try {
            const getResponse = await fetch('/api/expiredData')
            if (!getResponse.ok) throw new Error('Failed to get expired count.')
            
            const currentData = await getResponse.json()
            const currentCount = currentData.count

            const newCount = currentCount + 1

            const response = await fetch('/api/expiredData', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ count: newCount })
            })

            if (response.ok) {
                console.log('Expired count increased to: ', newCount)
            } else {
                console.error('Failed to update expired count.')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const expirationDate = new Date(pantryItem.expirationDate)

    useEffect(() => {
        if (isPast(expirationDate)) {
            incrementExpiredCount()
        }
    }, [expirationDate]) 

    const expirationStatus = () => {
        const today = new Date();
        const threeDaysFromNow = addDays(today, 3)

        if (!isValid(expirationDate)) {
            return null
        }

        if (isPast(expirationDate)) {
            return <p><div>Expired {formatDistanceToNow(expirationDate, { addSuffix: true })}</div></p>
        }

        if (isWithinInterval(expirationDate, { start: today, end: threeDaysFromNow })) {
            return <p><div><div>Expires {formatDistanceToNow(expirationDate, { addSuffix: true })}</div></div></p>
        }

        else {
            return <p>Expires {formatDistanceToNow(expirationDate, { addSuffix: true })}</p>
        }
    }

    return (
        <div className="pantryItem">
            <h4>{pantryItem.name}</h4>
            <p><strong>Quantity: </strong>{pantryItem.quantity}</p>
            {pantryItem.expirationDate && new Date(pantryItem.expirationDate).getTime() !== 0 && (
                <>
                    <p><strong>Expiration Date: </strong>{format(new Date(pantryItem.expirationDate), 'MM/dd/yyyy')}</p>
                    {expirationStatus()}
                </>
            )}
            <p>Added {formatDistanceToNow(new Date(pantryItem.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default PantryItem