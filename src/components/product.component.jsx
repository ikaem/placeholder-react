import React from "react";
import styled from "styled-components";

const Product = ({
    id, name, price, image, itemForCart, handleQuantityChange, addItemToCart
}) => {
    return (

    <ProductStyled>
        <div className="product-actual__image-container">
            <img src={image} alt="device"/>
        </div>
        <div className="product-actual__product-info">
            <h1 className="product-info__name">{name}</h1>
            <span className="product-info__price">€{price}</span>
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
    </ProductStyled>

    );
}

const ProductStyled = styled.article`
    position: relative;
    background-color: rgb(228, 228, 228);
    display: flex;
    flex-direction: column;
    height: 100%;

    .product-actual__image-container {
        width: 100%;
    }

    .product-actual__image-container > img {
        display: block;
        width: 100%;
    }

    .product-actual__product-info {
        padding: 0.5rem;
    }

    .product-info__name {
        display: block;
        color: inherit;
        margin-bottom: 0.3rem;
    }

    .product-info__price {
        font-size: var(--product-price);
    }

    .product-actual_cart-actions-container {
        margin-top: auto;
        padding: 0.5rem;
        display: flex;
    }

    .cart-actions-container__add-button {
        flex-grow: 1;
    }

    .cart-actions-container__item-quantity-input {
        width: 3rem;
        text-align: center;
    }

    @media (min-width: 650px) {
        .cart-actions-container__add-button {
            flex-grow: 0;
        }
    }
`;

export default Product;