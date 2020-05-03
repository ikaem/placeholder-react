import React, { useState, useEffect, useContext, useReducer } from "react";

import { Link, useHistory as history } from "react-router-dom";

import { CartContext } from "../contexts/cart.context";

import { products as fakeProducts, promocodes as fakePromocodes } from "../assets/fakeDB";

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
    console.log("grand total", Number(grandTotal));
   

    const [ pendingPromocode, setPendingPromocode ] = useState("");




    useEffect(() => {
        const products = fakeProducts.filter(product => {
            return cartItems.map(item => item.id).includes(product.id);
        }).map(product => {
            const quantity = cartItems[cartItems.findIndex(item => item.id === product.id)].quantity;
            return {...product, quantity}
        })
        setCartItems(products);
    }, []);

    console.log("new", cartItems);


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
        console.log("log here", cartItems);

        const changedItem = cartItems.find(item => item.id === changedItemId);



        setCartItems(prevItems => [...prevItems.filter(item => item.id !== changedItemId), 
        {
            ...changedItem,
            quantity: Number(e.target.value)
        }])
        console.log("log here 2", cartItems);

    }

    const removeItemFromCart = (removedItemId) => {
        setCartItems(prevItems => [...prevItems.filter(item => item.id !== removedItemId)]);
    }

    const removePromocode = (id) => {
        setPromocodes(prevCodes => [...prevCodes.filter(code => code.id !== id)])
    }

    const handlePendingPromocodeChange = (e) => {
        setPendingPromocode(e.target.value);
        console.log(e.target.value);
        console.log(pendingPromocode);
    }

    const addPromocode = (e) => {
        e.preventDefault();

        const canAddCode = !promocodes.some(code => code.combination === false)

        if(!canAddCode){
            console.log("cannot combine current code with new codes");
            return;
        };

        const foundPromocode = fakePromocodes.find(fakePromocode => fakePromocode.code === pendingPromocode);

        if(!foundPromocode) return;
        if(!foundPromocode.combination && promocodes.length) return;
        if(promocodes.some(code => code.id === foundPromocode.id)) return;
        // some thrwoing errors here...

        if(foundPromocode) setPromocodes(prevCodes => [...prevCodes, foundPromocode]);



        console.log("ja")
        setPendingPromocode("");
    }

    return (
    <section className="main-section">
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

        <PromocodeUse 
            addPromocode={addPromocode}
            canCombine={!promocodes.some(code => !code.combination)}
            handlePendingPromocodeChange={handlePendingPromocodeChange}
            pendingPromocode={pendingPromocode}
        />

        <button 
            disabled={!Number(grandTotal)}
            onClick={() => push("/payment")}
            className="main-section__to-payment-details-button">
            To Payment Details
            <span>>></span>
        </button>
        <ContinueShoppingButton />
    </section>

    );
}

export default Cart;