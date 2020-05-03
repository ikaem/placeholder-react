import React, { createContext, useState, useReducer } from "react";

export const CartContext = createContext();

const cartCostReducer = (state, action) => {
    switch(action.type) {
        case "calculation":
            return action.payload;
        default:
            return state;
    }
}

const CartProvider = ({children}) => {

    const [ cartItems, setCartItems ] = useState([
    ]);

    const [ promocodes, setPromocodes ] = useState([]);

    const [ cartCost, cartCostDispatch ] = useReducer(cartCostReducer, {
        subtotal: "",
        promocodeDiscounts: [],
        grandTotal: "",
    })



    return (
    <CartContext.Provider value={{
        cartItems, 
        setCartItems, 
        numberOfCartItems: cartItems.reduce((acc, item) => (acc + item.quantity), 0),
        promocodes,
        setPromocodes,
        cartCost,
        cartCostDispatch
        }}>
        {children}
    </CartContext.Provider>
    );
}

export default CartProvider;