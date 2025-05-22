import { useState } from "react"

const NewItemForm = () => {
    const [name, setName] = useState('')
    const [size, setSize] = useState('')
    const [expirationDate, setExpirationDate ] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const pantryItem = {name, size, expirationDate}

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
        }
        if (response.ok) {
            setName('')
            setSize('')
            setExpirationDate('')
            setError(null)
            console.log('New workout added', json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Item</h3>

            <label>Item name:</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name}></input>

            <label>Size:</label>
            <input type="number" onChange={(e) => setSize(e.target.value)} value={size}></input>

            <label>Expiration Date:</label>
            <input type="date" onChange={(e) => setExpirationDate(e.target.value)} value={expirationDate}></input>

            <button>Add Item</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default NewItemForm