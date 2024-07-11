import React from 'react';
// import './CartItem.css';



/*******************************************/
///i dont know if we useing this page!!! //

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const handleQuantityChange = (e) => {
        onQuantityChange(item.id, parseInt(e.target.value));
    };

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <label htmlFor={`quantity-${item.id}`}>Qty: </label>
                <select id={`quantity-${item.id}`} value={item.quantity} onChange={handleQuantityChange}>
                    {[...Array(10).keys()].map(n => (
                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                    ))}
                </select>
                <button onClick={() => onRemove(item.id)}>Delete</button>
            </div>
        </div>
    );
};

export default CartItem;
