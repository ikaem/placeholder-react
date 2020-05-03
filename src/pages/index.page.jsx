import React, { useState, useEffect, useContext } from "react";

import { products as fakeProducts } from "../assets/fakeDB";
import Product from "../components/product.component";

import { CartContext } from "../contexts/cart.context";


const Home = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const [ products, setProducts ] = useState([]);
    const [ itemForCart, setItemForCart ] = useState({id:"", quantity: 1});

    useEffect(() => {
        setProducts(fakeProducts);
    }, []);

    const handleQuantityChange = (e, itemId) => {
        setItemForCart({id: itemId, quantity: Number(e.target.value)})
    }

    const addItemToCart = (itemId) => {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);

        const quantity = itemForCart.id === itemId? itemForCart.quantity: 1;

        if(itemIndex > -1) {
            setCartItems([...cartItems.filter(item => item.id !== itemId), {
                id: itemId, 
                quantity: cartItems[itemIndex].quantity + quantity
            }]);
        }
        else {
            setCartItems([...cartItems, {
                id: itemId, 
                quantity
            }]);
        }

        setItemForCart({id: "", quantity: 1});
    }

    
    return (
    <section className="main-section">

        <h2 className="main-section__page-title">Our products</h2>
        <ul className="main-section__product-list">
        {products.map(product => <li key={product.id}>
            <Product 
                {...product}
                itemForCart={itemForCart}
                handleQuantityChange={handleQuantityChange}
                addItemToCart={addItemToCart}
            />
        </li>)}
        </ul>
    </section>
    )
}

export default Home;