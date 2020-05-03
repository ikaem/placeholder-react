import React from "react";

const CartItem = ({id, name, price, image, quantity, handleCartItemQuantityChange, removeItemFromCart}) => {
    return (
    <article className="cart-item__item-actual">
        <div className="item-actual__image-container">
            {/* <img src={image} alt="device"/> */}
        </div>
        <h1 className="item-actual__name">{name}</h1>

        <label htmlFor="cart-item-quantity-input" hidden>Item quantity</label>
        <input 
            className="item-actual__quantity-input" type="number" min="0" value={quantity} 
            id="cart-item-quantity-input"
            onChange={(e) => handleCartItemQuantityChange(e, id)}
            />

        <span className="item-actual__price">€{(price*quantity).toFixed(2)}</span>

        <button 
            onClick={() => removeItemFromCart(id)}
            className="item-actual__remove-button">Remove</button>
    </article>
    );
}

export default CartItem;