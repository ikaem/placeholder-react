import React from "react";
import styled from "styled-components";

const CartSummary = ({cartSummaryItems}) => {

    console.log(cartSummaryItems);

    return (
    <CartSummaryStyled>
    {cartSummaryItems.map(item => {
        return (
        <li 
            key={item.id}
            className="cart-item">
            <article className="cart-item__item-actual">
                <span className="item-actual__quantity">{item.quantity} x </span>
                <span className="item-actual__name">{item.name}</span>
                <span className="item-actual__cost-total"> €{item.price}</span>
            </article>
        </li>
        )
    })}
    </CartSummaryStyled>
    );
}

const CartSummaryStyled = styled.ul`
    padding: 1rem 0;
    margin-bottom: 1rem;
    background-color: rgb(128, 128, 128);
    color: white;

    .cart-item {
        padding: 0 1rem 0.5rem;
        border-bottom: 1px solid rgb(177, 177, 177);
        margin-bottom: 0.5rem;
    }

    .cart-item:last-child {
        padding-bottom: 0;
        border-bottom: none;
        margin-bottom: 0;
    }

    .item-actual__cost-total {
        float: right;
    }

`;

export default CartSummary;