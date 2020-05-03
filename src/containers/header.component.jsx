import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import { CartContext } from "../contexts/cart.context";

const Header = () => {

    const { numberOfCartItems } = useContext(CartContext);

    return (
    <HeaderStyled>
        <Link to="/">
            <h1 className="main-header__logo">Placeholder</h1>
        </Link>
        <nav className="main-header__nav">
            <NavLink exact to="/" activeClassName="active" className="main-header__nav-option">Home</NavLink>
            <NavLink exact to="/cart" activeClassName="active" className="main-header__nav-option">
                <span className="nav-option__cart-icon">>></span>
                <span className="nav-option__cart-label"> Cart - </span>
                <span className="nav-option__cart-items-nr"> {numberOfCartItems} item{numberOfCartItems !== 1 && "s"}</span>
            </NavLink>
            {/* <Link to="/payment">Temp Payment</Link> */}
        </nav>
    </HeaderStyled>
    );
}

const HeaderStyled = styled.header`
    background-color: var(--dark);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .active {
        background-color: white;
        color: black !important;
        /* font-weight: 700; */
    }

    .main-header__logo {
        color: rgb(212, 212, 212);
        text-transform: uppercase;
        font-weight: 300;
        font-size: 0.95rem;
        padding: 1rem;
    }

    .main-header__nav {
        display: flex;
        justify-content: space-between;
        background-color: rgb(109, 109, 109);

        .main-header__nav-option {
            font-size: 0.95rem;
            padding: 1rem;
            color: white;

            :active,
            :hover {
                color: rgb(255, 136, 25);
            }
        }
    }

    .nav-option__cart-label {
        display: none;
    }

    @media (min-width: 650px) {
        .nav-option__cart-label {
            display: inline;
        }

        
    }


`;

export default Header;