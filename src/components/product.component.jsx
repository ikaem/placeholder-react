import React from "react";

const Product = ({
    id, name, price, image, itemForCart, handleQuantityChange, addItemToCart
}) => {
    return (

    <article className="product-list__product-actual">
        <div className="product-actual__image-container">
            {/* <img src="https://source.unsplash.com/800x601/?device" alt="device"/> */}
        </div>
        <div className="product-actual__product-info">
            <h1 className="product-info__name">Smoke Detector</h1>
            <span className="product-info__price">€46.00</span>
        </div>
        <div className="product-actual_cart-actions-container">
            <button 
                onClick={(e) => addItemToCart(id)}
                className="cart-actions-container__add-button">Dodaj u košaricu</button>
            <label htmlFor="item-quantity-input" hidden>Item quantity</label>
            <input 
                className="cart-actions-container__item-quantity-input" 
                type="number" min="0" 
                value={id === itemForCart.id? itemForCart.quantity: 1}
                onChange={(e) => handleQuantityChange(e, id)}
            id="item-quantity-input"/>
        </div>
    </article>

    );
}

export default Product;