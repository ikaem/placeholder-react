import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { CartContext } from "../contexts/cart.context";
import { getAllProducts } from "../services/backendService";

import Product from "../components/product.component";




const Home = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const [ products, setProducts ] = useState([]);
    const [ itemForCart, setItemForCart ] = useState({id:"", quantity: 1});

    useEffect(() => {
        getAllProducts().then(setProducts);
    }, []);

    const handleQuantityChange = (e, itemId) => {
        const { value } = e.target;
        // setItemForCart({id: itemId, quantity: Number(e.target.value)})
        setItemForCart({
            id: itemId,
            quantity: Number(value)
        })
    }

    const addItemToCart = (itemId) => {
        const itemIndex = cartItems.findIndex(item => item.id === itemId);

        const quantity = itemForCart.id === itemId? itemForCart.quantity: 1;

        if(itemIndex > -1) {
            // setCartItems([...cartItems.filter(item => item.id !== itemId), {
            //     id: itemId, 
            //     quantity: cartItems[itemIndex].quantity + quantity
            // }]);

            // setCartItems([...cartItems.filter(item => item.id !== itemId), {
            //     id: itemId, 
            //     name: "",
            //     image: "",
            //     price: "",
            //     quantity: cartItems[itemIndex].quantity + quantity
            // }]);

            setCartItems([...cartItems.filter(item => item.id !== itemId), {
                id: itemId, 
                name: "",
                image: "",
                price: "",
                quantity: cartItems[itemIndex].quantity + quantity
            }]);
        }
        else {
            setCartItems([...cartItems, {
                id: itemId, 
                name: "",
                image: "",
                price: "",
                quantity
            }]);
        }

        setItemForCart({id: "", quantity: 1});
    }
    
    return (
    <MainPageStyled>

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
    </MainPageStyled>
    )
}

const MainPageStyled = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    .main-section__page-title {
        font-size: var(--page-title);
        text-transform: uppercase;
        font-weight: 400;
        color: rgb(167, 167, 167);
    }

    .main-section__product-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    @media (min-width: 650px) {
        .main-section__product-list {
            grid-template-columns: repeat(3, 1fr);
        }
    }
`;

export default Home;