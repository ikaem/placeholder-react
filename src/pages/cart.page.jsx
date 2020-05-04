import React, { useState, useEffect, useContext } from "react";
import { useHistory as history } from "react-router-dom";
import styled from "styled-components";

import { CartContext } from "../contexts/cart.context";
import { getCartItems, applyPromocode } from "../services/backendService";

import CartItem from "../components/cart-item.component";
import CartCostSummary from "../components/cart-cost-summary.component";
import PromocodeUse from "../components/promocode-use.component";
import ContinueShoppingButton from "../elements/continue-shopping.button";


const Cart = () => {
    const { 
        cartItems, 
        setCartItems, 
        promocodes, 
        setPromocodes,
        cartCost,
        cartCostDispatch
    } = useContext(CartContext);

    const { grandTotal } = cartCost;
    const { push } = history();
   

    const [ pendingPromocode, setPendingPromocode ] = useState("");

    const salesPriceCalculation = (id, quantity, price) => {
        // 1. motion sensor        // 2. smoke sensor
        if(!(id === "5eaeabc5991b0a38e84002cf" || id === "5eaeabc5991b0a38e84002d1")) return (quantity * price).toFixed(2);

        const salesPrice = id === "5eaeabc5991b0a38e84002cf"? 65: 35;
        const salesQuantity = id === "5eaeabc5991b0a38e84002cf"? 3: 2;

        const basePricedProducts = quantity % salesQuantity;
        const basePricedTotal = price * basePricedProducts;

        const salesIteration = Math.floor(quantity / salesQuantity);
        const saleTotal = salesPrice * salesIteration;

        return (saleTotal + basePricedTotal).toFixed(2);
    }

    useEffect(() => {

        getCartItems(cartItems.map(item => item.id)).then(products => {
            setCartItems(products.map(product => {
                const quantity = cartItems[cartItems.findIndex(item => item.id === product.id)].quantity;
                return {
                    ...product, 
                    quantity, 
                    totalProductCost: salesPriceCalculation(product.id, quantity, product.price)
                }
            }).sort((a, b) => a.price - b.price));
        });

    },[]);

    useEffect(() => {
        const subtotal = cartItems.reduce((acc, cartItem) => {
            acc = acc + Number(cartItem.totalProductCost);
            return acc;
        }, 0);

        let grandTotal = subtotal;

        const promocodeDiscounts = promocodes.map(promocode => {
            const description = promocode.description;
            let discount = 0;
            if(promocode.type === "percentage") {
                discount = promocode.amount * grandTotal / 100;
                grandTotal -= discount;
            }
            else {
                discount = promocode.amount;
                grandTotal -= discount;
            }

            return { id: promocode.id, description, discount: String(discount.toFixed(2)) }
        })

        cartCostDispatch({type: "calculation", payload: {
            subtotal: String(subtotal.toFixed(2)), 
            promocodeDiscounts, 
            grandTotal: String(grandTotal.toFixed(2))
        }});

    }, [cartItems, promocodes]);


    const handleCartItemQuantityChange = (e, changedItemId) => {
        const newQuantity= Number(e.target.value);
        const { price, ...rest } = cartItems.find(item => item.id === changedItemId);

        const changedItem = {
            ...rest,
            quantity: newQuantity,
            price,
            totalProductCost: salesPriceCalculation(changedItemId, newQuantity, price),
        }
        setCartItems(prevItems => [...prevItems.filter(item => item.id !== changedItemId), changedItem ].sort((a, b) => a.price - b.price))
    }

    const removeItemFromCart = (removedItemId) => {
        setCartItems(prevItems => [...prevItems.filter(item => item.id !== removedItemId)]);
    }

    const removePromocode = (id) => {
        setPromocodes(prevCodes => [...prevCodes.filter(code => code.id !== id)])
    }

    const handlePendingPromocodeChange = (e) => {
        setPendingPromocode(e.target.value);
    }

    const addPromocode = async (e) => {
        e.preventDefault();
        const canAddCode = !promocodes.some(code => code.combination === false)
        if(!canAddCode){
            console.log("cannot combine current code with new codes");
            return;
        };

        try {
            const foundPromocode = await applyPromocode(pendingPromocode);

            if(!foundPromocode) throw new Error("No such promocode");
            if(!foundPromocode.combination && promocodes.length) throw new Error("This code cannot be combined with existing codes.");
            if(promocodes.some(code => code.id === foundPromocode.id)) throw new Error("This code is already applied");

            setPromocodes(prevCodes => {
                const tempArrangement = [...prevCodes, foundPromocode];
                return [...tempArrangement.filter(code => code.type === "amount"), ...tempArrangement.filter(code => code.type === "percentage")];
            })

            setPendingPromocode("");
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
    <CartPageStyled>
        <h2 className="main-section__page-title">Cart items</h2>
        <ul className="main-section__cart-items">
            {cartItems.map(cartItem => 
            <li
                key={cartItem.id}
                className="cart-item">
                <CartItem 
                    {...cartItem}
                    handleCartItemQuantityChange={handleCartItemQuantityChange}
                    removeItemFromCart={removeItemFromCart}
                />
            </li> )}
        </ul>

        <CartCostSummary 
            {...cartCost}
            removePromocode={removePromocode}/>

        {Boolean(cartItems.length) && <PromocodeUse 
            addPromocode={addPromocode}
            canCombine={!promocodes.some(code => !code.combination)}
            handlePendingPromocodeChange={handlePendingPromocodeChange}
            pendingPromocode={pendingPromocode}
        />}

        <button 
            disabled={!Number(grandTotal)}
            onClick={() => push("/payment")}
            className="main-section__to-payment-details-button">
            To Payment Details
            <span> >></span>
        </button>
        <ContinueShoppingButton />
    </CartPageStyled>

    );
}

const CartPageStyled = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    .main-section__page-title {
        font-size: var(--page-title);
        text-transform: uppercase;
        font-weight: 400;
        color: rgb(167, 167, 167);
    }

    .main-section__cart-items {
        background-color: rgb(228, 228, 228);
        display: flex;
        flex-direction:column;
        padding: 1rem 1rem 0;
    }

    .cart-item {
        padding-bottom: 1rem;
        border-bottom: 1px solid black;
        margin-bottom: 1rem;
    }

    @media (min-width: 650px) {
        grid-template-columns: 1fr 1fr 1fr;
        align-items: start;

        .main-section__page-title {
            grid-column: span 3;
        }
        .main-section__cart-items {
            grid-column: span 2;
            grid-row: span 4;
        }
    }

`;

export default Cart;