import React, { useState, useEffect, useReducer, useContext } from "react";

import { CartContext } from "../contexts/cart.context";

import { orders as fakeOrders } from "../assets/fakeDB";


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
    const [ isOrderMade, setIsOrderMade ] = useState(false);



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

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderSummary = {
            id: fakeOrders.length + 1,
            paymentDetails: paymentDetails,
            cartItems: cartItems,
            costDetails: cartCost,
        }
        fakeOrders.push(orderSummary);
        setIsOrderMade(true);
        setOrderId(orderSummary.id);
        // return 
    }


    return (

    <section className="main-section">
        <h2 className="main-section__page-title">
            {isOrderMade? "Thank you. You successfully made an orrder": "Payment details"}
        </h2>

        {!isOrderMade && <div className="main-section__payment-details">
            <p className="payment-details__instructions">Please provide payment details. All fields are mandatory.</p>

            <PaymentForm 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>}

        <div className="main-section__order-summary">
            <h3>Order Summary</h3>

            {isOrderMade && <div className="order-summary__user-info">
                <h3>Order Number: {orderId}</h3>
                <span>{paymentDetails.nameOnCard}</span>
                <span>{paymentDetails.email}</span>

            </div>}

            <CartSummary 
                cartSummaryItems = {cartItems.map(({id, quantity, name, price}) => ({id, quantity, name, price}))}

            />
            <CartCostSummary 
                {...cartCost}
            />
        </div>
        <ContinueShoppingButton />
    </section>

    );
}

export default Payment;

