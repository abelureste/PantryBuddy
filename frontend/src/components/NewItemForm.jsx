import { useState } from "react"
import { usePantryItemContext } from "../hooks/usePantryItemContext"

const NewItemForm = () => {
    const { dispatch } = usePantryItemContext()
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [expirationDate, setExpirationDate ] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const pantryItem = {name, quantity, expirationDate}

        const response = await fetch('/api/pantryData', {
            method: 'POST',
            body: JSON.stringify(pantryItem),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setQuantity('')
            setExpirationDate('')
            setError(null)
            setEmptyFields([])
            console.log('New workout added', json)
            dispatch({type: 'CREATE_PANTRY_ITEM', payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Item</h3>

            <label>Item name:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} className={emptyFields.includes('name') ? 'error' : ''}></input>

            <label>Quantity:</label>
            <input type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity} className={emptyFields.includes('quantity') ? 'error' : ''}></input>

            <label>Expiration Date:</label>
            <input type="date" onChange={(e) => setExpirationDate(e.target.value)} value={expirationDate}></input>

            <button>Add Item</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default NewItemForm