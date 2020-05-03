import React from "react";
import styled from "styled-components";

const CartItem = ({id, name, price, image, quantity, handleCartItemQuantityChange, removeItemFromCart}) => {
    return (
    <CartItemStyled>
        <div className="item-actual__image-container">
            <img src={image} alt="device"/>
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
    </CartItemStyled>
    );
}

const CartItemStyled = styled.article`
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 1fr;
    gap: 0.2rem 1rem;

    .item-actual__image-container {
        width: 100%;
        grid-row: span 4;
    }

    .item-actual__image-container > img {
        width: 100%;
        display: block;
    }

    .item-actual__quantity-input {
        width: 3rem;
        text-align: center;
    }

    .item-actual__remove-button {
        /* justify-self: start; */
    }

    @media (min-width: 940px) {
        grid-template-columns: 10rem 9rem 3rem 4rem auto;
        align-items: end; 
        .item-actual__image-container {
            width: 100%;
            grid-row: 1;
        }
    }


`;

export default CartItem;