import React, { useState, useContext } from "react";
import styled from "styled-components";

import { CartContext } from "../contexts/cart.context";
import { makeNewOrder } from "../services/backendService";


import PaymentForm from "../components/payment-form.component";
import CartSummary from "../components/cart-summary.component";
import CartCostSummary from "../components/cart-cost-summary.component";
import ContinueShoppingButton from "../elements/continue-shopping.button";


const Payment = () => {

    const { 
        cartItems, 
        cartCost,
    } = useContext(CartContext);

    const [ orderId, setOrderId ] = useState("");

    const [ paymentDetails, setPaymentDetails ] = useState({
        email: "",
        nameOnCard: "",
        address: "",
        city: "",
        country: "",
        cardNumber: "",
        cardExpirationMonth: "",
        cardExpirationYear: "",
        cvv: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPaymentDetails(prevState => {
            return {...prevState, [name]: value}
        });

        console.log(paymentDetails);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { cardExpirationMonth, cardExpirationYear, cvv } = paymentDetails;
        const promocodeDiscounts = cartCost.promocodeDiscounts.map(({ description, discount, id }) => {
            return {
                description, 
                discount: Number(discount),
                originalId: id
            }
        }) 

        const order = {
            paymentDetails: {
                ...paymentDetails, 
                cardExpirationMonth: Number(cardExpirationMonth),
                cardExpirationYear: Number(cardExpirationYear),
                cvv: Number(cvv)
            },
            cartItems: cartItems.map(({ id, name, price, quantity }) => {
                return {
                    originalId: id,
                    name,
                    orderedQuantity: quantity,
                    orderedPricePerItem: price
                }
            }),
            costDetails: {...cartCost, promocodeDiscounts},
        }
        try {
            const newOrderId = await makeNewOrder(order);
            setOrderId(newOrderId.orderId);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
    <PaymentPageStyled>
        <h2 className="main-section__page-title">
            {orderId? "Thank you. You successfully made an order": "Payment details"}
        </h2>

        {!orderId && <div className="main-section__payment-details">
            <p className="payment-details__instructions">Please provide payment details. All fields are mandatory.</p>

            <PaymentForm 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>}

        <div className="main-section__order-summary">
            <h3>Order Summary</h3>

            {orderId && <div className="order-summary__user-info">
                <h3>Order Number: {orderId}</h3>
                <p>{paymentDetails.nameOnCard}</p>
                <p>{paymentDetails.email}</p>
                <hr/>

            </div>}

            <CartSummary 
                cartSummaryItems = {cartItems.map(({id, quantity, name, price}) => ({id, quantity, name, price}))}

            />
            <CartCostSummary 
                {...cartCost}
            />
        </div>

        <ContinueShoppingButton />
    </PaymentPageStyled>
    );
}

const PaymentPageStyled = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    .main-section__page-title {
        font-size: var(--page-title);
        text-transform: uppercase;
        font-weight: 400;
        color: rgb(167, 167, 167);
    }

    .main-section__payment-details {
        background-color: rgb(228, 228, 228);
        padding: 1rem;
    }

    .payment-details__instructions {
        color: black;
    }

    .main-section__order-summary {
        padding: 1rem;
        background-color: rgb(228, 228, 228);
        align-self: start;
    }

    .main-section__order-summary > h3 {
        /* padding: 0 1rem; */
        margin-bottom: 1rem;
        font-size: 1rem;
        font-weight: 400;
    }

    .order-summary__user-info > p:first-of-type {
        margin-top: 0.5rem;
    }

    @media (min-width: 650px) {
            grid-template-columns: 1fr 1fr 1fr;
        

        .main-section__page-title {
            grid-column: span 3;
        }
        .main-section__payment-details {
            grid-column: span 2;
        }

        .payment-details__form {
            grid-template-columns: auto 1fr;
        }

        .form__to-basket-button {
            justify-self: start;
            grid-column: 1;
            grid-row: 7;
        }

    }



`;

export default Payment;

