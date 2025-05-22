const PantryItem = ({ pantryItem }) => {
    return (
        <div className="pantryItem">
            <h4>{pantryItem.name}</h4>
            <p><strong>Size: </strong>{pantryItem.size}</p>
            <p><strong>Expiration Date: </strong>{pantryItem.expirationDate}</p>
            <p><strong>Date Added: </strong>{pantryItem.createdAt}</p>
        </div>
    )
}

export default PantryItem