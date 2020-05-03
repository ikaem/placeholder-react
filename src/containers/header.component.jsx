import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../contexts/cart.context";

const Header = () => {

    const { numberOfCartItems } = useContext(CartContext);

    return (
    <header className="main-header">
        <h1 className="main-header__logo">Placeholder</h1>
        <nav className="main-header__nav">
            <Link to="/" className="main-header__nav-option active">Home</Link>
            <Link to="/cart" className="main-header__nav-option">
                <span className="nav-option__cart-icon">>></span>
                <span className="nav-option__cart-label">Cart - </span>
                <span className="nav-option__cart-items-nr"> {numberOfCartItems} item{numberOfCartItems !== 1 && "s"}</span>
            </Link>
            <Link to="/payment">Temp Payment</Link>
        </nav>
    </header>
    );
}

export default Header;