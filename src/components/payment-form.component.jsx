import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PaymentForm = ({ handleChange, handleSubmit }) => {

    return (
    <PaymentFormStyled 
        onSubmit={handleSubmit}>
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
            <label className="card-details__label" htmlFor="card-number">
                Card number
                <input 
                    className="card-details__label" 
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
            </label>

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

            <label htmlFor="card-cvv">CVV
                <input 
                    id="card-cvv" 
                    type="tel" 
                    inputMode="numeric"
                    placeholder="XXX"
                    name="cvv"
                    minLength="3"
                    maxLength="3"
                    onChange={handleChange}
                    required
                />
            </label>
        </div>

        <button className="form__payment-button">Payment</button>

        <Link to="/cart" className="form__to-basket-button">
        <span>&lt;&lt; </span>
            Back to Basket
        </Link>
    </PaymentFormStyled>
    );
}

const PaymentFormStyled = styled.form`
    padding-top: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.1rem 3rem;
    /* width: 100%; */

    .grid-span {
        grid-column: span 2;
    }

    > input {
        margin-bottom: 0.9rem;
        width: 100%;
    }

    > label {
        color: rgb(71, 65, 65);
    }

    .form__card-details {
        background-color: rgb(128, 128, 128);
        border-radius: 2px;
        padding: 1rem 1rem 0;
        margin-bottom: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.1rem 1rem;
        color: white;

        .card-details__label,
        [name=cvv] {
            display: block;
        }

        input {
            margin-top: 0.2rem;
            margin-bottom: 1rem;
        }
    }

    .form__payment-button {
        margin-bottom: 1rem;
    }

    .form__to-basket-button {
        border: 1px solid grey;
        padding: 2px 0;
        border-radius: 1px;
        background-color: #f3f3f3;
        display: block;
        text-align: center;
        color: grey;
    }


@media (min-width: 650px) {
    grid-template-columns: auto 1fr;

    .form__to-basket-button {
        justify-self: start;
        grid-column: 1;
        grid-row: 7;
        padding: 0.1rem 0.4rem;
    }

    .form__payment-button {
        margin-bottom: 0;
        grid-column: 2;
        justify-self: end;
    }
}



`;

export default PaymentForm;