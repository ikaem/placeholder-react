import React, { Fragment } from "react";

const CartCostSummary = ({subtotal, promocodeDiscounts, grandTotal, removePromocode}) => {
    return (
    <div className="main-section__cost-calculation">
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
    </div>
    );
}

export default CartCostSummary;