import React, { Fragment } from "react";
import styled from "styled-components";

const CartCostSummary = ({subtotal, promocodeDiscounts, grandTotal, removePromocode}) => {
    return (
    <CartCostSummaryStyled>
        <p 
            className="cost-calculation__label">
            Subtotal:
        </p>
        <p className="cost-calculation__value">€{subtotal}</p>
        <p className="cost-calculation__label promocodes-label grid-span">{promocodeDiscounts.length? "Promocodes applied:": "No promocodes used"}</p>

        {promocodeDiscounts.map(promocode => 
        <Fragment key={promocode.id}>
            <li 
                className="cost-calculation__label">
                    {removePromocode && <span 
                        onClick={() => removePromocode(promocode.id)}
                        className="cost-calculation__promocode-remove">x</span>}
                    {promocode.description}
            </li>
            <li 
                className="cost-calculation__value">
                - €{promocode.discount}
            </li>
        </Fragment>)}
        <hr className="grid-span"/>
        <h2 className="cost-calculation__label cost-total">Total</h2>
        <h2 className="cost-calculation__value cost-total">€{grandTotal}</h2>
    </CartCostSummaryStyled>
    );
}

const CartCostSummaryStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.3rem;

    .grid-span {
        grid-column: span 2;
    }

    hr.grid-span {
        height: 1px;
        border: none;
        background-color: rgb(110, 110, 110);
        width: 100%;
    }

    .cost-calculation__label {
        color: rgb(56, 56, 56);
    }

    .cost-calculation__value {
        color: rgb(54, 45, 45);
        justify-self: end;
        font-weight: 700;
    }

    .promocodes-label {
        margin-top: 0.3rem;
        font-size: 0.95rem;
        font-weight: 700;
    }

    .cost-calculation__promocode-remove {
        background-color: rgb(194, 187, 187);
        padding: 0 6px 2px;
        border-radius: 2px;
        position: relative;
        bottom: 2px;
        margin-right: 0.5rem;
        font-size: 1rem;
        color: white;
        cursor: pointer;

        :active,
        :hover {
            background-color: orange;
            color: black;
        }
    }



`;

export default CartCostSummary;