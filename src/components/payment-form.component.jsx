import React from "react";
import { Link } from "react-router-dom";

const PaymentForm = ({ handleChange, handleSubmit }) => {




    return (

    <form 
        onSubmit={handleSubmit}
        className="payment-details__form">
        <label htmlFor="email-input">Email</label>
        <input 
            type="email" 
            id="email-input"
            name="email"
            onChange={handleChange}
            required
        />
        <label htmlFor="name-input">Name on card</label>
        <input 
            type="text" 
            id="name-input"
            name="nameOnCard"
            onChange={handleChange}
            required
        />
        <label htmlFor="address-input">Address</label>
        <input 
            type="text" 
            id="address-input"
            name="address"
            onChange={handleChange}
            required
        />
        <label htmlFor="city-input">City</label>
        <input 
            type="text" 
            id="city-input"
            name="city"
            onChange={handleChange}
            required
        />
        <label htmlFor="country-input">Country</label>
        <input 
            type="text" 
            id="country-input"
            name="country"
            onChange={handleChange}
            required
        />

        <div className="form__card-details grid-span">
            <label className="card-details__label grid-span" htmlFor="card-number">
                Card number
            </label>
            <input 
                className="card-details__label grid-span" 
                id="card-number" 
                type="tel" 
                inputMode="numeric" 
                pattern="[0-9\s]{13,19}" 
                maxLength="19" 
                placeholder="XXXX XXXX XXXX XXXX"
                name="cardNumber"
                onChange={handleChange}
                required
            />
            <div 
                className="card-details__expiration-date">
                <span 
                    className="card-details__label">Card expiration date</span>
                <label  
                    htmlFor="card-expiration-month" hidden>Card expiration date - month</label>
                <input 
                    id="card-expiration-month" type="number" inputMode="numeric" 
                    min="1"
                    max="12"
                    placeholder="MM"
                    name="cardExpirationMonth"
                    onChange={handleChange}
                    required
                />
                <label 
                    htmlFor="card-expiration-year" hidden>Card expiration date - month</label>
                <input 
                    id="card-expiration-year" type="number" inputMode="numeric"
                    min="20"
                    max="99"
                    placeholder="YY"
                    name="cardExpirationYear"
                    onChange={handleChange}
                    required
                />
            </div>

            <label 
                className="card-details__label" htmlFor="card-cvv">CVV
                <input 
                    id="card-cvv" 
                    type="tel" 
                    inputMode="numeric" maxLength="3" 
                    placeholder="XXX"
                    name="cvv"
                    onChange={handleChange}
                    required
                />
            </label>
        </div>

        <button className="form__payment-button">Payment</button>

        <Link to="/cart" className="form__to-basket-button">
        <span>&lt;&lt;</span>
            Back to Basket
        </Link>

    </form>

    );
}

export default PaymentForm;