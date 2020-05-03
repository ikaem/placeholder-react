import React, { isValidElement } from "react";

const CartSummary = ({cartSummaryItems}) => {

    console.log(cartSummaryItems);

    return (
    <ul className="order-summary__cart-items">
    {
        cartSummaryItems.map(item => {
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
        })
    }

    </ul>
    );
}

export default CartSummary;