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


    useEffect(() => {
        getCartItems(cartItems.map(item => item.id)).then(products => {
            setCartItems(products.map(product => {
                const quantity = cartItems[cartItems.findIndex(item => item.id === product.id)].quantity;
                return {...product, quantity}
            }).sort((a, b) => a.name - b.name));
        });

    },[]);

        useEffect(() => {
        const subtotal = cartItems.reduce((acc, cartItem) => {
            acc = acc + cartItem.price * cartItem.quantity;
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
        const { value } = e.target;
        const changedItem = cartItems.find(item => item.id === changedItemId);
        setCartItems(prevItems => [...prevItems.filter(item => item.id !== changedItemId), 
        {
            ...changedItem,
            quantity: Number(value)
        }].sort((a, b) => a.name - b.name))
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
                setPromocodes(prevCodes => [...prevCodes, foundPromocode]);
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